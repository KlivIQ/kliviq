# Living Circuit: put all labels below the logo

## What changes
- All six labels sit neatly under the Circuit K in two tidy rows, so lines no longer spread out in every direction.
  - Row 1, services: SEO · GEO · AEO, AI Agents & Skills, Web & Mobile Apps
  - Row 2, products: Seenzo, KlivIQ Connect, KlivIQ TryOn
- Signal lines drop down from the IQ dot, run along a shared line, then branch straight down to each label. It looks like a circuit board, not a spider.
- Demos, hover/tap, pulses, translations, colours and everything else stay the same.

## Technical details
- `src/components/hero/LivingCircuit.tsx`: rewrite only the `NODES` coordinates and paths. Services at y≈146, products at y≈184. Left column is left-anchored at x≈6, middle column centred at x=100, right column right-anchored at x≈194, so labels don't get cut off on phones. Paths: `M126 102 L126 128 L{x} 128 L{x} {y}` style (products branch from a second rail at y≈166).
- Move the "Tap a node" hint a little lower if it overlaps row 2.
- Check with Playwright at 390px and 1280px: no clipped or overlapping labels, demos still open, no console errors.
