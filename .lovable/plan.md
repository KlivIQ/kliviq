# Scroll-Morphing 3D Background

Replace the current static 3D starfield with a single continuous 3D scene whose camera, geometry, and colors **transform as the user scrolls** through the site. One unified scene — no jarring scene swaps between sections — tuned to a moderate intensity (3/5): present and atmospheric, never competing with content.

## The journey (one scene, scroll-driven)

```text
Hero        →  Deep starfield, camera drifts slowly forward
About       →  Stars condense into a faint wireframe sphere
Services    →  Sphere unfolds into a slow-rotating icosahedron lattice
Projects    →  Lattice disperses into a flowing particle grid (data feel)
Testimonials→  Grid softens into ambient drifting motes (calm)
Process     →  Motes align into a vertical neon flow line
Contact     →  Flow line collapses back into a distant starfield (loop)
```

Each transition is interpolated by scroll progress — no hard cuts. Purple/teal palette stays constant; only density, formation, and camera position morph.

## Visual rules (intensity 3 / 5)

- Background is felt, not stared at — opacity ~0.7, blur on far plane via fog
- Maximum motion at section boundaries; near-still mid-section so text reads cleanly
- Glassmorphism cards already provide contrast — no extra overlay
- Reduced-motion users get the static starfield (current behavior preserved)
- Mobile gets the simplified version (lower particle count, no morphing — just gentle drift)

## Technical approach

**New hook** `src/hooks/useScrollProgress.ts`
- Tracks `window.scrollY / (scrollHeight - innerHeight)` → 0..1
- Throttled with `requestAnimationFrame`, exposed as a `useRef` (avoids re-renders on scroll)

**Rewrite** `src/components/ThreeBackground.tsx`
- Single `<Canvas>` with one `<Points>` mesh of ~2,500 particles (600 mobile)
- Each particle has **two target positions** stored in buffer attributes: `positionA` (current formation) and `positionB` (next formation). A uniform `uMix` (0..1) lerps between them inside a custom vertex shader.
- A `formations` array holds 7 generators: `starfield`, `sphere`, `lattice`, `grid`, `motes`, `flowLine`, `starfieldFar`
- `useFrame` reads the scroll progress ref:
  - Determines current segment (e.g. progress 0.28 → between formation 1 and 2, local mix 0.4)
  - Updates `positionB` buffer when crossing into a new segment (swap target)
  - Smooths `uMix` toward target with damping (no snap)
  - Drives camera Z and slight rotation along a Catmull-Rom spline through 7 keyframes
- Custom `ShaderMaterial` (vertex + fragment) for:
  - Position interpolation (`mix(positionA, positionB, uMix)`)
  - Per-particle color blend purple→teal driven by progress
  - Soft circular point sprite, additive blending, opacity falloff with depth
- Fog `[#0a0a0f, 25, 70]` for depth fade

**Edits**
- `src/pages/Index.tsx` — no structural change; `ThreeBackground` already mounted
- Memory file `mem://tech/animation-framework` — update note that bg is now scroll-morphing R3F scene

**Performance**
- Single draw call (one Points mesh, shader-driven morph) — cheap
- `dpr={[1, 1.5]}`, `frameloop="always"` (needed for camera spline), `antialias: false`
- Buffer swap only on segment crossings, not every frame
- Mobile path skips morphing entirely (static starfield + slow drift)

## Files

- **Add** `src/hooks/useScrollProgress.ts`
- **Rewrite** `src/components/ThreeBackground.tsx` (formations, shader, scroll-driven morph, camera spline)
- **Update** `mem://tech/animation-framework`

## Acceptance

- Scrolling top→bottom feels like one continuous camera move through evolving formations
- No section has a hard background change; transitions are felt as the scene reshaping
- Text/cards always remain primary; background never overpowers
- 60fps desktop, smooth on mid-range mobile (with simplified path)
- Reduced-motion users see a static starfield
