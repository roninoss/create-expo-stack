import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run(
    'node ' + filesystem.path(src, 'bin', 'create-expo-stack') + ` ${cmd}`
  )

jest.setTimeout(20000); // Set a 10-second timeout

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('2.0.5')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('2.0.5')
})

test('generates a default project', async () => {
  const output = await cli('myTestProject --default --nonInteractive')
  expect(output).toContain('Success!')
})

// --react-navigation stack
test('generates a project with react-navigation stack', async () => {
  const output = await cli('myTestProject --react-navigation --stack --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation stack and noGit', async () => {
  const output = await cli('myTestProject --react-navigation --stack --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation stack and noGit and noInstall', async () => {
  const output = await cli('myTestProject --react-navigation --stack --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})

// --react-navigation stack nativewind
test('generates a project with react-navigation stack and nativewind', async () => {
  const output = await cli('myTestProject --react-navigation --stack --nativewind --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation stack and nativewind and noGit', async () => {
  const output = await cli('myTestProject --react-navigation --stack --nativewind --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation stack and nativewind and noGit and noInstall', async () => {
  const output = await cli('myTestProject --react-navigation --stack --nativewind --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})

// --react-navigation tabs
test('generates a project with react-navigation tabs', async () => {
  const output = await cli('myTestProject --react-navigation --tabs --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation tabs and noGit', async () => {
  const output = await cli('myTestProject --react-navigation --tabs --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation tabs and noGit and noInstall', async () => {
  const output = await cli('myTestProject --react-navigation --tabs --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})

// --react-navigation tabs nativewind
test('generates a project with react-navigation tabs and nativewind', async () => {
  const output = await cli('myTestProject --react-navigation --tabs --nativewind --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation tabs and nativewind and noGit', async () => {
  const output = await cli('myTestProject --react-navigation --tabs --nativewind --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with react-navigation tabs and nativewind and noGit and noInstall', async () => {
  const output = await cli('myTestProject --react-navigation --tabs --nativewind --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})

// --expo-router stack
test('generates a project with expo-router stack', async () => {
  const output = await cli('myTestProject --expo-router --stack --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router stack and noGit', async () => {
  const output = await cli('myTestProject --expo-router --stack --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router stack and noGit and noInstall', async () => {
  const output = await cli('myTestProject --expo-router --stack --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})

// --expo-router stack nativewind
test('generates a project with expo-router stack and nativewind', async () => {
  const output = await cli('myTestProject --expo-router --stack --nativewind --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router stack and nativewind and noGit', async () => {
  const output = await cli('myTestProject --expo-router --stack --nativewind --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router stack and nativewind and noGit and noInstall', async () => {
  const output = await cli('myTestProject --expo-router --stack --nativewind --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})

// --expo-router tabs
test('generates a project with expo-router tabs', async () => {
  const output = await cli('myTestProject --expo-router --tabs --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router tabs and noGit', async () => {
  const output = await cli('myTestProject --expo-router --tabs --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router tabs and noGit and noInstall', async () => {
  const output = await cli('myTestProject --expo-router --tabs --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})

// --expo-router tabs nativewind
test('generates a project with expo-router tabs and nativewind', async () => {
  const output = await cli('myTestProject --expo-router --tabs --nativewind --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router tabs and nativewind and noGit', async () => {
  const output = await cli('myTestProject --expo-router --tabs --nativewind --noGit --nonInteractive')
  expect(output).toContain('Success!')
})

test('generates a project with expo-router tabs and nativewind and noGit and noInstall', async () => {
  const output = await cli('myTestProject --expo-router --tabs --nativewind --noGit --noInstall --nonInteractive')
  expect(output).toContain('Success!')
})
