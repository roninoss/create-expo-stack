import { select, isCancel, cancel } from "@clack/prompts";
import color from "picocolors";

export async function setAuthentication(cliResults) {
  const authenticationSelect = await select({
    message: "What would you like to use for authentication?",
    options: [
      { value: undefined, label: "None" },
      { value: "clerk", label: "Clerk" },
      { value: "supabase", label: "Supabase" },
      { value: "firebase", label: "Firebase" },
    ],
  });
  if (isCancel(authenticationSelect)) {
    cancel("Cancelled... 👋");
    return process.exit(0);
  }
  if (authenticationSelect) {
    cliResults.packages.push({
      name: authenticationSelect,
      type: "authentication",
    });
  } else {
    console.log(color.green(`No problem, skipping authentication for now.`));
  }
}
