"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectNavigationProps {
  prevHref?: string;
  prevLabel?: string;
  nextHref: string;
  nextLabel: string;
}

export function ProjectNavigation({
  prevHref = "/projects",
  prevLabel,
  nextHref,
  nextLabel,
}: ProjectNavigationProps) {
  const { dict } = useLanguage();

  return (
    <nav
      aria-label="Project Case Studies Navigation"
      className="w-full bg-yellow border-y-2 border-ink py-5"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        {/* Prev */}
        <Link
          href={prevHref}
          className="flex items-center gap-2 font-body font-semibold text-[12.5px] text-ink hover:-translate-x-1 transition-transform group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-ink transition-transform group-hover:-translate-x-0.5" />
          <span>{prevLabel || dict.caseStudy.allProjects}</span>
        </Link>

        {/* Next */}
        <Link
          href={nextHref}
          className="flex items-center gap-2 font-display font-semibold text-[16px] tracking-[-0.3px] text-ink hover:translate-x-1 transition-transform group"
        >
          <span>{nextLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 text-ink transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  );
}
