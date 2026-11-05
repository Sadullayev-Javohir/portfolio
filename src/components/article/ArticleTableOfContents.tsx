"use client";

import React, { useEffect, useState } from "react";
import { ArticleData } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleTableOfContentsProps {
  items: ArticleData["toc"];
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  const { dict } = useLanguage();
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (!items || items.length === 0) return;

    if (!activeId && items[0]) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <aside className="w-full lg:w-[250px] shrink-0 self-start lg:sticky lg:top-28">
      <div className="w-full bg-white rounded-[16px] border-[1.5px] border-ink p-[16px_18px] flex flex-col shadow-sm">
        <span className="font-mono text-[8px] text-muted tracking-[1.3px] uppercase font-medium">
          {dict.blogPage.onThisPage}
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
