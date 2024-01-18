# Welcome to the Expo Stack contributing guide

Thank you for investing your time to contribute to Create Expo Stack!

In this guide, you will get an overview of the contribution workflow from opening an issue to creating, reviewing, and merging a PR.

## New contributor guide

Use this documentation and [](https://link.excalidraw.com/l/398AFcdY0wd/1GY4R99h31c) to gain an understanding of how Create Expo Stack works and how to contribute to the project.

## What can I contribute to?

Before delving deeper on the collaborarion worflow, let's talk about what kind of contributions can be made. Make sure to refer to this [architectural diagram](https://link.excalidraw.com/l/398AFcdY0wd/1GY4R99h31c) to understand how the CLI, installers and template scaffolding works in `create-expo-stack`.

There are three main things you can usually contribute to:

- **Docs**: Anything that would improve the documentation for Expo Stack (typo corrections, fact checking, benchmarks, updates, and/or guides).

- **CLI**: If you would like to add a currently unsupported feature (a new styling library, auth providers, and/or a new CLI flag), you'll probably be submitting a new template, generator, and/or new CLI prompts.

> Keep in mind, that you should not change the underlying dependencies that handle a specific part of the stack (eg.: you should not change an existing template for a configuration you are trying to introduce as it may have downstream effects on any existing configurations).

- **Landing page**: Occasionally, the [landing page](https://expostack.dev) needs to be updated with new testimonials, a new terminal recording, and/or new configurations that we support.

- **Bug fixes/reports**: If you think you've found a bug or some unexpected behavior in the CLI application or the scaffolded apps, you're welcome to raise an issue and/or PR with a bug description and/or fix.

Ideas for improving the overall architecture of the CLI app are always be welcome, but we ask that you raise an issue and/or a discussion with an overview of the proposed ideas first, in order to ensure a proper debate over the proposal.

Be sure to follow the templates for new issues and pull requests, when applicable.

## Contribution workflow

This project uses Bun, and should be run with Node.js on the latest available LTS version. Ensure you have them properly setup on your development environment before continuing.

### Forking and cloning

For external contributors, the best way to make changes to the project is to fork the repository and clone it locally:

1. Fork the repository to your GitHub account: https://github.com/danstepanov/create-expo-stack/fork

2. Clone the forked repository locally:

```shell
$ git clone https://github.com/<YOUR_GITHUB_USERNAME>/create-expo-stack

$ cd create-expo-stack
```

3. Checkout on a new branch, and start adding your changes:

```shell
git checkout -b <BRANCH_NAME>
```

When you're ready to submit your changes, push your branch to your forked repository and open a pull request against the `main` branch of the source repository.

From here, you can run `bun install` to install all the dependencies for the project.

### Directory structure

The Expo Stack homepage and documentation source-code can be found in the `/www` and `/docs` directories, respectively. The create-expo-stack application can be found in the `/cli` directory.

Install all the workspace dependencies with: `bun install` on the project root.

To quickly run the documentation website after installing all dependencies:

```shell
$ cd docs
$ bun start
```

To quickly run the landing page website after installing all dependencies:

```shell
$ cd www
$ bun start
```

<!-- To quickly setup `create-expo-stack` for local testing, you'll need to link a local version to run on your machine: -->

### Running the CLI from the global executable

To quickly setup `create-expo-stack` for local testing, it's recommended that you use the linking feature from package managers to create a global exectutable of the package:

```shell
$ cd cli
$ bun run build

# NPM linking
$ npm link

# Yarn linking
$ yarn link

# PNPM linking
$ pnpm link --global
```

After linking, make sure to restart the terminal session or resource the shell profile. Ex.: `source ~/.zshrc`.

You can check that the linking was performed correctly with `which create-expo-stack`, which should return the path to the global executable. If this returns `create-expo-stack not found`, this means that the linking has either failed, or you have a misconfigure `PATH` variable for your package manager's global installs.

```shell
$ which create-expo-stack
# Example, linked with PNPM on macOS.: /Users/<username>/Library/pnpm/create-expo-stack
```

Now you can run your own local version of create-expo-stack via `create-expo-stack`, anywhere on your machine. Here is the format for running a CLI command:

```shell
$ create-expo-stack <PROJECT_NAME> <OPTIONS>
```

> Note: Linking via Bun is not possible. While Bun does provide a linking feature ([see here](https://bun.sh/docs/cli/link)), it does not seem to expose the executable binary like the other three package managers. If you know how to do this, please let us know!

From here, any changes to the `/cli` source-code will reflect the behavior of the `create-expo-stack` binary. We recommend that you set up a `create-expo-stack-apps` directory (or a similar directory) where you can securely scaffold expo apps and test prompt combinations.

### Make your changes

Once you've made your changes and tested that it works locally, run the tests using `bun test` in the `/cli` directory. You should also add a test to cover your own contribution, if relevant. These tests take a while to run (we're working on this).

If your changes alter and/or add to the behavior of the `create-expo-stack` CLI, or fixes a bug in it, then we encourage you to also create a **changeset**. A changeset is a quick summary that expresses the intention to bump the version of the package. This is used by our CI in order to automatically manage releases to NPM.

To introduce a new changeset, run:

```shell
bun run changeset
```

This will prompt you for the kind of version bump your changes introduce (`patch`, `minor`, `major`), and for a quick summary of your changes. If the change is small enough, it is valid to just replicate the contents of your commit message. If it's more complex, the changeset summary (generated in the root `.changeset` directory) can be edited to include more information.

The generated changeset file should be included in your commit. That way, when the new version releases, you will be properly credited on GitHub's release page and in the project's changelog.

> [!NOTE]
> If you're not sure what kind of version bump your changes introduce, you can reach out to one of the maintainers in the PR comments and we'll try to help you out!

> [!NOTE]
> If you're running into an error regarding the `lint-staged` script not being included or require of ES module (ERR_REQUIRE_ESM) while trying to commit your changes, please run `bun upgrade && bun i` and try again.

If you've provided the relevant changeset summaries and the tests pass, then you can open a PR against the `main` branch of the source repo.

> **_TODO:_** Add template for pull requests and issues

## CLI project structure

### Tests (`./__tests__`)

- Tests to check every iteration of the CLI, using every kind of package manager
- [These aren't perfect atm](https://github.com/danstepanov/create-expo-stack/issues/18)

### Commands (`./cli/src/commands`)

- There is currently only one command, `create-expo-stack`. The function representing this command roughly breaks down into the following steps:
  1. Show the “help” view if that option was passed in
  2. Render the ASCII art title
  3. Set the default CLI options
  4. Check for options passed in that would skip the CLI prompts, such as:
  - User wants to use an opinionated stack like Ignite
  - User wants to use the default configuration
  - User wants to initialize a blank typescript template
  - User wants to run in non-interactive mode
    - Running the tests for create-expo-stack uses non-interactive mode
  5. Run the CLI prompts (optional)
     - Return object that conveys user specifications, overwriting default CLI options
  6. Assign project name based on whether user passed one in
  7. Assign packages based on CLI results
  8. Assign relevant variables to be passed to EJS files based on user specified configurations
  9. Configure project files
  - Represented by `configureProjectFiles.ts` in `./cli/src/utilities/`
  - Add the base project files as well as any additional project-dependent files based on user specifications
  10. Generate project
  - Represented by `generateProjectFiles.ts` in `./cli/src/utilities/`
  - Using the files from step (9), the variables from step (8), and the CLI results, generate the Expo project
  11. Print results of CLI

### Templates (`./cli/src/templates`)

- Collection of EJS files to be modified, as necessary, and converted to .ts files during the file configuration process.
- Directories
  - Base
    - Contains base files included in all Expo projects
  - Packages
    - Contains files pertaining to specific configurations

### Utilities (`./cli/src/utilities`)

- An assortment of helper functions and abstracted chunks of functionality to support the `create-expo-stack` command.

### Entry point (`./cli/src/cli.ts`)

- Entry point for create-expo-stack

### Constants

- Constant values used throughout the codebase, including default configurations.

### Types (`./cli/src/types.ts`)

- Assorted types

### Unused directories or ones you should not pay attention to

- `./cli/src/docs`
- `./.github`

## Debugging

When debugging, it can be useful to place a console log of the error in the the try catch block of `./cli/src/commands/create-expo-stack.ts`. This should give you a hint as to what is going wrong.
