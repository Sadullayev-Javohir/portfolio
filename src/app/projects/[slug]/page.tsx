import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCustomProjects } from "@/lib/dynamicContent";
import { DynamicCaseStudyView } from "@/components/case-study/DynamicCaseStudyView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = getCustomProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Loyiha Topilmadi · Javohir Sadullayev",
    };
  }

  return {
    title: `${project.title} · Case Study | Javohir Sadullayev`,
    description: project.description,
  };
}

export default async function DynamicProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = getCustomProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <DynamicCaseStudyView project={project} />;
}
