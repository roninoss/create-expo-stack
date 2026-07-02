export const DEFAULT_STYLING_PACAKGE = {
  name: "nativewind",
  type: "styling",
};

export const PROJECT_NAME = "my-expo-app";

// Keep in sync with nativewindUIOptions in cli/src/constants.ts
export const NATIVEWINDUI_COMPONENTS = [
  { value: "action-sheet", label: "Action Sheet" },
  { value: "activity-indicator", label: "Activity Indicator" },
  { value: "activity-view", label: "Activity View" },
  { value: "avatar", label: "Avatar" },
  { value: "button", label: "Button" },
  { value: "date-picker", label: "Date Picker" },
  { value: "picker", label: "Picker" },
  { value: "progress-indicator", label: "Progress Indicator" },
  { value: "ratings-indicator", label: "Ratings Indicator" },
  { value: "slider", label: "Slider" },
  { value: "text", label: "Text" },
  { value: "toggle", label: "Toggle" },
];

export const TITLE_TEXT = "create expo stack";

// expo stack orange gradient
export const expoStackTheme = {
  orange: "#f97316",
  between: "f2940f",
  yellow: "#eab308",
};

export let cliResults = {
  projectName: PROJECT_NAME,
  packages: [],
  flags: {
    packageManager: "npm",
  },
};
