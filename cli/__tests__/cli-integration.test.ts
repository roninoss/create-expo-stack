import Bun from 'bun';

import { version } from '../package.json';

import { test, expect, afterEach } from 'bun:test';
import * as path from 'node:path';

type InputFlag = `--${string}`;

const cli = async (inputs: string[]) => {
  const pathToFile = `${path.join(__dirname, '../', 'bin', 'create-expo-stack.js')}`;

  console.log('running', `bun ${pathToFile} ${inputs.join(' ')}`);

  const { stdout, exitCode, success, stderr } = Bun.spawnSync(['bun', pathToFile, ...inputs]);

  if (!success || exitCode !== 0) {
    const stdoutStr = stdout.toString();
    console.log('failed command', `bun ${pathToFile} ${inputs.join(' ')}`);
    console.log('stderr: ', stderr.toString());
    console.log('stdout: ', stdoutStr);
    throw new Error(stderr.toString());
  }

  return stdout.toString();
};

// we can generate combinations soon.
const generateProject = async ({
  projectName = 'myTestProject',
  flags
}: {
  projectName?: string;
  flags: Array<InputFlag>;
}) => {
  return cli([projectName, ...flags]);
};

// Run tests for each package manager

// if we can find a good way to run tests in parallel we could go back to
// running in npm by default but right now its unbearably slow

// const packageManagers = process.env.ALL_PACKAGE_MANAGERS
//   ? ([`npm`, `yarn`, `pnpm`, `bun`] as const)
//   : (['npm'] as const);

const packageManagers = process.env.ALL_PACKAGE_MANAGERS
  ? ([`npm`, `yarn`, `pnpm`, `bun`] as const)
  : (['bun'] as const);

const skipSnapshots = !!process.env.SKIP_SNAPSHOTS;

test(`outputs version`, async () => {
  const output = await cli([`--version`]);

  expect(output).toContain(version);
});

test(`outputs help`, async () => {
  const output = await cli([`--help`]);

  expect(output).toContain(`Info`);
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

afterEach(() => {
  Bun.$`rm -rf ./myTestProject`;
});

for (const packageManager of packageManagers) {
  const packageManagerFlag = `--${packageManager}` as const;
  for (const flags of popularCombinations) {
    const finalFlags = [...flags, packageManagerFlag, '--overwrite' as const];

    test(`generates a project with ${finalFlags.join(' ')}`, async () => {
      // Increase timeout to 30 seconds for project generation
      Bun.sleep(30000);

      const output = await generateProject({
        projectName: projectName,
        flags: finalFlags
      });

      expect(output).toContain(packageManager);

      if (!finalFlags.includes('--no-install')) {
        expect(output).toContain('Installing dependencies');
      }

      const pkgjson = await import(path.resolve(pathToProject, 'package.json'));

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
        expect(pkgJsonWithoutVersions).toMatchSnapshot(`${finalFlags.join(', ')}-package-json`);
      }

      const cesconfigText = await Bun.file(`${pathToProject}/cesconfig.jsonc`).text();
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
        expect(cesconfigWithoutOS).toMatchSnapshot(`${finalFlags.join(', ')}-ces-config-json`);
      }

      const fileList =
        await Bun.$`find ./${projectName} -not -path "./${projectName}/node_modules*" -not -path "./${projectName}/.git*"`.text();

      // sort the file list for consistent snapshotting
      const sortedFileList = fileList
        .split('\n')
        .filter(Boolean)
        .toSorted((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

      if (!skipSnapshots) {
        expect(sortedFileList).toMatchSnapshot(`${finalFlags.join(', ')}-file-list`);
      }

      // typecheck only works if we have packages installed
      if (!finalFlags.includes('--no-install')) {
        const { stderr, stdout, exitCode } = await Bun.$`cd ${projectName} && bun run tsc --noEmit`;

        if (exitCode !== 0) {
          console.warn('stdout', stdout.toString());
          console.warn('stderr', stderr.toString());
        }

        expect(exitCode).toBe(0);
      }
    });
  }
}

// i18next
test(`generates a default project with i18n`, async () => {
  const output = await generateProject({
    projectName: 'myTestProject',
    flags: ['--default', `--i18next`, `--bun`, '--overwrite']
  });

  expect(output).toContain('--i18next');
});
