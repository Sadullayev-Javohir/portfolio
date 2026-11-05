"use client";

import React, { useState } from "react";
import { ProjectRowItem, ProjectItemData } from "./ProjectRowItem";
import { CustomProject } from "@/lib/dynamicContent";
import { useLanguage } from "@/context/LanguageContext";

const ALL_PROJECTS: ProjectItemData[] = [
  {
    id: "englishai",
    num: "01",
    name: "ENGLISHAI",
    year: "2026",
    image: "/project-englishai.jpg",
    chip: "BACKEND · AI",
    categories: ["Backend", "AI engineering"],
    period: "Backend Developer · Jul 2026 — present",
    title: "EnglishAI",
    description:
      "Adaptive English learning platform serving 700+ active learners with automated testing and pronunciation scoring.",
    highlights: [
      "Reduced Azure Speech synthesis costs by 35% via MD5-hashed Redis audio caching (<120ms latency).",
      "Fixed false anti-cheat triggers and added session recovery, increasing onboarding completion by 78%.",
    ],
    bulletColor: "bg-blue",
    tags: ["ASP.NET Core", "PostgreSQL", "Redis", "Azure Speech"],
    caseStudyHref: "/projects/englishai",
    externalLabel: "Private product",
  },
  {
    id: "kitobdagimen",
    num: "02",
    name: "KITOBDAGIMEN",
    year: "2026",
    image: "/project-kitobdagimen.jpg",
    chip: "FULL-STACK",
    categories: ["Full-stack", "Backend", "Real-time"],
    period: "Full-Stack Developer · Jun — Jul 2026",
    title: "KitobdagiMen",
    description:
      "Social reading platform with algorithmic feeds, SignalR live chat, and Telegram Mini App integration.",
    highlights: [
      "60/40 followed-vs-new discovery feed with cursor pagination (<45ms response time).",
      "4-route fallback proxy with 24h Redis cache holding 99.8% platform availability.",
    ],
    bulletColor: "bg-coral",
    tags: [".NET 8", "SignalR", "PostgreSQL", "Telegram Mini App"],
    caseStudyHref: "/projects/kitobdagimen",
    externalLabel: "kitobdagimen.uz",
    externalUrl: "https://kitobdagimen.uz",
  },
  {
    id: "ziyoai",
    num: "03",
    name: "ZIYOAI",
    year: "2026",
    image: "/project-ziyoai.jpg",
    chip: "AI ENGINEERING",
    categories: ["AI engineering", "Backend"],
    period: "Backend & AI Engineer · Aug — Sep 2026",
    title: "ZiyoAI",
    description:
      "Autonomous multimodal Telegram assistant with voice interaction, OCR vision, and educational quiz generation.",
    highlights: [
      "Dual-key failover gateway with tiered 30s/65s timeouts maintaining 99.9% uptime.",
      "Real-time rate limiting, deduplication, and automated channel content enrichment.",
    ],
    bulletColor: "bg-mint",
    tags: [".NET 8", "EF Core", "Docker", "STT / TTS / OCR"],
    caseStudyHref: "/projects/ziyoai",
    externalLabel: "@ZiyoAIBot",
    externalUrl: "https://t.me/ZiyoAIBot",
  },
  {
    id: "typingwar",
    num: "04",
    name: "TYPINGWAR",
    year: "2026",
    image: "/project-typingwar.jpg",
    chip: "REAL-TIME",
    categories: ["Real-time", "Full-stack", "Backend"],
    period: "Full-Stack Developer · Jun — Jul 2026",
    title: "TypingWar",
    description:
      "Real-time competitive typing platform with 1v1 live duels, battle rooms, and automated tournament matchmaking.",
    highlights: [
      "Synchronised keystrokes and live progress under 30ms via SignalR Core and Redis Pub/Sub.",
      "Server-side cadence validation preventing cheating, verified by 105+ xUnit tests.",
    ],
    bulletColor: "bg-ink",
    tags: [".NET 8", "SignalR Core", "Redis Pub/Sub", "xUnit"],
    caseStudyHref: "/projects/typingwar",
    externalLabel: "github.com/Sadullayev-Javohir/typingwar",
    externalUrl: "https://github.com/Sadullayev-Javohir/typingwar",
  },
  {
    id: "meningvaqtim",
    num: "05",
    name: "MENINGVAQTIM",
    year: "ACTIVE",
    image: "/project-meningvaqtim.jpg",
    chip: "PRODUCTIVITY",
    categories: ["Productivity", "Backend"],
    period: "Backend Developer · Ongoing",
    title: "MeningVaqtim",
    description:
      "Deep-work and task tracker with timezone-aware productivity analytics and automated session management.",
    highlights: [
      "Automated timer completion and distraction logging with Hangfire background jobs (100% data integrity).",
      "Timezone-aware analytics comparing planned tasks against logged deep-work sessions.",
    ],
    bulletColor: "bg-yellow",
    tags: [".NET 8", "PostgreSQL", "Hangfire", "BackgroundService"],
    caseStudyHref: "/projects/meningvaqtim",
    externalLabel: "meningvaqtim.uz",
    externalUrl: "https://meningvaqtim.uz",
  },
];

const FILTER_CATEGORIES = [
  "All",
  "Backend",
  "AI engineering",
  "Real-time",
  "Full-stack",
  "Productivity",
  "Cloud & DevOps",
];

interface ProjectsFeedProps {
  initialCustomProjects?: CustomProject[];
}

export function ProjectsFeed({ initialCustomProjects = [] }: ProjectsFeedProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { dict } = useLanguage();

  const localizedProjects: ProjectItemData[] = ALL_PROJECTS.map((p) => {
    const t = dict.projects[p.id];
    if (!t) return p;
    return {
      ...p,
      title: t.title || p.title,
      description: t.description || p.description,
    };
  });

  const customItems: ProjectItemData[] = initialCustomProjects.map((p, idx) => ({
    id: p.id,
    num: String(ALL_PROJECTS.length + idx + 1).padStart(2, "0"),
    name: p.name,
    year: p.year,
    image: "/project-kitobdagimen.jpg",
    chip: p.chip,
    categories: p.categories,
    period: p.period,
    title: p.title,
    description: p.description,
    highlights: p.highlights,
    bulletColor: p.bulletColor,
    tags: p.tags,
    caseStudyHref: p.caseStudyHref,
    externalLabel: p.externalLabel,
    externalUrl: p.externalUrl,
  }));

  const allCombinedProjects = [...localizedProjects, ...customItems];
  const totalCount = allCombinedProjects.length;

  const dynamicCategories = Array.from(
    new Set([
      "All",
      "Backend",
      "AI engineering",
      "Real-time",
      "Full-stack",
      "Productivity",
      ...allCombinedProjects.flatMap((p) => p.categories || []),
    ])
  );

  const filteredProjects =
    activeCategory === "All"
      ? allCombinedProjects
      : allCombinedProjects.filter((p) => p.categories.includes(activeCategory));

  return (
    <div className="w-full flex flex-col">
      {/* Filters Bar */}
      <section className="w-full bg-white border-b-2 border-ink py-4 sm:py-5 sticky top-[76px] z-30 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {dynamicCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-ink text-cream border-2 border-ink shadow-solid-sm"
                      : "bg-white text-ink border border-ink/40 hover:bg-cream/80"
                  }`}
                >
                  {cat === "All" ? `${dict.projectsPage.allProjectsLabel} · ${totalCount}` : cat}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <span className="font-mono text-xs font-semibold text-muted tracking-wider uppercase shrink-0">
            {dict.projectsPage.showingCount
              .replace("{count}", String(filteredProjects.length))
              .replace("{total}", String(totalCount))}
          </span>
        </div>
      </section>

      {/* Projects List Stack */}
      <section className="w-full bg-cream py-6 sm:py-10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col border-b-[1.5px] border-ink">
          {filteredProjects.map((project) => (
            <ProjectRowItem key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
