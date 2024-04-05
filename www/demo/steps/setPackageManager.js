import { select, isCancel, cancel } from "@clack/prompts";

export async function setPackageManager(cliResults) {
  const packageManagerSelect = await select({
    message: "Which package manager would you like to use?",
    options: [
      { value: "npm", label: "npm" },
      { value: "yarn", label: "yarn" },
      { value: "pnpm", label: "pnpm" },
      { value: "bun", label: "bun" },
    ],
  });
  if (isCancel(packageManagerSelect)) {
    cancel("Cancelled... 👋");
    return process.exit(0);
  }
  cliResults.flags.packageManager = packageManagerSelect;
}
