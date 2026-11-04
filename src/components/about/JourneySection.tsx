"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TimelineItem {
  year: string;
  markerColor: string;
  title: string;
  description: string;
  company: string;
  renderVisual: () => React.ReactNode;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "OCT 2024",
    markerColor: "bg-blue",
    title: "Started B.Sc. Computer Science",
    description:
      "Core focus on algorithms, data structures, relational databases, and network fundamentals.",
    company: "PDP UNIVERSITY",
    renderVisual: () => (
      <div className="relative w-[200px] h-[64px]">
        {/* S1: Blue circle (x: 110, y: 2, 58x58, border-2 border-ink) */}
        <div className="absolute left-[110px] top-[2px] w-[58px] h-[58px] rounded-full bg-blue border-2 border-ink shadow-solid-sm" />
        {/* S2: Ink ring / donut (x: 60, y: 24, 30x30, innerRadius: 0.6) */}
        <div className="absolute left-[60px] top-[24px] w-[30px] h-[30px] rounded-full border-[6px] border-ink bg-transparent" />
      </div>
    ),
  },
  {
    year: "JUN 2026",
    markerColor: "bg-coral",
    title: "Shipped two products in one month",
    description:
      "Social reading platform with algorithmic feed, and real-time multiplayer typing duel engine.",
    company: "KITOBDAGIMEN + TYPINGWAR",
    renderVisual: () => (
      <div className="relative w-[200px] h-[64px]">
        {/* S1: Coral triangle (x: 110, y: 4, 56x50, rotation: 12deg, stroke: 2px) */}
        <div className="absolute left-[110px] top-[4px] w-[56px] h-[50px] rotate-[12deg] drop-shadow-[2px_2px_0px_#14110F]">
          <svg viewBox="0 0 56 50" className="w-full h-full fill-coral stroke-ink stroke-2 overflow-visible">
            <polygon points="28,2 54,48 2,48" />
          </svg>
        </div>
        {/* S2: Ink rounded rectangle (x: 70, y: 34, 24x24, cornerRadius: 6) */}
        <div className="absolute left-[70px] top-[34px] w-[24px] h-[24px] rounded-[6px] bg-ink" />
      </div>
    ),
  },
  {
    year: "JUL 2026",
    markerColor: "bg-yellow",
    title: "Backend at EnglishAI",
    description:
      "Engineered ASP.NET Core APIs, PostgreSQL schemas, and Redis caching for 700+ active learners.",
    company: "ENGLISHAI",
    renderVisual: () => (
      <div className="relative w-[200px] h-[64px]">
        {/* S1: Yellow rounded rectangle (x: 104, y: 4, 56x56, cornerRadius: 16, rotation: -8deg) */}
        <div className="absolute left-[104px] top-[4px] w-[56px] h-[56px] rounded-[16px] -rotate-[8deg] bg-yellow border-2 border-ink shadow-solid-sm" />
        {/* S2: Ink solid circle (x: 66, y: 34, 22x22) */}
        <div className="absolute left-[66px] top-[34px] w-[22px] h-[22px] rounded-full bg-ink" />
      </div>
    ),
  },
  {
    year: "AUG 2026",
    markerColor: "bg-mint",
    title: "Multimodal AI Engineering",
    description:
      "Telegram AI assistant with voice in/out, OCR comprehension, and dual-key failover gateway.",
    company: "ZIYOAI · @ZIYOAIBOT",
    renderVisual: () => (
      <div className="relative w-[200px] h-[64px]">
        {/* S1: Mint ring (x: 106, y: 2, 60x60, innerRadius: 0.66) */}
        <div className="absolute left-[106px] top-[2px] w-[60px] h-[60px] rounded-full border-[10px] border-mint bg-transparent" />
        {/* S2: Ink rotated square (x: 60, y: 22, 26x26, rotation: 12deg) */}
        <div className="absolute left-[60px] top-[22px] w-[26px] h-[26px] rotate-[12deg] bg-ink" />
      </div>
    ),
  },
  {
    year: "NOW",
    markerColor: "bg-ink",
    title: "Keeping MeningVaqtim running",
    description:
      "Productivity analytics, background jobs and 100% data integrity for 200+ users.",
    company: "MENINGVAQTIM · ACTIVE PROJECT",
    renderVisual: () => (
      <div className="relative w-[200px] h-[64px]">
        {/* S1: Black 4-point polygon / rhombus (x: 110, y: 6, 52x52, rotation: 10deg) */}
        <div className="absolute left-[110px] top-[6px] w-[52px] h-[52px] rotate-[10deg] drop-shadow-[2px_2px_0px_#14110F]">
          <svg viewBox="0 0 52 52" className="w-full h-full fill-ink stroke-ink stroke-2 overflow-visible">
            <polygon points="26,2 50,26 26,50 2,26" />
          </svg>
        </div>
        {/* S2: Ink ring / donut (x: 64, y: 30, 26x26, innerRadius: 0.55) */}
        <div className="absolute left-[64px] top-[30px] w-[26px] h-[26px] rounded-full border-[6px] border-ink bg-transparent" />
      </div>
    ),
  },
];

export function JourneySection() {
  const { dict } = useLanguage();

  return (
    <section className="w-full bg-cream border-b-2 border-ink py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-bold tracking-[1.6px] text-muted uppercase">
            {dict.about.journey.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-ink tracking-tight leading-tight">
            {dict.about.journey.title}
          </h2>
        </div>

        {/* Timeline Stack (1:1 with PORTFOLIO.pen) */}
        <div className="flex flex-col border-b-[1.5px] border-ink">
          {TIMELINE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="border-t-[1.5px] border-ink py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Year Col */}
              <div className="w-[120px] shrink-0 flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${item.markerColor} border-[1.5px] border-ink shrink-0`}
                />
                <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.9px] text-muted uppercase">
                  {item.year}
                </span>
              </div>

              {/* Journey Copy */}
              <div className="flex-1 max-w-[660px] flex flex-col gap-2">
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.8px] text-ink">
                  {item.title}
                </h3>
                <p className="font-body text-sm sm:text-[15px] text-muted leading-[1.6]">
                  {item.description}
                </p>
                <span className="font-mono text-[9px] text-ink font-semibold tracking-[0.8px] uppercase pt-0.5">
                  {item.company}
                </span>
              </div>

              {/* Visual Geometric Composition */}
              <div className="shrink-0 flex justify-end md:w-[200px] overflow-visible">
                {item.renderVisual()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
