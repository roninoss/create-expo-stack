import color from "picocolors";
import util from "util";

import { DEFAULT_STYLING_PACAKGE } from "../constants.js";

function generateStepsToRunProject(cliResults) {
  let step = 1;
  // if there is no styling package, add the stylesheet package
  const stylingPackage =
    cliResults.packages.find((p) => p.type === "styling") ||
    DEFAULT_STYLING_PACAKGE;
  let output = color.blue(`${step}. cd ${cliResults.projectName}\n`);
  if (cliResults.flags.packageManager === "npm") {
    output += color.blue(`${++step}. npm install\n`);
    if (
      stylingPackage.name === "unistyles" ||
      stylingPackage.name === "nativewindui"
    ) {
      output += color.blue(`${++step}. npx expo prebuild --clean\n`);
    }
    output += color.blue(`${++step}. npm run ios`);
  } else if (cliResults.flags.packageManager === "pnpm") {
    output += color.blue(`${++step}. pnpm install\n`);
    if (
      stylingPackage.name === "unistyles" ||
      stylingPackage.name === "nativewindui"
    ) {
      output += color.blue(`${++step}. pnpm expo prebuild --clean\n`);
    }
    output += color.blue(`${++step}. pnpm run ios`);
  } else if (cliResults.flags.packageManager === "bun") {
    output += color.blue(`${++step}. bun install\n`);
    if (
      stylingPackage.name === "unistyles" ||
      stylingPackage.name === "nativewindui"
    ) {
      output += color.blue(`${++step}. bun expo prebuild --clean\n`);
    }
    output += color.blue(`${++step}. bun run ios`);
  } else {
    output += color.blue(`${++step}. yarn install\n`);
    if (
      stylingPackage.name === "unistyles" ||
      stylingPackage.name === "nativewindui"
    ) {
      output += color.blue(`${++step}. yarn expo prebuild --clean\n`);
    }
    output += color.blue(`${++step}. yarn ios`);
  }
  return output;
}

export function printOutput(cliResults) {
  const stepsToRunProject = generateStepsToRunProject(cliResults);
  const authenticationPackage =
    cliResults.packages.find((p) => p.type === "authentication") || undefined;
  //	check if packages includes package with name "clerk"
  if (authenticationPackage && authenticationPackage.name === "clerk") {
    return `${color.green(`\nSuccess! 🎉  Now, here's what's next:`)}
    \n ${color.blue(
      "Head over to https://dashboard.clerk.dev to create a new Clerk project.",
    )}
    \n${color.blue(`Get the Clerk Publishable API Key:`)}
    \n1. Go to the API keys page in the Dashboard.
    \n2. Find your Publishable API Key on this page.
    \n3. Copy this key and paste it into your .env file.
    \n4. Optionally, follow one of these guides to get started with Clerk:
    \n${color.blue(`https://clerk.com/docs/quickstarts/expo`)}
    \n${color.green(
      `Once you're done, run the following to get started: `,
    )}\n\n${stepsToRunProject}
    `;
    //	check if packages includes package with name "supabase"
  } else if (
    authenticationPackage &&
    authenticationPackage.name === "supabase"
  ) {
    return `${color.green(`\nSuccess! 🎉  Now, here's what's next:`)}
    \n${color.blue(
      "Head over to https://database.new to create a new Supabase project.",
    )}
    \n${color.blue(`Get the Project URL and anon key from the API settings:`)}
    \n1. Go to the API settings page in the Dashboard.
    \n2. Find your Project URL, anon, and service_role keys on this page.
    \n3. Copy these keys and paste them into your .env file.
    \n4. Optionally, follow one of these guides to get started with Supabase:
    \n${color.blue(`https://docs.expo.dev/guides/using-supabase/#next-steps`)}
    \n${color.green(
      `Once you're done, run the following to get started: `,
    )}\n\n${stepsToRunProject}`;
  } else if (
    authenticationPackage &&
    authenticationPackage.name === "firebase"
  ) {
    return `\n${color.green(`\nSuccess! 🎉  Now, here's what's next:`)}
    \n${color.blue(
      "Head over to https://console.firebase.google.com/ to create a new Firebase project.",
    )}
    \n${color.blue(`Get the API key and other unique identifiers:`)}
    \n1. Register a web app in your Firebase project:
    \n${color.blue(`https://firebase.google.com/docs/web/setup#register-app`)};
    \n2. Find your API key and other identifiers.
    \n3. Copy these keys and paste them into your .env file.
    \n4. Optionally, follow one of these guides to get started with Firebase:
    \n${color.blue(`https://docs.expo.dev/guides/using-firebase/#next-steps`)}
    \n${color.green(
      `Once you're done, run the following to get started: `,
    )}\n\n${stepsToRunProject}`;
  } else {
    return `${color.green(
      `\nSuccess! 🎉  Now, just run the following to get started: `,
    )}\n\n${stepsToRunProject}`;
  }
}
