import React from "react";

interface OverviewItem {
  key: string;
  value: string;
}

const OVERVIEW_ITEMS: OverviewItem[] = [
  {
    key: "THE CONTEXT",
    value:
      "A community hub for book reviews, quotes, and goals with seamless Telegram integration.",
  },
  {
    key: "MY ROLE",
    value:
      "Full-stack development: .NET 8 backend, SignalR live chat, and Telegram Mini App bridge.",
  },
  {
    key: "THE CONSTRAINT",
    value:
      "Secure HMAC-SHA256 authentication and high book catalog availability under traffic spikes.",
  },
];

export function KitobdagiMenOverview() {
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
