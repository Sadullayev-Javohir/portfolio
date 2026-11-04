"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/i18n";

interface LanguageSwitcherProps {
  className?: string;
}

const LANGUAGES: { code: Language; label: string; full: string }[] = [
  { code: "en", label: "ENG", full: "English" },
  { code: "uz", label: "UZ", full: "O'zbekcha" },
  { code: "ru", label: "RU", full: "Русский" },
];

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-full bg-cream border-2 border-ink shadow-solid-sm gap-0.5 ${className}`}
    >
      {LANGUAGES.map((item) => {
        const isActive = language === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            title={item.full}
            aria-pressed={isActive}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] sm:text-[12px] font-bold tracking-wider transition-all cursor-pointer ${
              isActive
                ? "bg-yellow text-ink border-2 border-ink shadow-[1px_1px_0px_#14110F] scale-100"
                : "text-muted hover:text-ink border-2 border-transparent hover:bg-black/5"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
