import { Toolbox } from "gluegun/build/types/domain/toolbox";

export type PackageManager = "npm" | "pnpm" | "yarn";

// Taken directly from the T3 codebase
export function getPackageManager(toolbox: Toolbox): PackageManager {
  const {
    parameters: { options },
  } = toolbox;

  if (options.npm) return 'npm';
  if (options.yarn) return 'yarn';
  if (options.pnpm) return 'pnpm';

  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
      // TODO: Add support for bun
      // } else if (userAgent.startsWith("bun")) {
      //   return "bun";
    } else {
      return "npm";
    }
  } else {
    // If no user agent is set, assume npm
    return "npm";
  }
};