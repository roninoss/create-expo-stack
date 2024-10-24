---
title: Installation
description: Installation instructions for rn.new
---

To scaffold an app using `rn-new`, run any of the following commands and answer the command prompt questions:

### npm

```bash
npx rn-new
```

### yarn

```bash
yarn dlx rn-new
```

### pnpm

```bash
pnpm dlx rn-new
```

### bun

```bash
bunx rn-new
```

After your app has been initialized, be sure to follow any instructions outputed by the CLI. Additionally, please take note of the output project configuration as you can run the command highlighted to speed up your next project's initialization, using rn.new's non-interactive mode. Furthermore, the output should be provided in any issue you open for rn.new.

### Example

The following would scaffold an rn.new app with Expo Router, NativeWind, and Bun:

### npm

```bash
npx rn-new --expo-router --nativewind --bun
```

### bun

```bash
bunx rn-new myapp --expo-router --nativewind --bun
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
| `--vexo-analytics`   | Use Vexo Analytics for analytics, initial configuration only                   |
| `--nativewind`       | Use Nativewind for styling                                                     |
| `--unistyles`        | Use Unistyles for styling                                                      |
| `--tamagui`          | Use Tamagui for styling                                                        |
| `--restyle`          | Use Restyle for styling                                                        |
| `--stylesheet`       | Use StyleSheet for styling, used by default                                    |
| `--i18next`          | Use i18next for internationalization                                           |
| `-i`, `--ignite`     | Initialize an opinionated starter using Infinite Red's Ignite                  |
