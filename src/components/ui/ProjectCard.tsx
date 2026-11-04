"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { dict } = useLanguage();
  return (
    <div className="group flex flex-col bg-cream rounded-3xl border-2 border-ink shadow-[6px_6px_0px_#14110F] hover:shadow-[10px_10px_0px_#14110F] transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:-translate-x-0.5">
      {/* Thumbnail with Neo-Brutalist Illustration */}
      <div className="relative h-56 w-full border-b-2 border-ink overflow-hidden bg-cream">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        ) : (
          <div
            className="w-full h-full relative"
            style={{ backgroundColor: project.color }}
          >
            {/* Geometric Background Shapes */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/20 pointer-events-none" />
            <div className="absolute bottom-4 -left-8 w-32 h-32 rounded-full border-[20px] border-ink/20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/30 rotate-12 pointer-events-none" />
          </div>
        )}

        {/* Top bar in thumb */}
        <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-ink text-cream border border-ink shadow-solid-sm">
            {project.index}
          </span>
          <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/95 border border-ink text-ink shadow-solid-sm">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5 bg-white">
        <div className="flex flex-col gap-3">
          {/* Title and Category */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-widest text-muted font-bold uppercase">
              {project.category}
            </span>
            <h3 className="font-display text-2xl font-extrabold text-ink tracking-tight group-hover:text-blue transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-ink-soft text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-ink/30 bg-[#F5F6F8] text-ink font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Link */}
        <div className="pt-3 border-t border-rule flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink hover:text-blue transition-colors group/link"
          >
            <span>{dict.featuredWork.viewCaseStudy}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          <span className="w-2.5 h-2.5 rounded-full bg-mint border border-ink" />
        </div>
      </div>
    </div>
  );
}
