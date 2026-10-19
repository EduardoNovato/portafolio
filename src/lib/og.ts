// Generación de imágenes en build (vista previa para redes y favicon) con satori.
// Satori convierte el texto en trazos, así que el SVG resultante no depende de fuentes instaladas.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';

type Child = Node | string | null | false;
interface Node {
  type: string;
  props: Record<string, unknown> & { children?: Child | Child[] };
}

export function h(type: string, props: Record<string, unknown>, ...children: Child[]): Node {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}

const fontFile = (pkg: string, file: string) => readFile(path.join(process.cwd(), 'node_modules', pkg, 'files', file));

let fontsPromise: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;

function loadFonts() {
  fontsPromise ??= Promise.all([
    fontFile('@fontsource/dm-serif-display', 'dm-serif-display-latin-400-normal.woff'),
    fontFile('@fontsource/inter', 'inter-latin-400-normal.woff'),
    fontFile('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
  ]).then(([serif, sans, mono]) => [
    { name: 'DM Serif Display', data: serif, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: sans, weight: 400 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: mono, weight: 400 as const, style: 'normal' as const },
  ]);
  return fontsPromise;
}

export async function renderSvg(node: Node, width: number, height: number) {
  return satori(node as Parameters<typeof satori>[0], { width, height, fonts: await loadFonts() });
}

export const palette = {
  bg: '#0b1012',
  surface: '#131c1f',
  line: 'rgba(234, 242, 240, 0.16)',
  ink: '#eaf2f0',
  muted: '#97a6a3',
  faint: '#7d8c89',
  accent: '#3cc9b0',
};
