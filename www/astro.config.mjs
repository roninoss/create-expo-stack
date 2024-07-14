import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: `https://rn.new/`,
  vite: {
    ssr: {
      noExternal: ["lucide-astro"],
    },
  },
  integrations: [react(), tailwind()],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  redirects: {
    "/discord": {
      status: 302,
      destination: "https://discord.gg/XS9qS2mvTR",
    },
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
