"use client";

"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export function NowCta() {
  const { dict } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-20 border-b-2 border-ink bg-yellow overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="font-mono text-xs font-bold tracking-[1.6px] text-ink uppercase flex items-center gap-1.5">
                <span className="inline-block animate-spin-slow origin-center">✳</span>
                <span>{dict.hero.badge}</span>
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                {dict.nowCta.title}
              </h2>
              <p className="text-ink/80 text-sm sm:text-base font-medium max-w-xl">
                {dict.nowCta.subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-cream font-bold text-sm sm:text-base shadow-solid hover:shadow-[6px_6px_0px_#14110F] hover:-translate-y-1 active:translate-y-0.5 active:shadow-solid-sm transition-all"
              >
                <span>{dict.nowCta.ctaChat}</span>
                <ArrowUpRight className="w-4 h-4 text-cream group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href="mailto:javohirsadullayev836@gmail.com"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream border-2 border-ink text-ink font-bold text-sm sm:text-base shadow-solid-sm hover:shadow-solid hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Mail className="w-4 h-4 text-ink group-hover:scale-110 transition-transform" />
                <span>javohirsadullayev836@gmail.com</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
