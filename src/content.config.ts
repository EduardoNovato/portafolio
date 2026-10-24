import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ es: z.string(), en: z.string() });
const list = z.object({ es: z.array(z.string()), en: z.array(z.string()) });

// Para agregar un proyecto: crea un .json nuevo en src/content/projects/
const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    year: z.number(),
    art: z.enum(['sql', 'cli', 'nonet', 'music']),
    kind: text,
    description: text,
    stack: z.array(z.string()),
    repo: z.url(),
    demo: z.url().optional(),
  }),
});

// Las cifras entre **dobles asteriscos** se resaltan con el color de acento
const experience = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: text,
    start: z.string().regex(/^\d{4}-\d{2}$/),
    end: z
      .string()
      .regex(/^\d{4}-\d{2}$/)
      .nullable(),
    highlights: list,
    stack: z.array(z.string()),
  }),
});

export const collections = { projects, experience };
