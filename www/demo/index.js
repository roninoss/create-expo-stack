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

import Box from "cli-box";

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

  const myBox = new Box(
    {
      w: 50,
      h: 5,
      // hAlign: 'center',
      stringify: false,
      marks: {
        nw: color.yellow("╭"),
        n: color.yellow("─"),
        ne: color.yellow("╮"),
        e: color.yellow("│"),
        se: color.yellow("╯"),
        s: color.yellow("─"),
        sw: color.yellow("╰"),
        w: color.yellow("│"),
      },
      // hAlign: 'middle',
    },
    `Click the link to download your project!\n\n${color.magenta(projectURL)}`,
  );

  outro(`\n${myBox.stringify()}`);

  setTimeout(() => {
    console.log(color.yellow("why are you still here."));
  }, 1800000);

  return;
}

main().catch(console.error);
