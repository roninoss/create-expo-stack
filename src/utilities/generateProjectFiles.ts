import { Toolbox } from "gluegun/build/types/domain/toolbox";
import { AvailablePackages, CliResults } from "../types";

export function generateProjectFiles(
    cliResults: CliResults,
    files: string[],
    formattedFiles: any[],
    navigationPackage: AvailablePackages,
    toolbox: Toolbox,
    useNativewind: boolean,
) {
    const { projectName, packages, flags } = cliResults;

    return files.reduce((prev, file) => {
        const template = file;

        let target = `${projectName}/` + file.replace('.ejs', '').replace('base/', '')

        if (useNativewind) {
            target = target.replace('packages/nativewind/', '');
        }

        if (navigationPackage?.name === "react-navigation") {
            target = target.replace('packages/react-navigation/App.tsx', 'App.tsx');
            target = target.replace('packages/react-navigation/', 'src/');
        }

        if (navigationPackage?.name === "expo-router") {
            target = target.replace('packages/expo-router/', '');
            if (navigationPackage.options === "stack") {
                target = target.replace('stack/', '');
            }
            if (navigationPackage.options === "tabs") {
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
                useNativewind,
                navigationPackage,
            },
        });

        return prev.concat([gen]);
    }, formattedFiles)
}