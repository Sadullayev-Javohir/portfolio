"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PUBLISHED_ARTICLES, BLOG_STATS } from "@/data/blogData";
import { CustomArticle } from "@/lib/dynamicContent";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface LatestArticlesSectionProps {
  customArticles?: CustomArticle[];
}

export function LatestArticlesSection({ customArticles = [] }: LatestArticlesSectionProps) {
  const allArticles = [
    ...customArticles.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      desc: a.subtitle,
      category: a.category,
      date: a.publishedDate,
      readTime: a.readTime,
    })),
    ...PUBLISHED_ARTICLES,
  ];

  return (
    <section className="w-full bg-cream pb-16 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-3.5">
        <ScrollReveal>
          {/* Head */}
          <div className="flex items-center justify-between pb-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted font-medium">
              LATEST ARTICLES
            </span>
            <span className="font-mono text-[9px] text-muted font-medium">
              {String(allArticles.length).padStart(2, "0")}
            </span>
          </div>
        </ScrollReveal>

        {/* Empty Row / Published Articles List */}
        {allArticles.length === 0 ? (
          <ScrollReveal delayMs={100}>
            <div className="border-y-[1.5px] border-ink py-[22px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[14px] text-muted select-none">
                  —
                </span>
                <p className="font-sans text-[14px] text-muted">
                  No published articles yet. The first one will appear here the day
                  it&apos;s ready.
                </p>
              </div>
              <span className="font-mono text-[8.5px] tracking-wider uppercase text-muted bg-white border border-ink/30 px-2.5 py-1 rounded shrink-0 font-medium">
                COME BACK SOON
              </span>
            </div>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col divide-y-[1.5px] divide-ink border-y-[1.5px] border-ink">
            {allArticles.map((article, idx) => (
              <ScrollReveal key={article.id} delayMs={idx * 60}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="py-[22px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white hover:shadow-solid-sm hover:-translate-y-0.5 -mx-4 px-4 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-ink"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-full border border-ink bg-white">
                        {article.category}
                      </span>
                      <span className="font-mono text-[11px] text-muted">
                        {article.date} · {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-ink group-hover:text-blue transition-colors flex items-center gap-1.5">
                      <span>{article.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    {article.desc && (
                      <p className="font-sans text-sm text-muted line-clamp-2 max-w-3xl">
                        {article.desc}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="px-3.5 py-1.5 rounded-full border border-ink bg-yellow font-mono text-xs font-bold text-ink shadow-solid-sm group-hover:shadow-solid group-hover:-translate-y-0.5 transition-all">
                      O&apos;qish ↗
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
