import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { en } from "./dictionaries/en";
import type { Dict } from "./dictionaries/en";

export type Lang = "en" | "ta" | "hi";

// Only English ships in the main bundle. Tamil/Hindi are fetched on demand,
// which keeps ~55KB of dictionary source out of the critical path.
const loaders: Record<Exclude<Lang, "en">, () => Promise<Dict>> = {
  ta: () => import("./dictionaries/ta").then((m) => m.ta),
  hi: () => import("./dictionaries/hi").then((m) => m.hi),
};

// Page/catalog copy is translated through English-keyed maps (src/i18n/content).
// Missing keys fall back to English, so untranslated text never breaks.
type ContentMap = Record<string, string>;
const contentLoaders: Record<Exclude<Lang, "en">, () => Promise<ContentMap>> = {
  ta: () => import("./content/ta.json").then((m) => m.default as ContentMap),
  hi: () => import("./content/hi.json").then((m) => m.default as ContentMap),
};
// Keys whose values are identifiers, URLs or brand data, never translated.
const SKIP_KEYS = new Set(["slug", "logo", "hue", "href", "externalUrl", "keywords", "appCategory", "industries", "products", "services", "relatedProducts", "service", "thumb", "shot", "accent", "stack", "year", "kind", "priceInr", "priceUsd", "inr", "usd", "pct", "action", "key", "image", "value"]);

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  /** Translate one English string. */
  tr: (s: string) => string;
  /** Deep-translate a data object (catalog item, FAQ list...). */
  loc: <T>(v: T) => T;
};

const makeTr = (map: ContentMap) => (s: string) => (s && map[s]) || s;
const makeLoc = (tr: (s: string) => string) => {
  const walk = (v: unknown, key?: string): unknown => {
    if (key && SKIP_KEYS.has(key)) return v;
    if (typeof v === "string") return tr(v);
    if (Array.isArray(v)) return v.map((x) => walk(x));
    if (v && typeof v === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, x] of Object.entries(v)) out[k] = walk(x, k);
      return out;
    }
    return v;
  };
  return <T,>(v: T) => walk(v) as T;
};
const identity = (s: string) => s;
const EN_LOC = makeLoc(identity);
const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "kliviq-lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  const [dict, setDict] = useState<Dict>(en);
  const [content, setContent] = useState<ContentMap>({});

  const load = (l: Lang) => {
    if (l === "en") {
      setDict(en);
      setContent({});
      setLangState("en");
      return;
    }
    Promise.all([loaders[l](), contentLoaders[l]()]).then(([d, c]) => {
      setDict(d);
      setContent(c);
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

  const trFn = useMemo(() => makeTr(content), [content]);
  const locFn = useMemo(() => makeLoc(trFn), [trFn]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict, tr: trFn, loc: locFn }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = (): Ctx => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback during SSR / outside provider
    return { lang: "en", setLang: () => {}, t: en, tr: identity, loc: EN_LOC };
  }
  return ctx;
};
