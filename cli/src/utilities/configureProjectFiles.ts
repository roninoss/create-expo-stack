import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults } from '../types';
import { getPackageManager } from './getPackageManager';

export function configureProjectFiles(
  authenticationPackage: AvailablePackages | undefined,
  files: string[],
  navigationPackage: AvailablePackages | undefined,
  stylingPackage: AvailablePackages | undefined,
  toolbox: Toolbox,
  cliResults: CliResults
): string[] {
  // Define the files common to all templates to be generated
  const baseFiles = [
    'base/tsconfig.json.ejs',
    'base/app.json.ejs',
    'base/App.tsx.ejs',
    'base/babel.config.js.ejs',
    'base/package.json.ejs',
    'base/.gitignore.ejs',
    'base/.prettierrc'
  ];

  const packageManager = getPackageManager(toolbox, cliResults);
  // Add npmrc file if user is using pnpm and expo router
  if (packageManager === 'pnpm' && navigationPackage?.name === 'expo-router') {
    baseFiles.push('base/.npmrc.ejs');
  }

  files = [...baseFiles];

  // add nativewind files if needed
  // modify base files with nativewind specifications
  if (stylingPackage?.name === 'nativewind') {
    const nativewindFiles = ['packages/nativewind/tailwind.config.js.ejs', 'packages/nativewind/app.d.ts'];

    files = [...files, ...nativewindFiles];
  }

  // add tamagui files if needed
  // modify base files with tamagui specifications
  if (stylingPackage?.name === 'tamagui') {
    const tamaguiFiles = ['packages/tamagui/tamagui.config.ts.ejs'];

    files = [...files, ...tamaguiFiles];
  }

  // add react navigation files if needed
  // modify base files with react navigation specifications
  if (navigationPackage?.name === 'react-navigation') {
    let reactNavigationFiles = [
      'packages/react-navigation/App.tsx.ejs',
      'packages/react-navigation/navigation/index.tsx.ejs'
    ];
    // if it's a stack, add the stack files) {

    if (navigationPackage?.options?.type === 'stack') {
      reactNavigationFiles = [
        ...reactNavigationFiles,
        'packages/react-navigation/screens/details.tsx.ejs',
        'packages/react-navigation/screens/overview.tsx.ejs'
      ];
    } else if (navigationPackage?.options?.type === 'tabs') {
      // it's a tab navigator
      reactNavigationFiles = [
        ...reactNavigationFiles,
        'packages/react-navigation/components/edit-screen-info.tsx.ejs',
        'packages/react-navigation/navigation/tab-navigator.tsx.ejs',
        'packages/react-navigation/screens/modal.tsx.ejs',
        'packages/react-navigation/screens/one.tsx.ejs',
        'packages/react-navigation/screens/two.tsx.ejs'
      ];
    } else if (navigationPackage?.options?.type === 'tabs + drawer') {
      // it's a drawer navigator
      reactNavigationFiles = [
        ...reactNavigationFiles,
        'packages/react-navigation/components/edit-screen-info.tsx.ejs',
        'packages/react-navigation/navigation/drawer-navigator.tsx.ejs',
        'packages/react-navigation/screens/modal.tsx.ejs',
        'packages/react-navigation/screens/one.tsx.ejs',
        'packages/react-navigation/screens/two.tsx.ejs'
      ];
    }

    // Remove the base App.tsx.ejs file since we'll be using the one from react-navigation
    files = files.filter((file) => file !== 'base/App.tsx.ejs');

    files = [...files, ...reactNavigationFiles];
  }

  // add expo router files if needed
  // modify base files with expo router specifications
  if (navigationPackage?.name === 'expo-router') {
    let expoRouterFiles = [
      'packages/expo-router/expo-env.d.ts',
      'packages/expo-router/metro.config.js',
      'packages/expo-router/index.ts'
    ];
    // if it's a stack, add the stack files) {
    if (navigationPackage?.options?.type === 'stack') {
      expoRouterFiles = [
        ...expoRouterFiles,
        'packages/expo-router/stack/app/_layout.tsx.ejs',
        'packages/expo-router/stack/app/details.tsx.ejs',
        'packages/expo-router/stack/app/index.tsx.ejs'
      ];
    } else if (navigationPackage?.options?.type === 'tabs') {
      // it's a tab navigator
      expoRouterFiles = [
        ...expoRouterFiles,
        'packages/expo-router/tabs/app/(tabs)/_layout.tsx.ejs',
        'packages/expo-router/tabs/app/(tabs)/index.tsx.ejs',
        'packages/expo-router/tabs/app/(tabs)/two.tsx.ejs',
        'packages/expo-router/tabs/app/_layout.tsx.ejs',
        'packages/expo-router/tabs/app/modal.tsx.ejs',
        'packages/expo-router/tabs/components/edit-screen-info.tsx.ejs'
      ];
    } else {
      // it's a drawer navigator
      expoRouterFiles = [
        ...expoRouterFiles,
        'packages/expo-router/drawer/app/(drawer)/_layout.tsx.ejs',
        'packages/expo-router/drawer/app/(drawer)/index.tsx.ejs',
        'packages/expo-router/drawer/app/(drawer)/news.tsx.ejs',
        'packages/expo-router/drawer/app/_layout.tsx.ejs'
      ];
    }

    // Remove the base App.tsx.ejs file since we'll be using index.tsx from expo-router
    files = files.filter((file) => file !== 'base/App.tsx.ejs');

    files = [...files, ...expoRouterFiles];
  }

  // add supabase files if needed
  if (authenticationPackage?.name === 'supabase') {
    const supabaseFiles = ['packages/supabase/utils/supabase.ts.ejs', 'packages/supabase/.env'];

    files = [...files, ...supabaseFiles];
  }

  // add supabase files if needed
  if (authenticationPackage?.name === 'firebase') {
    const firebaseFiles = [
      'packages/firebase/utils/firebase.ts.ejs',
      'packages/firebase/metro.config.js.ejs',
      'packages/firebase/.env'
    ];

    files = [...files, ...firebaseFiles];
  }

  return files;
}
