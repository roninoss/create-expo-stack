import { ExistsResult } from 'fs-jetpack/types';
import { GluegunPrompt } from 'gluegun';

export async function validateProjectName(
  exists: (path: string) => ExistsResult,
  removeAsync: (path?: string) => Promise<void>,
  prompt: GluegunPrompt | null,
  projectName: string,
  success: (message: string) => void
): Promise<void> {
  // Check if a project with the same name already exists

  if (!exists(projectName)) {
    return;
  }

  if (prompt != null) {
    const confirmDelete = await prompt.ask([
      {
        type: 'confirm',
        name: 'delete',
        message: `A folder with the name '${projectName}' already exists. Do you want to delete it?`
      }
    ]);

    if (confirmDelete.delete) {
      await removeAsync(projectName);
      return void success(`Deleted existing directory: ${projectName}`);
    }
  }

  throw new Error(`A project with the name '${projectName}' already exists.`);
}
