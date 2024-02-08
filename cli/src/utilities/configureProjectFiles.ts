import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults } from '../types';
import { getPackageManager } from './getPackageManager';

export function configureProjectFiles(
  authenticationPackage: AvailablePackages | undefined,
  files: string[],
  navigationPackage: AvailablePackages | undefined,
  stylingPackage: AvailablePackages | undefined,
  toolbox: Toolbox,
  cliResults: CliResults,
  internalizationPackage: AvailablePackages | undefined
): string[] {
  // Define the files common to all templates to be generated
  let baseFiles = [
    'base/tsconfig.json.ejs',
    'base/app.json.ejs',
    'base/App.tsx.ejs',
    'base/babel.config.js.ejs',
    'base/package.json.ejs',
    'base/.gitignore.ejs',
    'base/prettier.config.js.ejs'
  ];

  if (stylingPackage?.name === 'stylesheet') {
    baseFiles = baseFiles.concat(['base/components/ScreenContent.tsx.ejs', 'base/components/EditScreenInfo.tsx.ejs']);
  }

  const packageManager = getPackageManager(toolbox, cliResults);
  // Add npmrc file if user is using pnpm and expo router
  if (packageManager === 'pnpm' && navigationPackage?.name === 'expo-router') {
    baseFiles.push('base/.npmrc.ejs');
  }

  files = [...baseFiles];

  // add nativewind files if needed
  // modify base files with nativewind specifications
  if (stylingPackage?.name === 'nativewind') {
    const nativewindFiles = [
      'packages/nativewind/components/ScreenContent.tsx.ejs',
      'packages/nativewind/components/EditScreenInfo.tsx.ejs',
      'packages/nativewind/tailwind.config.js.ejs',
      'packages/nativewind/app-env.d.ts',
      'packages/nativewind/metro.config.js',
      'packages/nativewind/global.css'
    ];

    files = [...files, ...nativewindFiles];
  }

  // add tamagui files if needed
  // modify base files with tamagui specifications
  if (stylingPackage?.name === 'tamagui') {
    const tamaguiFiles = [
      'packages/tamagui/tamagui.config.ts.ejs',
      'packages/tamagui/components/ScreenContent.tsx.ejs',
      'packages/tamagui/components/EditScreenInfo.tsx.ejs'
    ];

    files = [...files, ...tamaguiFiles];
  }

  // add restyle files if needed
  // modify base files with restyle specifications
  if (stylingPackage?.name === 'restyle') {
    const restyleFiles = [
      'packages/restyle/components/ScreenContent.tsx.ejs',
      'packages/restyle/components/EditScreenInfo.tsx.ejs',
      'packages/restyle/theme/theme.ts.ejs',
      'packages/restyle/theme/Box.tsx.ejs',
      'packages/restyle/theme/Text.tsx.ejs',
      'packages/restyle/theme/index.ts.ejs'
    ];

    files = [...files, ...restyleFiles];
  }

  // add unistyles files if needed
  // modify base files with unis specifications
  if (stylingPackage?.name === 'unistyles') {
    const unistylesFiles = [
      'packages/unistyles/components/ScreenContent.tsx.ejs',
      'packages/unistyles/components/EditScreenInfo.tsx.ejs',
      'packages/unistyles/breakpoints.ts.ejs',
      'packages/unistyles/theme.ts.ejs',
      'packages/unistyles/unistyles.ts.ejs'
    ];

    files = [...files, ...unistylesFiles];
  }

  // add react navigation files if needed
  // modify base files with react navigation specifications
  if (navigationPackage?.name === 'react-navigation') {
    let reactNavigationFiles = [
      'packages/react-navigation/App.tsx.ejs',
      'packages/react-navigation/navigation/index.tsx.ejs'
    ];

    // add the necessary components for the navigation
    if (stylingPackage?.name === 'restyle') {
      reactNavigationFiles.push('packages/restyle/components/Button.tsx.ejs');
      reactNavigationFiles.push('packages/restyle/components/BackButton.tsx.ejs');
    } else if (stylingPackage?.name === 'nativewind') {
      reactNavigationFiles.push('packages/nativewind/components/Button.tsx.ejs');
      reactNavigationFiles.push('packages/nativewind/components/BackButton.tsx.ejs');
    } else if (stylingPackage?.name === 'unistyles') {
      reactNavigationFiles.push('packages/unistyles/components/Button.tsx.ejs');
      reactNavigationFiles.push('packages/unistyles/components/BackButton.tsx.ejs');
    } else if (stylingPackage?.name === 'tamagui') {
      reactNavigationFiles.push('packages/tamagui/components/Button.tsx.ejs');
      reactNavigationFiles.push('packages/tamagui/components/BackButton.tsx.ejs');
    } else {
      reactNavigationFiles.push('base/components/Button.tsx.ejs');
      reactNavigationFiles.push('base/components/BackButton.tsx.ejs');
    }

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
        'packages/react-navigation/navigation/tab-navigator.tsx.ejs',
        'packages/react-navigation/screens/modal.tsx.ejs',
        'packages/react-navigation/screens/one.tsx.ejs',
        'packages/react-navigation/screens/two.tsx.ejs'
      ];
      // add the necessary components for the navigation
      reactNavigationFiles.push('base/components/TabBarIcon.tsx.ejs');
      reactNavigationFiles.push('base/components/HeaderButton.tsx.ejs');
    } else if (navigationPackage?.options?.type === 'drawer + tabs') {
      // it's a drawer navigator
      reactNavigationFiles = [
        ...reactNavigationFiles,
        'packages/react-navigation/navigation/drawer-navigator.tsx.ejs',
        'packages/react-navigation/navigation/tab-navigator.tsx.ejs',
        'packages/react-navigation/screens/home.tsx.ejs',
        'packages/react-navigation/screens/modal.tsx.ejs',
        'packages/react-navigation/screens/one.tsx.ejs',
        'packages/react-navigation/screens/two.tsx.ejs'
      ];

      // add the necessary components for the navigation
      reactNavigationFiles.push('base/components/TabBarIcon.tsx.ejs');
      reactNavigationFiles.push('base/components/HeaderButton.tsx.ejs');
    }

    // Remove the base App.tsx.ejs file since we'll be using the one from react-navigation
    files = files.filter((file) => file !== 'base/App.tsx.ejs');
    files = [...files, ...reactNavigationFiles];
  }

  // add expo router files if needed
  // modify base files with expo router specifications
  if (navigationPackage?.name === 'expo-router') {
    let expoRouterFiles = ['packages/expo-router/expo-env.d.ts', 'packages/expo-router/metro.config.js.ejs'];
    // if it's a stack, add the stack files) {
    if (navigationPackage?.options?.type === 'stack') {
      expoRouterFiles = [
        ...expoRouterFiles,
        'packages/expo-router/stack/app/_layout.tsx.ejs',
        'packages/expo-router/stack/app/details.tsx.ejs',
        'packages/expo-router/stack/app/index.tsx.ejs',
        'packages/expo-router/stack/app/+not-found.tsx.ejs',
        'packages/expo-router/stack/app/+html.tsx.ejs'
      ];
      // add the necessary components for the navigation
      expoRouterFiles.push('base/components/Button.tsx.ejs');
    } else if (navigationPackage?.options?.type === 'tabs') {
      // it's a tab navigator
      expoRouterFiles = [
        ...expoRouterFiles,
        'packages/expo-router/tabs/app/(tabs)/_layout.tsx.ejs',
        'packages/expo-router/tabs/app/(tabs)/index.tsx.ejs',
        'packages/expo-router/tabs/app/(tabs)/two.tsx.ejs',
        'packages/expo-router/tabs/app/_layout.tsx.ejs',
        'packages/expo-router/tabs/app/modal.tsx.ejs',
        'packages/expo-router/tabs/app/+not-found.tsx.ejs',
        'packages/expo-router/tabs/app/+html.tsx.ejs',
        'packages/expo-router/tabs/components/edit-screen-info.tsx.ejs'
      ];
    } else {
      // it's a drawer navigator
      expoRouterFiles = [
        ...expoRouterFiles,
        'packages/expo-router/drawer/app/_layout.tsx.ejs',
        'packages/expo-router/drawer/app/+not-found.tsx.ejs',
        'packages/expo-router/drawer/app/+html.tsx.ejs',
        'packages/expo-router/drawer/app/(drawer)/_layout.tsx.ejs',
        'packages/expo-router/drawer/app/(drawer)/index.tsx.ejs',
        'packages/expo-router/drawer/app/(drawer)/(tabs)/_layout.tsx.ejs',
        'packages/expo-router/drawer/app/(drawer)/(tabs)/index.tsx.ejs',
        'packages/expo-router/drawer/app/(drawer)/(tabs)/two.tsx.ejs',
        'packages/expo-router/drawer/app/modal.tsx.ejs',
        'packages/expo-router/drawer/components/edit-screen-info.tsx.ejs'
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

  // add i18next files if needed
  if (internalizationPackage?.name === 'i18next') {
    const i18nextFiles = [
      'packages/i18next/core/i18n/fallbackChecker.ts.ejs',
      'packages/i18next/core/i18n/init.ts.ejs',
      'packages/i18next/core/i18n/languageDetector.ts.ejs',
      'packages/i18next/translation/en.json.ejs',
      'packages/i18next/translation/fr.json.ejs',
      'packages/i18next/translation/index.ts.ejs',
      'packages/i18next/components/InternalizationExample.tsx.ejs'
    ];

    files = [...files, ...i18nextFiles];
  }

  return files;
}
