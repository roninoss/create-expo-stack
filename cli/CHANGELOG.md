# create-expo-stack

## 2.19.0

### Minor Changes

- 9578d52: expo54 support

### Patch Changes

- e230be0: fix: actually fix types for authentication selection
- 9e33b9c: fixes eas setup
- bd64fca: fix: resolve TypeScript error in authentication select options
- 5dbc6f2: fix: types for authentication selection
- bd64fca: feat: add React import and white background to ScreenContent templates

## 2.18.10

### Patch Changes

- 4e1352e: fix for extra comma

## 2.18.9

### Patch Changes

- fa77014: fixes for yarn project generations

## 2.18.8

### Patch Changes

- 3490940: Make sure we install expo 53 until we are ready for 54

## 2.18.7

### Patch Changes

- 3518843: chore: update snapshot to reflect use of jsonc ces config 2
- 144e9eb: chore: update snapshot to reflect use of jsonc ces config

## 2.18.6

### Patch Changes

- 1dd14ce: chore: useless change for deploy changeset
- ea34f2b: Updates react navigation templates to use static configuration

## 2.18.5

### Patch Changes

- 121618b: chore: change cesconfig.json to cesconfig.jsonc

## 2.18.4

### Patch Changes

- 76f79ae: chore: add comment to cesconfig.json to indicate it is an optional file for debugging purposes

## 2.18.3

### Patch Changes

- cf24de5: chore: bump number of projects created with rn-new

## 2.18.2

### Patch Changes

- 4d5bd5d: fix: remove unused code, replace code causing format script to fail

## 2.18.1

### Patch Changes

- 09536bd: Update eslint config to eslint 9 and newer expo config package

## 2.18.0

### Minor Changes

- 81c6bef: enforce using a version of node.js that supports requiring ESM modules for the latest version of nwui-cli

## 2.16.0

### Minor Changes

- 0c3702b: chore: update Expo to 53.0.6 and React Native to 0.79.2

### Patch Changes

- 6a4697a: fixes for peer deps when using npm

## 2.15.0

### Minor Changes

- 235d6e5: fix: update to expo 53

## 2.14.3

### Patch Changes

- 20f0cf7: suppress nativewindui logs

## 2.14.2

### Patch Changes

- 8d06aaf: replace all uses of FlashList with LegendList

## 2.14.1

### Patch Changes

- 1ba9008: prompt user whether they want to publish public or private repo"

## 2.14.0

### Minor Changes

- 1c5e187: pass flags to rn-new

## 2.13.6

### Patch Changes

- 4d46e00: add README to rn-new, update sponsorship link

## 2.13.5

### Patch Changes

- a8e8d14: ensure publish script creates a repo

## 2.13.4

### Patch Changes

- f60a24c: change wording on the website use rn-new
- 63b5423: conditionally show create-expo-stack vs rn-new
- fbf11af: fix typo

## 2.13.3

### Patch Changes

- 4e63aeb: update tests
- 3bea7bc: update snapshots

## 2.13.2

### Patch Changes

- 5eb8603: feat: add app.json validation for publish flag
- 71cb09f: add publish to flags
- 3b6a9d9: update tests

## 2.13.1

### Patch Changes

- 5896d7e: add line at the end of CES run telling people about publish flag

## 2.13.0

### Minor Changes

- [#465](https://github.com/roninoss/create-expo-stack/pull/465) [`18c2a366fd42037362437c1f098f2f7fd354714f`](https://github.com/roninoss/create-expo-stack/commit/18c2a366fd42037362437c1f098f2f7fd354714f) Thanks [@danstepanov](https://github.com/danstepanov)! - add a publish command

### Patch Changes

- [#464](https://github.com/roninoss/create-expo-stack/pull/464) [`361fcd40b0801d684d2a4f6ed00c28854f218970`](https://github.com/roninoss/create-expo-stack/commit/361fcd40b0801d684d2a4f6ed00c28854f218970) Thanks [@danstepanov](https://github.com/danstepanov)! - add jsx config for TS

## 2.12.3

### Patch Changes

- [#450](https://github.com/roninoss/create-expo-stack/pull/450) [`3475224012bafa00e45aa40f674bf661386e416c`](https://github.com/roninoss/create-expo-stack/commit/3475224012bafa00e45aa40f674bf661386e416c) Thanks [@rohan-sircar](https://github.com/rohan-sircar)! - Add `darkMode: class` to tailwing.config.js to manually switch darkMode

- [#454](https://github.com/roninoss/create-expo-stack/pull/454) [`65aeca36ba6261638ca43854d7f4b380cfe6132a`](https://github.com/roninoss/create-expo-stack/commit/65aeca36ba6261638ca43854d7f4b380cfe6132a) Thanks [@dannyhw](https://github.com/dannyhw)! - Update tamagui in template to latest version

## 2.12.2

### Patch Changes

- [`c5714b60c8c51a36a90b695078a043bfd304d27e`](https://github.com/roninoss/create-expo-stack/commit/c5714b60c8c51a36a90b695078a043bfd304d27e) Thanks [@danstepanov](https://github.com/danstepanov)! - update contact info in output script

## 2.12.1

### Patch Changes

- [#435](https://github.com/roninoss/create-expo-stack/pull/435) [`6ada677a9a5f6295602fa24e6563a4262ec233d5`](https://github.com/roninoss/create-expo-stack/commit/6ada677a9a5f6295602fa24e6563a4262ec233d5) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: update expo-dev-launcher to 5.0.17 and expo-dev-client to 5.0.4

## 2.12.0

### Minor Changes

- [#280](https://github.com/roninoss/create-expo-stack/pull/280) [`08c09d915dc6f6579446913a51994eb1898ed88d`](https://github.com/roninoss/create-expo-stack/commit/08c09d915dc6f6579446913a51994eb1898ed88d) Thanks [@theblondealex](https://github.com/theblondealex)! - Added a StateManagement Question with zustand to start and potentially more to follow
  - setup with a question prompt just before the internationalization prompt
  - --zustand flag to skip the prompt
  - Adds a StateManagement folder to the project with a zustandStore.ts file to start with

### Patch Changes

- [#432](https://github.com/roninoss/create-expo-stack/pull/432) [`374aeb8fab91253d5bd9300a3a07c0d87f9562df`](https://github.com/roninoss/create-expo-stack/commit/374aeb8fab91253d5bd9300a3a07c0d87f9562df) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: compatibility with expo 52 and react navigation 7

## 2.11.25

### Patch Changes

- [#421](https://github.com/roninoss/create-expo-stack/pull/421) [`8f9d35dead9b7e2ba6a1220043fee5a2c7a6e4ea`](https://github.com/roninoss/create-expo-stack/commit/8f9d35dead9b7e2ba6a1220043fee5a2c7a6e4ea) Thanks [@Viraj-10](https://github.com/Viraj-10)! - fix: nativewind version and dependencies

## 2.11.24

### Patch Changes

- [`b5374ea3cfc9c5ce4e08bd02c7abdedfb0f69282`](https://github.com/roninoss/create-expo-stack/commit/b5374ea3cfc9c5ce4e08bd02c7abdedfb0f69282) Thanks [@danstepanov](https://github.com/danstepanov)! - fix button margin for nativewind template

## 2.11.23

### Patch Changes

- [`26777731bf744f78563444defddfe283c1d9d7ca`](https://github.com/roninoss/create-expo-stack/commit/26777731bf744f78563444defddfe283c1d9d7ca) Thanks [@danstepanov](https://github.com/danstepanov)! - bump nativewind version to 4.1

## 2.11.22

### Patch Changes

- [#406](https://github.com/roninoss/create-expo-stack/pull/406) [`c31dedbf8c3ebf87b9104d961962f6146195d8d1`](https://github.com/roninoss/create-expo-stack/commit/c31dedbf8c3ebf87b9104d961962f6146195d8d1) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: make sure npmrc gets added for pnpm

## 2.11.21

### Patch Changes

- [`f9506edf2bb1bc36f0b17fcae043577742f8c6da`](https://github.com/roninoss/create-expo-stack/commit/f9506edf2bb1bc36f0b17fcae043577742f8c6da) Thanks [@danstepanov](https://github.com/danstepanov)! - add new sponsors to README

## 2.11.20

### Patch Changes

- [#402](https://github.com/roninoss/create-expo-stack/pull/402) [`41915494797d9fcf63d416b1607404703817b623`](https://github.com/roninoss/create-expo-stack/commit/41915494797d9fcf63d416b1607404703817b623) Thanks [@salloom-domani](https://github.com/salloom-domani)! - add missing compoents dir to tailwind config

- [#396](https://github.com/roninoss/create-expo-stack/pull/396) [`53ef2d97a77f705255778a1bfbe3227ef78f3221`](https://github.com/roninoss/create-expo-stack/commit/53ef2d97a77f705255778a1bfbe3227ef78f3221) Thanks [@dannyhw](https://github.com/dannyhw)! - re-add updated nwui components

## 2.11.19

### Patch Changes

- [`80d56834b320f0da55e8c6c7f9c42a0a5a6a9b0a`](https://github.com/roninoss/create-expo-stack/commit/80d56834b320f0da55e8c6c7f9c42a0a5a6a9b0a) Thanks [@danstepanov](https://github.com/danstepanov)! - revert changes in 2.11.17

## 2.11.18

### Patch Changes

- [#390](https://github.com/roninoss/create-expo-stack/pull/390) [`d5fe3d31120f6b93ff188bff50753ba4e0030616`](https://github.com/roninoss/create-expo-stack/commit/d5fe3d31120f6b93ff188bff50753ba4e0030616) Thanks [@dannyhw](https://github.com/dannyhw)! - Allow for non interactive nwui setup

## 2.11.17

### Patch Changes

- [#387](https://github.com/roninoss/create-expo-stack/pull/387) [`bfb30b177924f815e1862c7a8a3c82c87dbcb38d`](https://github.com/roninoss/create-expo-stack/commit/bfb30b177924f815e1862c7a8a3c82c87dbcb38d) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: should always prompt about deleting unless using --overwrite

- [#386](https://github.com/roninoss/create-expo-stack/pull/386) [`4793cc438515a8e44528a5cf7a3915a112e3433c`](https://github.com/roninoss/create-expo-stack/commit/4793cc438515a8e44528a5cf7a3915a112e3433c) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: allow adding nwui component without installing

## 2.11.16

### Patch Changes

- [#382](https://github.com/roninoss/create-expo-stack/pull/382) [`8491601437cd5302f5627664489b7629e683581f`](https://github.com/roninoss/create-expo-stack/commit/8491601437cd5302f5627664489b7629e683581f) Thanks [@dannyhw](https://github.com/dannyhw)! - more checks on selected components list

## 2.11.15

### Patch Changes

- [#379](https://github.com/roninoss/create-expo-stack/pull/379) [`6783c48b330bb854321ce10666ca50a8e2e5cc4f`](https://github.com/roninoss/create-expo-stack/commit/6783c48b330bb854321ce10666ca50a8e2e5cc4f) Thanks [@dannyhw](https://github.com/dannyhw)! - feat: uses nwui cli to generate project files for nwui

## 2.11.14

### Patch Changes

- [#373](https://github.com/roninoss/create-expo-stack/pull/373) [`35dd3b7f5a2a46c18fa59113990007cc5f202b72`](https://github.com/roninoss/create-expo-stack/commit/35dd3b7f5a2a46c18fa59113990007cc5f202b72) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: eas should now work when pnpm is selected

## 2.11.13

### Patch Changes

- [#369](https://github.com/roninoss/create-expo-stack/pull/369) [`da2ef44b26a18fa34ed020fbcf8e3b367b05eeba`](https://github.com/roninoss/create-expo-stack/commit/da2ef44b26a18fa34ed020fbcf8e3b367b05eeba) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: rerun script more accurate for NWUI

## 2.11.12

### Patch Changes

- [#366](https://github.com/roninoss/create-expo-stack/pull/366) [`73648767a4921f999936b4c3ce0795010b75a204`](https://github.com/roninoss/create-expo-stack/commit/73648767a4921f999936b4c3ce0795010b75a204) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: tabs layout for NWUI and updated recommended bun version

## 2.11.11

### Patch Changes

- [#363](https://github.com/roninoss/create-expo-stack/pull/363) [`0a3ff4501775c7e77f192b5891b0180f411034d6`](https://github.com/roninoss/create-expo-stack/commit/0a3ff4501775c7e77f192b5891b0180f411034d6) Thanks [@danstepanov](https://github.com/danstepanov)! - show avatar fallback if no avatar image is provided

## 2.11.10

### Patch Changes

- [#360](https://github.com/roninoss/create-expo-stack/pull/360) [`df3cd62abc83e9749266f2d192d99be1dbfe5aaa`](https://github.com/roninoss/create-expo-stack/commit/df3cd62abc83e9749266f2d192d99be1dbfe5aaa) Thanks [@dannyhw](https://github.com/dannyhw)! - fix config storage

## 2.11.9

### Patch Changes

- [#353](https://github.com/roninoss/create-expo-stack/pull/353) [`8ccbe1d8a6db329e3d62f24dbab69f462c21b2c6`](https://github.com/roninoss/create-expo-stack/commit/8ccbe1d8a6db329e3d62f24dbab69f462c21b2c6) Thanks [@AlejandroGutierrezB](https://github.com/AlejandroGutierrezB)! - Upgrade launchModeExperimental to use stable launchMode property in app.json.ejs

- [`220ca6637106d4b4b1ad2b16b4f5c33623421d30`](https://github.com/roninoss/create-expo-stack/commit/220ca6637106d4b4b1ad2b16b4f5c33623421d30) Thanks [@danstepanov](https://github.com/danstepanov)! - replace instance of createexpostack.com with rn.new

## 2.11.8

### Patch Changes

- [#354](https://github.com/roninoss/create-expo-stack/pull/354) [`0d81dc6cae3088284f0f7d3c4b114e48f1e2dce1`](https://github.com/roninoss/create-expo-stack/commit/0d81dc6cae3088284f0f7d3c4b114e48f1e2dce1) Thanks [@dannyhw](https://github.com/dannyhw)! - feat: you can now pass a comma separated list of nativewind ui components like --selected-components=date-picker,selectable-text

## 2.11.7

### Patch Changes

- [#351](https://github.com/roninoss/create-expo-stack/pull/351) [`1318dd91d367f054c5460a3e6b4f5204ff9c4dcb`](https://github.com/roninoss/create-expo-stack/commit/1318dd91d367f054c5460a3e6b4f5204ff9c4dcb) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: path for not found with tabs setup

## 2.11.6

### Patch Changes

- [`b1fdd985b2ebfacd3e8f6b521c9c9bb0c55ce3cf`](https://github.com/roninoss/create-expo-stack/commit/b1fdd985b2ebfacd3e8f6b521c9c9bb0c55ce3cf) Thanks [@danstepanov](https://github.com/danstepanov)! - rekt by comments

- [`603adb9e4fce762fa9adb4c21c8e304d7bcc3325`](https://github.com/roninoss/create-expo-stack/commit/603adb9e4fce762fa9adb4c21c8e304d7bcc3325) Thanks [@danstepanov](https://github.com/danstepanov)! - replace all instances of danstepanov/create-expo-stack with roninoss/create-expo-stack

## 2.11.5

### Patch Changes

- [`17634ae3324ff8280c5218e6a8dea3ab1f773da6`](https://github.com/roninoss/create-expo-stack/commit/17634ae3324ff8280c5218e6a8dea3ab1f773da6) Thanks [@danstepanov](https://github.com/danstepanov)! - remove segmented-control

## 2.11.4

### Patch Changes

- [`9882067c1b7056db1683e99c4fd8a9397fc264f4`](https://github.com/roninoss/create-expo-stack/commit/9882067c1b7056db1683e99c4fd8a9397fc264f4) Thanks [@danstepanov](https://github.com/danstepanov)! - add comments to help users find where to add code for NativeWindUI

- [`42157aca9cd3047b18f915188b9f57bee0ea1371`](https://github.com/roninoss/create-expo-stack/commit/42157aca9cd3047b18f915188b9f57bee0ea1371) Thanks [@danstepanov](https://github.com/danstepanov)! - i'm dumb and don't understand assertions

- [`f24f6d376f7f151e587d8aea6b5101d6a3fe8cd1`](https://github.com/roninoss/create-expo-stack/commit/f24f6d376f7f151e587d8aea6b5101d6a3fe8cd1) Thanks [@danstepanov](https://github.com/danstepanov)! - add --clean flag to prebuild command for nativewindui

## 2.11.3

### Patch Changes

- [`d6492a617feb144e84390de439ef5352d22994e5`](https://github.com/roninoss/create-expo-stack/commit/d6492a617feb144e84390de439ef5352d22994e5) Thanks [@danstepanov](https://github.com/danstepanov)! - remove deprecated nativewindui components

## 2.11.2

### Patch Changes

- [`19d1caf3ebda5c90cb173268d5829b46e80b064b`](https://github.com/roninoss/create-expo-stack/commit/19d1caf3ebda5c90cb173268d5829b46e80b064b) Thanks [@danstepanov](https://github.com/danstepanov)! - change default blank nativewindui template to use a stack navigator, instead of drawer+tabs

## 2.11.1

### Patch Changes

- [#340](https://github.com/roninoss/create-expo-stack/pull/340) [`fc1fb3cfc713375c55e8f4360534b023462f9632`](https://github.com/roninoss/create-expo-stack/commit/fc1fb3cfc713375c55e8f4360534b023462f9632) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: tests

- [#336](https://github.com/roninoss/create-expo-stack/pull/336) [`7f0f04765ac19e4c3825ea724ccc3624ac03b940`](https://github.com/roninoss/create-expo-stack/commit/7f0f04765ac19e4c3825ea724ccc3624ac03b940) Thanks [@dannyhw](https://github.com/dannyhw)! - tests

## 2.11.0

### Minor Changes

- [#33](https://github.com/roninoss/create-expo-stack/pull/33) [`3c394087a85cbc6e4fb84972093029e4094f3700`](https://github.com/roninoss/create-expo-stack/commit/3c394087a85cbc6e4fb84972093029e4094f3700) Thanks [@falcoagustin](https://github.com/falcoagustin)! - Adds --vexo-analytics to enable vexo analytics

### Patch Changes

- [#335](https://github.com/roninoss/create-expo-stack/pull/335) [`bad4a51309fd5006edeea44be80d77a8de3cbd07`](https://github.com/roninoss/create-expo-stack/commit/bad4a51309fd5006edeea44be80d77a8de3cbd07) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: remove unnecessary console.log message

## 2.10.5

### Patch Changes

- [#325](https://github.com/roninoss/create-expo-stack/pull/325) [`c39f05700dfd8eaca2d9eeb55d3dc5ad787e5846`](https://github.com/roninoss/create-expo-stack/commit/c39f05700dfd8eaca2d9eeb55d3dc5ad787e5846) Thanks [@dannyhw](https://github.com/dannyhw)! - config analytics

- [#329](https://github.com/roninoss/create-expo-stack/pull/329) [`0aee6404d69b5df0c47b5c44bc076b477ae22d02`](https://github.com/roninoss/create-expo-stack/commit/0aee6404d69b5df0c47b5c44bc076b477ae22d02) Thanks [@Savinvadim1312](https://github.com/Savinvadim1312)! - Pass down props for button components

- [`0aafcb2f1b8cb849a4beb8f98e44ac1817a736c9`](https://github.com/roninoss/create-expo-stack/commit/0aafcb2f1b8cb849a4beb8f98e44ac1817a736c9) Thanks [@danstepanov](https://github.com/danstepanov)! - add ces version to cesconfig.json

- [#328](https://github.com/roninoss/create-expo-stack/pull/328) [`486a9402b30239a68cb44497f98b7d44a7f4d67c`](https://github.com/roninoss/create-expo-stack/commit/486a9402b30239a68cb44497f98b7d44a7f4d67c) Thanks [@Savinvadim1312](https://github.com/Savinvadim1312)! - Fix tamagui button

- [`7b6454f123c010d57f3e3f542682f9a76a774d6c`](https://github.com/roninoss/create-expo-stack/commit/7b6454f123c010d57f3e3f542682f9a76a774d6c) Thanks [@danstepanov](https://github.com/danstepanov)! - add missing analytics dependencies

- [`910f13c11db2064037e1e0a44c27966e8945574f`](https://github.com/roninoss/create-expo-stack/commit/910f13c11db2064037e1e0a44c27966e8945574f) Thanks [@danstepanov](https://github.com/danstepanov)! - properly set noGit and noInstall for analytics

## 2.10.4

### Patch Changes

- [`187960d4a592621669aec033a873ea8548f5766a`](https://github.com/roninoss/create-expo-stack/commit/187960d4a592621669aec033a873ea8548f5766a) Thanks [@danstepanov](https://github.com/danstepanov)! - generate cesconfig file for each project

## 2.10.3

### Patch Changes

- [#319](https://github.com/roninoss/create-expo-stack/pull/319) [`4cc5073ac9ed7aabbe0ac2d860f3297fbb142f72`](https://github.com/roninoss/create-expo-stack/commit/4cc5073ac9ed7aabbe0ac2d860f3297fbb142f72) Thanks [@Savinvadim1312](https://github.com/Savinvadim1312)! - Fix unneceserry import of nativewind when not required

## 2.10.2

### Patch Changes

- [`1c600c2c1883b8b6f1333c2abf86af87570d840f`](https://github.com/roninoss/create-expo-stack/commit/1c600c2c1883b8b6f1333c2abf86af87570d840f) Thanks [@danstepanov](https://github.com/danstepanov)! - change output message

## 2.10.1

### Patch Changes

- [`3cfeb00ce4fde284b1a0d0928e8332848877872b`](https://github.com/roninoss/create-expo-stack/commit/3cfeb00ce4fde284b1a0d0928e8332848877872b) Thanks [@danstepanov](https://github.com/danstepanov)! - use npx expo prebuild instead of npm run expo prebuild

## 2.10.0

### Minor Changes

- [`ccee444990d1934728335ee8f9f79ff4005b1083`](https://github.com/roninoss/create-expo-stack/commit/ccee444990d1934728335ee8f9f79ff4005b1083) Thanks [@danstepanov](https://github.com/danstepanov)! - move nativewindui into styles

## 2.9.10

### Patch Changes

- [#307](https://github.com/roninoss/create-expo-stack/pull/307) [`48765934e887d161527510cbd54d0caf15a09154`](https://github.com/roninoss/create-expo-stack/commit/48765934e887d161527510cbd54d0caf15a09154) Thanks [@dannyhw](https://github.com/dannyhw)! - exits when eas and no install are chosen together since its not possible

- [`695ba1bd4e6b5ac4f42b171b0fb240567fe6201a`](https://github.com/roninoss/create-expo-stack/commit/695ba1bd4e6b5ac4f42b171b0fb240567fe6201a) Thanks [@danstepanov](https://github.com/danstepanov)! - silence expo package upgrade messages

- [#310](https://github.com/roninoss/create-expo-stack/pull/310) [`7a32de0e40b97e8a6f8864b046454d8c0b6f2f0e`](https://github.com/roninoss/create-expo-stack/commit/7a32de0e40b97e8a6f8864b046454d8c0b6f2f0e) Thanks [@dannyhw](https://github.com/dannyhw)! - fix: issues falling back to npm

## 2.9.9

### Patch Changes

- [`b5340ed144795d1fd5e541cc47dbd60988ec67aa`](https://github.com/roninoss/create-expo-stack/commit/b5340ed144795d1fd5e541cc47dbd60988ec67aa) Thanks [@danstepanov](https://github.com/danstepanov)! - add npmrc file for pnpm projects that use NativeWind and Expo Router

## 2.9.8

### Patch Changes

- [`dc92e401ed0b23f54d76fb387b9160984fbf9ea8`](https://github.com/roninoss/create-expo-stack/commit/dc92e401ed0b23f54d76fb387b9160984fbf9ea8) Thanks [@danstepanov](https://github.com/danstepanov)! - bump dependencies for nativewindui

## 2.9.7

### Patch Changes

- [#299](https://github.com/roninoss/create-expo-stack/pull/299) [`c79fbe4e2347697be8ed2632f7ebbe9018fda733`](https://github.com/roninoss/create-expo-stack/commit/c79fbe4e2347697be8ed2632f7ebbe9018fda733) Thanks [@dannyhw](https://github.com/dannyhw)! - fixes npm logging too much on install

## 2.9.6

### Patch Changes

- [#300](https://github.com/roninoss/create-expo-stack/pull/300) [`5a80b6e72c6c0f5a36510a6a8893a38bb90f8fa0`](https://github.com/roninoss/create-expo-stack/commit/5a80b6e72c6c0f5a36510a6a8893a38bb90f8fa0) Thanks [@danstepanov](https://github.com/danstepanov)! - add prebuild script to nativewindui

## 2.9.5

### Patch Changes

- [#295](https://github.com/roninoss/create-expo-stack/pull/295) [`c548fdc9f15bbd3b5ae634cbe8db9dbed5e1e12c`](https://github.com/roninoss/create-expo-stack/commit/c548fdc9f15bbd3b5ae634cbe8db9dbed5e1e12c) Thanks [@mrzachnugent](https://github.com/mrzachnugent)! - Makes the dark mode android navigation bar more transparent for NativeWindUI

## 2.9.4

### Patch Changes

- [`6bc5f0d7c6ab81ef9949c7ef2c14e840df2ac369`](https://github.com/roninoss/create-expo-stack/commit/6bc5f0d7c6ab81ef9949c7ef2c14e840df2ac369) Thanks [@danstepanov](https://github.com/danstepanov)! - make onPress optional for nativewind buttonprops

## 2.9.3

### Patch Changes

- [`e6bbd1c8b4687f44c9d1fd97b60b2ec3681eb822`](https://github.com/roninoss/create-expo-stack/commit/e6bbd1c8b4687f44c9d1fd97b60b2ec3681eb822) Thanks [@danstepanov](https://github.com/danstepanov)! - upgrade expo dev client for sdk 51

## 2.9.2

### Patch Changes

- [`5f606147aaf0d9e14f8a931a1d62d896dd91c785`](https://github.com/roninoss/create-expo-stack/commit/5f606147aaf0d9e14f8a931a1d62d896dd91c785) Thanks [@danstepanov](https://github.com/danstepanov)! - add run to eas configure step because package managers

## 2.9.1

### Patch Changes

- [`c4a0be252fb76dea20eb3a9c9cd99f15fa43387a`](https://github.com/roninoss/create-expo-stack/commit/c4a0be252fb76dea20eb3a9c9cd99f15fa43387a) Thanks [@danstepanov](https://github.com/danstepanov)! - remove expo-router overrides and resolutions given recent upgrade to 3.5

## 2.9.0

### Minor Changes

- [`4006505675681c232b6c41059de3d76d8276b89f`](https://github.com/roninoss/create-expo-stack/commit/4006505675681c232b6c41059de3d76d8276b89f) Thanks [@danstepanov](https://github.com/danstepanov)! - prevent expo install from updating libraries

### Patch Changes

- [`f9397f45525c14715bbde5c736ea6698009afb41`](https://github.com/roninoss/create-expo-stack/commit/f9397f45525c14715bbde5c736ea6698009afb41) Thanks [@danstepanov](https://github.com/danstepanov)! - upgrade to expo sdk 51

- [#266](https://github.com/roninoss/create-expo-stack/pull/266) [`2e19daf72e3243978554f7ec88377ff552bc8828`](https://github.com/roninoss/create-expo-stack/commit/2e19daf72e3243978554f7ec88377ff552bc8828) Thanks [@dannyhw](https://github.com/dannyhw)! - Add option to setup eas

## 2.8.0

### Minor Changes

- [`673f031f54b6006b90a68a66f8a775b6316e7cc9`](https://github.com/roninoss/create-expo-stack/commit/673f031f54b6006b90a68a66f8a775b6316e7cc9) Thanks [@danstepanov](https://github.com/danstepanov)! - users can save their favorite configurations

### Patch Changes

- [`940dc326c5d7efed69a239a5326456e64c08d983`](https://github.com/roninoss/create-expo-stack/commit/940dc326c5d7efed69a239a5326456e64c08d983) Thanks [@danstepanov](https://github.com/danstepanov)! - pipe version of create expo stack to git commit message

## 2.7.5

### Patch Changes

- [`779bbe02d2d08ae0a86dd7e87298f6cb92835e48`](https://github.com/roninoss/create-expo-stack/commit/779bbe02d2d08ae0a86dd7e87298f6cb92835e48) Thanks [@danstepanov](https://github.com/danstepanov)! - go back one directory for global.css if using expo router

## 2.7.4

### Patch Changes

- [`30986447cb68ff8b6476adcb1b236487d1b34aea`](https://github.com/roninoss/create-expo-stack/commit/30986447cb68ff8b6476adcb1b236487d1b34aea) Thanks [@danstepanov](https://github.com/danstepanov)! - revert last change pertaining to global css file path

## 2.7.3

### Patch Changes

- [`28ec60d87d7ec53874008664c08e4d097861e9e3`](https://github.com/roninoss/create-expo-stack/commit/28ec60d87d7ec53874008664c08e4d097861e9e3) Thanks [@danstepanov](https://github.com/danstepanov)! - add tilda in place of dot for global css file

## 2.7.2

### Patch Changes

- [`faa407c86751ffdbc35d58467b4a6176ec857c3b`](https://github.com/roninoss/create-expo-stack/commit/faa407c86751ffdbc35d58467b4a6176ec857c3b) Thanks [@danstepanov](https://github.com/danstepanov)! - replace nativewind-ui folder with nativewindui folder

## 2.7.1

### Patch Changes

- [#271](https://github.com/roninoss/create-expo-stack/pull/271) [`7228e17dddfed93c14207a425b11f31086c897ee`](https://github.com/roninoss/create-expo-stack/commit/7228e17dddfed93c14207a425b11f31086c897ee) Thanks [@dannyhw](https://github.com/dannyhw)! - Auto update expo and related packages

## 2.7.0

### Minor Changes

- [`e4d108e7c25f1badca2f25a3b37fcbf451f9a4ad`](https://github.com/roninoss/create-expo-stack/commit/e4d108e7c25f1badca2f25a3b37fcbf451f9a4ad) Thanks [@danstepanov](https://github.com/danstepanov)! - add base version of nativewindui, to be used for integrating the free components

### Patch Changes

- [`d1a265f2d90825d4ed87907628fa71e5c4bdba06`](https://github.com/roninoss/create-expo-stack/commit/d1a265f2d90825d4ed87907628fa71e5c4bdba06) Thanks [@danstepanov](https://github.com/danstepanov)! - update index in nativewindui

## 2.6.5

### Patch Changes

- [#248](https://github.com/roninoss/create-expo-stack/pull/248) [`0118d1b989378168c20f58ebf532a153c87a8f98`](https://github.com/roninoss/create-expo-stack/commit/0118d1b989378168c20f58ebf532a153c87a8f98) Thanks [@YounessHassoune](https://github.com/YounessHassoune)! - update the app.json EJS template to ensure that duplicate 'plugin' keys are avoided in the final app.json file.

## 2.6.4

### Patch Changes

- [`fe4a03a`](https://github.com/roninoss/create-expo-stack/commit/fe4a03a47245e53a5c9eb5906a236d3b0258c467) Thanks [@danstepanov](https://github.com/danstepanov)! - add missing Text for tamagui template

## 2.6.3

### Patch Changes

- [`1042dae`](https://github.com/roninoss/create-expo-stack/commit/1042dae7090e44ce778fd66e96854e2a260edae1) Thanks [@danstepanov](https://github.com/danstepanov)! - remove unused React

## 2.6.2

### Patch Changes

- [`7c1a2ce`](https://github.com/roninoss/create-expo-stack/commit/7c1a2cec9d11b2d42386b5dc3124b1f3e8078498) Thanks [@danstepanov](https://github.com/danstepanov)! - add forwardRef to Linked components, fix #239

- [`71ce545`](https://github.com/roninoss/create-expo-stack/commit/71ce545212abea93aac4a1200cd0664e3eea3e2e) Thanks [@danstepanov](https://github.com/danstepanov)! - replace View with SafeAreaView for Container component

## 2.6.1

### Patch Changes

- [#236](https://github.com/roninoss/create-expo-stack/pull/236) [`bc891da`](https://github.com/roninoss/create-expo-stack/commit/bc891da7673bccaa2362ae2784cae61bf0efc499) Thanks [@sammoore](https://github.com/sammoore)! - fix npm >= v7 installation due to strict peer dependency requirements of @react-native-async-storage/async-storage to react-native

## 2.6.0

### Minor Changes

- [`0e95d96`](https://github.com/roninoss/create-expo-stack/commit/0e95d968be41cafb99d09ee1b1ceca4a31838a7f) Thanks [@danstepanov](https://github.com/danstepanov)! - add clack to dependencies for cli

## 2.5.2

### Patch Changes

- [`097a6eb`](https://github.com/roninoss/create-expo-stack/commit/097a6ebeba280fa7891678e96fbfd4671f89dcd8) Thanks [@danstepanov](https://github.com/danstepanov)! - add clack to dependencies for cli

## 2.5.1

### Patch Changes

- [#231](https://github.com/roninoss/create-expo-stack/pull/231) [`9becc72`](https://github.com/roninoss/create-expo-stack/commit/9becc7271522755d93a97cf1af0cd176f59ec2c0) Thanks [@danstepanov](https://github.com/danstepanov)! - overhaul cli prompts via clack

## 2.5.0

### Minor Changes

- [#201](https://github.com/roninoss/create-expo-stack/pull/201) [`738ca1b`](https://github.com/roninoss/create-expo-stack/commit/738ca1b903392762d8fb5c872a300654d8582ba5) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - i18next for internationalization

- [#215](https://github.com/roninoss/create-expo-stack/pull/215) [`1995ea9`](https://github.com/roninoss/create-expo-stack/commit/1995ea9a924e123833b64775bd97e6bf52439d3d) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - Refactor the whole folder structure to reduce ejs complexity

### Patch Changes

- [#227](https://github.com/roninoss/create-expo-stack/pull/227) [`142847d`](https://github.com/roninoss/create-expo-stack/commit/142847d1eedbb93f47eb3dbc1f710f72fe362f1c) Thanks [@danstepanov](https://github.com/danstepanov)! - validate user is using bun version v1.0.14 if they are using bun, clean up package manager detection logic, add function to fetch package manager version

- [#227](https://github.com/roninoss/create-expo-stack/pull/227) [`94bec4c`](https://github.com/roninoss/create-expo-stack/commit/94bec4c0b8e4c556806909b6013491d130ee7860) Thanks [@danstepanov](https://github.com/danstepanov)! - Fix formatting of generated project when using --no-install with options that result in prettier plugins needing to be installed

- [#227](https://github.com/roninoss/create-expo-stack/pull/227) [`5910188`](https://github.com/roninoss/create-expo-stack/commit/5910188c60fec084690c6a18efaa191cf0ee2549) Thanks [@danstepanov](https://github.com/danstepanov)! - bump react-native to 73.6 for expo sdk 50

- [`cfc261a`](https://github.com/roninoss/create-expo-stack/commit/cfc261a737f0545cc40caf03bfa5a1466be013ab) Thanks [@danstepanov](https://github.com/danstepanov)! - automatically update the contributor list in the README

- [`a2fe5b8`](https://github.com/roninoss/create-expo-stack/commit/a2fe5b845fdc688f2c3d883d6e49f71cb2d0297e) Thanks [@danstepanov](https://github.com/danstepanov)! - add check for dir being present in file path with shared project name, enhances input validation for cli

- [`3ba0544`](https://github.com/roninoss/create-expo-stack/commit/3ba0544cc9fc2cfc76f66015591e98c7cc5690ef) Thanks [@danstepanov](https://github.com/danstepanov)! - remove project files on throw, fix project name validation

## 2.4.3

### Patch Changes

- [#208](https://github.com/roninoss/create-expo-stack/pull/208) [`e841ea5`](https://github.com/roninoss/create-expo-stack/commit/e841ea519620294dd233d5bafea15dbfc013aff0) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - Bump react-native to 0.73.4

- [#207](https://github.com/roninoss/create-expo-stack/pull/207) [`3287a3c`](https://github.com/roninoss/create-expo-stack/commit/3287a3c7c99eafeb55938be9570e532368af22f5) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - update the gitignore file

## 2.4.2

### Patch Changes

- [`1b0be18`](https://github.com/roninoss/create-expo-stack/commit/1b0be18f7b7982be5c115364059ae6dd792dde98) Thanks [@danstepanov](https://github.com/danstepanov)! - bump to expo 50.0.5

- [`bc25b99`](https://github.com/roninoss/create-expo-stack/commit/bc25b9951f22543e77a2c98f1e220448c8fc0cbc) Thanks [@danstepanov](https://github.com/danstepanov)! - fix tamagui navigation templates missing imports for unmatched route

- [#195](https://github.com/roninoss/create-expo-stack/pull/195) [`ed2e92f`](https://github.com/roninoss/create-expo-stack/commit/ed2e92fb3f7a670845a775aab7c534205cf6560a) Thanks [@frankcalise](https://github.com/frankcalise)! - Ignite project names accept kebab case, forced PascalCase conversion has been removed

## 2.4.1

### Patch Changes

- [`9242c21`](https://github.com/roninoss/create-expo-stack/commit/9242c210f8c76e96ee9aadf4883f04dd2b88fdc5) Thanks [@danstepanov](https://github.com/danstepanov)! - add EditScreenInfo to drawer + tabs templates

## 2.4.0

### Minor Changes

- [#193](https://github.com/roninoss/create-expo-stack/pull/193) [`50650ac`](https://github.com/roninoss/create-expo-stack/commit/50650aceffc31b89ceced2f7866f51f4a2561846) Thanks [@frankcalise](https://github.com/frankcalise)! - Expo SDK 50, expo-router v3, NativeWind v4

- [#189](https://github.com/roninoss/create-expo-stack/pull/189) [`8681c0a`](https://github.com/roninoss/create-expo-stack/commit/8681c0a8a0d691d0c301ef677e10b1cfc0dffa43) Thanks [@coyksdev](https://github.com/coyksdev)! - Setup Unistyles theme

- [#167](https://github.com/roninoss/create-expo-stack/pull/167) [`17776d2`](https://github.com/roninoss/create-expo-stack/commit/17776d28db240164694088dbdc17520cfe6894cd) Thanks [@ludwig-pro](https://github.com/ludwig-pro)! - Add restyle as styling option

- [#181](https://github.com/roninoss/create-expo-stack/pull/181) [`a38e81a`](https://github.com/roninoss/create-expo-stack/commit/a38e81aca2ec891e5baf31953a908b433efecb51) Thanks [@coyksdev](https://github.com/coyksdev)! - Added react-native-unistyles template

### Patch Changes

- [#192](https://github.com/roninoss/create-expo-stack/pull/192) [`507532b`](https://github.com/roninoss/create-expo-stack/commit/507532b0f5ad2947427b810c064606e4fa7de28b) Thanks [@asapMaki](https://github.com/asapMaki)! - Drawer+Tabs react navigation optio: Fix typescript

- [#159](https://github.com/roninoss/create-expo-stack/pull/159) [`2c00bdf`](https://github.com/roninoss/create-expo-stack/commit/2c00bdfe7635c765ddf949d6db3260f9a96c190a) Thanks [@asapMaki](https://github.com/asapMaki)! - replace drawer templates with drawer+tabs templates

## 2.3.15

### Patch Changes

- [#178](https://github.com/roninoss/create-expo-stack/pull/178) [`3061323`](https://github.com/roninoss/create-expo-stack/commit/306132315c87114924735fda53b359a729acafb8) Thanks [@finnbayer](https://github.com/finnbayer)! - added resolution/override for expo-modules-core to expo-router template

## 2.3.14

### Patch Changes

- [`91249e0`](https://github.com/roninoss/create-expo-stack/commit/91249e0f303495436588107f5bdc2ec276832bd8) Thanks [@danstepanov](https://github.com/danstepanov)! - allow proper setting of import alias

## 2.3.13

### Patch Changes

- [`ae59661`](https://github.com/roninoss/create-expo-stack/commit/ae596617a1290f83c27cab7c723fe003f26aca97) Thanks [@danstepanov](https://github.com/danstepanov)! - add missing brackets to unmatched route file for expo router

## 2.3.12

### Patch Changes

- [`5199dce`](https://github.com/roninoss/create-expo-stack/commit/5199dce7f159f9d03081fae48f15ea72e8818864) Thanks [@danstepanov](https://github.com/danstepanov)! - rename app.d.ts to app-env.d.ts to ensure that nativewind className property is supported per instruction from Mark Lawlor

- [`f29a265`](https://github.com/roninoss/create-expo-stack/commit/f29a265f697636ea57bed092bed10f59d5792667) Thanks [@danstepanov](https://github.com/danstepanov)! - add missing route and html file for expo router templates

- [`49550e7`](https://github.com/roninoss/create-expo-stack/commit/49550e7026a1b87ddb00bf94aada6047dcd509d7) Thanks [@gwenoleR](https://github.com/gwenoleR)! - Tamagui : Change Text to `SizableText` and `H1` on Tamagui config to apply default style

  Tamagui - Expo Router : Load font on \_layout to apply them on all app

## 2.3.11

### Patch Changes

- [`8729fc3`](https://github.com/roninoss/create-expo-stack/commit/8729fc320b1c7cf7eca89ff5f6523bef4c5299cd) Thanks [@danstepanov](https://github.com/danstepanov)! - remove experimental flag from expo router

- [`8729fc3`](https://github.com/roninoss/create-expo-stack/commit/8729fc320b1c7cf7eca89ff5f6523bef4c5299cd) Thanks [@danstepanov](https://github.com/danstepanov)! - move stack screen option configuration to screen level rather than parent layout level

## 2.3.10

### Patch Changes

- [`0587729`](https://github.com/roninoss/create-expo-stack/commit/0587729836efae3e1713cfb610cd473a6bf0fbf7) Thanks [@danstepanov](https://github.com/danstepanov)! - support kebab case for cli flags such as --no-install and --no-git, migrate tests to use kebab case, expand test coverage to ensure flags are working properly

## 2.3.9

### Patch Changes

- [#145](https://github.com/roninoss/create-expo-stack/pull/145) [`f7cfd23`](https://github.com/roninoss/create-expo-stack/commit/f7cfd23ca97172e855a32b60b65816563ce2568f) Thanks [@frankcalise](https://github.com/frankcalise)! - Fixes hot refresh when using yarn with expo-router

## 2.3.8

### Patch Changes

- [#129](https://github.com/roninoss/create-expo-stack/pull/129) [`278eefc`](https://github.com/roninoss/create-expo-stack/commit/278eefc65ab964f69f5a9cd65d7f4c357df706b2) Thanks [@sammoore](https://github.com/sammoore)! - refactor(commands): get projectName before branching off into CLI

- [#140](https://github.com/roninoss/create-expo-stack/pull/140) [`283dab2`](https://github.com/roninoss/create-expo-stack/commit/283dab2aec8274606e1965b2effed6d1e2873113) Thanks [@sammoore](https://github.com/sammoore)! - feat: add --overwrite flag to ignore an existing directory

- [#139](https://github.com/roninoss/create-expo-stack/pull/139) [`88fd2be`](https://github.com/roninoss/create-expo-stack/commit/88fd2be29c78c0066e0c5bfa2905b08e4875cde2) Thanks [@sammoore](https://github.com/sammoore)! - fix: prompt/interaction causes immediate failure/exit after existsAsync check

- [#141](https://github.com/roninoss/create-expo-stack/pull/141) [`667abf1`](https://github.com/roninoss/create-expo-stack/commit/667abf12741aa55ca450acf3ec86544965a9244d) Thanks [@sammoore](https://github.com/sammoore)! - fix: successfully exit interactive CLI when user cancels/exits with interrupt

- [#139](https://github.com/roninoss/create-expo-stack/pull/139) [`0728ea9`](https://github.com/roninoss/create-expo-stack/commit/0728ea969e271456a5e8999432717e2e4aeaf78b) Thanks [@sammoore](https://github.com/sammoore)! - fix: do not ask to remove existing directory when non-interactive

- [#137](https://github.com/roninoss/create-expo-stack/pull/137) [`1ba99e8`](https://github.com/roninoss/create-expo-stack/commit/1ba99e8c5fbad5ba0154fd063b703b6ba90ddc73) Thanks [@sammoore](https://github.com/sammoore)! - feat: re-throw error on exit to indicate execution failure, show error diagnostics

## 2.3.7

### Patch Changes

- [#133](https://github.com/roninoss/create-expo-stack/pull/133) [`263009a`](https://github.com/roninoss/create-expo-stack/commit/263009a0898de9fbb0215c3c9e92b9496647218d) Thanks [@finnbayer](https://github.com/finnbayer)! - added .env to .gitignore when firebase or supabase is used

- [`3a8c3a9`](https://github.com/roninoss/create-expo-stack/commit/3a8c3a98a73ecd906af01480c94f7702dda5d506) Thanks [@danstepanov](https://github.com/danstepanov)! - check if pwd already contains folder with set project name, offer to delete if so

- [#130](https://github.com/roninoss/create-expo-stack/pull/130) [`6bb80a7`](https://github.com/roninoss/create-expo-stack/commit/6bb80a768c560c80f94d17b2ff3d839edf7f985e) Thanks [@finnbayer](https://github.com/finnbayer)! - changed metro.config.js to ejs to take expo-router into account

- [#132](https://github.com/roninoss/create-expo-stack/pull/132) [`9335094`](https://github.com/roninoss/create-expo-stack/commit/93350940659ea144838ae8bbbffda07726edda70) Thanks [@finnbayer](https://github.com/finnbayer)! - moved the addition of the project name to the target to the end to avoid incorrect replacements

## 2.3.6

### Patch Changes

- [#120](https://github.com/roninoss/create-expo-stack/pull/120) [`dc14b3d`](https://github.com/roninoss/create-expo-stack/commit/dc14b3d3d0f611b4c0493782b9e98f60aed983e4) Thanks [@gialencar](https://github.com/gialencar)! - Fix mismatching RootStackParamList type definition for DrawerNavigator

## 2.3.5

### Patch Changes

- [#116](https://github.com/roninoss/create-expo-stack/pull/116) [`00e8846`](https://github.com/roninoss/create-expo-stack/commit/00e884666ca682c0d9a4ad3dc816588dc494c3db) Thanks [@danstepanov](https://github.com/danstepanov)! - only show package manager of choice if user selected one, for non-interactive mode

- [#116](https://github.com/roninoss/create-expo-stack/pull/116) [`1e24623`](https://github.com/roninoss/create-expo-stack/commit/1e2462324775c5e3132b76de41305085726716ff) Thanks [@danstepanov](https://github.com/danstepanov)! - address package manager undefined issues

## 2.3.4

### Patch Changes

- [#114](https://github.com/roninoss/create-expo-stack/pull/114) [`8bf2016`](https://github.com/roninoss/create-expo-stack/commit/8bf2016e9758dc26bfc004eada03a6120ac6be41) Thanks [@danstepanov](https://github.com/danstepanov)! - only show package manager of choice if user selected one, for non-interactive mode

- [#114](https://github.com/roninoss/create-expo-stack/pull/114) [`2be9ec7`](https://github.com/roninoss/create-expo-stack/commit/2be9ec7b16d6460d550fc1a2c39272bd3267b202) Thanks [@danstepanov](https://github.com/danstepanov)! - address package manager undefined issues

## 2.3.3

### Patch Changes

- [`49df44d`](https://github.com/roninoss/create-expo-stack/commit/49df44d8b9fe067d684e6eca96258af41e0fa881) Thanks [@danstepanov](https://github.com/danstepanov)! - ensure installation uses the desired packageManager

## 2.3.2

### Patch Changes

- [`93015ea`](https://github.com/roninoss/create-expo-stack/commit/93015eaad5c608683f77cf24445757d1f426e6f9) Thanks [@danstepanov](https://github.com/danstepanov)! - add package manager prompt to CLI

## 2.3.1

### Patch Changes

- [`cda57ac`](https://github.com/roninoss/create-expo-stack/commit/cda57ac663a390648b4f20f5a77113e99a07e39c) Thanks [@danstepanov](https://github.com/danstepanov)! - set default boolean values for cli flags, add stylesheet as default styling package if no styling package is passed in to non-interactive mode

## 2.3.0

### Minor Changes

- [#80](https://github.com/roninoss/create-expo-stack/pull/80) [`001fff8`](https://github.com/roninoss/create-expo-stack/commit/001fff8f501cd0b0aa557da607f481f9b4320eec) Thanks [@frankcalise](https://github.com/frankcalise)! - Adds `--importAlias` to enable TS path aliases

### Patch Changes

- [#83](https://github.com/roninoss/create-expo-stack/pull/83) [`fb044c8`](https://github.com/roninoss/create-expo-stack/commit/fb044c810fdd91efb4dde52e787e1f2434d43509) Thanks [@sammoore](https://github.com/sammoore)! - Support a wider variety of shells in generated package.json run-scripts by using double-quotes around glob arguments. Courtesy of Gaurav Bhandari (@kratos-respawned)

## 2.2.15

### Patch Changes

- [#77](https://github.com/roninoss/create-expo-stack/pull/77) [`29c81ce`](https://github.com/roninoss/create-expo-stack/commit/29c81ce83c7eec42945930b7c7e140f6f03d7646) Thanks [@frankcalise](https://github.com/frankcalise)! - Removed duplicate import during expo-router tabs configuration

- [#75](https://github.com/roninoss/create-expo-stack/pull/75) [`5d2ae5c`](https://github.com/roninoss/create-expo-stack/commit/5d2ae5c7b29fc008f465e5c9282fa90dfa0cb4fe) Thanks [@sammoore](https://github.com/sammoore)! - Remove DOM typescript lib from cli/tsconfig.json

- [#75](https://github.com/roninoss/create-expo-stack/pull/75) [`8e90e59`](https://github.com/roninoss/create-expo-stack/commit/8e90e59be41f06d4f9a98e9380cb796814530967) Thanks [@sammoore](https://github.com/sammoore)! - Update bun/bun-types to 1.0.14

- [#74](https://github.com/roninoss/create-expo-stack/pull/74) [`188107a`](https://github.com/roninoss/create-expo-stack/commit/188107a7edc91516a1ad07489576ac9d067fc1d4) Thanks [@sammoore](https://github.com/sammoore)! - fix .changeset/config.json ignore to refer to (valid) non-cli subprojects

## 2.2.14

### Patch Changes

- [`026b97e`](https://github.com/roninoss/create-expo-stack/commit/026b97ee02f370ee1ee10dad9877b540a3c623d7) Thanks [@danstepanov](https://github.com/danstepanov)! - - symlink README
  - add shortlink for discord
  - update contributors
  - add header labels and descriptor to README
  - fix styling package issues

- [`90df237`](https://github.com/roninoss/create-expo-stack/commit/90df237e8a53696229e70afebf7d1107e51582cc) Thanks [@danstepanov](https://github.com/danstepanov)! - remove superfluous EJS end brackets

- [`b9e4d0a`](https://github.com/roninoss/create-expo-stack/commit/b9e4d0a279aa0697468344fbe443b024aaba04f4) Thanks [@danstepanov](https://github.com/danstepanov)! - remove frozen lockfile from beta release channel

- [`4f73965`](https://github.com/roninoss/create-expo-stack/commit/4f73965d834e38b0fba22040171fdb42312c3683) Thanks [@danstepanov](https://github.com/danstepanov)! - add changesets/changelog-github
