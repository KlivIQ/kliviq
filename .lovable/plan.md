# Q1 2027 Availability, Portfolio Cleanup, and Link Fixes

## Changes

1. **Refresh all project-availability messaging**
   - Change the shared availability period from **Q4 2026** to **Q1 2027**.
   - Replace “slots are filling” urgency with positive availability copy: **“Q1 2027 project slots are now open.”**
   - Update the homepage banner, hero availability line, pricing callout, supporting text, and calls to action consistently.
   - Apply polished, native-quality English, Tamil, and Hindi versions.
   - Replace the stale “case studies dropping Q3 2026” portfolio note with timeless current wording so no old quarter remains visible.

2. **Remove PitchDeckAI from the portfolio**
   - Remove its card and translated portfolio copy from both the homepage portfolio section and the full Portfolio page.
   - Update Portfolio page metadata and structured portfolio data so PitchDeckAI is no longer presented as portfolio work.
   - Keep the standalone `/pitchdeck` prototype available; this request removes it from the portfolio, not from the website.
   - Preserve card-to-project alignment after removal so every remaining card keeps the correct image, link, metrics, and translated description.

3. **Fix footer and banner navigation on sub-pages**
   - Change homepage-section links in the footer and availability banner from page-local hashes to root-page anchors such as `/#contact`, `/#services`, and `/#pricing`.
   - Use route-aware navigation consistently so links work from the homepage, Portfolio, Products, service pages, blog pages, and glossary pages.
   - Keep external contact and social links unchanged.

## Verification

- Search the complete site for stale Q4/Q3 availability text and portfolio-facing PitchDeckAI mentions.
- Test the banner and every footer section link from both the homepage and representative sub-pages.
- Confirm each link reaches the intended homepage section and the consultation flow still opens where expected.
- Check English, Tamil, and Hindi at mobile and desktop sizes.
- Run the production build and confirm all static pages generate without errors.
