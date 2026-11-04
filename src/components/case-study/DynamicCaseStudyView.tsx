"use client";

import React from "react";
import Link from "next/link";
import { CustomProject } from "@/lib/dynamicContent";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Globe,
  Layers,
  CheckCircle2,
  Cpu,
  Target,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DynamicCaseStudyViewProps {
  project: CustomProject;
}

export function DynamicCaseStudyView({ project }: DynamicCaseStudyViewProps) {
  const { dict } = useLanguage();
  return (
    <div className="w-full flex flex-col bg-cream min-h-screen">
      {/* 1. Header Section */}
      <section className="w-full bg-cream border-b-2 border-ink py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
              <Link
                href="/projects"
                className="text-muted hover:text-ink transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PROJECTS</span>
              </Link>
              <span className="text-muted">/</span>
              <span className="text-ink font-bold">{project.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Title & Badges */}
          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-ink text-cream font-mono text-[11px] font-bold tracking-wider uppercase shadow-solid-sm">
                PROJECT CASE STUDY
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow border border-ink text-ink font-mono text-[11px] font-bold tracking-wider uppercase shadow-solid-sm">
                {project.chip}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-ink text-ink font-mono text-[11px] font-bold">
                {project.year}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight leading-[1.05]">
              {project.title}
            </h1>

            <p className="font-sans text-lg sm:text-xl text-ink/80 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-ink/15 font-mono">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                {dict.caseStudy.roleLabel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-ink">
                {project.role || "Software Engineer"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                {dict.caseStudy.timelineLabel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-ink">
                {project.period}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                CATEGORIES
              </span>
              <span className="text-xs sm:text-sm font-bold text-ink">
                {project.categories.join(", ")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                {dict.caseStudy.statusLabel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-mint-dark flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                Active Build
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Body */}
      <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-16 flex flex-col gap-14">
        {/* Overview & Problem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Overview */}
          <div className="p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-yellow border-2 border-ink shadow-solid-sm flex items-center justify-center">
                <Target className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">
                {dict.caseStudy.problemTitle}
              </h3>
            </div>
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
              {project.overview || project.description}
            </p>
          </div>

          {/* Card 2: Problem Statement */}
          <div className="p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-coral border-2 border-ink shadow-solid-sm flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">
                {dict.caseStudy.problemTitle}
              </h3>
            </div>
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
              {project.problemStatement || project.description}
            </p>
          </div>
        </div>

        {/* What I Built / Highlights */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-mint border-2 border-ink shadow-solid-sm flex items-center justify-center">
              <Cpu className="w-5 h-5 text-ink" />
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-ink">
                {dict.caseStudy.whatIBuiltTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-cream/50 border-2 border-ink/20 flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-lg bg-yellow border border-ink flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-mono text-xs font-bold text-ink">
                    {idx + 1}
                  </span>
                </div>
                <p className="font-sans text-sm text-ink leading-relaxed font-medium">
                  {highlight}
                </p>
              </div>
            ))}
          </div>

          {/* Architecture text if available */}
          {project.architecture && (
            <div className="mt-4 p-6 rounded-2xl bg-cream/30 border border-ink font-mono text-xs sm:text-sm text-ink leading-relaxed">
              <span className="block font-bold text-xs uppercase text-muted mb-2 tracking-wider">
                ARXITEKTURA VA TEXNIK QARORLAR:
              </span>
              {project.architecture}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-ink/10 flex flex-col gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Qo&apos;llanilgan Texnologiyalar:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white border-2 border-ink font-mono text-xs font-bold text-ink shadow-solid-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Metrics */}
        {project.results && project.results.length > 0 && (
          <div className="p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-lilac border-2 border-ink shadow-solid-sm flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink">
                Olingan Natijalar & Metrikalar (Results)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.results.map((res, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-cream/40 border border-ink flex items-center gap-3 font-mono text-xs font-semibold text-ink"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-mint shrink-0" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA & Navigation */}
        <div className="p-8 sm:p-12 rounded-3xl bg-ink text-cream border-2 border-ink shadow-solid flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="font-mono text-xs text-yellow uppercase tracking-wider font-bold">
              PORTFOLIO PROYEKTLARI
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Boshqa loyihalarni ham ko&apos;rishni xohlaysizmi?
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full bg-cream hover:bg-yellow border-2 border-ink font-mono text-xs font-bold text-ink shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              ← {dict.caseStudy.allProjects}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-yellow hover:bg-yellow-hover border-2 border-ink font-mono text-xs font-bold text-ink shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {dict.nav.getInTouch} ↗
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
