"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_EMPTY_DATA } from "@/data/blogData";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";

export function BlogFeaturedEmpty() {
  const { dict } = useLanguage();
  return (
    <section className="w-full bg-cream pt-9 pb-7 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-5">
        {/* Label Row */}
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-medium">
            {FEATURED_EMPTY_DATA.eyebrow}
          </span>
          <span className="bg-white border-[1.5px] border-ink text-ink font-mono text-[8px] tracking-[0.4px] px-2 py-0.5 rounded-full uppercase font-medium">
            {FEATURED_EMPTY_DATA.badge}
          </span>
        </div>

        {/* Empty State Neo-Brutalist Box */}
        <div className="w-full bg-white rounded-[24px] border-2 border-ink shadow-[8px_8px_0px_#14110F] overflow-hidden flex flex-col lg:flex-row">
          {/* Left Art (Lilac canvas with geometric shapes) */}
          <div className="w-full lg:w-[440px] h-[340px] sm:h-[380px] lg:h-[400px] bg-lilac relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-ink shrink-0 select-none">
            {/* Disc (Yellow circle) */}
            <div
              className="w-[210px] h-[210px] rounded-full bg-yellow border-2 border-ink absolute pointer-events-none"
              style={{ left: "250px", top: "-40px" }}
            />

            {/* Ring (Hollow ink ring) */}
            <div
              className="w-[140px] h-[140px] rounded-full border-[22px] border-ink absolute pointer-events-none"
              style={{ left: "-50px", top: "250px" }}
            />

            {/* Coral Triangle */}
            <svg
              className="absolute pointer-events-none drop-shadow-[2px_2px_0px_#14110F]"
              style={{
                left: "120px",
                top: "120px",
                width: "86px",
                height: "76px",
                transform: "rotate(12deg)",
              }}
              viewBox="0 0 86 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="43,2 84,74 2,74"
                fill="#FF6B5A"
                stroke="#14110F"
                strokeWidth="2"
              />
            </svg>

            {/* Giant "0" */}
            <span
              className="absolute font-display font-bold text-[132px] text-ink leading-none tracking-[-8px] pointer-events-none"
              style={{ left: "34px", top: "44px" }}
            >
              0
            </span>

            {/* Label "ARTICLES PUBLISHED" */}
            <span
              className="absolute font-mono text-[10px] uppercase tracking-[1.6px] text-ink font-medium pointer-events-none"
              style={{ left: "38px", top: "200px" }}
            >
              {dict.blogPage.articlesPublished}
            </span>

            {/* Note "Nothing to scroll. Yet." */}
            <span
              className="absolute font-mono text-[9px] tracking-[0.4px] text-ink pointer-events-none"
              style={{ left: "38px", top: "340px" }}
            >
              {dict.blogPage.nothingToScroll}
            </span>
          </div>

          {/* Right Copy */}
          <div className="flex-1 p-6 sm:p-8 lg:p-[32px_36px] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="font-display font-bold text-[26px] sm:text-[32px] text-ink leading-tight">
                {FEATURED_EMPTY_DATA.title}
              </h2>
              <p className="font-sans text-[14px] text-muted leading-relaxed max-w-[760px]">
                {FEATURED_EMPTY_DATA.desc}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {FEATURED_EMPTY_DATA.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white border-[1.5px] border-ink text-ink font-mono text-[8.5px] px-[9px] py-[4px] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Follow on GitHub */}
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-cream border-2 border-ink rounded-full px-5 py-3 font-semibold text-[13.5px] shadow-solid-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none hover:bg-neutral-800 transition-all cursor-pointer"
              >
                {/* GitHub SVG Icon */}
                <svg
                  className="w-[15px] h-[15px] fill-cream"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>{dict.projectsPage.ctaButton}</span>
              </a>

              {/* See projects */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-transparent text-ink border-2 border-ink rounded-full px-5 py-3 font-semibold text-[13.5px] hover:bg-cream transition-colors cursor-pointer"
              >
                <span>{dict.blogPage.seeProjectsBtn}</span>
                <ArrowUpRight className="w-[15px] h-[15px] text-ink" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
