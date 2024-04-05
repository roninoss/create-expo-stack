import { isCancel, cancel, confirm } from "@clack/prompts";

export async function setLanguage(cliResults) {
  const shouldUseTypescript = await confirm({
    message: "Would you like to use TypeScript with this project?",
    initialValue: true,
  });
  if (isCancel(shouldUseTypescript)) {
    cancel("Cancelled... 👋");
    return process.exit(0);
  }
  if (shouldUseTypescript) {
    console.log("Good call, now using TypeScript! 🚀");
  } else {
    console.log(`Wrong answer, we're gonna use Typescript.`);
  }
}
