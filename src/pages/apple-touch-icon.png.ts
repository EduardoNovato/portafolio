import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { monogram } from '../lib/monogram';
import { renderSvg } from '../lib/og';

export const GET: APIRoute = async () => {
  // iOS redondea las esquinas por su cuenta: fondo completo sin radio
  const svg = await renderSvg(monogram(180, 0), 180, 180);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
