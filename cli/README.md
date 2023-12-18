# Create Expo Stack CLI

[![Discord](https://img.shields.io/discord/1173879003191459860?color=%235865F2&label=Discord&logo=discord&logoColor=%23fff)](https://expostack.dev/discord) [![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

<p align="center">
  An interactive CLI to create a highly configurable, typesafe Expo app.
</p>

<p align="center">
  Get started by running <code>npx create-expo-stack</code>

## Sponsors

Support this project by <a href="https://github.com/sponsors/danstepanov" target="_blank">becoming a sponsor</a>. Your logo will show up here with a link to your website. 

<a href="https://galaxies.dev/" target="_blank" style="margin-top: 10px;margin-right: 10px; margin-bottom: 10px;" ><img src="https://expostack.dev/galaxies-logo.svg"  style="border-radius: 50%;"></a> <a href="https://expo.dev/" target="_blank" style="margin: 10px;"><img src="https://expostack.dev/expo-logo.svg"  style="border-radius: 50%;"></a>
 

## Description

This CLI tool is designed to help you get started with React Native and Expo as quickly as possible. The CLI options allow you to configure your project with Typescript, file-based routing with Expo Router, configuration-based navigation via React-Navigation, styling with StyleSheets, Tamagui, or NativeWind, and authentication via Supabase or Firebase.

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
| Tamagui            | UI Framework        | v1      | Universal UI with a smart optimizing compiler  |
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

<table>
	<tbody>
		<tr>
			<td align="center" valign="top" width="14.28%">
				<a href="https://onlydans.gg/">
					<img src="https://pbs.twimg.com/profile_images/1689473757713514496/8fQrCrBx_400x400.jpg" width="100px;" alt="Dan Stepanov"/>
					<br />
					Dan Stepanov
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://twitter.com/ernestodotgg">
					<img src="https://pbs.twimg.com/profile_images/1647055447931617285/RPeZJI3z_400x400.jpg" width="100px;" alt="Ernesto Resende"/>
					<br />
					Ernesto Resende
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://github.com/hqasmei">
					<img src="https://avatars.githubusercontent.com/u/39573679?v=4" width="100px;" alt="Hosna Qasmei"/>
					<br />
					Hosna Qasmei
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://github.com/frankcalise/">
					<img src="https://pbs.twimg.com/profile_images/1262363198839238662/uIfRNVBY_400x400.jpg" width="100px;" alt="Frank Calise"/>
					<br />
					Frank Calise
				</a>
			</td>
		</tr>
		<tr>
			<td align="center" valign="top" width="14.28%">
				<a href="https://github.com/sammoore">
					<img src="https://avatars.githubusercontent.com/u/2035492?v=4" width="100px;" alt="Sam Moore"/>
					<br />
					Sam Moore
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://twitter.com/mironcatalin">
					<img src="https://avatars.githubusercontent.com/u/2805320?v=4" width="100px;" alt="Catalin Miron"/>
					<br />
					Catalin Miron
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://twitter.com/PickleNik0864">
					<img src="https://pbs.twimg.com/profile_images/1694518037385244672/eaS0RTwB_400x400.jpg" width="100px;" alt="catalinmiron"/>
					<br />
					PickleNik
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://twitter.com/trashh_dev">
					<img src="https://pbs.twimg.com/profile_images/1598959528518643713/aWdwBYxv_400x400.jpg" width="100px;" alt="Chris Bautista"/>
					<br />
					Chris Bautista
				</a>
			</td>
		</tr>
		<tr>
			<td align="center" valign="top" width="14.28%">
				<a href="https://twitter.com/hugemathguy">
					<img src="https://pbs.twimg.com/profile_images/1503470123763617796/49xDaART_400x400.jpg" width="100px;" alt="Andrew Levy"/>
					<br />
					Andrew Levy
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://twitter.com/alire74_">
					<img src="https://pbs.twimg.com/profile_images/1680836863026765824/lrljy0sl_400x400.jpg" width="100px;" alt="Ali Zamani"/>
					<br />
					Ali Zamani
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://github.com/saimon24">
					<img src="https://avatars.githubusercontent.com/u/2514208?v=4" width="100px;" alt="Simon Grimm"/>
					<br />
					Simon Grimm
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://twitter.com/mwarger">
					<img src="https://avatars.githubusercontent.com/u/686823?v=4" width="100px;" alt="Mat Warger"/>
					<br />
					Mat Warger
				</a>
			</td>
		</tr>
		<tr>
			<td align="center" valign="top" width="14.28%">
				<a href="https://github.com/kratos-respawned">
					<img src="https://avatars.githubusercontent.com/u/87561983?v=4" width="100px;" alt="kratos-respawned"/>
					<br />
					Gaurav Bhandari
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://github.com/b0iq">
					<img src="https://avatars.githubusercontent.com/u/106549013?v=4" width="100px;" alt="b0iq"/>
					<br />
					b0iq
				</a>
			</td>
			<td align="center" valign="top" width="14.28%">
				<a href="https://aodhan.netlify.app/">
					<img src="https://pbs.twimg.com/profile_images/1472990183993888772/3X5J4d9__400x400.png" width="100px;" alt="Aodhan Hamilton"/>
					<br />
					Aodhan Hamilton
				</a>
			</td>
		</tr>
	</tbody>
</table>

[downloads-image]: https://img.shields.io/npm/dm/create-expo-stack?color=364fc7&logoColor=364fc7
[npm-url]: https://www.npmjs.com/package/create-expo-stack
[npm-image]: https://img.shields.io/npm/v/create-expo-stack?color=0b7285&logoColor=0b7285
