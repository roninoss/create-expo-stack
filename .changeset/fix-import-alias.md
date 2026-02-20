---
'create-expo-stack': patch
'rn-new': patch
---

Fix import alias mismatch in expo-router and Nativewind UI tabs/drawer templates by replacing `~/` with `@/` to match the generated tsconfig path alias.
