import { intro, outro } from "@clack/prompts";
import color from "picocolors";
import util from "util";

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

  intro(`${color.bgCyan(color.black(" rn-new "))}`);

  await setProjectName(cliResults);

  await setLanguage(cliResults);

  await setPackageManager(cliResults);

  const navigationSelect = await setNavigation(cliResults);

  await setStyles(cliResults, navigationSelect);

  await setAuthentication(cliResults);

  const projectURL = await initializeProject(cliResults);

  console.log(
    color.blue(
      `Your project configuration:\n${util.inspect(
        cliResults,
        false,
        null,
        true /* enable colors */,
      )}`,
    ),
  );

  const output = printOutput(cliResults);

  const myBox = new Box(
    {
      w: 50,
      h: 5,
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
    },
    `Click the link to download your project!\n\n${color.magenta(projectURL)}`,
  );

  outro(`\n${myBox.stringify()}\n${output}`);

  setTimeout(() => {
    console.log(color.yellow("you're still here?"));
    setTimeout(() => {
      console.log(color.yellow("...the demo's over, go home"));
      setTimeout(() => {
        console.log(color.yellow("...go on"));
        setTimeout(() => {
          console.log(color.yellow("shoo"));
        }, 1800000);
      }, 10000);
    }, 10000);
  }, 1800000);

  return;
}

main().catch(console.error);
