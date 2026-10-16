# KlivIQ redesign: from portfolio site to premium product company

A full visual and structural rebuild based on your brief. Delivered in phases so each one can be checked before the next starts. Everything that works today stays working: the booking popup and emails, EN/Tamil/Hindi, glossary, blog, and prerendered SEO pages.

## Visual direction
- **Light mode by default**, with a dark mode toggle that is remembered. Both themes are built from the KlivIQ greens (#166534 deep, #4ADE80 bright), plus warm off-white, ink and one soft sand neutral. All purple and teal accents are removed.
- **Type:** big, confident display headings (Space Grotesk or similar, extra bold, tight letter spacing) with a clean body font. Tamil and Hindi fonts stay as they are.
- **Motion:** Apple-style scroll storytelling. Sticky sections reveal in stages, products move into view as you scroll, and text appears line by line. The animated particle background stays, toned to green and slowed down. Turning on "reduce motion" switches it all to simple fades. Heavy effects are lighter on mobile.
- **Visuals:** abstract illustrations and product mockups with an Indian feel (kolam-style line patterns, WhatsApp screens in Tamil, saree try-on frames, a clinic dashboard). No stock photos of people and no emojis.

## What gets removed
- Pricing table and LinkedIn testimonials come off the home page (both recommendations appear in full on About, and home keeps one short quote with a "Read more" link to About, so home still shows outside proof for search and AI engines).
- The Q1 2027 availability banner, the pricing "urgency" callout and the exit-intent popup all go, per "no urgency banners".
- Any number that isn't proven, such as trust-row figures. Only real facts stay (for example "delivered in 2 days" for Mathavan Traders).
- Emoji flags in the currency labels.

## New site structure
```text
/                         Home showpiece
/products                 index  -> /products/seenzo, /connect, /tryon, /clinicping, /aacharam
/industries               index  -> /industries/healthcare, /ca-professional-services,
                                    /retail-sarees-d2c, /manufacturing
/services/ai-implementation | /fractional-cto | /ai-visibility | /web-mobile-development
/pricing                  INR/USD toggle, 30/40/30 milestones, GST invoices, FAQ
/work                     filterable case studies (AI & Products / Web Design)
/about                    founder story, principles, 2 LinkedIn recommendations
/contact                  short form, WhatsApp, email, booking
/glossary/*, /blog/*      kept as they are
```
- **Home:** vision hero, products showcase, industries, services, selected work, how we work, final call to action.
- **Navigation:** Products, Industries, Services, Work, Pricing, About, plus a "Book a call" button. Products, Industries and Services open mega menus. On mobile, a full-screen menu.
- **Contact form:** reuses the existing consultation form and email flow, shown on the page instead of a popup. WhatsApp button uses wa.me/919840497937, labelled "WhatsApp only".
- **ClinicPing** moves from its standalone demo page into Products, labelled "Pilot". **Aacharam** gets a waitlist that uses the same email flow.

## Redirects for changed URLs
/portfolio to /work · /clinicping to /products/clinicping · /services/ai-consulting and /services/ai-strategy to /services/ai-implementation · /services/custom-app-development and /services/mvp-development to /services/web-mobile-development · /scopesnap and /pitchdeck to /work. Each one gets a permanent server redirect plus a fallback inside the app.

## SEO, GEO and AEO on every page
Each page gets its own title, description, canonical URL on kliviq.com, Open Graph tags and matching structured data:
- Product pages: SoftwareApplication
- Services: Service with a "starting from" Offer
- Industries: WebPage plus links to related products and services
- Work: CreativeWork
- About: Person and AboutPage
- Pricing: OfferCatalog
- All pages: BreadcrumbList

The sitemap, robots.txt and llms.txt are updated to list every new page.

## Phases
1. Design system, light and dark themes, new navigation and footer, redirects.
2. Home showpiece.
3. Products index and the 5 product pages.
4. Industries index and the 4 industry pages, plus the 4 service pages.
5. Pricing, Work, About, Contact.
6. Tamil and Hindi translation of all new text (native marketing tone, not literal).
7. Self-audit: broken links, 360px mobile, contrast in both themes, metadata and structured data on every page, production build. Then a written summary of what changed.

## Things I need from you, or will assume
- **Sri Aishwarya Sarees:** website link and a short note on what was built. Until then I'll show it without a link.
- **Prices:** I'll use today's figures: AI Implementation from ₹75,000 / $2,000, Fractional CTO from ₹40,000/month / $800, Web & Mobile from ₹75,000 / $2,000, AI Visibility (GEO) price TBD. Please confirm the GEO price.
- **Founder story:** I'll write it from "20+ years of enterprise IT". Send anything specific you want included, such as companies, cities or milestones.
- **Saved rules that change:** the old notes on "dark theme default" and "purple/teal accents" will be updated to the new direction. The earlier "no contact form" rule gets an exception for this short form on the Contact page.

## Technical notes
- Keep vite-react-ssg 0.8.9. All new routes are added to routes.tsx, with getStaticPaths for products, industries and services.
- Content lives in data files (products.ts expanded, new industries.ts, services.ts, pricing.ts), so pages stay data-driven and the sitemap generator reads from the same sources.
- Redirects go in vercel.json plus small Navigate routes in the app.
- Theme: the `light` class becomes the default root state, flipped to a `dark` class. Tokens are redefined in index.css and tailwind.config.ts.
- Motion uses framer-motion useScroll with a useReducedMotion guard. Canvas particle density is reduced on small screens.
