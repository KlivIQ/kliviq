# Portfolio revamp, nav cleanup, and site-wide link audit

## 1. Rename "Projects" to "Portfolio"

The homepage section becomes "Portfolio" in all three languages (EN/TA/HI). The section anchor stays `#projects` internally so existing deep links keep working, with a `#portfolio` alias added.

## 2. Portfolio content changes

New card order:

1. **Selfsame Therapy** — https://selfsametherapy.com (new, featured first)
2. **FACO** — link corrected to https://facocoffee.com
3. **Zero Rupees** — https://zero-rupees.vercel.app/
4. **PitchDeckAI**
5. **ClinicPing**

- ScopeSnap is removed from the portfolio grid. The `/scopesnap` page itself stays live and reachable by direct link (per your choice).
- Selfsame Therapy write-up (short, on-brand, translated to TA/HI):
  "Online counselling practice for NRIs — a calm, culturally-aware brand site with services, approach, testimonials and free intro-call booking. Built and shipped for a UK-based counsellor." Badge: CLIENT WORK. CTA: Open live.
- Thumbnail: download the site's hero image, convert to optimised WebP, add as `src/assets/thumb-selfsame.webp`.

## 3. New Portfolio page (`/portfolio`)

Apple-style, animated, scroll-driven:

- Full-bleed hero with large kinetic headline and a subtle parallax reveal.
- One large "product story" panel per project: sticky image that scales/parallaxes as text blocks slide in, project meta (year, category, stack chips), and a large pill CTA to the live site.
- Sticky project index rail on desktop; horizontal chip scroller on mobile.
- Reuses the existing glass/emerald design tokens and framer-motion patterns already used on `/products`.
- Data-driven from a new `src/data/portfolio.ts` so future projects are one object each.
- Full SEO/GEO: `Head` title/description/canonical (`https://www.kliviq.com/portfolio`), OG tags, `CollectionPage` + `ItemList` + `BreadcrumbList` JSON-LD, sitemap and `llms.txt` entries.
- Homepage portfolio section keeps the card grid and gains a "View full portfolio" CTA into `/portfolio`.

## 4. Header menu restructure

New desktop structure:

- Products
- Services (dropdown, unchanged)
- **Work** (new dropdown): Portfolio · Case Highlights (`/#projects`) · **Process** (`/#process`)
- About
- Pricing
- Resources (dropdown: Blog, Glossary)
- Lang · Theme · Start a Project

Responsive fixes:

- Desktop nav switches to `lg:` breakpoint (currently `md:`), so the crowded 768–1024px range gets the mobile menu instead of a squashed row.
- Gap scales with viewport (`gap-4 xl:gap-7`), links get `whitespace-nowrap`, container padding tightens on small desktops, and the CTA shrinks below `xl`.
- Mobile menu gains the same nested "Work" group and becomes scrollable with a max height so it never overflows on short screens.

## 5. Site-wide audit

**Links and buttons** — verify every internal route, hash anchor, footer link, CTA and external link across the homepage, product/service/glossary/blog pages, mobile bottom nav and floating actions. Fix any 404s, stale anchors, or dead buttons found. Checked with a headless browser pass over the built site.

**Lovable references** — one live reference exists: the FACO card points at `faco-site.lovable.app` (being replaced with facocoffee.com in step 2). A full sweep will also cover meta tags, `index.html`, `robots.txt`, `llms.txt`, README, and any remaining `*.lovable.app` URLs in code or content, replacing them with kliviq.com equivalents where the URL is user-facing.

## Technical notes

- New files: `src/pages/Portfolio.tsx`, `src/data/portfolio.ts`, `src/assets/thumb-selfsame.webp`.
- Edited: `ProjectsSection.tsx`, `Navbar.tsx`, `routes.tsx`, `App.tsx`, the three i18n dictionaries, `scripts/generate-sitemap.ts`, `public/llms.txt`.
- Route registered in `routes.tsx` with `entry` so vite-react-ssg prerenders `/portfolio` statically.
- Verification: `bun run build` plus a Playwright pass checking the new page, nav at 3 viewport widths, and link integrity.
