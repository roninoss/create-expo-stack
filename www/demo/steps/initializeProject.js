import { spinner } from "@clack/prompts";

export async function initializeProject() {
  const s = spinner();
  s.start("Initializing your project...");
  // CALL ENDPOINT HERE WITH CLI RESULTS
  s.stop("Project initialized!");
}
