import { select, isCancel, cancel } from "@clack/prompts";

export async function setNavigation(cliResults) {
  const navigationSelect = await select({
    message: "What would you like to use for Navigation?",
    options: [
      { value: "react-navigation", label: "React Navigation" },
      { value: "expo-router", label: "Expo Router" },
      { value: "", label: "None" },
    ],
    initialValue: "expo-router",
  });
  if (isCancel(navigationSelect)) {
    cancel("Cancelled... 👋");
    return process.exit(0);
  }
  if (navigationSelect) {
    const navigationType = await select({
      message: "What type of navigation would you like to use?",
      options: [
        { value: "stack", label: "Stack" },
        { value: "tabs", label: "Tabs" },
        { value: "drawer + tabs", label: "Drawer + Tabs" },
      ],
    });
    if (isCancel(navigationType)) {
      cancel("Cancelled... 👋");
      return process.exit(0);
    }
    cliResults.packages.push({
      name: navigationSelect,
      type: "navigation",
      options: {
        type: navigationType,
      },
    });
    console.log(`Great, we'll use ${navigationSelect}!`);
  } else {
    console.log(`No problem, skipping navigation for now.`);
  }
}
