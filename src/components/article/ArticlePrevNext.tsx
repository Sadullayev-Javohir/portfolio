"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ArticlePrevNext() {
  return (
    <div className="w-full bg-white border-t-[1.5px] border-ink py-5 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-muted hover:text-ink transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-transform group-hover:-translate-x-0.5" />
          <span className="font-sans text-[12.5px] font-medium">Previous article</span>
        </Link>

        <Link
          href="/blog"
          className="flex items-center gap-2 text-muted hover:text-ink transition-colors group"
        >
          <span className="font-sans text-[12.5px] font-medium">Next article</span>
          <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
