# dlp — download service for the rn.new demo

Replacement for the original `dlp.rn.new` backend. Accepts the CLI-results
payload that the interactive demo on [rn.new](https://rn.new) produces, runs
`create-expo-stack` with the equivalent flags, zips the generated project, and
returns a short-lived download link.

## API

### `POST /`

Body: the demo's `cliResults` object, e.g.

```json
{
  "projectName": "my-expo-app",
  "packages": [
    { "name": "expo-router", "type": "navigation", "options": { "type": "stack" } },
    { "name": "nativewind", "type": "styling" }
  ],
  "flags": { "packageManager": "npm" }
}
```

Response: `{ "result": "/<id>" }` — append to the service origin to get the
download URL (matches the contract the demo already expects).

Errors return `{ "error": "..." }` with a 4xx/5xx status.

### `GET /<id>`

Streams the generated project as `<projectName>.zip`. Links expire after
`ZIP_TTL_MS` (default 1 hour).

### `GET /healthz`

Liveness check.

## Configuration

| Env var                      | Default          | Purpose                                    |
| ---------------------------- | ---------------- | ------------------------------------------ |
| `PORT`                       | `3000`           | Listen port                                |
| `ALLOWED_ORIGIN`             | `*`              | `Access-Control-Allow-Origin` value        |
| `CES_VERSION`                | `latest`         | create-expo-stack version to run           |
| `DATA_DIR`                   | `$TMPDIR/dlp-zips` | Where zips are stored                    |
| `ZIP_TTL_MS`                 | `3600000`        | How long a download link stays valid       |
| `GENERATION_TIMEOUT_MS`      | `240000`         | Kill a generation that runs longer         |
| `MAX_CONCURRENT_GENERATIONS` | `3`              | Reject with 503 above this                 |
| `RATE_LIMIT_MAX`             | `10`             | Generations per IP per window              |
| `RATE_LIMIT_WINDOW_MS`       | `600000`         | Rate-limit window                          |

## Deploying

Any host that runs a Docker container or Node 20+ works. The service keeps
download state in memory, so run a single instance (or add sticky routing).

**Fly.io**

```sh
cd packages/dlp
fly launch --copy-config --no-deploy   # creates the app from fly.toml
fly deploy
fly certs add dlp.rn.new               # then point DNS at the app
```

**Railway / Render**: create a service from this directory's Dockerfile and
set the env vars above.

**Any VPS**

```sh
cd packages/dlp
npm ci
node src/server.js
```

Once deployed, point the `dlp.rn.new` DNS record at it — or change
`DOWNLOAD_SERVICE_URL` in `www/demo/constants.js` to the new URL and redeploy
the site.

## Notes

- Generation always runs with `--no-git --no-install`; the user installs
  dependencies after downloading.
- NativewindUI configs shell out to `nwui-cli`, which fetches components from
  nativewindui.com — the host needs outbound HTTPS.
- This package is intentionally not part of the bun workspace so the Docker
  build stays self-contained; it has its own `package-lock.json`.
