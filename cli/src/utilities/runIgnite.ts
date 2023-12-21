import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { getPackageManager } from './getPackageManager';
import { CliResults } from '../types';

export async function runIgnite(toolbox: Toolbox, projectName: string, cliResults: CliResults) {
  const {
    print: { success },
    system
  } = toolbox;

  const packageManager = getPackageManager(toolbox, cliResults);

  success('Running Ignite CLI to create an opinionated stack...');
  await system.spawn(`npx ignite-cli@$latest new ${projectName} --packager=${packageManager} --yes`, {
    shell: true,
    stdio: 'inherit'
  });
}
