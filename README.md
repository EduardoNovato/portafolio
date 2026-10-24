# Portafolio · Eduardo Coronell

Portafolio personal de Eduardo Coronell, Desarrollador Backend en Barranquilla, Colombia.
Sitio estático bilingüe (español en `/`, inglés en `/en/`) con tema claro y oscuro.

**Stack:** Astro 7 · TypeScript · Tailwind CSS 4 · Vercel

## Desarrollo

Requiere Node 22.12 o superior y [pnpm](https://pnpm.io) (`npm install -g pnpm`).

```bash
pnpm install
pnpm dev         # http://localhost:4321
pnpm build       # genera dist/
pnpm preview     # sirve dist/ localmente
pnpm check       # revisa tipos y plantillas
```

## Cómo actualizar el contenido

| Qué | Dónde |
| --- | --- |
| Proyectos | Un `.json` por proyecto en `src/content/projects/` (el campo `order` define la posición) |
| Experiencia | Un `.json` por trabajo en `src/content/experience/`; las cifras entre `**dobles asteriscos**` se resaltan |
| Textos en ambos idiomas | `src/i18n/ui.ts` |
| Correo, links y tecnologías del carrusel | `src/data/site.ts` |
| Colores y tipografía | Variables al inicio de `src/styles/global.css` |
| CV descargable | `public/cv/eduardo-coronell-cv.pdf` (versión **sin teléfono**) |

Para un proyecto nuevo con ilustración propia, agrega su dibujo en `src/components/ProjectArt.astro`
y su clave al `enum` de `art` en `src/content.config.ts`.

La imagen de vista previa para redes (`/og/es.png`, `/og/en.png`), el favicon y el ícono de iOS
se generan solos en cada build.

## Despliegue

Vercel detecta Astro automáticamente: importa el repo y no hace falta configurar nada.
Para ver visitas, activa **Web Analytics** en el panel del proyecto en Vercel.
