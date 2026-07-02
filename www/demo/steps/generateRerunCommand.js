import { NATIVEWINDUI_COMPONENTS } from "../constants.js";

// Mirrors generateRerunScript in cli/src/commands/create-expo-stack.ts so the
// demo can hand users an equivalent local command when the download service
// is unavailable.
export function generateRerunCommand(cliResults) {
  const projectName = /\s/.test(cliResults.projectName)
    ? `"${cliResults.projectName}"`
    : cliResults.projectName;

  let command = `npx rn-new@latest ${projectName}`;

  const nativewindUIPackage = cliResults.packages.find(
    (p) => p.name === "nativewindui",
  );

  if (nativewindUIPackage) {
    command += " --nativewindui";

    const selectedComponents =
      nativewindUIPackage.options?.selectedComponents ?? [];

    if (selectedComponents.length === 0) {
      command += " --blank";
    } else if (selectedComponents.length !== NATIVEWINDUI_COMPONENTS.length) {
      command += ` --selected-components=${selectedComponents.join(",")}`;
    }

    const navigationPackage = cliResults.packages.find(
      (p) => p.type === "navigation",
    );

    // expo-router is applied automatically with nativewindui and stack is the
    // default navigation type, so only the other types need a flag
    if (navigationPackage?.options?.type === "tabs") {
      command += " --tabs";
    } else if (navigationPackage?.options?.type === "drawer + tabs") {
      command += " --drawer+tabs";
    }
  } else {
    for (const p of cliResults.packages) {
      command += ` --${p.name}`;
      if (p.type === "navigation") {
        if (p.options?.type === "tabs") {
          command += " --tabs";
        } else if (p.options?.type === "drawer + tabs") {
          command += " --drawer+tabs";
        }
      }
    }
  }

  if (cliResults.flags.packageManager !== "npm") {
    command += ` --${cliResults.flags.packageManager}`;
  }

  return command;
}
