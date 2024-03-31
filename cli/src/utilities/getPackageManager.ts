import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { CliResults } from '../types';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
export type PackageManagerRunnerX = 'npx' | 'pnpx' | 'yarn dlx' | 'bunx';

export function getPackageManager(toolbox: Toolbox, cliResults: CliResults): PackageManager {
  const {
    parameters: { options }
  } = toolbox;

  if (options.npm) return 'npm';
  if (options.yarn) return 'yarn';
  if (options.pnpm) return 'pnpm';
  if (options.bun) return 'bun';

  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith('yarn')) {
      return 'yarn';
    } else if (userAgent.startsWith('pnpm')) {
      return 'pnpm';
    } else if (userAgent.startsWith('bun')) {
      return 'bun';
    } else {
      return 'npm';
    }
  } else {
    // If no user agent is set, assume npm
    return cliResults.flags.packageManager;
  }
}
export function getPackageManagerRunnerX(toolbox: Toolbox, cliResults: CliResults): PackageManagerRunnerX {
  const {
    parameters: { options }
  } = toolbox;

  if (options.npm) return 'npx';
  if (options.yarn) return 'yarn dlx';
  if (options.pnpm) return 'pnpx';
  if (options.bun) return 'bunx';

  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith('yarn')) {
      return 'yarn dlx';
    } else if (userAgent.startsWith('pnpm')) {
      return 'pnpx';
    } else if (userAgent.startsWith('bun')) {
      return 'bunx';
    } else {
      return 'npx';
    }
  } else {
    // Determine runner based on cliResults.flags.packageManager
    if (cliResults.flags.packageManager === 'yarn') return 'yarn dlx';
    if (cliResults.flags.packageManager === 'pnpm') return 'pnpx';
    if (cliResults.flags.packageManager === 'bun') return 'bunx';

    // If no user agent is set, assume npm
    return 'npx';
  }
}

export function getDefaultPackageManagerVersion() {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    return userAgent.split(' ')[0].split('/')[1];
  }
}
