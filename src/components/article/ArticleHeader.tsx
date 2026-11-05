"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link2, Twitter, Linkedin, Check } from "lucide-react";
import { ArticleData } from "@/data/articles";

interface ArticleHeaderProps {
  article: ArticleData;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ views: number; likes: number; comments: number } | null>(null);

  React.useEffect(() => {
    if (!article.slug) return;
    fetch(`/api/blog/${encodeURIComponent(article.slug)}/engagement`)
      .then((res) => res.json())
      .then((d) => {
        if (d.ok && d.data) {
          setStats((prev) => ({
            views: d.data.views ?? 0,
            likes: d.data.likes ?? 0,
            comments: prev?.comments ?? 0,
          }));
        }
      })
      .catch(() => {});

    fetch(`/api/blog/${encodeURIComponent(article.slug)}/comments`)
      .then((res) => res.json())
      .then((d) => {
        if (d.ok) {
          setStats((prev) => ({
            views: prev?.views ?? 0,
            likes: prev?.likes ?? 0,
            comments: d.totalCount ?? 0,
          }));
        }
      })
      .catch(() => {});
  }, [article.slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 pt-11 pb-9 max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider">
          <Link href="/blog" className="text-muted hover:text-ink transition-colors">
            {article.breadcrumb.parent}
          </Link>
          <span className="text-muted">/</span>
          <span className="text-ink font-semibold">{article.breadcrumb.current}</span>
        </nav>

        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {article.categories.map((cat, idx) => {
            const isBlue = idx === 0;
            return (
              <span
                key={cat}
                className={`inline-flex items-center px-2.5 py-1 rounded-full border-[1.5px] border-ink font-mono text-[8.5px] tracking-wider uppercase font-semibold ${
                  isBlue ? "bg-blue text-ink" : "bg-white text-ink"
                }`}
              >
                {cat}
              </span>
            );
          })}
        </div>

        {/* Title */}
        <h1 className="max-w-[900px] font-display text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-ink leading-[1.08] tracking-[-1.2px]">
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="max-w-[760px] font-display text-[17px] sm:text-[20px] text-muted leading-relaxed font-normal">
          {article.subtitle}
        </p>

        {/* Author Row */}
        <div className="pt-2.5 flex items-center justify-between flex-wrap gap-4 border-t border-rule/50 mt-2">
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 rounded-full border-[1.5px] border-ink overflow-hidden bg-yellow shrink-0">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[12.5px] font-semibold text-ink leading-tight">
                {article.author.name}
              </span>
              <span className="font-mono text-[8px] sm:text-[8.5px] text-muted tracking-wider uppercase mt-0.5">
                {article.publishedDate} · {article.readTime} · 👁 {stats ? `${stats.views} VIEWS` : article.views} · ♥ {stats ? `${stats.likes} LIKES` : `${article.likesCount} LIKES`} · 💬 {stats ? `${stats.comments} COMMENTS` : `${article.commentsCount} COMMENTS`}
              </span>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy article link"
              className="w-8 h-8 rounded-full border-[1.5px] border-ink bg-white flex items-center justify-center text-ink hover:bg-cream transition-colors relative"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-mint stroke-[2.5]" />
              ) : (
                <Link2 className="w-3.5 h-3.5 text-ink" />
              )}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Twitter"
              className="w-8 h-8 rounded-full border-[1.5px] border-ink bg-white flex items-center justify-center text-ink hover:bg-cream transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-ink" />
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/"
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              className="w-8 h-8 rounded-full border-[1.5px] border-ink bg-white flex items-center justify-center text-ink hover:bg-cream transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-ink" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
