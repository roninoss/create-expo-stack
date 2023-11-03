// export types
export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  importAlias: string;
}

export const availablePackages = ["nativewind", "tamagui", "react-navigation", "reactNavigation", "reactnavigation", "expo-router", "expoRouter", "stylesheet"] as const;

export type NavigationTypes = "stack" | "tabs" | undefined;

export type AvailablePackages = {
  name: (typeof availablePackages)[number];
  type: "navigation" | "styling";
  options?: { type?: NavigationTypes };
}

export interface CliResults {
  projectName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}