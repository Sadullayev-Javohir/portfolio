"use client";

import React from "react";
import { BLOG_STATS } from "@/data/blogData";
import { useLanguage } from "@/context/LanguageContext";

interface BlogHeaderProps {
  publishedCount?: number;
}

export function BlogHeader({ publishedCount }: BlogHeaderProps) {
  const { dict } = useLanguage();
  const countStr = publishedCount !== undefined
    ? String(publishedCount).padStart(2, "0")
    : BLOG_STATS.publishedCount;

  return (
    <section className="w-full bg-cream pt-10 sm:pt-14 pb-8 sm:pb-10 px-6 sm:px-10 lg:px-14 border-b-2 border-ink">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
        {/* Header Copy */}
        <div className="flex flex-col gap-4 max-w-[820px]">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-medium">
            {dict.blogPage.eyebrow}
          </span>
          <h1 className="font-display text-[36px] sm:text-[46px] lg:text-[58px] font-bold text-ink leading-[1.08] tracking-tight">
            {dict.blogPage.title}
          </h1>
          <p className="font-sans text-[15px] sm:text-[16px] text-muted leading-relaxed max-w-[700px]">
            {dict.blogPage.subtitle}
          </p>
        </div>

        {/* Blog Stats Pill Box */}
        <div className="w-full sm:w-[220px] bg-ink text-cream p-4 sm:p-5 rounded-[16px] border-2 border-ink shadow-[6px_6px_0px_#FF6B5A] shrink-0 self-start lg:self-end">
          {/* Stat 1 */}
          <div className="flex items-baseline justify-between py-1.5 border-b border-[#2A2622]">
            <span className="font-display text-[18px] font-bold text-cream">
              {countStr}
            </span>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.5px] text-[#8F8678]">
              {dict.blogPage.latestTitle}
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-baseline justify-between py-1.5 border-b border-[#2A2622]">
            <span className="font-display text-[18px] font-bold text-cream">
              {BLOG_STATS.plannedCount}
            </span>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.5px] text-[#8F8678]">
              {dict.blogPage.plannedTitle}
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex items-baseline justify-between py-1.5">
            <span className="font-display text-[18px] font-bold text-cream">
              2026
            </span>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.5px] text-[#8F8678]">
              ACTIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
