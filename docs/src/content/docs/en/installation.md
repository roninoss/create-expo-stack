---
title: Installation
description: Installation instructions for Create Expo Stack
---

To scaffold an app using `create-expo-stack`, run any of the following commands and answer the command prompt questions:

### npm

```bash
npm create expo-stack
```

### yarn

```bash
yarn create expo-stack
```

### pnpm

```bash
pnpm create expo-stack
```

### bun

```bash
bun create expo-stack
```

After your app has been initialized, be sure to follow any instructions outputed by the CLI. Additionally, please take note of the output project configuration as you can run the command highlighted to speed up your next project's initialization, using CES' non-interactive mode. Furthermore, the output should be provided in any issue you open for CES.

### Example

The following would scaffold a CES app with Expo Router, NativeWind, and Bun:

### npm

```bash
npm create expo-stack --expo-router --nativewind --bun
```

### bun

```bash
bun create expo-stack myapp --expo-router --nativewind --bun
```

## Advanced Usage

### Options

| Option               | Description                                                                    |
| -------------------- | ------------------------------------------------------------------------------ |
| `-d`, `--default`    | Bypass the CLI and initialize an empty Expo project                            |
| `--npm`              | Selects npm to be your project's package manager                               |
| `--yarn`             | Selects yarn to be your project's package manager                              |
| `--pnpm`             | Selects pnpm to be your project's package manager                              |
| `--bun`              | Selects bun to be your project's package manager                               |
| `--no-git`           | Do not initialize a new git repo in the project                                |
| `--no-install`       | Generate project without installing dependencies                               |
| `--import-alias`     | Enable TypeScript path aliases                                                 |
| `--expo-router`      | Use Expo Router for navigation, stack navigator by default                     |
| `--react-navigation` | Use React Navigation for navigation, stack navigator by default                |
| `--tabs`             | Use a Tab navigator (pass with either Expo Router or React Navigation flag)    |
| `--drawer`           | Use a Drawer navigator (pass with either Expo Router or React Navigation flag) |
| `--firebase`         | Use Firebase for authentication, initial configuration only                    |
| `--supabase`         | Use Supabase for authentication, initial configuration only                    |
| `--nativewind`       | Use Nativewind for styling                                                     |
| `--unistyles`        | Use Unistyles for styling                                                      |
| `--stylesheet`       | Use StyleSheet for styling, used by default                                    |
| `--tamagui`          | Use Tamagui for styling                                                        |
| `--restyle`          | Use Restyle for styling                                                        |
| `--stylesheet`       | Use StyleSheet for styling, used by default                                    |
| `--i18next`          | Use i18next for internationalization                                           |
| `-i`, `--ignite`     | Initialize an opinionated starter using Infinite Red's Ignite                  |
