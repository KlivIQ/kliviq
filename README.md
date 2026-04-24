# Srilancer — Premium Animated Portfolio

A dark-themed, scroll-driven portfolio website featuring progressive reveal animations, a canvas-based particle background, glassmorphism, and cinematic micro-interactions.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** — fast dev server and build
- **Tailwind CSS v3** — utility-first styling with a custom design system
- **Framer Motion** — scroll-triggered animations and transitions
- **shadcn/ui** — accessible component primitives

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

- `src/components/sections/` — Hero, About, Services, Projects, Testimonials, Process, Contact, Footer
- `src/components/` — Shared UI (Navbar, CustomCursor, ParticleBackground, LoadingScreen)
- `src/hooks/` — Custom hooks (e.g. `useScrollReveal`)
- `src/index.css` & `tailwind.config.ts` — Design tokens and theme
