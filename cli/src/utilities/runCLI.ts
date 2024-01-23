import { Toolbox } from 'gluegun/build/types/domain/toolbox';

import { defaultOptions } from '../constants';
import { CliResults, NavigationTypes, PackageManager } from '../types';

export async function runCLI(toolbox: Toolbox, projectName: string): Promise<CliResults> {
  const {
    parameters: { options },
    print: { success },
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
    choices: ['Stack', 'Tabs', 'Drawer']
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
    success(`Great, we'll use ${navigationSelect}!`);
  } else {
    success(`No problem, skipping navigation for now.`);
  }

  const askStyling = {
    type: 'select',
    name: 'stylingSelect',
    message: 'What would you like to use for styling?',
    choices: ['Nativewind', 'Restyle', 'Stylesheet', 'Tamagui (experimental)']
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

  if (!cliResults.flags.packageManager) {
    const askPackageManager = {
      type: 'select',
      name: 'packageManagerSelect',
      message: 'Which package manager would you like to use?',
      choices: ['npm', 'yarn', 'pnpm', 'bun']
    };

    const { packageManagerSelect } = await prompt.ask(askPackageManager);

    cliResults.flags.packageManager = packageManagerSelect as PackageManager;
  } else {
    cliResults.flags.packageManager = 'npm';
  }
  return cliResults;
}
