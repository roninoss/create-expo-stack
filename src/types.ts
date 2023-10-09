// export types
export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  importAlias: string;
}

export const availablePackages = ["nativewind", "tamagui", "react-navigation", "expo-router"] as const;

export type NavigationTypes = "stack" | "tabs" | {};

export type AvailablePackages = {
  name: (typeof availablePackages)[number];
  type: "navigation" | "styling";
  options: NavigationTypes;
}

export interface CliResults {
  projectName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}