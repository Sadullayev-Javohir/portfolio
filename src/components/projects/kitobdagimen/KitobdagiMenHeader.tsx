import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface MetaItem {
  key: string;
  value: string;
  href?: string;
}

const META_ITEMS: MetaItem[] = [
  { key: "ROLE", value: "Full-Stack Developer" },
  { key: "PERIOD", value: "Jun — Jul 2026" },
  { key: "STACK", value: ".NET 8 · PostgreSQL · SignalR" },
  { key: "STATUS", value: "Live · kitobdagimen.uz", href: "https://kitobdagimen.uz" },
];

export function KitobdagiMenHeader() {
  return (
    <section className="w-full bg-cream pt-10 sm:pt-12 pb-8 sm:pb-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-10">
        {/* Left Column: Header Copy */}
        <div className="flex-1 flex flex-col gap-3.5 sm:gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[1.2px] uppercase">
            <Link
              href="/projects"
              className="text-muted hover:text-ink transition-colors"
            >
              PROJECTS
            </Link>
            <span className="text-muted">/</span>
            <span className="text-ink font-semibold">KITOBDAGIMEN</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-full bg-ink text-cream font-mono text-[8.5px] font-semibold tracking-[0.3px] uppercase shadow-solid-sm">
              CASE STUDY 02
            </span>
            <span className="px-2.5 py-1 rounded-full bg-coral text-ink font-mono text-[8.5px] font-semibold tracking-[0.3px] uppercase border border-ink shadow-solid-sm">
              FULL-STACK
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-bold text-ink tracking-[-2.8px] leading-[0.95] mt-1">
            KitobdagiMen
          </h1>

          {/* Tagline */}
          <p className="font-display text-lg sm:text-[22px] font-medium text-ink-soft tracking-[-0.5px] leading-[1.35] max-w-[700px]">
            A reading community that publishes itself.
          </p>
        </div>

        {/* Right Column: Meta Card (1:1 with PORTFOLIO.pen) */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="w-full bg-white rounded-[18px] border-2 border-ink shadow-[6px_6px_0px_#14110F] px-4 sm:px-5 py-2 flex flex-col">
            {META_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2.5 border-b border-[#E7DFD2] last:border-none gap-3"
              >
                <span className="font-mono text-[8.5px] font-medium tracking-wider text-muted uppercase shrink-0">
                  {item.key}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[11px] sm:text-[12px] font-medium text-ink hover:text-coral transition-colors flex items-center gap-1 text-right"
                  >
                    <span>{item.value}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                ) : (
                  <span className="font-sans text-[11px] sm:text-[12px] font-medium text-ink text-right">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
