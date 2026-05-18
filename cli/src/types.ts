// export types
export interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  overwrite: boolean;
  importAlias: string | boolean;
  packageManager: PackageManager;
  eas: boolean;
  publish: boolean;
}

export const availablePackages = [
  '@react-navigation/drawer',
  'expo-router',
  'expoRouter',
  'firebase',
  'nativewind',
  'nativewindui',
  'nwui',
  'react-navigation',
  'reactNavigation',
  'gesture-handler',
  'gestureHandler',
  'reanimated',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-keyboard-controller',
  'react-native-screens',
  'react-native-svg',
  'react-native-worklets',
  'keyboard-controller',
  'keyboardController',
  'reactnavigation',
  'screens',
  'restyle',
  'stylesheet',
  'supabase',
  'svg',
  'tamagui',
  'uniwind',
  'unistyles',
  'worklets',
  'i18next',
  'zustand',
  'vexo-analytics'
] as const;

export type AuthenticationSelect = 'supabase' | 'firebase' | undefined;

export type NavigationSelect = 'react-navigation' | 'expo-router' | undefined;

export type NavigationTypes = 'stack' | 'tabs' | 'drawer + tabs' | undefined;

export type StylingSelect =
  | 'nativewind'
  | 'stylesheet'
  | 'unistyles'
  | 'nativewindui'
  | 'uniwind'
  | 'restyle'
  | 'tamagui';

export type PackageManager = 'yarn' | 'npm' | 'pnpm' | 'bun';

export type StateManagementSelect = 'zustand' | undefined;

export type Internalization = 'i18next';

export type Analytics = 'vexo-analytics';

export type SoftwareMansionSelect =
  | 'react-native-gesture-handler'
  | 'react-native-reanimated'
  | 'react-native-keyboard-controller'
  | 'react-native-screens'
  | 'react-native-svg'
  | 'react-native-worklets';

export type SelectedComponents =
  | 'action-sheet'
  | 'activity-indicator'
  | 'activity-view'
  | 'avatar'
  | 'button'
  | 'date-picker'
  | 'picker'
  | 'progress-indicator'
  | 'ratings-indicator'
  | 'slider'
  | 'text'
  | 'toggle';

export type AvailablePackages = {
  name: (typeof availablePackages)[number];
  type:
    | 'navigation'
    | 'styling'
    | 'authentication'
    | 'internationalization'
    | 'state-management'
    | 'analytics'
    | 'software-mansion';
  options?: { selectedComponents?: SelectedComponents[]; type?: NavigationTypes };
};

export interface CliResults {
  projectName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}
