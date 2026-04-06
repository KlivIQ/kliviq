

# Sri's Premium Animated Portfolio

## Overview
A dark-themed, scroll-driven portfolio with progressive reveal animations, particle backgrounds, glassmorphism, and micro-interactions — designed to feel cinematic, not like a typical website.

## Design System
- **Theme**: Dark base (`#0a0a0f`) with purple/teal gradient accents and subtle neon highlights
- **Typography**: Bold, minimal — large headings with generous whitespace
- **Effects**: Glassmorphism cards, soft glows, gradient borders, parallax depth layers

## Sections & Interactions

### 1. Loading Screen
- Animated logo/text "Srilancer" assembles letter by letter, then fades into the site
- Feels like a product launch, not a spinner

### 2. Hero Section
- Full-viewport with animated particle/starfield background (canvas-based)
- Headline text reveals word-by-word on load with staggered fade-up
- Subtle floating gradient orbs that drift slowly
- CTA button with glow pulse effect
- Custom cursor dot that follows mouse with trailing effect

### 3. About Section
- Scroll-triggered: content slides in from opacity 0 as user reaches it
- Key points appear as glassmorphism pills that pop in sequentially
- Subtle parallax on background elements

### 4. Services Section
- 4 service cards in a grid, each with glassmorphism styling
- Cards reveal one-by-one with staggered scale-in animation on scroll
- Hover: card lifts with glow border and icon animation
- Gradient icon accents (purple → teal)

### 5. Projects Section
- Horizontal-feeling showcase — cards slide in from alternating sides
- Each project card has a gradient overlay, metric stat that counts up on scroll
- Hover reveals subtle depth shift

### 6. Testimonials Section
- Fade-and-slide transitions between quotes
- Glassmorphism quote cards with subtle floating quotation marks
- Auto-rotating with manual control

### 7. Process Section
- Vertical timeline with connected nodes
- Each step reveals as user scrolls past — node lights up with neon glow
- Step content fades in beside the active node

### 8. Contact Section
- Clean centered layout with glassmorphism card
- Contact details with hover glow effects
- CTA button matching hero style
- Subtle background gradient animation

### 9. Footer
- Minimal single line with soft glow divider

## Technical Approach
- **Scroll animations**: Intersection Observer API for scroll-triggered reveals
- **Particle background**: Lightweight canvas-based particle system (no heavy libraries)
- **Cursor effects**: Custom cursor follower via mouse event listeners
- **Counter animations**: requestAnimationFrame-based number counting
- **Responsive**: Mobile-first with touch-optimized interactions; particles simplified on mobile; timeline adapts to single-column

## Key Packages
- `framer-motion` — for smooth scroll-triggered animations and layout transitions

