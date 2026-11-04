import React from "react";

export function CaseStudyProblem() {
  return (
    <section className="w-full bg-white border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Eyebrow + Title */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="font-mono text-xs font-bold tracking-[1.6px] text-muted uppercase">
            01 — THE PROBLEM
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-ink tracking-tight leading-[1.1]">
            The platform worked. <br />
            The onboarding didn&apos;t.
          </h2>
        </div>

        {/* Right Column: Narrative + Coral Callout Card */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-4 text-ink-soft text-base sm:text-[17px] leading-relaxed">
            <p>
              Telemetry revealed that legitimate mobile users were being dropped due to false-positive anti-cheat flags during placement tests. We refined the validation logic and enabled session recovery so students never lose test progress.
            </p>
          </div>

          {/* Problem Callout Card (1:1 with PORTFOLIO.pen) */}
          <div className="rounded-2xl bg-coral border-2 border-ink shadow-[6px_6px_0px_#14110F] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight shrink-0">
              21 / 27
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-body text-base font-bold text-ink">
                drop-offs traced to false mobile anti-cheat triggers
              </span>
              <span className="font-mono text-xs text-ink/90 font-medium">
                Onboarding completion rose 78% after the fix.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
