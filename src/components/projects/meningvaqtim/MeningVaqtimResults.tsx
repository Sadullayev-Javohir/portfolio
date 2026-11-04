import React from "react";

interface ResultItem {
  value: string;
  label: string;
}

const RESULTS_DATA: ResultItem[] = [
  { value: "200+", label: "users" },
  { value: "100%", label: "data integrity" },
  { value: "24/7", label: "background jobs" },
  { value: "1", label: "source of truth" },
];

export function MeningVaqtimResults() {
  return (
    <section className="w-full bg-ink py-6 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        {/* Left Label */}
        <span className="font-mono text-[8px] uppercase tracking-[1.4px] text-yellow font-semibold shrink-0">
          MEASURED
        </span>

        {/* Results Grid / Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 md:gap-0">
          {RESULTS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="md:border-l md:border-[#3A342E] md:pl-5 flex flex-col gap-0.5"
            >
              <span className="font-display text-[26px] font-bold text-cream tracking-[-1px] leading-tight">
                {item.value}
              </span>
              <span className="font-mono text-[7.5px] uppercase tracking-wider text-[#8F8678] font-normal">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
