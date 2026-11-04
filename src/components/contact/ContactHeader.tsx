"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactHeader() {
  const { dict } = useLanguage();

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 lg:pt-[60px] pb-8 lg:pb-[44px] flex flex-col lg:flex-row gap-8 lg:gap-[44px] justify-between items-start lg:items-end">
      {/* Left: Copy */}
      <div className="flex-1 flex flex-col gap-4 max-w-[800px]">
        <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted">
          {dict.contactPage.eyebrow}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] lg:leading-[61px] font-bold tracking-[-2.5px] text-ink">
          {dict.contactPage.title}
        </h1>
        <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-muted max-w-[700px]">
          {dict.contactPage.subtitle}
        </p>
      </div>

      {/* Right: Availability Badges */}
      <div className="flex flex-wrap items-center gap-[10px] shrink-0">
        <div className="px-3 py-1.5 rounded-full bg-white border-[1.5px] border-ink font-mono text-[9px] tracking-[0.4px] text-ink font-medium uppercase whitespace-nowrap shadow-solid-sm">
          {dict.contactPage.locationValue}
        </div>
        <div className="px-3 py-1.5 rounded-full bg-mint border-[1.5px] border-ink font-mono text-[9px] tracking-[0.4px] text-ink font-medium uppercase whitespace-nowrap shadow-solid-sm">
          {dict.contactPage.availabilityBadge}
        </div>
      </div>
    </section>
  );
}
