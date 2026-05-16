import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    pillar: z.enum(['Compraventa', 'Inversión', 'Mercado local', 'Tendencias', 'Casos de éxito', 'Educativo', 'Marca personal']).optional(),
    audience: z.enum(['Comprador', 'Vendedor', 'Inversor', 'Mixto']).optional(),
    readingTime: z.number().optional(),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional()
  })
});

export const collections = { blog };
