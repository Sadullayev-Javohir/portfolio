"use client";

import React from "react";
import { COURSEWORK_PILLARS } from "@/data/educationData";
import { useLanguage } from "@/context/LanguageContext";

export function CourseworkSection() {
  const { dict } = useLanguage();

  return (
    <section className="w-full py-14 sm:py-16 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1328px] mx-auto flex flex-col gap-7">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-medium">
              {dict.educationPage.eyebrow} — {dict.educationPage.courseworkTitle}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-bold text-ink tracking-[-1.3px]">
              {dict.educationPage.courseworkTitle}
            </h2>
          </div>
          <span className="font-mono text-[9px] sm:text-[9.5px] text-muted font-normal self-start sm:self-end">
            PDP University · 2024 — 2028
          </span>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COURSEWORK_PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-white rounded-[20px] border-2 border-ink shadow-[5px_5px_0px_#14110F] p-6 flex flex-col justify-between gap-3 min-h-[220px] hover:-translate-y-1 transition-transform duration-150"
            >
              {/* Top Row: Color Mark & Num */}
              <div className="flex items-center justify-between">
                <div
                  className="w-[30px] h-[30px] rounded-lg border-[1.5px] border-ink -rotate-6 shrink-0"
                  style={{ backgroundColor: pillar.color }}
                />
                <span className="font-mono text-[9.5px] text-muted tracking-[1px] font-medium">
                  {pillar.num}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg sm:text-[20px] font-semibold text-ink tracking-[-0.5px] leading-[1.2]">
                  {pillar.title}
                </h3>
                <p className="font-sans text-[13px] text-muted leading-[1.65]">
                  {pillar.description}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-2">
                <span className="font-mono text-[8.5px] text-ink tracking-[0.4px]">
                  {pillar.tags}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
