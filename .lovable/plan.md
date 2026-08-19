# Faster site + a dedicated Products page

Two parts: cut the load time on the homepage, then build a proper `/products` page and slim the homepage section down to a teaser.

## Part 1 — Make the site load fast

### What's slowing it down today

- **three.js 3D background** — `three` + `@react-three/fiber` + `@react-three/drei` is by far the largest chunk in the bundle and it starts downloading on the homepage immediately. This is the main reason the page feels stuck before the second section.
- **All three language dictionaries ship in the main bundle** — English, Hindi and Tamil (~82 KB of source) are all imported eagerly even though a visitor reads only one.
- **Oversized images** — `thumb-faco.png` is 1 MB, the LinkedIn/Facebook cover PNGs (1.5–1.7 MB each) sit in `src/assets` and the logos are 37–39 KB PNGs. Anything imported by a component ends up in the build.
- **Everything renders at once** — all 12 homepage sections mount on first paint, including heavy Framer Motion animation trees far below the fold.
- **No chunk strategy** — a single large vendor bundle instead of small parallel chunks.

### Fixes

1. **Replace the three.js background with a lightweight canvas effect.** A hand-written 2D canvas particle/gradient field in the same brand palette (dark navy, forest/lime green, purple/teal glow), with the same drifting-and-connecting feel. Removes `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` from the bundle entirely. Respects `prefers-reduced-motion` and drops particle count on mobile.
2. **Lazy-load the language dictionaries.** English stays in the main bundle; Hindi and Tamil load on demand only when the user switches. Also lazy-load the Noto Devanagari/Tamil webfonts instead of pulling them on every visit.
3. **Compress images.** Convert the large PNGs to WebP at sensible dimensions, delete the LinkedIn/Facebook cover PNGs from `src/assets` (they're marketing downloads, not site assets — I'll move them to the artifacts folder so you can still grab them), and add width/height plus `loading="lazy"` and `decoding="async"` to every below-the-fold image.
4. **Defer below-the-fold sections.** Hero + About render immediately; the rest mount as they approach the viewport using the existing `useScrollReveal` pattern with `React.lazy` + `Suspense`. Prerendered HTML is unaffected, so SEO content stays in the source.
5. **Split the bundle.** Add `build.rollupOptions.output.manualChunks` in `vite.config.ts` to separate React, Radix/shadcn, Framer Motion and the router into cacheable chunks, and enable CSS code splitting.
6. **Preload the critical path.** Preconnect to Google Fonts, `font-display: swap`, and preload the hero logo.

Target: first meaningful paint under ~1s and interactive well before the second section, versus the current multi-second wait.

## Part 2 — Dedicated `/products` page

### Structure

New route `/products`, prerendered by `vite-react-ssg` like the rest of the site, driven by a new `src/data/products.ts` model so future products are a data edit, not a code change.

Each product entry: name, tagline, one-line value statement, 3–5 short benefit bullets (no paragraphs), logo, accent color, status (live / waitlist), external URL, category, keywords, and schema fields.

Products:

| Product | Status | Link |
|---|---|---|
| Seenzo — AI Visibility scoring | Live | seenzo.in |
| KlivIQ Connect — WhatsApp AI chatbot | Live | contact |
| KlivIQ TryOn — online saree trial room | Live | kliviq-tryon.vercel.app |
| Aacharam — Tamil roots & ancestry app | Waitlist | waitlist |

### Page design (Google-style, interactive, on-brand)

- Sticky product switcher rail at the top — clicking a product smooth-scrolls and the accent color of the page shifts to match.
- One full-height panel per product: large logo, product name in Poppins ExtraBold, one-line value statement, a compact benefit grid of short phrases with icons, and a **large prominent CTA button** ("Open Seenzo", "Try KlivIQ TryOn", "Join the waitlist") that opens the product site in a new tab.
- Backlit accent glow per product (amber / blue / violet / a new warm gold for Aacharam), matching the existing card treatment.
- Scroll-driven reveals via Framer Motion, magnetic hover on the CTA, subtle parallax on the logo — all CSS/transform based, no new heavy dependency.
- No lengthy paragraphs anywhere; the longest string on the page is one sentence.

### Logos

- **KlivIQ TryOn** — you'll upload it; I'll leave an icon placeholder until then and swap it in.
- **KlivIQ Connect** — I'll design a modern chat/conversation mark in the blue accent, geometric and professional, matching Seenzo's visual weight.
- **Aacharam** — I'll design a mark rooted in Tamil/Indian visual tradition (kolam geometry, banyan/root motif) rendered in a clean modern style, not decorative clip-art.

Both generated as transparent PNGs at the same scale as the Seenzo logo, embedded the same way so Vercel serves them without a separate CDN fetch.

### SEO / GEO / AEO

- Per-page head via the existing `vite-react-ssg` `Head`: title, description, canonical `https://www.kliviq.com/products`, `og:*`, `twitter:card`.
- JSON-LD via the existing `JsonLd` component: `ItemList` of all products, a `SoftwareApplication` or `Product` block per product with `applicationCategory`, `featureList`, `offers`, `brand`, plus `BreadcrumbList` and an `Article` author block matching the pattern used on glossary and service pages.
- AEO: a short Q&A block per product ("What is Seenzo?", "Who is KlivIQ Connect for?") rendered as visible text and mirrored into `FAQPage` schema so AI engines can quote it directly.
- Keywords woven naturally into headings and copy: AI visibility scoring, generative engine optimisation, WhatsApp AI chatbot India, virtual saree try-on, AI try-on for ecommerce, Tamil ancestry app, family tree India, AI products for small business.
- `/products` added to `scripts/generate-sitemap.ts` at priority 0.9; `public/llms.txt` updated with the products listing.
- All content is statically prerendered, so crawlers see the full text in raw HTML.

### Homepage changes

The Products section becomes a compact teaser: a single row of four small product chips (logo + name + one-line tagline), plus a prominent "Explore all products" button linking to `/products`. Each chip also links to its section on `/products`. Existing full descriptions move to the new page. Navbar gets a "Products" link.

## Technical notes

- Files touched: `vite.config.ts`, `src/routes.tsx`, `src/data/products.ts` (new), `src/pages/Products.tsx` (new), `src/components/products/*` (new), `src/components/sections/ProductsSection.tsx`, `src/components/ThreeBackground.tsx` → replaced by `src/components/CanvasBackground.tsx`, `src/components/sections/HeroSection.tsx`, `src/i18n/LanguageContext.tsx`, `src/pages/Index.tsx`, `src/components/Navbar.tsx`, `scripts/generate-sitemap.ts`, `public/llms.txt`, `index.html`, `package.json`.
- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` removed from dependencies.
- Verification: production build must pass, prerendered `dist/products/index.html` must contain the product names, CTA links, and `ItemList` / `SoftwareApplication` / `FAQPage` schema; bundle size reported before and after.
