"use client";

import React from "react";
import { Download } from "lucide-react";
import { RESUME_DATA } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

export function ResumeHeader() {
  const { dict } = useLanguage();

  return (
    <section className="w-full pt-10 sm:pt-14 pb-6 sm:pb-9 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        {/* Header Copy */}
        <div className="flex flex-col gap-3.5 max-w-[680px]">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted">
            {dict.resumePage.eyebrow}
          </span>
          <h1 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-ink leading-[0.98] tracking-[-2.2px]">
            {dict.resumePage.title}
          </h1>
          <p className="font-sans text-[14px] sm:text-[15px] text-muted leading-[1.6] max-w-[620px]">
            {dict.resumePage.subtitle}
          </p>
        </div>

        {/* Downloads */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {RESUME_DATA.downloads.map((item) => {
            const isFeatured = item.featured;
            return (
              <a
                key={item.lang}
                href={item.path}
                download={item.fileName}
                className={`px-[18px] py-[11px] rounded-full border-2 border-ink text-[13px] font-semibold font-sans flex items-center gap-2 transition-all cursor-pointer ${
                  isFeatured
                    ? "bg-yellow text-ink shadow-[3px_3px_0px_#14110F] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#14110F] active:translate-y-0 active:shadow-none"
                    : "bg-white text-ink shadow-solid-sm hover:bg-cream hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                <span>{item.label}</span>
                <Download className="w-3.5 h-3.5 text-ink" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
