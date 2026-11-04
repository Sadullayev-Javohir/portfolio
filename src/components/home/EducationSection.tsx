"use client";

"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export function EducationSection() {
  const { dict } = useLanguage();

  const focusTopics = [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Database Systems",
    "Computer Networks",
    "Software Architecture",
  ];

  const certifications = [
    {
      title: "HackerRank REST API (Intermediate)",
      subtitle: "Verified Technical Assessment",
    },
    {
      title: "HackerRank Software Engineer",
      subtitle: "Problem Solving & Engineering Role",
    },
    {
      title: "Foundational C# with Microsoft",
      subtitle: "freeCodeCamp & Microsoft Verified",
    },
    {
      title: "English B1 (Intermediate)",
      subtitle: "CEFR Certified Proficiency",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 border-b-2 border-ink bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        <ScrollReveal>
          <SectionHeader
            eyebrow={dict.educationSection.eyebrow}
            title={dict.educationSection.title}
            description={dict.educationPage.subtitle}
            action={{
              label: dict.educationSection.viewFull,
              href: "/education",
            }}
          />
        </ScrollReveal>

        {/* Education Row: University Card + Certifications Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* University Card */}
          <ScrollReveal delayMs={100} className="lg:col-span-7 flex flex-col">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-yellow border-2 border-ink shadow-[7px_7px_0px_#14110F] hover:shadow-[10px_10px_0px_#14110F] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between gap-8 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
                    {dict.educationSection.uni}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                    {dict.educationSection.degree}
                  </h3>
                  <span className="font-mono text-xs text-ink/80 font-semibold pt-1">
                    {dict.educationSection.years}
                  </span>
                </div>

                {/* GPA Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-cream border-2 border-ink shadow-solid flex flex-col items-center justify-center shrink-0 min-w-[130px] group-hover:rotate-1 group-hover:scale-105 transition-transform duration-300">
                  <span className="font-display text-3xl sm:text-4xl font-black text-ink">
                    4.13
                  </span>
                  <span className="font-mono text-[11px] text-muted font-bold uppercase tracking-wider">
                    4.5 scale
                  </span>
                </div>
              </div>

              <div className="w-full h-0.5 bg-ink" />

              {/* Core Curriculum Chips */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                  Core Technical Focus
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {focusTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-4 py-2 rounded-xl bg-cream border-2 border-ink shadow-solid-sm hover:shadow-solid hover:-translate-y-0.5 hover:bg-white font-mono text-xs sm:text-sm font-bold text-ink transition-all cursor-default"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Certifications Card */}
          <ScrollReveal delayMs={200} className="lg:col-span-5 flex flex-col">
            <div className="h-full p-8 rounded-3xl bg-white border-2 border-ink shadow-[7px_7px_0px_#14110F] hover:shadow-[10px_10px_0px_#14110F] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10.5px] font-bold text-muted tracking-[1.6px] uppercase">
                  {dict.experiencePage.beyondTitle}
                </span>

                {/* Cert Rows */}
                <div className="flex flex-col divide-y divide-rule">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5 group/cert hover:translate-x-1 transition-transform duration-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue/10 border border-blue/30 group-hover/cert:bg-blue group-hover/cert:text-cream flex items-center justify-center shrink-0 transition-colors">
                        <BadgeCheck className="w-5 h-5 text-blue group-hover/cert:text-white transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-ink leading-snug group-hover/cert:text-ink">
                          {cert.title}
                        </span>
                        <span className="font-mono text-[10px] text-muted tracking-tight">
                          {cert.subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs font-mono text-muted">
                <span>Verified credentials</span>
                <span className="w-2.5 h-2.5 rounded-full bg-mint border border-ink animate-pulse" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
