"use client";

import React, { useState } from "react";
import { SKILL_GROUPS } from "@/data/skillsData";
import { Search } from "lucide-react";
import { getTechIcon } from "@/components/ui/icons/TechIcons";
import { useLanguage } from "@/context/LanguageContext";

export function StackTable() {
  const { dict } = useLanguage();
  const s = dict.skillsPage;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredGroups = SKILL_GROUPS.map((group) => {
    if (activeCategory !== "all" && group.id !== activeCategory) {
      return null;
    }

    const filteredRows = group.rows.filter((row) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        row.tech.toLowerCase().includes(q) ||
        row.category.toLowerCase().includes(q) ||
        row.used.toLowerCase().includes(q)
      );
    });

    if (filteredRows.length === 0) return null;

    return {
      ...group,
      rows: filteredRows,
    };
  }).filter(Boolean) as typeof SKILL_GROUPS;

  const totalVisibleSkills = filteredGroups.reduce(
    (acc, group) => acc + group.rows.length,
    0
  );

  return (
    <section className="w-full bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-6 pb-16">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rule">
          {/* Quick filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 rounded-full font-mono text-[11px] font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-ink text-cream border-2 border-ink shadow-solid-sm"
                  : "bg-white text-ink border-2 border-ink hover:bg-yellow/20"
              }`}
            >
              {s.allStack} ({SKILL_GROUPS.reduce((acc, g) => acc + g.rows.length, 0)})
            </button>
            {SKILL_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveCategory(g.id)}
                className={`px-3 py-1 rounded-full font-mono text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategory === g.id
                    ? "bg-ink text-cream border-2 border-ink shadow-solid-sm"
                    : "bg-white text-ink border-2 border-ink hover:bg-yellow/20"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: g.color }}
                />
                <span>{g.name}</span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={s.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 rounded-full border-2 border-ink bg-white font-mono text-xs text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-yellow shadow-solid-sm"
            />
          </div>
        </div>

        {/* Table Head (Desktop) */}
        <div className="hidden lg:grid grid-cols-[330px_330px_1fr] gap-4 pb-2.5 border-b-2 border-ink font-mono text-[8.5px] uppercase tracking-[1.4px] text-muted font-semibold">
          <div>{s.colTech}</div>
          <div>{s.colCategory}</div>
          <div>{s.colUsed}</div>
        </div>

        {/* Table Body Groups */}
        <div className="flex flex-col gap-6">
          {filteredGroups.length === 0 ? (
            <div className="py-12 text-center font-mono text-sm text-muted">
              {s.noMatchingTech} &quot;{searchQuery}&quot;.
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.id} className="flex flex-col">
                {/* Group Heading */}
                <div className="flex items-center gap-2.5 pt-5 pb-2 border-b border-ink/40">
                  <div
                    className="w-3 h-3 border border-ink shrink-0"
                    style={{ backgroundColor: group.color }}
                  />
                  <h2 className="font-display text-base font-semibold text-ink">
                    {group.name}
                  </h2>
                  <span className="font-mono text-[9px] text-muted tracking-wider">
                    {group.count}
                  </span>
                </div>

                {/* Group Rows */}
                <div className="flex flex-col divide-y divide-[#E7DFD2]">
                  {group.rows.map((row) => (
                    <div
                      key={row.tech}
                      className="py-2.5 lg:py-2.5 flex flex-col lg:grid lg:grid-cols-[330px_330px_1fr] gap-1.5 lg:gap-4 items-start lg:items-center hover:bg-black/[0.02] transition-colors group"
                    >
                      {/* Tech Name */}
                      <div className="font-display text-[15px] font-medium text-ink group-hover:text-ink/90 flex items-center gap-2.5">
                        {getTechIcon(row.tech, "w-4 h-4 shrink-0")}
                        <span>{row.tech}</span>
                      </div>

                      {/* Category */}
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: group.color }}
                        />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                          {row.category}
                        </span>
                      </div>

                      {/* Used in */}
                      <div className="font-sans text-[12.5px] text-[#3B3530] leading-normal">
                        {row.used}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
