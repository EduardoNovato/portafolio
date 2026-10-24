// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Rangos Unicode de Fontsource: el navegador solo descarga el subconjunto que la página usa
const latin =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const latinExt =
  'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';

/** @typedef {{ src: [string]; weight: string; style: 'normal'; unicodeRange: [string] }} Variant */

/**
 * Fuente local desde node_modules en sus subconjuntos latin y latin-ext (latin primero: es la que se precarga).
 * @param {string} dir carpeta de archivos del paquete
 * @param {string} file nombre del archivo con {subset} en lugar del subconjunto
 * @param {string} weight peso fijo o rango de una fuente variable
 * @returns {[Variant, Variant]}
 */
const variants = (dir, file, weight) => [
  { src: [`${dir}/${file.replace('{subset}', 'latin')}`], weight, style: 'normal', unicodeRange: [latin] },
  { src: [`${dir}/${file.replace('{subset}', 'latin-ext')}`], weight, style: 'normal', unicodeRange: [latinExt] },
];

export default defineConfig({
  site: 'https://eduardocoronell.vercel.app',
  // La otra versión de idioma se descarga al acercar el cursor o enfocar su enlace: el cambio es instantáneo
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // Astro genera fuentes de respaldo con las métricas ajustadas: el texto no salta cuando llega la fuente real
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'DM Serif Display',
      cssVariable: '--font-dm-serif',
      fallbacks: ['serif'],
      options: {
        variants: variants('./node_modules/@fontsource/dm-serif-display/files', 'dm-serif-display-{subset}-400-normal.woff2', '400'),
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['sans-serif'],
      options: {
        variants: variants('./node_modules/@fontsource-variable/inter/files', 'inter-{subset}-wght-normal.woff2', '100 900'),
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      fallbacks: ['monospace'],
      options: {
        variants: variants('./node_modules/@fontsource-variable/jetbrains-mono/files', 'jetbrains-mono-{subset}-wght-normal.woff2', '100 800'),
      },
    },
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-CO', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
