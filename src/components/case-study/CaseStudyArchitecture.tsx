import React from "react";
import { ArrowRight } from "lucide-react";

export function CaseStudyArchitecture() {
  return (
    <section className="w-full bg-white border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-10">
        {/* Section Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink/15">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold tracking-[1.6px] text-muted uppercase">
              03 — ARCHITECTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-ink tracking-tight leading-tight">
              How the pieces fit.
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            Simplified request path
          </span>
        </div>

        {/* Architecture Diagram Container (1:1 with PORTFOLIO.pen) */}
        <div className="w-full bg-cream rounded-3xl border-2 border-ink shadow-[7px_7px_0px_#14110F] p-6 lg:p-10 flex flex-col gap-8">
          {/* Grid Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 1. Client Node (2 cols) */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-sky border-2 border-ink shadow-solid-sm flex flex-col items-center justify-center text-center gap-1.5 min-h-[120px]">
              <span className="font-display text-base font-bold text-ink">
                CLIENT
              </span>
              <span className="font-mono text-[10px] text-ink-soft">
                web · telegram mini app
              </span>
            </div>

            {/* Arrow 1 */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <ArrowRight className="w-6 h-6 text-ink" />
            </div>

            {/* 2. ASP.NET Core API Node (3 cols) */}
            <div className="lg:col-span-3 p-6 rounded-2xl bg-yellow border-2 border-ink shadow-solid-sm flex flex-col items-center justify-center text-center gap-2 min-h-[150px]">
              <span className="font-display text-lg font-bold text-ink">
                ASP.NET CORE API
              </span>
              <span className="font-mono text-[11px] text-ink-soft">
                rest · auth · validation
              </span>
            </div>

            {/* Arrow 2 */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <ArrowRight className="w-6 h-6 text-ink" />
            </div>

            {/* 3. Middle Data Store Stack (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* PostgreSQL */}
              <div className="p-4 rounded-xl bg-blue text-cream border-2 border-ink shadow-solid-sm flex flex-col text-center gap-1">
                <span className="font-display text-sm font-bold">
                  POSTGRESQL
                </span>
                <span className="font-mono text-[9px] text-cream/80">
                  source of truth
                </span>
              </div>

              {/* Redis */}
              <div className="p-4 rounded-xl bg-coral text-cream border-2 border-ink shadow-solid-sm flex flex-col text-center gap-1">
                <span className="font-display text-sm font-bold">
                  REDIS
                </span>
                <span className="font-mono text-[9px] text-cream/80">
                  cache · pub/sub
                </span>
              </div>
            </div>

            {/* Arrow 3 */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <ArrowRight className="w-6 h-6 text-ink" />
            </div>

            {/* 4. External Services Stack (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Azure Speech */}
              <div className="p-4 rounded-xl bg-mint text-ink border-2 border-ink shadow-solid-sm flex flex-col text-center gap-1">
                <span className="font-display text-sm font-bold">
                  AZURE SPEECH
                </span>
                <span className="font-mono text-[9px] text-ink-soft">
                  stt · assessment
                </span>
              </div>

              {/* Background Jobs */}
              <div className="p-4 rounded-xl bg-lilac text-ink border-2 border-ink shadow-solid-sm flex flex-col text-center gap-1">
                <span className="font-display text-sm font-bold">
                  BACKGROUND JOBS
                </span>
                <span className="font-mono text-[9px] text-ink-soft">
                  hangfire · recovery
                </span>
              </div>
            </div>
          </div>

          {/* Cache Note at Bottom */}
          <div className="pt-4 border-t border-ink/15 flex items-center justify-between flex-wrap gap-2">
            <span className="font-mono text-xs text-muted">
              audio key = MD5(text + voice) → hit rate ↑, spend ↓ 35%
            </span>
            <span className="font-mono text-[11px] text-ink font-semibold">
              Sub-120ms roundtrip on cached audio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
