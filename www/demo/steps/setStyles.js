import { select, isCancel, cancel } from "@clack/prompts";

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
  cliResults.packages.push({ name: stylingSelect, type: "styling" });
  console.log(
    `You'll be styling with ease using ${
      stylingSelect.toString().charAt(0).toUpperCase() +
      stylingSelect.toString().slice(1)
    }!`,
  );
}
