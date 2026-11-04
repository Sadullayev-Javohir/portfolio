import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function TypingWarHeader() {
  return (
    <header className="w-full max-w-7xl mx-auto pt-8 sm:pt-[42px] px-6 lg:px-14 pb-8 sm:pb-[34px] flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-10">
      {/* Header Copy */}
      <div className="flex flex-col gap-3.5 max-w-2xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-[9px] font-mono text-[9px] tracking-[1.2px]"
        >
          <Link
            href="/projects"
            className="text-muted hover:text-ink transition-colors font-medium"
          >
            PROJECTS
          </Link>
          <span className="text-muted" aria-hidden="true">
            /
          </span>
          <span className="text-ink font-semibold">TYPINGWAR</span>
        </nav>

        {/* Badges */}
        <div className="flex items-center gap-[7px]">
          <span className="inline-flex items-center bg-ink text-cream border-[1.5px] border-ink rounded-full px-[9px] py-[3px] font-mono text-[8px] tracking-[0.3px] font-medium">
            CASE STUDY 04
          </span>
          <span className="inline-flex items-center bg-lilac text-ink border-[1.5px] border-ink rounded-full px-[9px] py-[3px] font-mono text-[8px] tracking-[0.3px] font-medium">
            REAL-TIME
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[64px] tracking-[-2.8px] leading-[0.95] text-ink">
          TypingWar
        </h1>

        {/* Tagline */}
        <p className="font-display font-medium text-lg sm:text-xl lg:text-[22px] tracking-[-0.5px] leading-[1.35] text-ink-soft max-w-[700px]">
          Duels where the server keeps score.
        </p>
      </div>

      {/* Meta Card */}
      <div className="w-full lg:w-[320px] shrink-0 bg-white rounded-[18px] border-2 border-ink shadow-[6px_6px_0px_#14110F] px-[18px] py-[6px]">
        {/* Row 1: ROLE */}
        <div className="flex items-center justify-between py-[9px] border-b border-line gap-2.5">
          <span className="font-mono text-[8px] tracking-[1.2px] text-muted uppercase shrink-0">
            ROLE
          </span>
          <span className="font-sans text-[11px] font-medium text-ink text-right">
            Full-Stack Developer
          </span>
        </div>

        {/* Row 2: PERIOD */}
        <div className="flex items-center justify-between py-[9px] border-b border-line gap-2.5">
          <span className="font-mono text-[8px] tracking-[1.2px] text-muted uppercase shrink-0">
            PERIOD
          </span>
          <span className="font-sans text-[11px] font-medium text-ink text-right">
            Jun — Jul 2026
          </span>
        </div>

        {/* Row 3: STACK */}
        <div className="flex items-center justify-between py-[9px] border-b border-line gap-2.5">
          <span className="font-mono text-[8px] tracking-[1.2px] text-muted uppercase shrink-0">
            STACK
          </span>
          <span className="font-sans text-[11px] font-medium text-ink text-right">
            .NET 8 · SignalR Core · Redis
          </span>
        </div>

        {/* Row 4: STATUS */}
        <div className="flex items-center justify-between py-[9px] gap-2.5">
          <span className="font-mono text-[8px] tracking-[1.2px] text-muted uppercase shrink-0">
            STATUS
          </span>
          <a
            href="https://github.com/Sadullayev-Javohir/typingwar"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-sans text-[11px] font-medium text-ink hover:text-coral transition-colors text-right"
          >
            <span>Open source · GitHub</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </header>
  );
}
