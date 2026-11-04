"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Language, TranslationDictionary, translations, getNestedTranslation } from "@/i18n";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";
import { ROLES_DATA, RoleItem } from "@/data/experienceData";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: TranslationDictionary;
  t: (path: string, fallback?: string) => string;
  projects: Project[];
  roles: RoleItem[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check URL params first, then localStorage, then navigator language
    const searchParams = new URLSearchParams(window.location.search);
    const urlLang = searchParams.get("lang") as Language;
    if (urlLang && (urlLang === "en" || urlLang === "uz" || urlLang === "ru")) {
      setLanguageState(urlLang);
      localStorage.setItem(STORAGE_KEY, urlLang);
    } else {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language;
      if (savedLang && (savedLang === "en" || savedLang === "uz" || savedLang === "ru")) {
        setLanguageState(savedLang);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("uz")) {
          setLanguageState("uz");
        } else if (browserLang.startsWith("ru")) {
          setLanguageState("ru");
        } else {
          setLanguageState("en");
        }
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const dict = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  const t = (path: string, fallback?: string): string => {
    const val = getNestedTranslation(dict, path);
    if (val !== undefined) return val;
    const fallbackVal = getNestedTranslation(translations.en, path);
    if (fallbackVal !== undefined) return fallbackVal;
    return fallback !== undefined ? fallback : path;
  };

  // Dynamically translated projects
  const projects = useMemo(() => {
    return PROJECTS_DATA.map((proj) => {
      const trans = dict.projects[proj.id];
      if (!trans) return proj;
      return {
        ...proj,
        title: trans.title || proj.title,
        category: trans.category || proj.category,
        description: trans.description || proj.description,
        metrics: trans.metrics || proj.metrics,
      };
    });
  }, [dict]);

  // Dynamically translated roles
  const roles = useMemo(() => {
    return ROLES_DATA.map((role) => {
      const trans = dict.roles[role.id];
      if (!trans) return role;
      return {
        ...role,
        role: trans.role || role.role,
        place: trans.place || role.place,
        summary: trans.summary || role.summary,
        bullets: trans.bullets || role.bullets,
      };
    });
  }, [dict]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dict,
        t,
        projects,
        roles,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
