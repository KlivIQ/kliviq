# Prerender all routes to static HTML with vite-react-ssg

Goal: every route in the app builds to its own `.html` file containing the actual rendered page markup in `<body>` (not an empty `<div id="root">`). Keep all visual design, component logic, and styling unchanged.

## Approach

Use [`vite-react-ssg`](https://github.com/zhongjun-cn/vite-react-ssg) — a Vite-native static site generator that reuses our existing React Router routes and `react-helmet-async` setup. It renders each route at build time with `renderToString`, writes one HTML file per route, then hydrates on the client.

Why this over alternatives:
- Works with our current Vite config — no framework swap, Lovable preview keeps working.
- Reuses our existing `BrowserRouter` route tree (just exported as a route config).
- Supports dynamic routes via a `getStaticPaths` function — needed for `/services/:slug` and `/glossary/:slug`.
- `HelmetProvider` is already wired in `src/main.tsx`; SSG picks up Helmet output and inlines it into each HTML file.

## Steps

1. **Install** `vite-react-ssg` as a dependency.

2. **Refactor routes into a route config** (`src/routes.tsx`). Today routes are declared as JSX inside `App.tsx` with `<BrowserRouter>`. Convert to a `RouteRecord[]` array that `vite-react-ssg` can iterate at build time. The same array is reused at runtime — no duplication.

3. **Add `getStaticPaths` for dynamic routes**:
   - `/services/:slug` → enumerate from `src/data/serviceLandingPages.ts`
   - `/glossary/:slug` → enumerate from `src/data/glossary.ts`

4. **Update `src/main.tsx`** to use `vite-react-ssg`'s `ViteReactSSG` entry, passing the route config and keeping `HelmetProvider` as the root wrapper.

5. **Update `package.json` scripts**:
   - `build`: `vite-react-ssg build` (replaces `vite build`)
   - `dev`: unchanged (`vite`)
   - `prebuild` (sitemap generation) stays as-is.

6. **Handle SSR-unsafe code**: a few components touch `window` / `document` at module or render time (e.g. `CustomCursor`, `LoadingScreen`, `useScrollProgress`, the `hash` check in `Index.tsx`). Guard each with `typeof window !== "undefined"` or move the access into `useEffect` so SSR doesn't crash. No visual change.

7. **`react-three/fiber` (`ThreeBackground`)**: Three.js can't run during SSR. Render it only on the client by gating the component behind a mounted check (`useEffect` + state). The fallback during SSR is just the background color — no layout shift since it's absolutely positioned.

8. **Verify the build output**. After `npm run build`, `dist/` should contain:
   ```
   dist/index.html
   dist/services/ai-consulting/index.html
   dist/services/fractional-cto/index.html
   dist/services/ai-strategy/index.html
   dist/services/custom-app-development/index.html
   dist/services/mvp-development/index.html
   dist/scopesnap/index.html
   dist/clinicping/index.html
   dist/pitchdeck/index.html
   dist/glossary/index.html
   dist/glossary/<each-slug>/index.html
   dist/404.html
   ```
   Confirm with: `find dist -name '*.html' | sort` and spot-check one file with `grep -c 'KlivIQ' dist/services/ai-consulting/index.html` (must be >0 and the file must contain real section markup, not just `<div id="root"></div>`).

9. **Stop point** — once the HTML files exist with real body content, hand back to you before doing the Phase 2 per-page metadata work.

## Technical notes

- `vite-react-ssg` outputs both pre-rendered HTML AND the JS bundle. After hydration the app behaves identically to today's SPA — `BrowserRouter` client-side navigation still works.
- `react-helmet-async` already supports SSR via `HelmetProvider`'s `context` API; `vite-react-ssg` wires this automatically.
- No changes to `tailwind.config.ts`, `index.css`, components' visual code, or `public/` assets.
- `vercel.json` may need a tweak so Vercel serves `dist/services/ai-consulting/index.html` for `/services/ai-consulting`. Most static hosts (including Vercel) do this by default with `cleanUrls`, but I'll verify and adjust if needed.

## Risks / things I'll watch for

- A component that calls a hook conditionally or accesses `window` in the render body will crash the build. Fix per occurrence; doesn't change UX.
- `framer-motion` is SSR-safe in current versions — no action needed.
- `react-router-dom` v6 + `vite-react-ssg` is a supported combo; route config format is well documented.

## Out of scope (next phase)

- Per-route `<title>`, `<meta description>`, `<link rel="canonical">` audit and updates (most routes already have these via Helmet — we'll verify after SSG is green).
- OG image work.
