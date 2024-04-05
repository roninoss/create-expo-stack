import color from "picocolors";
import util from "util";

import { DEFAULT_STYLING_PACAKGE } from "../constants.js";

export function printOutput(cliResults) {
  console.log("");
  console.log(color.blue("Your project configuration:"));
  console.log(
    `${util.inspect(cliResults, false, null, true /* enable colors */)}`,
  );

  const authenticationPackage =
    cliResults.packages.find((p) => p.type === "authentication") || undefined;
  //	check if packages includes package with name "supabase"
  if (authenticationPackage && authenticationPackage.name === "supabase") {
    console.log(color.green(`\nSuccess! 🎉 Now, here's what's next:`));
    console.log(``);
    console.log(
      color.blue(
        "Head over to https://database.new to create a new Supabase project.",
      ),
    );
    console.log(``);
    console.log(
      color.blue(`Get the Project URL and anon key from the API settings:`),
    );
    console.log(`1. Go to the API settings page in the Dashboard.`);
    console.log(
      `2. Find your Project URL, anon, and service_role keys on this page.`,
    );
    console.log(`3. Copy these keys and paste them into your .env file.`);
    console.log(
      `4. Optionally, follow one of these guides to get started with Supabase:`,
    );
    console.log(
      color.blue(`https://docs.expo.dev/guides/using-supabase/#next-steps`),
    );
    console.log(``);
    console.log(
      color.green(`Once you're done, run the following to get started: `),
    );
    console.log(``);
  } else if (
    authenticationPackage &&
    authenticationPackage.name === "firebase"
  ) {
    console.log(color.green(`\nSuccess! 🎉 Now, here's what's next:`));
    console.log(``);
    console.log(
      color.blue(
        "Head over to https://console.firebase.google.com/ to create a new Firebase project.",
      ),
    );
    console.log(``);
    console.log(color.blue(`Get the API key and other unique identifiers:`));
    console.log(`1. Register a web app in your Firebase project:`);
    console.log(
      color.blue(`https://firebase.google.com/docs/web/setup#register-app`),
    );
    console.log(`2. Find your API key and other identifiers.`);
    console.log(`3. Copy these keys and paste them into your .env file.`);
    console.log(
      `4. Optionally, follow one of these guides to get started with Firebase:`,
    );
    console.log(
      color.blue(`https://docs.expo.dev/guides/using-firebase/#next-steps`),
    );
    console.log(``);
    console.log(
      color.green(`Once you're done, run the following to get started: `),
    );
    console.log(``);
  } else {
    console.log(
      color.green("\nSuccess! 🎉 Now, just run the following to get started: "),
    );
    console.log(``);
  }
  let step = 1;
  // if there is no styling package, add the stylesheet package
  const stylingPackage =
    cliResults.packages.find((p) => p.type === "styling") ||
    DEFAULT_STYLING_PACAKGE;
  console.log(color.blue(`${step}. cd ${cliResults.projectName}`));
  if (cliResults.flags.packageManager === "npm") {
    console.log(color.blue(`${++step}. npm install`));
    if (stylingPackage.name === "unistyles") {
      console.log(color.blue(`${++step}. npx expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. npm run ios`));
  } else if (cliResults.flags.packageManager === "pnpm") {
    console.log(color.blue(`${++step}. pnpm install`));
    if (stylingPackage.name === "unistyles") {
      console.log(color.blue(`${++step}. pnpm expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. pnpm run ios`));
  } else if (cliResults.flags.packageManager === "bun") {
    console.log(color.blue(`${++step}. bun install`));
    if (stylingPackage.name === "unistyles") {
      console.log(color.blue(`${++step}. bun expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. bun run ios`));
  } else {
    console.log(color.blue(`${++step}. yarn install`));
    if (stylingPackage.name === "unistyles") {
      console.log(color.blue(`${++step}. yarn expo prebuild --clean`));
    }
    console.log(color.blue(`${++step}. yarn ios`));
  }
  console.log(``);
}
