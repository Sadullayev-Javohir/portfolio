export function TypingWarBuilt() {
  const cards = [
    {
      num: "01",
      title: "The battle engine",
      desc: "1v1 live duels, battle rooms, and automated tournament matchmaking on .NET 8.",
      tags: "Duels · rooms · tournaments",
    },
    {
      num: "02",
      title: "The real-time layer",
      desc: "SignalR Core and Redis Pub/Sub synchronising keystrokes and WPM under 30ms.",
      tags: "WebSockets · pub/sub · presence",
    },
    {
      num: "03",
      title: "The fairness layer",
      desc: "Server-side cadence verification eliminating spoofing, backed by 105+ xUnit tests.",
      tags: "Verification · xUnit · 105+ tests",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-[30px] px-6 lg:px-14 flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[8px] tracking-[1.2px] text-muted uppercase font-medium">
          WHAT I BUILT
        </span>
        <h2 className="font-display font-bold text-2xl lg:text-[28px] tracking-[-1px] text-ink">
          Three pieces of the puzzle.
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-4">
        {cards.map((card) => (
          <div
            key={card.num}
            className="bg-cream border-[1.5px] border-ink rounded-[16px] p-[18px] flex flex-col gap-[9px] shadow-solid-sm hover:-translate-y-0.5 hover:shadow-solid transition-all duration-200"
          >
            {/* Top row with color mark and number */}
            <div className="flex items-center justify-between">
              <div
                className="w-[22px] h-[22px] bg-lilac border-[1.5px] border-ink rounded-[5px]"
                aria-hidden="true"
              />
              <span className="font-mono text-[9px] text-muted font-medium">
                {card.num}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-semibold text-[17px] text-ink leading-tight">
              {card.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-xs text-muted leading-relaxed flex-1">
              {card.desc}
            </p>

            {/* Tags footer */}
            <div className="pt-2 border-t border-line/70">
              <span className="font-mono text-[9.5px] text-ink font-medium tracking-[0.2px]">
                {card.tags}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
