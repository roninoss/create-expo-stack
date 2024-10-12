export const SITE = {
  title: "rn.new",
  description: "The most configurable way to create an Expo app.",
  defaultLanguage: "en",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "default-og-image.png",
    alt: "rn.new logo",
  },
  twitter: "onlydans",
};

export const KNOWN_LANGUAGES = {
  en: "English",
} as const;

export type KnownLanguageCode = keyof typeof KNOWN_LANGUAGES;

export const TWITTER_URL = `https://twitter.com/danstepanov`;

export const EDIT_URL = `https://github.com/roninoss/rn-new`;

export const COMMUNITY_INVITE_URL = `https://rn.new/discord`;

export const RN_NEW_URL = `https://rn.new/`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export type OuterHeaders =
  | "rn.new"
  | "Getting Started"
  | "Deployment"
  | "Usage";

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
  en: {
    "Getting Started": [
      { text: "Introduction", link: "en/introduction" },
      { text: "Installation", link: "en/installation" },
    ],
  },
};

export const SIDEBAR_HEADER_MAP: Record<
  KnownLanguageCode,
  Record<OuterHeaders, string>
> = {
  en: {
    "rn.new": "rn.new",
    "Getting Started": "rn.new",
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
