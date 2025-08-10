// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://yourusername.github.io',
  // base: '/axivm-site', // Commented out for local development
});
