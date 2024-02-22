import { system } from 'gluegun';

import { version } from '../package.json';

import { test, expect, describe } from 'bun:test';
import * as path from 'node:path';

const navigationTypes = ['stack', 'tabs', 'drawer+tabs'];
const stylingLibraries = ['--nativewind', '--tamagui', '--restyle', '--unistyles', '' /* stylesheet */];
const packageManagers = [`npm`, `yarn`, `pnpm`, `bun`];

const cli = async (cmd) =>
  system.run(`bun run ` + path.join('./', `bin`, `create-expo-stack.js`) + ` ${cmd} --overwrite`);

test(`outputs version`, async () => {
  const output = await cli(`--version`);
  expect(output).toContain(version);
});

test(`outputs help`, async () => {
  const output = await cli(`--help`);
  expect(output).toContain(`Info`);
});

describe(`version control`, () => {
  test(`generates a default project with no-git`, async () => {
    const output = await cli(`myTestProject --default --no-git --bun`);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a default project with git`, async () => {
    const output = await cli(`myTestProject --default --bun`);
    expect(output).toContain('Initializing git');
  });
});

describe(`dependencies`, () => {
  test(`generates a default project without dependencies installation`, async () => {
    const output = await cli(`myTestProject --default --no-install --bun`);
    expect(output).not.toContain('Installing dependencies');
  });

  test(`generates a default project with dependecies installation`, async () => {
    const output = await cli(`myTestProject --default --bun`);
    expect(output).toContain('Installing dependencies');
  });

  // react-navigation
  for (const type of navigationTypes) {
    test(`generates a default project with dependecies installation for ${type}`, async () => {
      const output = await cli(`myTestProject --react-navigation --${type} --bun --no-git`);
      expect(output).toContain('Installing dependencies');
    });
  }

  // expo-router
  for (const type of navigationTypes) {
    test(`generates a default project with dependecies installation for ${type}`, async () => {
      const output = await cli(`myTestProject --expo-router --${type} --bun --no-git`);
      expect(output).toContain('Installing dependencies');
    });
  }

  // expo-router
  for (const stylingLib of stylingLibraries) {
    test(`generates a default project with dependecies installation for ${stylingLib}`, async () => {
      const output = await cli(`myTestProject --default --${stylingLib} --bun --no-git`);
      expect(output).toContain('Installing dependencies');
    });
  }
});

describe(`package managers`, () => {
  for (const packageManager of packageManagers) {
    test(`generates a default project with ${packageManager}`, async () => {
      const output = await cli(`myTestProject --default --${packageManager} --no-git`);
      expect(output).toContain(packageManager);
    });
  }
});

describe(`react-navigation`, () => {
  for (const type of navigationTypes) {
    for (const stylingLib of stylingLibraries) {
      test(`generates a project with react-navigation ${type} and ${stylingLib ?? 'stylesheet'} and bun`, async () => {
        const output = await cli(
          `myTestProject --react-navigation --${type} ${stylingLib} --bun --no-install --no-git`
        );
        expect(output).toContain(type);
      });
    }
  }
});

describe(`expo-router`, () => {
  for (const type of navigationTypes) {
    for (const stylingLib of stylingLibraries) {
      test(`generates a project with expo-router ${type} and ${stylingLib ?? 'stylesheet'} and bun`, async () => {
        const output = await cli(`myTestProject --expo-router --${type} ${stylingLib} --bun --no-install --no-git`);
        expect(output).toContain(type);
      });
    }
  }
});

describe(`internationalization`, () => {
  // i18next
  test(`generates a default project with bun and i18n`, async () => {
    const output = await cli(`myTestProject --default --i18next --bun --no-install --no-git`);
    expect(output).toContain('--i18next');
  });
  // --react-navigation i18next
  test(`generates a project with bun, react-navigation and i18n`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --i18next --bun --no-install --no-git`);
    expect(output).toContain('--i18next');
  });
  // --expo-router i18next
  test(`generates a project with bun, expo-router and i18n`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --i18next --bun --no-install --no-git`);
    expect(output).toContain('--i18next');
  });
});
