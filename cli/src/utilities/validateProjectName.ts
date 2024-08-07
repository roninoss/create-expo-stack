import { cancel, confirm, isCancel, spinner } from '@clack/prompts';
import { ExistsResult } from 'fs-jetpack/types';
import { GluegunPrompt } from 'gluegun';

export async function validateProjectName(
  exists: (path: string) => ExistsResult,
  removeAsync: (path?: string) => Promise<void>,
  prompt: GluegunPrompt | null,
  projectName: string,
  overwrite: boolean
): Promise<void> {
  const s = spinner();

  if (!exists(projectName)) {
    return;
  }

  if (overwrite) {
    await removeAsync(projectName);

    return;
  }

  const shouldDeleteExistingProject = await confirm({
    message: `A folder with the name '${projectName}' already exists. Do you want to delete it?`,
    initialValue: true
  });

  if (isCancel(shouldDeleteExistingProject)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (shouldDeleteExistingProject) {
    s.start('Deleting existing project. This may take a minute...');
    await removeAsync(projectName);
    s.stop(`Deleted existing directory: ${projectName}`);
    return;
  }

  throw new Error(`A project with the name '${projectName}' already exists.`);
}
