import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import os from 'os';
import {
  Analytics,
  AuthenticationSelect,
  AvailablePackages,
  CliResults,
  Internalization,
  NavigationSelect,
  NavigationTypes,
  StylingSelect
} from '../types';
import { getPackageManager, getVersionForPackageManager } from './getPackageManager';
import { storeConfigAnalytics } from './configAnalytics';

export function configureProjectFiles(
  authenticationPackage: AvailablePackages | undefined,
  files: string[],
  navigationPackage: AvailablePackages | undefined,
  stylingPackage: AvailablePackages | undefined,
  analyticsPackage: AvailablePackages | undefined,
  toolbox: Toolbox,
  cliResults: CliResults,
  internalizationPackage: AvailablePackages | undefined,
  stateManagementPackage: AvailablePackages | undefined
): string[] {
  // Define the files common to all templates to be generated
  let baseFiles = [
    'base/tsconfig.json.ejs',
    'base/app.json.ejs',
    'base/App.tsx.ejs',
    'base/babel.config.js.ejs',
    'base/package.json.ejs',
    'base/eslint.config.js.ejs',
    'base/.gitignore.ejs',
    'base/prettier.config.js.ejs'
  ];

  if (stylingPackage?.name === 'stylesheet') {
    baseFiles = baseFiles.concat(['base/components/ScreenContent.tsx.ejs', 'base/components/EditScreenInfo.tsx.ejs']);
  }

  const packageManager = getPackageManager(toolbox, cliResults);

  if (stylingPackage?.name === 'nativewindui') {
    let nativewindUIFiles = [
      'base/tsconfig.json.ejs',
      'base/app.json.ejs',
      'base/babel.config.js.ejs',
      'base/package.json.ejs',
      'base/eslint.config.js.ejs',
      'base/.gitignore.ejs',
      'base/prettier.config.js.ejs',
      'packages/expo-router/metro.config.js.ejs',
      'packages/nativewindui/components/nativewindui/ThemeToggle.tsx.ejs',
      'packages/nativewindui/components/nativewindui/Icon/index.ts.ejs',
      'packages/nativewindui/components/nativewindui/Icon/Icon.tsx.ejs',
      'packages/nativewindui/components/nativewindui/Icon/Icon.ios.tsx.ejs',
      'packages/nativewindui/components/nativewindui/Icon/types.ts.ejs',
      'packages/nativewindui/lib/useColorScheme.tsx.ejs',
      'packages/nativewindui/lib/cn.ts.ejs',
      'packages/nativewindui/theme/colors.ts.ejs',
      'packages/nativewindui/theme/index.ts.ejs',
      'packages/nativewindui/theme/with-opacity.ts.ejs',
      'packages/nativewindui/tailwind.config.js.ejs',
      'packages/nativewindui/nativewind-env.d.ts.ejs',
      'packages/nativewindui/global.css.ejs'
    ];

    // Add navigation-specific components only when needed
    if (navigationPackage?.options?.type === 'tabs' || navigationPackage?.options?.type === 'drawer + tabs') {
      nativewindUIFiles.push(
        'packages/nativewindui/components/Container.tsx.ejs',
        'packages/nativewindui/components/EditScreenInfo.tsx.ejs',
        'packages/nativewindui/components/HeaderButton.tsx.ejs',
        'packages/nativewindui/components/ScreenContent.tsx.ejs',
        'packages/nativewindui/components/TabBarIcon.tsx.ejs'
      );
    }

    const nativewindUIStackFiles = [
      'packages/nativewindui/stack/app/_layout.tsx.ejs',
      'packages/nativewindui/stack/app/index.tsx.ejs',
      'packages/nativewindui/stack/app/modal.tsx.ejs',
      'packages/nativewindui/stack/app/+not-found.tsx.ejs',
      'packages/nativewindui/stack/app/+html.tsx.ejs'
    ];

    const nativewindUITabsFiles = [
      'packages/nativewindui/tabs/app/(tabs)/_layout.tsx.ejs',
      'packages/nativewindui/tabs/app/(tabs)/index.tsx.ejs',
      'packages/nativewindui/tabs/app/(tabs)/two.tsx.ejs',
      'packages/nativewindui/tabs/app/_layout.tsx.ejs',
      'packages/nativewindui/tabs/app/modal.tsx.ejs',
      'packages/nativewindui/tabs/app/+not-found.tsx.ejs',
      'packages/nativewindui/tabs/app/+html.tsx.ejs'
    ];

    const nativewindUIDrawerFiles = [
      'packages/nativewindui/drawer/app/_layout.tsx.ejs',
      'packages/nativewindui/drawer/app/(drawer)/_layout.tsx.ejs',
      'packages/nativewindui/drawer/app/(drawer)/index.tsx.ejs',
      'packages/nativewindui/drawer/app/(drawer)/(tabs)/_layout.tsx.ejs',
      'packages/nativewindui/drawer/app/(drawer)/(tabs)/index.tsx.ejs',
      'packages/nativewindui/drawer/app/(drawer)/(tabs)/two.tsx.ejs',
      'packages/nativewindui/drawer/app/modal.tsx.ejs',
      'packages/nativewindui/drawer/app/+not-found.tsx.ejs',
      'packages/nativewindui/drawer/app/+html.tsx.ejs'
    ];

    if (navigationPackage?.options?.type === 'stack') {
      nativewindUIFiles = [...nativewindUIFiles, ...nativewindUIStackFiles];
    } else if (navigationPackage?.options?.type === 'tabs') {
      nativewindUIFiles = [...nativewindUIFiles, ...nativewindUITabsFiles];
    } else if (navigationPackage?.options?.type === 'drawer + tabs') {
      nativewindUIFiles = [...nativewindUIFiles, ...nativewindUIDrawerFiles];
    }

    files = nativewindUIFiles;
  } else {
    files = [...baseFiles];

    // add nativewind files if needed
    // modify base files with nativewind specifications
    if (stylingPackage?.name === 'nativewind') {
      const nativewindFiles = [
        'packages/nativewind/components/ScreenContent.tsx.ejs',
        'packages/nativewind/components/EditScreenInfo.tsx.ejs',
        'packages/nativewind/tailwind.config.js.ejs',
        'packages/nativewind/nativewind-env.d.ts',
        'packages/nativewind/metro.config.js',
        'packages/nativewind/global.css'
      ];

      files = [...files, ...nativewindFiles];
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
      if (stylingPackage?.name === 'nativewind') {
        reactNavigationFiles.push('packages/nativewind/components/Button.tsx.ejs');
        reactNavigationFiles.push('packages/nativewind/components/BackButton.tsx.ejs');
      } else if (stylingPackage?.name === 'unistyles') {
        reactNavigationFiles.push('packages/unistyles/components/Button.tsx.ejs');
        reactNavigationFiles.push('packages/unistyles/components/BackButton.tsx.ejs');
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

      if (stylingPackage?.name === 'nativewind') {
        expoRouterFiles.push('packages/nativewind/components/Container.tsx.ejs');
        expoRouterFiles.push('packages/nativewind/components/Button.tsx.ejs');
      } else if (stylingPackage?.name === 'unistyles') {
        expoRouterFiles.push('packages/unistyles/components/Container.tsx.ejs');
        expoRouterFiles.push('packages/unistyles/components/Button.tsx.ejs');
        expoRouterFiles.push('packages/expo-router/index.js.ejs');
      } else if (stylingPackage?.name === 'stylesheet') {
        expoRouterFiles.push('base/components/Container.tsx.ejs');
        expoRouterFiles.push('base/components/Button.tsx.ejs');
      }

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
          'packages/expo-router/tabs/app/+html.tsx.ejs'
        ];
        // add the necessary components for the navigation
        expoRouterFiles.push('base/components/TabBarIcon.tsx.ejs');
        expoRouterFiles.push('base/components/HeaderButton.tsx.ejs');
      } else {
        // it's a drawer + tabs navigator
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
          'packages/expo-router/drawer/app/modal.tsx.ejs'
        ];
        // add the necessary components for the navigation
        expoRouterFiles.push('base/components/TabBarIcon.tsx.ejs');
        expoRouterFiles.push('base/components/HeaderButton.tsx.ejs');
      }

      // Remove the base App.tsx.ejs file since we'll be using index.tsx from expo-router
      files = files.filter((file) => file !== 'base/App.tsx.ejs');

      files = [...files, ...expoRouterFiles];
    }

    // add supabase files if needed
    if (authenticationPackage?.name === 'supabase') {
      const supabaseFiles = ['packages/supabase/utils/supabase.ts.ejs', 'packages/supabase/.env.ejs'];

      files = [...files, ...supabaseFiles];
    }

    // add supabase files if needed
    if (authenticationPackage?.name === 'firebase') {
      const firebaseFiles = [
        'packages/firebase/utils/firebase.ts.ejs',
        'packages/firebase/metro.config.js.ejs',
        'packages/firebase/.env.ejs'
      ];

      files = [...files, ...firebaseFiles];
    }

    // add vexo analytics files if needed
    if (analyticsPackage?.name == 'vexo-analytics') {
      const vexoFiles = ['packages/vexo-analytics/.env.ejs'];

      files = [...files, ...vexoFiles];
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
  }

  // add state management files if needed
  if (stateManagementPackage?.name === 'zustand') {
    const zustandFiles = ['packages/zustand/store/store.ts.ejs'];
    files = [...files, ...zustandFiles];
  }

  // Add npmrc file if user is using pnpm
  if (packageManager === 'pnpm') {
    files.push('base/.npmrc.ejs');
  }

  const packageManagerVersion = getVersionForPackageManager(cliResults.flags.packageManager);

  const cesConfig = {
    // Add the version of create expo stack used
    cesVersion: require('../../package.json').version || '2.0.0',
    ...cliResults,
    packageManager: {
      type: cliResults.flags.packageManager,
      version: packageManagerVersion
    },
    os: {
      type: os.type(),
      platform: os.platform(),
      arch: os.arch(),
      kernelVersion: os.release()
    }
  };

  toolbox.filesystem.write(
    `./${cliResults.projectName}/cesconfig.jsonc`,
    `// This is an optional configuration file used primarily for debugging purposes when reporting issues.
// It is safe to delete this file as it does not affect the functionality of your application.
${JSON.stringify(cesConfig, null, 2)}`
  );

  const pkg = require('../../package.json');

  storeConfigAnalytics({
    timestamp: new Date().toISOString(),
    cesVersion: pkg.version,
    authType: authenticationPackage?.name as AuthenticationSelect,
    navigationLibrary: navigationPackage?.name as NavigationSelect,
    navigationType: navigationPackage?.options?.type as NavigationTypes,
    stylingLibrary: stylingPackage?.name as StylingSelect,
    packageManager: cliResults.flags.packageManager,
    packageManagerVersion,
    internalization: internalizationPackage?.name as Internalization,
    nativewindUIComponents: stylingPackage?.options?.selectedComponents,
    eas: cliResults.flags.eas,
    importAlias: cliResults.flags.importAlias,
    noGit: cliResults.flags.noGit,
    noInstall: cliResults.flags.noInstall,
    overwrite: cliResults.flags.overwrite,
    os: os.type(),
    osPlatform: os.platform(),
    osArch: os.arch(),
    osRelease: os.release(),
    analytics: analyticsPackage?.name as Analytics
  });

  return files;
}
