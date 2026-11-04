"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";
import { CREDENTIALS_DATA } from "@/data/educationData";
import { useLanguage } from "@/context/LanguageContext";

export function CredentialsSection() {
  const { dict } = useLanguage();

  return (
    <section className="w-full bg-ink py-10 sm:py-12 px-6 sm:px-10 lg:px-14 border-t-2 border-ink">
      <div className="max-w-[1328px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10">
        {/* Left Copy */}
        <div className="flex flex-col gap-2 max-w-[380px] shrink-0">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-yellow font-medium">
            {dict.educationPage.credentialsTitle}
          </span>
          <h2 className="font-display text-2xl sm:text-[28px] lg:text-[32px] font-bold text-cream tracking-tight leading-tight">
            {dict.experiencePage.beyondTitle}
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 flex-1">
          {CREDENTIALS_DATA.map((cred, idx) => (
            <div
              key={idx}
              className="rounded-[14px] border-[1.5px] border-[#3A342E] px-4 py-3.5 flex flex-col gap-1 bg-[#191513]/40 hover:border-[#5A524A] transition-colors"
            >
              <BadgeCheck className="w-4 h-4 text-yellow shrink-0 fill-yellow/20" />
              <span className="font-sans text-[12.5px] font-semibold text-cream leading-snug pt-1">
                {cred.title}
              </span>
              <span className="font-mono text-[8.5px] text-[#8F8678] tracking-tight">
                {cred.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
