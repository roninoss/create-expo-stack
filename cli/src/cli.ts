import { build } from 'gluegun';

/**
 * Create the cli and kick it off
 */
export async function run() {
  const argv = process.argv;
  // create a CLI runtime
  const cli = build()
    .brand('create-expo-stack')
    .src(__dirname)
    .plugins('./node_modules', {
      matching: 'create-expo-stack-*',
      hidden: true
    })
    .version() // provides default for version, v, --version, -v
    .create();

  // Node version check
  const [major, minor, _patch] = process.versions.node.split('.').map(Number);
  const isVersionOk = major > 20 || (major === 20 && minor >= 19);

  if (!isVersionOk) {
    console.error(`Error: rn-new requires Node.js version 20.19.0 or higher, or version 22.0.0 or higher.`);
    console.error(`You are currently running Node.js ${process.versions.node}.`);
    console.error('Please update your Node version.');
    process.exit(1);
  }

  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv);

  // send it back (for testing, mostly)
  return toolbox;
}
