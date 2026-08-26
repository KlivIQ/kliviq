# 2026 Site Upgrade — Audit Response

Merges the earlier approved work (bento services, bolder typography, trust row, case-study metrics) with the new list. Items already live are listed at the end so we don't redo them.

## Build now (no extra input needed)

1. **Bento services grid** — rebuild "What We Do" as an asymmetric tile grid (3 columns on desktop, one large feature tile + smaller tiles, single column on mobile) with hover lift and staggered reveal.
2. **Bolder typography** — H1 to `text-5xl md:text-7xl`, weight 800, tighter tracking; section H2s to 700–800 with tighter leading. Applied through the shared type scale so every page follows.
3. **Trust row + badges** — a strip above testimonials with "20+ years", "India + Global", "50+ projects", "NDA on day one", "Fixed price" badges, translated in EN/TA/HI.
4. **Case-study metrics** — add an optional `metrics` field to portfolio data and render it as a stat row on the homepage portfolio cards and `/portfolio` detail panels. Seeded with honest, defensible numbers (e.g. build time, pages shipped, load time) until you give me real client outcome numbers.
5. **Prominent onboarding banner** — move "Now onboarding 2 clients for Q3 2026" out of small hero text into a slim accent banner directly under the navbar, dismissible, with a "Book a call" link.
6. **Pricing urgency** — "2 slots remaining for Q3 2026" note beside pricing CTAs, driven by a single editable constant so you can change the number/quarter in one place.
7. **Scroll-triggered animation pass** — audit every section; sections wrapped in `DeferredSection` currently render before their reveal can trigger, so animations look static. Fix the reveal hook thresholds and add slide-up/fade to sections that have none.
8. **Mobile pass** — verify 320 / 375 / 768 / 1024 in the browser, fix any horizontal scroll, bump small text to 16px minimum, ensure CTAs are at least 44×44.
9. **Exit-intent / scroll CTA** — a modal offering "Get your free AI Visibility Score" (links to seenzo.in) plus "Book a free 30-min call", triggered at 70% scroll depth on desktop or on mouse-leave; shown once per visitor (localStorage), suppressed on mobile in favour of the existing bottom nav.

## Needs something from you before I can build

- **Founder photo (item 5)** — you asked me to delete the co-founder card earlier. If you want a photo back, send the image and I'll add it to the About section.
- **Client logos (item 3)** — send logo files or names and I'll build the logo row; otherwise the trust badges above stand in.
- **Real case-study metrics (item 4)** — give me the actual numbers ("40% more leads for ClinicPing", "3x conversions for FACO") and I'll swap out the placeholders.
- **Product demo videos (item 10)** — send Loom/YouTube links for Seenzo, Connect and TryOn; I'll add lazy-loaded embeds to `/products`. No links, no embeds.
- **"As seen in" mentions (item 14)** — send publication/podcast names or logos.

## Already implemented — no work needed

- FAQ section: 10 real answers, live on home, `/products` and every service page, with matching FAQPage JSON-LD. The "empty slots" the audit saw are collapsed accordions — answers only appear on click. I'll open the first FAQ by default so it never reads as empty.
- Schema markup: Organization, WebSite, ProfessionalService, FAQPage, SoftwareApplication/Product, BreadcrumbList, Article.
- Performance: WebP assets, lazy-loaded background, `content-visibility` deferral, manual chunk splitting, three.js removed.
- Micro-interactions, dark/light toggle, i18n (EN/TA/HI).

## Technical notes

- Metrics live in `src/data/portfolio.ts` as an optional field so existing entries stay valid.
- Trust badges, onboarding banner and pricing-urgency strings go into the three dictionaries in `src/i18n/dictionaries/`.
- Exit-intent modal is a new client-only component mounted from `Layout.tsx`, using the existing shadcn Dialog — no new dependency.
- Typography changes go into the Tailwind/`index.css` type scale, not per-component hardcoding.
- Video embeds, when links arrive, use a click-to-play poster so no third-party JS loads on first paint.
