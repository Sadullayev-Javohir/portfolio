import React from "react";
import { Github } from "lucide-react";

export function ProjectsCta() {
  return (
    <section className="w-full bg-ink text-cream border-y-2 border-ink py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Left: Eyebrow + Title */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-mono text-xs font-bold tracking-[1.6px] text-coral uppercase">
            MORE IN THE LAB
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold text-cream tracking-tight">
            The next build is usually a weekend away.
          </h2>
        </div>

        {/* Right: GitHub CTA Button */}
        <a
          href="https://github.com/Sadullayev-Javohir"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow border-2 border-ink shadow-solid hover:shadow-solid-lg text-ink font-bold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 shrink-0 self-start md:self-auto"
        >
          <span>Follow on GitHub</span>
          <Github className="w-4 h-4 text-ink" />
        </a>
      </div>
    </section>
  );
}
