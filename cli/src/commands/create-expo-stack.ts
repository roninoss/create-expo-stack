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
	showHelp
} from '../utilities';
import { defaultOptions } from '../constants';
import { CliResults, availablePackages } from '../types';
import clearStylingPackages from '../utilities/clearStylingPackages';
import { validateProjectName } from '../utilities/validateProjectName';

const command: GluegunCommand = {
	name: 'create-expo-stack',
	description: 'Create a new Expo project',
	run: async (toolbox) => {
		const {
			filesystem: { existsAsync, removeAsync },
			parameters: { first, options },
			print: { info, highlight, warning },
			prompt
		} = toolbox;

		if (options.help || options.h) {
			showHelp(info, highlight, warning);

			return;
		}

		try {
			// Validation: check if the user passed in the tabs/drawer option without passing in either expo router or react navigation. If so, throw an error
			if (
				(options.tabs || options.drawer) &&
				!options.reactNavigation &&
				!options['react-navigation'] &&
				!options.reactnavigation &&
				!options.expoRouter &&
				!options['expo-router'] &&
				!options.exporouter
			) {
				throw new Error(
					'You must pass in either --react-navigation or --expo-router if you want to use the --tabs option'
				);
			}

			await renderTitle(toolbox);

			// TODO: this is hacky, figure out a way to do this better
			// set timeout for 1 second so that the title can render before the CLI runs
			await new Promise((resolve) => setTimeout(resolve, 200));

			// Set the default options
			let cliResults: CliResults = defaultOptions;

			// Check if user wants to create an opinionated stack prior to running the configurable CLI
			if (options.ignite) {
				await runIgnite(toolbox, cliResults);
			} else {
				// Conditionally skip running the CLI
				const useDefault =
					(options.default !== undefined && options.default) || (options.d !== undefined && options.d);
				const skipCLI = options.nonInteractive;
				const useBlankTypescript = options.blank || false;
				// Check if any of the options were passed in via the command
				const optionsPassedIn = availablePackages.some((condition) => options[condition] !== undefined);

				// Check if the user wants to not install dependencies and/or not initialize git, update cliResults accordingly
				cliResults.flags.noInstall = options.noInstall || false;
				cliResults.flags.noGit = options.noGit || false;
				cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : options.yarn ? 'yarn': undefined;

				// Validate import alias string forward slash and asterisk
				if (typeof options.importAlias === 'string') {
					if (!options.importAlias.endsWith('/*')) {
						throw new Error('Import alias must end in `/*`, for example: `@/*` or `~/`');
					}
				}
				cliResults.flags.importAlias = options.importAlias || true;

				if (!(useDefault || optionsPassedIn || skipCLI || useBlankTypescript)) {
					//  Run the CLI to prompt the user for input
					cliResults = await runCLI(toolbox);
				}

				if (!cliResults.flags.packageManager) {
					cliResults.flags.packageManager = 'npm';
				}

				// Update the cliResults with the options passed in via the command
				// Navigation packages
				if (options.reactNavigation || options['react-navigation'] || options.reactnavigation) {
					// Add react-navigation package
					cliResults.packages.push({
						name: 'react-navigation',
						type: 'navigation',
						options: {
							type: options.tabs ? 'tabs' : options.drawer ? 'drawer' : 'stack'
						}
					});
				}

				if (options.expoRouter || options['expo-router'] || options.exporouter) {
					// Add expo-router package
					cliResults.packages.push({
						name: 'expo-router',
						type: 'navigation',
						options: {
							type: options.tabs ? 'tabs' : options.drawer ? 'drawer' : 'stack'
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
				} else if (options.tamagui) {
					cliResults = clearStylingPackages(cliResults);
					// Add tamagui package
					cliResults.packages.push({
						name: 'tamagui',
						type: 'styling'
					});
				} else if (options.stylesheet) {
					cliResults = clearStylingPackages(cliResults);
					// Add stylesheet package
					cliResults.packages.push({
						name: 'stylesheet',
						type: 'styling'
					});
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

				// Destructure the results but set the projectName if the first param is passed in
				if (first) {
					cliResults.projectName = first;
				}

				// Validate the project name
				await validateProjectName(existsAsync, removeAsync, prompt, cliResults.projectName);

				// By this point, all cliResults should be set
				info('');
				highlight('Your project configuration:');
				info(`${util.inspect(cliResults, false, null, true /* enable colors */)}`);

				info('');
				highlight('To recreate this project, run:');

				// Function that outputs a string given the CLI results and the packageManager. The outputted string should be a command that can be run to recreate the project
				const generateRerunScript = (cliResults: CliResults) => {
					let script = `npx create-expo-stack ${cliResults.projectName} `;

					// Add the packages
					cliResults.packages.forEach((p) => {
						script += `--${p.name} `;
						// If the package is a navigation package, add the type if it is tabs
						if (p.type === 'navigation') {
							if (p.options?.type === 'tabs') {
								script += '--tabs ';
							} else if (p.options?.type === 'drawer') {
								script += '--drawer ';
							}
						}
					});

					// Check if the user wants to skip installing packages
					if (cliResults.flags.noInstall) {
						script += '--noInstall ';
					}

					// Check if the user wants to skip initializing git
					if (cliResults.flags.noGit) {
						script += '--noGit ';
					}

					if (cliResults.flags.importAlias) {
						script += '--importAlias ';
					}

					// Add the package manager
					if (cliResults.flags.packageManager) {
						script += `--${cliResults.flags.packageManager}`;
					}

					return script;
				};

				const packageManager = getPackageManager(toolbox, cliResults);
				warning(`  ${generateRerunScript(cliResults)}`);

				const { packages } = cliResults;

				// Define props to be passed into the templates
				const authenticationPackage = packages.find((p) => p.type === 'authentication') || undefined;
				const navigationPackage = packages.find((p) => p.type === 'navigation') || undefined;
				//   if there is no styling package, add the stylesheet package
				const stylingPackage = packages.find((p) => p.type === 'styling');

				let files: string[] = [];

				files = configureProjectFiles(authenticationPackage, files, navigationPackage, stylingPackage, toolbox, cliResults);

				// Once all the files are defined, format and generate them
				let formattedFiles: any[] = [];

				formattedFiles = generateProjectFiles(
					authenticationPackage,
					cliResults,
					files,
					formattedFiles,
					navigationPackage,
					packageManager,
					stylingPackage,
					toolbox
				);

				await printOutput(cliResults, formattedFiles, toolbox);
			}
		} catch (error) {
			// await removeAsync(cliResults.projectName);
			info(`\nOops, something went wrong while creating your project 😢`);
			info(
				`\nIf this was unexpected, please open an issue: https://github.com/danstepanov/create-expo-stack#reporting-bugs--feedback`
			);
			info('');

			throw error;
		}
	}
};

export default command;
