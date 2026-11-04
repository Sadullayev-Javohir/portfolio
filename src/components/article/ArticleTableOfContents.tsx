"use client";

import React, { useEffect, useState } from "react";
import { ArticleData } from "@/data/articles";

interface ArticleTableOfContentsProps {
  items: ArticleData["toc"];
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("section-02");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <aside className="w-full lg:w-[250px] shrink-0 self-start lg:sticky lg:top-28">
      <div className="w-full bg-white rounded-[16px] border-[1.5px] border-ink p-[16px_18px] flex flex-col shadow-sm">
        <span className="font-mono text-[8px] text-muted tracking-[1.3px] uppercase font-medium">
          ON THIS PAGE
        </span>

        <div className="w-full h-[1px] bg-rule my-3" />

        <nav className="flex flex-col">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left py-2.5 flex items-center gap-2.5 border-b transition-colors ${
                  isActive
                    ? "border-b-rule border-l-[3px] border-l-ink pl-2 -ml-2 text-ink"
                    : "border-b-rule text-muted hover:text-ink hover:bg-cream/50"
                }`}
              >
                <span
                  className={`font-mono text-[8px] shrink-0 ${
                    isActive ? "text-ink font-bold" : "text-muted"
                  }`}
                >
                  {item.num}
                </span>
                <span
                  className={`font-sans text-[12px] truncate ${
                    isActive ? "font-semibold text-ink" : "text-muted"
                  }`}
                >
                  {item.text}
                </span>
              </button>
            );
          })}
        </nav>

        <p className="font-mono text-[7.5px] text-muted leading-relaxed mt-4">
          TOC is generated from article headings.
        </p>
      </div>
    </aside>
  );
}
