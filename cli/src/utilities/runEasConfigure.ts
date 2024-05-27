import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { cancel, confirm, isCancel, select } from '@clack/prompts';
import { CliResults, PackageManager } from '../types';
import { runSystemCommand } from './systemCommand';

export async function easConfigure(
  cliResults: CliResults,
  packageManager: PackageManager,
  toolbox: Toolbox
): Promise<void> {
  const {
    print: { info, success, warning, error },
    system
  } = toolbox;

  if (cliResults.flags.noInstall) {
    error('Eas configuration requires installing dependencies, please remove the --no-install flag and try again.');

    process.exit(1);
  }

  const { projectName } = cliResults;

  info('Configuring EAS...');
  info(``);
  const easOutput = await system.spawn(`eas --version`);

  if (easOutput?.error) {
    warning('EAS CLI not found, to continue please install it globally');
    info(``);
    const shouldInstall = await confirm({
      message: `Install EAS CLI?`
    });
    info(``);

    if (isCancel(shouldInstall)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    if (shouldInstall) {
      let packageManagerToUse = packageManager;

      // bun has no global install
      if (packageManager === 'bun') {
        const packageManagerToUseResult = await select({
          message: "We can't use bun to install global packages, please select a package manager to use:",
          options: [
            { value: 'npm', label: 'npm' },
            { value: 'yarn', label: 'yarn' },
            { value: 'pnpm', label: 'pnpm' }
          ]
        });

        if (isCancel(packageManagerToUseResult)) {
          cancel('Cancelled... 👋');
          return process.exit(0);
        }

        packageManagerToUse = packageManagerToUseResult as PackageManager;
      }

      info(`We'll use ${packageManagerToUse} install -g eas-cli`);
      info(``);

      await runSystemCommand({
        command: `${packageManagerToUse} install -g eas-cli`,
        toolbox,
        errorMessage: 'Error installing EAS CLI',
        stdio: undefined
      });
    }
  }

  await runSystemCommand({
    command: `cd ${projectName} && eas build:configure -p all`,
    errorMessage: 'Error configuring EAS',
    stdio: 'inherit',
    toolbox
  });

  success('EAS configured!');

  info(`Now we'll generate the native code for your project`);

  await runSystemCommand({
    command: `cd ${projectName} && ${packageManager} run prebuild`,
    errorMessage: 'Error generating native code',
    stdio: 'inherit',
    toolbox
  });

  success('Native code generated!');
}
