import { CliResults, SelectedComponents } from './types';

export const CES_TITLE = 'create expo stack';
export const RN_NEW_TITLE = 'rn  new';
export const TITLE_TEXT = process.argv[1]?.includes('rn-new') ? RN_NEW_TITLE : CES_TITLE;

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
    eas: false,
    publish: false
  }
};

export const nativewindUIOptions: SelectedComponents[] = [
  'action-sheet',
  'activity-indicator',
  'activity-view',
  'avatar',
  'button',
  'date-picker',
  'picker',
  'progress-indicator',
  'ratings-indicator',
  'slider',
  'text',
  'toggle'
];

export const navigationValidationError = `You must pass in either --react-navigation or --expo-router if you want to use the --tabs or --drawer+tabs options`;
export const projectNameValidationError = `A project with the name`;
export const bunInstallationError = 'Cancelled to install recommended version of Bun.';
