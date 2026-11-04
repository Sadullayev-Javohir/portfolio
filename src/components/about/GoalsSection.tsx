"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function GoalsSection() {
  const { dict } = useLanguage();

  const goals = [
    `${dict.about.goals.g1Title}: ${dict.about.goals.g1Desc}`,
    `${dict.about.goals.g2Title}: ${dict.about.goals.g2Desc}`,
    `${dict.about.goals.g3Title}: ${dict.about.goals.g3Desc}`,
  ];

  return (
    <section className="w-full bg-yellow border-b-2 border-ink py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left column: Eyebrow + Title */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="font-mono text-xs font-bold tracking-[1.6px] text-ink uppercase">
            {dict.about.goals.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[38px] font-bold text-ink tracking-tight leading-[1.15]">
            {dict.about.goals.title}
          </h2>
        </div>

        {/* Right column: 3 Goals with diamond marks */}
        <div className="lg:col-span-7 flex flex-col gap-5 pt-1">
          {goals.map((goal, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/70 border-2 border-ink shadow-solid-sm backdrop-blur-sm"
            >
              <div className="w-2.5 h-2.5 bg-ink rotate-45 shrink-0 mt-2" />
              <p className="font-body text-base sm:text-[17px] font-medium text-ink leading-relaxed">
                {goal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
