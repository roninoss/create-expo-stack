// Translates the cliResults payload sent by the rn.new demo into
// create-expo-stack CLI arguments. Mirrors generateRerunScript in
// cli/src/commands/create-expo-stack.ts and generateRerunCommand in
// www/demo/steps/generateRerunCommand.js.

const PACKAGE_FLAGS = new Set([
  "expo-router",
  "react-navigation",
  "nativewind",
  "nativewindui",
  "unistyles",
  "stylesheet",
  "supabase",
  "firebase",
  "i18next",
  "zustand",
  "vexo-analytics",
]);

const PACKAGE_TYPES = new Set([
  "navigation",
  "styling",
  "authentication",
  "internationalization",
  "state-management",
  "analytics",
  "software-mansion",
]);

const NAVIGATION_TYPES = new Set(["stack", "tabs", "drawer + tabs"]);

// Keep in sync with nativewindUIOptions in cli/src/constants.ts
const NATIVEWINDUI_COMPONENTS = new Set([
  "action-sheet",
  "activity-indicator",
  "activity-view",
  "avatar",
  "button",
  "date-picker",
  "picker",
  "progress-indicator",
  "ratings-indicator",
  "slider",
  "text",
  "toggle",
]);

const PACKAGE_MANAGERS = new Set(["npm", "yarn", "pnpm", "bun"]);

const PROJECT_NAME_PATTERN = /^[a-zA-Z0-9._-]{1,64}$/;

export function validatePayload(payload) {
  if (typeof payload !== "object" || payload === null) {
    return "Request body must be a JSON object.";
  }

  if (
    typeof payload.projectName !== "string" ||
    !PROJECT_NAME_PATTERN.test(payload.projectName)
  ) {
    return "projectName must contain only letters, numbers, dots, dashes, and underscores (max 64 characters).";
  }

  if (!Array.isArray(payload.packages) || payload.packages.length > 10) {
    return "packages must be an array of at most 10 entries.";
  }

  for (const pkg of payload.packages) {
    if (typeof pkg !== "object" || pkg === null) {
      return "Each package must be an object.";
    }
    if (!PACKAGE_FLAGS.has(pkg.name)) {
      return `Unknown package: ${JSON.stringify(pkg.name).slice(0, 80)}`;
    }
    if (!PACKAGE_TYPES.has(pkg.type)) {
      return `Unknown package type: ${JSON.stringify(pkg.type).slice(0, 80)}`;
    }
    if (pkg.options?.type !== undefined && !NAVIGATION_TYPES.has(pkg.options.type)) {
      return `Unknown navigation type: ${JSON.stringify(pkg.options.type).slice(0, 80)}`;
    }
    if (pkg.options?.selectedComponents !== undefined) {
      if (!Array.isArray(pkg.options.selectedComponents)) {
        return "selectedComponents must be an array.";
      }
      // Drop components the current CLI no longer supports (e.g. old
      // payloads with selectable-text) instead of rejecting the request.
      pkg.options.selectedComponents = pkg.options.selectedComponents.filter(
        (c) => NATIVEWINDUI_COMPONENTS.has(c),
      );
    }
  }

  const packageManager = payload.flags?.packageManager;
  if (packageManager !== undefined && !PACKAGE_MANAGERS.has(packageManager)) {
    return `Unknown package manager: ${JSON.stringify(packageManager).slice(0, 80)}`;
  }

  return null;
}

export function buildCliArgs(payload) {
  const args = [payload.projectName];

  const nativewindUIPackage = payload.packages.find(
    (p) => p.name === "nativewindui",
  );

  if (nativewindUIPackage) {
    args.push("--nativewindui");

    const selectedComponents =
      nativewindUIPackage.options?.selectedComponents ?? [];

    if (selectedComponents.length === 0) {
      args.push("--blank");
    } else if (selectedComponents.length !== NATIVEWINDUI_COMPONENTS.size) {
      args.push(`--selected-components=${selectedComponents.join(",")}`);
    }

    const navigationPackage = payload.packages.find(
      (p) => p.type === "navigation",
    );

    // expo-router is applied automatically with nativewindui and stack is
    // the default navigation type, so only the other types need a flag
    if (navigationPackage?.options?.type === "tabs") {
      args.push("--tabs");
    } else if (navigationPackage?.options?.type === "drawer + tabs") {
      args.push("--drawer+tabs");
    }

    for (const p of payload.packages) {
      if (
        p.type === "state-management" ||
        p.type === "internationalization" ||
        p.type === "analytics" ||
        p.type === "software-mansion"
      ) {
        args.push(`--${p.name}`);
      }
    }
  } else {
    for (const p of payload.packages) {
      args.push(`--${p.name}`);
      if (p.type === "navigation") {
        if (p.options?.type === "tabs") {
          args.push("--tabs");
        } else if (p.options?.type === "drawer + tabs") {
          args.push("--drawer+tabs");
        }
      }
    }
  }

  const packageManager = payload.flags?.packageManager ?? "npm";
  if (packageManager !== "npm") {
    args.push(`--${packageManager}`);
  }

  // The zip is downloaded and installed on the user's machine, so the
  // server never installs dependencies or initializes git.
  args.push("--no-git", "--no-install");

  return args;
}
