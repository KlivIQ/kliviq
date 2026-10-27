# TryOn page: hide button + phone try-on animation

## 1. Hide "Try KlivIQ TryOn" button (temporary)
- On the TryOn product page only, the top button is hidden. Nothing is deleted, so turning it back on later is a one-line change.
- Other products keep their buttons.

## 2. Looping phone animation in the TryOn page hero
Shown beside the title on desktop and below the text on phones. The homepage Living Circuit stays as it is.

Loop, about 8 seconds:
```text
1. Phone shows a saree product page: saree photo, name, price, "Try On" button
2. A tap ripple lands on "Try On" and the button presses in
3. Short "draping..." shimmer
4. The photo cross-fades to an Indian woman wearing the same saree, with a "Looks great on you" tag
5. Holds, fades back to the product page, and repeats
```
- Two new images, matched so it's clearly the same saree: a flat saree product shot and a woman wearing it (generated, studio look, brand greens around it, no text in the images).
- Phone frame and page are drawn in code, using the site's colours, so they work in light and dark mode.
- Reduced-motion visitors see a still after-image. The headline and text still show up right away.
- Button and tag labels use the English, Tamil and Hindi translations.

## Technical details
- `catalog.ts`: add `hidePrimaryCta: true` to tryon; `ProductDetail.tsx` skips `{cta}` when the flag is set.
- New `src/components/products/TryOnPhoneDemo.tsx` (framer-motion keyframe loop, `useReducedMotion`), rendered in `ProductDetail` hero only when `slug === "tryon"`.
- Images generated as WebP-sized JPGs at `src/assets/tryon-demo/{saree,model}.jpg`, lazy, with fixed dimensions to avoid layout shift.
- New strings go into `ta.json`/`hi.json`.
- Check: build passes, Playwright on desktop and phone sizes, button hidden, loop runs.
