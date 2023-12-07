import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/static";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.createexpostack.com/",
  integrations: [tailwind(), react(), mdx(), sitemap()],
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
  }),
});
