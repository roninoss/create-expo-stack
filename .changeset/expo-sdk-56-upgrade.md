---
'create-expo-stack': minor
'rn-new': minor
---

Upgrade generated templates to Expo SDK 56 and harden the CLI tooling.

- Upgrade generated app dependencies to Expo SDK 56, React 19.2, React Native 0.85, Expo Router 6, React Navigation 7, Reanimated 4, and related Expo packages.
- Switch generated `app.json` splash configuration to the `expo-splash-screen` plugin, add a generated `css-env.d.ts` so TypeScript accepts CSS imports, and update generated `tsconfig.json` output for TypeScript 6 behavior.
- Derive Expo-safe `slug` and `scheme` from the project name via new `toExpoSlug` and `toExpoScheme` helpers, while preserving the display name the user entered.
- Raise the minimum Node version gate to 20.19.4 and clarify the error message branding.
- Remove remaining Restyle and Tamagui residue from templates, docs, and public assets.
- Guard `vexo()` initialization in the base, Expo Router, and React Navigation templates when no API key is present.
- Make the CLI test harness and generation tooling Windows safe, including cwd/env handling and shell quoting in system commands, and refresh integration snapshots to match the SDK 56 scaffold output.
