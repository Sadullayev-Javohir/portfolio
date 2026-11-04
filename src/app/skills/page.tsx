import type { Metadata } from "next";
import { SkillsHeader } from "@/components/skills/SkillsHeader";
import { StackTable } from "@/components/skills/StackTable";
import { CertsStrip } from "@/components/skills/CertsStrip";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Skills · Javohir Sadullayev (.NET & AI Stack)",
  description:
    "Tools I've actually shipped with. No percentages, no self-assigned stars. Production-proven backend, database, real-time and AI stack.",
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
