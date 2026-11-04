import React from "react";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Intro } from "@/components/home/Intro";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Expertise } from "@/components/home/Expertise";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { EducationSection } from "@/components/home/EducationSection";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { NowCta } from "@/components/home/NowCta";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section with dynamic availability, headlines & live code visual */}
      <Hero />

      {/* 2. Marquee banner with stack keywords */}
      <Marquee />

      {/* 3. Intro: 01 — WHAT I DO */}
      <Intro />

      {/* 4. Featured Work: 02 — SELECTED WORK */}
      <FeaturedWork />

      {/* 5. Expertise: 03 — TECHNICAL EXPERTISE */}
      <Expertise />

      {/* 6. Experience Preview: 04 — EXPERIENCE */}
      <ExperiencePreview />

      {/* 7. Education: 05 — EDUCATION */}
      <EducationSection />

      {/* 8. Journal Teaser: 06 — JOURNAL */}
      <JournalTeaser />

      {/* 9. Now CTA Banner */}
      <NowCta />
    </div>
  );
}
