import React from "react";

interface BuiltCard {
  num: string;
  title: string;
  desc: string;
  tags: string;
}

const BUILT_CARDS: BuiltCard[] = [
  {
    num: "01",
    title: "Timezone-aware analytics",
    desc: "Planned tasks compared with actual deep-work sessions calculated per user timezone.",
    tags: "Analytics · timezones · reports",
  },
  {
    num: "02",
    title: "Background completion",
    desc: "Hangfire and BackgroundService closing abandoned timers automatically to ensure data integrity.",
    tags: "Hangfire · BackgroundService",
  },
  {
    num: "03",
    title: "Distraction logging",
    desc: "First-class event logging for focus interruptions with consistent timeline tracking.",
    tags: "Events · data integrity",
  },
];

export function MeningVaqtimBuilt() {
  return (
    <section className="w-full py-[30px] px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-5">
        {/* Head */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-normal">
            WHAT I BUILT
          </span>
          <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-ink tracking-[-1px]">
            Three pieces of the puzzle.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BUILT_CARDS.map((card) => (
            <div
              key={card.num}
              className="bg-cream rounded-[16px] border-[1.5px] border-ink p-[18px] flex flex-col gap-[9px] hover:-translate-y-1 transition-transform"
            >
              {/* Top Row: Mark & Num */}
              <div className="flex items-center justify-between">
                <div
                  aria-hidden="true"
                  className="w-[22px] h-[22px] bg-yellow border-[1.5px] border-ink rounded-[5px] -rotate-6 shrink-0"
                />
                <span className="font-mono text-[8px] text-muted font-normal">
                  {card.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-[17px] font-semibold text-ink leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[11.5px] text-muted leading-relaxed flex-1">
                {card.desc}
              </p>

              {/* Tags */}
              <div className="pt-1">
                <span className="font-mono text-[7.5px] uppercase tracking-wider text-ink font-normal">
                  {card.tags}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
