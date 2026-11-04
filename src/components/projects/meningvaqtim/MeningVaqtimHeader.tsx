import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function MeningVaqtimHeader() {
  return (
    <section className="w-full pt-[42px] pb-[34px] px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        {/* Left: Header Copy */}
        <div className="flex flex-col gap-3.5 max-w-[800px]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-[9px]">
            <Link
              href="/projects"
              className="font-mono text-[9px] uppercase tracking-[1.2px] text-muted hover:text-ink transition-colors"
            >
              PROJECTS
            </Link>
            <span className="font-mono text-[9px] text-muted">/</span>
            <span className="font-mono text-[9px] uppercase tracking-[1.2px] text-ink font-semibold">
              MENINGVAQTIM
            </span>
          </nav>

          {/* Badges */}
          <div className="flex items-center gap-[7px]">
            <div className="bg-ink border-[1.5px] border-ink rounded-full px-[9px] py-1 flex items-center justify-center">
              <span className="font-mono text-[8px] uppercase tracking-[0.3px] text-cream font-medium">
                CASE STUDY 05
              </span>
            </div>
            <div className="bg-yellow border-[1.5px] border-ink rounded-full px-[9px] py-1 flex items-center justify-center">
              <span className="font-mono text-[8px] uppercase tracking-[0.3px] text-ink font-semibold">
                PRODUCTIVITY
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-bold text-ink leading-[0.95] tracking-[-2.8px]">
            MeningVaqtim
          </h1>

          {/* Tagline */}
          <p className="font-display text-[18px] sm:text-[20px] lg:text-[22px] font-medium text-ink-soft leading-[1.35] tracking-[-0.5px] max-w-[700px]">
            Planned work versus what actually happened.
          </p>
        </div>

        {/* Right: Meta Card */}
        <aside
          aria-label="Project Metadata"
          className="w-full lg:w-[320px] shrink-0 bg-white rounded-[18px] border-2 border-ink shadow-[6px_6px_0px_#14110F] px-[18px] py-1.5 flex flex-col"
        >
          {/* Row 1: Role */}
          <div className="flex items-center justify-between py-[9px] border-b border-[#E7DFD2]">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-normal">
              ROLE
            </span>
            <span className="font-sans text-[10.5px] font-medium text-ink">
              Backend Developer
            </span>
          </div>

          {/* Row 2: Period */}
          <div className="flex items-center justify-between py-[9px] border-b border-[#E7DFD2]">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-normal">
              PERIOD
            </span>
            <span className="font-sans text-[10.5px] font-medium text-ink">
              Ongoing
            </span>
          </div>

          {/* Row 3: Stack */}
          <div className="flex items-center justify-between py-[9px] border-b border-[#E7DFD2]">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-normal">
              STACK
            </span>
            <span className="font-sans text-[10.5px] font-medium text-ink">
              .NET 8 · PostgreSQL · Hangfire
            </span>
          </div>

          {/* Row 4: Status */}
          <div className="flex items-center justify-between py-[9px]">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-normal">
              STATUS
            </span>
            <a
              href="https://meningvaqtim.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10.5px] font-medium text-ink hover:text-muted flex items-center gap-1 transition-colors group"
            >
              <span>Active · meningvaqtim.uz</span>
              <ExternalLink className="w-3 h-3 text-ink/70 group-hover:text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
