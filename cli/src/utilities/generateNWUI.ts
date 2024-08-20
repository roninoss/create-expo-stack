import { GluegunToolbox } from 'gluegun';
import { CliResults } from '../types';
import { nativeWindUIOptions } from '../constants';
import { getPackageManagerRunnerX } from './getPackageManager';
import { ONLY_ERRORS, runSystemCommand } from './systemCommand';
import { spinner } from '@clack/prompts';

export async function generateNWUI(cliResults: CliResults, toolbox: GluegunToolbox) {
  const isNativeWindUISelected = cliResults.packages.some((p) => p.name === 'nativewindui');

  if (!isNativeWindUISelected) {
    return;
  }

  const s = spinner();

  const runnerType = getPackageManagerRunnerX(toolbox, cliResults);

  const nativeWindUIComponents =
    cliResults.packages.find((p) => p.name === 'nativewindui').options.selectedComponents ?? [];

  // we do this to account for older stored config e.g that has selectable text in it
  const onlySupportedComponents = nativeWindUIComponents.filter((component) => nativeWindUIOptions.includes(component));

  const finalComponents = Array.from(new Set([...onlySupportedComponents, 'text']));

  s.start(`Adding nativewindui components...`);

  const flags = cliResults.flags.noInstall
    ? `--yes --no-install -d ${cliResults.projectName}`
    : `--yes -d ${cliResults.projectName}`;

  // --yes accepts installing packages without prompting
  const runCommand = runnerType === 'npx' ? `${runnerType} --yes` : runnerType;

  if (process.env.NODE_ENV === 'development') {
    toolbox.print.info(`${runCommand} nwui-cli@^0.4.1 add ${flags} ${finalComponents.join(' ')}`);
  }

  // @latest is getting cached when using bunx
  await runSystemCommand({
    command: `${runCommand} nwui-cli@^0.4.1 add ${flags} ${finalComponents.join(' ')}`,
    errorMessage: 'Error adding nativewindui components',
    toolbox,
    stdio: ONLY_ERRORS,

    // for some reason running as shell breaks nwui when running in ci
    shell: false,

    // this is how we pass env variables to the child process when not running as shell
    env: {
      ...process.env,
      ...(process.env.NODE_ENV === 'development' ? { API_BASE_URL: 'https://nativewindui.com' } : {})
    }
  });

  s.stop('Nativewindui components added!');
}
