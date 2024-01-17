export const SITE = {
  title: "Create Expo Stack",
  description: "The most configurable way to create an Expo app.",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "images/og-image.png",
    alt: "Create Expo Stack: The best way to start a full-stack, typesafe Next.js app.",
  },
  twitter: "onlydans",
};

export const GITHUB_EDIT_URL = `https://github.com/danstepanov/create-expo-stack/tree/main/www`;

export const COMMUNITY_INVITE_URL = `https://discord.gg/XS9qS2mvTR`;

export const DOCS_URL = `https://docs.createexpostack.com/`;

export const MAIN_URL = `https://createexpostack.com/`;

export const SPONSORS = [
  {
    id: 1,
    name: "Galaxies.dev",
    html_url: "https://galaxies.dev/",
    image_url: "/galaxies-logo.svg",
  },
  {
    id: 2,
    name: "Expo",
    html_url: "https://expo.dev/",
    image_url: "/expo-logo.svg",
  },
];

export const CONTRIBUTORS = [
  {
    login: "danstepanov",
    id: 5482800,
    avatar_url: "https://avatars.githubusercontent.com/u/5482800?v=4",
    html_url: "https://github.com/danstepanov",
  },
  {
    login: "ernestoresende",
    id: 55156145,
    avatar_url: "https://avatars.githubusercontent.com/u/55156145?v=4",
    html_url: "https://github.com/ernestoresende",
  },
  {
    login: "hqasmei",
    id: 39573679,
    avatar_url: "https://avatars.githubusercontent.com/u/39573679?v=4",
    html_url: "https://github.com/hqasmei",
  },
  {
    login: "frankcalise",
    id: 374022,
    avatar_url: "https://avatars.githubusercontent.com/u/374022?v=4",
    html_url: "https://github.com/frankcalise",
  },
  {
    login: "sammoore",
    id: 2035492,
    avatar_url: "https://avatars.githubusercontent.com/u/2035492?v=4",
    html_url: "https://github.com/sammoore",
  },
  {
    login: "catalinmiron",
    id: 2805320,
    avatar_url: "https://avatars.githubusercontent.com/u/2805320?v=4",
    html_url: "https://github.com/catalinmiron",
  },
  {
    login: "PickleNik0864",
    id: 31113245,
    avatar_url: "https://avatars.githubusercontent.com/u/31113245?v=4",
    html_url: "https://twitter.com/PickleNik0864",
  },
  {
    login: "bautistaaa",
    id: 3660667,
    avatar_url: "https://avatars.githubusercontent.com/u/3660667?v=4",
    html_url: "https://github.com/bautistaaa",
  },
  {
    login: "hugemathguy",
    id: 29075740,
    avatar_url: "https://avatars.githubusercontent.com/u/29075740?v=4",
    html_url: "https://twitter.com/hugemathguy",
  },
  {
    login: "alitnk",
    id: 35243344,
    avatar_url: "https://avatars.githubusercontent.com/u/35243344?v=4",
    html_url: "https://github.com/alitnk",
  },
  {
    login: "saimon24",
    id: 2514208,
    avatar_url: "https://avatars.githubusercontent.com/u/2514208?v=4",
    html_url: "https://github.com/saimon24",
  },
  {
    login: "mwarger",
    id: 686823,
    avatar_url: "https://avatars.githubusercontent.com/u/686823?v=4",
    html_url: "https://twitter.com/mwarger",
  },
  {
    login: "kratos-respawned",
    id: 87561983,
    avatar_url: "https://avatars.githubusercontent.com/u/87561983?v=4",
    html_url: "https://github.com/kratos-respawned",
  },
  {
    login: "b0iq",
    id: 106549013,
    avatar_url: "https://avatars.githubusercontent.com/u/106549013?v=4",
    html_url: "https://github.com/b0iq",
  },
  {
    login: "MVAodhan",
    id: 69143973,
    avatar_url: "https://avatars.githubusercontent.com/u/69143973?v=4",
    html_url: "https://github.com/MVAodhan",
  },
  {
    login: "finnbayer",
    id: 115630860,
    avatar_url: "https://avatars.githubusercontent.com/u/115630860?v=4",
    html_url: "https://github.com/finnbayer",
  },
  {
    login: "todevmilen",
    id: 78319110,
    avatar_url: "https://avatars.githubusercontent.com/u/78319110?v=4",
    html_url: "https://github.com/todevmilen",
  },
  {
    login: "gialencar",
    id: 11895696,
    avatar_url: "https://avatars.githubusercontent.com/u/11895696?v=4",
    html_url: "https://github.com/gialencar",
  },
  {
    login: "joehoel",
    id: 31251240,
    avatar_url: "https://avatars.githubusercontent.com/u/31251240?v=4",
    html_url: "https://github.com/Joehoel",
  },
];

export const AUTHORS = [
  {
    name: "Ansh Nanda",
    position: "Software Engineer at Bluesky",
    image: "images/ansh.jpeg",
    alt: "ansh",
    testimonial:
      "This is great! I've been using this for a ton of proof of concept applications. This serves my needs better than using create-expo-app.",
  },
  {
    name: "Yefim Vedernikoff",
    position: "Software Engineer at Partiful",
    image: "images/yefim.jpeg",
    alt: "yefim",
    testimonial:
      "Thanks for building create-expo-stack! It's helped our team to quickly spin up apps and test various modules prior to adding them to our production application.",
  },
  {
    name: "Agustín Falco",
    position: "Software Engineer at Vercel",
    image: "images/agustin.jpeg",
    alt: "agustin",
    testimonial: "I’ve been checking out create-expo-stack! Very nice!!",
  },
  {
    name: "nexxel",
    position: "Software Engineer at Dimension",
    image: "images/nexxel.jpeg",
    alt: "nexxel",
    testimonial: "Building a mobile app soon, def will use create-expo-stack!",
  },
];

export const KNOWN_LANGUAGES = {
  en: "English",
} as const;

export type KnownLanguageCode = keyof typeof KNOWN_LANGUAGES;

// This is the type of the frontmatter you put in the docs markdown files.
export interface Frontmatter {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: "ltr" | "rtl";
  ogLocale?: string;
  lang?: KnownLanguageCode;
  isMdx?: boolean;
}

export type OuterHeaders = "Getting Started" | "Deployment" | "Usage";

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
    "Getting Started": "Create Expo Stack",
    Usage: "Usage",
    Deployment: "Deployment",
  },
};
