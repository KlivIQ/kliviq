# Full Tamil & Hindi Coverage

Extend the existing i18n system so every user-visible string on the marketing site renders in the selected language. No new infrastructure — just expanding dictionaries and wiring the remaining hardcoded strings through `t.*`.

## Sections to complete

1. **Hero** — onboarding pill fine print
2. **About** — 3 body paragraphs, 3 pill statements, closing line
3. **Services** — intro paragraph, 4 card titles, descriptions, all bullet lists, "Learn more about…" CTA labels
4. **Why KlivIQ** — "Without KlivIQ" / "With KlivIQ" headers, all 5+5 comparison rows, all 5 stat labels
5. **Process** — "Step N" label, all 6 step titles and descriptions
6. **Projects** — card titles, descriptions, tags, CTAs
7. **Testimonials** — quotes, names, roles/companies
8. **Pricing** — plan names, prices, feature bullets, CTAs, disclaimers
9. **FAQ** — all questions and full answers
10. **Contact section** — all body text and labels
11. **Footer** — column headers, link labels, tagline, legal line

## Approach

- Expand each dictionary (`en.ts`, `ta.ts`, `hi.ts`) with the new keys, grouped by section (e.g. `t.services.cards[0].title`, `t.faq.items[i].q/a`).
- Convert the local `const` arrays inside each section component into references built from `t.*` (so ordering stays identical, only strings change).
- Keep tone native-quality marketing (not literal) as previously approved. Preserve brand names (KlivIQ, Kliviq TryOn, OpenAI, Gemini, Claude, n8n, React, Next.js, Flutter, MVP, CTO, RAG, API) untranslated.
- Keep numeric values (₹20L–₹50L+, 4–6 weeks, 20+ Years) in numerals across all languages.
- No changes to layout, styling, animations, or the language switcher.

## Verification

- Typecheck.
- Playwright: switch to `ta` and `hi`, screenshot each section, confirm no English leaks remain (spot-check via visible-text scrape).
- Build.

## Out of scope

- Blog posts, glossary, service landing pages, legal dialogs (long-form content pages — can be a later phase if desired).
- SEO meta tags per language.
