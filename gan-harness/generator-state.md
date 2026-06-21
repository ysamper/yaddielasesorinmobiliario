# Generator State -- Iteration 003

## What Was Built
- Complete editorial redesign with dramatic layout changes
- Sticky heading + scrolling cards layout for investors section
- Dark section (ink background) for differentiators with oversized watermark numerals
- Horizontal scroll-snap reviews carousel
- Frosted glass stats bar with aggressive -7rem hero overlap
- Counter animation on stats (count from 0, typewriter for N.1)
- Timeline progressive fill on scroll
- CSS parallax on hero photo
- Diagonal clip-path section transitions
- Mixed font weight hero typography (300 + 600) at 8rem max

## What Changed This Iteration
- Fixed: Stats bar now overlaps hero by -7rem with frosted glass backdrop-filter
- Fixed: Investors section uses sticky heading on left, single-column cards on right
- Fixed: Differentiators is now a dark (ink) section with oversized 9rem watermark numerals
- Fixed: Reviews use horizontal scroll snap instead of 3-column grid
- Fixed: Diagonal clip-path transitions between sellers/differentiators
- Fixed: Varied padding rhythm across all sections (not uniform 8rem)
- Fixed: Hero headline at 8rem max with mixed font weights (light + bold)
- Fixed: Card description text bumped to 0.9rem from 0.84rem
- Fixed: Global :focus-visible on all interactive elements
- Fixed: prefers-reduced-motion media query disables all animations
- Fixed: Mobile drawer has backdrop overlay + body scroll lock
- Fixed: Escape key closes mobile menu
- Fixed: Hero image has loading="eager" and fetchpriority="high"
- Fixed: Google Maps iframe has width/height attributes
- Fixed: RGPD hint text explains disabled button state
- Added: "Inversores" nav link for investor navigation path
- Added: Differentiated scroll animations (scale, translateX, stagger delays)
- Added: Large decorative background number "03" behind sellers section
- Added: Watermark numbers (8rem) behind investor cards

## Known Issues
- Hero photo is still 210KB JPEG (no AVIF/WebP alternative added)
- CSS remains in single file (acceptable for single-page site)

## Dev Server
- URL: http://localhost:4321
- Status: running
- Command: npm run dev
