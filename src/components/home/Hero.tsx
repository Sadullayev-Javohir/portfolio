"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { TelegramIcon } from "@/components/ui/icons/TelegramIcon";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import { InteractiveCodeEditor } from "@/components/home/InteractiveCodeEditor";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { dict } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden border-b-2 border-ink bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column (Hero Copy) */}
        <div className="lg:col-span-7 flex flex-col gap-7">
          {/* Availability Status */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint border-2 border-ink shadow-solid-sm hover:-translate-y-0.5 transition-transform cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ink"></span>
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-ink uppercase">
                {dict.hero.badge}
              </span>
            </div>
          </div>

          {/* Headline with Playful Geometric Element */}
          <div className="flex flex-col">
            {/* Semantic Identity Eyebrow for SEO & Branding */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs sm:text-sm font-extrabold tracking-[2px] uppercase text-coral">
                Javohir Sadullayev
              </span>
              <span className="font-mono text-xs text-muted">·</span>
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[1.5px] uppercase text-ink/70">
                Software Engineer
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[60px] font-extrabold text-ink tracking-tight leading-[1.05]">
              <span className="sr-only">Javohir Sadullayev · Software Engineer &amp; .NET Developer — </span>
              {dict.hero.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-1">
              <span className="font-display text-3xl sm:text-5xl lg:text-[60px] font-extrabold text-ink tracking-tight leading-[1.05]">
                {dict.hero.titleHighlight}
              </span>
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-coral border-2 border-ink shadow-solid flex items-center justify-center shrink-0 animate-spin-slow hover:animate-none hover:rotate-45 hover:scale-110 hover:shadow-solid-lg transition-all cursor-pointer select-none">
                <span className="font-mono text-lg sm:text-2xl font-bold text-ink">
                  ✳
                </span>
              </div>
            </div>
          </div>

          {/* Hero Subtitle */}
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            {dict.hero.subtitle}
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#featured-work"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-yellow hover:bg-yellow-hover border-2 border-ink shadow-solid hover:shadow-solid-lg transition-all text-sm sm:text-base font-bold text-ink hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span>{dict.hero.ctaProjects}</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
            </a>
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-cream border-2 border-ink shadow-solid-sm hover:shadow-solid transition-all text-sm sm:text-base font-semibold text-ink hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span>{dict.nowCta.ctaResume}</span>
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>

          {/* Social Links with Icons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-[13px] font-medium text-ink">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-blue transition-colors group"
            >
              <Github className="w-4 h-4 text-ink group-hover:text-blue transition-colors" />
              <span>GitHub ↗</span>
            </a>
            <span className="text-muted/60">·</span>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-blue transition-colors group"
            >
              <Linkedin className="w-4 h-4 text-ink group-hover:text-blue transition-colors" />
              <span>LinkedIn ↗</span>
            </a>
            <span className="text-muted/60">·</span>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-blue transition-colors group"
            >
              <TelegramIcon className="w-4 h-4 text-ink group-hover:text-blue transition-colors" />
              <span>Telegram ↗</span>
            </a>
            <span className="text-muted/60">·</span>
            <a
              href={SOCIAL_LINKS.email}
              className="inline-flex items-center gap-1.5 hover:text-blue transition-colors group"
            >
              <Mail className="w-4 h-4 text-ink group-hover:text-blue transition-colors" />
              <span>Email ↗</span>
            </a>
          </div>

          {/* Hero Metrics Row */}
          <div className="pt-6 border-t-2 border-ink/20 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {dict.hero.metrics.learners.value}
              </span>
              <p className="font-mono text-[10px] text-muted uppercase tracking-wider pt-0.5">
                {dict.hero.metrics.learners.label}
              </p>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {dict.hero.metrics.latency.value}
              </span>
              <p className="font-mono text-[10px] text-muted uppercase tracking-wider pt-0.5">
                {dict.hero.metrics.latency.label}
              </p>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {dict.hero.metrics.uptime.value}
              </span>
              <p className="font-mono text-[10px] text-muted uppercase tracking-wider pt-0.5">
                {dict.hero.metrics.uptime.label}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Hero Visual with Playful Geometric Shapes & Code Window) */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-6 w-full">
          <div className="relative w-full max-w-[420px] lg:max-w-[450px] min-h-[500px] flex items-center justify-center">
            {/* Geometric Shape 1: Yellow Block */}
            <div
              className="absolute top-[74px] left-[24px] w-[250px] h-[250px] bg-yellow rounded-[36px] border-2 border-ink shadow-solid-sm pointer-events-none"
              style={{ transform: "rotate(-8deg)" }}
            />

            {/* Geometric Shape 2: Blue Circle */}
            <div
              className="absolute top-0 right-[0px] w-[244px] h-[244px] bg-blue rounded-full border-2 border-ink shadow-solid-sm pointer-events-none"
            />

            {/* Geometric Shape 3: Mint Ring */}
            <div
              className="absolute bottom-[40px] right-[4px] w-[98px] h-[98px] rounded-full border-[18px] border-mint border-ink/40 pointer-events-none shadow-solid-sm"
            />

            {/* Geometric Shape 4: Coral Triangle */}
            <div
              className="absolute bottom-[30px] left-[16px] w-[88px] h-[78px] pointer-events-none drop-shadow-[3px_3px_0px_#14110F]"
              style={{ transform: "rotate(14deg)" }}
            >
              <svg viewBox="0 0 88 78" className="w-full h-full fill-coral stroke-ink stroke-[2.5]">
                <polygon points="44,6 82,72 6,72" />
              </svg>
            </div>

            {/* Floating Tag 1: C# */}
            <div className="absolute top-[24px] left-0 sm:-left-2 z-20 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border-2 border-ink shadow-solid-sm flex items-center gap-2 rotate-[-4deg] animate-float hover:scale-105 transition-transform">
              <span className="w-2 h-2 rounded-full bg-blue" />
              <span className="font-mono text-xs font-bold text-ink">
                C#
              </span>
            </div>

            {/* Interactive Code Editor Component */}
            <InteractiveCodeEditor />

            {/* Floating Tag 2: .NET */}
            <div className="absolute bottom-[16px] right-0 sm:right-2 z-20 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border-2 border-ink shadow-solid flex items-center gap-2 rotate-[3deg] animate-float-delayed hover:scale-105 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-coral" />
              <span className="font-mono text-xs font-bold text-ink">
                .NET
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
