"use client";

import React from "react";
import { PRIMARY_STACK } from "@/data/skillsData";
import { useLanguage } from "@/context/LanguageContext";
import { getTechIcon } from "@/components/ui/icons/TechIcons";

export function SkillsHeader() {
  const { dict } = useLanguage();

  return (
    <section className="w-full border-b-2 border-ink bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 sm:pt-15 pb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
        {/* Header Copy */}
        <div className="flex flex-col gap-4.5 max-w-[820px]">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-semibold">
            {dict.skillsPage.eyebrow}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[58px] font-bold text-ink leading-[1.02] sm:leading-[0.98] tracking-[-2px] sm:tracking-[-2.3px]">
            {dict.skillsPage.title}
          </h1>
          <p className="font-sans text-[15px] sm:text-base text-muted leading-[1.65] max-w-[660px]">
            {dict.skillsPage.subtitle}
          </p>
        </div>

        {/* Primary Card */}
        <div className="w-full sm:w-[330px] shrink-0 bg-ink rounded-[20px] p-[20px_22px] border-2 border-ink shadow-solid-lg">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#3A342E]">
            <span className="font-mono text-[9px] uppercase tracking-[1.4px] text-yellow font-semibold">
              {dict.skillsPage.primaryStack}
            </span>
            <span className="font-mono text-sm text-coral select-none">
              ✳
            </span>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {PRIMARY_STACK.map((item, idx) => (
              <div
                key={item.name}
                className={`flex items-center justify-between py-[9px] ${
                  idx < PRIMARY_STACK.length - 1
                    ? "border-b border-[#2A2622]"
                    : ""
                }`}
              >
                <span className="font-sans text-[13px] font-medium text-cream flex items-center gap-2">
                  {getTechIcon(item.name, "w-4 h-4 shrink-0")}
                  <span>{item.name}</span>
                </span>
                <span className="font-mono text-[8.5px] tracking-wider text-[#8F8678] uppercase">
                  {item.where}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
