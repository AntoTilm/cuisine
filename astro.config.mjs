// @ts-check
import { defineConfig } from 'astro/config';

// Pour publier le site dans un sous-dossier (GitHub Pages par exemple),
// définir BASE_PATH avant le build : BASE_PATH=/cuisine npm run build
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
});
