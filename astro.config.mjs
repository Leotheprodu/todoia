import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  /* shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  }, */
  site: 'https://todoia.xyz',
  integrations: [tailwind(), sitemap(), mdx(), icon(), react()],
  adapter: vercel(),
});
