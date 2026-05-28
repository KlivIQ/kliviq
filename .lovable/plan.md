## Goal

1. Replace the old phone number (+91-9069026969) everywhere with **+91-9884797937**.
2. Remove every "Lovable" reference from the codebase and set the author metadata to **KlivIQ Technologies**.

## Changes

### 1. Phone number update (3 files)
- `src/components/FloatingActions.tsx` — WhatsApp link → `https://wa.me/919884797937?text=...`
- `src/components/sections/ContactSection.tsx` — label `+91-9884797937 (WhatsApp Only)`, href `tel:+919884797937`
- `src/components/sections/FooterSection.tsx` — WhatsApp link → `https://wa.me/919884797937?text=...`

### 2. Author / branding
- `index.html` — change `<meta name="author" content="KlivIQ" />` to `KlivIQ Technologies`.

### 3. Remove Lovable references
- `.lovable/plan.md` — delete the file (internal planning doc that mentions Lovable hosting).
- `src/components/sections/ProjectsSection.tsx` — the Faco project links currently point to `https://faco-site.lovable.app` (lines 13 and 105). See decision needed below.

## Decision needed — Faco project link

The Faco card links to `faco-site.lovable.app`, which is a Lovable-hosted URL. Options:
- **A.** Replace with a non-Lovable URL you own (e.g. `https://faco.in` or any custom domain).
- **B.** Remove the link entirely and keep the card as a static showcase (no CTA).
- **C.** Keep it as-is (would violate the "no Lovable anywhere" rule).

Please confirm which option, and provide the replacement URL if option A.

## Out of scope
- No visual/UX changes.
- No content changes beyond the number and author string.
