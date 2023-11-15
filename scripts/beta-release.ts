import getReleasePlan from '@changesets/get-release-plan';

async function createBetaRelease() {
	const releasePlan = await getReleasePlan(process.cwd());

	try {
		/** Get the commit hash from the latest commit */
		const proc = Bun.spawn(['git', 'rev-parse', '--short', 'HEAD']);
		const commitHash = (await new Response(proc.stdout).text()).trim();

		/**
		 * Parse the package.json for `create-expo-stack`, and update it with the new
		 * beta version based on the parsed changesets
		 */
		const packageJson = await Bun.file(process.cwd() + '/cli/package.json').json();
		const newBetaVersion = releasePlan.releases.find((release) => release.name === packageJson.name)?.newVersion;
		packageJson.version = `${newBetaVersion}-beta.${commitHash}`;

		/**
		 * Write the new beta version to `package.json`. It is an ephemeral change
		 * that lives only for the duration of the CI run, and is not committed
		 */
		const content = JSON.stringify(packageJson, null, '\t') + '\n';
		await Bun.write(process.cwd() + '/cli/package.json', content);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

createBetaRelease();
