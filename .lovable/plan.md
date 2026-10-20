# Hero "Living Circuit" — plan

## What visitors will see
- Headline, copy and buttons appear instantly (no fade-in, no loader).
- Beside the headline (desktop) or below it (mobile), the KlivIQ Circuit K draws itself line by line, then the IQ node pulses with rings.
- Four signal lines shoot to product nodes: Seenzo, KlivIQ Connect, KlivIQ TryOn, ClinicPing. Whole intro ends within 2.5s.
- Hover (desktop) or tap (mobile) a node to open a small live demo card:
  - Seenzo: score dial counting 34 to 82
  - Connect: WhatsApp bubble typing a Tamil reply
  - TryOn: stylised model silhouette with saree pattern swapping on (drawn shapes, no people photos)
  - ClinicPing: appointment row with a "High no-show risk" flag sliding in
- A faint pulse keeps travelling the circuit; nodes drift slightly toward the cursor (desktop only).
- Scrolling down, the circuit stretches out and fades into the Products section, tied to scroll position.
- Phones: simpler draw and pulse, no cursor drift, tap to open demos.
- Reduced-motion setting: static finished circuit, demos open without animation.
- Old animated particle background is removed from the hero.

## Assumption to confirm
The current logo is an image file, not line art, so I will redraw the Circuit K as a clean vector matching it in KlivIQ greens. If you have the original SVG, share it and I will use it instead.

## Technical details
- Add `animejs` v4; new `src/components/hero/LivingCircuit.tsx` (inline SVG paths, `svg.createDrawable`, timeline, `onScroll` sync, `createTimer` for ambient pulse) and `CircuitDemoCard.tsx` with the four demos.
- Load the circuit with `React.lazy` after first paint/idle so it is out of the critical path; SVG container has fixed size to avoid layout shift. Prerendered HTML contains headline and a static fallback SVG (also the reduced-motion version).
- `src/pages/Index.tsx` hero: remove `CanvasBackground` and the framer-motion entrance animations on the headline/copy (they start hidden); keep layout. Delete `CanvasBackground.tsx` if no other usages.
- Demo strings added to `ta.json`/`hi.json`; node labels are brand names and stay English.
- Colors via existing tokens (primary greens), works in light and dark.
- Verify: build, Playwright at 390px and 1280px (draw, tap-demo, reduced motion, no console errors), Lighthouse mobile run targeting 90+.
- Update memory animation note (anime.js for hero; canvas particles retired).
