import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { cancel, confirm, isCancel, select } from '@clack/prompts';
import { CliResults, PackageManager } from '../types';

export async function easConfigure(
  cliResults: CliResults,
  packageManager: PackageManager,
  toolbox: Toolbox
): Promise<void> {
  const {
    print: { info, success, error, warning },
    system
  } = toolbox;

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
      const result = await system.spawn(`${packageManagerToUse} install -g eas-cli`);

      if (result.error) {
        error('Error installing EAS CLI');
        return process.exit(1);
      }
    }
  }

  const result = await system.spawn(`cd ${projectName} && eas build:configure -p all`, {
    shell: true,
    stdio: 'inherit'
  });

  if (result.error || result.status !== 0) {
    error('Error configuring EAS');
    return process.exit(1);
  }

  success('EAS configured!');
}
