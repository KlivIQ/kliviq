import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en } from "./dictionaries/en";
import { ta } from "./dictionaries/ta";
import { hi } from "./dictionaries/hi";
import type { Dict } from "./dictionaries/en";

export type Lang = "en" | "ta" | "hi";

const dicts: Record<Lang, Dict> = { en, ta, hi };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "kliviq-lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored in dicts) setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dataset.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
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
