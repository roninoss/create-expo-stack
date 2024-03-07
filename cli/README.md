# Create Expo Stack CLI

[![Discord](https://img.shields.io/discord/1173879003191459860?color=%235865F2&label=Discord&logo=discord&logoColor=%23fff)](https://expostack.dev/discord) [![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

<p align="center">
  An interactive CLI to create a highly configurable, typesafe Expo app.
</p>

<p align="center">
  Get started by running <code>npx create-expo-stack</code>

## Sponsors

NativeWind
Restyle
StyleSheets
Tamagui

Support this project by <a href="https://github.com/sponsors/danstepanov" target="_blank">becoming a sponsor</a>. Your logo will show up here with a link to your website.

<a href="https://galaxies.dev/" target="_blank" style="margin-top: 10px;margin-right: 10px; margin-bottom: 10px;" ><img src="https://expostack.dev/galaxies-logo.svg"  style="border-radius: 50%;"></a> <a href="https://expo.dev/" target="_blank" style="margin: 10px;"><img src="https://expostack.dev/expo-logo.svg"  style="border-radius: 50%;"></a>

## Description

This CLI tool is designed to help you get started with React Native and Expo as quickly as possible. The CLI options allow you to configure your project with Typescript, file-based routing with Expo Router, configuration-based navigation via React-Navigation, styling with NativeWind, Restyle, StyleSheets, or Tamagui and authentication via Supabase or Firebase.

You can also use flags such as `--noInstall`, `--noGit`, and `--default` in order to customize your project. The CLI will attempt to automatically determine your package manager of choice but you can also pass in your preferred package manager via `--npm`, `--yarn`, `--pnpm`, or `--bun`. Roadmap coming soon...

## Usage

To get started, use npx to run the CLI tool. You will be prompted to opt into the features you want to use.

`npx create-expo-stack`

<img src="https://github.com/danstepanov/create-expo-stack/assets/5482800/e709dd66-cb9b-463c-91f9-b842bb80585c" />

## Tech Stack for the templates

Currently, all of the [templates](https://github.com/danstepanov/create-expo-stack/tree/main/cli/src/templates) use the same versions of the following libraries. Not all of the templates include all of the libraries, but they are all available for use.

Each project is generated based on the results of the CLI, on a per-file basis. This approach makes this CLI extremely extendable and easy to use. Common files to all generated projects are stored in the [base template folder](https://github.com/danstepanov/create-expo-stack/tree/main/cli/src/templates/base) while files pertaining to additional packages are stored in the [packages template folder](https://github.com/danstepanov/create-expo-stack/tree/main/cli/src/templates/packages). Beyond adding files, this project makes use of [EJS](https://ejs.co/) in order to manipulate existing files as necessary.

| Library            | Category            | Version | Description                                    |
| ------------------ | ------------------- | ------- | ---------------------------------------------- |
| React Native       | Mobile Framework    | v0.73   | The best cross-platform mobile framework       |
| React              | UI Framework        | v18     | The most popular UI framework in the world     |
| TypeScript         | Language            | v5      | Static typechecking                            |
| React Navigation   | Navigation          | v6      | Performant and consistent navigation framework |
| Expo               | SDK                 | v50     | Allows (optional) Expo modules                 |
| Expo Font          | Custom Fonts        | v11     | Import custom fonts                            |
| Expo Linking       | URL Handling        | v5      | Open your app via a URL                        |
| Expo Router        | Navigation          | v3      | File-based routing in React-Native             |
| Expo Splash Screen | Splash Screen       | v0.18   | Custom splash screen                           |
| Expo Status Bar    | Status Bar Library  | v1      | Status bar support                             |
| Expo System UI     | System UI Library   | v2      | System UI support                              |
| Expo Web Browser   | Web Browser Library | v12     | Open links in the browser                      |
| NativeWind         | UI Framework        | v2      | Tailwind CSS for React Native                  |
| Restyle            | UI Framework        | v2      | Theme-based styling library for React Native   |
| Tamagui            | UI Framework        | v1      | Universal UI with a smart optimizing compiler  |
| Unistyles          | UI Framework        | v2      | Superset of StyleSheet                         |
| Safe Area Context  | Safe Area Library   | v4      | Safe area support                              |
| React Native Web   | Web Support         | v0.19   | React Native for Web                           |
| Firebase           | Backend and Auth    | v10     | Cloud-hosted NoSQL database from Google        |
| Supabase           | Backend and Auth    | v2      | Open source Firebase alternative               |

## Reporting Bugs & Feedback

If you run into problems or have feedback, first search the issues and discussions in this repository. If you don't find anything, feel free to message me on [Twitter](https://twitter.com/danstepanov) or open a new issue.

## Contributing

### [See this guide.](https://github.com/danstepanov/create-expo-stack/blob/main/contributing.md)

Contributions are welcome! Please open a pull request or an issue if you would like to contribute. There are existing feature requests labeled as `[FR]` in the issues section of this repo.

## Want to move faster? I can help 😎

Getting up-to-speed on a new framework can be cumbersome. If you find that you need to move more quickly, I may be available to help.

If you'd like help with your React Native/Expo app or are just looking for a technical advisor to guide you along your journey, [let's chat](https://twitter.com/danstepanov).

## Contributors ✨

Thanks go to these wonderful people:

<!-- CONTRIBUTORS_START -->
<table><tr><td><a href="https://github.com/danstepanov" target="_blank"><img src="https://avatars.githubusercontent.com/u/5482800?v=4" width="100" alt="danstepanov"><br>danstepanov</a></td></tr>
<tr><td><a href="https://github.com/hqasmei" target="_blank"><img src="https://avatars.githubusercontent.com/u/39573679?v=4" width="100" alt="hqasmei"><br>hqasmei</a></td></tr>
<tr><td><a href="https://github.com/sammoore" target="_blank"><img src="https://avatars.githubusercontent.com/u/2035492?v=4" width="100" alt="sammoore"><br>sammoore</a></td></tr>
<tr><td><a href="https://github.com/ernestoresende" target="_blank"><img src="https://avatars.githubusercontent.com/u/55156145?v=4" width="100" alt="ernestoresende"><br>ernestoresende</a></td></tr>
<tr><td><a href="https://github.com/frankcalise" target="_blank"><img src="https://avatars.githubusercontent.com/u/374022?v=4" width="100" alt="frankcalise"><br>frankcalise</a></td></tr>
<tr><td><a href="https://github.com/ludwig-pro" target="_blank"><img src="https://avatars.githubusercontent.com/u/62896243?v=4" width="100" alt="ludwig-pro"><br>ludwig-pro</a></td></tr>
<tr><td><a href="https://github.com/PickleNik" target="_blank"><img src="https://avatars.githubusercontent.com/u/31113245?v=4" width="100" alt="PickleNik"><br>PickleNik</a></td></tr>
<tr><td><a href="https://github.com/kratos-respawned" target="_blank"><img src="https://avatars.githubusercontent.com/u/87561983?v=4" width="100" alt="kratos-respawned"><br>kratos-respawned</a></td></tr>
<tr><td><a href="https://github.com/finnbayer" target="_blank"><img src="https://avatars.githubusercontent.com/u/115630860?v=4" width="100" alt="finnbayer"><br>finnbayer</a></td></tr>
<tr><td><a href="https://github.com/saimon24" target="_blank"><img src="https://avatars.githubusercontent.com/u/2514208?v=4" width="100" alt="saimon24"><br>saimon24</a></td></tr>
<tr><td><a href="https://github.com/todevmilen" target="_blank"><img src="https://avatars.githubusercontent.com/u/78319110?v=4" width="100" alt="todevmilen"><br>todevmilen</a></td></tr>
<tr><td><a href="https://github.com/alitnk" target="_blank"><img src="https://avatars.githubusercontent.com/u/35243344?v=4" width="100" alt="alitnk"><br>alitnk</a></td></tr>
<tr><td><a href="https://github.com/dannyhw" target="_blank"><img src="https://avatars.githubusercontent.com/u/3481514?v=4" width="100" alt="dannyhw"><br>dannyhw</a></td></tr>
<tr><td><a href="https://github.com/catalinmiron" target="_blank"><img src="https://avatars.githubusercontent.com/u/2805320?v=4" width="100" alt="catalinmiron"><br>catalinmiron</a></td></tr>
<tr><td><a href="https://github.com/b0iq" target="_blank"><img src="https://avatars.githubusercontent.com/u/106549013?v=4" width="100" alt="b0iq"><br>b0iq</a></td></tr>
<tr><td><a href="https://github.com/coyksdev" target="_blank"><img src="https://avatars.githubusercontent.com/u/19565694?v=4" width="100" alt="coyksdev"><br>coyksdev</a></td></tr>
<tr><td><a href="https://github.com/andrew-levy" target="_blank"><img src="https://avatars.githubusercontent.com/u/29075740?v=4" width="100" alt="andrew-levy"><br>andrew-levy</a></td></tr>
<tr><td><a href="https://github.com/gialencar" target="_blank"><img src="https://avatars.githubusercontent.com/u/11895696?v=4" width="100" alt="gialencar"><br>gialencar</a></td></tr>
<tr><td><a href="https://github.com/mwarger" target="_blank"><img src="https://avatars.githubusercontent.com/u/686823?v=4" width="100" alt="mwarger"><br>mwarger</a></td></tr>
<tr><td><a href="https://github.com/gabimoncha" target="_blank"><img src="https://avatars.githubusercontent.com/u/39256258?v=4" width="100" alt="gabimoncha"><br>gabimoncha</a></td></tr>
<tr><td><a href="https://github.com/gwenoleR" target="_blank"><img src="https://avatars.githubusercontent.com/u/10418241?v=4" width="100" alt="gwenoleR"><br>gwenoleR</a></td></tr>
<tr><td><a href="https://github.com/zamplyy" target="_blank"><img src="https://avatars.githubusercontent.com/u/26258710?v=4" width="100" alt="zamplyy"><br>zamplyy</a></td></tr>
<tr><td><a href="https://github.com/Joehoel" target="_blank"><img src="https://avatars.githubusercontent.com/u/31251240?v=4" width="100" alt="Joehoel"><br>Joehoel</a></td></tr>
<tr><td><a href="https://github.com/asapMaki" target="_blank"><img src="https://avatars.githubusercontent.com/u/30200380?v=4" width="100" alt="asapMaki"><br>asapMaki</a></td></tr>
<tr><td><a href="https://github.com/Hacksore" target="_blank"><img src="https://avatars.githubusercontent.com/u/996134?v=4" width="100" alt="Hacksore"><br>Hacksore</a></td></tr>
<tr><td><a href="https://github.com/bautistaaa" target="_blank"><img src="https://avatars.githubusercontent.com/u/3660667?v=4" width="100" alt="bautistaaa"><br>bautistaaa</a></td></tr>
<tr><td><a href="https://github.com/debugtheworldbot" target="_blank"><img src="https://avatars.githubusercontent.com/u/62830430?v=4" width="100" alt="debugtheworldbot"><br>debugtheworldbot</a></td></tr></table>
<!-- CONTRIBUTORS_END -->

[downloads-image]: https://img.shields.io/npm/dm/create-expo-stack?color=364fc7&logoColor=364fc7
[npm-url]: https://www.npmjs.com/package/create-expo-stack
[npm-image]: https://img.shields.io/npm/v/create-expo-stack?color=0b7285&logoColor=0b7285
