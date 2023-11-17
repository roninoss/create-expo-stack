// export types
export interface CliFlags {
	noGit: boolean;
	noInstall: boolean;
	importAlias: string;
}

export const availablePackages = [
	'expo-router',
	'expoRouter',
	'firebase',
	'nativewind',
	'react-navigation',
	'reactNavigation',
	'reactnavigation',
	'supabase',
	'stylesheet',
	'tamagui',
	'@react-navigation/drawer',
	'react-native-gesture-handler',
	'react-native-reanimated'
] as const;

export type NavigationTypes = 'stack' | 'tabs' | 'drawer' | undefined;

export type PackageManager = 'yarn' | 'npm' | 'pnpm' | 'bun';

export type AvailablePackages = {
	name: (typeof availablePackages)[number];
	type: 'navigation' | 'styling' | 'authentication';
	options?: { type?: NavigationTypes };
};

export interface CliResults {
	projectName: string;
	packages: AvailablePackages[];
	flags: CliFlags;
}
