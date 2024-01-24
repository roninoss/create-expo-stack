export const prerender = true;
import type { APIRoute } from "astro";
import { type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@/lib/generateOgImages";
import { allPages } from "../../../content";
import { getLangFromSlug, stripLangFromSlug } from "../../../utils";

export async function getStaticPaths() {
  return allPages.map((page) => {
    const lang = getLangFromSlug(page.slug);
    const slug = stripLangFromSlug(page.slug);
    return { params: { lang, slug }, props: page };
  });
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as CollectionEntry<"docs">), {
    headers: { "Content-Type": "image/png" },
  });
