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
		const packageJson = await Bun.file(process.cwd() + '/cli/package.json').json();
		const newNextVersion = releasePlan.releases.find((release) => release.name === packageJson.name)?.newVersion;

		if (newNextVersion) {
			/**
			 * Write the new "next" version to `package.json`. It is an ephemeral change
			 * that lives only for the duration of the CI run, and is not committed
			 */
			packageJson.version = `${newNextVersion}-next.${commitHash}`;

			const content = JSON.stringify(packageJson, null, '\t') + '\n';
			await Bun.write(process.cwd() + '/cli/package.json', content);
		}
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

await createNextRelease();
