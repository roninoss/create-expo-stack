import { defineCollection, z } from "astro:content";
import { SITE } from "../consts";

const docs = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().default(SITE.title),
      description: z.string().default(SITE.description),
      lang: z.string().default(SITE.defaultLanguage),
      dir: z.union([z.literal("ltr"), z.literal("rtl")]).default("ltr"),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      ogLocale: z.string().optional(),
      ogImage: image()
        .refine((img) => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
    }),
});

export const collections = { docs };
