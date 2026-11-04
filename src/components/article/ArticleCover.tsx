"use client";

import React from "react";
import { ArticleData } from "@/data/articles";

interface ArticleCoverProps {
  cover: ArticleData["cover"];
}

export function ArticleCover({ cover }: ArticleCoverProps) {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 max-w-[1440px] mx-auto">
      <div className="relative w-full h-[330px] rounded-[24px] bg-ink border-2 border-ink overflow-hidden p-6 sm:p-9 flex flex-col justify-between">
        {/* Geometric Background Shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-16 sm:right-28 w-[300px] h-[300px] rounded-full bg-blue border-2 border-ink/40 opacity-90"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-4 sm:right-12 w-[150px] h-[150px] rounded-full border-[24px] border-coral opacity-90"
        />

        {/* Top Label */}
        <div className="relative z-10">
          <span className="font-mono text-[8.5px] text-[#8F8678] tracking-[1.2px] uppercase">
            {cover.label}
          </span>
        </div>

        {/* Center Big Code & Caption */}
        <div className="relative z-10 my-auto py-2">
          <div className="font-mono text-[22px] sm:text-[30px] md:text-[38px] font-semibold text-yellow tracking-[-1.2px] leading-tight select-all">
            {cover.code}
          </div>
          <div className="font-mono text-[10px] text-cream tracking-[0.3px] mt-2">
            {cover.caption}
          </div>
        </div>

        {/* Bottom Stats Pills */}
        <div className="relative z-10 flex items-center gap-3">
          {cover.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-cream rounded-[12px] px-3.5 py-2 flex flex-col shadow-sm"
            >
              <span className="font-display text-[16px] font-bold text-ink leading-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[7px] text-muted tracking-wider uppercase mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
