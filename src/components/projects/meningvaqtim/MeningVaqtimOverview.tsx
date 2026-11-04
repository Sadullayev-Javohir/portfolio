import React from "react";

export function MeningVaqtimOverview() {
  const OVERVIEW_COLS = [
    {
      key: "THE CONTEXT",
      value:
        "Preventing abandoned timer sessions from degrading personal productivity reports.",
    },
    {
      key: "MY ROLE",
      value:
        "Designed the PostgreSQL schema, timezone calculation engine, and background tasks.",
    },
    {
      key: "THE CONSTRAINT",
      value:
        "Accurate timezone conversions and automated cleanup across concurrent sessions.",
    },
  ];

  return (
    <section className="w-full bg-white border-y-2 border-ink py-[34px] px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-9">
        {OVERVIEW_COLS.map((col) => (
          <div key={col.key} className="flex flex-col gap-1.5">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-normal">
              {col.key}
            </span>
            <p className="font-sans text-[12.5px] text-ink-soft leading-relaxed">
              {col.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
