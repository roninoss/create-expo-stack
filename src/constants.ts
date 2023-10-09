import { CliResults } from "./types";

export const TITLE_TEXT = "create expo stack";

export const DEFAULT_APP_NAME = "my-expo-app";

export const defaultOptions: CliResults = {
  projectName: DEFAULT_APP_NAME,
  packages: [],
  flags: {
    noGit: false,
    noInstall: true,
    importAlias: "~/",
  },
};