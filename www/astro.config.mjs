import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	site: `https://expostack.dev/`,
	integrations: [react(), tailwind()],
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true
		}
	})
});
