import { spinner } from "@clack/prompts";
import color from "picocolors";

import { DOWNLOAD_SERVICE_URL as fetchURL } from "../constants.js";

export async function initializeProject(cliResults) {
  const formattedCliResults = JSON.stringify(cliResults, (key, value) =>
    typeof value === "string" ? value.replace(/'/g, '"') : value,
  );

  const s = spinner();
  s.start("Initializing your project...");

  try {
    const response = await fetch(fetchURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formattedCliResults,
      redirect: "follow",
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(
        `The project generator responded with status ${response.status}.`,
      );
    }

    const { result } = await response.json();

    if (typeof result !== "string" || result.length === 0) {
      throw new Error("The project generator returned an unexpected response.");
    }

    s.stop("Project initialized!");
    return fetchURL + result;
  } catch (error) {
    s.stop(color.red("We couldn't generate a download link right now."));
    console.log(
      color.red(error instanceof Error ? error.message : String(error)),
    );
    return undefined;
  }
}
