import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import LangSwitcher from "@/i18n/LangSwitcher";
import { useLang } from "@/i18n/LanguageContext";
import { serviceLandingPages } from "@/data/serviceLandingPages";
import AvailabilityBanner from "@/components/AvailabilityBanner";

import logoDark from "@/assets/kliviq-logo-dark.webp";
import logoLight from "@/assets/kliviq-logo-light.webp";

const Wordmark = () => (
  <Link to="/" aria-label="KlivIQ home" className="flex items-center">
    <img src={logoDark} alt="KlivIQ — AI Business Solutions" className="logo-dark h-9 md:h-10 w-auto" />
    <img src={logoLight} alt="KlivIQ — AI Business Solutions" className="logo-light h-9 md:h-10 w-auto" />
  </Link>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const { t } = useLang();

  const links = [
    { label: t.nav.products, href: "/products" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.pricing, href: "/#pricing" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const workLinks = [
    { label: t.nav.portfolio, href: "/portfolio", internal: true },
    { label: t.nav.caseHighlights, href: "/#projects", internal: false },
    { label: t.nav.process, href: "/#process", internal: false },
  ];



  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <AvailabilityBanner />
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Wordmark />

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-7 whitespace-nowrap">

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((s) => !s)}
            >
              {t.nav.services} <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[260px]">
                <div className="glass-strong rounded-2xl p-2 shadow-xl">
                  {serviceLandingPages.map((s) => (
                    <Link
                      key={s.slug}
                      to={s.path}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2.5 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      {s.navLabel}
                    </Link>
                  ))}
                  <div className="border-t border-foreground/15 my-2" />
                  <a
                    href="/#services"
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    {t.nav.allServices}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Work dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
          >
            <button
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={workOpen}
              onClick={() => setWorkOpen((s) => !s)}
            >
              {t.nav.work} <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {workOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[210px]">
                <div className="glass-strong rounded-2xl p-2 shadow-xl">
                  {workLinks.map((w) =>
                    w.internal ? (
                      <Link
                        key={w.href}
                        to={w.href}
                        onClick={() => setWorkOpen(false)}
                        className="block px-4 py-2.5 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                      >
                        {w.label}
                      </Link>
                    ) : (
                      <a
                        key={w.href}
                        href={w.href}
                        onClick={() => setWorkOpen(false)}
                        className="block px-4 py-2.5 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                      >
                        {w.label}
                      </a>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>


          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={resourcesOpen}
              onClick={() => setResourcesOpen((s) => !s)}
            >
              {t.nav.resources} <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {resourcesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[200px]">
                <div className="glass-strong rounded-2xl p-2 shadow-xl">
                  <Link
                    to="/blog"
                    onClick={() => setResourcesOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    {t.nav.blog}
                  </Link>
                  <Link
                    to="/glossary"
                    onClick={() => setResourcesOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    {t.nav.glossary}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <LangSwitcher />
          <ThemeToggle />
          <a
            href="/#contact"
            className="px-4 xl:px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
          >
            {t.nav.startProject}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <LangSwitcher />
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="lg:hidden glass-strong mt-2 mx-4 sm:mx-6 rounded-2xl p-6 flex flex-col gap-4 max-h-[calc(100vh-6rem)] overflow-y-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {/* Mobile services nested */}
          <div>
            <button
              className="w-full flex items-center justify-between text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileServicesOpen((s) => !s)}
              aria-expanded={mobileServicesOpen}
            >
              <span>{t.nav.services}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="mt-3 ml-3 pl-3 border-l border-foreground/15 flex flex-col gap-3">
                {serviceLandingPages.map((s) => (
                  <Link
                    key={s.slug}
                    to={s.path}
                    onClick={() => setOpen(false)}
                    className="text-sm text-foreground/75 hover:text-foreground transition-colors"
                  >
                    {s.navLabel}
                  </Link>
                ))}
                <a
                  href="/#services"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.allServices}
                </a>
              </div>
            )}
          </div>

          {/* Mobile work nested */}
          <div>
            <button
              className="w-full flex items-center justify-between text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileWorkOpen((s) => !s)}
              aria-expanded={mobileWorkOpen}
            >
              <span>{t.nav.work}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileWorkOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileWorkOpen && (
              <div className="mt-3 ml-3 pl-3 border-l border-foreground/15 flex flex-col gap-3">
                {workLinks.map((w) =>
                  w.internal ? (
                    <Link
                      key={w.href}
                      to={w.href}
                      onClick={() => setOpen(false)}
                      className="text-sm text-foreground/75 hover:text-foreground transition-colors"
                    >
                      {w.label}
                    </Link>
                  ) : (
                    <a
                      key={w.href}
                      href={w.href}
                      onClick={() => setOpen(false)}
                      className="text-sm text-foreground/75 hover:text-foreground transition-colors"
                    >
                      {w.label}
                    </a>
                  ),
                )}
              </div>
            )}
          </div>


          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile resources nested */}
          <div>
            <button
              className="w-full flex items-center justify-between text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileResourcesOpen((s) => !s)}
              aria-expanded={mobileResourcesOpen}
            >
              <span>{t.nav.resources}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileResourcesOpen && (
              <div className="mt-3 ml-3 pl-3 border-l border-foreground/15 flex flex-col gap-3">
                <Link
                  to="/blog"
                  onClick={() => setOpen(false)}
                  className="text-sm text-foreground/75 hover:text-foreground transition-colors"
                >
                  {t.nav.blog}
                </Link>
                <Link
                  to="/glossary"
                  onClick={() => setOpen(false)}
                  className="text-sm text-foreground/75 hover:text-foreground transition-colors"
                >
                  {t.nav.glossary}
                </Link>
              </div>
            )}
          </div>
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-2 rounded-full text-sm font-semibold text-center text-primary-foreground bg-gradient-to-r from-primary to-secondary"
          >
            {t.nav.startProject}
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
