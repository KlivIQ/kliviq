

# 3D Particle Starfield Background

Replace the existing 2D canvas particle background with a true 3D starfield rendered via React Three Fiber. The effect should feel like depth and atmosphere — not a showcase. Site-wide, fixed behind all sections.

## Visual direction

- Deep 3D field of small glowing points (purple/teal mix matching existing neon palette)
- Slow autonomous drift on the Z-axis (subtle "moving through space" feel)
- Mouse position causes a gentle camera/scene rotation (parallax) — max ~3° tilt, heavily eased
- Depth fog so far points fade into the `#0a0a0f` background — no harsh edges
- Roughly 2,000 points on desktop, 600 on mobile

## Scope

- Background is **fixed** and lives behind the entire site (not just the Hero), with all sections scrolling over it
- Existing glassmorphism on cards already provides enough contrast — no extra overlay needed
- The 2D canvas `ParticleBackground.tsx` is removed from `HeroSection.tsx`; gradient orbs in the Hero stay (they add foreground depth)

## Technical approach

- Add `three@0.160.0`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0` (versions pinned per R3F React-18 compatibility)
- New component `src/components/ThreeBackground.tsx`:
  - `<Canvas>` with `dpr={[1, 1.5]}`, `gl={{ antialias: false, powerPreference: "high-performance" }}`, `frameloop="always"`
  - Single `<Points>` mesh with `BufferGeometry` of randomized positions in a large box (~spread 60 units)
  - Custom `PointsMaterial`: small `size`, additive blending, vertex colors mixing purple (`#a78bfa`) and teal (`#5eead4`)
  - Fog: `<fog attach="fog" args={["#0a0a0f", 20, 60]} />`
  - `useFrame` rotates the points group very slowly on Y; `useFrame` also lerps camera rotation toward mouse position (damped)
- Mounted once in `src/pages/Index.tsx`, positioned `fixed inset-0 -z-10` (or via component-level wrapper), pointer-events-none
- Mobile: detect via `window.innerWidth < 768` to drop point count and disable mouse parallax (touch devices get only the slow drift)
- Respect `prefers-reduced-motion`: disable rotation + parallax, keep static field
- Lazy-load with `React.lazy` + `Suspense` so the Three.js bundle doesn't block initial paint; fallback is just the dark background

## Files

- **Add** `src/components/ThreeBackground.tsx`
- **Edit** `src/pages/Index.tsx` — mount `<ThreeBackground />` once at the top, fixed behind `<main>`
- **Edit** `src/components/sections/HeroSection.tsx` — remove `<ParticleBackground />` import + usage
- **Delete** `src/components/ParticleBackground.tsx` (no longer used)
- **Edit** `package.json` — add three dependencies

## Acceptance

- Smooth 60fps on desktop, no jank on scroll
- Stars visible but never compete with text/cards
- Mouse parallax is felt, not seen — subtle
- Mobile: lighter, no parallax, still atmospheric
- Reduced-motion users get a static field

