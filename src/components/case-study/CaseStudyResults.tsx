import React from "react";

const STATS = [
  {
    value: "700+",
    label: "ACTIVE LEARNERS",
    note: "on the adaptive platform",
  },
  {
    value: "+78%",
    label: "ONBOARDING",
    note: "completion after recovery",
  },
  {
    value: "−35%",
    label: "SPEECH COST",
    note: "via Redis audio cache",
  },
  {
    value: "<120 ms",
    label: "REPEAT LATENCY",
    note: "for cached pronunciation",
  },
];

export function CaseStudyResults() {
  return (
    <section className="w-full bg-ink text-cream border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        {/* Section Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#3A342E]">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold tracking-[1.6px] text-coral uppercase">
              04 — RESULTS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-cream tracking-tight leading-tight">
              Measured after shipping.
            </h2>
          </div>
          <span className="font-mono text-xs text-[#8F8678]">
            Production telemetry · team dashboards
          </span>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#1A1613] border-2 border-[#3A342E] shadow-[6px_6px_0px_#0C0E10] flex flex-col gap-3"
            >
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-yellow tracking-tight">
                {stat.value}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs font-bold tracking-wider text-cream uppercase">
                  {stat.label}
                </span>
                <span className="font-mono text-xs text-[#8F8678]">
                  {stat.note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
