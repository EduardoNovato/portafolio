import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { h, palette as c, renderSvg } from '../../lib/og';
import { useTranslations, type Lang } from '../../i18n/ui';
import { site } from '../../data/site';

export const getStaticPaths = (() => [{ params: { lang: 'es' } }, { params: { lang: 'en' } }]) satisfies GetStaticPaths;

// Dibujo decorativo sin texto: terminal, conexión y base de datos
const art = `
<svg xmlns="http://www.w3.org/2000/svg" width="360" height="300" viewBox="0 0 360 300" fill="none">
  <rect x="1" y="1" width="230" height="128" rx="12" stroke="${c.line}" stroke-width="2"/>
  <path d="M1 30h230" stroke="${c.line}" stroke-width="2"/>
  <circle cx="20" cy="16" r="4.5" stroke="${c.line}" stroke-width="2"/>
  <circle cx="36" cy="16" r="4.5" stroke="${c.line}" stroke-width="2"/>
  <circle cx="52" cy="16" r="4.5" fill="${c.accent}"/>
  <rect x="20" y="50" width="48" height="8" rx="4" fill="${c.accent}"/>
  <rect x="76" y="50" width="110" height="8" rx="4" fill="${c.line}"/>
  <rect x="20" y="70" width="34" height="8" rx="4" fill="${c.accent}"/>
  <rect x="62" y="70" width="80" height="8" rx="4" fill="${c.line}"/>
  <rect x="20" y="90" width="44" height="8" rx="4" fill="${c.accent}"/>
  <rect x="72" y="90" width="124" height="8" rx="4" fill="${c.line}"/>
  <path d="M116 129v46h112" stroke="${c.line}" stroke-width="2" stroke-dasharray="6 7"/>
  <circle cx="190" cy="175" r="6" fill="${c.accent}"/>
  <path d="M228 150v110a60 15 0 0 0 120 0V150" stroke="${c.line}" stroke-width="2"/>
  <ellipse cx="288" cy="150" rx="60" ry="15" stroke="${c.line}" stroke-width="2"/>
  <path d="M228 187a60 15 0 0 0 120 0M228 224a60 15 0 0 0 120 0" stroke="${c.line}" stroke-width="2"/>
</svg>`;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const t = useTranslations(lang);
  const host = new URL(site.url).host;

  const svg = await renderSvg(
    h(
      'div',
      {
        style: {
          // Satori suma el padding al tamaño: 1040 + 2·80 = 1200 y 486 + 2·72 = 630
          position: 'relative',
          width: 1040,
          height: 486,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: c.bg,
          padding: '72px 80px',
          fontFamily: 'Inter',
          color: c.ink,
        },
      },
      h('img', {
        src: `data:image/svg+xml;base64,${Buffer.from(art).toString('base64')}`,
        width: 360,
        height: 300,
        style: { position: 'absolute', right: 80, top: 170 },
      }),
      h('div', { style: { display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 30, color: c.accent } }, `> ${t.hero.role}`),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', fontFamily: 'DM Serif Display', fontSize: 140, lineHeight: 0.92, marginTop: 28 } },
        h('div', { style: { display: 'flex' } }, site.firstName),
        h('div', { style: { display: 'flex' } }, site.lastName),
      ),
      h('div', { style: { display: 'flex', flexGrow: 1 } }),
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center' } },
        h('div', { style: { width: 12, height: 12, borderRadius: 999, backgroundColor: c.accent, marginRight: 16 } }),
        h('div', { style: { display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 24, color: c.faint } }, host),
      ),
    ),
    1200,
    630,
  );

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
