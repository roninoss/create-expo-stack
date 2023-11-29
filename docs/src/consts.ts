export const SITE = {
  title: "Create Expo Stack",
  description: "The most configurable way to create an Expo app.",
  defaultLanguage: "en",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "default-og-image.png",
    alt: "create expo stack logo",
  },
  twitter: "onlydans",
};

export const KNOWN_LANGUAGES = {
  en: "English",
} as const;

export type KnownLanguageCode = keyof typeof KNOWN_LANGUAGES;

export const EDIT_URL = `https://github.com/danstepanov/create-expo-stack/tree/main/docs`;

export const COMMUNITY_INVITE_URL = `https://discord.gg/XS9qS2mvTR`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export type OuterHeaders = "Create Expo Stack" | "Deployment" | "Usage";

export interface SidebarItem<
  TCode extends KnownLanguageCode = KnownLanguageCode,
> {
  text: string;
  link: `${TCode}/${string}`;
}

export type SidebarItemLink = SidebarItem["link"];

export type Sidebar = {
  [TCode in KnownLanguageCode]: {
    [THeader in OuterHeaders]?: SidebarItem<TCode>[];
  };
};
export const SIDEBAR: Sidebar = {
  // For Translations:
  // Keep the "outer headers" in English so we can match them.
  // Translate the "inner headers" to the language you're translating to.
  // Omit any files you haven't translated, they'll fallback to English.
  // Example:
  // sv: {
  //   "Create Expo Stack": [
  //     { text: "Introduktion", link: "sv/introduction" },
  //     { text: "Installation", link: "sv/installation" },
  //   ],
  //   Usage: [{ text: "Miljövariabler", link: "sv/usage/env-variables" }],
  // },
  en: {
    "Create Expo Stack": [
      { text: "Getting Started", link: "en/getting-started" },
      { text: "Installation", link: "en/installation" },
      { text: "Folder Structure", link: "en/folder-structure" },
    ],
    Usage: [
      // { text: "First Steps", link: "en/usage/first-steps" },
      { text: "NativeWind", link: "en/usage/nativewind" },
      { text: "Expo Router", link: "en/usage/expo-router" },
      { text: "React Navigation", link: "en/usage/react-navigation" },
      { text: "Tamagui", link: "en/usage/tamagui" },
      { text: "Supabase", link: "en/usage/supabase" },
      { text: "Firebase", link: "en/usage/firebase" },
    ],
  },
};

export const SIDEBAR_HEADER_MAP: Record<
  KnownLanguageCode,
  Record<OuterHeaders, string>
> = {
  en: {
    "Create Expo Stack": "Create Expo Stack",
    Usage: "Usage",
    Deployment: "Deployment",
  },
  // Translate the sidebar's "outer headers" here
  // sv: {
  //   "Create Expo Stack": "Create Expo Stack",
  //   Usage: "Användarguide",
  //   Deployment: "Deployment",
  // },
};
