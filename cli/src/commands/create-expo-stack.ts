import { GluegunCommand } from 'gluegun';
const util = require('util');

import {
  configureProjectFiles,
  generateProjectFiles,
  getPackageManager,
  printOutput,
  renderTitle,
  runCLI,
  runIgnite,
  showHelp,
  publishToGitHub
} from '../utilities';
import {
  bunInstallationError,
  DEFAULT_APP_NAME,
  defaultOptions,
  nativeWindUIOptions,
  navigationValidationError,
  projectNameValidationError
} from '../constants';
import { CliResults, availablePackages } from '../types';
import clearStylingPackages from '../utilities/clearStylingPackages';
import { validateProjectName } from '../utilities/validateProjectName';
import { cancel, intro, isCancel, text } from '@clack/prompts';
import clearNavigationPackages from '../utilities/clearNavigationPackages';

const command: GluegunCommand = {
  name: 'create-expo-stack',
  description: 'Create a new Expo project',
  run: async (toolbox) => {
    const {
      filesystem: { exists, removeAsync },
      parameters: { first, options },
      print: { error, info, highlight, success, warning },
      prompt
    } = toolbox;

    const printSomethingWentWrong = () => {
      info(`\nOops, something went wrong while creating your project 😢`);
      info(
        `\nIf this was unexpected, please open an issue: https://github.com/roninoss/create-expo-stack#reporting-bugs--feedback`
      );
      info('');
    };

    // Handle help flag
    if (options.help || options.h) {
      showHelp(info, highlight, warning);
      return;
    }

    // Handle publish flag
    if (options.publish) {
      info('\nPublishing current project to GitHub...');
      const repoUrl = await publishToGitHub(toolbox, process.cwd().split('/').pop() || '');

      if (repoUrl) {
        success('\n🎉 Successfully published to GitHub!');
        info(`\n📎 Repository URL: ${repoUrl}`);
      }
      return;
    }

    // Conditionally skip running the CLI
    const useDefault = (options.default !== undefined && options.default) || (options.d !== undefined && options.d);
    const skipCLI = options.nonInteractive;
    const useBlankTypescript =
      options.nativewindui == undefined ? options.blank || false : (options.blank && options.nativewindui) || false;

    // Check if any of the options were passed in via the command
    const optionsPassedIn = availablePackages.some((condition) => options[condition] !== undefined);

    // Set the default options
    let cliResults: CliResults = defaultOptions;
    cliResults.flags.packageManager = getPackageManager(toolbox, cliResults);

    // START INPUT VALIDATION
    try {
      // Validation: check if the user passed in the tabs/drawer option without passing in either expo router or react navigation. If so, throw an error
      if (
        (options.tabs || options['drawer+tabs']) &&
        !options.reactNavigation &&
        !options['react-navigation'] &&
        !options.reactnavigation &&
        !options.expoRouter &&
        !options['expo-router'] &&
        !options.exporouter &&
        // nativewindui applies the expo router option by default
        !options.nativewindui
      ) {
        // throw an error without a stack trace
        throw navigationValidationError;
      }

      await renderTitle(toolbox);
      intro(`Let's get started!`);

      // Prompt the user for the project name if it is not passed in via the command
      // - TODO: simplify this if statement to clarify what is being checked
      if (!first && (options.ignite || !(useDefault || optionsPassedIn || skipCLI || useBlankTypescript))) {
        const name = await text({
          message: 'What do you want to name your project?',
          placeholder: DEFAULT_APP_NAME
        });

        if (isCancel(name)) {
          cancel('Cancelled... 👋');
          return process.exit(0);
        }

        // if name is undefined or empty string, use default name
        cliResults.projectName = (name && name.toString()) || DEFAULT_APP_NAME;
      } else {
        // Destructure the results but set the projectName if the first param is passed in
        cliResults.projectName = first || DEFAULT_APP_NAME;
        const pathSegments = cliResults.projectName.split('/');
        cliResults.projectName = pathSegments.pop(); // get last segment as the project name
      }

      // Validate the provided project name; check if the directory already exists
      // - We may or may not be interactive, so conditionally pass in prompt.
      // - Ignore validation if the overwrite option is passed in.
      if (options.overwrite) {
        cliResults.flags.overwrite = true;
      }

      if (options.eas) {
        cliResults.flags.eas = true;
      }

      await validateProjectName(
        exists,
        removeAsync,
        !(useDefault || optionsPassedIn || skipCLI || useBlankTypescript) ? prompt : null,
        cliResults.projectName,
        cliResults.flags.overwrite
      );
    } catch (err: string | any) {
      if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        error(`error: ${err}`);
      }

      if (err === '') {
        // user cancelled/exited the interactive CLI
        return void success(`\nCancelled... 👋 \n`);
      }
      if (err === navigationValidationError) {
        // user tried passing in tabs/drawer option without passing in either expo router or react navigation
        return void error(`\n${navigationValidationError}\n`);
      }
      if (err.message.includes(projectNameValidationError)) {
        return void success(`\nCancelled... 👋 \n`);
      }

      // we keep this around so we can check what went wrong
      if (process.env.NODE_ENV !== 'test') {
        // Delete all files with projectName
        await removeAsync(cliResults.projectName);
      }

      printSomethingWentWrong();
      throw err;
    }
    // END INPUT VALIDATION

    // Determine remaining options, run interactive CLI if necessary, and generate project
    try {
      // Check if user wants to create an opinionated stack prior to running the configurable CLI
      if (options.ignite) {
        await runIgnite(toolbox, cliResults.projectName, cliResults);
      } else {
        // Check if the user wants to not install dependencies and/or not initialize git, update cliResults accordingly
        cliResults.flags.noInstall =
          options.noInstall || (typeof options.install === 'boolean' && !options.install) || false;
        cliResults.flags.noGit = options.noGit || (typeof options.git === 'boolean' && !options.git) || false;

        // Validate import alias string forward slash and asterisk
        if (typeof options.importAlias === 'string') {
          if (!options.importAlias.endsWith('/*')) {
            throw new Error('Import alias must end in `/*`, for example: `@/*` or `~/`');
          }
        }

        cliResults.flags.importAlias = options.importAlias !== false && options['import-alias'] !== false;

        if (!(useDefault || optionsPassedIn || skipCLI || useBlankTypescript)) {
          //  Run the CLI to prompt the user for input
          cliResults = await runCLI(toolbox, cliResults.projectName);
        }

        // Update the cliResults with the options passed in via the command
        // Navigation packages
        if (options.reactNavigation || options['react-navigation'] || options.reactnavigation) {
          // Add react-navigation package
          cliResults.packages.push({
            name: 'react-navigation',
            type: 'navigation',
            options: {
              type: options.tabs ? 'tabs' : options['drawer+tabs'] ? 'drawer + tabs' : 'stack'
            }
          });
        }

        if (options.expoRouter || options['expo-router'] || options.exporouter) {
          // Add expo-router package
          cliResults.packages.push({
            name: 'expo-router',
            type: 'navigation',
            options: {
              type: options.tabs ? 'tabs' : options['drawer+tabs'] ? 'drawer + tabs' : 'stack'
            }
          });
        }

        // Styling packages
        if (options.nativewind) {
          // Check if there is already a styling library added and remove it if so
          cliResults = clearStylingPackages(cliResults);
          // Add nativewind package
          cliResults.packages.push({
            name: 'nativewind',
            type: 'styling'
          });
        } else if (options.nativewindui) {
          cliResults = clearStylingPackages(cliResults);
          cliResults = clearNavigationPackages(cliResults);

          const parsedComponents =
            options?.selectedComponents
              ?.split(',')
              ?.map((c: string) => c.trim())
              ?.filter((item) => nativeWindUIOptions.includes(item)) ?? [];

          const selectedComponents = parsedComponents.length
            ? Array.from(new Set([...parsedComponents, 'text']))
            : nativeWindUIOptions;

          cliResults.packages.push({
            name: 'nativewindui',
            type: 'styling',
            options: {
              selectedComponents: options.blank ? ['text'] : selectedComponents
            }
          });

          cliResults.packages.push({
            name: 'expo-router',
            type: 'navigation',
            options: {
              type: options.tabs ? 'tabs' : options['drawer+tabs'] ? 'drawer + tabs' : 'stack'
            }
          });
        } else if (options.tamagui) {
          cliResults = clearStylingPackages(cliResults);
          // Add tamagui package
          cliResults.packages.push({
            name: 'tamagui',
            type: 'styling'
          });
        } else if (options.unistyles) {
          cliResults = clearStylingPackages(cliResults);
          // Add unistyles package
          cliResults.packages.push({
            name: 'unistyles',
            type: 'styling'
          });
        } else if (options.stylesheet) {
          cliResults = clearStylingPackages(cliResults);
          // Add stylesheet package
          cliResults.packages.push({
            name: 'stylesheet',
            type: 'styling'
          });
        } else if (options.restyle) {
          try {
            cliResults = clearStylingPackages(cliResults);
            // Add stylesheet package
            cliResults.packages.push({
              name: 'restyle',
              type: 'styling'
            });
          } catch (error) {
            console.log({ error });
          }
        }
        // if there is no style package, add stylesheet
        else if (cliResults.packages.find((p) => p.type === 'styling') === undefined) {
          cliResults.packages.push({
            name: 'stylesheet',
            type: 'styling'
          });
        }

        // Authentication packages
        if (options.supabase) {
          // Add supabase package
          cliResults.packages.push({
            name: 'supabase',
            type: 'authentication'
          });
        }

        if (options.firebase) {
          // Add firebase package
          cliResults.packages.push({
            name: 'firebase',
            type: 'authentication'
          });
        }

        // State Management packages
        if (options.zustand) {
          // Add zustand package
          cliResults.packages.push({
            name: 'zustand',
            type: 'state-management'
          });
        }

        // Internalization packages
        if (options.i18next) {
          cliResults.packages.push({
            name: 'i18next',
            type: 'internationalization'
          });
        }

        // Analytics packages
        if (options.vexoAnalytics || options['vexo-analytics'] || options.vexoanalytics) {
          cliResults.packages.push({ name: 'vexo-analytics', type: 'analytics' });
        }

        // By this point, all cliResults should be set
        info('');
        highlight('Your project configuration:');
        info(`${util.inspect(cliResults, false, null, true /* enable colors */)}`);

        info('');
        highlight('To recreate this project, run:');

        // Function that outputs a string given the CLI results and the packageManager. The outputted string should be a command that can be run to recreate the project
        const generateRerunScript = (cliResults: CliResults) => {
          let script = `npx create-expo-stack@latest ${cliResults.projectName} `;

          const isNativeWindUISelected = cliResults.packages.some((p) => p.name === 'nativewindui');

          if (isNativeWindUISelected) {
            script += '--nativewindui ';

            const nativeWindUIComponents =
              cliResults.packages.find((p) => p.name === 'nativewindui')?.options.selectedComponents ?? [];

            // we do this to account for older stored config e.g that has selectable text in it
            const onlyValidComponents = nativeWindUIComponents.filter((c) => nativeWindUIOptions.includes(c));

            if (onlyValidComponents.length === 0) {
              script += '--blank ';
            } else if (onlyValidComponents.length !== nativeWindUIOptions.length) {
              script += `--selected-components=${onlyValidComponents.join(',')} `;
            }

            // this should always be expo router for nwui
            const chosenNavigationOption = cliResults.packages.find((p) => p.type === 'navigation');

            const hasNavigationPackage = chosenNavigationOption !== undefined;

            const navigationType = chosenNavigationOption.options.type;

            if (hasNavigationPackage) {
              // NOTE we don't need to add expo-router since its currently getting automatically added with nativewindui
              // NOTE stack is default so doesn't need to applied.
              if (navigationType === 'tabs') {
                script += '--tabs ';
              } else if (navigationType === 'drawer + tabs') {
                script += '--drawer+tabs ';
              }
            }

            const stateManagementPackage = cliResults.packages.find((p) => p.type === 'state-management');

            if (stateManagementPackage) {
              script += `--${stateManagementPackage.name} `;
            }
          } else {
            // Add the packages
            cliResults.packages.forEach((p) => {
              script += `--${p.name} `;
              // If the package is a navigation package, add the type if it is tabs
              if (p.type === 'navigation') {
                if (p.options?.type === 'tabs') {
                  script += '--tabs ';
                } else if (p.options?.type === 'drawer + tabs') {
                  script += '--drawer+tabs ';
                }
              }
            });
          }
          // Check if the user wants to skip installing packages
          if (cliResults.flags.noInstall) {
            script += '--no-install ';
          }

          // Check if the user wants to skip initializing git
          if (cliResults.flags.noGit) {
            script += '--no-git ';
          }

          // Check if the user wants to overwrite the project directory
          if (!cliResults.flags.importAlias) {
            script += '--no-import-alias ';
          }

          // Add the package manager
          if (cliResults.flags.packageManager !== 'npm') {
            script += `--${cliResults.flags.packageManager}`;
          }

          if (cliResults.flags.eas) {
            script += ` --eas`;
          }

          return script;
        };

        const packageManager = getPackageManager(toolbox, cliResults);
        warning(`  ${generateRerunScript(cliResults)}`);

        const { packages } = cliResults;

        // Define props to be passed into the templates
        const authenticationPackage = packages.find((p) => p.type === 'authentication') || undefined;
        const navigationPackage = packages.find((p) => p.type === 'navigation') || undefined;
        // if there is no styling package, add the stylesheet package
        const stylingPackage = packages.find((p) => p.type === 'styling');
        const internalizationPackage = packages.find((p) => p.type === 'internationalization');
        const analyticsPackage = packages.find((p) => p.type === 'analytics');

        //add the state management package if it is selected
        const stateManagementPackage = packages.find((p) => p.type === 'state-management') || undefined;

        let files: string[] = [];

        files = configureProjectFiles(
          authenticationPackage,
          files,
          navigationPackage,
          stylingPackage,
          analyticsPackage,
          toolbox,
          cliResults,
          internalizationPackage,
          stateManagementPackage
        );

        // Once all the files are defined, format and generate them
        let formattedFiles: any[] = [];

        formattedFiles = generateProjectFiles(
          authenticationPackage,
          analyticsPackage,
          cliResults,
          files,
          formattedFiles,
          navigationPackage,
          packageManager,
          stylingPackage,
          toolbox,
          internalizationPackage,
          stateManagementPackage
        );

        await printOutput(cliResults, formattedFiles, toolbox, stylingPackage);

        // Add publish command handling after project creation
        if (options.publish) {
          info('\nPublishing to GitHub...');
          const repoUrl = await publishToGitHub(toolbox, cliResults.projectName);

          if (repoUrl) {
            success('\n🎉 Successfully published to GitHub!');
            info(`\n📎 Repository URL: ${repoUrl}`);
          }
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        error(`error: ${err}`);
      }

      if (err === '') {
        // user cancelled/exited the interactive CLI
        return void success(`\nCancelled... 👋 \n`);
      }

      if (err.message.includes(bunInstallationError)) {
        return void success(`\nCancelled to install recommended version of Bun.... 👋 \n`);
      }

      if (process.env.NODE_ENV !== 'test') {
        // Delete all files with projectName
        await removeAsync(cliResults.projectName);
      }

      printSomethingWentWrong();
      throw err;
    }
  }
};

export default command;
