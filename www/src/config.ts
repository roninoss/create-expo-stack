export const SITE = {
  title: "rn.new",
  description: "The most configurable way to create an Expo app.",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "images/og-image.png",
    alt: "rn.new: The most configurable way to create an Expo app.",
  },
  twitter: "onlydans",
};

export const GITHUB_EDIT_URL = `https://github.com/roninoss/rn-new/tree/main/www`;

export const COMMUNITY_INVITE_URL = `https://discord.gg/XS9qS2mvTR`;

export const DOCS_URL = `https://docs.rn.new/`;

export const MAIN_URL = `https://rn.new/`;

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
  {
    id: 3,
    name: "Derk Weijers",
    html_url: "https://github.com/derkweijers",
    image_url: "https://avatars.githubusercontent.com/u/11644998?v=4",
  },
  {
    id: 4,
    name: "Paradigm Post",
    html_url: "https://paradigmpost.com/",
    image_url: "/paradigmpost.png",
  },
  {
    id: 5,
    name: "4ndrs",
    html_url: "https://github.com/4ndrs",
    image_url: "/4ndrs.jpeg",
  },
];

export const AUTHORS = [
  {
    name: "Vadim Savin",
    handle: "vadimnotjustdev",
    url: "https://x.com/VadimNotJustDev/status/1800413369150918821",
    position: "Not Just Dev",
    image: "vadim.jpeg",
    alt: "vadim",
    testimonial: `Next time you start a new expo project, just run:
    
    $ npx rn-new`,
  },
  {
    name: "Ansh",
    handle: "anshnanda_",
    url: "",
    position: "Bluesky",
    image: "ansh.jpeg",
    alt: "ansh",
    testimonial:
      "This is great! I've been using this for a ton of proof of concept applications. This serves my needs better than using create-expo-app.",
  },
  {
    name: "Yefim",
    handle: "yefim",
    position: "Partiful",
    image: "yefim.jpeg",
    alt: "yefim",
    testimonial:
      "Thanks for building rn-new! It's helped our team to quickly spin up apps and test various modules prior to adding them to our production application.",
  },
  {
    name: "Jacek",
    handle: "jpudysz",
    position: "Unistyles",
    image: "jacek.jpeg",
    alt: "jacek",
    testimonial: "You can now build Unistyles powered apps with rn.new!",
  },
  {
    name: "Agustín Falco",
    handle: "falcoagustin",
    position: "Vercel",
    image: "agustin.jpeg",
    alt: "agustin",
    testimonial: "I’ve been checking out rn.new! Very nice!!",
  },
  {
    name: "nexxel",
    handle: "nexxeln",
    position: "Leapflow",
    image: "nexxel.jpeg",
    alt: "nexxel",
    testimonial: "Building a mobile app soon, def will use rn-new!",
  },
  {
    name: "Abaz Udosen",
    handle: "abazudosen",
    position: "One Afro Dev",
    image: "abaz.jpeg",
    alt: "abazudosen",
    testimonial:
      "Streamline your Expo project setup! Use npx rn-new instead of npx create-expo-app to configure and install common packages easily.",
  },
  {
    name: "Lucky Israel",
    handle: "iluckyisrael",
    image: "lucky.jpeg",
    alt: "iluckyisrael",
    testimonial:
      "Use rn-new to bootstrap your new react native projects, you'd thank @DanStepanov",
  },
  {
    name: "FastheDeveloper",
    handle: "fasthecr3ator",
    image: "fasthe.jpeg",
    alt: "fasthecr3ator",
    testimonial:
      "I recently found out rn-new@latest and it's been a breeze setting up project details.",
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
    "Getting Started": "rn.new",
    Usage: "Usage",
    Deployment: "Deployment",
  },
};
