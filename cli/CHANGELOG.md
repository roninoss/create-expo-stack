# create-expo-stack

## 2.7.3

### Patch Changes

- [`28ec60d87d7ec53874008664c08e4d097861e9e3`](https://github.com/danstepanov/create-expo-stack/commit/28ec60d87d7ec53874008664c08e4d097861e9e3) Thanks [@danstepanov](https://github.com/danstepanov)! - add tilda in place of dot for global css file

## 2.7.2

### Patch Changes

- [`faa407c86751ffdbc35d58467b4a6176ec857c3b`](https://github.com/danstepanov/create-expo-stack/commit/faa407c86751ffdbc35d58467b4a6176ec857c3b) Thanks [@danstepanov](https://github.com/danstepanov)! - replace nativewind-ui folder with nativewindui folder

## 2.7.1

### Patch Changes

- [#271](https://github.com/danstepanov/create-expo-stack/pull/271) [`7228e17dddfed93c14207a425b11f31086c897ee`](https://github.com/danstepanov/create-expo-stack/commit/7228e17dddfed93c14207a425b11f31086c897ee) Thanks [@dannyhw](https://github.com/dannyhw)! - Auto update expo and related packages

## 2.7.0

### Minor Changes

- [`e4d108e7c25f1badca2f25a3b37fcbf451f9a4ad`](https://github.com/danstepanov/create-expo-stack/commit/e4d108e7c25f1badca2f25a3b37fcbf451f9a4ad) Thanks [@danstepanov](https://github.com/danstepanov)! - add base version of nativewindui, to be used for integrating the free components

### Patch Changes

- [`d1a265f2d90825d4ed87907628fa71e5c4bdba06`](https://github.com/danstepanov/create-expo-stack/commit/d1a265f2d90825d4ed87907628fa71e5c4bdba06) Thanks [@danstepanov](https://github.com/danstepanov)! - update index in nativewindui

## 2.6.5

### Patch Changes

- [#248](https://github.com/danstepanov/create-expo-stack/pull/248) [`0118d1b989378168c20f58ebf532a153c87a8f98`](https://github.com/danstepanov/create-expo-stack/commit/0118d1b989378168c20f58ebf532a153c87a8f98) Thanks [@YounessHassoune](https://github.com/YounessHassoune)! - update the app.json EJS template to ensure that duplicate 'plugin' keys are avoided in the final app.json file.

## 2.6.4

### Patch Changes

- [`fe4a03a`](https://github.com/danstepanov/create-expo-stack/commit/fe4a03a47245e53a5c9eb5906a236d3b0258c467) Thanks [@danstepanov](https://github.com/danstepanov)! - add missing Text for tamagui template

## 2.6.3

### Patch Changes

- [`1042dae`](https://github.com/danstepanov/create-expo-stack/commit/1042dae7090e44ce778fd66e96854e2a260edae1) Thanks [@danstepanov](https://github.com/danstepanov)! - remove unused React

## 2.6.2

### Patch Changes

- [`7c1a2ce`](https://github.com/danstepanov/create-expo-stack/commit/7c1a2cec9d11b2d42386b5dc3124b1f3e8078498) Thanks [@danstepanov](https://github.com/danstepanov)! - add forwardRef to Linked components, fix #239

- [`71ce545`](https://github.com/danstepanov/create-expo-stack/commit/71ce545212abea93aac4a1200cd0664e3eea3e2e) Thanks [@danstepanov](https://github.com/danstepanov)! - replace View with SafeAreaView for Container component

## 2.6.1

### Patch Changes

- [#236](https://github.com/danstepanov/create-expo-stack/pull/236) [`bc891da`](https://github.com/danstepanov/create-expo-stack/commit/bc891da7673bccaa2362ae2784cae61bf0efc499) Thanks [@sammoore](https://github.com/sammoore)! - fix npm >= v7 installation due to strict peer dependency requirements of @react-native-async-storage/async-storage to react-native

## 2.6.0

### Minor Changes

- [`0e95d96`](https://github.com/danstepanov/create-expo-stack/commit/0e95d968be41cafb99d09ee1b1ceca4a31838a7f) Thanks [@danstepanov](https://github.com/danstepanov)! - add clack to dependencies for cli

## 2.5.2

### Patch Changes

- [`097a6eb`](https://github.com/danstepanov/create-expo-stack/commit/097a6ebeba280fa7891678e96fbfd4671f89dcd8) Thanks [@danstepanov](https://github.com/danstepanov)! - add clack to dependencies for cli

## 2.5.1

### Patch Changes

- [#231](https://github.com/danstepanov/create-expo-stack/pull/231) [`9becc72`](https://github.com/danstepanov/create-expo-stack/commit/9becc7271522755d93a97cf1af0cd176f59ec2c0) Thanks [@danstepanov](https://github.com/danstepanov)! - overhaul cli prompts via clack

## 2.5.0

### Minor Changes

- [#201](https://github.com/danstepanov/create-expo-stack/pull/201) [`738ca1b`](https://github.com/danstepanov/create-expo-stack/commit/738ca1b903392762d8fb5c872a300654d8582ba5) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - i18next for internationalization

- [#215](https://github.com/danstepanov/create-expo-stack/pull/215) [`1995ea9`](https://github.com/danstepanov/create-expo-stack/commit/1995ea9a924e123833b64775bd97e6bf52439d3d) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - Refactor the whole folder structure to reduce ejs complexity

### Patch Changes

- [#227](https://github.com/danstepanov/create-expo-stack/pull/227) [`142847d`](https://github.com/danstepanov/create-expo-stack/commit/142847d1eedbb93f47eb3dbc1f710f72fe362f1c) Thanks [@danstepanov](https://github.com/danstepanov)! - validate user is using bun version v1.0.14 if they are using bun, clean up package manager detection logic, add function to fetch package manager version

- [#227](https://github.com/danstepanov/create-expo-stack/pull/227) [`94bec4c`](https://github.com/danstepanov/create-expo-stack/commit/94bec4c0b8e4c556806909b6013491d130ee7860) Thanks [@danstepanov](https://github.com/danstepanov)! - Fix formatting of generated project when using --no-install with options that result in prettier plugins needing to be installed

- [#227](https://github.com/danstepanov/create-expo-stack/pull/227) [`5910188`](https://github.com/danstepanov/create-expo-stack/commit/5910188c60fec084690c6a18efaa191cf0ee2549) Thanks [@danstepanov](https://github.com/danstepanov)! - bump react-native to 73.6 for expo sdk 50

- [`cfc261a`](https://github.com/danstepanov/create-expo-stack/commit/cfc261a737f0545cc40caf03bfa5a1466be013ab) Thanks [@danstepanov](https://github.com/danstepanov)! - automatically update the contributor list in the README

- [`a2fe5b8`](https://github.com/danstepanov/create-expo-stack/commit/a2fe5b845fdc688f2c3d883d6e49f71cb2d0297e) Thanks [@danstepanov](https://github.com/danstepanov)! - add check for dir being present in file path with shared project name, enhances input validation for cli

- [`3ba0544`](https://github.com/danstepanov/create-expo-stack/commit/3ba0544cc9fc2cfc76f66015591e98c7cc5690ef) Thanks [@danstepanov](https://github.com/danstepanov)! - remove project files on throw, fix project name validation

## 2.4.3

### Patch Changes

- [#208](https://github.com/danstepanov/create-expo-stack/pull/208) [`e841ea5`](https://github.com/danstepanov/create-expo-stack/commit/e841ea519620294dd233d5bafea15dbfc013aff0) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - Bump react-native to 0.73.4

- [#207](https://github.com/danstepanov/create-expo-stack/pull/207) [`3287a3c`](https://github.com/danstepanov/create-expo-stack/commit/3287a3c7c99eafeb55938be9570e532368af22f5) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - update the gitignore file

## 2.4.2

### Patch Changes

- [`1b0be18`](https://github.com/danstepanov/create-expo-stack/commit/1b0be18f7b7982be5c115364059ae6dd792dde98) Thanks [@danstepanov](https://github.com/danstepanov)! - bump to expo 50.0.5

- [`bc25b99`](https://github.com/danstepanov/create-expo-stack/commit/bc25b9951f22543e77a2c98f1e220448c8fc0cbc) Thanks [@danstepanov](https://github.com/danstepanov)! - fix tamagui navigation templates missing imports for unmatched route

- [#195](https://github.com/danstepanov/create-expo-stack/pull/195) [`ed2e92f`](https://github.com/danstepanov/create-expo-stack/commit/ed2e92fb3f7a670845a775aab7c534205cf6560a) Thanks [@frankcalise](https://github.com/frankcalise)! - Ignite project names accept kebab case, forced PascalCase conversion has been removed

## 2.4.1

### Patch Changes

- [`9242c21`](https://github.com/danstepanov/create-expo-stack/commit/9242c210f8c76e96ee9aadf4883f04dd2b88fdc5) Thanks [@danstepanov](https://github.com/danstepanov)! - add EditScreenInfo to drawer + tabs templates

## 2.4.0

### Minor Changes

- [#193](https://github.com/danstepanov/create-expo-stack/pull/193) [`50650ac`](https://github.com/danstepanov/create-expo-stack/commit/50650aceffc31b89ceced2f7866f51f4a2561846) Thanks [@frankcalise](https://github.com/frankcalise)! - Expo SDK 50, expo-router v3, NativeWind v4

- [#189](https://github.com/danstepanov/create-expo-stack/pull/189) [`8681c0a`](https://github.com/danstepanov/create-expo-stack/commit/8681c0a8a0d691d0c301ef677e10b1cfc0dffa43) Thanks [@coyksdev](https://github.com/coyksdev)! - Setup Unistyles theme

- [#167](https://github.com/danstepanov/create-expo-stack/pull/167) [`17776d2`](https://github.com/danstepanov/create-expo-stack/commit/17776d28db240164694088dbdc17520cfe6894cd) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - Add restyle as styling option

- [#181](https://github.com/danstepanov/create-expo-stack/pull/181) [`a38e81a`](https://github.com/danstepanov/create-expo-stack/commit/a38e81aca2ec891e5baf31953a908b433efecb51) Thanks [@coyksdev](https://github.com/coyksdev)! - Added react-native-unistyles template

### Patch Changes

- [#192](https://github.com/danstepanov/create-expo-stack/pull/192) [`507532b`](https://github.com/danstepanov/create-expo-stack/commit/507532b0f5ad2947427b810c064606e4fa7de28b) Thanks [@asapMaki](https://github.com/asapMaki)! - Drawer+Tabs react navigation optio: Fix typescript

- [#159](https://github.com/danstepanov/create-expo-stack/pull/159) [`2c00bdf`](https://github.com/danstepanov/create-expo-stack/commit/2c00bdfe7635c765ddf949d6db3260f9a96c190a) Thanks [@asapMaki](https://github.com/asapMaki)! - replace drawer templates with drawer+tabs templates

## 2.3.15

### Patch Changes

- [#178](https://github.com/danstepanov/create-expo-stack/pull/178) [`3061323`](https://github.com/danstepanov/create-expo-stack/commit/306132315c87114924735fda53b359a729acafb8) Thanks [@finnbayer](https://github.com/finnbayer)! - added resolution/override for expo-modules-core to expo-router template

## 2.3.14

### Patch Changes

- [`91249e0`](https://github.com/danstepanov/create-expo-stack/commit/91249e0f303495436588107f5bdc2ec276832bd8) Thanks [@danstepanov](https://github.com/danstepanov)! - allow proper setting of import alias

## 2.3.13

### Patch Changes

- [`ae59661`](https://github.com/danstepanov/create-expo-stack/commit/ae596617a1290f83c27cab7c723fe003f26aca97) Thanks [@danstepanov](https://github.com/danstepanov)! - add missing brackets to unmatched route file for expo router

## 2.3.12

### Patch Changes

- [`5199dce`](https://github.com/danstepanov/create-expo-stack/commit/5199dce7f159f9d03081fae48f15ea72e8818864) Thanks [@danstepanov](https://github.com/danstepanov)! - rename app.d.ts to app-env.d.ts to ensure that nativewind className property is supported per instruction from Mark Lawlor

- [`f29a265`](https://github.com/danstepanov/create-expo-stack/commit/f29a265f697636ea57bed092bed10f59d5792667) Thanks [@danstepanov](https://github.com/danstepanov)! - add missing route and html file for expo router templates

- [`49550e7`](https://github.com/danstepanov/create-expo-stack/commit/49550e7026a1b87ddb00bf94aada6047dcd509d7) Thanks [@gwenoleR](https://github.com/gwenoleR)! - Tamagui : Change Text to `SizableText` and `H1` on Tamagui config to apply default style

  Tamagui - Expo Router : Load font on \_layout to apply them on all app

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
