import React from "react";
import Image from "next/image";

export function KitobdagiMenBand() {
  return (
    <section className="w-full bg-cream px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="w-full relative overflow-hidden bg-coral rounded-[22px] border-2 border-ink min-h-[250px] flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 lg:py-0 lg:px-9">
          {/* Subtle Decorative Geometric Triangle (1:1 with pen Tri: opacity 0.35, rotate -10deg) */}
          <div
            aria-hidden="true"
            className="absolute left-[50px] bottom-2 w-20 h-18 opacity-35 -rotate-10 pointer-events-none select-none hidden lg:block"
          >
            <svg
              viewBox="0 0 80 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <polygon points="40,0 80,72 0,72" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Left Block: Num 02 + Label */}
          <div className="flex flex-col gap-1 z-10 w-full lg:w-auto">
            <span className="font-display text-5xl sm:text-6xl lg:text-[64px] font-bold text-ink tracking-[-3px] leading-none">
              02
            </span>
            <span className="font-mono text-[9px] font-semibold text-ink tracking-[1.4px] uppercase mt-1">
              PROJECT / KITOBDAGIMEN
            </span>

            {/* Metrics on Mobile / Tablet */}
            <div className="flex lg:hidden items-center gap-3.5 mt-4">
              <div className="bg-cream rounded-xl border-[1.5px] border-ink px-4 py-2.5 flex flex-col gap-0.5 shadow-solid-sm">
                <span className="font-display text-xl sm:text-[22px] font-bold text-ink tracking-[-0.8px] leading-none">
                  99.8%
                </span>
                <span className="font-mono text-[7.5px] sm:text-[8px] text-muted uppercase tracking-wider">
                  availability
                </span>
              </div>
              <div className="bg-cream rounded-xl border-[1.5px] border-ink px-4 py-2.5 flex flex-col gap-0.5 shadow-solid-sm">
                <span className="font-display text-xl sm:text-[22px] font-bold text-ink tracking-[-0.8px] leading-none">
                  60/40
                </span>
                <span className="font-mono text-[7.5px] sm:text-[8px] text-muted uppercase tracking-wider">
                  followed vs new
                </span>
              </div>
            </div>
          </div>

          {/* Center Block: Band Metrics on Desktop (x: 480, y: 104 in pen) */}
          <div className="hidden lg:flex items-center gap-3.5 z-10 self-end mb-6">
            <div className="bg-cream rounded-xl border-[1.5px] border-ink px-4 py-2.5 flex flex-col gap-0.5 shadow-solid-sm">
              <span className="font-display text-[22px] font-bold text-ink tracking-[-0.8px] leading-none">
                99.8%
              </span>
              <span className="font-mono text-[7.5px] text-muted uppercase tracking-wider">
                availability
              </span>
            </div>
            <div className="bg-cream rounded-xl border-[1.5px] border-ink px-4 py-2.5 flex flex-col gap-0.5 shadow-solid-sm">
              <span className="font-display text-[22px] font-bold text-ink tracking-[-0.8px] leading-none">
                60/40
              </span>
              <span className="font-mono text-[7.5px] text-muted uppercase tracking-wider">
                followed vs new
              </span>
            </div>
          </div>

          {/* Right Block: KitobdagiMen Preview Card (480x214px, rounded-16px, border-2 border-ink, shadow 5px) */}
          <div className="w-full lg:w-[480px] h-[200px] sm:h-[214px] rounded-[16px] border-2 border-ink shadow-[5px_5px_0px_#14110F] overflow-hidden relative bg-cream shrink-0 z-10 mt-6 lg:mt-0">
            <Image
              src="/project-kitobdagimen.jpg"
              alt="KitobdagiMen Live Reading Platform"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
