## Add Pricing + FAQ sections

Two new sections inserted between Process and Contact in `src/pages/Index.tsx`. All existing design, animations, colors, and 3D background remain untouched. Reuse existing tokens (`gradient-text`, `glass-strong`, `glow-purple`, `--primary` indigo, `--brand-cyan`, `useScrollReveal`, framer-motion patterns from `ProcessSection`/`TestimonialsSection`).

### 1. PricingSection (`src/components/sections/PricingSection.tsx`)

- Anchor: `id="pricing"` (matches existing navbar link).
- Layout mirrors other sections: `relative py-32 px-6`, `max-w-6xl mx-auto`, label `PRICING` in `text-secondary uppercase tracking-widest`.
- Headline: `Honest Pricing.` (white) + `No Surprises.` (gradient-text span).
- Subline: muted, centered, two-line copy.
- Region toggle: two pill buttons (`🇮🇳 India (₹)` / `🌍 Global ($)`) controlled by `useState<'india' | 'global'>`. Active = solid `bg-primary text-primary-foreground`; inactive = `border border-border/50 text-muted-foreground hover:text-foreground`. Animated with framer-motion `layoutId` highlight for smooth swap.
- Grid: `grid md:grid-cols-2 gap-4` of pricing cards. Each card = `glass-strong` rounded panel with category chip (Web / Mobile / AI / Retainer color-coded via `bg-primary/10`, `bg-secondary/10`, `bg-brand-cyan/10`), title, and `from ₹X` price in gradient-text. Animate switch with `AnimatePresence` fade/slide.
- Data arrays:
  - `INDIA_PRICING` — 9 items (Landing Page 35k, Business 75k, E-Commerce 1,00,000, Custom Platform 2,50,000, MVP App 2,50,000, Flutter 4,00,000, AI Chatbot 60k, Custom AI 2,00,000, Retainer 12k/mo).
  - `GLOBAL_PRICING` — 8 items as specified.
- Notes block: `glass` rounded panel with 4 lines (✅ ✅ ✅ 📞).
- CTA: centered `Get a Free Estimate →` button styled like Hero CTA (`bg-gradient-to-r from-primary to-secondary`, pulse glow), links to `#contact`.

### 2. FaqSection (`src/components/sections/FaqSection.tsx`)

- Anchor: `id="faq"`.
- Reuses existing `src/components/ui/accordion.tsx` (Radix-based, already has rotating chevron).
- Layout: `max-w-3xl mx-auto`, label `FAQ`, headline `Questions We Get Asked Most` with last 2 words wrapped in `gradient-text`.
- 7 Q&A items as listed, rendered via `Accordion type="single" collapsible`. Items styled with `glass` border, padded, hover tint. Wrapping container uses `useScrollReveal` for fade-in.

### 3. Wire-up

- `src/pages/Index.tsx`: import the two new sections, insert order:
  ```
  ProcessSection
  PricingSection   ← new
  FaqSection       ← new
  ContactSection
  ```
- No other files touched. Navbar `#pricing` link will now resolve correctly.

### Out of scope

- No changes to design tokens, 3D scene, hero, about, services, projects, testimonials, process, contact, footer, or meta tags.
- No new dependencies (Accordion already installed).
