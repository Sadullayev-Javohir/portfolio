"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export function ExperiencePreview() {
  const { dict, roles } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-24 border-b-2 border-ink bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        <SectionHeader
          eyebrow={dict.experiencePreview.eyebrow}
          title={dict.experiencePreview.title}
          description={dict.experiencePage.subtitle}
          action={{
            label: dict.experiencePreview.viewAll,
            href: "/experience",
          }}
        />

        {/* Experience List */}
        <ScrollReveal>
          <div className="flex flex-col divide-y-2 divide-ink/15 border-2 border-ink rounded-3xl bg-cream shadow-solid overflow-hidden">
            {roles.map((item, idx) => (
              <div
                key={idx}
                className="group p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
              >
                {/* Period & Role */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 lg:w-5/12">
                  <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-ink text-cream w-fit whitespace-nowrap shadow-solid-sm group-hover:bg-yellow group-hover:text-ink transition-colors">
                    {item.period}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-display text-xl font-bold text-ink group-hover:text-blue transition-colors">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-muted font-medium">
                      {item.company}
                    </span>
                  </div>
                </div>

                {/* Note / Description */}
                <div className="lg:w-4/12">
                  <p className="text-sm text-ink-soft leading-relaxed font-medium">
                    {item.summary}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 lg:w-3/12 lg:justify-end">
                  {item.techStack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-ink/20 bg-white text-ink font-medium group-hover:border-ink/40 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
