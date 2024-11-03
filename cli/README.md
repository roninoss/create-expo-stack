# Create Expo Stack CLI

[![Discord](https://img.shields.io/discord/1173879003191459860?color=%235865F2&label=Discord&logo=discord&logoColor=%23fff)](https://expostack.dev/discord)
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

<p align="center">
  An interactive CLI to create a highly configurable, typesafe Expo app.
</p>

<p align="center">
  Get started by running <code>npx create-expo-stack@latest</code>

<p align="center">
  🎉 Over 50k Expo projects generated using CES! 🎉

## Sponsors

Support this project by <a href="https://github.com/sponsors/danstepanov" target="_blank">becoming a sponsor</a>. Your logo will show up here with a link to your website.

<a href="https://galaxies.dev/" target="_blank" style="margin-top: 10px;margin-right: 10px; margin-bottom: 10px;" >
  <img src="https://expostack.dev/galaxies-logo.svg"  style="border-radius: 50%;">
</a>
<a href="https://expo.dev/" target="_blank" style="margin: 10px;">
  <img src="https://expostack.dev/expo-logo.svg"  style="border-radius: 50%;">
</a>
<a href="https://paradigmpost.com" target="_blank" style="margin: 10px;">
  <img src="https://expostack.dev/paradigmpost.png" height="64" width="64" style="border-radius: 50%;">
</a>
<a href="https://github.com/4ndrs" target="_blank" style="margin: 10px;">
  <img src="https://avatars.githubusercontent.com/u/31898900?v=4" height="64" width="64" style="border-radius: 50%;">
</a>

## Past Sponsors

<a href="https://github.com/derkweijers" target="_blank" style="margin: 10px;">
  <img src="https://avatars.githubusercontent.com/u/11644998?v=4" height="64" width="64" style="border-radius: 50%;">
</a>

## Description

This CLI tool is designed to help you get started with React Native and Expo as quickly as possible. The CLI options allow you to configure your project with Typescript, file-based routing with Expo Router, configuration-based navigation via React-Navigation, styling with NativeWind, Restyle, StyleSheets, or Tamagui and authentication via Supabase or Firebase.

You can also use flags such as `--noInstall`, `--noGit`, and `--default` in order to customize your project. The CLI will attempt to automatically determine your package manager of choice but you can also pass in your preferred package manager via `--npm`, `--yarn`, `--pnpm`, or `--bun`. Roadmap coming soon...

## Usage

To get started, use npx to run the CLI tool. You will be prompted to opt into the features you want to use.

`npx create-expo-stack@latest`

<img src="https://github.com/roninoss/create-expo-stack/assets/5482800/e709dd66-cb9b-463c-91f9-b842bb80585c" />

## Tech Stack for the templates

Currently, all of the [templates](https://github.com/roninoss/create-expo-stack/tree/main/cli/src/templates) use the same versions of the following libraries. Not all of the templates include all of the libraries, but they are all available for use.

Each project is generated based on the results of the CLI, on a per-file basis. This approach makes this CLI extremely extendable and easy to use. Common files to all generated projects are stored in the [base template folder](https://github.com/roninoss/create-expo-stack/tree/main/cli/src/templates/base) while files pertaining to additional packages are stored in the [packages template folder](https://github.com/roninoss/create-expo-stack/tree/main/cli/src/templates/packages). Beyond adding files, this project makes use of [EJS](https://ejs.co/) in order to manipulate existing files as necessary.

| Library            | Category            | Version | Description                                    |
| ------------------ | ------------------- | ------- | ---------------------------------------------- |
| React Native       | Mobile Framework    | v0.74   | The best cross-platform mobile framework       |
| React              | UI Framework        | v18     | The most popular UI framework in the world     |
| TypeScript         | Language            | v5      | Static typechecking                            |
| React Navigation   | Navigation          | v6      | Performant and consistent navigation framework |
| Expo               | SDK                 | v51     | Allows (optional) Expo modules                 |
| Expo Font          | Custom Fonts        | v11     | Import custom fonts                            |
| Expo Linking       | URL Handling        | v5      | Open your app via a URL                        |
| Expo Router        | Navigation          | v3      | File-based routing in React-Native             |
| Expo Splash Screen | Splash Screen       | v0.18   | Custom splash screen                           |
| Expo Status Bar    | Status Bar Library  | v1      | Status bar support                             |
| Expo System UI     | System UI Library   | v2      | System UI support                              |
| Expo Web Browser   | Web Browser Library | v12     | Open links in the browser                      |
| NativeWind         | UI Framework        | v4.1    | Tailwind CSS for React Native                  |
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

### [See this guide.](https://github.com/roninoss/create-expo-stack/blob/main/contributing.md)

Contributions are welcome! Please open a pull request or an issue if you would like to contribute. There are existing feature requests labeled as `[FR]` in the issues section of this repo.

## Want to move faster? I can help 😎

Getting up-to-speed on a new framework can be cumbersome. If you find that you need to move more quickly, I may be available to help.

If you'd like help with your React Native/Expo app or are just looking for a technical advisor to guide you along your journey, [let's chat](https://twitter.com/danstepanov).

## Contributors ✨

Thanks go to these wonderful people:

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/danstepanov">
            <img src="https://avatars.githubusercontent.com/u/5482800?v=4" width="100;" alt="danstepanov"/>
            <br />
            <sub><b>Dan Stepanov</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/dannyhw">
            <img src="https://avatars.githubusercontent.com/u/3481514?v=4" width="100;" alt="dannyhw"/>
            <br />
            <sub><b>Daniel Williams</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/hqasmei">
            <img src="https://avatars.githubusercontent.com/u/39573679?v=4" width="100;" alt="hqasmei"/>
            <br />
            <sub><b>Hosna Qasmei</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/sammoore">
            <img src="https://avatars.githubusercontent.com/u/2035492?v=4" width="100;" alt="sammoore"/>
            <br />
            <sub><b>Sam Moore</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ernestoresende">
            <img src="https://avatars.githubusercontent.com/u/55156145?v=4" width="100;" alt="ernestoresende"/>
            <br />
            <sub><b>Ernesto Resende</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/PickleNik">
            <img src="https://avatars.githubusercontent.com/u/31113245?v=4" width="100;" alt="PickleNik"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/frankcalise">
            <img src="https://avatars.githubusercontent.com/u/374022?v=4" width="100;" alt="frankcalise"/>
            <br />
            <sub><b>Frank Calise</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ludwig-pro">
            <img src="https://avatars.githubusercontent.com/u/62896243?v=4" width="100;" alt="ludwig-pro"/>
            <br />
            <sub><b>Ludwig</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/mrzachnugent">
            <img src="https://avatars.githubusercontent.com/u/63797719?v=4" width="100;" alt="mrzachnugent"/>
            <br />
            <sub><b>Zach Nugent</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/alejorod">
            <img src="https://avatars.githubusercontent.com/u/6730160?v=4" width="100;" alt="alejorod"/>
            <br />
            <sub><b>Alejo Rodriguez</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/kratos-respawned">
            <img src="https://avatars.githubusercontent.com/u/87561983?v=4" width="100;" alt="kratos-respawned"/>
            <br />
            <sub><b>Gaurav Bhandari</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/finnbayer">
            <img src="https://avatars.githubusercontent.com/u/115630860?v=4" width="100;" alt="finnbayer"/>
            <br />
            <sub><b>Finn Bayer</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/saimon24">
            <img src="https://avatars.githubusercontent.com/u/2514208?v=4" width="100;" alt="saimon24"/>
            <br />
            <sub><b>Simon Grimm</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/todevmilen">
            <img src="https://avatars.githubusercontent.com/u/78319110?v=4" width="100;" alt="todevmilen"/>
            <br />
            <sub><b>Milen Todev</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/alitnk">
            <img src="https://avatars.githubusercontent.com/u/35243344?v=4" width="100;" alt="alitnk"/>
            <br />
            <sub><b>Alireza Zamani</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/catalinmiron">
            <img src="https://avatars.githubusercontent.com/u/2805320?v=4" width="100;" alt="catalinmiron"/>
            <br />
            <sub><b>Catalin Miron</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/coyksdev">
            <img src="https://avatars.githubusercontent.com/u/19565694?v=4" width="100;" alt="coyksdev"/>
            <br />
            <sub><b>Gerald</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Savinvadim1312">
            <img src="https://avatars.githubusercontent.com/u/16936043?v=4" width="100;" alt="Savinvadim1312"/>
            <br />
            <sub><b>Savin Vadim</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/b0iq">
            <img src="https://avatars.githubusercontent.com/u/106549013?v=4" width="100;" alt="b0iq"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/gabimoncha">
            <img src="https://avatars.githubusercontent.com/u/39256258?v=4" width="100;" alt="gabimoncha"/>
            <br />
            <sub><b>Gabimoncha</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/mwarger">
            <img src="https://avatars.githubusercontent.com/u/686823?v=4" width="100;" alt="mwarger"/>
            <br />
            <sub><b>Mat Warger</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/gialencar">
            <img src="https://avatars.githubusercontent.com/u/11895696?v=4" width="100;" alt="gialencar"/>
            <br />
            <sub><b>Gilson Alencar</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/andrew-levy">
            <img src="https://avatars.githubusercontent.com/u/29075740?v=4" width="100;" alt="andrew-levy"/>
            <br />
            <sub><b>Andrew Levy</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/AlejandroGutierrezB">
            <img src="https://avatars.githubusercontent.com/u/56408597?v=4" width="100;" alt="AlejandroGutierrezB"/>
            <br />
            <sub><b>Alejandro Gutierrez Barcenilla</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/debugtheworldbot">
            <img src="https://avatars.githubusercontent.com/u/62830430?v=4" width="100;" alt="debugtheworldbot"/>
            <br />
            <sub><b>Pipizhu</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bautistaaa">
            <img src="https://avatars.githubusercontent.com/u/3660667?v=4" width="100;" alt="bautistaaa"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/YounessHassoune">
            <img src="https://avatars.githubusercontent.com/u/36106440?v=4" width="100;" alt="YounessHassoune"/>
            <br />
            <sub><b>YOUNESS HASSOUNE</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Viraj-10">
            <img src="https://avatars.githubusercontent.com/u/66306233?v=4" width="100;" alt="Viraj-10"/>
            <br />
            <sub><b>Viraj Joshi</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Hacksore">
            <img src="https://avatars.githubusercontent.com/u/996134?v=4" width="100;" alt="Hacksore"/>
            <br />
            <sub><b>Sean Boult</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/salloom-domani">
            <img src="https://avatars.githubusercontent.com/u/76164955?v=4" width="100;" alt="salloom-domani"/>
            <br />
            <sub><b>Salloom</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/ralacerda">
            <img src="https://avatars.githubusercontent.com/u/19380403?v=4" width="100;" alt="ralacerda"/>
            <br />
            <sub><b>Renato Lacerda</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/imranbarbhuiya">
            <img src="https://avatars.githubusercontent.com/u/74945038?v=4" width="100;" alt="imranbarbhuiya"/>
            <br />
            <sub><b>Parbez</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/asapMaki">
            <img src="https://avatars.githubusercontent.com/u/30200380?v=4" width="100;" alt="asapMaki"/>
            <br />
            <sub><b>Mahir Kadić</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Joehoel">
            <img src="https://avatars.githubusercontent.com/u/31251240?v=4" width="100;" alt="Joehoel"/>
            <br />
            <sub><b>Joël Kuijper</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/zamplyy">
            <img src="https://avatars.githubusercontent.com/u/26258710?v=4" width="100;" alt="zamplyy"/>
            <br />
            <sub><b>Joar Karlsson</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/boek">
            <img src="https://avatars.githubusercontent.com/u/1250545?v=4" width="100;" alt="boek"/>
            <br />
            <sub><b>Jeff Boek</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/gwenoleR">
            <img src="https://avatars.githubusercontent.com/u/10418241?v=4" width="100;" alt="gwenoleR"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/claudesortwell">
            <img src="https://avatars.githubusercontent.com/u/41422239?v=4" width="100;" alt="claudesortwell"/>
            <br />
            <sub><b>Claude</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/falcoagustin">
            <img src="https://avatars.githubusercontent.com/u/15353019?v=4" width="100;" alt="falcoagustin"/>
            <br />
            <sub><b>Agustin Falco</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->

[downloads-image]: https://img.shields.io/npm/dm/create-expo-stack?color=364fc7&logoColor=364fc7
[npm-url]: https://www.npmjs.com/package/create-expo-stack
[npm-image]: https://img.shields.io/npm/v/create-expo-stack?color=0b7285&logoColor=0b7285
