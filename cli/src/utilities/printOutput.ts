import { outro, spinner } from '@clack/prompts';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults } from '../types';
import { copyBaseAssets } from './copyBaseAssets';
import { getPackageManager, getPackageManagerRunnerX } from './getPackageManager';
import { easConfigure } from './runEasConfigure';
import { ONLY_ERRORS, runSystemCommand } from './systemCommand';

export async function printOutput(
  cliResults: CliResults,
  formattedFiles: any[],
  toolbox: Toolbox,
  stylingPackage: AvailablePackages
): Promise<void> {
  const {
    parameters: { options },
    print: { info, success, highlight }
  } = toolbox;

  const { projectName, flags } = cliResults;
  const s = spinner();

  // Output the results to the user

  s.start('Initializing your project...');
  await Promise.all(formattedFiles);
  s.stop('Project initialized!');

  s.start('Copying base assets...');
  await copyBaseAssets(projectName, toolbox);
  s.stop('Base assets copied!');

  // check if npm option is set, otherwise set based on what the system is configure to use
  const packageManager = cliResults.flags.packageManager || getPackageManager(toolbox, cliResults);
  const isNpm = packageManager === 'npm';

  // seems like all package managers actually support the run command
  const runCommand = `${packageManager} run`;

  const runnerType = getPackageManagerRunnerX(toolbox, cliResults);

  if (!options.noInstall && !flags.noInstall) {
    s.start(`Installing dependencies using ${packageManager}...`);
    // attempt to improve npm install speeds by disabling audit and progress
    const additionalFlags = packageManager === 'npm' ? '--silent --no-audit --progress=false' : '--silent';

    await runSystemCommand({
      toolbox,
      command: `cd ${projectName} && ${packageManager} install ${additionalFlags}`,
      stdio: packageManager === 'npm' ? undefined : ONLY_ERRORS,
      errorMessage: 'Error installing dependencies'
    });

    s.stop('Dependencies installed!');

    s.start('Updating Expo to latest version...');

    const installCommand = packageManager === 'yarn' ? 'add' : 'install';

    await runSystemCommand({
      toolbox,
      command: `cd ${projectName} && ${packageManager} ${installCommand} ${additionalFlags} expo@latest`,
      stdio: isNpm ? undefined : ONLY_ERRORS,
      errorMessage: 'Error updating expo'
    });

    s.stop('Latest version of Expo installed!');

    s.start('Updating packages to expo compatible versions...');

    await runSystemCommand({
      toolbox,
      command: `cd ${projectName} && ${runnerType} expo@latest install --fix`,
      errorMessage: 'Error updating packages',
      stdio: undefined
    });

    s.stop('Packages updated!');

    s.start(`Cleaning up your project...`);

    // format the files with prettier and eslint using installed packages.
    await runSystemCommand({
      toolbox,
      command: `cd ${projectName} && ${runCommand} format`,
      errorMessage: 'Error formatting code',
      stdio: undefined
    });

    s.stop('Project files formatted!');

    const isNativeWindUISelected = cliResults.packages.some((p) => p.name === 'nativewindui');

    if (isNativeWindUISelected) {
      const nativeWindUIComponents =
        cliResults.packages.find((p) => p.name === 'nativewindui').options.selectedComponents ?? [];

      const finalComponents = Array.from(new Set([...nativeWindUIComponents, 'text']));

      s.start(`Adding nativewindui components...`);

      await runSystemCommand({
        command: `${runnerType} --yes nwui-cli@latest add --overwrite -d ${cliResults.projectName} ${finalComponents.join(' ')}`,
        errorMessage: 'Error adding nativewindui components',
        toolbox,
        stdio: undefined,

        // for some reason running as shell breaks nwui when running in ci
        shell: false,

        // this is how we pass env variables to the child process when not running as shell
        env: {
          ...process.env,
          EXPO_NO_GIT_STATUS: '1',
          ...(process.env.NODE_ENV === 'development' ? { API_BASE_URL: 'https://nativewindui.com' } : {})
        }
      });

      s.stop('Nativewindui components added!');
    }
  } else {
    s.start(`No installation found.\nCleaning up your project using ${runnerType}...`);

    // Running prettier using global runners against the template.
    // Use --no-config to prevent using project's config (that may have plugins/dependencies)
    await runSystemCommand({
      toolbox,
      command: `${runnerType} prettier "${projectName}/**/*.{json,js,jsx,ts,tsx}" --no-config --write`,
      errorMessage: 'Error formatting code',
      stdio: ONLY_ERRORS
    });

    s.stop('Project files formatted!');
  }

  if (!options.noGit && !flags.noGit && process.env.NODE_ENV !== 'test') {
    s.start(`Initializing git...`);
    // initialize git repo and add first commit
    // get create expo stack version
    const cesVersion: string = require('../../package.json').version || '2.0.0';

    await runSystemCommand({
      toolbox,
      command: `cd ${projectName} && git init --quiet && git add . && git commit -m "Initial commit" -m "Generated by create-expo-stack ${cesVersion}" --quiet`,
      errorMessage: 'Error initializing git',
      stdio: 'inherit'
    });

    s.stop(`Git initialized!`);
  }

  if (cliResults.flags.eas) {
    await easConfigure(cliResults, packageManager, toolbox);
  }

  const printVexoSteps = () => {
    info(``);
    highlight('Head over to https://vexo.co to create a new Vexo project.');
    info(``);
    highlight(`Get the API key:`);
    info(`1. Create a new app in your vexo dashboard:`);
    highlight(`https://vexo.co/apps`);
    info(`2. Find your API key on your app settings page.`);
    info(`3. Copy the key and paste it into your .env file.`);
    info(`4. Optionally, follow the docs to get started with Vexo:`);
    highlight(`https://docs.vexo.co/`);
    info(``);
  };

  //	check if packages includes package with name "supabase"
  if (cliResults.packages.some((pkg) => pkg.name === 'supabase')) {
    success(`\nSuccess! 🎉 Now, here's what's next:`);
    info(``);
    highlight('Head over to https://database.new to create a new Supabase project.');
    info(``);
    highlight(`Get the Project URL and anon key from the API settings:`);
    info(`1. Go to the API settings page in the Dashboard.`);
    info(`2. Find your Project URL, anon, and service_role keys on this page.`);
    info(`3. Copy these keys and paste them into your .env file.`);
    info(`4. Optionally, follow one of these guides to get started with Supabase:`);
    highlight(`https://docs.expo.dev/guides/using-supabase/#next-steps`);
    if (cliResults.packages.some((pkg) => pkg.name === 'vexo-analytics')) {
      printVexoSteps();
    }
    success(`Once you're done, run the following to get started: `);
    info(``);
  } else if (cliResults.packages.some((pkg) => pkg.name === 'firebase')) {
    success(`\nSuccess! 🎉 Now, here's what's next:`);
    info(``);
    highlight('Head over to https://console.firebase.google.com/ to create a new Firebase project.');
    info(``);
    highlight(`Get the API key and other unique identifiers:`);
    info(`1. Register a web app in your Firebase project:`);
    highlight(`https://firebase.google.com/docs/web/setup#register-app`);
    info(`2. Find your API key and other identifiers.`);
    info(`3. Copy these keys and paste them into your .env file.`);
    info(`4. Optionally, follow one of these guides to get started with Firebase:`);
    highlight(`https://docs.expo.dev/guides/using-firebase/#next-steps`);
    if (cliResults.packages.some((pkg) => pkg.name === 'vexo-analytics')) {
      printVexoSteps();
    }
    success(`Once you're done, run the following to get started: `);
    info(``);
  } else {
    if (cliResults.packages.some((pkg) => pkg.name === 'vexo-analytics')) {
      success(`Success! 🎉 Now, here's what's next:`);
      printVexoSteps();
      success(`Once you're done, run the following to get started: `);
    } else {
      success('\nSuccess! 🎉 Now, just run the following to get started: ');
    }
    info(``);
  }
  let step = 1;

  if (flags.eas) {
    info(`To build for development:`);
    info(``);
    highlight(`${step}. cd ${projectName}`);
    if (!flags.noInstall) highlight(`${++step}. ${packageManager} install`);
    highlight(`${++step}. eas build --profile=development`);
    highlight(`${++step}. ${runCommand} start`);

    info(``);

    step = 1;

    info(`To create a build to share with others:`);
    info(``);
    highlight(`${step}. cd ${projectName}`);
    if (!flags.noInstall) highlight(`${++step}. ${packageManager} install`);
    highlight(`${++step}. eas build --profile=preview`);

    info(``);

    info('To add additional ios users:');
    info(``);
    highlight(`eas device:create `);
  } else {
    highlight(`${step}. cd ${projectName}`);
    if (!flags.noInstall) highlight(`${++step}. ${packageManager} install`);
    if (stylingPackage.name === 'unistyles' || stylingPackage.name === 'nativewindui') {
      highlight(`${++step}. npx expo prebuild --clean`);
    }
    highlight(`${++step}. ${runCommand} ios`);
  }
  info(``);

  outro(`If you're looking to move even faster, I may be able to help!\n- https://x.com/danstepanov`);
}
