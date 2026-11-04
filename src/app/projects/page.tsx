import type { Metadata } from "next";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsFeed } from "@/components/projects/ProjectsFeed";
import { ProjectsCta } from "@/components/projects/ProjectsCta";
import { getCustomProjects } from "@/lib/dynamicContent";

export const metadata: Metadata = {
  title: "Projects · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "Production software systems built by Javohir Sadullayev (javohir.engineer): EnglishAI, KitobdagiMen, TypingWar, ZiyoAI and MeningVaqtim. Real-world systems built with ASP.NET Core, SignalR, Redis, PostgreSQL and Azure AI.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const customProjects = getCustomProjects();

  return (
    <div className="flex flex-col w-full">
      <ProjectsHeader />
      <ProjectsFeed initialCustomProjects={customProjects} />
      <ProjectsCta />
    </div>
  );
}
