"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function PrinciplesSection() {
  const { dict } = useLanguage();

  const principles = [
    {
      number: "01",
      title: dict.about.principles.p1_title,
      description: dict.about.principles.p1_desc,
    },
    {
      number: "02",
      title: dict.about.principles.p2_title,
      description: dict.about.principles.p2_desc,
    },
    {
      number: "03",
      title: dict.about.principles.p3_title,
      description: dict.about.principles.p3_desc,
    },
    {
      number: "04",
      title: dict.about.principles.p4_title,
      description: dict.about.principles.p4_desc,
    },
  ];

  return (
    <section className="w-full bg-ink text-cream border-b-2 border-ink py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#3A342E]">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-[1.6px] text-yellow uppercase">
              {dict.about.principles.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-cream tracking-tight leading-tight">
              {dict.about.principles.title}
            </h2>
          </div>
          <p className="text-[#B9B0A4] text-sm sm:text-[15px] max-w-md font-normal">
            {dict.about.bio.quote}
          </p>
        </div>

        {/* 4 Principle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {principles.map((item) => (
            <div
              key={item.number}
              className="p-8 rounded-3xl bg-[#171A1F] border-2 border-[#3A342E] shadow-[5px_5px_0px_#0C0E10] flex flex-col justify-between gap-6 hover:border-yellow/50 transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-yellow px-3 py-1 rounded-full bg-yellow/10 border border-yellow/30">
                    {item.number}
                  </span>
                  <span className="text-coral text-lg font-bold">✳</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-cream tracking-tight pt-1">
                  {item.title}
                </h3>

                <p className="text-[#B9B0A4] text-sm sm:text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
