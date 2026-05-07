"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const THEMES = ["dark", "light", "midnight", "sunset"] as const;
export type Theme = (typeof THEMES)[number];

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycle: () => void;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("theme") as Theme | null)) || null;
    if (saved && (THEMES as readonly string[]).includes(saved)) setThemeState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    if (typeof window !== "undefined") localStorage.setItem("theme", t);
  }, []);

  const cycle = useCallback(() => {
    const i = THEMES.indexOf(theme);
    setTheme(THEMES[(i + 1) % THEMES.length]);
  }, [theme, setTheme]);

  const value = useMemo<Ctx>(() => ({ theme, setTheme, cycle }), [theme, setTheme, cycle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
