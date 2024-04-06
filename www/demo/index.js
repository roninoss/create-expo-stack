import { intro, outro } from "@clack/prompts";
import color from "picocolors";

import { expoStackTheme } from "./constants.js";

import {
  initializeProject,
  printOutput,
  renderTitle,
  setAuthentication,
  setLanguage,
  setNavigation,
  setPackageManager,
  setStyles,
  setProjectName,
} from "./steps/index.js";

import { cliResults } from "./constants.js";

async function main() {
  console.clear();

  await renderTitle();

  intro(`${color.bgCyan(color.black(" create-expo-stack "))}`);

  await setProjectName(cliResults);

  await setLanguage(cliResults);

  await setPackageManager(cliResults);

  await setNavigation(cliResults);

  await setStyles(cliResults);

  await setAuthentication(cliResults);

  const projectURL = await initializeProject(cliResults);

  printOutput(cliResults);

  outro("Click the link to download your project!");
  console.log(color.magenta(projectURL));
  return cliResults;
}

main().catch(console.error);
