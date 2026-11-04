"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function CaseStudyHeader() {
  const { dict } = useLanguage();

  const metaItems = [
    { key: dict.caseStudy.roleLabel, value: dict.roles.englishai.role },
    { key: dict.caseStudy.timelineLabel, value: "Jul 2026 — Present" },
    { key: "STACK", value: "ASP.NET Core · PostgreSQL · Redis" },
    { key: dict.caseStudy.statusLabel, value: "Live · 700+ users" },
  ];

  return (
    <section className="w-full bg-cream border-b-2 border-ink py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Breadcrumb + Badges + Title + Tagline */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
            <Link
              href="/projects"
              className="text-muted hover:text-ink transition-colors"
            >
              {dict.nav.projects}
            </Link>
            <span className="text-muted">/</span>
            <span className="text-ink">ENGLISHAI</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-ink text-cream font-mono text-[11px] font-bold tracking-wider uppercase shadow-solid-sm">
              CASE STUDY 01
            </span>
            <span className="px-3 py-1 rounded-full bg-blue text-ink border border-ink font-mono text-[11px] font-bold tracking-wider uppercase shadow-solid-sm">
              BACKEND · AI
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-ink tracking-tight leading-[1.02]">
            EnglishAI
          </h1>

          {/* Tagline */}
          <p className="font-body text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl font-normal">
            {dict.projects.englishai.description}
          </p>
        </div>

        {/* Right Column: Meta Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-[380px] bg-white rounded-3xl border-2 border-ink shadow-[7px_7px_0px_#14110F] p-6 flex flex-col gap-3.5">
            {metaItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b border-ink/10 last:border-none"
              >
                <span className="font-mono text-xs font-bold tracking-wider text-muted uppercase">
                  {item.key}
                </span>
                <span className="font-mono text-xs font-bold text-ink">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
