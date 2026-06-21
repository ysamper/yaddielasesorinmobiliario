---
name: site-audit
description: Run a comprehensive audit of yaddielasesorinmobiliario.com covering SEO, performance, accessibility, RGPD compliance, and conversion optimization. Use when preparing for launch, after major changes, or periodic quality checks.
metadata:
  origin: yaddielasesorinmobiliario
  framework: Astro v5
  domain: real-estate-advisory
---

# Site Audit — yaddielasesorinmobiliario.com

## When to Use

- Before pushing major changes to production
- Periodic quality checks (monthly recommended)
- After adding new pages or sections
- When SEO rankings change
- When conversion rates drop
- After dependency updates

## Audit Dimensions

### 1. SEO Audit

Check every page for:

```
1. Read src/components/SEO.astro — verify meta tag generation
2. Read src/layouts/BaseLayout.astro — check Schema.org JSON-LD
3. Read src/layouts/PostLayout.astro — check Article schema
4. Scan all blog posts for:
   - Title length (max 60 chars)
   - Description length (max 155 chars)
   - Keyword presence in first paragraph
   - Internal linking (min 2 per post)
   - Reading time accuracy
5. Verify sitemap generation (astro.config.mjs → @astrojs/sitemap)
6. Check RSS feed (src/pages/rss.xml.js)
7. Verify robots.txt (public/robots.txt)
8. Check canonical URLs on all pages
```

Score: posts with title > 60 chars or missing description = FAIL.

### 2. Performance Audit

```
1. Check for render-blocking resources in BaseLayout.astro
2. Verify Google Fonts loading strategy (display=swap)
3. Check image optimization (formats, sizes, lazy loading)
4. Verify no unnecessary JavaScript
5. Check CSS file size (global.css — flag if > 800 lines)
6. Verify Astro static generation (no client-side hydration needed)
7. Check for unused CSS selectors
```

Astro v5 with static output should score 95+ on Lighthouse.

### 3. RGPD/Legal Compliance

```
1. CookieConsent.astro:
   - Cookies blocked by default (consent-first)
   - Google Consent Mode v2 integrated
   - localStorage persistence of choice
   - Link to cookie policy page

2. BaseLayout.astro:
   - GA4 script gated behind consent
   - No third-party scripts loading before consent

3. Legal pages exist:
   - /privacidad (privacy policy)
   - /cookies (cookie policy)
   - /aviso-legal (legal disclaimer)

4. Forms:
   - RGPD checkbox present and required
   - Link to privacy policy in checkbox label
   - No form submission without explicit consent

5. External services:
   - Calendly (loaded on click, not preloaded)
   - Google Maps (embedded, check consent)
   - Beehiiv newsletter (external redirect, OK)
```

### 4. Conversion Audit

```
1. CTAs present and visible:
   - Hero: primary button → Calendly (investors)
   - Hero: ghost link → Lystos valuation (sellers)
   - Blog post footer: valuation CTA
   - Dedicated CTA section before footer
   - Newsletter signup section

2. CTA hierarchy:
   - Primary (gold button): max 2 per viewport
   - Secondary (outline/ghost): supporting actions
   - No competing CTAs in same section

3. Trust signals:
   - Awards mentioned (2x GOAL Award)
   - Google Reviews linked
   - Testimonials section with real names

4. Lead magnets:
   - /recursos page with downloadable PDFs
   - PDFs accessible (check public/ directory)
```

### 5. Accessibility Audit

```
1. Color contrast ratios:
   - --text (#1A1710) on --dark (#F8F6F1): check ≥ 4.5:1
   - --text-muted (#58524A) on --dark (#F8F6F1): check ≥ 4.5:1
   - --text-dim (#968E84) on --dark (#F8F6F1): WARNING — may fail
   - --gold (#7A5C10) on --dark (#F8F6F1): check for links

2. Semantic HTML:
   - Proper heading hierarchy (h1 > h2 > h3)
   - nav, main, footer, article, section elements
   - Alt text on images

3. Keyboard navigation:
   - Focus states on interactive elements
   - Tab order logical
   - Skip-to-content link (check if present)

4. Form accessibility:
   - Labels associated with inputs
   - Error messages announced
   - Required fields marked
```

### 6. Content Quality

```
1. Brand voice compliance:
   - Read .agents/product-marketing.md for rules
   - Check sentence length (max 20 words)
   - Check for passive voice
   - Check for em dashes (should be none)
   - Check for motivational filler

2. Blog freshness:
   - Posts older than 90 days flagged for review
   - pubDate accuracy
   - No draft posts accidentally published

3. Broken links:
   - Internal links resolve to existing pages
   - External links (Calendly, Lystos, Beehiiv) still active
   - PDF downloads accessible
```

## Output Format

Generate a report with:

```markdown
## Site Audit Report — [date]

### Summary
- Overall Score: X/60
- Critical Issues: N
- Warnings: N
- Passed: N

### Critical (fix immediately)
1. [Issue] — file:line — [fix]

### Warnings (fix soon)
1. [Issue] — file:line — [fix]

### Passed
1. [Check] — OK

### Recommendations
1. [Improvement] — expected impact
```

## File Map

| File | Purpose |
|------|---------|
| `src/components/SEO.astro` | Meta tag generation |
| `src/components/CookieConsent.astro` | RGPD consent banner |
| `src/layouts/BaseLayout.astro` | Schema.org, analytics, consent gating |
| `src/layouts/PostLayout.astro` | Article schema, blog layout |
| `src/pages/*.astro` | All page templates |
| `src/content/blog/*.md` | Blog posts for content audit |
| `src/styles/global.css` | Design tokens and component styles |
| `public/robots.txt` | Search engine directives |
| `astro.config.mjs` | Sitemap and site URL config |
| `.agents/product-marketing.md` | Brand voice and content rules |
