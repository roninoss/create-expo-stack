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
