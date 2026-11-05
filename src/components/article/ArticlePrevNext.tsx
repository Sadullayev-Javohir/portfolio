"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ArticlePrevNext() {
  const { dict } = useLanguage();
  return (
    <div className="w-full bg-white border-t-[1.5px] border-ink py-5 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-muted hover:text-ink transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-transform group-hover:-translate-x-0.5" />
          <span className="font-sans text-[12.5px] font-medium">{dict.blogPage.prevArticle}</span>
        </Link>

        <Link
          href="/blog"
          className="flex items-center gap-2 text-muted hover:text-ink transition-colors group"
        >
          <span className="font-sans text-[12.5px] font-medium">{dict.blogPage.nextArticle}</span>
          <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
