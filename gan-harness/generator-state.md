# Generator State -- Iteration 005

## What Was Built
- All Iteration 4 features plus critical bug fix and creative additions
- Fixed: Featured blog card CSS specificity bug (cream text on cream was invisible)
- Added: Marquee/ticker strip with scrolling keyword phrases on dark background
- Changed: Differentiators section heading breaks formula (centered, larger, no section-tag)
- Added: Skip-to-content link for keyboard accessibility
- Preserved: Diff editorial layout at 768px tablet (8rem numeral column maintained)

## What Changed This Iteration
- Fixed: Blog card specificity — `.blog-card.blog-card--feat` placed AFTER `.blog-card` rules
- Added: Featured blog card hover accent uses gold-warm
- Added: `.marquee-strip` with CSS infinite scroll animation (30s linear loop)
- Added: 8 keyword phrases in marquee: NPL, Fondos Institucionales, Tenerife, etc.
- Added: Marquee respects `prefers-reduced-motion` (animation: none)
- Added: Marquee is `aria-hidden="true"` (decorative)
- Changed: Diff header centered, section-tag hidden, title at 6rem max
- Changed: Diff header em text displayed as block at 0.65em for dramatic hierarchy
- Added: `.skip-link` visually hidden, visible on focus with gold background
- Added: `id="main-content"` on `<main>` element
- Changed: 768px diff layout preserved at `8rem 1fr` grid (was collapsing to 1fr)
- Changed: 768px diff numerals at 8rem (was collapsing to static 5rem)

## Build Stats
- 21 pages in 1.56s
- CSS: ~1800 lines, ~50KB raw, ~10KB gzipped
- Hero image: 77KB WebP (was 215KB JPEG)
