import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { getPackageManager } from './getPackageManager';
import { CliResults } from '../types';

const SUPPORTED_PACKAGE_MANAGERS = ['yarn', 'npm'];

export async function isProjectCompatibleWithSetupCI(toolbox: Toolbox, cliResults: CliResults) {
  const packageManager = getPackageManager(toolbox, cliResults);
  const { noGit, noInstall } = cliResults.flags;

  return !noGit && !noInstall && SUPPORTED_PACKAGE_MANAGERS.includes(packageManager);
}

export async function runSetupCI(toolbox: Toolbox, cliResults: CliResults) {
  const {
    print: { info },
    system
  } = toolbox;

  const { projectName } = cliResults;

  info(``);
  info('Running setup-ci...');

  await system.spawn(`cd ${projectName} && npx setup-ci@latest`, {
    shell: true,
    stdio: 'inherit'
  });
}
