"use client";

import React from "react";
import { Info } from "lucide-react";

export function ArticlePreviewBanner() {
  return (
    <div className="w-full bg-yellow border-b-2 border-ink px-6 sm:px-10 lg:px-14 py-2.5 flex items-center gap-2.5">
      <Info className="w-3.5 h-3.5 text-ink shrink-0" />
      <span className="font-mono text-[9.5px] uppercase tracking-wide text-ink font-medium leading-none">
        TEMPLATE PREVIEW — sample content. This article is not published; it exists to show the reading layout.
      </span>
    </div>
  );
}
