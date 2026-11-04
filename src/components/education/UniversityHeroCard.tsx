"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function UniversityHeroCard() {
  const { dict } = useLanguage();

  const focusChips = [
    "Data Structures & Algorithms",
    "Operating Systems & Memory",
    "Database Internals & Relational Design",
    "Computer Networks & Protocols",
    "Object-Oriented Design & Patterns",
  ];

  return (
    <section className="w-full px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1328px] mx-auto relative overflow-hidden bg-yellow rounded-[26px] border-2 border-ink p-7 sm:p-9 lg:p-10 min-h-[330px] flex flex-col justify-between gap-8">
        {/* Decorative Geometric Elements */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-12 sm:right-10 lg:right-16 w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full bg-coral border-2 border-ink pointer-events-none select-none z-0"
        />

        {/* Ring */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute -bottom-6 right-[220px] lg:right-[260px] w-[120px] h-[120px] pointer-events-none select-none z-0"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120ZM60 100.8C82.533 100.8 100.8 82.533 100.8 60C100.8 37.467 82.533 19.2 60 19.2C37.467 19.2 19.2 37.467 19.2 60C19.2 82.533 37.467 100.8 60 100.8Z"
              fill="#14110F"
            />
          </svg>
        </div>

        {/* Triangle */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute -bottom-4 right-10 lg:right-14 w-[84px] h-[76px] -rotate-10 pointer-events-none select-none z-0"
        >
          <svg viewBox="0 0 84 76" className="w-full h-full drop-shadow-sm">
            <polygon
              points="42,2 82,74 2,74"
              fill="#4F7CFF"
              stroke="#14110F"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Uni Copy */}
        <div className="relative z-10 flex flex-col gap-2.5 max-w-[660px]">
          <span className="font-mono text-[9.5px] uppercase tracking-[1.6px] text-ink font-medium">
            {dict.educationPage.uniTitle}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-bold text-ink tracking-[-1.8px] leading-tight">
            {dict.educationPage.degreeTitle}
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[1.3px] text-ink font-semibold">
            {dict.educationPage.statusBadge}
          </span>
          <p className="font-sans text-sm sm:text-[14px] text-ink-soft leading-[1.6] max-w-[600px] pt-1">
            {dict.educationPage.subtitle}
          </p>
        </div>

        {/* Focus Areas Chips */}
        <div className="relative z-10 flex flex-col gap-2 pt-2">
          <span className="font-mono text-[8.5px] uppercase tracking-[1.3px] text-ink font-medium">
            {dict.educationPage.courseworkTitle}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {focusChips.map((chip) => (
              <span
                key={chip}
                className="bg-cream text-ink border-[1.5px] border-ink rounded-full px-3 py-1 font-mono text-[9px] sm:text-[9.5px] tracking-[0.4px] font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
