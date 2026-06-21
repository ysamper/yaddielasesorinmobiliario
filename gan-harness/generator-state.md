# Generator State -- Iteration 004

## What Was Built
- All Iteration 3 features plus major visual upgrades targeting 7.5+ threshold
- Hero with dramatic size contrast (5.5rem light / 10rem bold) + headline bleeds into photo column
- Fixed: Hero parallax transform bug (JS now composes with CSS 3D transform)
- Differentiators section pushed to extreme editorial (16rem watermark numerals, gold gradient wash)
- Featured blog card with dark (ink) treatment at 1.6rem title
- CTA valuation box on dark (ink) background with gold corner brackets
- Investor cards architectural (no border-radius, structural top border)
- Seller timeline bodies have rounded cards with warm treatment
- Featured review card larger (460px) with gold-tinted background
- Hero image served as WebP via `<picture>` element (215KB → 77KB)

## What Changed This Iteration
- Fixed: Hero parallax JS now composes transforms: `translateZ(-100px) scale(1.08) translateY(offset)`
- Fixed: `html { scroll-padding-top: 100px }` for anchor navigation
- Fixed: `aria-disabled="true"` on RGPD CTA button, toggled via JS
- Fixed: Timeline scroll handler uses RAF throttle guard
- Added: "Vendedores" nav link pointing to `#como-funciona`
- Added: `<picture>` with WebP source for hero image (64% size reduction)
- Changed: Hero headline uses SIZE + weight contrast (light 5.5rem / bold 10rem)
- Changed: Hero headline bleeds -7rem into photo column for editorial overlap
- Changed: Diagonal clip-paths bolder at 7rem (was 4rem), 4rem on mobile (was 2rem)
- Changed: Differentiators numerals at 16rem (was 9rem) with gold gradient wash background
- Changed: Diff items use 16rem numeral column (was 10rem) with 4rem padding (was 3rem)
- Changed: Diff header title at 5rem max for scale
- Changed: Investor cards sharp/architectural: border-radius 0, structural gold top border
- Changed: Seller section warm gradient background, timeline bodies have rounded cards
- Changed: Featured blog card has dark ink background with light text and larger title
- Changed: CTA box dark background with cream text and gold-warm accents
- Changed: Corner brackets larger (48px) and more visible (50% opacity)
- Changed: Contact/map section uses cream-deep background for differentiation
- Changed: First review card featured at 460px with gold-tinted gradient
- Changed: RGPD checkbox/label styled for dark context
- Changed: Diff title bumped to 1.6rem, desc line-height to 1.85

## Known Issues
- No AVIF alternative (WebP only)
- CSS remains in single file (acceptable at 48KB / 9.5KB gzipped)

## Build Stats
- 21 pages in 1.53s
- CSS: 1748 lines, 48KB raw, 9.5KB gzipped
- Hero image: 77KB WebP (was 215KB JPEG)
