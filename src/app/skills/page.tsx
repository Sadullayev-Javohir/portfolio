import type { Metadata } from "next";
import { SkillsHeader } from "@/components/skills/SkillsHeader";
import { StackTable } from "@/components/skills/StackTable";
import { CertsStrip } from "@/components/skills/CertsStrip";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Skills & Tech Stack · Javohir Sadullayev (.NET & C#)",
  description:
    "Production tech stack of Javohir Sadullayev (javohir engineer): C#, .NET 8, ASP.NET Core, PostgreSQL, Redis, SignalR, Docker, and Azure Cognitive Services.",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <div className="flex flex-col w-full">
      <SkillsHeader />
      <Marquee />
      <StackTable />
      <CertsStrip />
    </div>
  );
}
