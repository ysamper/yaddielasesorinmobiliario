# Flujo Notion → GitHub → Netlify

## Cómo funciona

1. En Notion (Calendario Editorial), una pieza pasa a estado "Aprobado".
2. Make detecta el cambio.
3. Make lee las propiedades y el contenido del post.
4. Make construye un archivo Markdown con frontmatter:

```markdown
---
title: "{{Título}}"
description: "{{Ángulo}}"
pubDate: {{Fecha publicación}}
pillar: "{{Pilar de contenido}}"
audience: "{{Audiencia}}"
draft: false
---

{{Contenido del post}}
```

5. Make hace commit en `src/content/blog/{slug}.md` con la GitHub API.
6. Netlify detecta el push y reconstruye.
7. El post aparece en yaddielasesorinmobiliario.com/blog/{slug}.

## Configuración Make (módulos)

- **Notion - Watch Database Items** (tabla Calendario Editorial, filtro Estado=Aprobado, Canal contiene "Blog")
- **Tools - Set Variable**: slug = lowercase + replace espacios + sin tildes
- **Notion - Get Page Content**: para extraer el body del post
- **Tools - Compose String**: construir el Markdown con frontmatter
- **GitHub - Create or Update File**: ruta `src/content/blog/{{slug}}.md`, mensaje `Publish: {{título}}`
- **Notion - Update Item**: cambiar estado a "Publicado", añadir URL publicada

## Variables de entorno necesarias en Make

- GITHUB_TOKEN (Personal Access Token con permisos `repo`)
- GITHUB_OWNER = ysamper
- GITHUB_REPO = yaddielasesorinmobiliario
- NOTION_DB_ID = 0280a04f-9df9-484b-bc7b-8f4dd2b62480
