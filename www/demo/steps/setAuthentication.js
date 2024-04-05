import { select, isCancel, cancel } from "@clack/prompts";

export async function setAuthentication(cliResults) {
  const authenticationSelect = await select({
    message: "What would you like to use for authentication?",
    options: [
      { value: undefined, label: "None" },
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
    console.log(`No problem, skipping authentication for now.`);
  }
}
