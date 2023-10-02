import { GluegunCommand, system } from 'gluegun'
import gradient = require("gradient-string");
import figlet = require("figlet");

// import { getUserPackageManager } from '../utilities/getUserPackageManager';

const DEFAULT_APP_NAME = "myExpoApp";

const TITLE_TEXT = "create expo stack";

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
  packages: [],
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
      parameters: { first, options },
      template: { generate },
      print: { info, success },
      prompt: { ask, confirm }
    } = toolbox

    async function runCLI(): Promise<CliResults> {

      // Set the default options
      let cliResults = defaultOptions;

      // Set the app name if it was passed in via the initial command
      if (first) {
        cliResults.projectName = first;
      }

      // If the user didn't pass in a name, ask them for one
      if (!first) {
        const askName = {
          type: 'input',
          name: 'name',
          message: `What do you want to name your project? (${DEFAULT_APP_NAME})`,
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

    // TODO: add bun support
    // function getPackageManager(): 'npm' | 'yarn' | 'pnpm' {
    //   if (options.npm) return 'npm';
    //   if (options.yarn) return 'yarn';
    //   if (options.pnpm) return 'pnpm';

    //   const packageManager = getUserPackageManager();
      
    //   return packageManager
    // }

    // colors brought in from vscode poimandres theme
    const poimandresTheme = {
      orange: "#f97316",
      between: "f2940f",
      yellow: "#eab308",
    };

    async function renderTitle() {
      const cesGradient = gradient(Object.values(poimandresTheme));

      await figlet.text(TITLE_TEXT, {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      },
      (err, data) => {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        info(``);
        info(``);
        console.log(cesGradient.multiline(data));
        info(``);
        info(``);
      }
      )
    };

    try {
      await renderTitle();
      // set timeout for 1 second
      await new Promise((resolve) => setTimeout(resolve, 200));
      // Set the default options
      let cliResults: CliResults = defaultOptions;

      // Check if user wants to create an opinionated stack prior to running the configurable CLI
      if (options.ignite) {
        let projectName;
        if (!first) {
          const askName = {
            type: 'input',
            name: 'name',
            message: `What do you want to name your project? (${DEFAULT_APP_NAME})`,
          }
          const { name } = await ask(askName)
          projectName = name
        } else {
          projectName = first;
        }
        
        success('Running Ignite CLI to create an opinionated stack...')
        await system.spawn(`npx ignite-cli@latest new ${projectName}${options.default && ` --yes`}`, {
          shell: true,
          stdio: 'inherit',
        });
      } else {
        
        // if the options object contains the default key, skip running the CLI
        if ((options.default !== undefined && !options.default) || !options.nonInteractive) {
          //  Run the CLI to prompt the user for input
          cliResults = await runCLI()
        }

        // [Internal] Update the cliResults with the options passed in via the command
        // This is used for testing purposes only
        if (options.reactNavigation) {
          // Add react-navigation package
          cliResults.packages.push({ name: "react-navigation", type: 'navigation', options: {
            navigationType: options.tabs ? "tabs" : "stack" }});
        }
        if (options.expoRouter) {
          // Add expo-router package
          cliResults.packages.push({ name: "expo-router", type: 'navigation', options: {
            navigationType: options.tabs ? "tabs" : "stack" }});
        }
        if (options.nativewind) {
          // Add nativewind package
          cliResults.packages.push({ name: "nativewind", type: 'styling', options: {} });
        }


        // Destructure the results but set the projectName if the first param is passed in
        if (first) {
          cliResults.projectName = first;
        }

        const { projectName, packages, flags } = cliResults;
        
        // Define props to be passed into the templates
        const useNativewind = usePackage("nativewind", packages);
        const navigationPackage = packages.find((p) => p.type === "navigation") || undefined;

        // Define the files common to all templates to be generated
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

        // Once all the files are defined, format and generate them
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

        // Output the results to the user
        info(``)
        info(`Initializing your project...`)
        info(``)

        await Promise.all(formattedFiles);
        
        // check if npm option is set, otherwise set based on what the system is configure to use
        // const packageManager = getPackageManager();

        // if (!options.noInstall && !flags.noInstall) {
        //   info(``)
        //   info(`Installing dependencies using ${packageManager}...`)
        //   info(``)

        //   // install with yarn or npm i
        //   await system.spawn(`cd ${projectName} && ${packageManager} install --silent && ${packageManager} run --quiet format`, {
        //     shell: true,
        //     stdio: 'inherit',
        //   })
        // }

        // if (!options.noGit && !flags.noGit) {
        //   info(``)
        //   info(`Initializing git...`)
        //   info(``)

        //   // initialize git repo and add first commit
        //   await system.spawn(`cd ${projectName} && git init --quiet && git add . && git commit -m "Initial commit" -m "Generated by create-expo-stack 2.0.0." --quiet`, {
        //     shell: true,
        //     stdio: 'inherit',
        //   })
        // };

        success('Success! 🎉 Now, just run the following to get started: ')
        info(``)
        info(`cd ${projectName}`)
        // if (packageManager === 'npm') {
        //   if (options.noInstall) info('npm install')
        //   info('npm run ios')
        // } else if (packageManager === 'pnpm') {
        //   if (options.noInstall) info('pnpm install')
        //   info('pnpm run ios')
        // } else {
        //   if (options.noInstall) info('yarn install')
        //   info('yarn ios')
        // }
        info('yarn')
        info('yarn ios')
        info(``)
      }

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
