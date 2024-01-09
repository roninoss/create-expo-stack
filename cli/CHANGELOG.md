# create-expo-stack

## 2.3.11

### Patch Changes

- [`8729fc3`](https://github.com/danstepanov/create-expo-stack/commit/8729fc320b1c7cf7eca89ff5f6523bef4c5299cd) Thanks [@danstepanov](https://github.com/danstepanov)! - remove experimental flag from expo router

- [`8729fc3`](https://github.com/danstepanov/create-expo-stack/commit/8729fc320b1c7cf7eca89ff5f6523bef4c5299cd) Thanks [@danstepanov](https://github.com/danstepanov)! - move stack screen option configuration to screen level rather than parent layout level

## 2.3.10

### Patch Changes

- [`0587729`](https://github.com/danstepanov/create-expo-stack/commit/0587729836efae3e1713cfb610cd473a6bf0fbf7) Thanks [@danstepanov](https://github.com/danstepanov)! - support kebab case for cli flags such as --no-install and --no-git, migrate tests to use kebab case, expand test coverage to ensure flags are working properly

## 2.3.9

### Patch Changes

- [#145](https://github.com/danstepanov/create-expo-stack/pull/145) [`f7cfd23`](https://github.com/danstepanov/create-expo-stack/commit/f7cfd23ca97172e855a32b60b65816563ce2568f) Thanks [@frankcalise](https://github.com/frankcalise)! - Fixes hot refresh when using yarn with expo-router

## 2.3.8

### Patch Changes

- [#129](https://github.com/danstepanov/create-expo-stack/pull/129) [`278eefc`](https://github.com/danstepanov/create-expo-stack/commit/278eefc65ab964f69f5a9cd65d7f4c357df706b2) Thanks [@sammoore](https://github.com/sammoore)! - refactor(commands): get projectName before branching off into CLI

- [#140](https://github.com/danstepanov/create-expo-stack/pull/140) [`283dab2`](https://github.com/danstepanov/create-expo-stack/commit/283dab2aec8274606e1965b2effed6d1e2873113) Thanks [@sammoore](https://github.com/sammoore)! - feat: add --overwrite flag to ignore an existing directory

- [#139](https://github.com/danstepanov/create-expo-stack/pull/139) [`88fd2be`](https://github.com/danstepanov/create-expo-stack/commit/88fd2be29c78c0066e0c5bfa2905b08e4875cde2) Thanks [@sammoore](https://github.com/sammoore)! - fix: prompt/interaction causes immediate failure/exit after existsAsync check

- [#141](https://github.com/danstepanov/create-expo-stack/pull/141) [`667abf1`](https://github.com/danstepanov/create-expo-stack/commit/667abf12741aa55ca450acf3ec86544965a9244d) Thanks [@sammoore](https://github.com/sammoore)! - fix: successfully exit interactive CLI when user cancels/exits with interrupt

- [#139](https://github.com/danstepanov/create-expo-stack/pull/139) [`0728ea9`](https://github.com/danstepanov/create-expo-stack/commit/0728ea969e271456a5e8999432717e2e4aeaf78b) Thanks [@sammoore](https://github.com/sammoore)! - fix: do not ask to remove existing directory when non-interactive

- [#137](https://github.com/danstepanov/create-expo-stack/pull/137) [`1ba99e8`](https://github.com/danstepanov/create-expo-stack/commit/1ba99e8c5fbad5ba0154fd063b703b6ba90ddc73) Thanks [@sammoore](https://github.com/sammoore)! - feat: re-throw error on exit to indicate execution failure, show error diagnostics

## 2.3.7

### Patch Changes

- [#133](https://github.com/danstepanov/create-expo-stack/pull/133) [`263009a`](https://github.com/danstepanov/create-expo-stack/commit/263009a0898de9fbb0215c3c9e92b9496647218d) Thanks [@finnbayer](https://github.com/finnbayer)! - added .env to .gitignore when firebase or supabase is used

- [`3a8c3a9`](https://github.com/danstepanov/create-expo-stack/commit/3a8c3a98a73ecd906af01480c94f7702dda5d506) Thanks [@danstepanov](https://github.com/danstepanov)! - check if pwd already contains folder with set project name, offer to delete if so

- [#130](https://github.com/danstepanov/create-expo-stack/pull/130) [`6bb80a7`](https://github.com/danstepanov/create-expo-stack/commit/6bb80a768c560c80f94d17b2ff3d839edf7f985e) Thanks [@finnbayer](https://github.com/finnbayer)! - changed metro.config.js to ejs to take expo-router into account

- [#132](https://github.com/danstepanov/create-expo-stack/pull/132) [`9335094`](https://github.com/danstepanov/create-expo-stack/commit/93350940659ea144838ae8bbbffda07726edda70) Thanks [@finnbayer](https://github.com/finnbayer)! - moved the addition of the project name to the target to the end to avoid incorrect replacements

## 2.3.6

### Patch Changes

- [#120](https://github.com/danstepanov/create-expo-stack/pull/120) [`dc14b3d`](https://github.com/danstepanov/create-expo-stack/commit/dc14b3d3d0f611b4c0493782b9e98f60aed983e4) Thanks [@gialencar](https://github.com/gialencar)! - Fix mismatching RootStackParamList type definition for DrawerNavigator

## 2.3.5

### Patch Changes

- [#116](https://github.com/danstepanov/create-expo-stack/pull/116) [`00e8846`](https://github.com/danstepanov/create-expo-stack/commit/00e884666ca682c0d9a4ad3dc816588dc494c3db) Thanks [@danstepanov](https://github.com/danstepanov)! - only show package manager of choice if user selected one, for non-interactive mode

- [#116](https://github.com/danstepanov/create-expo-stack/pull/116) [`1e24623`](https://github.com/danstepanov/create-expo-stack/commit/1e2462324775c5e3132b76de41305085726716ff) Thanks [@danstepanov](https://github.com/danstepanov)! - address package manager undefined issues

## 2.3.4

### Patch Changes

- [#114](https://github.com/danstepanov/create-expo-stack/pull/114) [`8bf2016`](https://github.com/danstepanov/create-expo-stack/commit/8bf2016e9758dc26bfc004eada03a6120ac6be41) Thanks [@danstepanov](https://github.com/danstepanov)! - only show package manager of choice if user selected one, for non-interactive mode

- [#114](https://github.com/danstepanov/create-expo-stack/pull/114) [`2be9ec7`](https://github.com/danstepanov/create-expo-stack/commit/2be9ec7b16d6460d550fc1a2c39272bd3267b202) Thanks [@danstepanov](https://github.com/danstepanov)! - address package manager undefined issues

## 2.3.3

### Patch Changes

- [`49df44d`](https://github.com/danstepanov/create-expo-stack/commit/49df44d8b9fe067d684e6eca96258af41e0fa881) Thanks [@danstepanov](https://github.com/danstepanov)! - ensure installation uses the desired packageManager

## 2.3.2

### Patch Changes

- [`93015ea`](https://github.com/danstepanov/create-expo-stack/commit/93015eaad5c608683f77cf24445757d1f426e6f9) Thanks [@danstepanov](https://github.com/danstepanov)! - add package manager prompt to CLI

## 2.3.1

### Patch Changes

- [`cda57ac`](https://github.com/danstepanov/create-expo-stack/commit/cda57ac663a390648b4f20f5a77113e99a07e39c) Thanks [@danstepanov](https://github.com/danstepanov)! - set default boolean values for cli flags, add stylesheet as default styling package if no styling package is passed in to non-interactive mode

## 2.3.0

### Minor Changes

- [#80](https://github.com/danstepanov/create-expo-stack/pull/80) [`001fff8`](https://github.com/danstepanov/create-expo-stack/commit/001fff8f501cd0b0aa557da607f481f9b4320eec) Thanks [@frankcalise](https://github.com/frankcalise)! - Adds `--importAlias` to enable TS path aliases

### Patch Changes

- [#83](https://github.com/danstepanov/create-expo-stack/pull/83) [`fb044c8`](https://github.com/danstepanov/create-expo-stack/commit/fb044c810fdd91efb4dde52e787e1f2434d43509) Thanks [@sammoore](https://github.com/sammoore)! - Support a wider variety of shells in generated package.json run-scripts by using double-quotes around glob arguments. Courtesy of Gaurav Bhandari (@kratos-respawned)

## 2.2.15

### Patch Changes

- [#77](https://github.com/danstepanov/create-expo-stack/pull/77) [`29c81ce`](https://github.com/danstepanov/create-expo-stack/commit/29c81ce83c7eec42945930b7c7e140f6f03d7646) Thanks [@frankcalise](https://github.com/frankcalise)! - Removed duplicate import during expo-router tabs configuration

- [#75](https://github.com/danstepanov/create-expo-stack/pull/75) [`5d2ae5c`](https://github.com/danstepanov/create-expo-stack/commit/5d2ae5c7b29fc008f465e5c9282fa90dfa0cb4fe) Thanks [@sammoore](https://github.com/sammoore)! - Remove DOM typescript lib from cli/tsconfig.json

- [#75](https://github.com/danstepanov/create-expo-stack/pull/75) [`8e90e59`](https://github.com/danstepanov/create-expo-stack/commit/8e90e59be41f06d4f9a98e9380cb796814530967) Thanks [@sammoore](https://github.com/sammoore)! - Update bun/bun-types to 1.0.14

- [#74](https://github.com/danstepanov/create-expo-stack/pull/74) [`188107a`](https://github.com/danstepanov/create-expo-stack/commit/188107a7edc91516a1ad07489576ac9d067fc1d4) Thanks [@sammoore](https://github.com/sammoore)! - fix .changeset/config.json ignore to refer to (valid) non-cli subprojects

## 2.2.14

### Patch Changes

- [`026b97e`](https://github.com/danstepanov/create-expo-stack/commit/026b97ee02f370ee1ee10dad9877b540a3c623d7) Thanks [@danstepanov](https://github.com/danstepanov)! - - symlink README

  - add shortlink for discord
  - update contributors
  - add header labels and descriptor to README
  - fix styling package issues

- [`90df237`](https://github.com/danstepanov/create-expo-stack/commit/90df237e8a53696229e70afebf7d1107e51582cc) Thanks [@danstepanov](https://github.com/danstepanov)! - remove superfluous EJS end brackets

- [`b9e4d0a`](https://github.com/danstepanov/create-expo-stack/commit/b9e4d0a279aa0697468344fbe443b024aaba04f4) Thanks [@danstepanov](https://github.com/danstepanov)! - remove frozen lockfile from beta release channel

- [`4f73965`](https://github.com/danstepanov/create-expo-stack/commit/4f73965d834e38b0fba22040171fdb42312c3683) Thanks [@danstepanov](https://github.com/danstepanov)! - add changesets/changelog-github
