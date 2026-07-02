import { CliResults, SoftwareMansionSelect } from '../types';

type SoftwareMansionPackageOption = {
  name: SoftwareMansionSelect;
  aliases: string[];
  label: string;
};

export const softwareMansionPackageOptions: SoftwareMansionPackageOption[] = [
  {
    name: 'react-native-gesture-handler',
    aliases: ['reactNativeGestureHandler', 'react-native-gesture-handler', 'gesture-handler', 'gestureHandler'],
    label: 'React Native Gesture Handler'
  },
  {
    name: 'react-native-screens',
    aliases: ['reactNativeScreens', 'react-native-screens', 'screens'],
    label: 'React Native Screens'
  },
  {
    name: 'react-native-svg',
    aliases: ['reactNativeSvg', 'react-native-svg', 'svg'],
    label: 'React Native SVG'
  },
  {
    name: 'react-native-keyboard-controller',
    aliases: [
      'reactNativeKeyboardController',
      'react-native-keyboard-controller',
      'keyboard-controller',
      'keyboardController'
    ],
    label: 'React Native Keyboard Controller'
  }
];

export function shouldAddSoftwareMansionPackage(name: SoftwareMansionSelect, cliResults: CliResults): boolean {
  if (cliResults.packages.some((pkg) => pkg.name === name)) {
    return false;
  }

  if (
    (name === 'react-native-gesture-handler' || name === 'react-native-screens') &&
    cliResults.packages.some((pkg) => pkg.type === 'navigation')
  ) {
    return false;
  }

  return true;
}

export function getSoftwareMansionPromptOptions(cliResults: CliResults) {
  return softwareMansionPackageOptions
    .filter(({ name }) => shouldAddSoftwareMansionPackage(name, cliResults))
    .map(({ name, label }) => ({ value: name, label }));
}
