import React from "react";
import Image from "next/image";

export function MeningVaqtimBand() {
  return (
    <section className="w-full px-6 sm:px-10 lg:px-14 pb-8 sm:pb-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative w-full min-h-[250px] lg:h-[250px] bg-yellow rounded-[22px] border-2 border-ink overflow-hidden p-6 sm:p-8 lg:p-0">
          {/* Decorative Geometric Triangle */}
          <div
            aria-hidden="true"
            className="absolute left-[60px] top-[145px] w-[80px] h-[72px] -rotate-[10deg] opacity-35 pointer-events-none select-none hidden lg:block"
          >
            <svg viewBox="0 0 80 72" className="w-full h-full fill-white">
              <polygon points="40,0 80,72 0,72" />
            </svg>
          </div>

          {/* Top-Left: Large Number 05 & Label */}
          <div className="lg:absolute lg:left-[34px] lg:top-[26px] flex flex-col">
            <span className="font-display text-[56px] sm:text-[64px] font-bold text-ink leading-none tracking-[-3px]">
              05
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[1.4px] text-ink mt-2 lg:mt-3 font-normal">
              PROJECT / MENINGVAQTIM
            </span>
          </div>

          {/* Band Metrics */}
          <div className="lg:absolute lg:left-[480px] lg:top-[104px] flex flex-wrap sm:flex-nowrap items-center gap-[14px] mt-6 lg:mt-0">
            {/* Metric 1 */}
            <div className="bg-cream border-2 border-ink rounded-[12px] px-4 py-2.5 flex flex-col gap-0.5 shadow-sm">
              <span className="font-display text-[22px] font-bold text-ink leading-tight">
                200+
              </span>
              <span className="font-mono text-[7.5px] uppercase tracking-wider text-muted font-normal">
                users
              </span>
            </div>

            {/* Metric 2 */}
            <div className="bg-cream border-2 border-ink rounded-[12px] px-4 py-2.5 flex flex-col gap-0.5 shadow-sm">
              <span className="font-display text-[22px] font-bold text-ink leading-tight">
                100%
              </span>
              <span className="font-mono text-[7.5px] uppercase tracking-wider text-muted font-normal">
                data integrity
              </span>
            </div>
          </div>

          {/* Right: MeningVaqtim Preview Card */}
          <div className="lg:absolute lg:left-[820px] lg:top-[18px] w-full lg:w-[480px] h-[214px] rounded-[16px] border-2 border-ink shadow-[5px_5px_0px_#14110F] overflow-hidden mt-6 lg:mt-0 relative group bg-ink">
            <Image
              src="/project-meningvaqtim.jpg"
              alt="MeningVaqtim Interface Preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
