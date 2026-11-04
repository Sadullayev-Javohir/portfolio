export function TypingWarResults() {
  const metrics = [
    { value: "<30 ms", label: "live sync" },
    { value: "105+", label: "unit tests" },
    { value: "1v1", label: "duel mode" },
    { value: "0", label: "trust in the client" },
  ];

  return (
    <section className="w-full bg-ink text-cream">
      <div className="max-w-7xl mx-auto py-6 px-6 lg:px-14 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        {/* Eyebrow Label */}
        <span className="font-mono text-[9px] tracking-[1.2px] text-yellow font-semibold uppercase shrink-0">
          MEASURED
        </span>

        {/* Results Metrics */}
        <div className="grid grid-cols-2 md:flex md:items-center flex-1 justify-between gap-6 md:gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col gap-0.5 md:border-l md:border-[#3A342E] md:pl-5 lg:pl-8 flex-1"
            >
              <span className="font-display font-bold text-2xl lg:text-[26px] tracking-[-1px] text-cream leading-tight">
                {metric.value}
              </span>
              <span className="font-mono text-[8.5px] text-[#8F8678] uppercase tracking-[0.4px]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
