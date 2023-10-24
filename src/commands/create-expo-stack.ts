import { GluegunCommand } from 'gluegun'
const util = require('util')

import {
  configureProjectFiles,
  generateProjectFiles,
  printOutput,
  renderTitle,
  runCLI,
  runIgnite,
  showHelp
} from '../utilities';
import { defaultOptions } from '../constants';
import { CliResults, availablePackages } from '../types';

const command: GluegunCommand = {
  name: 'create-expo-stack',
  description: 'Create a new Expo project',
  run: async (toolbox) => {
    const {
      parameters: { first, options },
      print: { info, highlight, warning },
    } = toolbox;
    if (options.help || options.h) {
      showHelp(info, highlight, warning)

      return;
    }
    try {
      await renderTitle(toolbox);

      // TODO: this is hacky, figure out a way to do this better
      // set timeout for 1 second so that the title can render before the CLI runs
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Set the default options
      let cliResults: CliResults = defaultOptions;

      // Check if user wants to create an opinionated stack prior to running the configurable CLI
      if (options.ignite) {
        await runIgnite(toolbox);
      } else {

        // Conditionally skip running the CLI
        const useDefault = ((options.default !== undefined && options.default) || (options.d !== undefined && options.d));
        const skipCLI = options.nonInteractive;
        const useBlankTypescript = options.blank || false;
        // Check if any of the options were passed in via the command
        // const conditions = ["reactNavigation", "expoRouter", "nativewind", "tamagui"];
        const optionsPassedIn = availablePackages.some((condition) => options[condition] !== undefined);
        if (!(useDefault || optionsPassedIn || skipCLI || useBlankTypescript)) {
          //  Run the CLI to prompt the user for input
          cliResults = await runCLI(toolbox)
        }

        // @internal Update the cliResults with the options passed in via the command
        // This is used for testing purposes only
        if (options.reactNavigation) {
          // Add react-navigation package
          cliResults.packages.push({
            name: "react-navigation", type: 'navigation', options: {
              type: options.tabs ? "tabs" : "stack"
            }
          });
        }
        if (options.expoRouter) {
          // Add expo-router package
          cliResults.packages.push({
            name: "expo-router", type: 'navigation', options: {
              type: options.tabs ? "tabs" : "stack"
            }
          });
        }
        if (options.nativewind) {
          // Add nativewind package
          cliResults.packages.push({ name: "nativewind", type: 'styling', options: {} });
        }
        if (options.tamagui) {
          // Add tamagui package
          cliResults.packages.push({ name: "tamagui", type: 'styling', options: {} });
        }


        // Destructure the results but set the projectName if the first param is passed in
        if (first) {
          cliResults.projectName = first;
        }

        // By this point, all cliResults should be set
        
        info('Your project configuration:');
        info(util.inspect(cliResults, false, null, true /* enable colors */))
        const { packages } = cliResults;

        // Define props to be passed into the templates

        const navigationPackage = packages.find((p) => p.type === "navigation") || undefined;
        const stylingPackage = packages.find((p) => p.type === "styling")

        let files: string[] = [];

        files = configureProjectFiles(
          files,
          navigationPackage,
          stylingPackage,
          toolbox
        );

        // Once all the files are defined, format and generate them
        let formattedFiles: any[] = [];

        formattedFiles = generateProjectFiles(
          cliResults,
          files,
          formattedFiles,
          navigationPackage,
          toolbox,
          stylingPackage
        );

        await printOutput(cliResults, formattedFiles, toolbox);
      }

    } catch (error) {
      // TODO: delete all files

      info(`Oops, something went wrong while creating your project 😢`)
      info('')
      info(`Error: ${error}`)
      info(
        `\nIf this was unexpected, please open an issue: https://github.com/danstepanov/create-expo-stack#reporting-bugs--feedback`
      )
    }
  },
}

export default command;
