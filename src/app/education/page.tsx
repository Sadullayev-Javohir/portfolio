import type { Metadata } from "next";
import { EducationHeader } from "@/components/education/EducationHeader";
import { UniversityHeroCard } from "@/components/education/UniversityHeroCard";
import { CourseworkSection } from "@/components/education/CourseworkSection";
import { BuiltWhileStudyingSection } from "@/components/education/BuiltWhileStudyingSection";
import { CredentialsSection } from "@/components/education/CredentialsSection";

export const metadata: Metadata = {
  title: "Education & Credentials · Javohir Sadullayev (PDP University)",
  description:
    "Education of Javohir Sadullayev: B.Sc. in Computer Science at PDP University in Tashkent (2024–2028, GPA 4.13/4.5). Algorithms, relational databases, distributed systems and certifications.",
  alternates: {
    canonical: "/education",
  },
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
