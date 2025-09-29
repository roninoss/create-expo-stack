import { cancel, isCancel, multiselect, select } from "@clack/prompts";
import color from "picocolors";

export async function setStyles(cliResults, navigationSelect) {
  const stylingSelect = await select({
    message: "What would you like to use for styling?",
    options:
      navigationSelect === "expo-router"
        ? [
            { value: "nativewindui", label: "NativewindUI" },
            { value: "nativewind", label: "Nativewind" },
            { value: "restyle", label: "Restyle" },
            { value: "stylesheet", label: "StyleSheet" },
            { value: "tamagui", label: "Tamagui (experimental)" },
            { value: "unistyles", label: "Unistyles" },
          ]
        : [
            { value: "nativewind", label: "Nativewind" },
            { value: "restyle", label: "Restyle" },
            { value: "stylesheet", label: "StyleSheet" },
            { value: "tamagui", label: "Tamagui (experimental)" },
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
      options: [
        { value: "action-sheet", label: "Action Sheet" },
        { value: "activity-indicator", label: "Activity Indicator" },
        { value: "activity-view", label: "Activity View" },
        { value: "avatar", label: "Avatar" },
        { value: "date-picker", label: "Date Picker" },
        { value: "picker", label: "Picker" },
        { value: "progress-indicator", label: "Progress Indicator" },
        { value: "ratings-indicator", label: "Ratings Indicator" },
        { value: "selectable-text", label: "Selectable Text" },
        { value: "slider", label: "Slider" },
        { value: "text", label: "Text" },
        { value: "toggle", label: "Toggle" },
      ],
      required: false,
      initialValues: [
        "action-sheet",
        "activity-indicator",
        "activity-view",
        "avatar",
        "date-picker",
        "picker",
        "progress-indicator",
        "ratings-indicator",
        "selectable-text",
        "slider",
        "text",
        "toggle",
      ],
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
