---
'create-expo-stack': patch
'rn-new': patch
---

Add horizontal margins to button wrapper in Nativewind templates to prevent full-width buttons.

- Add button wrapper View with `mx-4` class (16px horizontal margins) around Link/Button components in the Nativewind Expo Router stack template
- Ensures buttons have proper spacing and don't stretch to fill the entire screen width
