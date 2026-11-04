"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export function InterestsSection() {
  const { dict } = useLanguage();

  const domains = [
    {
      number: "01",
      title: dict.about.interests.chess,
      description: dict.about.interests.chessDesc,
      tags: "STRATEGY · LOGIC · PATTERNS",
    },
    {
      number: "02",
      title: dict.about.interests.reading,
      description: dict.about.interests.readingDesc,
      tags: "ARCHITECTURE · DISTRIBUTED · BOOKS",
    },
    {
      number: "03",
      title: dict.about.interests.openSource,
      description: dict.about.interests.openSourceDesc,
      tags: "COMMUNITY · MENTORING · TOOLING",
    },
  ];

  return (
    <section className="w-full bg-cream border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        <SectionHeader
          eyebrow={dict.about.interests.eyebrow}
          title={dict.about.interests.title}
          description={dict.about.bio.p1}
        />

        {/* Domain Cards */}
        <div className="flex flex-col gap-5">
          {domains.map((item) => (
            <div
              key={item.number}
              className="group p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid hover:shadow-solid-lg transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-6 md:w-4/12">
                <span className="font-mono text-sm font-bold px-3 py-1.5 rounded-full bg-cream border border-ink text-muted">
                  {item.number}
                </span>
                <h3 className="font-display text-2xl font-bold text-ink tracking-tight">
                  {item.title}
                </h3>
              </div>

              <div className="md:w-5/12">
                <p className="text-sm sm:text-[15px] text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 md:w-3/12 pt-2 md:pt-0 border-t md:border-t-0 border-rule">
                <span className="font-mono text-xs font-bold text-ink">
                  {item.tags}
                </span>
                <div className="w-8 h-8 rounded-full border border-ink flex items-center justify-center bg-cream group-hover:bg-yellow group-hover:rotate-45 transition-all">
                  <ArrowUpRight className="w-4 h-4 text-ink" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
