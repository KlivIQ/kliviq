import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import LangSwitcher from "@/i18n/LangSwitcher";
import { useLang } from "@/i18n/LanguageContext";
import { useBooking } from "@/components/booking/BookingContext";
import { catalogIndustries, catalogProducts, catalogServices, STATUS_LABEL } from "@/data/catalog";
import logoDark from "@/assets/kliviq-logo-dark.webp";
import logoLight from "@/assets/kliviq-logo-light.webp";

type MenuKey = "products" | "industries" | "services" | null;

const Wordmark = () => (
  <Link to="/" aria-label="KlivIQ home" className="flex shrink-0 items-center">
    <img src={logoLight} alt="KlivIQ" className="logo-light h-8 w-auto md:h-9" />
    <img src={logoDark} alt="KlivIQ" className="logo-dark h-8 w-auto md:h-9" />
  </Link>
);

const Navbar = () => {
  const { t } = useLang();
  const { openBooking } = useBooking();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const closeTimer = useRef<number>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMenu = (k: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    setMenu(k);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMenu(null), 120);
  };

  const groups: { key: Exclude<MenuKey, null>; label: string; all: { label: string; href: string }; items: { href: string; title: string; desc: string; badge?: string }[] }[] = [
    {
      key: "products",
      label: t.nav.products,
      all: { label: t.nav.allProducts, href: "/products" },
      items: catalogProducts.map((p) => ({
        href: `/products/${p.slug}`,
        title: p.name,
        desc: p.tagline,
        badge: p.status === "live" ? undefined : STATUS_LABEL[p.status],
      })),
    },
    {
      key: "industries",
      label: t.nav.industries,
      all: { label: t.nav.allIndustries, href: "/industries" },
      items: catalogIndustries.map((i) => ({ href: `/industries/${i.slug}`, title: i.name, desc: i.short })),
    },
    {
      key: "services",
      label: t.nav.services,
      all: { label: t.nav.allServicesShort, href: "/services" },
      items: catalogServices.map((s) => ({ href: `/services/${s.slug}`, title: s.name, desc: s.short })),
    },
  ];

  const plain = [
    { label: t.nav.work, href: "/work" },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.about, href: "/about" },
  ];

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const activeGroup = groups.find((g) => g.key === menu);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menu ? "glass-strong border-x-0 border-t-0" : "border-b border-transparent"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {groups.map((g) => (
            <button
              key={g.key}
              type="button"
              onMouseEnter={() => openMenu(g.key)}
              onClick={() => setMenu(menu === g.key ? null : g.key)}
              aria-expanded={menu === g.key}
              className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                menu === g.key || active(g.all.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.label}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menu === g.key ? "rotate-180" : ""}`} />
            </button>
          ))}
          {plain.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onMouseEnter={() => openMenu(null)}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                active(l.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LangSwitcher />
          <ThemeToggle />
          <button type="button" onClick={() => openBooking("nav")} className="btn-primary ml-1 px-5 py-2.5">
            {t.nav.bookCall}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div
            key={activeGroup.key}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => openMenu(activeGroup.key)}
            className="hidden border-t border-border lg:block"
          >
            <div className="container-x grid grid-cols-12 gap-8 py-8">
              <div className="col-span-3">
                <p className="eyebrow mb-3 flex">{activeGroup.label}</p>
                <Link to={activeGroup.all.href} className="group inline-flex items-center gap-2 font-display text-2xl font-semibold">
                  {activeGroup.all.label}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <ul className="col-span-9 grid grid-cols-2 gap-2 xl:grid-cols-3">
                {activeGroup.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      to={it.href}
                      className="block rounded-2xl p-4 transition-colors hover:bg-accent"
                    >
                      <span className="flex items-center gap-2 font-semibold text-foreground">
                        {it.title}
                        {it.badge && (
                          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {it.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground">{it.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-background lg:hidden"
          >
            <div className="container-x flex flex-col py-6">
              {groups.map((g) => (
                <div key={g.key} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setMobileSection(mobileSection === g.key ? null : g.key)}
                    aria-expanded={mobileSection === g.key}
                    className="flex w-full items-center justify-between py-4 font-display text-2xl font-semibold"
                  >
                    {g.label}
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileSection === g.key ? "rotate-180" : ""}`} />
                  </button>
                  {mobileSection === g.key && (
                    <ul className="pb-4">
                      {g.items.map((it) => (
                        <li key={it.href}>
                          <Link to={it.href} className="flex items-center gap-2 py-2.5 text-base text-muted-foreground hover:text-foreground">
                            {it.title}
                            {it.badge && <span className="text-[10px] font-semibold uppercase tracking-wider">· {it.badge}</span>}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link to={g.all.href} className="mt-1 inline-flex items-center gap-1 py-2 text-sm font-semibold text-brand">
                          {g.all.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              ))}
              {plain.map((l) => (
                <Link key={l.href} to={l.href} className="border-b border-border py-4 font-display text-2xl font-semibold">
                  {l.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openBooking("nav-mobile");
                }}
                className="btn-primary mt-8 py-4 text-base"
              >
                {t.nav.bookCall}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
