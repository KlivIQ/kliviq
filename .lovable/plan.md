# Site upgrade: bento services, bolder type, trust row, case-study metrics

## What an exit-intent / scroll CTA is (plain English)

A small card that slides in once, when a visitor is about to leave (mouse moves toward the browser tab/close button) or after they scroll ~70% down the page. It says something like "Before you go — get your free AI Visibility Score" with one button. It appears at most once per visitor (remembered in the browser), can be dismissed, and never blocks the page. It's how sites catch people who read everything but never clicked a CTA.

Not included below — tell me if you want it added.

## 1. Bento grid services section

Rebuild "What We Do" from four equal cards into an asymmetric bento grid:

- AI Consulting — large tile (2 cols x 2 rows), full bullet list, icon watermark
- Fractional CTO — tall tile (1 col x 2 rows)
- Custom App Development — wide tile (2 cols x 1 row)
- MVP Development — standard tile
- Small accent tile: "Book a free 30-min scoping call" CTA

Desktop 3-col grid, tablet 2-col, mobile single column stacked in the same order. Hover states keep the existing lift + glow; content and links stay exactly as they are today (all copy still comes from the translation dictionaries, so TA/HI keep working).

## 2. Bolder typography

- H1: bump to `text-7xl` on desktop, weight 800, `tracking-tight`
- Section H2s: weight 800, tighter letter-spacing, slightly larger on desktop
- Card titles: weight 700
- Body copy unchanged for readability

Applied via existing Tailwind classes so light/dark and all three languages stay intact (Tamil/Devanagari get slightly looser tracking so the heavier weight doesn't crowd glyphs).

## 3. Trust row

New slim band directly below the hero:

- Credential badges: "20+ years engineering leadership", "India + Global delivery", "NDA on day one", "Fixed-price, no scope creep"
- Client / brand logo strip beneath it — I'll need logo files or names from you. Until then the row ships with badges only and the logo strip is added the moment you send them (greyscale, colour on hover, marquee on mobile).

## 4. Case studies with metrics

Add an optional `metrics` field to the portfolio data (label + value, up to 3 per project), rendered as a stat row on both the homepage portfolio cards and the `/portfolio` detail panels, plus fed into each project's JSON-LD.

I will not invent numbers. Send me the real outcomes per project (e.g. Selfsame Therapy, FACO, Zero Rupees, PitchDeckAI, ClinicPing) and I'll wire them in. If you'd rather ship now, I can use non-numeric proof lines ("Live in 3 weeks", "Built solo, end to end") which are true and safe for AI search engines.

## Technical notes

- Files touched: `src/components/sections/ServicesSection.tsx` (bento), new `src/components/sections/TrustRow.tsx`, `src/components/sections/HeroSection.tsx` + section headings (type scale), `src/data/portfolio.ts` and `src/pages/Portfolio.tsx` + `ProjectsSection.tsx` (metrics), dictionaries `en/ta/hi.ts` for new badge and metric labels.
- No backend, no new dependencies; framer-motion reveals reused.
- Verified after build: production build passes, prerendered HTML contains the new sections, and mobile breakpoints (320 / 768 / 1024) checked in the browser.
