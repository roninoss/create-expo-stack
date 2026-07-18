---
'create-expo-stack': minor
'rn-new': minor
---

Upgrade generated templates to Expo SDK 57 and align the CLI with the new Expo release.

- Upgrade generated app dependencies to Expo SDK 57, React Native 0.86, Expo Router 57, and the SDK 57-compatible Expo and Software Mansion packages.
- Remove the generated `newArchEnabled` config from `app.json` now that New Architecture is the default.
- Update the printed prebuild guidance to match SDK 57 behavior, where `expo prebuild` cleans by default.
- Bump the repo and CLI Expo dependencies to SDK 57-compatible versions.
