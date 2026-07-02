import { GluegunToolbox } from 'gluegun';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { CliResults } from '../types';
import { nativewindUIOptions } from '../constants';
import { getPackageManagerRunnerX } from './getPackageManager';
import { ONLY_ERRORS, runSystemCommand } from './systemCommand';
import { spinner } from '@clack/prompts';

function warnAboutSkippedNativewindUIPatch(toolbox: GluegunToolbox, patchName: string) {
  if (process.env.NODE_ENV === 'development') {
    toolbox.print.warning(`Skipped ${patchName}; generated NativewindUI source did not match the expected shape.`);
  }
}

async function patchNativewindUIPickerForWeb(projectName: string, toolbox: GluegunToolbox) {
  const pickerPath = path.join(projectName, 'components', 'nativewindui', 'Picker.tsx');

  try {
    const currentSource = await readFile(pickerPath, 'utf8');
    let nextSource = currentSource;
    const nativeDropdownProps = `        dropdownIconColor={dropdownIconColor ?? colors.foreground}
        dropdownIconRippleColor={dropdownIconRippleColor ?? colors.foreground}
        {...props}`;
    const patchedDropdownProps = `        {...(Platform.OS === 'android'`;
    const nativeViewImport = "import { View } from 'react-native';";
    const patchedViewImport = "import { Platform, View } from 'react-native';";

    if (nextSource.includes(nativeViewImport)) {
      nextSource = nextSource.replace(nativeViewImport, patchedViewImport);
    } else if (!nextSource.includes(patchedViewImport)) {
      warnAboutSkippedNativewindUIPatch(toolbox, 'NativewindUI Picker web patch');
      return;
    }

    if (!nextSource.includes(nativeDropdownProps)) {
      if (!nextSource.includes(patchedDropdownProps)) {
        warnAboutSkippedNativewindUIPatch(toolbox, 'NativewindUI Picker web patch');
      }
      return;
    }

    nextSource = nextSource.replace(
      nativeDropdownProps,
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

async function patchNativewindUIDatePickerForAndroid(projectName: string, toolbox: GluegunToolbox) {
  const datePickerPath = path.join(projectName, 'components', 'nativewindui', 'DatePicker', 'DatePicker.android.tsx');

  try {
    const currentSource = await readFile(datePickerPath, 'utf8');
    let nextSource = currentSource;
    const deprecatedAndroidOpenBlock = `  const show = (currentMode: 'time' | 'date') => () => {
    DateTimePickerAndroid.open({
      value: props.value,
      onChange: props.onChange,
      mode: currentMode,
      minimumDate: props.minimumDate,
      maximumDate: props.maximumDate,
    });
  };`;

    if (!nextSource.includes(deprecatedAndroidOpenBlock)) {
      if (!nextSource.includes('onValueChange: handleValueChange')) {
        warnAboutSkippedNativewindUIPatch(toolbox, 'NativewindUI DatePicker Android patch');
      }
      return;
    }

    nextSource = nextSource.replace(
      `import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';`,
      `import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerChangeEvent,
} from '@react-native-community/datetimepicker';`
    );

    nextSource = nextSource.replace(
      deprecatedAndroidOpenBlock,
      `  const handleValueChange =
    props.onValueChange ??
    ((event: DateTimePickerChangeEvent, date: Date) => {
      props.onChange?.({ ...event, type: 'set' }, date);
    });

  const show = (currentMode: 'time' | 'date') => () => {
    DateTimePickerAndroid.open({
      value: props.value,
      onValueChange: handleValueChange,
      onDismiss: props.onDismiss,
      onNeutralButtonPress: props.onNeutralButtonPress,
      mode: currentMode,
      minimumDate: props.minimumDate,
      maximumDate: props.maximumDate,
    });
  };`
    );

    if (nextSource !== currentSource) {
      await writeFile(datePickerPath, nextSource);
    }
  } catch {
    // NativewindUI components are optional, so skip if the date picker was not generated.
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

  await patchNativewindUIPickerForWeb(cliResults.projectName, toolbox);
  await patchNativewindUIDatePickerForAndroid(cliResults.projectName, toolbox);

  s.stop('Nativewindui components added!');
}
