"use client";

import React from "react";
import { ArrowUpRight, Github, Linkedin, MapPin, Phone } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import { TelegramIcon } from "@/components/ui/icons/TelegramIcon";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSidebar() {
  const { dict } = useLanguage();

  const goodFitItems = [
    dict.skillsPage.filterBackend,
    dict.skillsPage.filterData,
    dict.skillsPage.filterAI,
    dict.skillsPage.filterArch,
  ];

  return (
    <aside className="w-full lg:w-[390px] shrink-0 flex flex-col gap-[14px]">
      {/* 1. Email Card (Featured Yellow Card) */}
      <a
        href={SOCIAL_LINKS.email}
        className="w-full bg-yellow border-2 border-ink rounded-[20px] p-[20px_22px] shadow-[6px_6px_0px_#14110F] flex flex-col gap-[10px] group hover:-translate-y-0.5 transition-all"
      >
        <div className="w-full flex justify-between items-center">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-ink font-semibold">
            EMAIL
          </span>
          <ArrowUpRight className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <span className="font-display text-[19px] leading-[25px] font-semibold tracking-[-0.5px] text-ink break-all">
          javohirsadullayev836@gmail.com
        </span>
        <span className="font-sans text-[11.5px] text-ink-soft">
          javohirsadullayev836@gmail.com
        </span>
      </a>

      {/* 2. Telegram Card */}
      <a
        href={SOCIAL_LINKS.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white border-[1.5px] border-ink rounded-[16px] p-[14px_16px] flex items-center gap-[14px] group hover:shadow-solid-sm transition-all"
      >
        <div className="w-[34px] h-[34px] rounded-full bg-[#E5F5FF] border-[1.5px] border-ink flex items-center justify-center shrink-0">
          <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
        </div>
        <div className="flex-1 flex flex-col gap-[1px]">
          <span className="font-mono text-[8px] uppercase tracking-[1.1px] text-muted">
            TELEGRAM · INSTANT
          </span>
          <span className="font-sans text-[12.5px] font-medium text-ink">
            @dotnetda
          </span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-colors" />
      </a>

      {/* 3. Phone Card */}
      <a
        href={SOCIAL_LINKS.phone}
        className="w-full bg-white border-[1.5px] border-ink rounded-[16px] p-[14px_16px] flex items-center gap-[14px] group hover:shadow-solid-sm transition-all"
      >
        <div className="w-[34px] h-[34px] rounded-full bg-sky border-[1.5px] border-ink flex items-center justify-center shrink-0">
          <Phone className="w-3.5 h-3.5 text-ink" />
        </div>
        <div className="flex-1 flex flex-col gap-[1px]">
          <span className="font-mono text-[8px] uppercase tracking-[1.1px] text-muted">
            PHONE
          </span>
          <span className="font-sans text-[12.5px] font-medium text-ink">
            +998 88 603 66 44
          </span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-colors" />
      </a>

      {/* 4. LINKEDIN Card */}
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white border-[1.5px] border-ink rounded-[16px] p-[14px_16px] flex items-center gap-[14px] group hover:shadow-solid-sm transition-all"
      >
        <div className="w-[34px] h-[34px] rounded-full bg-lilac border-[1.5px] border-ink flex items-center justify-center shrink-0">
          <Linkedin className="w-3.5 h-3.5 text-ink" />
        </div>
        <div className="flex-1 flex flex-col gap-[1px]">
          <span className="font-mono text-[8px] uppercase tracking-[1.1px] text-muted">
            LINKEDIN
          </span>
          <span className="font-sans text-[12.5px] font-medium text-ink truncate">
            linkedin.com/in/javohir-sadullayev
          </span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-colors" />
      </a>

      {/* 5. GITHUB Card */}
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white border-[1.5px] border-ink rounded-[16px] p-[14px_16px] flex items-center gap-[14px] group hover:shadow-solid-sm transition-all"
      >
        <div className="w-[34px] h-[34px] rounded-full bg-mint border-[1.5px] border-ink flex items-center justify-center shrink-0">
          <Github className="w-3.5 h-3.5 text-ink" />
        </div>
        <div className="flex-1 flex flex-col gap-[1px]">
          <span className="font-mono text-[8px] uppercase tracking-[1.1px] text-muted">
            GITHUB
          </span>
          <span className="font-sans text-[12.5px] font-medium text-ink">
            github.com/Sadullayev-Javohir
          </span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-colors" />
      </a>

      {/* 6. LOCATION Card */}
      <div className="w-full bg-white border-[1.5px] border-ink rounded-[16px] p-[14px_16px] flex items-center gap-[14px] group hover:shadow-solid-sm transition-all">
        <div className="w-[34px] h-[34px] rounded-full bg-coral border-[1.5px] border-ink flex items-center justify-center shrink-0">
          <MapPin className="w-3.5 h-3.5 text-ink" />
        </div>
        <div className="flex-1 flex flex-col gap-[1px]">
          <span className="font-mono text-[8px] uppercase tracking-[1.1px] text-muted">
            {dict.contactPage.locationTitle}
          </span>
          <span className="font-sans text-[12.5px] font-medium text-ink">
            {dict.contactPage.locationValue}
          </span>
        </div>
      </div>

      {/* 7. Focus Areas Dark Card */}
      <div className="w-full bg-ink rounded-[18px] p-[18px_20px] flex flex-col gap-[10px] shadow-solid-sm">
        <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-yellow font-semibold">
          {dict.about.header.quickStats.roleLabel}
        </span>
        <div className="flex flex-col gap-2 pt-1">
          {goodFitItems.map((item, idx) => (
            <div key={idx} className="w-full flex items-center gap-[9px]">
              <span className="font-mono text-[10px] text-coral shrink-0">✳</span>
              <span className="font-sans text-[12px] text-cream leading-tight">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
