import type { APIRoute } from 'astro';
import { monogram } from '../lib/monogram';
import { renderSvg } from '../lib/og';

export const GET: APIRoute = async () => {
  const svg = await renderSvg(monogram(64, 14), 64, 64);
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
