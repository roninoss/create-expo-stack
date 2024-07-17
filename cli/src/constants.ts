import { CliResults, SelectedComponents } from './types';

export const TITLE_TEXT = 'create expo stack';

export const DEFAULT_APP_NAME = 'my-expo-app';

export const defaultOptions: CliResults = {
  projectName: DEFAULT_APP_NAME,
  packages: [],
  flags: {
    noGit: false,
    noInstall: false,
    overwrite: false,
    importAlias: '~/',
    packageManager: undefined,
    eas: false
  }
};

export const nativeWindUIOptions: SelectedComponents[] = [
  'action-sheet',
  'activity-indicator',
  'activity-view',
  'avatar',
  'bottom-sheet',
  'date-picker',
  'picker',
  'progress-indicator',
  'ratings-indicator',
  'selectable-text',
  'slider',
  'text',
  'toggle'
];

export const navigationValidationError = `You must pass in either --react-navigation or --expo-router if you want to use the --tabs or --drawer+tabs options`;
export const projectNameValidationError = `A project with the name`;
export const bunInstallationError = 'Cancelled to install recommended version of Bun.';
