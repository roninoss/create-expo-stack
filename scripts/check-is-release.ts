import getReleasePlan from '@changesets/get-release-plan';

/**
 * Checks if a "next" or development release is necessary based on the presence of changesets.
 * Outputs "true" or "false" to stdout.
 */
async function checkIsRelease() {
  const currentDir = process.cwd();
  const packageJsonPath = `${currentDir}/cli/package.json`;

  try {
    const releasePlan = await getReleasePlan(currentDir);
    const packageJson = await Bun.file(packageJsonPath).json();

    const newNextVersion = releasePlan?.releases?.find(
      (release) => release.name === packageJson.name
    )?.newVersion;

    await Bun.write(Bun.stdout, `${newNextVersion != null}\n`);
  } catch (error) {
    console.error('Error during release check:', error);
    process.exit(1);
  }
}

// Run the release check
await checkIsRelease();
