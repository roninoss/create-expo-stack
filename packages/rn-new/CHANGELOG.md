# rn-new

## 2.21.2

### Patch Changes

- cd7064e: Use p-safe without offset and add white background to Nativewind Container component.
- Updated dependencies [cd7064e]
  - create-expo-stack@2.21.2

## 2.21.1

### Patch Changes

- dc9748c: Fix import alias mismatch in expo-router and Nativewind UI tabs/drawer templates by replacing `~/` with `@/` to match the generated tsconfig path alias.
- Updated dependencies [dc9748c]
  - create-expo-stack@2.21.1

## 2.21.0

### Minor Changes

- 60fe131: Update Nativewind templates to follow v4 best practices: replace SafeAreaView with safe area utility classes, add SafeAreaProvider at app root, fix className concatenation bug, use interface + React.FC typing, and remove unused Container component from no-navigation projects. Re-enable react-navigation test coverage for stack, tabs, and drawer+tabs across all styling packages.

### Patch Changes

- Updated dependencies [60fe131]
  - create-expo-stack@2.21.0

## 2.20.2

### Patch Changes

- Updated dependencies [674e22c]
  - create-expo-stack@2.20.2

## 2.20.1

### Patch Changes

- a722655: fix(build): add @types/node to resolve TypeScript compilation errors
- a6dbb07: fix(cli): replace fs-jetpack type import with local definition
- 48f80cc: set nativewind to latest rather than v4.1
- Updated dependencies [a722655]
- Updated dependencies [a6dbb07]
- Updated dependencies [48f80cc]
  - create-expo-stack@2.20.1

## 2.20.0

### Minor Changes

- 0e9d284: update nativewindui templates to support sdk 54
- 13cc470: remove restyle and tamagui
- f093546: add expo sdk 54 support for nativewind v4.1.21, nativewindui, and blank stack templates

### Patch Changes

- 07f6ace: add expo router support for stack templates using expo sdk 54
- c149667: update test snapshots after removing tamagui and restyle
- Updated dependencies [07f6ace]
- Updated dependencies [c149667]
- Updated dependencies [0e9d284]
- Updated dependencies [13cc470]
- Updated dependencies [f093546]
  - create-expo-stack@2.20.0

## 2.19.1

### Patch Changes

- 18ea758: random change for the version bump
- Updated dependencies [18ea758]
  - create-expo-stack@2.19.1

## 2.19.0

### Minor Changes

- 8f5726d: update stack templates to work with nwui-cli 0.5.5, ensure blank nativewind v4.1 template works, ensure blank nativewindui template works, ensure all components nativewindui template works, change all instance of NativeWind to Nativewind and NativewindUI

### Patch Changes

- 3541ab4: update tests to only test nativewind and nativewindui stack templates
- d6fc7f8: temporarily disable tab and drawer templates
- Updated dependencies [8f5726d]
- Updated dependencies [3541ab4]
- Updated dependencies [d6fc7f8]
  - create-expo-stack@2.19.0

## 2.18.11

### Patch Changes

- 86a446b: fix: actually fix types for authentication selection
- 0154a06: fix: resolve TypeScript error in authentication select options
- 13f2a69: fix: types for authentication selection
- 0154a06: feat: add React import and white background to ScreenContent templates
- Updated dependencies [86a446b]
- Updated dependencies [30ac5c4]
- Updated dependencies [0154a06]
- Updated dependencies [13f2a69]
- Updated dependencies [0154a06]
  - create-expo-stack@2.18.11

## 2.18.10

### Patch Changes

- 4e1352e: fix for extra comma
- Updated dependencies [4e1352e]
  - create-expo-stack@2.18.10

## 2.18.9

### Patch Changes

- fa77014: fixes for yarn project generations
- Updated dependencies [fa77014]
  - create-expo-stack@2.18.9

## 2.18.8

### Patch Changes

- 3490940: Make sure we install expo 53 until we are ready for 54
- Updated dependencies [3490940]
  - create-expo-stack@2.18.8

## 2.18.7

### Patch Changes

- 3518843: chore: update snapshot to reflect use of jsonc ces config 2
- 144e9eb: chore: update snapshot to reflect use of jsonc ces config
- Updated dependencies [3518843]
- Updated dependencies [144e9eb]
  - create-expo-stack@2.18.7

## 2.18.6

### Patch Changes

- 1dd14ce: chore: useless change for deploy changeset
- ea34f2b: Updates react navigation templates to use static configuration
- Updated dependencies [1dd14ce]
- Updated dependencies [ea34f2b]
  - create-expo-stack@2.18.6

## 2.18.5

### Patch Changes

- 121618b: chore: change cesconfig.json to cesconfig.jsonc
- Updated dependencies [121618b]
  - create-expo-stack@2.18.5

## 2.18.4

### Patch Changes

- 76f79ae: chore: add comment to cesconfig.json to indicate it is an optional file for debugging purposes
- Updated dependencies [76f79ae]
  - create-expo-stack@2.18.4

## 2.18.3

### Patch Changes

- cf24de5: chore: bump number of projects created with rn-new
- Updated dependencies [cf24de5]
  - create-expo-stack@2.18.3

## 2.18.2

### Patch Changes

- 4d5bd5d: fix: remove unused code, replace code causing format script to fail
- Updated dependencies [4d5bd5d]
  - create-expo-stack@2.18.2

## 2.18.1

### Patch Changes

- 09536bd: Update eslint config to eslint 9 and newer expo config package
- Updated dependencies [09536bd]
  - create-expo-stack@2.18.1

## 2.18.0

### Patch Changes

- Updated dependencies [81c6bef]
  - create-expo-stack@2.18.0

## 2.16.0

### Minor Changes

- 0c3702b: chore: update Expo to 53.0.6 and React Native to 0.79.2

### Patch Changes

- 6a4697a: fixes for peer deps when using npm
- Updated dependencies [0c3702b]
- Updated dependencies [6a4697a]
  - create-expo-stack@2.16.0

## 2.15.0

### Minor Changes

- 235d6e5: fix: update to expo 53

### Patch Changes

- Updated dependencies [235d6e5]
  - create-expo-stack@2.15.0

## 2.14.3

### Patch Changes

- 20f0cf7: suppress nativewindui logs
- Updated dependencies [20f0cf7]
  - create-expo-stack@2.14.3

## 2.14.2

### Patch Changes

- 8d06aaf: replace all uses of FlashList with LegendList
- Updated dependencies [8d06aaf]
  - create-expo-stack@2.14.2

## 2.14.1

### Patch Changes

- 1ba9008: prompt user whether they want to publish public or private repo"
- Updated dependencies [1ba9008]
  - create-expo-stack@2.14.1

## 2.14.0

### Minor Changes

- 1c5e187: pass flags to rn-new

### Patch Changes

- Updated dependencies [1c5e187]
  - create-expo-stack@2.14.0

## 2.13.6

### Patch Changes

- 4d46e00: add README to rn-new, update sponsorship link
- Updated dependencies [4d46e00]
  - create-expo-stack@2.13.6

## 2.13.5

### Patch Changes

- a8e8d14: ensure publish script creates a repo
- Updated dependencies [a8e8d14]
  - create-expo-stack@2.13.5

## 2.13.4

### Patch Changes

- f60a24c: change wording on the website use rn-new
- 63b5423: conditionally show create-expo-stack vs rn-new
- fbf11af: fix typo
- Updated dependencies [f60a24c]
- Updated dependencies [63b5423]
- Updated dependencies [fbf11af]
  - create-expo-stack@2.13.4

## 2.13.3

### Patch Changes

- 4e63aeb: update tests
- 3bea7bc: update snapshots
- Updated dependencies [4e63aeb]
- Updated dependencies [3bea7bc]
  - create-expo-stack@2.13.3

## 2.13.2

### Patch Changes

- 5eb8603: feat: add app.json validation for publish flag
- 71cb09f: add publish to flags
- 3b6a9d9: update tests
- Updated dependencies [5eb8603]
- Updated dependencies [71cb09f]
- Updated dependencies [3b6a9d9]
  - create-expo-stack@2.13.2

## 2.13.1

### Patch Changes

- 5896d7e: add line at the end of CES run telling people about publish flag
- Updated dependencies [5896d7e]
  - create-expo-stack@2.13.1
