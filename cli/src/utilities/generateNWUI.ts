import { GluegunToolbox } from 'gluegun';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { CliResults } from '../types';
import { nativewindUIOptions } from '../constants';
import { getPackageManagerRunnerX } from './getPackageManager';
import { ONLY_ERRORS, runSystemCommand } from './systemCommand';
import { spinner } from '@clack/prompts';

async function patchNativewindUIPickerForWeb(projectName: string) {
  const pickerPath = path.join(projectName, 'components', 'nativewindui', 'Picker.tsx');

  try {
    const currentSource = await readFile(pickerPath, 'utf8');
    let nextSource = currentSource;

    if (nextSource.includes("import { View } from 'react-native';")) {
      nextSource = nextSource.replace(
        "import { View } from 'react-native';",
        "import { Platform, View } from 'react-native';"
      );
    }

    nextSource = nextSource.replace(
      `        dropdownIconColor={dropdownIconColor ?? colors.foreground}
        dropdownIconRippleColor={dropdownIconRippleColor ?? colors.foreground}
        {...props}`,
      `        {...(Platform.OS === 'android'
          ? {
              dropdownIconColor: dropdownIconColor ?? colors.foreground,
              dropdownIconRippleColor: dropdownIconRippleColor ?? colors.foreground
            }
          : {})}
        {...props}`
    );

    if (nextSource !== currentSource) {
      await writeFile(pickerPath, nextSource);
    }
  } catch {
    // NativewindUI components are optional, so skip if the picker was not generated.
  }
}

export async function generateNWUI(cliResults: CliResults, toolbox: GluegunToolbox) {
  const isNativewindUISelected = cliResults.packages.some((p) => p.name === 'nativewindui');

  if (!isNativewindUISelected) {
    return;
  }

  const s = spinner();

  const runnerType = getPackageManagerRunnerX(toolbox, cliResults);

  const nativewindUIComponents =
    cliResults.packages.find((p) => p.name === 'nativewindui').options.selectedComponents ?? [];

  // we do this to account for older stored config e.g that has selectable text in it
  const onlySupportedComponents = nativewindUIComponents.filter((component) => nativewindUIOptions.includes(component));

  const finalComponents = Array.from(new Set([...onlySupportedComponents, 'text', 'button']));

  s.start(`Adding nativewindui components...`);

  const flags = cliResults.flags.noInstall
    ? `--yes --no-install --quiet -d ${cliResults.projectName}`
    : `--yes --quiet -d ${cliResults.projectName}`;

  // --yes accepts installing packages without prompting
  const runCommand = runnerType === 'npx' ? `${runnerType} --yes` : runnerType;

  if (process.env.NODE_ENV === 'development') {
    toolbox.print.info(`${runCommand} nwui-cli@latest add ${flags} ${finalComponents.join(' ')}`);
  }

  // @latest is getting cached when using bunx
  await runSystemCommand({
    command: `${runCommand} nwui-cli@latest add ${flags} ${finalComponents.join(' ')}`,
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

  await patchNativewindUIPickerForWeb(cliResults.projectName);

  s.stop('Nativewindui components added!');
}
