import { cancel, confirm, isCancel, multiselect, select, text } from '@clack/prompts';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';

import { semver } from 'gluegun';
import { bunInstallationError, defaultOptions, nativewindUIOptions } from '../constants';
import {
  AuthenticationSelect,
  StateManagementSelect,
  CliResults,
  NavigationSelect,
  NavigationTypes,
  PackageManager,
  SelectedComponents,
  StylingSelect
} from '../types';
import { loadConfigs, saveConfig } from './configStorage';
import { getDefaultPackageManagerVersion } from './getPackageManager';

// based on eas default bun version https://docs.expo.dev/build-reference/infrastructure/#ios-server-images
const minBunVersion = '1.1.13'; // or greater

export async function runCLI(toolbox: Toolbox, projectName: string): Promise<CliResults> {
  const {
    parameters: { options },
    print: { info, success, warning, highlight }
  } = toolbox;

  // Set the default options
  const cliResults = defaultOptions;

  // Project name already validated, just set cliResults
  cliResults.projectName = projectName;
  cliResults.flags.overwrite = !!options.overwrite;
  cliResults.flags.eas = !!options.eas;

  // Clear default packages
  cliResults.packages = [];

  // Check whether the user has any saved create expo stack configurations
  const savedConfigs = await loadConfigs();

  // If the user has saved configurations, ask if they would like to use them
  if (savedConfigs.length > 0) {
    const useSavedConfig = await confirm({
      message: 'Would you like to use a saved configuration?',
      initialValue: false
    });

    if (isCancel(useSavedConfig)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    if (useSavedConfig) {
      const savedConfigSelect = await select({
        message: 'Which saved configuration would you like to use?',
        options: savedConfigs.map((config) => ({ value: config.name, label: config.name }))
      });

      if (isCancel(savedConfigSelect)) {
        cancel('Cancelled... 👋');
        return process.exit(0);
      }

      const selectedConfig = savedConfigs.find((config) => config.name === savedConfigSelect);

      if (selectedConfig) {
        cliResults.packages = selectedConfig.cliResults.packages;
        cliResults.flags = selectedConfig.cliResults.flags;
        success(`Using saved configuration: ${selectedConfig.name}`);

        return cliResults;
      } else {
        warning('Saved configuration not found, continuing with default configuration.');
      }
    }
  }

  // Ask about TypeScript
  const shouldUseTypescript = await confirm({
    message: 'Would you like to use TypeScript with this project?',
    initialValue: true
  });

  if (isCancel(shouldUseTypescript)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (shouldUseTypescript) {
    success('Good call, now using TypeScript! 🚀');
  } else {
    success(`Wrong answer, we're gonna use Typescript.`);
  }

  const defaultPackageManagerVersion = getDefaultPackageManagerVersion();
  if (cliResults.flags.packageManager) {
    if (options.bun || options.pnpm || options.npm || options.yarn) {
      cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
    } else {
      const shouldUseDefaultPackageManager = await confirm({
        message: `\nWe've detected ${cliResults.flags.packageManager} ${
          defaultPackageManagerVersion ? `v${defaultPackageManagerVersion}` : ''
        } as your preferred package manager.\nWould you like to continue using it?`,
        initialValue: true
      });

      if (isCancel(shouldUseDefaultPackageManager)) {
        cancel('Cancelled... 👋');
        return process.exit(0);
      }
      if (!shouldUseDefaultPackageManager) {
        const packageManagerSelect = await select({
          message: 'Gotcha! Which package manager would you like to use?',
          options: [
            { value: 'npm', label: 'npm' },
            { value: 'yarn', label: 'yarn' },
            { value: 'pnpm', label: 'pnpm' },
            { value: 'bun', label: 'bun' }
          ] satisfies Array<{ value: PackageManager; label: string }>,
          initialValue: 'npm' as PackageManager
        });

        if (isCancel(packageManagerSelect)) {
          cancel('Cancelled... 👋');
          return process.exit(0);
        }
        // random comment for the versioning change
        cliResults.flags.packageManager = packageManagerSelect;
      }
    }
  } else {
    if (options.bun || options.pnpm || options.npm || options.yarn) {
      cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
    } else {
      const packageManagerSelect = await select({
        message: 'Which package manager would you like to use?',
        options: [
          { value: 'npm', label: 'npm' },
          { value: 'yarn', label: 'yarn' },
          { value: 'pnpm', label: 'pnpm' },
          { value: 'bun', label: 'bun' }
        ]
      });

      if (isCancel(packageManagerSelect)) {
        cancel('Cancelled... 👋');
        return process.exit(0);
      }

      cliResults.flags.packageManager = packageManagerSelect as PackageManager;
    }
  }

  const navigationSelect = await select({
    message: 'What would you like to use for Navigation?',
    options: [
      { value: 'react-navigation', label: 'React Navigation' },
      { value: 'expo-router', label: 'Expo Router' },
      { value: undefined, label: 'None' }
    ],
    initialValue: 'expo-router'
  });

  if (isCancel(navigationSelect)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (navigationSelect) {
    const navigationType = await select({
      message: 'What type of navigation would you like to use?',
      options: [
        { value: 'stack', label: 'Stack' },
        { value: 'tabs', label: 'Tabs' },
        { value: 'drawer + tabs', label: 'Drawer + Tabs' }
      ]
    });

    if (isCancel(navigationType)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    cliResults.packages.push({
      name: navigationSelect as NavigationSelect,
      type: 'navigation',
      options: {
        type: navigationType as NavigationTypes
      }
    });

    // If the user is using a version of bun that is anything but version 1.0.22, communicate a message
    if (
      cliResults.flags.packageManager === 'bun' &&
      defaultPackageManagerVersion &&
      semver.lt(defaultPackageManagerVersion, minBunVersion)
    ) {
      warning('⚠️' + ' ' + ` We've detected you're using Bun v${defaultPackageManagerVersion}.`);
      info('');
      warning(
        `Some packages may not work correctly if you continue. We recommend using the latest version of Bun or at-least v${minBunVersion}.`
      );
      warning(`For more information, visit https://github.com/oven-sh/bun/issues/8406`);
      info('');
      warning(`To upgrade to Bun run:`);
      info('');
      highlight(`bun upgrade`);
      info('');
      warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
      info('');

      const shouldContinue = await confirm({
        message: `Would you like to continue without upgrading Bun?`,
        initialValue: false
      });

      if (isCancel(shouldContinue) || !shouldContinue) {
        throw new Error(bunInstallationError);
      }

      success(`Great, we'll use ${navigationSelect}!`);
    } else if (cliResults.flags.packageManager === 'bun' && !defaultPackageManagerVersion) {
      warning(
        '⚠️' + ' ' + ` We've detected you're using Bun but we are unable to determine which version you are using.`
      );
      info('');
      warning(
        `We recommend using the latest version of Bun or at-least v${minBunVersion}. If you continue with an earlier version, some packages may not work correctly.`
      );
      warning(`For more information, visit https://github.com/oven-sh/bun/issues/8406`);
      info('');
      warning(`To check your version of Bun, run:`);
      info('');
      highlight(`bun -version`);
      info('');
      warning(`To upgrade Bun run:`);
      info('');
      highlight(`bun upgrade`);
      info('');
      warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
      info('');

      const shouldContinue = await confirm({
        message: `Would you like to continue with your current version of Bun?`,
        initialValue: false
      });

      if (isCancel(shouldContinue) || !shouldContinue) {
        throw new Error(bunInstallationError);
      }

      success(`Great, we'll use ${navigationSelect}!`);
    }
  } else {
    success(`No problem, skipping navigation for now.`);
  }

  const stylingSelect = await select({
    message: 'What would you like to use for styling?',
    options: [
      // Note: nativewindui temporarily disabled (was only shown when expo-router was selected)
      { value: 'nativewind', label: 'Nativewind' },
      { value: 'stylesheet', label: 'StyleSheet' },
      { value: 'unistyles', label: 'Unistyles' }
    ],
    initialValue: 'nativewind'
  });

  if (isCancel(stylingSelect)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (stylingSelect === 'nativewindui') {
    const selectedComponents = await multiselect({
      message: 'Which components would you like to explore?',
      options: [
        { value: 'action-sheet', label: 'Action Sheet' },
        { value: 'activity-indicator', label: 'Activity Indicator' },
        { value: 'activity-view', label: 'Activity View' },
        { value: 'avatar', label: 'Avatar' },
        { value: 'date-picker', label: 'Date Picker' },
        { value: 'picker', label: 'Picker' },
        { value: 'progress-indicator', label: 'Progress Indicator' },
        { value: 'ratings-indicator', label: 'Ratings Indicator' },
        { value: 'slider', label: 'Slider' },
        // We always include text and button so we don't need to provide this option
        // { value: 'text', label: 'Text' },
        // { value: 'button', label: 'Button' },
        { value: 'toggle', label: 'Toggle' }
      ] satisfies Array<{ value: SelectedComponents; label: string }>,
      required: false,
      initialValues: nativewindUIOptions
    });

    if (isCancel(selectedComponents)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    cliResults.packages.push({
      name: 'nativewindui' as StylingSelect,
      type: 'styling',
      options: {
        selectedComponents: Array.from(new Set([...selectedComponents, 'text', 'button']))
      }
    });

    success(`You'll be styling with ease using NativewindUI!`);
  } else {
    cliResults.packages.push({ name: stylingSelect as StylingSelect, type: 'styling' });
    success(
      `You'll be styling with ease using ${
        stylingSelect.toString().charAt(0).toUpperCase() + stylingSelect.toString().slice(1)
      }!`
    );
  }

  const stateManagementSelect = await select({
    message: 'What would you like to use for state management?',
    options: [
      { value: undefined, label: 'None' },
      { value: 'zustand', label: 'Zustand' }
      // { value: 'mobx', label: 'MobX' },
      // { value: 'redux', label: 'Redux' },
    ]
  });

  if (isCancel(stateManagementSelect)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (stateManagementSelect) {
    cliResults.packages.push({
      name: stateManagementSelect as StateManagementSelect,
      type: 'state-management'
    });

    success(`You'll be using ${stateManagementSelect} for state management.`);
  } else {
    success(`No problem, skipping state management for now.`);
  }

  const authenticationOptions: Array<{ value: AuthenticationSelect; label: string }> = [
    { value: undefined, label: 'None' },
    { value: 'supabase', label: 'Supabase' },
    { value: 'firebase', label: 'Firebase' }
  ];

  const authenticationSelect = await select({
    message: 'What would you like to use for authentication?',
    options: authenticationOptions
  });

  if (isCancel(authenticationSelect)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }
  if (authenticationSelect) {
    cliResults.packages.push({ name: authenticationSelect as AuthenticationSelect, type: 'authentication' });
  } else {
    success(`No problem, skipping authentication for now.`);
  }

  const easEnabled = await confirm({
    message: `Do you want to setup EAS`,
    initialValue: false
  });

  if (isCancel(easEnabled)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (easEnabled) {
    cliResults.flags.eas = true;
    success(`We'll setup EAS for you.`);
  } else {
    success(`No problem, skipping eas for now.`);
  }

  // Offer user ability to save configuration
  const shouldSaveConfig = await confirm({
    message: 'Would you like to save this configuration for future use?',
    initialValue: false
  });

  if (isCancel(shouldSaveConfig)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (shouldSaveConfig) {
    const name = await text({
      message: 'What do you want to name this configuration?',
      placeholder: 'Default'
    });

    if (isCancel(name)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    await saveConfig({ name, cliResults });
  }

  return cliResults;
}
