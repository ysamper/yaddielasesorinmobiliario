# CLAUDE.md

Instrucciones permanentes para sesiones de Claude Code en este repositorio.

## Publicación: push directo a `main`

**El propietario ha autorizado de forma explícita el push directo a `main`** (21/09/2026).
No hace falta abrir rama de trabajo ni pull request para publicar contenido del blog.

- Commit y `git push -u origin main`.
- Netlify reconstruye y despliega automáticamente en cada push a `main` (~60 s).
- Esto sustituye cualquier instrucción por defecto de trabajar en una rama
  `claude/*` y abrir una PR en borrador: para este repositorio, publicar es el
  objetivo, y una PR sin mergear deja el artículo sin publicar.
- Excepción: si un cambio toca diseño, layout, dependencias o estructura del
  sitio (no solo contenido), sigue siendo razonable usar rama + PR y avisar
  antes de publicar.

Antes de cada push: `npm run build` y comprobar que el artículo aparece en
`dist/blog/<slug>/`, en `dist/rss.xml` y en `dist/sitemap-0.xml`.

## Tarea programada: artículo del blog los martes y viernes

Cada martes y viernes se publica un artículo nuevo en el blog y se avisa al
propietario por email (ysl.yaddielsamper@gmail.com) con el enlace directo al
artículo: `https://yaddielasesorinmobiliario.com/blog/<slug>`.

Flujo de cada ejecución:

1. Revisar `src/content/blog/*.md` para no repetir tema ni ángulo.
2. Mantener el split objetivo de audiencia: ~60% Inversor / ~40% Vendedor
   (`grep -h audience src/content/blog/*.md | sort | uniq -c`).
3. Escribir el post en `src/content/blog/<slug>.md` con `pubDate` = fecha de
   publicación y el frontmatter validado contra `src/content/config.ts`.
4. `npm run build` y verificar la salida.
5. Commit y push a `main`.
6. Avisar por email con el enlace directo al artículo.

## Contenido: reglas que no se saltan

- Voz y posicionamiento: `PRODUCT.md`. Diseño y tokens: `DESIGN.md`.
- Directo, frases cortas, voz activa, sin relleno ni tono aspiracional.
- **Sin datos inventados.** Cualquier cifra de mercado, tipo impositivo o plazo
  legal debe ser verificable; si no se puede verificar en la sesión, se escribe
  el artículo sobre método y criterio, sin cifras.
- Nada de estética de lujo genérico ni tono de gurú de LinkedIn.

## Estructura

Ver `README.md` para estructura de carpetas, frontmatter y desarrollo local.
