import { select, isCancel, cancel, confirm, text, intro, spinner, outro } from '@clack/prompts';
import color from 'picocolors';

import util from 'util';

const DEFAULT_STYLING_PACAKGE = {
  name: 'nativewind',
  type: 'styling'
};

async function main() {
  console.clear();
  let cliResults = {
    projectName: 'my-expo-app',
    packages: [],
    flags: {
      packageManager: 'npm'
    }
  };

  intro(`${color.bgCyan(color.black(' create-expo-stack '))}`);

  // NAME
  const name = await text({
    message: 'What do you want to name your project?',
    placeholder: 'my-expo-app',
    validate: (value) => {
      if (!value) return 'Please enter a project name.';
    }
  });
  if (isCancel(name)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }
  // if name is undefined or empty string, use default name
  cliResults.projectName = name || 'my-expo-app';

  // LANGUAGE
  const shouldUseTypescript = await confirm({
    message: 'Would you like to use TypeScript with this project?',
    initialValue: true
  });
  if (isCancel(shouldUseTypescript)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }
  if (shouldUseTypescript) {
    console.log('Good call, now using TypeScript! 🚀');
  } else {
    console.log(`Wrong answer, we're gonna use Typescript.`);
  }

  // PACKAGE MANAGER
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
  cliResults.flags.packageManager = packageManagerSelect;

  // NAVIGATION
  const navigationSelect = await select({
    message: 'What would you like to use for Navigation?',
    options: [
      { value: 'react-navigation', label: 'React Navigation' },
      { value: 'expo-router', label: 'Expo Router' },
      { value: '', label: 'None' }
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
      name: navigationSelect,
      type: 'navigation',
      options: {
        type: navigationType
      }
    });
    console.log(`Great, we'll use ${navigationSelect}!`);
  } else {
    console.log(`No problem, skipping navigation for now.`);
  }

  // STYLING
  const stylingSelect = await select({
    message: 'What would you like to use for styling?',
    options: [
      { value: 'nativewind', label: 'NativeWind' },
      { value: 'restyle', label: 'Restyle' },
      { value: 'stylesheet', label: 'StyleSheet' },
      { value: 'tamagui', label: 'Tamagui (experimental)' },
      { value: 'unistyles', label: 'Unistyles' }
    ],
    initialValue: 'nativewind'
  });
  if (isCancel(stylingSelect)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }
  cliResults.packages.push({ name: stylingSelect, type: 'styling' });
  console.log(
    `You'll be styling with ease using ${
      stylingSelect.toString().charAt(0).toUpperCase() + stylingSelect.toString().slice(1)
    }!`
  );

  // AUTHENTICATION
  const authenticationSelect = await select({
    message: 'What would you like to use for authentication?',
    options: [
      { value: undefined, label: 'None' },
      { value: 'supabase', label: 'Supabase' },
      { value: 'firebase', label: 'Firebase' }
    ]
  });
  if (isCancel(authenticationSelect)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }
  if (authenticationSelect) {
    cliResults.packages.push({ name: authenticationSelect, type: 'authentication' });
  } else {
    console.log(`No problem, skipping authentication for now.`);
  }

  const s = spinner();
  s.start('Initializing your project...');
  // CALL ENDPOINT HERE WITH CLI RESULTS
  s.stop('Project initialized!');

  console.log('');
  console.log(color.blue('Your project configuration:'));
  console.log(`${util.inspect(cliResults, false, null, true /* enable colors */)}`);

  const authenticationPackage = cliResults.packages.find((p) => p.type === 'authentication') || undefined;
  //	check if packages includes package with name "supabase"
  if (authenticationPackage && authenticationPackage.name === 'supabase') {
    console.log(color.green(`\nSuccess! 🎉 Now, here's what's next:`));
    console.log(``);
    console.log(color.blue('Head over to https://database.new to create a new Supabase project.'));
    console.log(``);
    console.log(color.blue(`Get the Project URL and anon key from the API settings:`));
    console.log(`1. Go to the API settings page in the Dashboard.`);
    console.log(`2. Find your Project URL, anon, and service_role keys on this page.`);
    console.log(`3. Copy these keys and paste them into your .env file.`);
    console.log(`4. Optionally, follow one of these guides to get started with Supabase:`);
    console.log(color.blue(`https://docs.expo.dev/guides/using-supabase/#next-steps`));
    console.log(``);
    console.log(color.green(`Once you're done, run the following to get started: `));
    console.log(``);
  } else if (authenticationPackage && authenticationPackage.name === 'firebase') {
    console.log(color.green(`\nSuccess! 🎉 Now, here's what's next:`));
    console.log(``);
    console.log(color.blue('Head over to https://console.firebase.google.com/ to create a new Firebase project.'));
    console.log(``);
    console.log(color.blue(`Get the API key and other unique identifiers:`));
    console.log(`1. Register a web app in your Firebase project:`);
    console.log(color.blue(`https://firebase.google.com/docs/web/setup#register-app`));
    console.log(`2. Find your API key and other identifiers.`);
    console.log(`3. Copy these keys and paste them into your .env file.`);
    console.log(`4. Optionally, follow one of these guides to get started with Firebase:`);
    console.log(color.blue(`https://docs.expo.dev/guides/using-firebase/#next-steps`));
    console.log(``);
    console.log(color.green(`Once you're done, run the following to get started: `));
    console.log(``);
  } else {
    console.log(color.green('\nSuccess! 🎉 Now, just run the following to get started: '));
    console.log(``);
  }
  let step = 1;
  // if there is no styling package, add the stylesheet package
  const stylingPackage = cliResults.packages.find((p) => p.type === 'styling') || DEFAULT_STYLING_PACAKGE;
  console.log(color.blue(`${step}. cd ${cliResults.projectName}`));
  if (cliResults.flags.packageManager === 'npm') {
    console.log(color.blue(`${++step}. npm install`));
    if (stylingPackage.name === 'unistyles') {
      console.log(color.blue(`${++step}. npx expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. npm run ios`));
  } else if (cliResults.flags.packageManager === 'pnpm') {
    console.log(color.blue(`${++step}. pnpm install`));
    if (stylingPackage.name === 'unistyles') {
      console.log(color.blue(`${++step}. pnpm expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. pnpm run ios`));
  } else if (cliResults.flags.packageManager === 'bun') {
    console.log(color.blue(`${++step}. bun install`));
    if (stylingPackage.name === 'unistyles') {
      console.log(color.blue(`${++step}. bun expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. bun run ios`));
  } else {
    console.log(color.blue(`${++step}. yarn install`));
    if (stylingPackage.name === 'unistyles') {
      console.log(color.blue(`${++step}. yarn expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. yarn ios`));
  }
  console.log(``);

  outro(
    'If you frequently use create expo stack, please consider sponsoring the project ❤️\n- https://github.com/sponsors/danstepanov'
  );

  return cliResults;
}

main().catch(console.error);
