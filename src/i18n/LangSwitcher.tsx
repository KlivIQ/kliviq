import { useLang, type Lang } from "./LanguageContext";

const options: { code: Lang; label: string; aria: string }[] = [
  { code: "en", label: "EN", aria: "English" },
  { code: "ta", label: "த", aria: "தமிழ்" },
  { code: "hi", label: "हि", aria: "हिन्दी" },
];

const LangSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center p-0.5 rounded-full glass border border-border/50 ${className}`}
    >
      {options.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLang(o.code)}
            aria-pressed={active}
            aria-label={o.aria}
            className={`relative px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-300 min-w-[2rem] ${
              active
                ? "text-background bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};

export default LangSwitcher;
