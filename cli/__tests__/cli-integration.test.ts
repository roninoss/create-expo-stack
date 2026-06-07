import Bun from 'bun';

import { version } from '../package.json';

import { test, expect, afterEach } from 'bun:test';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

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

const skipSnapshots = process.env.SKIP_SNAPSHOTS === '1';
const shouldSkipInstallsInTests = process.platform === 'win32';
let currentProjectName = 'myTestProject';

test(`outputs version`, async () => {
  const output = await cli([`--version`]);

  expect(output).toContain(version);
});

test(`outputs help`, async () => {
  const output = await cli([`--help`]);

  expect(output).toContain(`Info`);
  expect(output).not.toContain(`--restyle`);
  expect(output).not.toContain(`--tamagui`);
});

const reactNavigationCombinations = [
  ['--react-navigation', '--stack', '--stylesheet'],
  ['--react-navigation', '--stack', '--nativewind'],
  ['--react-navigation', '--stack', '--unistyles'],
  ['--react-navigation', '--tabs', '--stylesheet'],
  ['--react-navigation', '--tabs', '--nativewind'],
  ['--react-navigation', '--tabs', '--unistyles'],
  ['--react-navigation', '--drawer+tabs', '--stylesheet'],
  ['--react-navigation', '--drawer+tabs', '--nativewind'],
  ['--react-navigation', '--drawer+tabs', '--unistyles']
] as const;

const styleSheetCombinations = [
  ['--blank'],
  ['--blank', '--no-install'],
  ['--stylesheet'],
  ['--stylesheet', '--no-install'],
  ['--stylesheet', '--expo-router'],
  ['--stylesheet', '--expo-router', '--no-install']
] as const;

const nativewindCombinations = [
  ['--nativewind'],
  ['--nativewind', '--no-install'],
  ['--nativewind', '--expo-router'],
  ['--nativewind', '--expo-router', '--no-install']
] as const;

const nativewinduiCombinations = [
  ['--nativewindui'],
  ['--nativewindui', '--no-install'],
  ['--nativewindui', '--blank'],
  ['--nativewindui', '--blank', '--no-install']
] as const;

const popularCombinations = [
  ...styleSheetCombinations,
  ...nativewindCombinations,
  ...nativewinduiCombinations,
  ...reactNavigationCombinations
];

const getPathToProject = () => `./${currentProjectName}`;

const cleanupProject = async () => {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await fs.rm(getPathToProject(), { recursive: true, force: true });
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EBUSY' || attempt === 4) {
        throw error;
      }

      await Bun.sleep(250);
    }
  }
};

afterEach(async () => {
  await cleanupProject();
});

const listProjectFiles = async (dir: string, displayPath: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const childDisplayPath = `${displayPath}/${entry.name}`;

    if (
      childDisplayPath.startsWith(`${getPathToProject()}/node_modules`) ||
      childDisplayPath.startsWith(`${getPathToProject()}/.git`)
    ) {
      continue;
    }

    files.push(childDisplayPath);

    if (entry.isDirectory()) {
      files.push(...(await listProjectFiles(path.join(dir, entry.name), childDisplayPath)));
    }
  }

  return files;
};

for (const packageManager of packageManagers) {
  const packageManagerFlag = `--${packageManager}` as const;
  for (const [index, flags] of popularCombinations.entries()) {
    const requestedFlags = [...flags, packageManagerFlag, '--overwrite' as const];
    const effectiveFlags =
      shouldSkipInstallsInTests && !requestedFlags.includes('--no-install')
        ? [...requestedFlags, '--no-install' as const]
        : requestedFlags;

    test(`generates a project with ${requestedFlags.join(' ')}`, async () => {
      currentProjectName = `myTestProject-${packageManager}-${index}`;
      const pathToProject = getPathToProject();

      const output = await generateProject({
        projectName: currentProjectName,
        flags: effectiveFlags
      });

      expect(output).toContain(packageManager);

      if (!effectiveFlags.includes('--no-install')) {
        expect(output).toContain('Installing dependencies');
      }

      const pkgjson = await Bun.file(`${pathToProject}/package.json`).json();

      const pkgJsonWithoutVersions = {
        ...pkgjson,
        name: 'myTestProject',
        dependencies: Object.keys(pkgjson.dependencies).reduce((acc, key) => {
          return {
            ...acc,
            [key]: ''
          };
        }, {}),
        devDependencies: Object.keys(pkgjson.devDependencies).reduce((acc, key) => {
          return {
            ...acc,
            [key]: ''
          };
        }, {})
      };

      if (!skipSnapshots) {
        expect(pkgJsonWithoutVersions).toMatchSnapshot(`${requestedFlags.join(', ')}-package-json`);
      }

      const cesconfigText = await Bun.file(`${pathToProject}/cesconfig.jsonc`).text();
      // Strip single-line comments from JSONC
      const cleanedText = cesconfigText.replace(/^\s*\/\/.*$/gm, '');
      const cesconfig = JSON.parse(cleanedText);

      const cesconfigWithoutOS = {
        ...cesconfig,
        projectName: 'myTestProject',
        cesVersion: undefined,
        os: {},
        packageManager: { ...cesconfig.packageManager, version: undefined },
        flags: {
          ...cesconfig.flags,
          noInstall: requestedFlags.includes('--no-install'),
          publish: false
        }
      };

      if (!skipSnapshots) {
        expect(cesconfigWithoutOS).toMatchSnapshot(`${requestedFlags.join(', ')}-ces-config-json`);
      }

      // sort the file list for consistent snapshotting
      const sortedFileList = [pathToProject, ...(await listProjectFiles(pathToProject, pathToProject))]
        .map((filePath) => filePath.replaceAll(currentProjectName, 'myTestProject'))
        .toSorted((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

      if (!skipSnapshots) {
        expect(sortedFileList).toMatchSnapshot(`${requestedFlags.join(', ')}-file-list`);
      }

      // typecheck only works if we have packages installed
      if (!effectiveFlags.includes('--no-install')) {
        const { stderr, stdout, exitCode } = await Bun.$`cd ${currentProjectName} && bun run tsc --noEmit`;

        if (exitCode !== 0) {
          console.warn('stdout', stdout.toString());
          console.warn('stderr', stderr.toString());
        }

        expect(exitCode).toBe(0);
      }
    });
  }
}

// i18next - COMMENTED OUT - Only testing specific configurations
// test(`generates a default project with i18n`, async () => {
//   const output = await generateProject({
//     projectName: 'myTestProject',
//     flags: ['--default', `--i18next`, `--bun`, '--overwrite']
//   });

//   expect(output).toContain('--i18next');
// });
