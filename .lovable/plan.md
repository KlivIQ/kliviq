## Goal

Showcase the 3 new client apps (`/scopesnap`, `/pitchdeck`, `/clinicping`) inside the existing **Projects** section of the portfolio, each with a real screenshot thumbnail, a 1-liner description, a "Built for a client" tag, and an animated link that opens the live page in a new browser tab.

## Implementation

### 1. Capture thumbnails
Use `browser--screenshot` against the live preview URLs for each page:
- `/scopesnap`
- `/pitchdeck`
- `/clinicping`

Save the images as:
- `src/assets/thumb-scopesnap.jpg`
- `src/assets/thumb-pitchdeck.jpg`
- `src/assets/thumb-clinicping.jpg`

### 2. New component `src/components/sections/FeaturedWorkSection.tsx` (or append into `ProjectsSection.tsx`)

Decision: **Augment `ProjectsSection.tsx`** — keep the existing metric cards (proof points), and add a new "Client Work" grid above them so it lives under the same `#projects` anchor used by nav.

Each card:
- Thumbnail image (object-cover, 16:10) with hover zoom + subtle gradient overlay
- Project name + 1-liner
- "Built for a client" badge (uses `--secondary` token)
- Animated CTA: "Open Live →" with arrow translate-x on hover, opens via `<a target="_blank" rel="noopener noreferrer">`
- Whole card clickable; uses framer-motion scroll reveal consistent with existing pattern
- Glassmorphism + neon hover ring matching project's design system (no hardcoded colors)

Copy:
- **ScopeSnap** — AI project scoping tool that turns a one-line brief into deliverables, timeline, cost and tech stack. Built for a client.
- **PitchDeckAI** — Generates investor-ready 10-slide pitch decks in 6 Indian languages from a single idea. Built for a client.
- **ClinicPing** — Clinic ops dashboard with AI no-show prediction and multilingual patient messaging. Built for a client.

### 3. Wiring
No changes needed to `App.tsx` (routes already exist). Links use absolute project URLs (`/scopesnap`, etc.) with `target="_blank"`.

### 4. Verification
- Confirm build passes (auto)
- Visually verify the 3 cards render with thumbnails on mobile + desktop
- Confirm links open in a new tab

## Out of scope
No changes to the metric cards, no changes to desktop nav, no changes to mobile nav (Projects already linked).
