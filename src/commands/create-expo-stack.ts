import { GluegunCommand, system } from 'gluegun'

const DEFAULT_APP_NAME = "my-expo-app";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  importAlias: string;
}

const availablePackages = ["nativewind", "react-navigation", "expo-router"] as const;

type NavigationTypes = "stack" | "tabs" | {};

type AvailablePackages = {
  name: (typeof availablePackages)[number];
  type: "navigation" | "styling";
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
      type: "styling",
      options: {}
    },
    {
      name: "expo-router",
      type: "navigation",
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

      const useNativewind = await confirm(
        'Would you like to use NativeWind (Tailwind for RN) with this project?',
        true
      )

      if (useNativewind) {
        cliResults.packages.push({ name: "nativewind", type: 'styling', options: {} });
        success(`You'll be styling with ease using Tailwind.`)
      } else {
        success(`Sounds good, you can use StyleSheet instead.`)
      }

      return cliResults;
    }

    function usePackage(packageName: string, packages: AvailablePackages[]): boolean {
      return packages.find((p) => p.name === packageName) ? true : false;
    }

    try {
      const { projectName, packages, flags } = await runCLI()

      const useNativewind = usePackage("nativewind", packages);
      const navigationPackage = packages.find((p) => p.type === "navigation") || undefined;

      const baseFiles = [
        'base/assets/adaptive-icon.png',
        'base/assets/favicon.png',
        'base/assets/icon.png',
        'base/assets/splash.png',
        'base/tsconfig.json.ejs',
        'base/app.json.ejs',
        'base/App.tsx.ejs',
        'base/babel.config.js.ejs',
        'base/package.json.ejs',
        'base/.gitignore.ejs',
      ];

      let files = [
        ...baseFiles,
      ];

      // add nativewind files if needed
      // modify base files with nativewind specifications
      if (useNativewind) {
        const nativewindFiles = [
          'packages/nativewind/tailwind.config.js.ejs',
          'packages/nativewind/app.d.ts',
        ];

        files = [
          ...files,
          ...nativewindFiles,
        ];
      };

      // add react navigation files if needed
      // modify base files with react navigation specifications
      if (navigationPackage?.name === "react-navigation") {
        let reactNavigationFiles = [
          'packages/react-navigation/App.tsx.ejs',
          'packages/react-navigation/navigation/index.tsx.ejs',
        ];
        // if it's a stack, add the stack files) {
        if (navigationPackage.options === "stack") {
          reactNavigationFiles = [
            ...reactNavigationFiles,
            'packages/react-navigation/screens/details.tsx.ejs',
            'packages/react-navigation/screens/overview.tsx.ejs',
          ];
        } else {
          // it's a tab navigator
          reactNavigationFiles = [
            ...reactNavigationFiles,
            'packages/react-navigation/components/edit-screen-info.tsx.ejs',
            'packages/react-navigation/navigation/tab-navigator.tsx.ejs',
            'packages/react-navigation/screens/modal.tsx.ejs',
            'packages/react-navigation/screens/one.tsx.ejs',
            'packages/react-navigation/screens/two.tsx.ejs',
          ];
        }

        // Remove the base App.tsx.ejs file since we'll be using the one from react-navigation
        files = files.filter((file) => file !== 'base/App.tsx.ejs');

        files = [
          ...files,
          ...reactNavigationFiles,
        ];
      }

      // add expo router files if needed
      // modify base files with expo router specifications
      if (navigationPackage?.name === "expo-router") {
        let expoRouterFiles = [
          'packages/expo-router/expo-env.d.ts',
          'packages/expo-router/metro.config.js',
          'packages/expo-router/index.ts'
        ];
        // if it's a stack, add the stack files) {
        if (navigationPackage.options === "stack") {
          expoRouterFiles = [
            ...expoRouterFiles,
            'packages/expo-router/stack/app/_layout.tsx.ejs',
            'packages/expo-router/stack/app/details.tsx.ejs',
            'packages/expo-router/stack/app/index.tsx.ejs',
          ];
        } else {
          // it's a tab navigator
          expoRouterFiles = [
            ...expoRouterFiles,
            'packages/expo-router/tabs/app/(tabs)/_layout.tsx.ejs',
            'packages/expo-router/tabs/app/(tabs)/index.tsx.ejs',
            'packages/expo-router/tabs/app/(tabs)/two.tsx.ejs',
            'packages/expo-router/tabs/app/_layout.tsx.ejs',
            'packages/expo-router/tabs/app/modal.tsx.ejs',
            'packages/expo-router/tabs/components/edit-screen-info.tsx.ejs',
          ];
        }

        // Remove the base App.tsx.ejs file since we'll be using index.tsx from expo-router
        files = files.filter((file) => file !== 'base/App.tsx.ejs');

        files = [
          ...files,
          ...expoRouterFiles,
        ];
      }

      let formattedFiles = [];

      formattedFiles = files.reduce((prev, file) => {
        const template = file;

        let target = `${projectName}/` + file.replace('.ejs', '').replace('base/', '')

        if (useNativewind) {
          target = target.replace('packages/nativewind/', '');
        }

        if (navigationPackage?.name === "react-navigation") {
          target = target.replace('packages/react-navigation/App.tsx', 'App.tsx');
          target = target.replace('packages/react-navigation/', 'src/');
        }

        if (navigationPackage?.name === "expo-router") {
          target = target.replace('packages/expo-router/', '');
          if (navigationPackage.options === "stack") {
            target = target.replace('stack/', '');
          }
          if (navigationPackage.options === "tabs") {
            target = target.replace('tabs/', '');
          }
        }

        const gen = generate({
          template,
          target,
          props: {
            projectName,
            packages,
            flags,
            useNativewind,
            navigationPackage,
          },
        });

        return prev.concat([gen]);
      }, formattedFiles)

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

      info(``)
      info(`Initializing git...`)
      info(``)

      // initialize git repo and add first commit
      await system.spawn(`cd ${projectName} && git init --quiet && git add . && git commit -m "Initial commit" -m "Generated by create-expo-stack 2.0.0." --quiet`, {
        shell: true,
        stdio: 'inherit',
      })

      success('Success! 🎉 Now, just run the following to get started: ')
      info(``)
      info(`cd ${projectName}`)
      info('yarn ios')
      info(``)

    } catch (error) {
      // TODO: delete all files

      info(`Oops, something went wrong while creating your project 😢`)
      console.error(error)
      info(
        `\nIf this was unexpected, please open an issue: https://github.com/danstepanov/create-expo-stack#reporting-bugs--feedback`
      )
    }
  },
}

export default command;
