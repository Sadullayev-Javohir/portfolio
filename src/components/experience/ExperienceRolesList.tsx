"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ExperienceRolesList() {
  const { dict, roles } = useLanguage();

  return (
    <section className="w-full px-6 sm:px-10 lg:px-14 pb-16">
      <div className="max-w-[1440px] mx-auto flex flex-col">
        {roles.map((role) => (
          <article
            key={role.id}
            id={role.id}
            className="border-t-2 border-ink py-[34px] flex flex-col md:flex-row gap-8 lg:gap-10 transition-colors"
          >
            {/* Left: Role Meta (w: 250px) */}
            <div className="w-full md:w-[250px] shrink-0 flex flex-col gap-2.5">
              {/* Period Row with Marker */}
              <div className="flex items-center gap-2">
                <span
                  className="w-[11px] h-[11px] border border-ink shrink-0 inline-block"
                  style={{ backgroundColor: role.markerHex }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[9.5px] font-medium text-ink tracking-wider uppercase">
                  {role.period}
                </span>
              </div>

              {/* Current Chip */}
              {role.isCurrent && (
                <div className="w-fit">
                  <span className="bg-mint border border-ink rounded-full px-2 py-0.5 inline-block font-mono text-[8px] font-bold text-ink uppercase tracking-wider">
                    {dict.experiencePreview.currentBadge}
                  </span>
                </div>
              )}

              {/* Company */}
              <div className="flex items-center gap-1.5">
                <h2 className="font-display text-[19px] font-semibold text-ink leading-tight">
                  {role.company}
                </h2>
              </div>

              {/* Place / Context */}
              <div className="font-sans text-[11px] text-muted leading-relaxed">
                {role.placeUrl ? (
                  <a
                    href={role.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink underline decoration-ink/30 underline-offset-2 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{role.place}</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                  </a>
                ) : (
                  <span>{role.place}</span>
                )}
              </div>

              {/* Quick Case Study Link */}
              {role.caseStudyUrl && (
                <div className="pt-1">
                  <Link
                    href={role.caseStudyUrl}
                    className="inline-flex items-center gap-1 text-[11.5px] font-mono font-medium text-ink hover:text-blue transition-colors group"
                  >
                    <span>{dict.featuredWork.viewCaseStudy}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Right: Role Main */}
            <div className="flex-1 flex flex-col gap-3.5">
              {/* Role Title */}
              <h3 className="font-display text-2xl lg:text-[30px] font-bold text-ink leading-tight tracking-[-0.01em]">
                {role.role}
              </h3>

              {/* Summary */}
              <p className="font-sans text-[14.5px] text-ink-soft leading-relaxed max-w-[880px]">
                {role.summary}
              </p>

              {/* Bullets */}
              <div className="flex flex-col gap-2.5 pt-1">
                {role.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5">
                    <span
                      className="w-[7px] h-[7px] shrink-0 mt-2 inline-block"
                      style={{ backgroundColor: role.markerHex }}
                      aria-hidden="true"
                    />
                    <p className="font-sans text-[13.5px] text-ink-soft leading-relaxed max-w-[880px]">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {role.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-ink/20 bg-cream text-ink font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
