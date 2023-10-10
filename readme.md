# Create Expo Stack CLI

<a href="https://badge.fury.io/js/create-expo-stack"><img src="https://badge.fury.io/js/create-expo-stack.svg" alt="npm version" height="18"></a>

## Description

This CLI tool is designed to help you get started with React Native and Expo as quickly as possible. The CLI options allow you to configure your project with Typescript, file-based routing with Expo Router, pure React-Navigation, and/or Tailwind CSS with NativeWind.

You can also use flags such as `--noInstall`, `--noGit`, and `--default` in order to customize your project. The CLI will attempt to automatically determine your package manager of choice but you can also pass in your preferred package manager via `--npm`, `--yarn`, or `pnpm`. Roadmap coming soon...

## Usage

To get started, use npx to run the CLI tool. You will be prompted to opt into the features you want to use.

`npx create-expo-stack@latest`

<img src="https://github.com/danstepanov/create-expo-stack/assets/5482800/6c4b5a00-63ae-4b3d-af0b-6da805e8c547" />

## Tech Stack for the templates

Currently, all of the [templates](https://github.com/danstepanov/create-expo-stack/tree/main/src/templates) use the same versions of the following libraries. Not all of the templates include all of the libraries, but they are all available for use.

Each project is generated based on the results of the CLI, on a per-file basis. This approach makes this CLI extremely extendable and easy to use. Common files to all generated projects are stored in the [base template folder](https://github.com/danstepanov/create-expo-stack/tree/main/src/templates/base) while files pertaining to additional packages are stored in the [packages template folder](https://github.com/danstepanov/create-expo-stack/tree/main/src/templates/packages). Beyond adding files, this project makes use of [EJS](https://ejs.co/) in order to manipulate existing files as necessary.

| Library            | Category            | Version | Description                                    |
| ------------------ | ------------------- | ------- | ---------------------------------------------- |
| React Native       | Mobile Framework    | v0.72   | The best cross-platform mobile framework       |
| React              | UI Framework        | v18     | The most popular UI framework in the world     |
| TypeScript         | Language            | v4      | Static typechecking                            |
| React Navigation   | Navigation          | v6      | Performant and consistent navigation framework |
| Expo               | SDK                 | v49     | Allows (optional) Expo modules                 |
| Expo Font          | Custom Fonts        | v11     | Import custom fonts                            |
| Expo Linking       | URL Handling        | v5      | Open your app via a URL                        |
| Expo Router        | Navigation          | v2      | File-based routing in React-Native             |
| Expo Splash Screen | Splash Screen       | v0.18   | Custom splash screen                           |
| Expo Status Bar    | Status Bar Library  | v1      | Status bar support                             |
| Expo System UI     | System UI Library   | v2      | System UI support                              |
| Expo Web Browser   | Web Browser Library | v12     | Open links in the browser                      |
| NativeWind         | UI Framework        | v2      | Tailwind CSS for React Native                  |
| Safe Area Context  | Safe Area Library   | v4      | Safe area support                              |
| React Native Web   | Web Support         | v0.19   | React Native for Web                           |

## Reporting Bugs & Feedback

If you run into problems or have feedback, first search the issues and discussions in this repository. If you don't find anything, feel free to message me on [Twitter](https://twitter.com/danstepanov) or open a new issue.

## Contributing

Contributions are welcome! Please open a pull request or an issue if you would like to contribute. There are existing feature requests labeled as `[FR]` in the issues section of this repo.

## Want to move faster? I can help 😎

Getting up-to-speed on a new framework can be cumbersome. If you find that you need to move more quickly, I may be available to help.

If you'd like help with your React Native/Expo app or are just looking for a technical advisor to guide you along your journey, [let's chat](https://twitter.com/danstepanov).

## Contributors ✨

Thanks go to these wonderful people:

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://onlydans.gg/">
          <img src="https://pbs.twimg.com/profile_images/1689473757713514496/8fQrCrBx_400x400.jpg" width="100px;" alt="Dan Stepanov"/>
          <br />
          <sub>
            <b>Dan Stepanov</b>
          </sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://twitter.com/trashh_dev">
          <img src="https://pbs.twimg.com/profile_images/1694518037385244672/eaS0RTwB_400x400.jpg" width="100px;" alt="PickleNik"/>
          <br />
          <sub>
            <b>PickleNik</b>
          </sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://twitter.com/trashh_dev">
          <img src="https://pbs.twimg.com/profile_images/1598959528518643713/aWdwBYxv_400x400.jpg" width="100px;" alt="Chris Bautista"/>
          <br />
          <sub>
            <b>Chris Bautista</b>
          </sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://aodhan.netlify.app/">
          <img src="https://pbs.twimg.com/profile_images/1472990183993888772/3X5J4d9__400x400.png" width="100px;" alt="Aodhan Hamilton"/>
          <br />
          <sub>
            <b>Aodhan Hamilton</b>
          </sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>
