"use client";

"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const PLANNED_TOPICS = [
  ".NET APIs",
  "Redis caching",
  "SignalR",
  "AI failover",
  "Database indexing",
  "High concurrency",
];

export function JournalTeaser() {
  const { dict } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-24 border-b-2 border-ink bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        <ScrollReveal>
          <SectionHeader
            eyebrow={dict.journalTeaser.eyebrow}
            title={dict.journalTeaser.title}
            description={dict.blogPage.subtitle}
            action={{
              label: dict.journalTeaser.viewAll,
              href: "/blog",
            }}
          />
        </ScrollReveal>

        {/* Playful Empty State Card */}
        <ScrollReveal delayMs={120}>
          <div className="p-8 sm:p-12 rounded-3xl bg-cream border-2 border-ink shadow-[6px_6px_0px_#14110F] hover:shadow-[10px_10px_0px_#14110F] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-8 group">
            {/* Big Geometric Zero Indicator */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-coral border-2 border-ink shadow-solid flex items-center justify-center shrink-0 rotate-[-6deg] group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300">
              <span className="font-display text-4xl sm:text-5xl font-black text-ink">
                0
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {dict.blogPage.plannedTitle}
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                {dict.blogPage.subtitle}
              </p>

              {/* Planned Topic Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {PLANNED_TOPICS.map((topic) => (
                  <span
                    key={topic}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-ink text-xs font-mono font-bold text-ink shadow-solid-sm hover:shadow-solid hover:-translate-y-0.5 hover:bg-yellow transition-all cursor-default"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
