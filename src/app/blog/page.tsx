import type { Metadata } from "next";
import { BlogView } from "@/components/blog/BlogView";
import { getCustomArticles } from "@/lib/dynamicContent";

export const metadata: Metadata = {
  title: "Blog & Journal · Javohir Sadullayev (.NET & AI Engineer)",
  description:
    "Writing about the parts that bite. Longer notes on .NET, caching, real-time systems and the failure modes you only meet in production. I publish when there's something worth saying.",
};

export default function BlogPage() {
  const customArticles = getCustomArticles();
  return <BlogView customArticles={customArticles} />;
}
