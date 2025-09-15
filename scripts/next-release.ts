import getReleasePlan from '@changesets/get-release-plan';

async function createNextRelease() {
  const releasePlan = await getReleasePlan(process.cwd());

  try {
    /** Get the commit hash from the latest commit */
    const proc = Bun.spawn(['git', 'rev-parse', '--short', 'HEAD']);
    const commitHash = (await new Response(proc.stdout).text()).trim();

    /**
     * Parse the package.json for `create-expo-stack`, and update it with the new
     * "next" (development) version based on the parsed changesets
     */
    const cliPackageJson = await Bun.file(process.cwd() + '/cli/package.json').json();
    const newNextVersion = releasePlan.releases.find((release) => release.name === cliPackageJson.name)?.newVersion;

    if (newNextVersion) {
      const nextVersionWithHash = `${newNextVersion}-next.${commitHash}`;

      /**
       * Write the new "next" version to `create-expo-stack` package.json. It is an ephemeral change
       * that lives only for the duration of the CI run, and is not committed
       */
      cliPackageJson.version = nextVersionWithHash;

      const cliContent = JSON.stringify(cliPackageJson, null, '\t') + '\n';
      await Bun.write(process.cwd() + '/cli/package.json', cliContent);

      /**
       * Also update the rn-new package.json with the same version and update its dependency
       * on create-expo-stack to match the new next version
       */
      const rnNewPackageJson = await Bun.file(process.cwd() + '/packages/rn-new/package.json').json();
      rnNewPackageJson.version = nextVersionWithHash;
      rnNewPackageJson.dependencies['create-expo-stack'] = `^${nextVersionWithHash}`;

      const rnNewContent = JSON.stringify(rnNewPackageJson, null, '\t') + '\n';
      await Bun.write(process.cwd() + '/packages/rn-new/package.json', rnNewContent);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

await createNextRelease();
