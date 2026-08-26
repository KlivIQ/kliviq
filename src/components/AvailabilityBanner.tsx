import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { availability } from "@/data/availability";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "kliviq-banner-dismissed";

/**
 * Slim, dismissible availability banner. Rendered as the top strip of the
 * fixed navbar so it never overlaps page content.
 */
const AvailabilityBanner = () => {
  const { t } = useLang();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") setHidden(true);
  }, []);

  if (hidden) return null;

  const text = t.banner.text
    .replace("{slots}", String(availability.slots))
    .replace("{quarter}", availability.quarter)
    .replace("{date}", availability.bookBefore);

  return (
    <div className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="relative max-w-7xl mx-auto px-10 sm:px-14 py-2 flex items-center justify-center gap-3 text-center">
        <p className="text-xs sm:text-sm font-semibold leading-snug">
          <span aria-hidden className="mr-1.5">⚡</span>
          {text}{" "}
          <a href="#contact" className="underline underline-offset-2 font-bold whitespace-nowrap">
            {t.banner.cta}
          </a>
        </p>
        <button
          type="button"
          onClick={() => {
            setHidden(true);
            window.localStorage.setItem(STORAGE_KEY, "1");
          }}
          aria-label={t.banner.dismiss}
          className="absolute right-3 sm:right-6 w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AvailabilityBanner;
