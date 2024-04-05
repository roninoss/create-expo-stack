// import figlet from "figlet";
import gradient from "gradient-string";

import { expoStackTheme, TITLE_TEXT } from "../constants.js";

const asciiTitle = `
                          _
   ___  _ __  ___   __ _ | |_  ___
  / __|| '__|/ _ \\ / _' || __|/ _ \\
 | (__ | |  |  __/| (_| || |_|  __/
  \\___||_|   \\___| \\__,_| \\__|\\___|
   ___ __  __ _ __    ___
  / _ \\\\ \\/ /| '_ \\  / _ \\
 |  __/ >  < | |_) || (_) |
  \\___|/_/\\_\\| .__/  \\___/
       _     |_|        _
  ___ | |_  __ _   ___ | | __
 / __|| __|/ _' | / __|| |/ /
 \\__ \\| |_| (_| || (__ |   <
 |___/ \\__|\\__,_| \\___||_|\\_\\
`;

export async function renderTitle() {
  const cesGradient = gradient(Object.values(expoStackTheme));

  console.log(cesGradient.multiline(asciiTitle));

  // TODO: this is hacky, figure out a way to do this better
  // set timeout for 1 second so that the title can render before the CLI runs
  await new Promise((resolve) => setTimeout(resolve, 200));
}
