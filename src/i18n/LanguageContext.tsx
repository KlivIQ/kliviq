import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en } from "./dictionaries/en";
import type { Dict } from "./dictionaries/en";

export type Lang = "en" | "ta" | "hi";

// Only English ships in the main bundle. Tamil/Hindi are fetched on demand,
// which keeps ~55KB of dictionary source out of the critical path.
const loaders: Record<Exclude<Lang, "en">, () => Promise<Dict>> = {
  ta: () => import("./dictionaries/ta").then((m) => m.ta),
  hi: () => import("./dictionaries/hi").then((m) => m.hi),
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "kliviq-lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  const [dict, setDict] = useState<Dict>(en);

  const load = (l: Lang) => {
    if (l === "en") {
      setDict(en);
      setLangState("en");
      return;
    }
    loaders[l]().then((d) => {
      setDict(d);
      setLangState(l);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "ta" || stored === "hi") load(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dataset.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    load(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = (): Ctx => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback during SSR / outside provider
    return { lang: "en", setLang: () => {}, t: en };
  }
  return ctx;
};
