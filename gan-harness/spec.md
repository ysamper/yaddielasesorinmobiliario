# yaddielasesorinmobiliario.com — Design Spec

## Brief

Redesign the homepage of yaddielasesorinmobiliario.com — a premium real estate advisory website for **Yaddiel Samper**, a specialist in NPL (Non-Performing Loans) and institutional real estate transactions in Tenerife, Canary Islands.

## Brand Identity

- **Person:** Yaddiel Samper Leal — 2x Award Winner for Best Advisor in Institutional Transactions in the Canary Islands
- **Company:** Century 21 Lighthouse
- **Location:** Av. El Paso 24, Los Majuelos, 38108 La Laguna, Santa Cruz de Tenerife
- **Market:** Real estate investors (NPL/bank assets) + property sellers seeking premium, exclusive service
- **Tone:** Authoritative, premium, direct, no-nonsense. Think luxury finance meets real estate.
- **Language:** Spanish (all content must remain in Spanish)

## Current Design System

- **Fonts:** Cormorant Garamond (serif, headings) + Outfit (sans-serif, body)
- **Colors:** Gold (#7A5C10) on warm off-white (#F8F6F1), dark text (#1A1710)
- **Style:** Minimal, editorial, light theme with subtle gold accents
- **Framework:** Astro 5.x with static HTML/CSS

## Sections to Redesign (preserve content/copy)

1. **Hero** — Split layout with photo + headline + dual CTAs (investor / seller)
2. **Stats Bar** — 3 key metrics (2x award, +3 years, N.1 volume)
3. **Investors Section** — 4 value propositions in card grid
4. **Sellers Process** — 3-step numbered process
5. **Differentiators** — 4 reasons with Roman numeral icons
6. **Blog Preview** — 3 latest articles in card grid
7. **Newsletter CTA** — Subscription box
8. **Contact/Map** — Office info + Google Maps embed
9. **Reviews** — 3 client testimonials
10. **Valuation CTA** — Final conversion section with RGPD checkbox

## Design Goals

- Push for visual excellence and creative leaps
- Explore unusual layouts, custom CSS animations, distinctive spatial composition
- Maintain the luxury/premium feel but elevate it beyond the current "safe" template aesthetic
- Create visual hierarchy that guides investors and sellers through separate journeys
- The site should feel like a premium financial advisory, not a generic real estate listing page
- Consider: parallax, scroll-triggered animations, asymmetric grids, editorial typography
- Mobile-first responsive design

## Technical Constraints

- Pure HTML + CSS (Astro components). No JavaScript frameworks needed.
- Keep existing Astro component structure (BaseLayout, Nav, Footer, etc.)
- CSS custom properties for theming
- No external dependencies beyond Google Fonts
- Must work with existing blog content system
