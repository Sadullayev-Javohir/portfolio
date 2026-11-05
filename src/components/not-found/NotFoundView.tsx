"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function NotFoundView() {
  const { dict } = useLanguage();

  const quickLinks = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.projects, href: "/projects" },
    { label: dict.nav.experience, href: "/experience" },
    { label: dict.nav.blog, href: "/blog" },
    { label: dict.nav.resume, href: "/resume" },
  ];

  return (
    <div className="relative w-full min-h-[calc(100vh-160px)] lg:h-[760px] bg-cream overflow-hidden flex items-center justify-center py-16 sm:py-20 lg:py-0">
      {/* ============================================================ */}
      {/* Decorative Geometric Shapes (Playful Geometric tokens)      */}
      {/* ============================================================ */}

      {/* 1. Yellow Disc: -left-[120px] -top-[170px] w-420 h-420 */}
      <div
        className="absolute -left-[120px] -top-[170px] w-[420px] h-[420px] rounded-full bg-yellow border-2 border-ink pointer-events-none select-none transition-transform duration-700 ease-out hover:scale-105"
        aria-hidden="true"
      />

      {/* 2. Coral Triangle: right-[4%] / right-[100px] top-[90px] w-150 h-134 rotation -12deg */}
      <div
        className="absolute right-[4%] xl:right-[100px] top-[90px] w-[150px] h-[134px] -rotate-12 pointer-events-none select-none transition-transform duration-500 ease-out hover:rotate-0 hidden md:block"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 150 134"
          className="w-full h-full overflow-visible"
        >
          <polygon
            points="75,4 146,130 4,130"
            fill="#FF6B5A"
            stroke="#14110F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 3. Blue Ring: right-[3%] / right-[60px] top-[520px] w-150 h-150 innerRadius 0.68 */}
      <div
        className="absolute right-[3%] xl:right-[60px] top-[520px] w-[150px] h-[150px] pointer-events-none select-none transition-transform duration-700 ease-out hover:scale-110 hidden md:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 150 150" className="w-full h-full">
          <circle
            cx="75"
            cy="75"
            r="63"
            fill="none"
            stroke="#4F7CFF"
            strokeWidth="24"
          />
        </svg>
      </div>

      {/* 4. Mint Square: left-[3%] / left-[96px] top-[560px] w-110 h-110 cornerRadius 22 rotation 12deg */}
      <div
        className="absolute left-[3%] xl:left-[96px] top-[560px] w-[110px] h-[110px] rounded-[22px] bg-mint border-2 border-ink rotate-12 pointer-events-none select-none transition-transform duration-500 ease-out hover:rotate-0 hidden md:block"
        aria-hidden="true"
      />

      {/* 5. Dot Matrix / Row: 12 dots at y=120, x=250..448 (spacing 18px) */}
      <div
        className="absolute left-[16%] xl:left-[250px] top-[120px] hidden lg:flex items-center gap-[12px] pointer-events-none select-none"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] rounded-full bg-ink opacity-35"
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* Center 404 Content (1:1 with PORTFOLIO.pen Center frame)     */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 sm:px-8 flex flex-col items-center justify-center text-center gap-[18px]">
        {/* Crumb */}
        <div className="flex items-center gap-[9px]">
          <span className="font-mono text-[9.5px] uppercase tracking-[1.6px] text-muted font-normal">
            {dict.notFound.eyebrow}
          </span>
          <span className="font-mono text-[9.5px] text-muted font-normal">
            ·
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[1.6px] text-ink font-normal">
            {dict.notFound.routeNotFound}
          </span>
        </div>

        {/* Big 404 with custom geometric ocular zero donut */}
        <div className="flex items-center justify-center gap-[6px] my-1">
          {/* Four 1 */}
          <span className="font-display text-[96px] sm:text-[140px] md:text-[190px] font-bold text-ink leading-none tracking-[-4px] sm:tracking-[-6px] md:tracking-[-8px] select-none">
            4
          </span>

          {/* Zero Frame: 154x154 with outer ring (r=75, inner r=48) & coral dot (r=13) */}
          <div className="relative flex items-center justify-center w-[80px] h-[80px] sm:w-[115px] sm:h-[115px] md:w-[154px] md:h-[154px] flex-shrink-0 select-none">
            <svg
              viewBox="0 0 150 150"
              className="w-full h-full drop-shadow-sm"
              aria-label="0"
            >
              {/* Outer ring: outer radius 75, inner radius 48, thickness 27 */}
              <circle
                cx="75"
                cy="75"
                r="61.5"
                fill="none"
                stroke="#14110F"
                strokeWidth="27"
              />
              {/* Center Dot: diameter 26, radius 13, coral */}
              <circle
                cx="75"
                cy="75"
                r="13"
                fill="#FF6B5A"
              />
            </svg>
          </div>

          {/* Four 2 */}
          <span className="font-display text-[96px] sm:text-[140px] md:text-[190px] font-bold text-ink leading-none tracking-[-4px] sm:tracking-[-6px] md:tracking-[-8px] select-none">
            4
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-[26px] sm:text-[34px] md:text-[40px] font-bold text-ink leading-[1.1] tracking-[-1px] sm:tracking-[-1.5px]">
          {dict.notFound.title}
        </h1>

        {/* Sub */}
        <p className="font-sans text-[14px] sm:text-[15px] leading-[1.6] text-muted text-center max-w-[560px] px-2">
          {dict.notFound.description}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-[10px] pt-[6px]">
          {/* Button 1: Back to home */}
          <Link
            href="/"
            className="inline-flex items-center gap-[9px] px-[22px] py-[13px] rounded-full bg-yellow border-2 border-ink text-ink font-sans text-[14px] font-semibold shadow-[4px_4px_0px_#14110F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 transition-all"
          >
            <span>{dict.notFound.backHome}</span>
            <ArrowLeft className="w-4 h-4 text-ink stroke-[2.2]" />
          </Link>

          {/* Button 2: Browse projects */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-[9px] px-[22px] py-[13px] rounded-full bg-transparent border-2 border-ink text-ink font-sans text-[14px] font-semibold hover:bg-ink hover:text-cream active:bg-ink active:text-cream transition-all"
          >
            <span>{dict.notFound.browseProjects}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-[8px] pt-[10px] max-w-xl">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="inline-flex items-center px-[11px] py-[6px] rounded-full border-[1.5px] border-ink font-mono text-[9px] uppercase tracking-[0.3px] text-ink hover:bg-yellow hover:border-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
