"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function EducationHeader() {
  const { dict } = useLanguage();

  return (
    <section className="w-full pt-12 sm:pt-16 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1328px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-10">
        {/* Header Copy */}
        <div className="flex flex-col gap-4 max-w-[800px]">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-medium">
            {dict.educationPage.eyebrow}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-bold text-ink tracking-[-2.6px] leading-[0.98]">
            {dict.educationPage.title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted leading-[1.65] max-w-[680px]">
            {dict.educationPage.subtitle}
          </p>
        </div>

        {/* GPA Card */}
        <div className="w-full sm:w-[260px] shrink-0 bg-white rounded-[20px] border-2 border-ink shadow-[6px_6px_0px_#14110F] px-6 py-5 flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[1.4px] text-muted font-medium">
            OVERALL GPA
          </span>
          <span className="font-display text-5xl sm:text-[56px] font-bold text-ink tracking-[-3px] leading-none my-1">
            4.13
          </span>
          <span className="font-mono text-[9.5px] text-muted font-normal">
            4.5 scale · Academic Excellence
          </span>
        </div>
      </div>
    </section>
  );
}
