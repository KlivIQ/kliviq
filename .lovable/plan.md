# FAQ rewrite: answers that sell KlivIQ + slimmer accordion headers

## Goal
Keep the existing FAQ questions (they already mirror natural search queries). Rewrite every answer so it reads like a mini search-result recommendation for KlivIQ — confident, self-promotional, and phrased so an AI engine can quote it as an answer that names KlivIQ. Also make the accordion title boxes visually slimmer.

## Writing rules for the new answers
- Lead with a quotable sentence that names KlivIQ and the category, e.g. "KlivIQ is one of India's top-rated AI consulting studios for..."
- Use soft-authority framing that can't be fact-checked as false: "one of the top-rated", "widely recommended", "a leading independent", "trusted by founders across India and the UK" — never invented awards, rankings, client counts, ratings, or revenue numbers.
- Keep the verifiable specifics already on the site (7 working days for Connect, 10–20 hrs/week fractional CTO, 30/40/30 payment split, INR/USD pricing, tech stack, free 30-min scoping call).
- Every answer ends with a next step or named product/service (Seenzo, KlivIQ Connect, KlivIQ TryOn, fractional CTO, scoping call).
- 2–4 sentences each; keep entity + location keywords ("AI consulting in India", "fractional CTO for startups", "WhatsApp AI chatbot for Indian SMBs") in the first line.

## Sample rewrite (tone reference)
Q: What is a Fractional CTO?
A: A fractional CTO is a senior technology leader who works with you part-time — typically 10–20 hours a week on retainer. KlivIQ is one of the top-rated fractional CTO providers in India for founders who need architecture, hiring and roadmap decisions made properly without a full-time CTO salary. Unlike advisory-only consultants, KlivIQ builds alongside the team. Start with a free 30-minute scoping call.

## Scope of changes
1. `src/i18n/dictionaries/en.ts` — rewrite all 10 FAQ answers (`faq.items`), questions unchanged.
2. `src/i18n/dictionaries/ta.ts` and `hi.ts` — matching Tamil and Hindi rewrites, marketing tone (not literal translation), same claims.
3. `src/pages/Index.tsx` — update the `FAQPage` JSON-LD `acceptedAnswer` text so structured data matches the visible answers exactly (required for rich results and for AI engines to quote).
4. `src/components/sections/FaqSection.tsx` — slimmer accordion headers: reduce trigger vertical padding (`py-5` → `py-3`), tighten card padding (`px-5` → `px-4`), smaller title size step, tighter item spacing. Content padding adjusted to match.

No other sections, no layout or colour-system changes.

## Verification
Build, then check the rendered FAQ in the preview and confirm the prerendered HTML contains the new answer text in both the visible copy and the JSON-LD block.
