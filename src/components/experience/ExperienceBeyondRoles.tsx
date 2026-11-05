"use client";

import React from "react";
import { BadgeCheck, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ExperienceBeyondRoles() {
  const { dict, language } = useLanguage();

  const certifications = [
    { title: "HackerRank REST API (Intermediate)", subtitle: "HackerRank Verified" },
    { title: "HackerRank Software Engineer", subtitle: "Problem Solving & Role Test" },
    { title: "Foundational C# with Microsoft", subtitle: "Microsoft & freeCodeCamp" },
  ];

  const languages =
    language === "uz"
      ? [
          { name: "O'zbek tili", level: "Ona tili" },
          { name: "Ingliz tili", level: "B1 Intermediate (CEFR)" },
          { name: "Rus tili", level: "Ishchi / Erkin muloqot" },
        ]
      : language === "ru"
      ? [
          { name: "Узбекский", level: "Родной язык" },
          { name: "Английский", level: "B1 Intermediate (CEFR)" },
          { name: "Русский", level: "Рабочий / Профессиональный" },
        ]
      : [
          { name: "Uzbek", level: "Native / Fluent" },
          { name: "English", level: "B1 Intermediate (CEFR)" },
          { name: "Russian", level: "Professional / Working" },
        ];

  return (
    <section className="w-full bg-white border-y-2 border-ink py-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-12">
        {/* Left Column */}
        <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-2">
          <span className="font-mono text-[10.5px] font-semibold text-muted tracking-[0.16em] uppercase">
            {dict.experiencePage.beyondEyebrow}
          </span>
          <h2 className="font-display text-2xl sm:text-[26px] font-semibold text-ink leading-snug">
            {dict.experiencePage.beyondTitle}
          </h2>
          <p className="font-sans text-[13px] text-muted leading-relaxed">
            {dict.experiencePage.beyondSubtitle}
          </p>
        </div>

        {/* Right Column: Certs & Languages */}
        <div className="flex-1 flex flex-col sm:flex-row items-start gap-8 sm:gap-12 lg:gap-14 w-full">
          {/* Certifications */}
          <div className="flex-1 flex flex-col gap-2.5">
            <span className="font-mono text-[9px] font-bold text-muted tracking-wider uppercase">
              {dict.experiencePage.certificationsLabel}
            </span>
            <div className="flex flex-col gap-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <BadgeCheck
                    className="w-[15px] h-[15px] text-blue shrink-0"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  <span className="font-sans text-[12.5px] text-ink leading-tight">
                    {cert.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="w-full sm:w-[260px] lg:w-[300px] shrink-0 flex flex-col gap-2.5">
            <span className="font-mono text-[9px] font-bold text-muted tracking-wider uppercase">
              {dict.experiencePage.languagesLabel}
            </span>
            <div className="flex flex-col gap-2">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <Languages
                    className="w-[15px] h-[15px] text-coral shrink-0"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  <span className="font-sans text-[12.5px] text-ink leading-tight">
                    {lang.name} — {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
