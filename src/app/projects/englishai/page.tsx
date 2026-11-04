import type { Metadata } from "next";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyOverview } from "@/components/case-study/CaseStudyOverview";
import { CaseStudyProblem } from "@/components/case-study/CaseStudyProblem";
import { CaseStudyWhatIBuilt } from "@/components/case-study/CaseStudyWhatIBuilt";
import { CaseStudyArchitecture } from "@/components/case-study/CaseStudyArchitecture";
import { CaseStudyResults } from "@/components/case-study/CaseStudyResults";
import { ProjectNavigation } from "@/components/case-study/ProjectNavigation";

export const metadata: Metadata = {
  title: "EnglishAI Case Study · Javohir Sadullayev",
  description:
    "Adaptive English platform with speech assessment, placement testing and real-time pronunciation scoring. ASP.NET Core, PostgreSQL, Redis and Azure Speech.",
};

export default function EnglishAICaseStudyPage() {
  return (
    <div className="flex flex-col w-full">
      <CaseStudyHeader />
      <CaseStudyHero />
      <CaseStudyOverview />
      <CaseStudyProblem />
      <CaseStudyWhatIBuilt />
      <CaseStudyArchitecture />
      <CaseStudyResults />
      <ProjectNavigation
        prevHref="/projects"
        prevLabel="All projects"
        nextHref="/projects/kitobdagimen"
        nextLabel="Next: KitobdagiMen"
      />
    </div>
  );
}
