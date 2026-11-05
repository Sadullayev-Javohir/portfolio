"use client";

import React, { useState } from "react";
import { ArticleData } from "@/data/articles";
import { Maximize2, X } from "lucide-react";

interface ArticleCoverProps {
  cover: ArticleData["cover"];
}

export function ArticleCover({ cover }: ArticleCoverProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 max-w-[1440px] mx-auto">
      <div className="relative w-full min-h-[340px] sm:h-[420px] rounded-[24px] bg-ink border-2 border-ink overflow-hidden p-6 sm:p-9 flex flex-col justify-between shadow-solid">
        {cover.image ? (
          <>
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover.image}
                alt={cover.caption || "Maqola muqovasi"}
                className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
            </div>

            {/* Top Label & Zoom Button */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-cream/90 bg-ink/70 px-3 py-1 rounded-full border border-cream/20 tracking-[1.2px] uppercase backdrop-blur-sm">
                {cover.label}
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="p-2 rounded-xl bg-ink/70 hover:bg-yellow hover:text-ink text-cream border border-cream/20 backdrop-blur-sm transition-colors cursor-pointer"
                title="Rasmni to'liq ko'rish"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Center Code & Caption */}
            <div className="relative z-10 my-auto py-4">
              <div className="font-mono text-[24px] sm:text-[34px] md:text-[42px] font-bold text-yellow tracking-[-1.2px] leading-tight drop-shadow-md">
                {cover.code}
              </div>
              {cover.caption && (
                <div className="font-sans text-[13px] sm:text-[15px] text-cream/90 font-medium tracking-[0.2px] mt-2 max-w-2xl drop-shadow">
                  {cover.caption}
                </div>
              )}
            </div>

            {/* Bottom Stats Pills */}
            <div className="relative z-10 flex items-center gap-3 flex-wrap">
              {cover.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-cream/95 backdrop-blur-sm rounded-[12px] px-3.5 py-2 flex flex-col border border-ink/20 shadow-sm"
                >
                  <span className="font-display text-[15px] font-bold text-ink leading-tight">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[7px] text-muted tracking-wider uppercase mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Geometric Background Shapes Fallback */}
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
          </>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && cover.image && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/20 text-cream hover:bg-white/40 transition-colors cursor-pointer"
            title="Yopish"
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.image}
            alt={cover.caption || "Muqova rasmi"}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl border-2 border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
