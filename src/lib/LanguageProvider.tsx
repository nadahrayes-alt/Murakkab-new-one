"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, type Lang, type Translation } from "./translations";

type Ctx = {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
  toggle: () => void;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang | null)) || null;
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      t: translations[lang] as unknown as Translation,
      setLang,
      toggle,
      dir: lang === "ar" ? "rtl" : "ltr",
    }),
    [lang, setLang, toggle]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
