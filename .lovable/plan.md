## Plan

### 1. Update `index.html`
- Switch all URLs from `https://kliviq.lovable.app/` to `https://www.kliviq.com/` (canonical, og:url, og:image, twitter:image, all JSON-LD `url`/`logo`/`image` fields).
- Replace existing `ProfessionalService` JSON-LD with the user-provided block (KlivIQ Technologies, founder Sri, serviceType list, email, etc.).
- Keep existing `Organization` and `WebSite` JSON-LD (URLs updated to www.kliviq.com).

### 2. Create `public/sitemap.xml`
Static file with homepage entry:
- `loc`: `https://www.kliviq.com/`
- `lastmod`: today's date (2026-05-15)
- `changefreq`: monthly
- `priority`: 1.0

### 3. Update `public/robots.txt`
- Keep existing per-bot allow blocks.
- Append `Sitemap: https://www.kliviq.com/sitemap.xml` directive.

No source code or routing changes. No new dependencies.