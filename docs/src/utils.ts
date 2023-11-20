import type { CollectionEntry } from "astro:content";

import {
  SIDEBAR,
  type Sidebar,
  type SidebarItem,
  type SidebarItemLink,
} from "./consts";

export function getLanguageFromURL(pathname: string) {
  const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
  return langCodeMatch ? langCodeMatch[1] : "en";
}

/** Remove \ and / from beginning of string */
export function removeLeadingSlash(path: string) {
  return path.replace(/^[/\\]+/, "");
}

/** Remove \ and / from end of string */
export function removeTrailingSlash(path: string) {
  return path.replace(/[/\\]+$/, "");
}

/** Get a page’s slug, without the language prefix (e.g. `'en/migrate'` => `'migrate'`). */
export const stripLangFromSlug = (slug: CollectionEntry<"docs">["slug"]) =>
  slug.split("/").slice(1).join("/");

/** Get a page’s lang tag from its slug (e.g. `'en/migrate'` => `'en'`). */
export const getLangFromSlug = (slug: CollectionEntry<"docs">["slug"]) =>
  slug.split("/")[0];

export function paginate(lang: keyof Sidebar, path: SidebarItemLink) {
  const routes = Object.values(SIDEBAR[lang]).flat() as SidebarItem[];
  const index = routes.map((item) => item.link).indexOf(path);
  if (index === -1) return { prev: undefined, next: undefined };
  const prev = index > 0 ? routes[index - 1] : undefined;
  const next = index < routes.length - 1 ? routes[index + 1] : undefined;
  return { prev, next };
}

export const groupPagesByLang = <T extends CollectionEntry<"docs">>(
  pages: T[],
) =>
  pages.reduce(
    (pages, page) => {
      const lang = page.slug.split("/")[0];
      if (!pages[lang]) pages[lang] = [];
      pages[lang].push(page);
      return pages;
    },
    {} as { [lang: string]: T[] },
  );
