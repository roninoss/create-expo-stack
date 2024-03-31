import { Toolbox } from 'gluegun/build/types/domain/toolbox';

import { defaultOptions } from '../constants';
import { CliResults, NavigationTypes, PackageManager } from '../types';
import { getDefaultPackageManagerVersion } from './getPackageManager';

const recommendedBunVersion = '1.0.14';

export async function runCLI(toolbox: Toolbox, projectName: string): Promise<CliResults> {
  const {
    parameters: { options },
    print: { info, success, warning, highlight },
    prompt
  } = toolbox;

  // Set the default options
  const cliResults = defaultOptions;

  // Project name already validated, just set cliResults
  cliResults.projectName = projectName;
  cliResults.flags.overwrite = !!options.overwrite;

  // Clear default packages
  cliResults.packages = [];
  // Ask about TypeScript
  const useTypescript = await prompt.confirm('Would you like to use TypeScript with this project?', true);

  if (useTypescript) {
    success('Good call, now using TypeScript! 🚀');
  } else {
    success(`Wrong answer, we're gonna use Typescript.`);
  }

  const defaultPackageManagerVersion = getDefaultPackageManagerVersion();
  if (cliResults.flags.packageManager) {
    if (options.bun || options.pnpm || options.npm || options.yarn) {
      cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
    } else {
      highlight(
        `\nWe've detected ${cliResults.flags.packageManager} ${
          defaultPackageManagerVersion ? `v${defaultPackageManagerVersion}` : ''
        } as your preferred package manager.`
      );
      const shouldUseDefaultPackageManager = await prompt.confirm(`Would you like to continue using it?`, true);
      if (!shouldUseDefaultPackageManager) {
        const askPackageManager = {
          type: 'select',
          name: 'packageManagerSelect',
          message: 'Which package manager would you like to use?',
          choices: ['npm', 'yarn', 'pnpm', 'bun']
        };
        const { packageManagerSelect } = await prompt.ask(askPackageManager);
        cliResults.flags.packageManager = packageManagerSelect as PackageManager;
      }
    }
  } else {
    if (options.bun || options.pnpm || options.npm || options.yarn) {
      cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
    } else {
      const askPackageManager = {
        type: 'select',
        name: 'packageManagerSelect',
        message: 'Which package manager would you like to use?',
        choices: ['npm', 'yarn', 'pnpm', 'bun']
      };
      const { packageManagerSelect } = await prompt.ask(askPackageManager);
      cliResults.flags.packageManager = packageManagerSelect as PackageManager;
    }
  }

  // Ask about navigation
  const askNavigation = {
    type: 'select',
    name: 'navigationSelect',
    message: 'What would you like to use for Navigation?',
    choices: ['React Navigation', 'Expo Router', 'None']
  };

  const askNavigationType = {
    type: 'select',
    name: 'navigationTypeSelect',
    message: 'What type of navigation would you like to use?',
    choices: ['Stack', 'Tabs', 'Drawer + Tabs']
  };

  const { navigationSelect } = await prompt.ask(askNavigation);

  if (navigationSelect !== 'None') {
    const { navigationTypeSelect } = await prompt.ask(askNavigationType);
    if (navigationSelect === 'React Navigation') {
      cliResults.packages.push({
        name: 'react-navigation',
        type: 'navigation',
        options: {
          type: navigationTypeSelect.toLowerCase() as NavigationTypes
        }
      });
    } else {
      cliResults.packages.push({
        name: 'expo-router',
        type: 'navigation',
        options: {
          type: navigationTypeSelect.toLowerCase() as NavigationTypes
        }
      });
    }
    // If the user is using a version of bun that is anything but version 1.0.14, communicate a message
    if (
      cliResults.flags.packageManager === 'bun' &&
      defaultPackageManagerVersion &&
      defaultPackageManagerVersion !== recommendedBunVersion
    ) {
      warning('⚠️' + ' ' + ` We've detected you're using Bun v${defaultPackageManagerVersion}.`);
      info('');
      warning(
        `Some packages may not work correctly if you continue. We recommend using Bun v${recommendedBunVersion} until peerDependencies are properly resolved with bun install.`
      );
      warning(`For more information, visit https://github.com/oven-sh/bun/issues/4946`);
      info('');
      warning(`To switch to Bun v${recommendedBunVersion}, run:`);
      info('');
      warning(`\tcurl -fsSL https://bun.sh/install | bash -s "bun-v${recommendedBunVersion}"`);
      info('');
      warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
      info('');
      const shouldContinue = await prompt.confirm(
        `Would you like to continue without switching to Bun v${recommendedBunVersion}?`,
        true
      );
      if (!shouldContinue) {
        throw new Error(`User cancelled to install recommended version of Bun.`);
      }
    } else if (cliResults.flags.packageManager === 'bun' && !defaultPackageManagerVersion) {
      warning(
        '⚠️' + ' ' + ` We've detected you're using Bun but we are unable to determine which version you are using.`
      );
      info('');
      warning(
        `We recommend using Bun v${recommendedBunVersion} until peerDependencies are properly resolved with bun install. If you continue with a version that is not v${recommendedBunVersion}, some packages may not work correctly.`
      );
      warning(`For more information, visit https://github.com/oven-sh/bun/issues/4946`);
      info('');
      warning(`To check your version of Bun, run:`);
      info('');
      warning(`\tbun -version`);
      info('');
      warning(`To switch to Bun v${recommendedBunVersion}, run:`);
      info('');
      warning(`\tcurl -fsSL https://bun.sh/install | bash -s "bun-v${recommendedBunVersion}"`);
      info('');
      warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
      info('');
      const shouldContinue = await prompt.confirm('Would you like to continue with your current version of Bun?', true);
      if (!shouldContinue) {
        throw new Error('User cancelled to install recommended version of Bun.');
      }
    }
    success(`Great, we'll use ${navigationSelect}!`);
  } else {
    success(`No problem, skipping navigation for now.`);
  }

  const baseStylePackageNames = ['Nativewind', 'Restyle', 'Stylesheet', 'Tamagui (experimental)', 'Unistyles'];
  const askStyling = {
    type: 'select',
    name: 'stylingSelect',
    message: 'What would you like to use for styling?',
    choices: baseStylePackageNames
  };

  const { stylingSelect } = await prompt.ask(askStyling);
  if (stylingSelect === 'Nativewind') {
    cliResults.packages.push({ name: 'nativewind', type: 'styling' });
    success(`You'll be styling with ease using Tailwind.`);
  } else if (stylingSelect === 'Tamagui (experimental)') {
    cliResults.packages.push({ name: 'tamagui', type: 'styling' });
    success(`You'll be styling with ease using Tamagui.`);
  } else if (stylingSelect === 'Restyle') {
    cliResults.packages.push({ name: 'restyle', type: 'styling' });
    success(`You'll be styling with ease using Restyle.`);
  } else if (stylingSelect === 'Unistyles') {
    cliResults.packages.push({ name: 'unistyles', type: 'styling' });
    success(`You'll be styling with ease using Unistyles.`);
  } else {
    cliResults.packages.push({ name: 'stylesheet', type: 'styling' });
    success(`Cool, you're using the default StyleSheet that comes with React Native.`);
  }

  const askAuthentication = {
    type: 'select',
    name: 'authenticationSelect',
    message: 'What would you like to use for authentication?',
    choices: ['None', 'Supabase', 'Firebase']
  };

  const { authenticationSelect } = await prompt.ask(askAuthentication);

  if (authenticationSelect === 'Supabase') {
    cliResults.packages.push({ name: 'supabase', type: 'authentication' });
    success(`You'll be using Supabase for authentication.`);
  } else if (authenticationSelect === 'Firebase') {
    cliResults.packages.push({ name: 'firebase', type: 'authentication' });
    success(`You'll be using Firebase for authentication.`);
  } else {
    success(`No problem, skipping authentication for now.`);
  }

  // Ask about internationalization
  const askInternalization = {
    type: 'select',
    name: 'internalizationSelect',
    message: 'What would you like to support internationalization?',
    choices: ['i18next', 'None']
  };

  const { internalizationSelect } = await prompt.ask(askInternalization);

  if (internalizationSelect === 'i18next') {
    cliResults.packages.push({ name: 'i18next', type: 'internationalization' });
    success(`You'll be using i18next for internationalization.`);
  } else {
    success(`No problem, skipping internationalization for now.`);
  }

  return cliResults;
}
