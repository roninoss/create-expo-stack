import { system } from 'gluegun';

import { version } from '../package.json';

import { test, expect, describe } from 'bun:test';
import * as path from 'node:path';

const cli = async (cmd) =>
  system.run(`bun run ` + path.join('./', `bin`, `create-expo-stack.js`) + ` ${cmd} --overwrite`);

// Run tests for each package manager
const packageManagers = [`npm`, `yarn`, `pnpm`, `bun`];

test(`outputs version`, async () => {
  const output = await cli(`--version`);
  expect(output).toContain(version);
});

test(`outputs help`, async () => {
  const output = await cli(`--help`);
  expect(output).toContain(`Info`);
});

for (const packageManager of packageManagers) {
  // --default
  test(`generates a default project with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --default --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  // --react-navigation stack
  test(`generates a project with react-navigation stack with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation stack and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation stack and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --no-git --no-install --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation stack nativewind
  test(`generates a project with react-navigation stack and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --nativewind --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation stack and nativewind and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --nativewind --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation stack and nativewind and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --stack --nativewind --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation stack tamagui
  test(`generates a project with react-navigation stack and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --tamagui --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation stack and tamagui and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --tamagui --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation stack and tamagui and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --stack --tamagui --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation stack restyle
  test(`generates a project with react-navigation stack and restyle with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --restyle --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation stack and restyle and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --restyle --noGit --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation stack and restyle and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --stack --restyle --noGit --noInstall --${packageManager}`
    );
    expect(output).toContain(packageManager);
  });

  // --react-navigation stack unistyles
  test(`generates a project with react-navigation stack and unistyles with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --unistyles --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation stack and unistyles and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --unistyles --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation stack and unistyles and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --stack --unistyles --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation tabs
  test(`generates a project with react-navigation tabs with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation tabs and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation tabs and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --no-git --no-install --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  // --react-navigation tabs nativewind
  test(`generates a project with react-navigation tabs and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --nativewind --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation tabs and nativewind and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --nativewind --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation tabs and nativewind and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --tabs --nativewind --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation tabs tamagui
  test(`generates a project with react-navigation tabs and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --tamagui --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation tabs and tamagui and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --tamagui --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation tabs and tamagui and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --tabs --tamagui --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation tabs restyle
  test(`generates a project with react-navigation tabs and restyle with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --restyle --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation tabs and restyle and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --restyle --noGit --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation tabs and restyle and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --tabs --restyle --noGit --noInstall --${packageManager}`
    );
    expect(output).toContain(packageManager);
  });

  // --react-navigation tabs unistyles
  test(`generates a project with react-navigation tabs and unistyles with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --unistyles --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation tabs and unistyles and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --unistyles --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation tabs and unistyles and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --tabs --unistyles --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation drawer
  test(`generates a project with react-navigation drawer with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation drawer and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation drawer and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --drawer+tabs --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  // --react-navigation drawer nativewind
  test(`generates a project with react-navigation drawer and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --nativewind --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation drawer and nativewind and no-git with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --drawer+tabs --nativewind --no-git --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation drawer and nativewind and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --drawer+tabs --nativewind --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation drawer tamagui
  test(`generates a project with react-navigation drawer and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --tamagui --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation drawer and tamagui and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --tamagui --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation drawer and tamagui and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --drawer+tabs --tamagui --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --react-navigation drawer restyle
  test(`generates a project with react-navigation drawer and restyle with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --restyle --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation drawer and restyle and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --restyle --noGit --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation drawer and restyle and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --drawer+tabs --restyle --noGit --noInstall --${packageManager}`
    );
    expect(output).toContain(packageManager);
  });

  // --react-navigation drawer unistyles
  test(`generates a project with react-navigation drawer and unistyles with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --unistyles --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with react-navigation drawer and unistyles and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --unistyles --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with react-navigation drawer and unistyles and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --react-navigation --drawer+tabs --unistyles --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router stack
  test(`generates a project with expo-router stack with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router stack and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router stack and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --no-git --no-install --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router stack nativewind
  test(`generates a project with expo-router stack and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --nativewind --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router stack and nativewind and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --nativewind --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router stack and nativewind and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --stack --nativewind --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router stack tamagui
  test(`generates a project with expo-router stack and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --tamagui --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router stack and tamagui and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --tamagui --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router stack and tamagui and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --tamagui --no-git --no-install --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router stack restyle
  test(`generates a project with expo-router stack and restyle with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --restyle --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router stack and restyle and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --restyle --noGit --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router stack and restyle and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --restyle --noGit --noInstall --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  // --expo-router stack unistyles
  test(`generates a project with expo-router stack and unistyles with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --unistyles --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router stack and unistyles and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --unistyles --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router stack and unistyles and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --stack --unistyles --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router tabs
  test(`generates a project with expo-router tabs with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router tabs and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router tabs and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --no-git --no-install --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router tabs nativewind
  test(`generates a project with expo-router tabs and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --nativewind --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router tabs and nativewind and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --nativewind --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router tabs and nativewind and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --tabs --nativewind --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router tabs tamagui
  test(`generates a project with expo-router tabs and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --tamagui --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router tabs and tamagui and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --tamagui --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router tabs and tamagui and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --tamagui --no-git --no-install --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router tabs restyle
  test(`generates a project with expo-router tabs and restyle with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --restyle --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router tabs and restyle and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --restyle --noGit --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router tabs and restyle and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --restyle --noGit --noInstall --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  // --expo-router tabs unistyles
  test(`generates a project with expo-router tabs and unistyles with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --unistyles --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router tabs and unistyles and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --unistyles --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router tabs and unistyles and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --tabs --unistyles --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router drawer
  test(`generates a project with expo-router drawer with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router drawer and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router drawer and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --no-git --no-install --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router drawer nativewind
  test(`generates a project with expo-router drawer and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --nativewind --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router drawer and nativewind and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --nativewind --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router drawer and nativewind and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --drawer+tabs --nativewind --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router drawer tamagui
  test(`generates a project with expo-router drawer and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --tamagui --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router drawer and tamagui and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --tamagui --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router drawer and tamagui and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --drawer+tabs --tamagui --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });

  // --expo-router drawer restyle
  test(`generates a project with expo-router drawer and restyle with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --restyle --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router drawer and restyle and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --restyle --noGit --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router drawer and restyle and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --drawer+tabs --restyle --noGit --noInstall --${packageManager}`
    );
    expect(output).toContain(packageManager);
  });

  // --expo-router drawer unistyles
  test(`generates a project with expo-router drawer and unistyles with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --unistyles --${packageManager}`);
    expect(output).toContain(packageManager);
  });

  test(`generates a project with expo-router drawer and unistyles and no-git with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --unistyles --no-git --${packageManager}`);
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
  });

  test(`generates a project with expo-router drawer and unistyles and no-git and no-install with ${packageManager}`, async () => {
    const output = await cli(
      `myTestProject --expo-router --drawer+tabs --unistyles --no-git --no-install --${packageManager}`
    );
    expect(output).toContain(packageManager);
    expect(output).not.toContain('Initializing git');
    expect(output).not.toContain('Installing dependencies');
  });
}

describe(`internationalization`, () => {
  // i18next
  test(`generates a default project with bun and i18n`, async () => {
    const output = await cli(`myTestProject --default --i18next --bun`);
    expect(output).toContain('--i18next');
  });
  // --react-navigation i18next
  test(`generates a project with bun, react-navigation and i18n`, async () => {
    const output = await cli(`myTestProject --expo-router --drawer+tabs --i18next --bun`);
    expect(output).toContain('--i18next');
  });
  // --expo-router i18next
  test(`generates a project with bun, expo-router and i18n`, async () => {
    const output = await cli(`myTestProject --react-navigation --drawer+tabs --i18next --bun`);
    expect(output).toContain('--i18next');
  });
});
