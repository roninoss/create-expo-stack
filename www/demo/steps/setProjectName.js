import { isCancel, cancel, text } from "@clack/prompts";

import { PROJECT_NAME } from "../constants.js";

export async function setProjectName(cliResults) {
  const name = await text({
    message: "What do you want to name your project?",
    placeholder: PROJECT_NAME,
    validate: (value) => {
      if (!value) return "Please enter a project name.";
    },
  });
  if (isCancel(name)) {
    cancel("Cancelled... 👋");
    return process.exit(0);
  }

  cliResults.projectName = name || PROJECT_NAME;
}
