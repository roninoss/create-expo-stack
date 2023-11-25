---
title: Installation
description: Installation instructions for Create Expo Stack
---

```bash
npx create-expo-stack@latest
```

## Advanced usage

| Option/Flag     | Description                                                             |
| --------------  | ----------------------------------------------------------------------- |
| `--npm`         | Selects npm to be your package manager                                  |
| `--yarn`        | Selects yarn to be your package manager                                 |
| `--pnpm`        | Selects pnpm to be your package manager                                 |
| `--bun`         | Selects bun to be your package manager                                  |
| `--noGit`       | Explicitly tell the CLI to not initialize a new git repo in the project |
| `--default`     | Bypass the CLI and bootstrap a new create-expo-stack with all options selected     |
| `--noInstall`   | Generate project without installing dependencies                        |
| `--importAlias` | Enable TypeScript path aliases                                          |

## Example
The following would scaffold a Create Expo Stack App with pnpm and no git.
```bash
npx create-expo-stack@latest --pnpm --noGit
```
