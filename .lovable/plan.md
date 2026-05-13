# Mobile-only polish

All changes are gated by mobile breakpoints (`md:` Tailwind prefix or `useIsMobile`). Desktop and tablet output stays byte-identical.

## 1. Hero "Currently accepting" pill overlap
File: `src/components/sections/HeroSection.tsx`
- The pill sits right above the bottom scroll indicator and overlaps it on short mobile viewports.
- Fix: hide the bottom scroll indicator on mobile (`hidden md:flex`) and add bottom padding (`pb-24 md:pb-0`) on the section so the pill clears the new floating bottom nav.

## 2. Animated background not visible on mobile
File: `src/components/ThreeBackground.tsx`
- Currently `MorphScene` early-returns when `isMobile` is true (only a static rotation, no morph, no color progress) and the wrapper still mounts — but the scene reads as nearly empty because `uProgress` stays 0 and camera never moves.
- Fix: on mobile, run a lighter version of the same scene — keep particle count low (already 600), but allow the morph + camera interpolation to run with a slower delta multiplier. Drop the `reducedMotion || isMobile` short-circuit so mobile also gets the morph; keep the early-out only for `reducedMotion`.
- Also bump opacity slightly on mobile so the dark canvas reads against `#0A0F1E`.

## 3. Tiny WhatsApp button on mobile
File: `src/components/FloatingActions.tsx`
- The WhatsApp FAB is currently `w-14 h-14` always. Make it `w-11 h-11 md:w-14 md:h-14` and shrink the icon to `w-5 h-5 md:w-7 md:h-7`. Tooltip already hidden on touch (no hover) — leave as-is.
- Reposition container to `bottom-20 md:bottom-6` so it sits above the new mobile bottom nav.

## 4. Static mobile bottom nav
New file: `src/components/MobileBottomNav.tsx`, mounted in `src/pages/Index.tsx`.
- Fixed bar at `bottom-0`, `md:hidden`, glassmorphism (`glass-strong`), safe-area padding.
- 5 icon+label items linking to `#about`, `#services`, `#projects`, `#pricing`, `#contact` (lucide icons: User, Briefcase, FolderKanban, Tag, Mail).
- Height ~64px. Uses existing design tokens (`text-muted-foreground`, active `text-primary`).
- The existing top `Navbar` stays untouched — hamburger menu remains available.

## 5. Smaller testimonial text on mobile
File: `src/components/sections/TestimonialsSection.tsx`
- Card padding: `p-6 md:p-10` (currently `p-8 md:p-10`).
- Quote paragraph: add `text-sm md:text-base` and `leading-relaxed` (already there). Reduces visual weight of the long Jocelyn quote on mobile.
- Quote mark: `text-4xl md:text-5xl`.
- No content edits.

## Out of scope
No changes to desktop layouts, content, colors, or any other section.
