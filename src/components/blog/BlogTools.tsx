"use client";

import React from "react";
import { Search } from "lucide-react";
import { BLOG_CATEGORIES } from "@/data/blogData";

interface BlogToolsProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function BlogTools({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: BlogToolsProps) {
  return (
    <div className="w-full bg-white border-b-2 border-ink py-[18px] px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        {/* Search & Categories Group */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5 flex-1">
          {/* Search Box */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-cream border-2 border-ink rounded-full px-4 py-[9px] sm:py-[11px] flex items-center gap-2.5 shrink-0 transition-all focus-within:ring-2 focus-within:ring-ink">
            <Search className="w-3.5 h-3.5 text-muted shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, tags…"
              className="bg-transparent border-none outline-none font-sans text-[12.5px] text-ink placeholder:text-muted w-full"
            />
            <span className="bg-white border border-ink text-ink font-mono text-[8px] font-medium px-[7px] py-[3px] rounded-md shrink-0 select-none shadow-[1px_1px_0px_#14110F]">
              ⌘ K
            </span>
          </div>

          {/* Categories Pill Scroll / Wrap */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isActive ? "" : cat)}
                  className={`font-mono text-[9px] px-[11px] py-[6px] rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-ink text-cream border-2 border-ink font-semibold shadow-solid-sm"
                      : "bg-white text-ink border border-ink hover:bg-cream"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
