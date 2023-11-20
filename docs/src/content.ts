import { getCollection } from "astro:content";

export const allPages = await getCollection("docs", () => {
  return true;
});
