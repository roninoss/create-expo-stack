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

export type OuterHeaders = "Create Expo Stack" | "Deployment" | "Usage";

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
    login: "frankcalise",
    id: 374022,
    avatar_url: "https://avatars.githubusercontent.com/u/374022?v=4",
    html_url: "https://github.com/frankcalise",
  },
  {
    login: "catalinmiron",
    id: 2805320,
    avatar_url: "https://avatars.githubusercontent.com/u/2805320?v=4",
    html_url: "https://github.com/catalinmiron",
  },
  {
    login: "picklnik",
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
    login: "matwarger",
    id: 686823,
    avatar_url: "https://avatars.githubusercontent.com/u/686823?v=4",
    html_url: "https://twitter.com/mwarger",
  },
  {
    login: "MVAodhan",
    id: 69143973,
    avatar_url: "https://avatars.githubusercontent.com/u/69143973?v=4",
    html_url: "https://github.com/MVAodhan",
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
