// export types
interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  importAlias: string;
}

const availablePackages = ["nativewind", "react-navigation", "expo-router"] as const;

type NavigationTypes = "stack" | "tabs" | {};

type AvailablePackages = {
  name: (typeof availablePackages)[number];
  type: "navigation" | "styling";
  options: NavigationTypes;
}

interface CliResults {
  projectName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}