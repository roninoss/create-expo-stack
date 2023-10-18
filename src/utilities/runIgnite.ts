import { Toolbox } from "gluegun/build/types/domain/toolbox";
import { DEFAULT_APP_NAME } from "../constants";
import { getPackageManager } from "./getPackageManager";

export async function runIgnite(toolbox: Toolbox) {
  const {
    parameters: { first },
    print: { success },
    prompt: { ask },
    system,
  } = toolbox;

  let projectName;
  if (!first) {
    const askName = {
      type: 'input',
      name: 'name',
      message: `What do you want to name your project? (${DEFAULT_APP_NAME})`,
    }
    const { name } = await ask(askName)
    // if name is undefined or empty string, use default name
    projectName = name || DEFAULT_APP_NAME;
  } else {
    projectName = first;
  }

  const packageManager = getPackageManager(toolbox);

  success('Running Ignite CLI to create an opinionated stack...')
  await system.spawn(`npx ignite-cli@latest new ${projectName} --packager=${packageManager} --yes`, {
    shell: true,
    stdio: 'inherit',
  });
}