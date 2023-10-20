import { Toolbox } from "gluegun/build/types/domain/toolbox";

import { DEFAULT_APP_NAME, defaultOptions } from "../constants";
import { CliResults } from "../types";

export async function runCLI(toolbox: Toolbox): Promise<CliResults> {
  const {
    parameters: { first },
    print: { success },
    prompt: { ask, confirm }
  } = toolbox;

  // Set the default options
  let cliResults = defaultOptions;

  // Set the app name if it was passed in via the initial command
  if (first) {
    cliResults.projectName = first;
  } else {
    const askName = {
      type: 'input',
      name: 'name',
      message: `What do you want to name your project? (${DEFAULT_APP_NAME})`,
    }
    const { name } = await ask(askName)
    cliResults.projectName = name || DEFAULT_APP_NAME;
  }

  // Clear default packages
  cliResults.packages = [];
  // Ask about TypeScript
  const useTypescript = await confirm(
    'Would you like to use TypeScript with this project?',
    true
  )

  if (useTypescript) {
    success('Good call, now using TypeScript! 🚀')
  } else {
    success(`Wrong answer, we're gonna use Typescript.`)
  }

  // Ask about navigation
  const askNavigation = {
    type: 'select',
    name: 'navigationSelect',
    message: 'What would you like to use for Navigation?',
    choices: ['React Navigation', 'Expo Router', 'None'],
  }

  const askNavigationType = {
    type: 'select',
    name: 'navigationTypeSelect',
    message: 'What type of navigation would you like to use?',
    choices: ['Stack', 'Tabs'],
  }

  const { navigationSelect } = await ask(askNavigation)

  if (navigationSelect !== 'None') {
    const { navigationTypeSelect } = await ask(askNavigationType);
    if (navigationSelect === 'React Navigation') {
      cliResults.packages.push({ name: "react-navigation", type: 'navigation', options: navigationTypeSelect.toLowerCase() });
    } else {
      cliResults.packages.push({ name: "expo-router", type: 'navigation', options: navigationTypeSelect.toLowerCase() });
    }
    success(`Great, we'll use ${navigationSelect}!`)
  } else {
    success(`No problem, skipping navigation for now.`)
  }

  const askStyling = {
    type: "select",
    name: "stylingSelect",
    message: "What would you like to use for styling?",
    choices: ['tamagui', 'nativewind', 'stylesheet']
  }

  const { stylingSelect } = await ask(askStyling)


  if (stylingSelect === 'nativewind') {
    cliResults.packages.push({ name: "nativewind", type: 'styling', options: {} });
    success(`You'll be styling with ease using Tailwind.`)
  } else if (stylingSelect === 'tamagui') {
    cliResults.packages.push({ name: "tamagui", type: 'styling', options: {} });
  } else {
    cliResults.packages.push({ name: "stylesheet", type: 'styling', options: {} });
    success(`Cool, you're using the default StyleSheet that comes with React Native.`)
  }

  return cliResults;
}