import { GluegunToolbox } from 'gluegun';
import { execSync } from 'child_process';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const verifyRepoDeleted = (repoName: string): boolean => {
  try {
    execSync(`gh repo view ${repoName}`, { stdio: 'ignore' });
    return false; // Repository still exists
  } catch (e) {
    return true; // Repository is deleted
  }
};

export const publishToGitHub = async (toolbox: GluegunToolbox, projectName: string): Promise<string | null> => {
  const {
    print: { info, error }
  } = toolbox;

  try {
    // Check if gh CLI is installed
    try {
      execSync('gh --version', { stdio: 'ignore' });
    } catch (e) {
      error('\nGitHub CLI (gh) is not installed.');
      info('Please install it from: https://cli.github.com/');
      info('Then run: gh auth login');
      return null;
    }

    // Check if user is authenticated with correct permissions
    try {
      const scopes = execSync('gh auth status -t 2>&1', { encoding: 'utf8' });
      if (!scopes.includes('delete_repo')) {
        error('\nMissing required GitHub permissions.');
        info('Please run the following command to grant delete repository permissions:');
        info('  gh auth refresh -h github.com -s delete_repo');
        return null;
      }
    } catch (e) {
      error('\nYou are not authenticated with GitHub CLI.');
      info('Please run: gh auth login');
      return null;
    }

    // Check if repository already exists
    try {
      execSync(`gh repo view ${projectName}`, { stdio: 'ignore' });

      // Repository exists, ask user if they want to delete it
      const response = await toolbox.prompt.ask({
        type: 'confirm',
        name: 'deleteRepo',
        message: `Repository "${projectName}" already exists and has content. Would you like to delete it?`
      });

      if (!response.deleteRepo) {
        info('\nPublication cancelled.');
        return null;
      }

      // Delete the existing repository
      info('\nDeleting existing repository...');
      try {
        execSync(`gh repo delete ${projectName} --yes`, { stdio: 'ignore' });
        info('\nExisting repository deleted.');

        // Wait and verify deletion
        info('Waiting for GitHub to process deletion...');
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
          await sleep(2000);
          if (verifyRepoDeleted(projectName)) {
            break;
          }
          attempts++;
          if (attempts < maxAttempts) {
            info(`Still waiting for deletion to process... (attempt ${attempts + 1}/${maxAttempts})`);
          }
        }

        if (!verifyRepoDeleted(projectName)) {
          error('\nFailed to delete existing repository. Please try again later or use a different name.');
          return null;
        }
      } catch (e) {
        error('\nFailed to delete existing repository. Please try again later or use a different name.');
        return null;
      }
    } catch (e) {
      // Creating a new Github repository
      info('\nCreating new repository...');
      execSync(`gh repo create ${projectName} --public`, { stdio: 'pipe' });
    }

    info('\nConfiguring git credentials...');
    // Get the GitHub CLI token
    const ghToken = execSync('gh auth token', { encoding: 'utf8' }).trim();

    // Configure git to use the GitHub CLI token
    execSync(`git config --local credential.helper ''`, { stdio: 'ignore' });
    execSync(
      `git config --local http.https://github.com/.extraheader "AUTHORIZATION: basic ${Buffer.from(`x-access-token:${ghToken}`).toString('base64')}"`,
      { stdio: 'ignore' }
    );

    // Get the current user's GitHub username
    const username = execSync('gh api user -q .login', { encoding: 'utf8' }).trim();
    info(`\nConfiguring repository for ${username}...`);

    // Set the remote URL
    info('\nSetting remote URL...');
    try {
      // Check if remote already exists
      try {
        execSync('git remote get-url origin', { stdio: 'ignore' });
        // Remote exists, ask user if they want to overwrite
        const response = await toolbox.prompt.ask({
          type: 'confirm',
          name: 'overwriteRemote',
          message: 'A remote "origin" is already configured. Would you like to overwrite it?'
        });

        if (!response.overwriteRemote) {
          info('\nKeeping existing remote configuration.');
          return null;
        }

        // Remove existing remote
        execSync('git remote remove origin', { stdio: 'ignore' });
      } catch (e) {
        // Remote doesn't exist, continue
      }

      execSync(`git remote add origin https://github.com/${username}/${projectName}.git`, { stdio: 'ignore' });
    } catch (e) {
      error(`\nFailed to set remote URL. ${e.message}`);
      return null;
    }

    // Push the code to the new repository
    info('\nPushing code to the new repository...');
    try {
      execSync('git push -u origin main', { stdio: 'ignore' });
    } catch (e) {
      error(`\nFailed to push code to the new repository. ${e.message}`);
      return null;
    }

    // Get the repository URL
    const repoUrl = execSync('gh repo view --json url -q .url', { encoding: 'utf8' }).trim();
    return repoUrl;
  } catch (err) {
    error('\nFailed to publish to GitHub.');
    if (err instanceof Error) {
      error(err.message);
    }
    return null;
  }
};
