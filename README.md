# yaddielasesorinmobiliario.com

Web personal de Yaddiel Samper, asesor inmobiliario en Canarias. Construida en Astro con blog integrado.

## Estructura

- `src/pages/index.astro`: landing principal.
- `src/pages/blog/`: listado de blog y rutas dinámicas por slug.
- `src/content/blog/`: posts en Markdown. Cada `.md` es un post.
- `src/layouts/`: plantillas base y de post.
- `src/components/`: header, footer, SEO.
- `public/`: estáticos (favicon, robots, imágenes).

## Cómo añadir un post manualmente

Crea un archivo `src/content/blog/<slug>.md` con frontmatter:

```yaml
---
title: "Título del post"
description: "Resumen para SEO y social."
pubDate: 2026-05-20
pillar: "Inversión"
audience: "Inversor"
readingTime: 7
draft: false
---

## Contenido en Markdown
```

## Cómo se publican posts automáticamente

Make detecta cambios en Notion (Calendario Editorial) cuando una pieza pasa a estado "Aprobado". Genera un archivo Markdown con el frontmatter y hace commit en este repo. Netlify recibe el push y reconstruye la web. Total: ~60 segundos.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Netlify auto-deploya en cada push a la rama `main`.
