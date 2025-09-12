import * as assert from 'node:assert';
import { execSync, spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { test } from 'node:test';
import pkgJson from '../package.json' with { type: 'json' };

const version = pkgJson.version;

type InputFlag = `--${string}`;

const cli = (inputs: string[]) => {
  const pathToFile = `${path.join(import.meta.dirname, '../', 'bin', 'create-expo-stack.js')}`;

  console.log('running', `node ${pathToFile} ${inputs.join(' ')}`);

  const { stdout, error, status, stderr } = spawnSync('node', [pathToFile, ...inputs], {
    shell: true,
    stdio: 'pipe'
  });

  if (error || status !== 0) {
    const stdoutStr = stdout?.toString?.();
    console.log('failed command', `node ${pathToFile} ${inputs.join(' ')}`);
    console.log('stderr: ', stderr?.toString?.());
    console.log('stdout: ', stdoutStr);
    throw new Error(stderr?.toString?.());
  }

  return stdout?.toString?.();
};

// we can generate combinations soon.
const generateProject = ({
  projectName = 'myTestProject',
  flags
}: {
  projectName?: string;
  flags: Array<InputFlag>;
}) => {
  return cli([projectName, ...flags]);
};

const skipSnapshots = process.env.SKIP_SNAPSHOTS === '1';

await test(`outputs version`, async () => {
  const output = await cli([`--version`]);

  assert.ok(output.includes(version));
});

await test(`outputs help`, async () => {
  const output = await cli([`--help`]);

  assert.ok(output.includes(`Info`));
});

// React Navigation combinations - covering all styling packages and navigation types
// to test color scheme support and Navigation component naming
const reactNavigationCombinations = [
  ['--react-navigation', '--tabs', '--stylesheet'],
  ['--react-navigation', '--tabs', '--nativewind'],
  ['--react-navigation', '--tabs', '--tamagui'],
  ['--react-navigation', '--tabs', '--restyle'],
  ['--react-navigation', '--tabs', '--unistyles'],

  ['--react-navigation', '--drawer+tabs', '--stylesheet'],
  ['--react-navigation', '--drawer+tabs', '--nativewind'],
  ['--react-navigation', '--drawer+tabs', '--tamagui'],
  ['--react-navigation', '--drawer+tabs', '--restyle'],
  ['--react-navigation', '--drawer+tabs', '--unistyles'],

  ['--react-navigation', '--stack', '--stylesheet'],
  ['--react-navigation', '--stack', '--nativewind'],
  ['--react-navigation', '--stack', '--tamagui'],
  ['--react-navigation', '--stack', '--restyle'],
  ['--react-navigation', '--stack', '--unistyles']
] as const;

// Core combinations that run by default
const coreCombinations = [
  ['--expo-router', '--nativewind'],
  ['--expo-router', '--stylesheet'],
  ['--expo-router', '--tabs', '--nativewind'],
  ['--expo-router', '--tabs', '--stylesheet'],
  ['--expo-router', '--drawer+tabs', '--nativewind'],
  ['--expo-router', '--drawer+tabs', '--stylesheet'],
  // nativewindui selections
  [
    '--expo-router',
    '--drawer+tabs',
    '--nativewindui',
    '--selected-components=date-picker,picker,text',
    '--expo-router'
  ],
  // nativewindui no selections
  ['--expo-router', '--drawer+tabs', '--nativewindui', '--expo-router'],
  // no install is important for the website cli that generates a project zip file
  ['--nativewindui', '--no-install'],
  // nativewindui blank
  ['--expo-router', '--drawer+tabs', '--nativewindui', '--blank', '--expo-router']
] as const;

// Combine all combinations based on environment variables
const popularCombinations = process.env.INCLUDE_REACT_NAVIGATION_TESTS
  ? [...coreCombinations, ...reactNavigationCombinations]
  : coreCombinations;

const projectName = `myTestProject`;
const pathToProject = `./${projectName}`;

const packageManager = 'npm';

const packageManagerFlag = `--${packageManager}` as const;
for (const flags of popularCombinations) {
  const finalFlags = [...flags, packageManagerFlag, '--overwrite' as const, '--no-git' as const];

  await test(`generates a project with ${finalFlags.join(' ')}`, async (context) => {
    const output = generateProject({
      projectName: projectName,
      flags: finalFlags
    });

    assert.ok(output.includes(packageManager));

    if (!finalFlags.includes('--no-install')) {
      assert.ok(output.includes('Installing dependencies'));
    }

    const pkgjson = await import(path.resolve(pathToProject, 'package.json'), { with: { type: 'json' } });

    const pkgJsonWithoutVersions = {
      ...pkgjson.default,
      dependencies: Object.keys(pkgjson.default.dependencies).reduce((acc, key) => {
        return {
          ...acc,
          [key]: ''
        };
      }, {}),
      devDependencies: Object.keys(pkgjson.default.devDependencies).reduce((acc, key) => {
        return {
          ...acc,
          [key]: ''
        };
      }, {})
    };

    if (!skipSnapshots) {
      context.assert.snapshot(pkgJsonWithoutVersions);
    }

    const cesconfigRaw = await readFile(`${pathToProject}/cesconfig.jsonc`);
    const cesconfigText = cesconfigRaw.toString();
    // Strip single-line comments from JSONC
    const cleanedText = cesconfigText.replace(/^\s*\/\/.*$/gm, '');
    const cesconfig = JSON.parse(cleanedText);

    const cesconfigWithoutOS = {
      ...cesconfig,
      cesVersion: undefined,
      os: {},
      packageManager: { ...cesconfig.packageManager, version: undefined },
      flags: {
        ...cesconfig.flags,
        publish: false
      }
    };

    if (!skipSnapshots) {
      context.assert.snapshot(cesconfigWithoutOS);
    }

    const fileList = execSync(
      `find ./${projectName} -not -path "./${projectName}/node_modules*" -not -path "./${projectName}/.git*"`
    );

    // sort the file list for consistent snapshotting
    const sortedFileList = fileList
      .toString()
      .split('\n')
      .filter(Boolean)
      .toSorted((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

    if (!skipSnapshots) {
      context.assert.snapshot(sortedFileList);
    }

    // typecheck only works if we have packages installed
    if (!finalFlags.includes('--no-install')) {
      // throws if it fails
      execSync(`cd ${projectName} && bun run tsc --noEmit`);
    }
  });
}

// i18next;
await test(`generates a default project with i18n`, async () => {
  const output = await generateProject({
    projectName: 'myTestProject',
    flags: ['--default', `--i18next`, `--bun`, '--overwrite', '--no-git']
  });

  assert.ok(output.includes('--i18next'));
});
