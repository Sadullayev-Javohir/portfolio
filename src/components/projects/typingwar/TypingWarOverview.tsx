export function TypingWarOverview() {
  const items = [
    {
      key: "THE CONTEXT",
      value:
        "Competitive multiplayer typing arena requiring sub-50ms synchronization across duels.",
    },
    {
      key: "MY ROLE",
      value:
        "Architected SignalR duel engine, Redis Pub/Sub sync, and server-side validation.",
    },
    {
      key: "THE CONSTRAINT",
      value:
        "Sub-30ms socket delivery with zero tolerance for spoofed keystrokes or race conditions.",
    },
  ];

  return (
    <section className="w-full bg-white border-b-2 border-ink">
      <div className="max-w-7xl mx-auto py-[34px] px-6 lg:px-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-9">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <span className="font-mono text-[8px] tracking-[1.2px] text-muted uppercase font-medium">
              {item.key}
            </span>
            <p className="font-sans text-[13px] text-ink-soft leading-[1.6]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
