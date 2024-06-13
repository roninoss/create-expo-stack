import { cancel, isCancel, multiselect, select } from "@clack/prompts";

export async function setStyles(cliResults, navigationSelect) {
  const stylingSelect = await select({
    message: "What would you like to use for styling?",
    options:
      navigationSelect === "expo-router"
        ? [
            { value: "nativewindui", label: "NativeWindUI" },
            { value: "nativewind", label: "NativeWind" },
            { value: "restyle", label: "Restyle" },
            { value: "stylesheet", label: "StyleSheet" },
            { value: "tamagui", label: "Tamagui (experimental)" },
            { value: "unistyles", label: "Unistyles" },
          ]
        : [
            { value: "nativewind", label: "NativeWind" },
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
    let selectedComponents = [];
    selectedComponents = await multiselect({
      message: "Which components would you like to explore?",
      options: [
        { value: "action-sheet", label: "Action Sheet" },
        { value: "activity-indicator", label: "Activity Indicator" },
        { value: "activity-view", label: "Activity View" },
        { value: "alert", label: "Alert" },
        { value: "avatar", label: "Avatar" },
        { value: "bottom-sheet", label: "Bottom Sheet" },
        { value: "context-menu", label: "Context Menu" },
        { value: "date-picker", label: "Date Picker" },
        { value: "dropdown-menu", label: "Dropdown Menu" },
        { value: "picker", label: "Picker" },
        { value: "progress-indicator", label: "Progress Indicator" },
        { value: "ratings-indicator", label: "Ratings Indicator" },
        { value: "segmented-control", label: "Segmented Control" },
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
        "alert",
        "avatar",
        "bottom-sheet",
        "context-menu",
        "date-picker",
        "dropdown-menu",
        "picker",
        "progress-indicator",
        "ratings-indicator",
        "segmented-control",
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
    success(`You'll be styling with ease using NativeWindUI!`);
  } else {
    cliResults.packages.push({ name: stylingSelect, type: "styling" });
    success(
      `You'll be styling with ease using ${
        stylingSelect.toString().charAt(0).toUpperCase() +
        stylingSelect.toString().slice(1)
      }!`,
    );
  }
}
