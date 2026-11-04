"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function ExperienceHeader() {
  const { dict } = useLanguage();

  const stats = [
    { value: "05", label: dict.experiencePage.statRoles },
    { value: "700+", label: dict.experiencePage.statUsers },
    { value: "99.9%", label: dict.experiencePage.statUptime },
    { value: "105+", label: dict.experiencePage.statTests },
  ];

  return (
    <section className="w-full pt-[60px] pb-12 sm:pb-14 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-12">
        {/* Left: Copy & Stats */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-[18px] max-w-[840px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10.5px] font-semibold text-muted tracking-[0.16em] uppercase">
              {dict.experiencePage.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[60px] font-bold text-ink leading-[1.05] tracking-[-0.02em]">
            {dict.experiencePage.title}
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[15px] sm:text-[16px] text-muted leading-relaxed max-w-[700px]">
            {dict.experiencePage.subtitle}
          </p>

          {/* Header Stats */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 w-full">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="border-t-[1.5px] border-ink pt-2.5 pr-4 sm:pr-[30px] flex flex-col gap-0.5"
              >
                <span className="font-display text-2xl sm:text-[28px] font-bold text-ink leading-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] font-medium text-muted tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Currently Note Card */}
        <div className="w-full lg:w-[300px] shrink-0">
          <Link
            href="/projects/englishai"
            className="group block bg-ink text-cream border border-ink rounded-[18px] p-5 sm:p-[22px] transition-all duration-200 hover:-translate-y-0.5 shadow-solid-sm hover:shadow-solid"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-semibold text-yellow tracking-wider uppercase">
                  {dict.experiencePage.currentNoteLabel}
                </span>
                <span className="font-mono text-[10px] text-yellow/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </div>
              <h2 className="font-display text-[17px] font-semibold text-cream leading-snug group-hover:text-yellow transition-colors">
                {dict.roles.englishai.role}
              </h2>
              <p className="font-sans text-[11.5px] text-[#B9B0A4] leading-relaxed">
                {dict.experiencePage.currentNoteSub}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
