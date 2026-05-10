import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "kliviq-theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return stored ?? "dark";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="w-9 h-9 rounded-full glass border border-border/60 flex items-center justify-center text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors"
    >
      {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
};

export default ThemeToggle;
