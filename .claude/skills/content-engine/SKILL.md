---
name: content-engine
description: Create blog posts, newsletter drafts, and LinkedIn content following Yaddiel Samper's brand voice, content pillars, and SEO strategy. Use when writing any content for the website or social channels.
metadata:
  origin: yaddielasesorinmobiliario
  framework: Astro v5
  domain: real-estate-advisory
---

# Content Engine — Yaddiel Samper

## When to Use

- Writing a new blog post for the Astro site
- Drafting a LinkedIn post or newsletter
- Reviewing existing content for brand voice compliance
- Planning content calendar entries
- Optimizing existing posts for SEO

## Brand Voice Rules

These are non-negotiable. Every piece of content MUST follow:

1. **Short sentences.** Maximum 20 words per sentence.
2. **Active voice always.** No passive constructions.
3. **No em dashes (—).** Commas and periods only.
4. **No motivational filler.** No guru language, no "unleash your potential."
5. **No invented data.** Flag statistics for confirmation unless in the verified data table.
6. **Opens with tension, not context.** First line creates curiosity or discomfort.
7. **LinkedIn posts: max 200 words.** Newsletter: max 600 words.
8. **Blog posts: 800-1500 words.** SEO-optimized with H2/H3 structure.

**Tone:** Direct, authoritative, human. Sounds like a smart colleague, not a corporate manual.

**Style references:** Isra Bravo (short storytelling, one reader, fear over success) + Fernando Miralles (tension opening, Socratic question, emotion first).

## Content Pillars

| Pillar | Audience | Purpose |
|--------|----------|---------|
| NPL process explained | Investor | Authority |
| Real errors, anonymous cases | Investor | Trust |
| Tenerife market data | Investor | Local positioning |
| Real work process | Both | Humanization |
| Investor mindset | Investor | Aspiration |
| Exclusive listing for sellers | Seller | Lead generation |

## Blog Post Creation

### Step 1: Frontmatter

Every blog post in `src/content/blog/` requires this YAML frontmatter:

```yaml
---
title: "Title here — max 60 characters for SEO"
description: "Meta description — max 155 characters, includes main keyword"
pubDate: "2026-06-21"
pillar: "Inversión"  # One of: Compraventa, Inversión, Mercado local, Tendencias, Casos de éxito, Educativo, Marca personal
audience: "Inversor"  # One of: Comprador, Vendedor, Inversor, Mixto
readingTime: 6
draft: false
---
```

### Step 2: Slug

Generate from title: lowercase, no accents, spaces become hyphens.
Example: "Cómo comprar NPL en Tenerife" → `como-comprar-npl-tenerife`

### Step 3: Structure

```markdown
# [H1 is auto-generated from title — do not include]

[Opening paragraph: tension hook, 2-3 sentences max]

## H2: Main Point 1
[2-3 paragraphs, concrete examples]

## H2: Main Point 2
[Include data from verified market data if relevant]

## H2: Main Point 3
[Anonymous real cases where possible]

## Conclusión
[1 paragraph, action-oriented, link to CTA]
```

### Step 4: SEO Checklist

- [ ] Main keyword in title, H1, first paragraph
- [ ] Main keyword in meta description
- [ ] 2-3 related keywords in H2 headings
- [ ] Internal links to 2-3 other blog posts
- [ ] External link to 1 authoritative source
- [ ] Images with alt text (if used)
- [ ] Reading time calculated (avg 200 words/min Spanish)

## Verified Market Data (safe to use)

| Metric | Value | Source |
|--------|-------|--------|
| Average gross rental yield, Canarias | 5.5% | Fotocasa 2025 |
| Average price/m2, Santa Cruz de Tenerife | 3,804 EUR | Registro |
| Foreign buyers choosing Canarias | 23.12% | Colegio de Registradores |
| IGIC (Canarias VAT) | 7% vs 21% peninsular | Agencia Tributaria |

Any other data: flag for Yaddiel to confirm before publishing.

## LinkedIn Post Template

```
[Tension opening — question or uncomfortable truth]

[Short story or case, 3-5 sentences]

[Insight or lesson, 1-2 sentences]

[Soft CTA — link to blog or "send me a DM"]
```

## Newsletter Template (Perfil Inmobiliario)

```
Subject: [Curiosity-driven, max 50 chars]

[Personal hook — 2 sentences max]

[Main content — one idea, well developed, 400-500 words]

[CTA — Calendly link for investors, blog link for readers]
```

## Automation Pipeline

Posts can be published automatically via Notion → Make.com → GitHub → Netlify:

1. Create post in Notion "Calendario Editorial" table
2. Set status to "Aprobado"
3. Make.com generates Markdown, commits to `src/content/blog/`
4. Netlify auto-deploys in ~60 seconds
5. Notion status updates to "Publicado"

For manual creation: add `.md` file directly to `src/content/blog/` and push to main.

## File Map

| File | Purpose |
|------|---------|
| `src/content/blog/*.md` | 14 existing blog posts |
| `src/content/config.ts` | Blog schema (Zod validation) |
| `src/pages/blog/index.astro` | Blog listing page |
| `src/pages/blog/[...slug].astro` | Dynamic post routes |
| `src/layouts/PostLayout.astro` | Blog post layout |
| `.agents/product-marketing.md` | Full brand context, ICP, voice rules |
| `scripts/notion-to-md.md` | Automation pipeline docs |
