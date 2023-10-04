import gradient = require("gradient-string");
import figlet = require("figlet");

import { TITLE_TEXT } from "../constants";
import { Toolbox } from "gluegun/build/types/domain/toolbox";

// expo stack orange gradient
const expoStackTheme = {
  orange: "#f97316",
  between: "f2940f",
  yellow: "#eab308",
};

export async function renderTitle(toolbox: Toolbox) {
  const cesGradient = gradient(Object.values(expoStackTheme));

  const {
    print: { info, error }
  } = toolbox;

  await figlet.text(TITLE_TEXT, {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  },
    (err, data) => {
      if (err) {
        error("Something went wrong...");

        return;
      }
      info(``);
      info(``);
      console.log(cesGradient.multiline(data));
      info(``);
      info(``);
    }
  )
};