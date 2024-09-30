import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults, PackageManager } from '../types';

export function generateProjectFiles(
  authenticationPackage: AvailablePackages | undefined,
  analyticsPackage: AvailablePackages | undefined,
  cliResults: CliResults,
  files: string[],
  formattedFiles: any[],
  navigationPackage: AvailablePackages | undefined,
  packageManager: PackageManager,
  stylingPackage: AvailablePackages | undefined,
  toolbox: Toolbox,
  internalizationPackage: AvailablePackages | undefined,
  stateManagementPackage: AvailablePackages | undefined
) {
  const { projectName, packages, flags } = cliResults;

  return files.reduce((prev, file) => {
    const template = file;
    let target = file.replace('.ejs', '');

    if (authenticationPackage?.name === 'supabase') {
      target = target.replace('packages/supabase/', '');
    }

    if (authenticationPackage?.name === 'firebase') {
      target = target.replace('packages/firebase/', '');
    }

    target = target.replace('base/', '');

    if (stylingPackage?.name === 'tamagui') {
      target = target.replace('packages/tamagui/', '');
    } else if (stylingPackage?.name === 'unistyles') {
      target = target.replace('packages/unistyles/', '');
    } else if (stylingPackage?.name === 'nativewind') {
      target = target.replace('packages/nativewind/', '');
    } else if (stylingPackage?.name === 'restyle') {
      target = target.replace('packages/restyle/', '');
    } else if (stylingPackage?.name === 'nativewindui') {
      target = target.replace('packages/nativewindui/', '');
    }

    if (navigationPackage?.name === 'react-navigation') {
      target = target.replace('packages/react-navigation/App.tsx', 'App.tsx');
      target = target.replace('packages/react-navigation/', '');
    }

    if (navigationPackage?.name === 'expo-router') {
      target = target.replace('packages/expo-router/', '');
      if (navigationPackage?.options?.type === 'stack') {
        target = target.replace('stack/', '');
      }
      if (navigationPackage?.options?.type === 'tabs') {
        target = target.replace('tabs/', '');
      }
      if (navigationPackage?.options?.type === 'drawer + tabs') {
        target = target.replace('drawer/', '');
      }
    }

    if (internalizationPackage?.name === 'i18next') {
      target = target.replace('packages/i18next/', '');
    }

    if (analyticsPackage?.name === 'vexo-analytics') {
      target = target.replace('packages/vexo-analytics/', '');
    }

    if (stateManagementPackage?.name === 'redux') {
      target = target.replace('packages/redux/', '');
    }

    const gen = toolbox.template.generate({
      template,
      target: `./${projectName}/` + target,
      props: {
        authenticationPackage,
        analyticsPackage,
        flags,
        navigationPackage,
        projectName,
        packageManager,
        packages,
        stylingPackage,
        internalizationPackage,
        stateManagementPackage
      }
    });

    return prev.concat([gen]);
  }, formattedFiles);
}
