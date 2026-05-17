## Problem

`/scopesnap`, `/pitchdeck`, `/clinicping` are React Router routes. On Lovable hosting they work because the platform falls back to `index.html` for unknown paths. On Vercel, without a rewrite, hitting those URLs directly (or opening them in a new tab via `target="_blank"`) returns 404 because no matching static file exists.

## Fix

Add a `vercel.json` at the project root that rewrites all non-asset requests to `index.html`, letting React Router handle the route on the client.

```json
{
  "rewrites": [
    { "source": "/((?!.*\\.).*)", "destination": "/index.html" }
  ]
}
```

This pattern only rewrites paths without a file extension, so real assets (`/sitemap.xml`, `/robots.txt`, `/kliviq-og.png`, JS/CSS bundles) are still served directly.

## Steps

1. Create `vercel.json` at the repo root with the rewrite above.
2. Redeploy on Vercel.
3. Verify `https://www.kliviq.com/scopesnap`, `/pitchdeck`, `/clinicping` load the React app instead of 404.

## Notes

- No code changes to `ProjectsSection.tsx` or the routes themselves are needed — the links and `App.tsx` routes are correct.
- The stray root-level `scopesnap.html`, `pitchdeck.html`, `clinicping.html` files are not in `public/` so they are not deployed and are unrelated to the 404. They can be deleted in a follow-up if you want a cleaner repo.
