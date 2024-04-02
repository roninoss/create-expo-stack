// export types
export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  overwrite: boolean;
  importAlias: string | boolean;
  packageManager: PackageManager;
}

export const availablePackages = [
  '@react-navigation/drawer',
  'expo-router',
  'expoRouter',
  'firebase',
  'nativewind',
  'react-navigation',
  'reactNavigation',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'reactnavigation',
  'stylesheet',
  'supabase',
  'tamagui',
  'restyle',
  'unistyles',
  'i18next'
] as const;

export type AuthenticationSelect = 'supabase' | 'firebase' | undefined;

export type NavigationSelect = 'react-navigation' | 'expo-router' | undefined;

export type NavigationTypes = 'stack' | 'tabs' | 'drawer + tabs' | undefined;

export type StylingSelect = 'nativewind' | 'restyle' | 'stylesheet' | 'tamagui' | 'unistyles';

export type PackageManager = 'yarn' | 'npm' | 'pnpm' | 'bun';

export type Internalization = 'i18next';

export type AvailablePackages = {
  name: (typeof availablePackages)[number];
  type: 'navigation' | 'styling' | 'authentication' | 'internationalization';
  options?: { type?: NavigationTypes };
};

export interface CliResults {
  projectName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}
