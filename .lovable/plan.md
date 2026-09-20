# Consultation Booking Popup

Replace every "Book a Free Consultation" link with a single popup form that emails you the enquiry and emails the visitor a confirmation.

## The popup

Opens instantly over the page (no new tab), matching the site's dark theme and green accent, fully responsive.

Fields:
- Name — required, live validation
- Email — required, live email-format check
- Mobile — required, live number check (international format allowed)
- Service interest — animated selectable chips: AI Visibility, AI Apps & Tools, Website Design / Re-design, Fractional CTO, Others (one required; chips glow/scale on select)
- Optional one-line message

Behaviour: the submit button stays disabled until the form is valid, shows a sending state, then a short success screen ("Thanks — we'll reply within 24 business hours"). Errors show inline, nothing gets lost. Labels available in English, Tamil and Hindi like the rest of the site.

## Emails

1. To you at hello@kliviq.com — a neatly formatted enquiry with name, email, mobile, selected service, message, time and which page they came from. Reply-to is set to the visitor so you can reply directly.
2. To the visitor — a short branded confirmation that their enquiry was received and KlivIQ will get back within 24 business hours.

## Where it appears

Every booking entry point opens the same popup:
- Hero "Book a Free Consultation"
- Exit-intent popup CTA
- Portfolio page CTA
- Products page CTA
- All service pages CTA
- Insights/blog article CTAs

The old calendly.com/kliviq-tech links are removed.

## What I need from you

Sending email needs the backend turned on and your domain verified for sending. I'll enable the backend, then show you a short setup step for kliviq.com (adding a couple of DNS records at your domain provider). Emails start flowing once that's verified; everything else works immediately.

## Technical notes

- New `ConsultationDialog` component (shadcn Dialog + react-hook-form + zod), opened via a small React context so any button can trigger it.
- Framer Motion for chip select animation; existing design tokens only, no hardcoded colours.
- Lovable Cloud enabled; email domain setup + email infrastructure; one edge function `send-consultation` that validates input server-side and enqueues both emails from two React Email templates.
- Honeypot field + basic per-session throttle to block bots. No database table — email only.
- Verify with a build and Playwright pass at mobile/tablet/desktop before finishing.
