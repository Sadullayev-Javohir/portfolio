import type { Metadata } from "next";
import { ExperienceHeader } from "@/components/experience/ExperienceHeader";
import { ExperienceRolesList } from "@/components/experience/ExperienceRolesList";
import { ExperienceBeyondRoles } from "@/components/experience/ExperienceBeyondRoles";

export const metadata: Metadata = {
  title: "Experience · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "Engineering experience and track record of Javohir Sadullayev (javohir engineer). Backend systems, real-time architectures, low-latency APIs and production incident resolution.",
  alternates: {
    canonical: "/experience",
  },
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
