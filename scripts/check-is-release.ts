import getReleasePlan from '@changesets/get-release-plan';

/** Check if a "next" / development release is necessary based on the presence of changesets */
async function checkIsRelease() {
	const releasePlan = await getReleasePlan(process.cwd());

	try {
		const packageJson = await Bun.file(process.cwd() + '/cli/package.json').json();
		const newNextVersion = releasePlan.releases.find((release) => release.name === packageJson.name)?.newVersion;

		if (newNextVersion == null) {
			await Bun.write(Bun.stdout, 'false\n');
		} else {
			await Bun.write(Bun.stdout, 'true\n');
		}
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

await checkIsRelease();
