import React from "react";

const OVERVIEW_COLS = [
  {
    key: "THE BRIEF",
    value:
      "Adaptive English testing, lesson progression, and real-time pronunciation scoring.",
  },
  {
    key: "MY ROLE",
    value:
      "ASP.NET Core backend architecture, Azure Speech integration, and Redis caching.",
  },
  {
    key: "KEY GOAL",
    value:
      "Low-latency speech scoring under 120ms and resilient test session recovery.",
  },
];

export function CaseStudyOverview() {
  return (
    <section className="w-full bg-ink text-cream border-b-2 border-ink py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#2C2622]">
        {OVERVIEW_COLS.map((col, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-3 ${idx > 0 ? "pt-6 md:pt-0 md:pl-8 lg:pl-12" : ""}`}
          >
            <span className="font-mono text-xs font-bold tracking-[1.6px] text-yellow uppercase">
              {col.key}
            </span>
            <p className="font-body text-base sm:text-[17px] text-cream leading-relaxed font-normal">
              {col.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
