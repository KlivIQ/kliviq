import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "kliviq-exit-cta-shown";

/**
 * Shows a single conversion prompt when the visitor either scrolls past 70%
 * of the page or moves the pointer out of the top of the window (exit intent).
 * Only ever shown once per visitor, and never on touch/mobile where the
 * bottom nav already carries the CTAs.
 */
const ExitIntentCTA = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let done = false;
    // Give the visitor a few seconds before anything can trigger.
    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 6000);
    const fire = () => {
      if (!armed) return;
      if (done) return;
      done = true;
      window.localStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      if (!armed) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      // Require real scrolling — never fire on a tall viewport at page load.
      if (window.scrollY > 600 && total > 0 && scrolled / total >= 0.7) fire();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-cta-title"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="glass-strong relative w-full max-w-md rounded-2xl p-8 text-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t.exitCta.dismiss}
          className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <h2 id="exit-cta-title" className="text-2xl font-extrabold tracking-tight mb-3">
          {t.exitCta.title}
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">{t.exitCta.body}</p>
        <div className="flex flex-col gap-3">
          <a
            href="https://seenzo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
          >
            {t.exitCta.primary}
          </a>
          <a
            href="https://calendly.com/kliviq-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-semibold border border-border/60 glass hover:border-secondary/60 transition-colors"
          >
            {t.exitCta.secondary}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentCTA;
