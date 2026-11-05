import type { Metadata } from "next";
import { BlogView } from "@/components/blog/BlogView";
import { getCustomArticles } from "@/lib/dynamicContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering Journal & Blog · Javohir Sadullayev",
  description:
    "Engineering journal and backend architectural notes by Javohir Sadullayev (javohir.engineer). In-depth articles on .NET 8, PostgreSQL optimization, Redis caching and real-time SignalR systems.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const customArticles = getCustomArticles();
  return <BlogView customArticles={customArticles} />;
}
