"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function BioSection() {
  const { dict } = useLanguage();

  return (
    <section className="w-full bg-white border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Eyebrow + Quote + Marker */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="font-mono text-xs font-bold tracking-[1.6px] text-muted uppercase">
            {dict.about.bio.eyebrow}
          </span>
          <blockquote className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
            &ldquo;{dict.about.bio.quote}&rdquo;
          </blockquote>
          <div className="w-16 h-2 bg-coral border border-ink" />
        </div>

        {/* Right Column: Narrative paragraphs & Quick Facts */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-5 text-ink-soft text-base sm:text-[17px] leading-relaxed">
            <p>{dict.about.bio.p1}</p>
            <p>{dict.about.bio.p2}</p>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-ink/15">
            <div className="p-5 rounded-2xl bg-cream border-2 border-ink shadow-solid-sm flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-semibold">
                {dict.resumePage.educationLabel}
              </span>
              <span className="font-display text-lg font-bold text-ink">
                {dict.educationSection.degree}
              </span>
              <span className="font-mono text-xs text-muted">
                {dict.educationSection.uni}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-cream border-2 border-ink shadow-solid-sm flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-semibold">
                OVERALL GPA
              </span>
              <span className="font-display text-2xl font-bold text-ink">
                4.13 <span className="text-sm font-normal text-muted">/ 4.5</span>
              </span>
              <span className="font-mono text-xs text-muted">
                Academic Excellence
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-cream border-2 border-ink shadow-solid-sm flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-semibold">
                {dict.experiencePage.languagesLabel}
              </span>
              <span className="font-display text-lg font-bold text-ink">
                Uzbek, English, Russian
              </span>
              <span className="font-mono text-xs text-muted">
                Native Uzbek · B1 English
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-cream border-2 border-ink shadow-solid-sm flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-semibold">
                {dict.about.header.quickStats.roleLabel}
              </span>
              <span className="font-display text-lg font-bold text-ink">
                .NET 8 &amp; Real-Time AI
              </span>
              <span className="font-mono text-xs text-muted">
                SignalR · Redis · Azure Speech
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
