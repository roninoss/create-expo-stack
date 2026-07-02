import { cancel, isCancel, multiselect, select } from "@clack/prompts";
import color from "picocolors";

import { NATIVEWINDUI_COMPONENTS } from "../constants.js";

export async function setStyles(cliResults, navigationSelect) {
  const stylingSelect = await select({
    message: "What would you like to use for styling?",
    options:
      navigationSelect === "expo-router"
        ? [
            { value: "nativewindui", label: "NativewindUI" },
            { value: "nativewind", label: "Nativewind" },
            { value: "stylesheet", label: "StyleSheet" },
            { value: "unistyles", label: "Unistyles" },
          ]
        : [
            { value: "nativewind", label: "Nativewind" },
            { value: "stylesheet", label: "StyleSheet" },
            { value: "unistyles", label: "Unistyles" },
          ],
    initialValue:
      navigationSelect === "expo-router" ? "nativewindui" : "nativewind",
  });

  if (isCancel(stylingSelect)) {
    cancel("Cancelled... 👋");
    return process.exit(0);
  }

  if (stylingSelect === "nativewindui") {
    let selectedComponents = await multiselect({
      message: "Which components would you like to explore?",
      options: NATIVEWINDUI_COMPONENTS,
      required: false,
      initialValues: NATIVEWINDUI_COMPONENTS.map((c) => c.value),
    });

    if (isCancel(selectedComponents)) {
      cancel("Cancelled... 👋");
      return process.exit(0);
    }

    cliResults.packages.push({
      name: "nativewindui",
      type: "styling",
      options: {
        selectedComponents,
      },
    });
    console.log(color.green(`You'll be styling with ease using NativewindUI!`));
  } else {
    cliResults.packages.push({ name: stylingSelect, type: "styling" });
    console.log(
      color.green(
        `You'll be styling with ease using ${
          stylingSelect.toString().charAt(0).toUpperCase() +
          stylingSelect.toString().slice(1)
        }!`,
      ),
    );
  }
}
