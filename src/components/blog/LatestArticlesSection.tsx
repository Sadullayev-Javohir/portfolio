"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PUBLISHED_ARTICLES } from "@/data/blogData";
import { CustomArticle } from "@/lib/dynamicContent";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

interface LatestArticlesSectionProps {
  customArticles?: CustomArticle[];
  searchQuery?: string;
  categoryFilter?: string;
}

export function LatestArticlesSection({
  customArticles = [],
  searchQuery = "",
  categoryFilter = "",
}: LatestArticlesSectionProps) {
  const { dict } = useLanguage();
  const allArticles = [
    ...customArticles.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      desc: a.subtitle,
      category: a.category || (a.categories && a.categories[0]) || ".NET",
      categories: a.categories || [a.category || ".NET"],
      coverImage: a.coverImage,
      date: a.publishedDate,
      readTime: a.readTime,
    })),
    ...PUBLISHED_ARTICLES.map((p) => ({
      ...p,
      categories: [p.category],
      coverImage: undefined as string | undefined,
    })),
  ];

  // Filtering by search and category
  const filteredArticles = allArticles.filter((art) => {
    const q = searchQuery.toLowerCase().trim();
    const cat = categoryFilter.toLowerCase().trim();

    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.desc.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q);

    const matchesCat =
      !cat ||
      cat === "all" ||
      art.categories.some((c) => c.toLowerCase().includes(cat)) ||
      art.category.toLowerCase().includes(cat);

    return matchesSearch && matchesCat;
  });

  return (
    <section className="w-full bg-cream pb-16 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-3.5">
        <ScrollReveal>
          {/* Head */}
          <div className="flex items-center justify-between pb-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted font-medium">
              {dict.blogPage.allPublishedArticles} ({filteredArticles.length})
            </span>
            <span className="font-mono text-[9px] text-muted font-medium">
              {String(filteredArticles.length).padStart(2, "0")}
            </span>
          </div>
        </ScrollReveal>

        {/* Empty Row / Published Articles List */}
        {filteredArticles.length === 0 ? (
          <ScrollReveal delayMs={100}>
            <div className="border-y-[1.5px] border-ink py-[22px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[14px] text-muted select-none">
                  —
                </span>
                <p className="font-sans text-[14px] text-muted">
                  {allArticles.length === 0
                    ? dict.blogPage.noArticlesYet
                    : dict.blogPage.noMatchingArticles}
                </p>
              </div>
              <span className="font-mono text-[8.5px] tracking-wider uppercase text-muted bg-white border border-ink/30 px-2.5 py-1 rounded shrink-0 font-medium">
                BLOG JOURNAL
              </span>
            </div>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col divide-y-[1.5px] divide-ink border-y-[1.5px] border-ink">
            {filteredArticles.map((article, idx) => (
              <ScrollReveal key={article.id} delayMs={idx * 50}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="py-[22px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white hover:shadow-solid-sm hover:-translate-y-0.5 -mx-4 px-4 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-ink"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {article.coverImage && (
                      <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl border border-ink overflow-hidden bg-ink shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-full border border-ink bg-white">
                          {article.category}
                        </span>
                        <span className="font-mono text-[11px] text-muted">
                          {article.date} · {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-ink group-hover:text-blue transition-colors flex items-center gap-1.5">
                        <span className="line-clamp-2">{article.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </h3>
                      {article.desc && (
                        <p className="font-sans text-sm text-muted line-clamp-2 max-w-3xl">
                          {article.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="px-3.5 py-1.5 rounded-full border border-ink bg-yellow font-mono text-xs font-bold text-ink shadow-solid-sm group-hover:shadow-solid group-hover:-translate-y-0.5 transition-all">
                      {dict.blogPage.readArticleBtn}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
