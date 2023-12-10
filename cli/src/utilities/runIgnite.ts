import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { DEFAULT_APP_NAME } from '../constants';
import { getPackageManager } from './getPackageManager';
import { CliResults } from '../types';

export async function runIgnite(toolbox: Toolbox, cliResults: CliResults) {
	const {
		parameters: { first },
		print: { success },
		prompt: { ask },
		system,
		strings: { pascalCase }
	} = toolbox;

	let projectName;
	if (!first) {
		const askName = {
			type: 'input',
			name: 'name',
			message: `What do you want to name your project? (${DEFAULT_APP_NAME})`
		};
		const { name } = await ask(askName);
		// if name is undefined or empty string, use default name
		projectName = name || DEFAULT_APP_NAME;
	} else {
		projectName = first;
	}

	const packageManager = getPackageManager(toolbox, cliResults);
	// right now Ignite requires PascalCase for the project name
	// unsure why, will ask the team and then probably fix it upstream
	const formattedName = pascalCase(projectName);

	success('Running Ignite CLI to create an opinionated stack...');
	await system.spawn(`npx ignite-cli@$latest new ${formattedName} --packager=${packageManager} --yes`, {
		shell: true,
		stdio: 'inherit'
	});
}
