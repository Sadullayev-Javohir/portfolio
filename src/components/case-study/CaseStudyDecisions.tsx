import React from "react";

const DECISIONS = [
  {
    num: "01",
    title: "Content-based caching",
    description:
      "Hashing prompt content allows multiple learners to share cached audio assets, cutting third-party speech API costs.",
  },
  {
    num: "02",
    title: "Resumable session state",
    description:
      "Persisting incremental answers turns network drops into instant resumes instead of restarting attempts.",
  },
  {
    num: "03",
    title: "Targeted fraud validation",
    description:
      "Refined anti-cheat rules to distinguish normal mobile network reconnects from actual fraudulent activity.",
  },
];

export function CaseStudyDecisions() {
  return (
    <section className="w-full bg-cream border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-10">
        {/* Section Head */}
        <div className="flex flex-col gap-2 pb-6 border-b border-ink/15">
          <span className="font-mono text-xs font-bold tracking-[1.6px] text-muted uppercase">
            05 — DECISIONS I&apos;D DEFEND
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-ink tracking-tight leading-tight">
            Trade-offs, not magic.
          </h2>
        </div>

        {/* 3 Decision Rows Stack */}
        <div className="flex flex-col border-b-[1.5px] border-ink">
          {DECISIONS.map((decision) => (
            <div
              key={decision.num}
              className="border-t-[1.5px] border-ink py-7 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs font-bold text-muted">
                  {decision.num}
                </span>
              </div>

              <div className="md:col-span-4">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">
                  {decision.title}
                </h3>
              </div>

              <div className="md:col-span-7">
                <p className="font-body text-sm sm:text-base text-muted leading-relaxed">
                  {decision.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
