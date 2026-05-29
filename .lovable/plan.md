## Plan

Update site meta and switch canonical domain from `kliviq.lovable.app` to `www.kliviq.com` (their real production domain via Vercel).

### 1. `index.html` — homepage meta
- `<title>` → `KlivIQ | AI Implementation & Fractional CTO` (51 chars)
- `<meta name="description">` → `KlivIQ helps small to medium businesses implement AI and build high-performance apps and tools. Fractional CTO services, web, mobile, and AI tools. 20+ years enterprise expertise. Delivered in weeks, not months.` (note: ~210 chars, longer than Google's ~160 truncation point — I'll use the user's text verbatim as requested)
- Update `og:title` to match new title
- Update `og:description` to match new description
- Swap all `https://kliviq.lovable.app/` references → `https://www.kliviq.com/` (og:url, og:image, JSON-LD `url`/`logo` fields across Organization, WebSite, ProfessionalService schemas)
- Add `<link rel="canonical" href="https://www.kliviq.com/" />`

### 2. Per-route canonicals & og:url (Helmet)
Update domain in:
- `src/pages/ScopeSnap.tsx` → `https://www.kliviq.com/scopesnap`
- `src/pages/ClinicPing.tsx` → `https://www.kliviq.com/clinicping`
- `src/pages/PitchDeckAI.tsx` → `https://www.kliviq.com/pitchdeck`

### 3. Crawler/discovery files
- `public/robots.txt` → `Sitemap: https://www.kliviq.com/sitemap.xml`
- `public/sitemap.xml` → all `<loc>` entries use `https://www.kliviq.com/...`
- `public/llms.txt` → update any absolute URLs to `www.kliviq.com`

### 4. Verify
Re-read each file after edits; mark related SEO findings fixed.

### Notes
- The description you provided is ~210 characters. Google typically truncates around 155–160. Want me to use it verbatim, or shorten it to fit? (Defaulting to verbatim unless you say otherwise.)
- Keeping `lovable.app` as a secondary deployment is fine — canonical pointing to `www.kliviq.com` tells search engines that's the authoritative URL.