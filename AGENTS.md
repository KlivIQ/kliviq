# AGENTS

- Products, services, industries and pricing live in `src/data/catalog.ts`; pages, nav, footer, JSON-LD and the sitemap all read from it — one source keeps them in sync.
- Local business identity and telephone links use `src/data/business.ts`; the homepage adds ProfessionalService alongside Organization so contact facts stay consistent.
- Privacy and terms pages reuse the exported legal content from `LegalDialog.tsx`; footer navigation and the sitemap expose their URLs without duplicating legal text.
- `src/data/catalog.ts` must not import `@/` aliases or asset files — the sitemap script runs it under plain tsx.
- Every page renders `<Seo>` (src/components/site/Seo.tsx) for title/description/canonical/OG/JSON-LD; `index.html` must not contain title/description/og:title/og:url tags, because the SSG build cannot override static ones.
- Moved URLs are listed in `redirects` in `src/routes.tsx` and mirrored as 301s in `vercel.json` — keep both lists identical.
- Theme: light is the `:root` default, dark is the `.dark` class (key `kliviq-theme-v2`), set pre-paint by an inline script in index.html.
- Booking: `ConsultationForm` is the single form (popup via BookingContext, inline on /contact); it posts to the `send-consultation` edge function.
- Analytics events use `src/lib/analytics.ts`; `RouteTracker` skips initial page views and events carry no personal data, keeping GA4 safe when blocked or prerendering.
- Inner-page and catalog copy is translated via English-keyed maps in `src/i18n/content/{ta,hi}.json` using `tr()`/`loc()` from `useLang`; when English copy changes, add the new string to both maps or it silently shows English. SEO/JSON-LD stay English.
