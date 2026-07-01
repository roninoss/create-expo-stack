---
'create-expo-stack': patch
'rn-new': patch
---

Fix generated NativewindUI templates against the Expo Router v6 / SDK 56 template shape.

- Migrate NativewindUI template imports (`ThemeProvider`, `useNavigation`, `useHeaderHeight`, theme types) from `@react-navigation/*` to the `expo-router/react-navigation` surface.
- Add a shared `useHeaderSearchBar` helper and use it across the stack, tabs, and drawer NativewindUI screens instead of duplicating the hook inline.
- Clean up the stack, tabs, and drawer routes/layouts: drop the removed `useInitialAndroidBarSync` call, source `Icon`/`ThemeToggle` from the generated NativewindUI paths, and use valid SF Symbol icon names.
- Update the generated DatePicker usage to the current `onValueChange` listener and patch the generated Android DatePicker source accordingly, plus guard the generated Picker's Android-only dropdown props behind a `Platform.OS === 'android'` check for web.
- Remove the deprecated `estimatedItemSize` prop from FlashList and simplify the progress-indicator interval effect.
- Warn during development when a generated NativewindUI patch cannot be applied because the source no longer matches the expected shape.
