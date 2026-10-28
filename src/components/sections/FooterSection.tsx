import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { BUSINESS_CONTACT } from "@/data/business";
import { useLang } from "@/i18n/LanguageContext";
import { catalogIndustries, catalogProducts, catalogServices } from "@/data/catalog";
import logoDark from "@/assets/kliviq-logo-dark.webp";
import logoLight from "@/assets/kliviq-logo-light.webp";

const FooterSection = () => {
  const { t } = useLang();

  const cols = [
    { title: t.nav.products, links: catalogProducts.map((p) => ({ label: p.name, href: `/products/${p.slug}` })) },
    { title: t.nav.industries, links: catalogIndustries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })) },
    { title: t.nav.services, links: catalogServices.map((s) => ({ label: s.name, href: `/services/${s.slug}` })) },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.work, href: "/work" },
        { label: t.nav.pricing, href: "/pricing" },
        { label: t.nav.about, href: "/about" },
        { label: t.nav.contact, href: "/contact" },
        { label: t.nav.blog, href: "/blog" },
        { label: t.nav.glossary, href: "/glossary" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="container-x py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <img src={logoLight} alt="KlivIQ" className="logo-light h-9 w-auto" />
            <img src={logoDark} alt="KlivIQ" className="logo-dark h-9 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
            <ul className="mt-6 space-y-2 text-sm">
              <li><a href="mailto:hello@kliviq.com" className="text-foreground hover:text-brand">hello@kliviq.com</a></li>
              <li>
                <a
                  href="https://wa.me/919840497937?text=Hi%20KlivIQ%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  onClick={() => trackEvent("whatsapp_click", { location: "footer" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-brand"
                >
                  {BUSINESS_CONTACT.telephone} <span className="text-muted-foreground">(WhatsApp only)</span>
                </a>
              </li>
              <li className="text-muted-foreground">{t.footer.contactCity}</li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a href="https://www.linkedin.com/company/117713997" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-foreground/40">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://x.com/kliviq" target="_blank" rel="noopener noreferrer" aria-label="X" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-foreground/40">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/kliviq" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-foreground/40">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{c.title}</h2>
              <ul className="space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-foreground/80 transition-colors hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} KlivIQ Technologies. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-foreground">{t.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-foreground">{t.footer.terms}</Link>
          </div>
          <p>Made in Chennai, India. Delivered worldwide.</p>
        </div>
      </div>

    </footer>
  );
};

export default FooterSection;
