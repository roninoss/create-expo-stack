import { Toolbox } from 'gluegun/build/types/domain/toolbox';

import { DEFAULT_APP_NAME, defaultOptions } from '../constants';
import { CliResults, NavigationTypes, PackageManager } from '../types';

export async function runCLI(toolbox: Toolbox): Promise<CliResults> {
	const {
		parameters: { first },
		print: { success },
		prompt: { ask, confirm }
	} = toolbox;

	// Set the default options
	const cliResults = defaultOptions;

	// Set the app name if it was passed in via the initial command
	if (first) {
		cliResults.projectName = first;
	} else {
		const askName = {
			type: 'input',
			name: 'name',
			message: `What do you want to name your project? (${DEFAULT_APP_NAME})`
		};
		const { name } = await ask(askName);
		cliResults.projectName = name || DEFAULT_APP_NAME;
	}

	// Clear default packages
	cliResults.packages = [];
	// Ask about TypeScript
	const useTypescript = await confirm('Would you like to use TypeScript with this project?', true);

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
		choices: ['React Navigation', 'Expo Router (experimental)', 'None']
	};

	const askNavigationType = {
		type: 'select',
		name: 'navigationTypeSelect',
		message: 'What type of navigation would you like to use?',
		choices: ['Stack', 'Tabs', 'Drawer']
	};

	const { navigationSelect } = await ask(askNavigation);

	if (navigationSelect !== 'None') {
		const { navigationTypeSelect } = await ask(askNavigationType);
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
		choices: ['Nativewind', 'Stylesheet', 'Tamagui (experimental)']
	};

	const { stylingSelect } = await ask(askStyling);

	if (stylingSelect === 'Nativewind') {
		cliResults.packages.push({ name: 'nativewind', type: 'styling' });
		success(`You'll be styling with ease using Tailwind.`);
	} else if (stylingSelect === 'Tamagui (experimental)') {
		cliResults.packages.push({ name: 'tamagui', type: 'styling' });
		success(`You'll be styling with ease using Tamagui.`);
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

	const { authenticationSelect } = await ask(askAuthentication);

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

		const { packageManagerSelect } = await ask(askPackageManager);
		
		cliResults.flags.packageManager = packageManagerSelect as PackageManager;
	}
	return cliResults;
}
