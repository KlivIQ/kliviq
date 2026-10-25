import { Mail, MapPin, MessageCircle } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import Seo, { ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import ConsultationForm from "@/components/booking/ConsultationForm";
import { SITE_URL } from "@/data/catalog";
import { BUSINESS_CONTACT } from "@/data/business";
import { useLang } from "@/i18n/LanguageContext";

const WA = "https://wa.me/919840497937?text=Hi%20KlivIQ%2C%20I%27d%20like%20to%20discuss%20a%20project.";

const Contact = () => {
  const { tr } = useLang();
  return (
  <SiteShell>
    <Seo
      title="Contact KlivIQ | Book a Call, WhatsApp or Email"
      description="Talk to KlivIQ about AI products, AI implementation, AI visibility, web and mobile development or fractional CTO support. Book a call, WhatsApp +91 98404 97937 or email hello@kliviq.com."
      path="/contact"
      crumbs={[{ name: "Contact", path: "/contact" }]}
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact KlivIQ",
          url: `${SITE_URL}/contact`,
          mainEntity: {
            ...ORG_REF,
            email: "hello@kliviq.com",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: "hello@kliviq.com",
              areaServed: ["IN", "Worldwide"],
              availableLanguage: ["English", "Tamil", "Hindi"],
            },
          },
        },
      ]}
    />
    <PageHero
      eyebrow={tr("Contact")}
      title={<>{tr("Let's talk about")} <span className="gradient-text">{tr("what you're building.")}</span></>}
      lede={tr("Share a few details and a senior person will get back to you within one business day.")}
      crumbs={[{ name: "Contact", path: "/contact" }]}
    />
    <section id="book" className="pb-24">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-10">
            <ConsultationForm source="contact-page" inline heading={tr("Book a call")} subheading={tr("Tell us a little about your project.")} />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-4 lg:col-span-5">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-[1.75rem] border border-border bg-card p-6 transition-shadow hover:shadow-lift">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><MessageCircle className="h-5 w-5" /></span>
            <span>
              <span className="block font-semibold">WhatsApp</span>
              <span className="block text-lg">+91 98404 97937</span>
              <span className="block text-sm text-muted-foreground">{tr("WhatsApp messages only, no calls")}</span>
            </span>
          </a>
          <p className="text-sm">
            <a href={BUSINESS_CONTACT.telephoneHref} className="text-foreground hover:text-brand">{BUSINESS_CONTACT.telephone}</a>
            {" — "}<span className="text-muted-foreground">{tr("WhatsApp messages only, no calls")}</span>
          </p>
          <a href="mailto:hello@kliviq.com" className="flex items-start gap-4 rounded-[1.75rem] border border-border bg-card p-6 transition-shadow hover:shadow-lift">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><Mail className="h-5 w-5" /></span>
            <span>
              <span className="block font-semibold">{tr("Email")}</span>
              <span className="block text-lg">hello@kliviq.com</span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-[1.75rem] border border-border bg-card p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><MapPin className="h-5 w-5" /></span>
            <span>
              <span className="block font-semibold">{tr("Based in")}</span>
              <span className="block text-lg">{tr("Chennai, India")}</span>
              <span className="block text-sm text-muted-foreground">{tr("Working with clients in India and worldwide")}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  </SiteShell>
);
};

export default Contact;
