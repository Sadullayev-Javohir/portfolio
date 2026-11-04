import React from "react";

const BUILDS = [
  {
    num: "01",
    title: "Core API Architecture",
    description:
      "ASP.NET Core REST endpoints for placement tests and lesson tracking, backed by PostgreSQL and Redis read caching.",
    label: "Clean architecture · EF Core · Redis",
    renderMark: () => (
      <div className="w-6 h-6 rotate-6 bg-coral border-2 border-ink rounded-sm shadow-sm" />
    ),
  },
  {
    num: "02",
    title: "Speech Evaluation Pipeline",
    description:
      "Azure Speech STT and pronunciation assessment with MD5-hashed Redis caching, cutting duplicate third-party costs.",
    label: "STT · scoring · MD5 caching",
    renderMark: () => (
      <div className="w-6 h-6 rounded-full bg-mint border-2 border-ink shadow-sm" />
    ),
  },
  {
    num: "03",
    title: "Resilient Session Recovery",
    description:
      "State persistence and idempotent resume logic allowing students to resume interrupted tests without losing progress.",
    label: "State persistence · zero data loss",
    renderMark: () => (
      <div className="w-6 h-6 -rotate-6 bg-yellow border-2 border-ink rounded-md shadow-sm" />
    ),
  },
];

export function CaseStudyWhatIBuilt() {
  return (
    <section className="w-full bg-cream border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink/15">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold tracking-[1.6px] text-muted uppercase">
              02 — WHAT I BUILT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-ink tracking-tight leading-tight">
              Three pieces, one flow.
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            Every decision below is in production.
          </span>
        </div>

        {/* 3 Build Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BUILDS.map((build) => (
            <div
              key={build.num}
              className="p-7 rounded-3xl bg-white border-2 border-ink shadow-[6px_6px_0px_#14110F] flex flex-col justify-between gap-6 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  {build.renderMark()}
                  <span className="font-mono text-xs font-bold text-muted">
                    {build.num}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-ink tracking-tight pt-1">
                  {build.title}
                </h3>

                <p className="font-body text-sm sm:text-[15px] text-muted leading-relaxed">
                  {build.description}
                </p>
              </div>

              <div className="pt-4 border-t border-ink/10">
                <span className="font-mono text-xs font-semibold text-ink">
                  {build.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
