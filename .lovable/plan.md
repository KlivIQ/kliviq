

# Remove Lovable References

Strip all Lovable-related branding, metadata, and tooling references from the project so it reads as a standalone Srilancer codebase.

## Changes

### 1. `index.html` — Remove Lovable OG/Twitter assets
- Replace `og:image` (`https://lovable.dev/opengraph-image-p98pqg.png`) with a neutral placeholder (`/placeholder.svg`)
- Change `twitter:site` from `@Lovable` to `@Srilancer`
- Replace `twitter:image` similarly with `/placeholder.svg`

### 2. `README.md` — Rewrite
- Replace "Welcome to your Lovable project" with a Srilancer-focused project description (overview, tech stack, dev commands).

### 3. `vite.config.ts` — Remove `lovable-tagger`
- Remove the `import { componentTagger } from "lovable-tagger"` line
- Simplify the `plugins` array to just `[react()]`

### 4. `package.json` — Remove `lovable-tagger` dependency
- Drop `"lovable-tagger": "^1.1.13"` from `devDependencies`

### 5. Hide the "Edit with Lovable" badge on published deployments
- Use the publish-settings tool to set `hide_badge: true` (requires Pro plan; if unavailable, this step will surface an error and can be skipped).

## Files left untouched (intentionally)

- `playwright.config.ts` and `playwright-fixture.ts` import from `lovable-agent-playwright-config`. This is the **internal test harness** required for the project's test runner to function — removing it would break `npm test`/CI. These files are tooling-only, never shipped to users, and contain no Lovable branding visible in the app.
- `package-lock.json` / `bun.lock` — auto-managed by the package manager; will refresh automatically when `lovable-tagger` is removed from `package.json`.
- `tsconfig.node.tsbuildinfo` — build cache artifact, regenerates automatically.

## Outcome

After these changes, nothing visible in the running app, build output, or repo documentation references Lovable. The only remaining mention will be inside the dev-only Playwright test harness package name.

