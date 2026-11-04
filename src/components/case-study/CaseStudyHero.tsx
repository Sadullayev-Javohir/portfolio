import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const WAVEFORM_BARS = [
  { h: 52, isCoral: true },
  { h: 96, isCoral: false },
  { h: 52, isCoral: false },
  { h: 74, isCoral: false },
  { h: 91, isCoral: false },
  { h: 26, isCoral: true },
  { h: 89, isCoral: false },
  { h: 77, isCoral: false },
  { h: 48, isCoral: false },
  { h: 96, isCoral: false },
  { h: 56, isCoral: true },
  { h: 71, isCoral: false },
  { h: 93, isCoral: false },
  { h: 31, isCoral: false },
  { h: 87, isCoral: false },
  { h: 80, isCoral: true },
  { h: 43, isCoral: false },
  { h: 95, isCoral: false },
  { h: 60, isCoral: false },
  { h: 67, isCoral: false },
  { h: 94, isCoral: true },
  { h: 36, isCoral: false },
  { h: 85, isCoral: false },
  { h: 83, isCoral: false },
  { h: 39, isCoral: false },
  { h: 95, isCoral: true },
  { h: 64, isCoral: false },
  { h: 63, isCoral: false },
  { h: 95, isCoral: false },
  { h: 40, isCoral: false },
  { h: 82, isCoral: true },
  { h: 86, isCoral: false },
  { h: 34, isCoral: false },
  { h: 94, isCoral: false },
];

export function CaseStudyHero() {
  return (
    <section className="w-full bg-blue border-b-2 border-ink py-12 lg:py-16 relative overflow-hidden">
      {/* Background Shapes (1:1 with PORTFOLIO.pen) */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-yellow border-2 border-ink pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-12 left-1/3 w-32 h-32 rounded-full border-[12px] border-mint bg-transparent pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-6 left-10 w-24 h-20 rotate-[-8deg] pointer-events-none z-0 hidden xl:block drop-shadow-[2px_2px_0px_#14110F]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 96 84" className="w-full h-full fill-coral stroke-ink stroke-2">
          <polygon points="48,4 92,80 4,80" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Big Metric & Copy (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="font-mono text-[11px] font-bold text-ink tracking-[1.4px] uppercase">
            ENGLISHAI / ADAPTIVE ENGLISH PLATFORM
          </span>

          <div className="flex flex-col">
            <span className="font-display text-6xl sm:text-7xl lg:text-[76px] font-extrabold text-cream leading-none tracking-tight">
              700+
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-cream tracking-[1.4px] uppercase pt-1">
              ACTIVE LEARNERS
            </span>
          </div>

          <p className="font-body text-sm sm:text-[15px] text-cream/90 leading-relaxed max-w-sm pt-1">
            Placement testing, pronunciation scoring, and lesson progress on a unified .NET backend.
          </p>
        </div>

        {/* Middle: App Screenshot Card (4 cols) */}
        <div className="lg:col-span-4 relative rounded-2xl border-2 border-ink shadow-[6px_6px_0px_#14110F] overflow-hidden aspect-[4/3] bg-cream">
          <Image
            src="/project-englishai.jpg"
            alt="EnglishAI Platform Interface"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover"
          />
        </div>

        {/* Right: Waveform Card (4 cols) */}
        <div className="lg:col-span-4 bg-cream rounded-2xl border-2 border-ink shadow-[6px_6px_0px_#14110F] p-5 sm:p-6 flex flex-col justify-between gap-5">
          {/* Wave Head */}
          <div className="flex items-center justify-between pb-3 border-b border-ink/15">
            <span className="font-mono text-[11px] font-bold text-ink tracking-wider uppercase">
              AZURE SPEECH · PRONUNCIATION
            </span>
            <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center">
              <Play className="w-3 h-3 text-cream fill-cream ml-0.5" />
            </div>
          </div>

          {/* Waveform Bars */}
          <div className="flex items-end justify-between gap-1 h-24 py-1">
            {WAVEFORM_BARS.map((bar, idx) => (
              <div
                key={idx}
                style={{ height: `${bar.h}%` }}
                className={`w-1.5 rounded-full ${
                  bar.isCoral ? "bg-coral" : "bg-ink"
                }`}
              />
            ))}
          </div>

          {/* Wave Foot */}
          <div className="flex items-center justify-between pt-3 border-t border-ink/15 font-mono text-xs">
            <span className="text-muted">0:07 / 0:07</span>
            <span className="px-2 py-0.5 rounded-md bg-yellow border border-ink font-bold text-ink">
              CACHED · &lt;120 ms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
