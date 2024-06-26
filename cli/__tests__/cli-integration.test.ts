import Bun from 'bun';

import { version } from '../package.json';

import { test, expect } from 'bun:test';
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
const packageManagers = process.env.ALL_PACKAGE_MANAGERS
  ? ([`npm`, `yarn`, `pnpm`, `bun`] as const)
  : (['npm'] as const);

test(`outputs version`, async () => {
  const output = await cli([`--version`]);

  expect(output).toContain(version);
});

test(`outputs help`, async () => {
  const output = await cli([`--help`]);

  expect(output).toContain(`Info`);
});

const popularCombinations = [
  ['--expo-router', '--nativewind'],
  ['--expo-router', '--stylesheet'],
  ['--expo-router', '--tabs', '--nativewind'],
  ['--expo-router', '--tabs', '--stylesheet'],
  ['--expo-router', '--drawer+tabs', '--nativewind'],
  ['--expo-router', '--drawer+tabs', '--stylesheet']
] as const;

// let i = 0;

const projectName = `myTestProject`;

for (const packageManager of packageManagers) {
  const packageManagerFlag = `--${packageManager}` as const;
  for (const flags of popularCombinations) {
    // const projectName = `myTestProject-${i++}`;

    const finalFlags = [...flags, packageManagerFlag, '--overwrite' as const];

    test(`generates a project with ${finalFlags.join(', ')}`, async () => {
      const output = await generateProject({
        projectName: projectName,
        flags: finalFlags
      });

      expect(output).toContain(packageManager);

      expect(output).toContain('Installing dependencies');
    });
  }
}

// i18next
test(`generates a default project with i18n`, async () => {
  const output = await generateProject({
    projectName: 'myTestProject',
    flags: ['--default', `--i18next`, `--bun`]
  });

  expect(output).toContain('--i18next');
});
