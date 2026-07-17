import { useState } from "react";
import { Linkedin, Github, Twitter } from "lucide-react";
import LegalDialog from "@/components/LegalDialog";
import { useLang } from "@/i18n/LanguageContext";
import logoDark from "@/assets/kliviq-logo-dark.png";
import logoLight from "@/assets/kliviq-logo-light.png";

const FooterSection = () => {
  const [openDialog, setOpenDialog] = useState<"privacy" | "terms" | null>(null);
  const { t } = useLang();


  return (
    <footer className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img src={logoDark} alt="KlivIQ" className="logo-dark h-9 w-auto" />
              <img src={logoLight} alt="KlivIQ" className="logo-light h-9 w-auto" />
            </div>
            <p className="text-muted-foreground max-w-xs mb-5">
              Build Faster. Launch Smarter. Scale Without Chaos.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/kliviq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-secondary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/kliviq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-secondary transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/kliviq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-secondary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">AI Implementation</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Fractional CTO</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Web & Mobile</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Custom AI Tools</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-foreground transition-colors">Work</a></li>
              <li><a href="#process" className="hover:text-foreground transition-colors">Process</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hello@kliviq.com" className="hover:text-foreground transition-colors">hello@kliviq.com</a></li>
              <li><a href="tel:+919840497937" className="hover:text-foreground transition-colors">+91 98404 97937</a></li>
              <li className="text-muted-foreground/80">Chennai, India</li>
              <li>
                <a
                  href="https://wa.me/919840497937?text=Hi%20KlivIQ%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/kliviq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 KlivIQ Technologies. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setOpenDialog("privacy")}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <span className="opacity-40">·</span>
            <button
              type="button"
              onClick={() => setOpenDialog("terms")}
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
          </div>

          <p>Made in India 🇮🇳 · Delivered Globally 🌍</p>
        </div>
      </div>

      <LegalDialog
        open={openDialog !== null}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        type={openDialog ?? "privacy"}
      />
    </footer>
  );
};

export default FooterSection;
