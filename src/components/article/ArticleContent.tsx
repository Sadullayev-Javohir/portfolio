"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { ArticleData } from "@/data/articles";
import { ArticleEngagementBar } from "./ArticleEngagementBar";
import { ArticleCommentsSection } from "./ArticleCommentsSection";

interface ArticleContentProps {
  article: ArticleData;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    const codeString = article.codeBlock.lines.join("\n");
    navigator.clipboard.writeText(codeString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <article className="flex-1 min-w-0 max-w-[800px] flex flex-col gap-9">
      {/* Intro */}
      <p className="font-sans text-[16.5px] text-ink-soft leading-[1.7] font-normal">
        {article.intro}
      </p>

      {/* Section 01 */}
      <section id="section-01" className="flex flex-col gap-4 scroll-mt-24">
        <h2 className="font-display text-[24px] sm:text-[26px] font-bold text-ink tracking-tight">
          {article.sections[0].title}
        </h2>
        <p className="font-sans text-[15px] text-ink-soft leading-[1.7]">
          {article.sections[0].content[0]}
        </p>

        {/* Code Block */}
        <div className="w-full bg-ink rounded-[16px] border-2 border-ink overflow-hidden my-1 shadow-solid-sm">
          {/* Code Head */}
          <div className="w-full border-b border-[#3A342E] px-[18px] py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-mint" />
              <span className="font-mono text-[8.5px] text-[#B9B0A4] tracking-wide">
                {article.codeBlock.lang}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 font-mono text-[7.5px] text-[#B9B0A4] hover:text-white transition-colors tracking-wider uppercase"
              title="Copy code"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3 h-3 text-mint stroke-[2.5]" />
                  <span className="text-mint font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#B9B0A4]" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-[16px_20px_18px_20px] flex flex-col gap-0.5 overflow-x-auto text-[11px] leading-relaxed font-mono">
            {article.codeBlock.lines.map((line, idx) => {
              const isComment = line.trim().startsWith("//");
              const isKeyword = line.includes("if (cached is not null)");
              return (
                <div
                  key={idx}
                  className={`${
                    isComment
                      ? "text-[#8F8678]"
                      : isKeyword
                      ? "text-yellow font-semibold"
                      : "text-cream"
                  } whitespace-pre`}
                >
                  {line || " "}
                </div>
              );
            })}
          </div>
        </div>

        {/* Code Caption */}
        <span className="font-mono text-[8.5px] text-muted -mt-1">
          {article.codeBlock.caption}
        </span>
      </section>

      {/* Section 02 */}
      <section id="section-02" className="flex flex-col gap-4 scroll-mt-24">
        <h2 className="font-display text-[24px] sm:text-[26px] font-bold text-ink tracking-tight">
          {article.sections[1].title}
        </h2>
        <p className="font-sans text-[15px] text-ink-soft leading-[1.7]">
          {article.sections[1].content[0]}
        </p>

        {/* Callout */}
        <div className="w-full bg-yellow border-2 border-ink rounded-[14px] p-[18px_20px] flex items-start gap-3.5 my-1 shadow-solid-sm">
          <AlertTriangle className="w-4.5 h-4.5 text-ink shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[13px] font-bold text-ink">
              {article.callout.title}
            </span>
            <p className="font-sans text-[12.5px] text-ink-soft leading-relaxed">
              {article.callout.text}
            </p>
          </div>
        </div>
      </section>

      {/* Section 03 */}
      <section id="section-03" className="flex flex-col gap-4 scroll-mt-24">
        <h2 className="font-display text-[24px] sm:text-[26px] font-bold text-ink tracking-tight">
          {article.sections[2].title}
        </h2>

        {/* Result Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-1">
          {article.results.map((res) => (
            <div
              key={res.label}
              className="bg-white border-[1.5px] border-ink rounded-[14px] p-[14px_18px] flex flex-col gap-0.5 shadow-sm"
            >
              <span className="font-display text-[28px] font-bold text-ink leading-tight">
                {res.value}
              </span>
              <span className="font-mono text-[8px] text-muted uppercase tracking-wider">
                {res.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-sans text-[15px] text-ink-soft leading-[1.7]">
          {article.sections[2].content[0]}
        </p>

        {/* Quote */}
        <div className="w-full bg-white border-l-4 border-l-ink border-y border-r border-rule rounded-r-[14px] p-[20px_24px] my-1 shadow-sm">
          <p className="font-display text-[18px] sm:text-[20px] font-medium text-ink leading-relaxed italic">
            {article.quote}
          </p>
        </div>
      </section>

      {/* Section 04 */}
      <section id="section-04" className="flex flex-col gap-4 scroll-mt-24">
        <h2 className="font-display text-[24px] sm:text-[26px] font-bold text-ink tracking-tight">
          {article.sections[3].title}
        </h2>

        <div className="flex flex-col gap-3">
          {article.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
              <p className="font-sans text-[14.5px] text-ink-soft leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 05 */}
      <section id="section-05" className="flex flex-col gap-4 scroll-mt-24">
        <h2 className="font-display text-[24px] sm:text-[26px] font-bold text-ink tracking-tight">
          {article.sections[4].title}
        </h2>
        <p className="font-sans text-[14.5px] text-ink-soft leading-[1.7]">
          {article.sections[4].content[0]}
        </p>
      </section>

      {/* Article Tags */}
      <div className="flex items-center gap-2 flex-wrap pt-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full bg-white border-[1.5px] border-ink font-mono text-[8.5px] text-ink font-semibold uppercase tracking-wider shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Author Box */}
      <div className="w-full bg-white border-2 border-ink rounded-[18px] p-5 flex items-center justify-between flex-wrap gap-4 shadow-solid-sm">
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-full border-[1.5px] border-ink overflow-hidden bg-yellow shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[17px] font-semibold text-ink leading-tight">
              {article.author.name}
            </span>
            <p className="font-sans text-[12px] text-muted max-w-[420px] mt-1 leading-normal">
              {article.author.bio}
            </p>
          </div>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-ink bg-transparent hover:bg-yellow transition-colors font-sans text-[13.5px] font-semibold text-ink group"
        >
          <span>All articles</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Engagement Bar */}
      <ArticleEngagementBar reactions={article.reactions} />

      {/* Comments Section */}
      <ArticleCommentsSection initialComments={article.comments} />
    </article>
  );
}
