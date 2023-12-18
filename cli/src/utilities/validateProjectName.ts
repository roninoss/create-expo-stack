import { ExistsResult } from 'fs-jetpack/types';
import { GluegunPrompt } from 'gluegun';

export async function validateProjectName(existsAsync: (path: string) => Promise<ExistsResult>, removeAsync: (path?: string) => Promise<void>, prompt: GluegunPrompt, projectName: string) {
	if (await existsAsync(projectName)) {
		const confirmDelete = await prompt.ask([
		  {
			type: 'confirm',
			name: 'delete',
			message: `A folder with the name '${projectName}' already exists. Do you want to delete it?`
		  },
		]);
  
		if (confirmDelete.delete) {
		  await removeAsync(projectName);
		  console.log(`Deleted existing directory: ${projectName}`);
		} else {
		  throw new Error(`Exiting, a project with the name '${projectName}' already exists.`);
		}
	  }
}