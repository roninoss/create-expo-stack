---
'create-expo-stack': patch
'rn-new': patch
---

- Fix language detection crash on Expo Web (fixes #460) by using safe optional chaining in `languageDetector.ts.ejs`.
- Fix package.json scripts for NativewindUI and Unistyles to use `expo run:ios` / `expo run:android` and `expo start --dev-client` instead of launching Expo Go.
- Fix typo `nativewinui` -> `nativewindui` across 4 template layout files to ensure `expo-dev-client` and `global.css` are properly imported.
- Add clear CLI notice when custom native packages (NativewindUI / Unistyles) are selected indicating they require a development build.
