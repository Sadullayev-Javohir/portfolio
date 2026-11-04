import type { Metadata } from "next";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsFeed } from "@/components/projects/ProjectsFeed";
import { ProjectsCta } from "@/components/projects/ProjectsCta";
import { getCustomProjects } from "@/lib/dynamicContent";

export const metadata: Metadata = {
  title: "Projects · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "Five builds. Zero throwaway demos. Real-world systems built end-to-end with ASP.NET Core, SignalR, Redis, PostgreSQL and Azure AI.",
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
