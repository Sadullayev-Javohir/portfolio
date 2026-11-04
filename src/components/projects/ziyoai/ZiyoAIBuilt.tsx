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
    title: "Multimodal assistant",
    desc: "Voice in/out via Whisper STT and TTS, plus OCR document understanding on .NET 8.",
    tags: "STT · TTS · OCR",
  },
  {
    num: "02",
    title: "Channel enrichment",
    desc: "Autonomous generation of discussion prompts, concise summaries, and educational quizzes.",
    tags: "Prompts · summaries · quizzes",
  },
  {
    num: "03",
    title: "Failover gateway",
    desc: "Dual-key gateway with tiered 30s/65s timeouts, rate limiting, and update deduplication.",
    tags: "Dual key · timeouts · dedupe",
  },
];

export function ZiyoAIBuilt() {
  return (
    <section className="w-full bg-cream py-10 sm:py-14 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Head */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[8.5px] sm:text-[9px] font-semibold tracking-[1.2px] text-muted uppercase">
            WHAT I BUILT
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[28px] font-bold text-ink tracking-[-1px] leading-tight">
            Three pieces of the puzzle.
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {BUILT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-cream rounded-[16px] border-[1.5px] border-ink p-5 sm:p-6 flex flex-col justify-between gap-5 transition-transform hover:-translate-y-1 shadow-solid-sm"
            >
              <div className="flex flex-col gap-3">
                {/* Top Row: Rotated Mint Mark & Num */}
                <div className="flex items-center justify-between">
                  <div
                    aria-hidden="true"
                    className="w-[22px] h-[22px] -rotate-6 bg-mint rounded-[5px] border-[1.5px] border-ink"
                  />
                  <span className="font-mono text-[9px] text-muted uppercase tracking-wider font-semibold">
                    {card.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-base sm:text-[17px] font-semibold text-ink tracking-[-0.4px] leading-snug">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-[12px] text-muted leading-[1.6] font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-3 border-t border-[#E7DFD2]">
                <span className="font-mono text-[8px] sm:text-[8.5px] font-medium text-ink tracking-[0.3px] uppercase">
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
