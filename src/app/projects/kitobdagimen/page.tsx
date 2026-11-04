import type { Metadata } from "next";
import { KitobdagiMenHeader } from "@/components/projects/kitobdagimen/KitobdagiMenHeader";
import { KitobdagiMenBand } from "@/components/projects/kitobdagimen/KitobdagiMenBand";
import { KitobdagiMenOverview } from "@/components/projects/kitobdagimen/KitobdagiMenOverview";
import { KitobdagiMenBuilt } from "@/components/projects/kitobdagimen/KitobdagiMenBuilt";
import { KitobdagiMenResults } from "@/components/projects/kitobdagimen/KitobdagiMenResults";
import { ProjectNavigation } from "@/components/case-study/ProjectNavigation";

export const metadata: Metadata = {
  title: "KitobdagiMen Case Study · Javohir Sadullayev",
  description:
    "KitobdagiMen reading community platform by Javohir Sadullayev. Reviews, reading goals, quotes, Google OAuth, SignalR real-time chat, and Telegram Mini App bridge on .NET 8 and PostgreSQL.",
  alternates: {
    canonical: "/projects/kitobdagimen",
  },
};

export default function KitobdagiMenCaseStudyPage() {
  return (
    <div className="flex flex-col w-full">
      <KitobdagiMenHeader />
      <KitobdagiMenBand />
      <KitobdagiMenOverview />
      <KitobdagiMenBuilt />
      <KitobdagiMenResults />
      <ProjectNavigation
        prevHref="/projects"
        prevLabel="All projects"
        nextHref="/projects/ziyoai"
        nextLabel="Next: ZiyoAI"
      />
    </div>
  );
}
