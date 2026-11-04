import type { Metadata } from "next";
import { ZiyoAIHeader } from "@/components/projects/ziyoai/ZiyoAIHeader";
import { ZiyoAIBand } from "@/components/projects/ziyoai/ZiyoAIBand";
import { ZiyoAIOverview } from "@/components/projects/ziyoai/ZiyoAIOverview";
import { ZiyoAIBuilt } from "@/components/projects/ziyoai/ZiyoAIBuilt";
import { ZiyoAIResults } from "@/components/projects/ziyoai/ZiyoAIResults";
import { ProjectNavigation } from "@/components/case-study/ProjectNavigation";

export const metadata: Metadata = {
  title: "ZiyoAI Case Study · Javohir Sadullayev",
  description:
    "ZiyoAI multimodal educational assistant engineered by Javohir Sadullayev. STT/TTS, OCR, channel auto-enrichment, and dual-key failover gateway on .NET 8, EF Core, Redis and Docker.",
  alternates: {
    canonical: "/projects/ziyoai",
  },
};

export default function ZiyoAICaseStudyPage() {
  return (
    <div className="flex flex-col w-full">
      <ZiyoAIHeader />
      <ZiyoAIBand />
      <ZiyoAIOverview />
      <ZiyoAIBuilt />
      <ZiyoAIResults />
      <ProjectNavigation
        prevHref="/projects"
        prevLabel="All projects"
        nextHref="/projects/typingwar"
        nextLabel="Next: TypingWar"
      />
    </div>
  );
}
