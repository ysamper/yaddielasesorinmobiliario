// Imagen Open Graph propia por artículo (1200×630), generada en el build.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Ruta desde la raíz del proyecto: en el build este módulo se empaqueta fuera de src/.
const fontUrl = (file: string) => join(process.cwd(), 'src', 'og', file);
const fontsPromise = Promise.all([
  readFile(fontUrl('fraunces-600.ttf')),
  readFile(fontUrl('outfit-500.ttf')),
]);

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
};

const INK = '#1A1710';
const CREAM = '#F8F6F1';
const GOLD = '#8B3A2B';
const BODY = '#58524A';

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> };
  const [fraunces, outfit] = await fontsPromise;
  const title = post.data.title;
  const titleSize = title.length > 90 ? 52 : title.length > 60 ? 60 : 70;

  const svg = await satori(
    {
      // Satori suma el padding al 100 %: el marco fijo va fuera y el padding dentro.
      type: 'div',
      props: {
        style: { width: 1200, height: 630, display: 'flex', background: CREAM, borderLeft: `16px solid ${GOLD}` },
        children: [
        {
          type: 'div',
          props: {
            style: {
              flexGrow: 1, display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', padding: '72px 80px 64px 80px', fontFamily: 'Outfit',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: 24, letterSpacing: 4, color: GOLD, textTransform: 'uppercase' },
                  children: post.data.pillar ?? 'Artículo',
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontFamily: 'Fraunces', fontSize: titleSize, lineHeight: 1.12, color: INK, letterSpacing: -1 },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', justifyContent: 'space-between', fontSize: 26, color: BODY },
                  children: [
                    { type: 'div', props: { style: { color: INK }, children: 'Yaddiel Samper' } },
                    { type: 'div', props: { children: 'Asesor inmobiliario en Tenerife' } },
                  ],
                },
              },
            ],
          },
        },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' },
        { name: 'Outfit', data: outfit, weight: 500, style: 'normal' },
      ],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
