import { GluegunCommand, system } from 'gluegun'

const DEFAULT_APP_NAME = "my-expo-app";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  importAlias: string;
}

const availablePackages = ["nativewind", "react-navigation", "expo-router"] as const;

type NavigationTypes = "stack" | "tab" | {};

type AvailablePackages = {
  name: (typeof availablePackages)[number];
  options: NavigationTypes;
}

interface CliResults {
  projectName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  projectName: DEFAULT_APP_NAME,
  packages: [
    {
      name: "nativewind",
      options: {}
    },
    {
      name: "expo-router",
      options: {
        navigationType: "stack"
      }
    }
  ],
  flags: {
    noGit: false,
    noInstall: false,
    importAlias: "~/",
  },
};

const command: GluegunCommand = {
  name: 'create-expo-stack',
  description: 'A CLI to create a new Expo project with the stack of your choice.',
  run: async (toolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info, success },
      prompt: { ask, confirm }
    } = toolbox

    async function runCLI(): Promise<CliResults> {

      // Set the default options
      let cliResults = defaultOptions;

      // Set the app name if it was passed in via the initial command
      if (parameters.first) {
        cliResults.projectName = parameters.first;
      }

      // If the user didn't pass in a name, ask them for one
      if (!parameters.first) {
        const askName = {
          type: 'input',
          name: 'name',
          message: 'What do you want to name your project? (my-expo-app)',
        }
        const { name } = await ask(askName)
        cliResults.projectName = name
      }
      // Clear packages
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
        choices: ['Stack', 'Tab'],
      }

      const { navigationSelect } = await ask(askNavigation)

      if (navigationSelect !== 'None') {
        const { navigationTypeSelect } = await ask(askNavigationType);
        if (navigationSelect === 'React Navigation') {
          cliResults.packages.push({ name: "react-navigation", options: navigationTypeSelect.toLowerCase() });
        } else {
          cliResults.packages.push({ name: "expo-router", options: navigationTypeSelect.toLowerCase() });
        }
        success(`Great, we'll use ${navigationSelect}!`)
      } else {
        success(`No problem, skipping navigation for now.`)
      }

      const useNativewind = await confirm(
        'Would you like to use NativeWind (Tailwind for RN) with this project?',
        true
      )

      if (useNativewind) {
        cliResults.packages.push({ name: "nativewind", options: {} });
        success(`You'll be styling with ease using Tailwind.`)
      } else {
        success(`Sounds good, you can use StyleSheet instead.`)
      }

      return cliResults;
    }

    function userWantsPackage(packageName: string, packages: AvailablePackages[]): boolean {
      return packages.find((p) => p.name === packageName) ? true : false;
    }

    try {
      const { projectName, packages, flags } = await runCLI()

      const userWantsNativewind = userWantsPackage("nativewind", packages);

      const baseFiles = [
        'base/assets/adaptive-icon.png',
        'base/assets/favicon.png',
        'base/assets/icon.png',
        'base/assets/splash.png',
        'base/tsconfig.json',
        'base/app.json.ejs',
        'base/App.tsx.ejs',
        'base/babel.config.js.ejs',
        'base/package.json.ejs',
      ];

      let files = [
        ...baseFiles,
      ];

      // add nativewind files if needed
      // modify base files with nativewind specifications
      // files to modify
      // - babel.config.js.ejs
      // - App.tsx.ejs
      // - package.json.ejs
      if (userWantsNativewind) {
        const nativewindFiles = [
          'packages/nativewind/tailwind.config.js.ejs',
          'packages/nativewind/app.d.ts',
        ];

        files = [
          ...files,
          ...nativewindFiles,
        ];
      };

      let formattedFiles = [];

      formattedFiles = files.reduce((prev, file) => {
        const template = file;

        const target = `${projectName}/` + file.replace('.ejs', '').replace('base/', '').replace('packages/nativewind/', '');

        const gen = generate({ template, target, props: { projectName, packages, flags, userWantsNativewind } });

        return prev.concat([gen]);
      }, formattedFiles)

      
      // TODO: add expo router files if needed

      // TODO: add react navigation files if needed

      info(``)
      info(`Initializing your project...`)
      info(``)

      await Promise.all(formattedFiles);

      info(``)
      info(`Installing dependencies...`)
      info(``)

      // install with yarn or npm i
      const yarnOrNpm = system.which('yarn') ? 'yarn' : 'npm'
      await system.spawn(`cd ${projectName} && ${yarnOrNpm} install --silent && ${yarnOrNpm} run --quiet format`, {
        shell: true,
        stdio: 'inherit',
      })

      success('Success! 🎉 Now, just run the following to get started: ')
      info(``)
      info(`cd ${projectName}`)
      info('yarn ios')
      info(``)

    } catch (error) {
      // clean up and delete all files
      info(`Oops, something went wrong while creating your project 😢`)
      info(
        `\nIf this was unexpected, please open an issue: https://github.com/danstepanov/create-expo-stack#reporting-bugs--feedback`
      )
    }
  },
}

export default command;
