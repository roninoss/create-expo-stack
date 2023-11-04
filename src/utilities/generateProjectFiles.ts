import { Toolbox } from "gluegun/build/types/domain/toolbox";
import { AvailablePackages, CliResults } from "../types";

export function generateProjectFiles(
    cliResults: CliResults,
    files: string[],
    formattedFiles: any[],
    navigationPackage: AvailablePackages,
    toolbox: Toolbox,
    stylingPackage: AvailablePackages,
    analyticsPackage: AvailablePackages
) {
    const { projectName, packages, flags } = cliResults;

    return files.reduce((prev, file) => {
        const template = file;

        let target = `${projectName}/` + file.replace('.ejs', '').replace('base/', '')

        if (stylingPackage?.name === 'tamagui') {
            target = target.replace('packages/tamagui/', '');
        } else if (stylingPackage?.name === 'nativewind') {
            target = target.replace('packages/nativewind/', '');
        }

        if (navigationPackage?.name === "react-navigation") {
            target = target.replace('packages/react-navigation/App.tsx', 'App.tsx');
            target = target.replace('packages/react-navigation/', 'src/');
        }

        if (navigationPackage?.name === "expo-router") {
            target = target.replace('packages/expo-router/', '');
            if (navigationPackage.options.type === "stack") {
                target = target.replace('stack/', '');
            }
            if (navigationPackage.options.type === "tabs") {
                target = target.replace('tabs/', '');
            }
        }

        const gen = toolbox.template.generate({
            template,
            target: './' + target,
            props: {
                projectName,
                packages,
                flags,
                stylingPackage,
                navigationPackage,
                analyticsPackage
            },
        });

        return prev.concat([gen]);
    }, formattedFiles)
}