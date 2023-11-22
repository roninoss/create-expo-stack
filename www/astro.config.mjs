import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: `https://expostack.dev/`,
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
      destination: "/discord",
    },
  },
});
