"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export function Intro() {
  const { dict } = useLanguage();

  const cards = [
    {
      number: "01",
      title: dict.intro.bullet1Title,
      description: dict.intro.bullet1Desc,
      tags: "ASP.NET Core · Clean Architecture · EF Core",
      color: "#FFC940",
    },
    {
      number: "02",
      title: dict.intro.bullet2Title,
      description: dict.intro.bullet2Desc,
      tags: "SignalR Core · WebSockets · Redis",
      color: "#7BE0AD",
    },
    {
      number: "03",
      title: dict.intro.bullet3Title,
      description: dict.intro.bullet3Desc,
      tags: "Azure Speech · Semantic Kernel · Background Services",
      color: "#A8D8FF",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 border-b-2 border-ink bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        <SectionHeader
          eyebrow={dict.intro.eyebrow}
          title={dict.intro.title}
          description={dict.intro.p1}
        />

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <ScrollReveal key={card.number} delayMs={idx * 130}>
              <div
                className="group p-8 rounded-3xl bg-white border-2 border-ink shadow-solid hover:shadow-[9px_9px_0px_#14110F] transition-all duration-300 flex flex-col justify-between gap-6 hover:-translate-y-2 hover:-translate-x-0.5 h-full cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-xs font-bold px-3 py-1 rounded-full border border-ink shadow-solid-sm group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: card.color }}
                    >
                      {card.number}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-ink flex items-center justify-center bg-cream group-hover:rotate-45 group-hover:bg-yellow group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-ink" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-ink tracking-tight pt-2 group-hover:text-blue transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-muted text-sm sm:text-[15px] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-rule">
                  <span className="font-mono text-xs font-semibold text-ink">
                    {card.tags}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
