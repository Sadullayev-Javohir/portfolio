"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CustomArticle } from "@/lib/dynamicContent";
import { BlogFeaturedEmpty } from "./BlogFeaturedEmpty";

interface BlogFeaturedArticleProps {
  article?: CustomArticle | null;
}

export function BlogFeaturedArticle({ article }: BlogFeaturedArticleProps) {
  if (!article) {
    return <BlogFeaturedEmpty />;
  }

  const category = article.category || (article.categories && article.categories[0]) || ".NET";
  const tags = article.tags && article.tags.length > 0 ? article.tags : [category, "Engineering"];

  return (
    <section className="w-full bg-cream pt-9 pb-7 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-5">
        {/* Label Row */}
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-medium">
            FEATURED ESSAY
          </span>
          <span className="bg-yellow border-[1.5px] border-ink text-ink font-mono text-[8px] tracking-[0.4px] px-2.5 py-0.5 rounded-full uppercase font-bold shadow-solid-sm">
            LATEST POST
          </span>
        </div>

        {/* Featured Neo-Brutalist Card */}
        <div className="w-full bg-white rounded-[24px] border-2 border-ink shadow-[8px_8px_0px_#14110F] overflow-hidden flex flex-col lg:flex-row group hover:shadow-[10px_10px_0px_#14110F] transition-all">
          {/* Left: Cover Image or Vibrant Graphical Banner */}
          <div className="w-full lg:w-[460px] h-[300px] sm:h-[360px] lg:h-[400px] relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-ink shrink-0 bg-ink">
            {article.coverImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="font-mono text-[9px] uppercase font-bold px-2.5 py-1 rounded-full border border-ink bg-yellow text-ink shadow-sm">
                    {category}
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-lilac relative overflow-hidden p-8 flex flex-col justify-between">
                <div
                  className="w-[200px] h-[200px] rounded-full bg-yellow border-2 border-ink absolute pointer-events-none -right-10 -top-10"
                />
                <div
                  className="w-[120px] h-[120px] rounded-full border-[18px] border-ink absolute pointer-events-none -left-10 bottom-6"
                />
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink font-bold relative z-10 bg-white/80 px-2 py-0.5 rounded w-max border border-ink">
                  {article.chip || category}
                </span>
                <div className="relative z-10">
                  <span className="font-mono text-[11px] text-muted">CHOP ETILGAN</span>
                  <div className="font-display font-bold text-2xl text-ink leading-tight mt-1 line-clamp-2">
                    {article.title}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Article Details & Link */}
          <div className="flex-1 p-6 sm:p-8 lg:p-[36px_40px] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9.5px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-ink bg-mint text-ink">
                  {category}
                </span>
                <span className="font-mono text-[11px] text-muted">
                  {article.publishedDate} · {article.readTime}
                </span>
              </div>

              <Link href={`/blog/${article.slug}`}>
                <h2 className="font-display font-bold text-[24px] sm:text-[30px] lg:text-[34px] text-ink leading-tight group-hover:text-blue transition-colors">
                  {article.title}
                </h2>
              </Link>

              {article.subtitle && (
                <p className="font-sans text-[14px] sm:text-[15px] text-muted leading-relaxed max-w-[760px] line-clamp-3">
                  {article.subtitle}
                </p>
              )}
            </div>

            {/* Bottom: Tags & Read Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-ink/10">
              <div className="flex flex-wrap items-center gap-1.5">
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded bg-cream border border-ink/30 text-ink font-medium"
                  >
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-ink bg-yellow hover:bg-yellow-hover font-mono text-xs font-bold text-ink shadow-solid-sm hover:shadow-solid hover:-translate-y-0.5 transition-all"
              >
                <span>Maqolani o&apos;qish</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
