---
name: design-system
description: Generate, audit, or extend the visual design system for yaddielasesorinmobiliario.com. Use when modifying styles, adding components, reviewing visual consistency, or creating new page sections.
metadata:
  origin: yaddielasesorinmobiliario
  framework: Astro v5
  domain: real-estate-advisory
---

# Design System — Yaddiel Samper Asesor Inmobiliario

## When to Use

- Adding a new section or component to any page
- Modifying existing styles or layout
- Auditing visual consistency across pages
- Creating new page templates
- Reviewing PRs that touch `global.css` or `.astro` components
- When the UI looks "off" or inconsistent

## Design Tokens

### Color Palette

```css
--gold: #7A5C10          /* Primary accent — CTAs, links, highlights */
--gold-light: #956E18    /* Hover state for gold elements */
--dark: #F8F6F1          /* Page background (cream, NOT dark theme) */
--dark-2: #F0EDE6        /* Card/section backgrounds */
--dark-3: #E8E4DB        /* Elevated surfaces, newsletter section */
--dark-4: #D8D3C8        /* Decorative numbers, subtle fills */
--text: #1A1710          /* Primary text */
--text-muted: #58524A    /* Secondary text, descriptions */
--text-dim: #968E84      /* Tertiary text, dates, disclaimers */
--border: rgba(122,92,16,0.18)       /* Gold-tinted borders */
--border-subtle: rgba(0,0,0,0.07)    /* Hairline dividers */
--border-radius-lg: 8px              /* Cards, maps, avatars */
```

### Typography

| Role | Font | Weight | Size | Spacing |
|------|------|--------|------|---------|
| **Headings** | Cormorant Garamond (serif) | 500 | clamp(2rem–5.5rem) | -0.01em |
| **Body** | Outfit (sans-serif) | 300 | 0.82rem–1rem | normal |
| **Labels/Tags** | Outfit | 500 | 0.65rem–0.75rem | 0.08em–0.15em uppercase |
| **Nav brand** | Cormorant Garamond | 500 | 1.1rem | 0.05em |

### Spacing Scale

- Section padding: `6rem 2.5rem` (desktop), `4rem 1.5rem` (mobile)
- Card padding: `1.75rem–2.5rem`
- Grid gaps: `1.25rem–1.5rem`
- Content max-width: `900px`
- Article max-width: `720px`

### Component Patterns

**Buttons:**
- `.btn-primary` — Gold background, cream text, uppercase 0.8rem, 2px radius
- `.btn-ghost` — Text-only with `→` arrow pseudo-element
- `.btn-outline` — Gold border, gold text, fills on hover

**Cards:**
- Always `var(--dark-2)` background
- `0.5px–1px` subtle border
- `border-radius: 4px` (NOT large radius — keep editorial)
- Hover: border darkens + slight translateY(-2px)
- NEVER nest cards inside cards

**Section anatomy:**
```
section > .section-inner > [
  .section-tag  (gold uppercase label with left dash)
  .section-title (Garamond heading, <em> = gold italic)
  [content grid/list]
]
```

**Section dividers:** 1px gradient line via `::after` pseudo-element

### Anti-patterns (DO NOT)

- Purple/blue gradients — this is a gold/cream palette
- Rounded-everything — border-radius is 2px for buttons, 4px for cards, 8px for maps/avatars only
- Cards inside cards
- Decorative blobs or glassmorphism
- Generic AI-generated hero patterns
- Dark mode (this site is light-cream themed)
- Font weights above 600 (Garamond caps at 600 for stat numbers only)
- Sans-serif for headings (always Garamond)

## Mode 1: Add New Component

When adding a new section or component:

1. Read `src/styles/global.css` to absorb the existing token system
2. Read the target page (usually `src/pages/index.astro`) to see surrounding context
3. Follow the section anatomy: `.section-tag` + `.section-title` + content
4. Use existing CSS classes before creating new ones
5. Add new CSS at the logical position in `global.css` (sections are grouped by component)
6. Include `@media (max-width: 768px)` responsive overrides
7. Test mobile-first: single column at 768px breakpoint

## Mode 2: Visual Audit

Score the UI across these dimensions (0-10):

1. **Gold consistency** — is `var(--gold)` used for all accents, or are there stray hex values?
2. **Typography hierarchy** — Garamond for headings, Outfit for body, no mixing?
3. **Spacing rhythm** — consistent with the 2.5rem/1.5rem/0.75rem scale?
4. **Component consistency** — do all cards, buttons, and sections follow established patterns?
5. **Responsive behavior** — does everything stack cleanly at 768px?
6. **Border treatment** — subtle borders throughout, no heavy outlines?
7. **Animation restraint** — only `fadeUp` and hover transitions, nothing gratuitous?
8. **Accessibility** — contrast ratios adequate for text-muted and text-dim on cream?
9. **Content density** — editorial spacing, not cramped SaaS dashboards?
10. **Brand coherence** — does it feel like a luxury real estate advisor site?

Provide specific `file:line` references and CSS fixes for any score below 7.

## Mode 3: New Page Template

When creating a new page:

1. Use `BaseLayout.astro` as the wrapper (provides nav, footer, SEO, analytics)
2. Pass `title`, `description`, and optionally `type` props to the layout
3. Follow the existing page pattern: semantic HTML, `.section-inner` containers
4. Blog posts go in `src/content/blog/` as Markdown with the schema from `config.ts`
5. Static pages go in `src/pages/` as `.astro` files

## File Map

| File | Purpose |
|------|---------|
| `src/styles/global.css` | All design tokens and component styles (598 lines) |
| `src/layouts/BaseLayout.astro` | Master layout — SEO, analytics, nav, footer |
| `src/layouts/PostLayout.astro` | Blog post layout with article schema |
| `src/components/Nav.astro` | Fixed navigation bar |
| `src/components/Footer.astro` | Multi-column footer |
| `src/components/SEO.astro` | Reusable meta tags component |
| `src/components/CookieConsent.astro` | RGPD cookie banner |
| `src/pages/index.astro` | Homepage (hero, stats, investors, sellers, blog, CTA) |
| `.agents/product-marketing.md` | Brand voice, ICP, positioning, market data |
