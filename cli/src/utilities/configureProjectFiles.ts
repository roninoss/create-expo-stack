import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults } from '../types';
import { getPackageManager, getVersionForPackageManager } from './getPackageManager';
import os from 'os';

export function configureProjectFiles(
  authenticationPackage: AvailablePackages | undefined,
  files: string[],
  navigationPackage: AvailablePackages | undefined,
  stylingPackage: AvailablePackages | undefined,
  analyticsPackage: AvailablePackages | undefined,
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
    baseFiles = baseFiles.concat([
      'base/components/Container.tsx.ejs',
      'base/components/ScreenContent.tsx.ejs',
      'base/components/EditScreenInfo.tsx.ejs'
    ]);
  }

  const packageManager = getPackageManager(toolbox, cliResults);
  // Add npmrc file if user is using pnpm and expo router
  if (packageManager === 'pnpm') {
    baseFiles.push('base/.npmrc.ejs');
  }

  if (stylingPackage?.name === 'nativewindui') {
    let nativewindUIFiles = [
      'base/tsconfig.json.ejs',
      'base/app.json.ejs',
      'base/babel.config.js.ejs',
      'base/package.json.ejs',
      'base/.gitignore.ejs',
      'base/prettier.config.js.ejs',
      'packages/expo-router/metro.config.js.ejs',
      'packages/nativewindui/components/BackButton.tsx.ejs',
      'packages/nativewindui/components/Button.tsx.ejs',
      'packages/nativewindui/components/Container.tsx.ejs',
      'packages/nativewindui/components/EditScreenInfo.tsx.ejs',
      'packages/nativewindui/components/HeaderButton.tsx.ejs',
      'packages/nativewindui/components/ScreenContent.tsx.ejs',
      'packages/nativewindui/components/TabBarIcon.tsx.ejs',
      'packages/nativewindui/components/nativewindui/Text.tsx.ejs',
      'packages/nativewindui/components/nativewindui/ThemeToggle.tsx.ejs',
      'packages/nativewindui/lib/useColorScheme.tsx.ejs',
      'packages/nativewindui/lib/useHeaderSearchBar.tsx.ejs',
      'packages/nativewindui/lib/cn.ts.ejs',
      'packages/nativewindui/theme/colors.ts.ejs',
      'packages/nativewindui/theme/index.ts.ejs',
      'packages/nativewindui/tailwind.config.js.ejs',
      'packages/nativewindui/nativewind-env.d.ts.ejs',
      'packages/nativewindui/global.css.ejs'
    ];

    const nativeWindUIStackFiles = [
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
      nativewindUIFiles = [...nativewindUIFiles, ...nativeWindUIStackFiles];
    } else if (navigationPackage?.options?.type === 'tabs') {
      nativewindUIFiles = [...nativewindUIFiles, ...nativewindUITabsFiles];
    } else if (navigationPackage?.options?.type === 'drawer + tabs') {
      nativewindUIFiles = [...nativewindUIFiles, ...nativewindUIDrawerFiles];
    }

    if (stylingPackage?.options.selectedComponents.includes('activity-indicator')) {
      nativewindUIFiles = [
        ...nativewindUIFiles,
        'packages/nativewindui/components/nativewindui/ActivityIndicator.tsx.ejs'
      ];
    }

    if (stylingPackage?.options.selectedComponents.includes('avatar')) {
      nativewindUIFiles = [...nativewindUIFiles, 'packages/nativewindui/components/nativewindui/Avatar.tsx.ejs'];
    }

    if (stylingPackage?.options.selectedComponents.includes('bottom-sheet')) {
      nativewindUIFiles = [...nativewindUIFiles, 'packages/nativewindui/components/nativewindui/Sheet.tsx.ejs'];
    }

    if (stylingPackage?.options.selectedComponents.includes('date-picker')) {
      nativewindUIFiles = [
        ...nativewindUIFiles,
        'packages/nativewindui/components/nativewindui/DatePicker.android.tsx.ejs',
        'packages/nativewindui/components/nativewindui/DatePicker.tsx.ejs'
      ];
    }

    if (stylingPackage?.options.selectedComponents.includes('dropdown-menu')) {
      nativewindUIFiles = [...nativewindUIFiles, 'packages/nativewindui/components/nativewindui/Picker.tsx.ejs'];
    }

    if (stylingPackage?.options.selectedComponents.includes('picker')) {
      nativewindUIFiles = [...nativewindUIFiles, 'packages/nativewindui/components/nativewindui/Picker.tsx.ejs'];
    }

    if (stylingPackage?.options.selectedComponents.includes('progress-indicator')) {
      nativewindUIFiles = [
        ...nativewindUIFiles,
        'packages/nativewindui/components/nativewindui/ProgressIndicator.tsx.ejs'
      ];
    }

    if (stylingPackage?.options.selectedComponents.includes('segmented-control')) {
      nativewindUIFiles = [
        ...nativewindUIFiles,
        'packages/nativewindui/components/nativewindui/SegmentedControl.tsx.ejs'
      ];
    }

    if (stylingPackage?.options.selectedComponents.includes('slider')) {
      nativewindUIFiles = [...nativewindUIFiles, 'packages/nativewindui/components/nativewindui/Slider.tsx.ejs'];
    }

    if (stylingPackage?.options.selectedComponents.includes('toggle')) {
      nativewindUIFiles = [...nativewindUIFiles, 'packages/nativewindui/components/nativewindui/Toggle.tsx.ejs'];
    }

    files = nativewindUIFiles;
  } else {
    files = [...baseFiles];

    // add nativewind files if needed
    // modify base files with nativewind specifications
    if (stylingPackage?.name === 'nativewind') {
      const nativewindFiles = [
        'packages/nativewind/components/Container.tsx.ejs',
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
        'packages/tamagui/components/Container.tsx.ejs',
        'packages/tamagui/components/ScreenContent.tsx.ejs',
        'packages/tamagui/components/EditScreenInfo.tsx.ejs'
      ];

      files = [...files, ...tamaguiFiles];
    }

    // add restyle files if needed
    // modify base files with restyle specifications
    if (stylingPackage?.name === 'restyle') {
      const restyleFiles = [
        'packages/restyle/components/Container.tsx.ejs',
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
        'packages/unistyles/components/Container.tsx.ejs',
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

      if (stylingPackage?.name === 'restyle') {
        expoRouterFiles.push('packages/restyle/components/Button.tsx.ejs');
      } else if (stylingPackage?.name === 'nativewind') {
        expoRouterFiles.push('packages/nativewind/components/Button.tsx.ejs');
      } else if (stylingPackage?.name === 'unistyles') {
        expoRouterFiles.push('packages/unistyles/components/Button.tsx.ejs');
      } else if (stylingPackage?.name === 'tamagui') {
        expoRouterFiles.push('packages/tamagui/components/Button.tsx.ejs');
      } else if (stylingPackage?.name === 'stylesheet') {
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
          'packages/expo-router/stack/app/+not-found.tsx.ejs',
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
      const supabaseFiles = [
        'packages/supabase/utils/supabase.ts.ejs',
        'packages/supabase/.env.ejs'
      ];

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

  const packageManagerVersion = getVersionForPackageManager(cliResults.flags.packageManager);

  const cesConfig = {
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

  toolbox.filesystem.write(`./${cliResults.projectName}/cesconfig.json`, JSON.stringify(cesConfig, null, 2));

  return files;
}
