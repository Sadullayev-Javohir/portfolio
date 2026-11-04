import Image from "next/image";

export function TypingWarBand() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-14 pb-10">
      <div className="relative w-full min-h-[250px] lg:h-[250px] bg-lilac border-2 border-ink rounded-[22px] overflow-hidden p-6 lg:p-0 flex flex-col lg:block justify-between gap-6">
        {/* Background Decorative Polygon (Tri) */}
        <svg
          className="absolute left-[30px] lg:left-[60px] top-[140px] lg:top-[150px] w-20 h-[72px] -rotate-10 opacity-35 pointer-events-none select-none z-0"
          viewBox="0 0 80 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="40,0 80,72 0,72" fill="#FFFFFF" />
        </svg>

        {/* Big Number "04" */}
        <div className="relative lg:absolute lg:left-[34px] lg:top-[26px] z-10 select-none">
          <span className="font-display font-bold text-5xl lg:text-[64px] tracking-[-3px] text-ink leading-none">
            04
          </span>
        </div>

        {/* Category Label */}
        <div className="relative lg:absolute lg:left-[38px] lg:top-[104px] z-10">
          <span className="font-mono text-[9px] tracking-[1.4px] text-ink font-semibold uppercase">
            PROJECT / TYPINGWAR
          </span>
        </div>

        {/* Band Metrics */}
        <div className="relative lg:absolute lg:left-[380px] xl:left-[450px] lg:top-[104px] z-10 flex items-center gap-3.5">
          {/* Metric 1 */}
          <div className="bg-cream border-[1.5px] border-ink rounded-[12px] px-4 py-2.5 flex flex-col gap-0.5 shadow-solid-sm">
            <span className="font-display font-bold text-xl lg:text-[22px] tracking-[-0.8px] text-ink leading-tight">
              &lt;30 ms
            </span>
            <span className="font-mono text-[8px] text-muted uppercase tracking-[0.4px]">
              live sync
            </span>
          </div>

          {/* Metric 2 */}
          <div className="bg-cream border-[1.5px] border-ink rounded-[12px] px-4 py-2.5 flex flex-col gap-0.5 shadow-solid-sm">
            <span className="font-display font-bold text-xl lg:text-[22px] tracking-[-0.8px] text-ink leading-tight">
              105+
            </span>
            <span className="font-mono text-[8px] text-muted uppercase tracking-[0.4px]">
              unit tests
            </span>
          </div>
        </div>

        {/* TypingWar Preview Card */}
        <div className="relative lg:absolute lg:right-[18px] lg:top-[18px] z-20 w-full lg:w-[480px] h-[200px] lg:h-[214px] rounded-[16px] border-2 border-ink shadow-[5px_5px_0px_#14110F] overflow-hidden bg-white shrink-0 group">
          <Image
            src="/project-typingwar.jpg"
            alt="TypingWar Real-Time Duel Engine Preview"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
            priority
          />
        </div>
      </div>
    </section>
  );
}
