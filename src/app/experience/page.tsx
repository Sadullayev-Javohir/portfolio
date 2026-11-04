import type { Metadata } from "next";
import { ExperienceHeader } from "@/components/experience/ExperienceHeader";
import { ExperienceRolesList } from "@/components/experience/ExperienceRolesList";
import { ExperienceBeyondRoles } from "@/components/experience/ExperienceBeyondRoles";

export const metadata: Metadata = {
  title: "Experience · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "Where the work happened. Since June 2026 I've worked across four product teams and one open-source project — always on the backend, usually on the part of the system that has to stay up.",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col w-full bg-cream">
      <ExperienceHeader />
      <ExperienceRolesList />
      <ExperienceBeyondRoles />
    </div>
  );
}
