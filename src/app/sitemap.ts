import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { getCustomProjects, getCustomArticles } from "@/lib/dynamicContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/education`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  // Static individual project pages
  const projectRoutes: MetadataRoute.Sitemap = [
    "englishai",
    "kitobdagimen",
    "typingwar",
    "ziyoai",
    "meningvaqtim",
  ].map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Dynamic custom projects (if any)
  let customProjectRoutes: MetadataRoute.Sitemap = [];
  try {
    const customProjects = getCustomProjects();
    customProjectRoutes = customProjects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // ignore
  }

  // Dynamic articles / blog posts
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = getCustomArticles();
    articleRoutes = articles.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
  } catch {
    // ignore
  }

  return [...staticRoutes, ...projectRoutes, ...customProjectRoutes, ...articleRoutes];
}
