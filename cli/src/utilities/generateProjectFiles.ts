import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults, PackageManager } from '../types';

export function generateProjectFiles(
  authenticationPackage: AvailablePackages | undefined,
  cliResults: CliResults,
  files: string[],
  formattedFiles: any[],
  navigationPackage: AvailablePackages | undefined,
  packageManager: PackageManager,
  stylingPackage: AvailablePackages | undefined,
  toolbox: Toolbox
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
    } else if (stylingPackage?.name === 'nativewind') {
      target = target.replace('packages/nativewind/', '');
    }

    if (navigationPackage?.name === 'react-navigation') {
      target = target.replace('packages/react-navigation/App.tsx', 'App.tsx');
      target = target.replace('packages/react-navigation/', 'src/');
    }

    if (navigationPackage?.name === 'expo-router') {
      target = target.replace('packages/expo-router/', '');
      if (navigationPackage?.options?.type === 'stack') {
        target = target.replace('stack/', '');
      }
      if (navigationPackage?.options?.type === 'tabs') {
        target = target.replace('tabs/', '');
      }
      if (navigationPackage?.options?.type === 'drawer') {
        target = target.replace('drawer/', '');
      }
    }

    const gen = toolbox.template.generate({
      template,
      target: `./${projectName}/` + target,
      props: {
        authenticationPackage,
        flags,
        navigationPackage,
        projectName,
        packageManager,
        packages,
        stylingPackage
      }
    });

    return prev.concat([gen]);
  }, formattedFiles);
}
