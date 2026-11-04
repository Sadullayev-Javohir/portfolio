"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function AboutHeader() {
  const { dict } = useLanguage();

  return (
    <section className="w-full bg-cream border-b-2 border-ink pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
            <Link href="/" className="text-muted hover:text-ink transition-colors">
              {dict.nav.home}
            </Link>
            <span className="text-muted">/</span>
            <span className="text-ink">{dict.nav.about}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-ink tracking-tight leading-[1.02]">
            {dict.about.header.title}
          </h1>

          {/* Subtitle */}
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            {dict.about.bio.p1}
          </p>

          {/* Tag Chips */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-ink font-mono text-xs font-semibold text-ink shadow-solid-sm">
              C# / .NET 8
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-ink font-mono text-xs font-semibold text-ink shadow-solid-sm">
              PostgreSQL &amp; Redis
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-ink font-mono text-xs font-semibold text-ink shadow-solid-sm">
              SignalR &amp; AI
            </span>
          </div>
        </div>

        {/* Right Column: Portrait Composition */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-[390px] h-[410px] shrink-0 scale-[0.82] sm:scale-95 lg:scale-100 origin-center lg:origin-top-right">
            {/* Blue Background Disc */}
            <div
              className="absolute left-[24px] top-[18px] w-[340px] h-[340px] rounded-full bg-blue border-2 border-ink z-0 shadow-solid-sm"
              aria-hidden="true"
            />

            {/* Main Portrait Card */}
            <div className="absolute left-[52px] top-[48px] w-[300px] h-[300px] rounded-[26px] bg-white border-2 border-ink shadow-[8px_8px_0px_#14110F] overflow-hidden z-10">
              <Image
                src="/javohir.jpg"
                alt="Javohir Sadullayev — Software Engineer"
                fill
                sizes="300px"
                priority
                className="object-cover"
              />
            </div>

            {/* Developer Badge */}
            <div className="absolute -left-[12px] top-[236px] -rotate-[5deg] z-20 px-3.5 py-2.5 rounded-[16px] bg-yellow border-2 border-ink shadow-[5px_5px_0px_#14110F] flex flex-col gap-0.5 min-w-[200px]">
              <div className="flex items-center gap-1.5">
                <span className="w-[7px] h-[7px] rounded-full bg-mint border border-ink/30 animate-pulse" />
                <span className="font-mono text-[8px] font-semibold tracking-[0.8px] text-ink uppercase">
                  {dict.about.header.role}
                </span>
              </div>
              <span className="font-display text-sm font-bold tracking-[-0.3px] text-ink">
                C# · .NET 8 · AI
              </span>
              <span className="font-mono text-[7.5px] text-ink-soft tracking-[0.4px]">
                EnglishAI · 700+ users
              </span>
            </div>

            {/* Asterisk Badge */}
            <div className="absolute left-[318px] top-[0px] z-20 w-16 h-16 rounded-full bg-coral border-2 border-ink shadow-solid-sm flex items-center justify-center">
              <span className="font-mono text-2xl font-normal text-ink select-none">
                ✳
              </span>
            </div>

            {/* Caption */}
            <div className="absolute left-[52px] top-[362px] z-10 w-[300px] text-center">
              <span className="font-mono text-[9.5px] text-muted tracking-[0.4px]">
                Javohir Sadullayev — {dict.nav.roleTag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
