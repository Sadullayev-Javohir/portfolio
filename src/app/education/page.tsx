import type { Metadata } from "next";
import { EducationHeader } from "@/components/education/EducationHeader";
import { UniversityHeroCard } from "@/components/education/UniversityHeroCard";
import { CourseworkSection } from "@/components/education/CourseworkSection";
import { BuiltWhileStudyingSection } from "@/components/education/BuiltWhileStudyingSection";
import { CredentialsSection } from "@/components/education/CredentialsSection";

export const metadata: Metadata = {
  title: "Education · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "B.Sc. in Computer Science at PDP University in Tashkent (2024–2028). Fundamentals first: algorithms, data structures, relational databases, network programming and verified certifications.",
};

export default function EducationPage() {
  return (
    <div className="flex flex-col w-full bg-cream">
      <EducationHeader />
      <UniversityHeroCard />
      <CourseworkSection />
      <BuiltWhileStudyingSection />
      <CredentialsSection />
    </div>
  );
}
