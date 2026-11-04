import type { Metadata } from "next";
import { AboutHeader } from "@/components/about/AboutHeader";
import { BioSection } from "@/components/about/BioSection";
import { JourneySection } from "@/components/about/JourneySection";
import { PrinciplesSection } from "@/components/about/PrinciplesSection";
import { InterestsSection } from "@/components/about/InterestsSection";
import { GoalsSection } from "@/components/about/GoalsSection";

export const metadata: Metadata = {
  title: "About · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "I'm Javohir — a .NET backend developer who likes the part of the job most people avoid: the logs, the slow query, the edge case that only appears at 2am.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <AboutHeader />
      <BioSection />
      <JourneySection />
      <PrinciplesSection />
      <InterestsSection />
      <GoalsSection />
    </div>
  );
}
