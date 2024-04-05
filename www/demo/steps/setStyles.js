import { select, isCancel, cancel } from "@clack/prompts";

export async function setStyles(cliResults) {
  const stylingSelect = await select({
    message: "What would you like to use for styling?",
    options: [
      { value: "nativewind", label: "NativeWind" },
      { value: "restyle", label: "Restyle" },
      { value: "stylesheet", label: "StyleSheet" },
      { value: "tamagui", label: "Tamagui (experimental)" },
      { value: "unistyles", label: "Unistyles" },
    ],
    initialValue: "nativewind",
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
