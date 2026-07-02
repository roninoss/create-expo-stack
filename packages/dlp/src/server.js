import { spawn } from "node:child_process";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, mkdtemp, rm, stat } from "node:fs/promises";
import http from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import crypto from "node:crypto";

import archiver from "archiver";

import { buildCliArgs, validatePayload } from "./buildCliArgs.js";

const PORT = Number(process.env.PORT ?? 3000);
const DATA_DIR = process.env.DATA_DIR ?? path.join(tmpdir(), "dlp-zips");
const CES_VERSION = process.env.CES_VERSION ?? "latest";
// How long a generated zip stays downloadable
const ZIP_TTL_MS = Number(process.env.ZIP_TTL_MS ?? 60 * 60 * 1000);
// Hard cap on how long one generation may run
const GENERATION_TIMEOUT_MS = Number(
  process.env.GENERATION_TIMEOUT_MS ?? 4 * 60 * 1000,
);
const MAX_CONCURRENT_GENERATIONS = Number(
  process.env.MAX_CONCURRENT_GENERATIONS ?? 3,
);
// Per-IP generation limit within the rate window
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 10);
const RATE_LIMIT_WINDOW_MS = Number(
  process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000,
);
const MAX_BODY_BYTES = 64 * 1024;

/** @type {Map<string, {zipPath: string, projectName: string, expiresAt: number}>} */
const downloads = new Map();
/** @type {Map<string, number[]>} */
const requestLog = new Map();
let activeGenerations = 0;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    // rn.new is cross-origin isolated (COEP: require-corp), so responses
    // must opt in to being loaded from there.
    "Cross-Origin-Resource-Policy": "cross-origin",
  };
}

function json(res, status, body) {
  res.writeHead(status, {
    ...corsHeaders(),
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(body));
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress ?? "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Request body too large."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function runCes(args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "npx",
      ["--yes", `create-expo-stack@${CES_VERSION}`, ...args],
      {
        cwd,
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, CI: "1" },
      },
    );

    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));

    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("Project generation timed out."));
    }, GENERATION_TIMEOUT_MS);

    child.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    child.on("close", (code) => {
      clearTimeout(timeout);
      if (code === 0) {
        resolve(output);
      } else {
        console.error(`create-expo-stack exited with ${code}:\n${output}`);
        reject(new Error(`create-expo-stack exited with code ${code}.`));
      }
    });
  });
}

function zipDirectory(sourceDir, zipPath, rootName) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(sourceDir, rootName);
    archive.finalize();
  });
}

async function handleGenerate(req, res) {
  if (isRateLimited(clientIp(req))) {
    json(res, 429, { error: "Too many requests, try again later." });
    return;
  }

  if (activeGenerations >= MAX_CONCURRENT_GENERATIONS) {
    json(res, 503, { error: "Server busy, try again in a minute." });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch (error) {
    json(res, 400, { error: `Invalid JSON body: ${error.message}` });
    return;
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    json(res, 400, { error: validationError });
    return;
  }

  activeGenerations++;
  const workDir = await mkdtemp(path.join(tmpdir(), "dlp-gen-"));
  try {
    await runCes(buildCliArgs(payload), workDir);

    const projectDir = path.join(workDir, payload.projectName);
    await stat(projectDir);

    const id = crypto.randomBytes(8).toString("base64url");
    const zipPath = path.join(DATA_DIR, `${id}.zip`);
    await zipDirectory(projectDir, zipPath, payload.projectName);

    downloads.set(id, {
      zipPath,
      projectName: payload.projectName,
      expiresAt: Date.now() + ZIP_TTL_MS,
    });

    json(res, 200, { result: `/${id}` });
  } catch (error) {
    console.error("generation failed:", error);
    json(res, 500, { error: "Project generation failed." });
  } finally {
    activeGenerations--;
    await rm(workDir, { recursive: true, force: true });
  }
}

async function handleDownload(req, res, id) {
  const entry = downloads.get(id);
  if (!entry || entry.expiresAt < Date.now()) {
    json(res, 404, { error: "Download not found or expired." });
    return;
  }

  res.writeHead(200, {
    ...corsHeaders(),
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename="${entry.projectName}.zip"`,
  });
  createReadStream(entry.zipPath).pipe(res);
}

async function cleanupExpired() {
  const now = Date.now();
  for (const [id, entry] of downloads) {
    if (entry.expiresAt < now) {
      downloads.delete(id);
      await rm(entry.zipPath, { force: true });
    }
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "OPTIONS") {
      res.writeHead(204, corsHeaders());
      res.end();
      return;
    }

    if (req.method === "GET" && url.pathname === "/healthz") {
      json(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && url.pathname === "/") {
      await handleGenerate(req, res);
      return;
    }

    const downloadMatch = url.pathname.match(/^\/([A-Za-z0-9_-]{6,32})$/);
    if (req.method === "GET" && downloadMatch) {
      await handleDownload(req, res, downloadMatch[1]);
      return;
    }

    json(res, 404, { error: "Not found." });
  } catch (error) {
    console.error("request failed:", error);
    if (!res.headersSent) {
      json(res, 500, { error: "Internal server error." });
    }
  }
});

await mkdir(DATA_DIR, { recursive: true });
setInterval(cleanupExpired, 60 * 1000).unref();

server.listen(PORT, () => {
  console.log(`dlp listening on :${PORT} (create-expo-stack@${CES_VERSION})`);
});
