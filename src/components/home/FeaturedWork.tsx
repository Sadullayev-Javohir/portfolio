"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedWork() {
  const { dict, projects } = useLanguage();
  const featured = projects.slice(0, 3);

  return (
    <section id="featured-work" className="w-full py-16 lg:py-24 border-b-2 border-ink bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        <ScrollReveal>
          <SectionHeader
            eyebrow={dict.featuredWork.eyebrow}
            title={dict.featuredWork.title}
            description={dict.projectsPage.subtitle}
            action={{
              label: dict.featuredWork.viewAll,
              href: "/projects",
            }}
          />
        </ScrollReveal>

        {/* 3 Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, idx) => (
            <ScrollReveal key={project.id} delayMs={idx * 140}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
