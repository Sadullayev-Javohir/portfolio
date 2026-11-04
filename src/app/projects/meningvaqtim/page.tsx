import type { Metadata } from "next";
import { MeningVaqtimHeader } from "@/components/projects/meningvaqtim/MeningVaqtimHeader";
import { MeningVaqtimBand } from "@/components/projects/meningvaqtim/MeningVaqtimBand";
import { MeningVaqtimOverview } from "@/components/projects/meningvaqtim/MeningVaqtimOverview";
import { MeningVaqtimBuilt } from "@/components/projects/meningvaqtim/MeningVaqtimBuilt";
import { MeningVaqtimResults } from "@/components/projects/meningvaqtim/MeningVaqtimResults";
import { ProjectNavigation } from "@/components/case-study/ProjectNavigation";

export const metadata: Metadata = {
  title: "MeningVaqtim Case Study · Javohir Sadullayev",
  description:
    "Planned work versus what actually happened. Timezone-aware analytics, automated timer completion, and distraction logging with .NET 8, PostgreSQL, and Hangfire.",
  keywords: [
    "MeningVaqtim",
    ".NET 8",
    "PostgreSQL",
    "Hangfire",
    "BackgroundService",
    "Productivity Tracker",
    "Timezone Analytics",
    "Javohir Sadullayev",
  ],
};

export default function MeningVaqtimCaseStudyPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Header with Breadcrumb, Badges, Title, Tagline and Meta Card */}
      <MeningVaqtimHeader />

      {/* 2. Visual Band with 05 Number, Metrics and Project Image Preview */}
      <MeningVaqtimBand />

      {/* 3. Three-column Overview (The Context, My Role, The Constraint) */}
      <MeningVaqtimOverview />

      {/* 4. What I Built (3 Architecture Cards) */}
      <MeningVaqtimBuilt />

      {/* 5. Measured Results Banner */}
      <MeningVaqtimResults />

      {/* 6. Case Study Bottom Navigation */}
      <ProjectNavigation
        prevHref="/projects"
        prevLabel="All projects"
        nextHref="/projects/englishai"
        nextLabel="Next: EnglishAI"
      />
    </div>
  );
}
