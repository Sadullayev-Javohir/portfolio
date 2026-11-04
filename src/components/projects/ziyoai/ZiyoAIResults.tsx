import React from "react";

interface ResultItem {
  value: string;
  label: string;
}

const RESULTS: ResultItem[] = [
  { value: "99.9%", label: "uptime" },
  { value: "30s / 65s", label: "tiered timeouts" },
  { value: "2", label: "provider keys" },
  { value: "1", label: "autonomous pipeline" },
];

export function ZiyoAIResults() {
  return (
    <section className="w-full bg-ink py-6 sm:py-7 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center gap-6 lg:gap-10">
        {/* Label: MEASURED */}
        <div className="shrink-0">
          <span className="font-mono text-[8.5px] sm:text-[9px] font-bold tracking-[1.4px] text-yellow uppercase whitespace-nowrap">
            MEASURED
          </span>
        </div>

        {/* 4 Results with left border #3A342E */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 flex-1">
          {RESULTS.map((res, idx) => (
            <div
              key={idx}
              className="border-l border-[#3A342E] pl-4 sm:pl-5 flex flex-col gap-0.5"
            >
              <span className="font-display text-2xl sm:text-[26px] font-bold text-cream tracking-[-1px] leading-tight">
                {res.value}
              </span>
              <span className="font-mono text-[7.5px] sm:text-[8px] text-[#8F8678] uppercase tracking-wider">
                {res.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
