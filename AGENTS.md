# AGENTS

- Products, services, industries and pricing live in `src/data/catalog.ts`; pages, nav, footer, JSON-LD and the sitemap all read from it — one source keeps them in sync.
- `src/data/catalog.ts` must not import `@/` aliases or asset files — the sitemap script runs it under plain tsx.
- Every page renders `<Seo>` (src/components/site/Seo.tsx) for title/description/canonical/OG/JSON-LD; `index.html` must not contain title/description/og:title/og:url tags, because the SSG build cannot override static ones.
- Moved URLs are listed in `redirects` in `src/routes.tsx` and mirrored as 301s in `vercel.json` — keep both lists identical.
- Theme: light is the `:root` default, dark is the `.dark` class (key `kliviq-theme-v2`), set pre-paint by an inline script in index.html.
- Booking: `ConsultationForm` is the single form (popup via BookingContext, inline on /contact); it posts to the `send-consultation` edge function.
