# Contribute to create-expo-stack

## Visual Diagram

Use this documentation and [this Excalidraw diagram](https://link.excalidraw.com/l/398AFcdY0wd/1GY4R99h31c) to gain an understanding of how create-expo-stack works and how to contribute to the project.

## Initial Setup

### Fork and clone the repo

- [GitHub Repo](https://github.com/danstepanov/create-expo-stack)
 
### Navigate to repo

```shell
cd create-expo-stack
```

### Install dependencies

```shell
yarn
```

### Symlink the local path to use for local testing

```shell
yarn link
```

Now you can run your own local version of create-expo-stack via `create-expo-stack`, anywhere on your machine. Here is the format for running a CLI command:

```shell
create-expo-stack <PROJECT_NAME> --options
```

### Make your changes

Once you've made your changes and tested that it works locally, run the tests using `yarn test` in the root of the directory. You should also add a test to cover your own contribution. These tests take a while to run. If those pass, then you can open a PR against the `main` branch of the source repo.

> **_TODO:_** Add template for Pull Requests

## Project Structure

### Tests (./\__tests__)
* Tests to check every iteration of the CLI, using every kind of package manager
* [These aren't perfect atm](https://github.com/danstepanov/create-expo-stack/issues/18)


### Commands (./src/commands)
* There is currently only one command, `create-expo-stack`. The function representing this command roughly breaks down into the following steps:
    1) Show the “help” view if that option was passed in
    2) Render the ASCII art title
    3) Set the default CLI options
    4) Check for options passed in that would skip the CLI prompts, such as:
    * User wants to use an opinionated stack like Ignite
    * User wants to use the default configuration
    * User wants to initialize a blank typescript template
    * User wants to run in non-interactive mode
        * Running the tests for create-expo-stack uses non-interactive mode
    5) Run the CLI prompts (optional)
        * Return object that conveys user specifications, overwriting default CLI options
    6) Assign project name based on whether user passed one in
    7) Assign packages based on CLI results
    8) Assign relevant variables to be passed to EJS files based on user specified configurations
    9) Configure project files
    * Represented by `configureProjectFiles.ts` in `./src/utilities/`
    * Add the base project files as well as any additional project-dependent files based on user specifications
    10) Generate project
    * Represented by `generateProjectFiles.ts` in `./src/utilities/`
    * Using the files from step (9), the variables from step (8), and  the CLI results, generate the Expo project
    11) Print results of CLI 

### Extensions (./src/extensions)
* Not relevant, to be removed

### Templates (./src/templates)
* Collection of EJS files to be modified, as necessary, and converted to .ts files during the file configuration process.
* Directories
    * Base
        * Contains base files included in all Expo projects
    * Packages
        * Contains files pertaining to specific configurations

### Utilities (./src/utilities)
* An assortment of helper functions and abstracted chunks of functionality to support the `create-expo-stack` command.

### Entry point (./src/cli.ts)
* Entry point for create-expo-stack

### Constants
* Constant values used throughout the codebase, including default configurations.

### Types (./src/types.ts)
* Assorted types

### Unused directories or ones you should not pay attention to
* ./src/docs
* ./src/bin
* ./.github
