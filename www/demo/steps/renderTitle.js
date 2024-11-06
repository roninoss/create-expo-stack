// import figlet from "figlet";
import gradient from "gradient-string";

import { expoStackTheme } from "../constants.js";

// ronin new
const asciiTitle = `

  _ __  _ __    _ __    ___ __      __
 | '__|| '_ \\  | '_ \\  / _ \\\\ \\ /\\ / /
 | |   | | | | | | | ||  __/ \\ V  V / 
 |_|   |_| |_| |_| |_| \\___|  \\_/\\_/ 

`;

export async function renderTitle() {
  const cesGradient = gradient(Object.values(expoStackTheme));

  console.log(cesGradient.multiline(asciiTitle));

  // TODO: this is hacky, figure out a way to do this better
  // set timeout for 1 second so that the title can render before the CLI runs
  await new Promise((resolve) => setTimeout(resolve, 200));
}

/**
            


 */
