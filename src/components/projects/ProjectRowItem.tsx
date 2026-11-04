"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export interface ProjectItemData {
  id: string;
  num: string;
  name: string;
  year: string;
  image: string;
  chip: string;
  categories: string[];
  period: string;
  title: string;
  description: string;
  highlights: string[];
  bulletColor: string;
  tags: string[];
  caseStudyHref: string;
  externalLabel?: string;
  externalUrl?: string;
}

export function ProjectRowItem({ project }: { project: ProjectItemData }) {
  return (
    <ScrollReveal>
      <article
        id={project.id}
        className="border-t-[1.5px] border-ink py-10 lg:py-12 flex flex-col lg:flex-row items-center gap-9 lg:gap-12 group/row"
      >
        {/* Left: Art Card */}
        <div className="w-full lg:w-[420px] h-[260px] sm:h-[300px] relative rounded-[24px] border-2 border-ink shadow-[7px_7px_0px_#14110F] hover:shadow-[10px_10px_0px_#14110F] hover:-translate-y-1 overflow-hidden shrink-0 group bg-cream transition-all duration-300">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />

          {/* Floating Number Badge */}
          <span className="absolute left-4 top-4 font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-ink text-cream border border-ink shadow-solid-sm uppercase">
            {project.num}
          </span>

          {/* Floating Year Badge */}
          <span className="absolute right-4 top-4 font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/95 border border-ink text-ink shadow-solid-sm">
            {project.year}
          </span>
        </div>

        {/* Right: Project Copy */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Meta Row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-white border border-ink font-mono text-[11px] font-bold text-ink shadow-solid-sm">
              {project.chip}
            </span>
            <span className="font-mono text-xs text-muted">
              {project.period}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight group-hover/row:text-ink/90 transition-colors">
            {project.title}
          </h2>

          {/* Description */}
          <p className="font-body text-sm sm:text-[15px] text-muted leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-2.5 pt-1">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className={`w-1.5 h-1.5 ${project.bulletColor} rotate-45 shrink-0 mt-2 border border-ink/40`}
                />
                <p className="font-body text-sm text-ink-soft leading-relaxed">
                  {highlight}
                </p>
              </div>
            ))}
          </div>

          {/* Card Foot: Tags + Actions */}
          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ink/10">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white border border-ink/40 font-mono text-[11px] text-ink hover:border-ink hover:shadow-solid-sm hover:-translate-y-0.5 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={project.caseStudyHref}
                className="group/btn inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-yellow border-2 border-ink shadow-solid-sm hover:shadow-solid text-xs font-bold text-ink transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Case study</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>

              {project.externalUrl ? (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted hover:text-ink underline decoration-ink/30 transition-colors"
                >
                  {project.externalLabel}
                </a>
              ) : (
                <span className="font-mono text-xs text-muted">
                  {project.externalLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
