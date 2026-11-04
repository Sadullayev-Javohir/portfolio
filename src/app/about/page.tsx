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
    "About Javohir Sadullayev (Sadullayev Javohir, javohir engineer) — .NET backend developer & CS student at PDP University. Background, technical journey, principles, and engineering philosophy.",
  alternates: {
    canonical: "/about",
  },
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
