"use client";

import React from "react";
import { PLANNED_ARTICLES, PlannedArticle } from "@/data/blogData";
import { useLanguage } from "@/context/LanguageContext";

interface PlannedArticlesSectionProps {
  filterText?: string;
  categoryFilter?: string;
}

const CHIP_BG_MAP: Record<PlannedArticle["chipColor"], string> = {
  coral: "bg-coral",
  yellow: "bg-yellow",
  mint: "bg-mint",
  lilac: "bg-lilac",
};

export function PlannedArticlesSection({
  filterText = "",
  categoryFilter = "",
}: PlannedArticlesSectionProps) {
  const { dict } = useLanguage();
  // If search filter is active, filter articles; otherwise display all planned cards as in pen design
  const filteredArticles = PLANNED_ARTICLES.filter((item) => {
    if (!filterText) return true;
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.desc.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <section className="w-full bg-cream pt-9 pb-16 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Head */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-medium">
              {dict.blogPage.onTheDesk}
            </span>
            <h2 className="font-display font-bold text-[26px] sm:text-[30px] text-ink">
              {dict.blogPage.plannedTitle}
            </h2>
          </div>
          <span className="font-mono text-[8.5px] text-muted self-start sm:self-end">
            {dict.blogPage.plannedSubtitle}
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((card) => {
              const chipBg = CHIP_BG_MAP[card.chipColor] || "bg-coral";
              return (
                <div
                  key={card.index}
                  className="bg-white border-2 border-ink rounded-[18px] p-5 flex flex-col justify-between gap-3 shadow-none hover:-translate-y-1 hover:shadow-solid transition-all duration-200"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`${chipBg} border-[1.5px] border-ink text-ink font-mono text-[8px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wider`}
                    >
                      PLANNED
                    </span>
                    <span className="font-mono text-[9px] text-muted font-medium">
                      {card.index}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="flex flex-col gap-2 my-1">
                    <h3 className="font-display font-semibold text-[18px] text-ink leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-sans text-[12px] text-muted leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Category */}
                  <div className="pt-2 border-t border-ink/10 mt-auto">
                    <span className="font-mono text-[8px] text-muted tracking-wider uppercase font-medium">
                      {card.category}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center text-muted font-mono text-sm bg-white border-2 border-ink rounded-[18px]">
              No planned articles matching current filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
