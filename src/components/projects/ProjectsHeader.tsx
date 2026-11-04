"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function ProjectsHeader() {
  const { dict } = useLanguage();

  const stats = [
    { value: "05", label: dict.experiencePage.statRoles },
    { value: "700+", label: dict.experiencePage.statUsers },
    { value: "99.9%", label: dict.experiencePage.statUptime },
    { value: "105+", label: dict.experiencePage.statTests },
  ];

  const indexItems = [
    { id: "englishai", num: "01", name: "EnglishAI", dotColor: "bg-blue" },
    { id: "kitobdagimen", num: "02", name: "KitobdagiMen", dotColor: "bg-coral" },
    { id: "ziyoai", num: "03", name: "ZiyoAI", dotColor: "bg-mint" },
    { id: "typingwar", num: "04", name: "TypingWar", dotColor: "bg-cream" },
    { id: "meningvaqtim", num: "05", name: "MeningVaqtim", dotColor: "bg-yellow" },
  ];

  return (
    <section className="w-full bg-cream border-b-2 border-ink py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Eyebrow + Headline + Sub + Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
            <Link href="/" className="text-muted hover:text-ink transition-colors">
              {dict.nav.home}
            </Link>
            <span className="text-muted">/</span>
            <span className="text-ink">{dict.nav.projects}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-ink tracking-tight leading-[1.05]">
            {dict.projectsPage.title}
          </h1>

          {/* Subtitle */}
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            {dict.projectsPage.subtitle}
          </p>

          {/* Mini Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t-2 border-ink/15">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-muted tracking-wider uppercase font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Index Card with Coral Drop Shadow */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-[360px] bg-ink rounded-3xl border-2 border-ink shadow-[9px_9px_0px_#FF6B5A] p-6 flex flex-col gap-4 text-cream">
            {/* Index Head */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2C2622]">
              <span className="font-mono text-xs font-bold text-yellow tracking-[1.4px] uppercase">
                {dict.resumePage.projectsLabel}
              </span>
              <span className="font-mono text-xs text-[#8F8678] font-medium">
                2026
              </span>
            </div>

            {/* Index Rows */}
            <div className="flex flex-col">
              {indexItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between py-2.5 border-b border-[#2C2622] last:border-none group hover:translate-x-1 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-sm ${item.dotColor} shrink-0`}
                    />
                    <span className="font-display text-base font-semibold text-cream group-hover:text-yellow transition-colors">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8F8678]">
                      {item.num}
                    </span>
                    <span className="font-mono text-xs text-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
