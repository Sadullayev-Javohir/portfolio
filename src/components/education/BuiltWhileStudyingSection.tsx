"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function BuiltWhileStudyingSection() {
  const { dict, projects } = useLanguage();

  return (
    <section className="w-full pb-16 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1328px] mx-auto flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-medium">
              {dict.educationPage.eyebrow}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-bold text-ink tracking-[-1.3px]">
              {dict.educationPage.builtWhileStudying}
            </h2>
          </div>
          <span className="font-mono text-[9px] sm:text-[9.5px] text-muted font-normal self-start sm:self-end">
            05 {dict.projectsPage.filterAll.toLowerCase()}
          </span>
        </div>

        {/* Project Rows Table */}
        <div className="flex flex-col border-b-[1.5px] border-ink">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group flex items-center justify-between gap-4 sm:gap-6 py-4 border-t-[1.5px] border-ink hover:bg-black/[0.02] transition-colors px-1 sm:px-2 rounded-sm"
            >
              {/* Year */}
              <span className="font-mono text-[9.5px] sm:text-[10px] text-muted w-12 sm:w-16 shrink-0">
                {project.year}
              </span>

              {/* Title */}
              <span className="font-display text-base sm:text-[18px] font-semibold text-ink tracking-[-0.3px] w-28 sm:w-40 shrink-0 group-hover:text-coral transition-colors">
                {project.title}
              </span>

              {/* Description */}
              <span className="font-sans text-xs sm:text-[13px] text-muted flex-1 leading-normal line-clamp-2 sm:line-clamp-none">
                {project.description}
              </span>

              {/* Tag Pill */}
              <span className="font-mono text-[8.5px] text-ink tracking-[0.7px] uppercase shrink-0 hidden md:inline-block">
                {project.category}
              </span>

              {/* Arrow */}
              <ArrowUpRight className="w-[15px] h-[15px] text-ink shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
