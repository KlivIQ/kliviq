import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { serviceLandingPages } from "@/data/serviceLandingPages";

const links = [
  { label: "Products", href: "/#products" },
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

import logoDark from "@/assets/kliviq-logo-dark.png";
import logoLight from "@/assets/kliviq-logo-light.png";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Wordmark />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
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
              Services <ChevronDown className="w-3.5 h-3.5" />
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
                    All services overview →
                  </a>
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
          <ThemeToggle />
          <a
            href="/#contact"
            className="px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
          >
            Start a Project →
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
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
          className="md:hidden glass-strong mt-2 mx-6 rounded-2xl p-6 flex flex-col gap-4"
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
              <span>Services</span>
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
                  All services overview →
                </a>
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
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-2 rounded-full text-sm font-semibold text-center text-primary-foreground bg-gradient-to-r from-primary to-secondary"
          >
            Start a Project →
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
