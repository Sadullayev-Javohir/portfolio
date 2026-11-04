"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ArticleRelated() {
  return (
    <section className="w-full px-6 sm:px-10 lg:px-14 pb-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-4">
        {/* Head */}
        <div className="flex items-center justify-between text-muted font-mono text-[9px] uppercase tracking-wider">
          <span>RELATED ARTICLES</span>
          <span>00 PUBLISHED</span>
        </div>

        {/* Empty Related Banner */}
        <div className="w-full border-y-[1.5px] border-ink py-5 px-1 flex flex-wrap items-center justify-between gap-4">
          <p className="font-sans text-[13.5px] text-muted">
            Related articles will appear here once the first pieces are published.
          </p>

          <Link
            href="/blog#planned"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-ink bg-white hover:bg-yellow transition-colors font-sans text-[13.5px] font-semibold text-ink group"
          >
            <span>Planned topics</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
