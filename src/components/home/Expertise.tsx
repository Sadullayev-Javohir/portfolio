"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export function Expertise() {
  const { dict } = useLanguage();

  const cards = [
    {
      id: "backend-apis",
      title: dict.expertise.backendTitle,
      description: dict.expertise.backendDesc,
      technologies:
        "C# 12 · .NET 8 · ASP.NET Core Web API · Entity Framework Core · Clean Architecture · MediatR",
      renderShape: () => (
        <div
          className="w-10 h-10 rounded-lg bg-blue border-2 border-ink shadow-solid-sm shrink-0"
          style={{ transform: "rotate(-6deg)" }}
        />
      ),
    },
    {
      id: "data-caching",
      title: dict.expertise.dataTitle,
      description: dict.expertise.dataDesc,
      technologies:
        "PostgreSQL · Microsoft SQL Server · Redis (Caching & Pub/Sub) · SQL Query Optimization",
      renderShape: () => (
        <div className="w-11 h-11 rounded-full bg-yellow border-2 border-ink shadow-solid-sm shrink-0" />
      ),
    },
    {
      id: "real-time-systems",
      title: dict.expertise.realtimeTitle,
      description: dict.expertise.realtimeDesc,
      technologies:
        "SignalR Core · WebSockets · Azure Cognitive Services (Speech) · OpenAI API · Background Workers",
      renderShape: () => (
        <div
          className="w-11 h-10 shrink-0 drop-shadow-[2px_2px_0px_#14110F]"
          style={{ transform: "rotate(8deg)" }}
        >
          <svg viewBox="0 0 44 40" className="w-full h-full fill-coral stroke-ink stroke-2">
            <polygon points="22,3 41,37 3,37" />
          </svg>
        </div>
      ),
    },
    {
      id: "delivery-ai",
      title: dict.expertise.deliveryTitle,
      description: dict.expertise.deliveryDesc,
      technologies:
        "Docker & Compose · Git · Linux / Bash · Postman · Serilog · Swagger / OpenAPI",
      renderShape: () => (
        <div className="w-11 h-11 rounded-full border-[10px] border-mint border-ink/40 shadow-solid-sm shrink-0" />
      ),
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 border-b-2 border-ink bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-12">
        <SectionHeader
          eyebrow={dict.expertise.eyebrow}
          title={dict.expertise.title}
          description={dict.expertise.description}
          action={{
            label: dict.expertise.action,
            href: "/skills",
          }}
        />

        {/* 4 Expertise Areas with Geometric Shapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {cards.map((card, idx) => (
            <ScrollReveal key={card.id} delayMs={idx * 120}>
              <div
                className="group p-8 rounded-3xl bg-white border-2 border-ink shadow-solid hover:shadow-[9px_9px_0px_#14110F] transition-all duration-300 flex flex-col justify-between gap-6 hover:-translate-y-2 hover:-translate-x-0.5 h-full cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  {/* Shape Row matching pen.dev */}
                  <div className="flex items-center justify-between">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {card.renderShape()}
                    </div>
                    <span className="font-mono text-base font-bold text-muted group-hover:text-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-[26px] font-bold text-ink tracking-tight pt-1 group-hover:text-blue transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-muted text-sm sm:text-[15px] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-ink flex flex-col gap-1.5">
                  <p className="font-mono text-xs font-semibold text-ink leading-relaxed">
                    {card.technologies}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
