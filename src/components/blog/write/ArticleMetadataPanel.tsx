"use client";

import React, { useState } from "react";
import { ChevronDown, Link as LinkIcon, Plus, X } from "lucide-react";

interface ArticleMetadataPanelProps {
  title: string;
  onTitleChange: (val: string) => void;
  subtitle: string;
  onSubtitleChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  slug: string;
  onSlugChange: (val: string) => void;
  wordCount: number;
}

const CATEGORY_OPTIONS = [
  "Backend Architecture (.NET 8)",
  "AI Engineering & LLM Gateways",
  "Real-Time Systems & SignalR",
  "High-Performance Caching & Redis",
  "PostgreSQL & Database Tuning",
];

export function ArticleMetadataPanel({
  title,
  onTitleChange,
  subtitle,
  onSubtitleChange,
  category,
  onCategoryChange,
  tags,
  onAddTag,
  onRemoveTag,
  slug,
  onSlugChange,
  wordCount,
}: ArticleMetadataPanelProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);

  // Approximate read time based on 220 words per minute
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 220));

  const handleAddTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTag = newTagInput.trim().replace(/^#/, "");
    if (cleanTag && !tags.includes(`#${cleanTag}`)) {
      onAddTag(`#${cleanTag}`);
      setNewTagInput("");
      setIsAddingTag(false);
    }
  };

  return (
    <section className="w-full border-b-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 pb-7 flex flex-col gap-4">
        {/* Head: Title + Chip + Word Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl sm:text-[22px] font-bold text-ink tracking-tight">
              Article Details & Parameters
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow border-[1.5px] border-ink font-mono text-[7.5px] font-semibold text-ink tracking-wider uppercase">
              POST CONFIG
            </span>
          </div>
          <div className="font-mono text-[8.5px] text-muted tracking-tight">
            {wordCount.toLocaleString()} words · ~{readTimeMin} min read · C# .NET 8
          </div>
        </div>

        {/* Title Field */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-medium">
            ARTICLE HEADLINE (H1)
          </label>
          <div className="w-full bg-white rounded-xl border-2 border-ink px-4 py-3 flex items-center justify-between gap-3 shadow-xs">
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Article Headline..."
              className="w-full font-display text-lg sm:text-[20px] font-bold text-ink tracking-tight bg-transparent focus:outline-none placeholder:text-muted/40"
            />
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-cream border-[1.5px] border-ink font-mono text-[8px] font-bold text-ink">
              H1
            </span>
          </div>
        </div>

        {/* Subtitle Field */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-medium">
            SUMMARY / META DESCRIPTION
          </label>
          <div className="w-full bg-white rounded-[10px] border-2 border-[#E7DFD2] focus-within:border-ink px-3.5 py-2.5 transition-colors">
            <input
              type="text"
              value={subtitle}
              onChange={(e) => onSubtitleChange(e.target.value)}
              placeholder="Brief architectural summary..."
              className="w-full text-xs sm:text-[13px] text-[#3B3530] font-sans bg-transparent focus:outline-none placeholder:text-muted/40"
            />
          </div>
        </div>

        {/* Meta Row: 3 Columns (Category, Tags, Canonical Slug) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
          {/* Primary Category Column */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="font-mono text-[8px] uppercase tracking-wider text-muted font-medium">
              PRIMARY CATEGORY
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white rounded-[10px] border-2 border-ink px-3.5 py-2.5 flex items-center justify-between gap-2 text-left cursor-pointer hover:bg-cream/40 transition-colors"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2 h-2 rounded-[2px] bg-coral shrink-0" />
                <span className="font-sans text-[12.5px] font-semibold text-ink truncate">
                  {category}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted transition-transform shrink-0 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-[100%] mt-1 left-0 right-0 z-30 bg-white border-2 border-ink rounded-xl shadow-solid p-1.5 flex flex-col gap-1">
                {CATEGORY_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onCategoryChange(opt);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-left text-[12px] font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                      category === opt
                        ? "bg-yellow font-semibold text-ink"
                        : "hover:bg-cream text-ink"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                    <span className="truncate">{opt}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tags Column */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] uppercase tracking-wider text-muted font-medium">
              TAGS (SELECT OR TYPE)
            </label>
            <div className="w-full min-h-[42px] bg-white rounded-[10px] border-2 border-[#E7DFD2] px-2.5 py-1.5 flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream border-[1.5px] border-ink font-mono text-[8px] font-semibold text-ink group"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveTag(tag)}
                    aria-label={`Remove ${tag}`}
                    className="hover:text-coral transition-colors cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}

              {isAddingTag ? (
                <form onSubmit={handleAddTagSubmit} className="inline-flex items-center">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onBlur={() => {
                      if (!newTagInput.trim()) setIsAddingTag(false);
                    }}
                    autoFocus
                    placeholder="tag-name..."
                    className="w-20 px-2 py-0.5 font-mono text-[8px] border border-ink rounded-full focus:outline-none"
                  />
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingTag(true)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-ink bg-transparent hover:bg-cream font-mono text-[7.5px] font-semibold text-ink transition-colors cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5" />
                  <span>Tag</span>
                </button>
              )}
            </div>
          </div>

          {/* Canonical Slug URL Column */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[8px] uppercase tracking-wider text-muted font-medium">
              CANONICAL SLUG URL
            </label>
            <div className="w-full bg-white rounded-[10px] border-2 border-[#E7DFD2] focus-within:border-ink px-3.5 py-2.5 flex items-center justify-between gap-2 transition-colors">
              <input
                type="text"
                value={slug}
                onChange={(e) => onSlugChange(e.target.value)}
                placeholder="javohir.engineer/blog/slug"
                className="w-full font-mono text-[10px] text-ink bg-transparent focus:outline-none"
              />
              <LinkIcon className="w-3.5 h-3.5 text-muted shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
