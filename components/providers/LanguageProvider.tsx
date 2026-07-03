"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { copy, type Copy, type Language } from "@/lib/content";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  /** active copy slice for the current language */
  t: Copy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nexoz-lang";

/**
 * Simple local-state internationalization for ES/EN.
 * Persists the choice to localStorage and reflects it on <html lang>.
 * (When the site needs routed/SEO-friendly locales later, this can be swapped
 * for next-intl without touching the consuming components.)
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  // Restore the saved preference on mount (client-only).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "es" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  // Keep <html lang> and storage in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: copy[language]
    }),
    [language, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
