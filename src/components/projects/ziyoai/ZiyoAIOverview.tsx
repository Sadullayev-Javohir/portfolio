import React from "react";

interface OverviewItem {
  key: string;
  value: string;
}

const OVERVIEW_ITEMS: OverviewItem[] = [
  {
    key: "THE CONTEXT",
    value:
      "Automated voice interaction, document comprehension, and discussion starters for Telegram groups.",
  },
  {
    key: "MY ROLE",
    value:
      "Engineered multimodal STT/TTS pipeline, OCR comprehension, and LLM failover gateway.",
  },
  {
    key: "THE CONSTRAINT",
    value:
      "Resilient system availability during upstream LLM rate limits and token quota drops.",
  },
];

export function ZiyoAIOverview() {
  return (
    <section className="w-full bg-white border-b-2 border-ink py-8 sm:py-9">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {OVERVIEW_ITEMS.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="font-mono text-[8.5px] sm:text-[9px] font-semibold tracking-[1.2px] text-muted uppercase">
                {item.key}
              </span>
              <p className="font-sans text-xs sm:text-[13px] text-ink-soft leading-[1.65] font-normal">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
