import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SAMPLE_ARTICLE, ArticleData } from "@/data/articles";
import { getCustomArticles, CustomArticle } from "@/lib/dynamicContent";
import { ArticlePreviewBanner } from "@/components/article/ArticlePreviewBanner";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleCover } from "@/components/article/ArticleCover";
import { ArticleTableOfContents } from "@/components/article/ArticleTableOfContents";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleRelated } from "@/components/article/ArticleRelated";
import { ArticlePrevNext } from "@/components/article/ArticlePrevNext";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function customToArticleData(custom: CustomArticle): ArticleData {
  const paragraphs = custom.markdownContent
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    slug: custom.slug,
    title: custom.title,
    subtitle: custom.subtitle || custom.title,
    breadcrumb: {
      parent: "BLOG",
      current: custom.title.toUpperCase(),
    },
    categories: [custom.category, ...(custom.tags || [])],
    publishedDate: custom.publishedDate,
    readTime: custom.readTime,
    views: "124",
    likesCount: 14,
    commentsCount: 2,
    author: {
      name: "Javohir Sadullayev",
      role: ".NET & AI Engineer",
      bio: "Building high-concurrency systems, event-driven architectures, and AI speech models.",
      avatar: "/javohir.jpg",
    },
    cover: {
      label: custom.category.toUpperCase(),
      code: "JOURNAL",
      caption: custom.subtitle || custom.title,
      stats: [
        { value: custom.readTime, label: "READ TIME" },
        { value: custom.category, label: "CATEGORY" },
      ],
    },
    toc: [
      { id: "section-01", num: "01", text: "Overview" },
      { id: "section-02", num: "02", text: "Details" },
    ],
    intro: custom.subtitle || paragraphs[0] || custom.title,
    sections: [
      {
        id: "section-01",
        num: "01",
        title: "Overview & Decisions",
        content: [paragraphs[0] || custom.subtitle || "No content."],
      },
      {
        id: "section-02",
        num: "02",
        title: "Technical Notes",
        content: paragraphs.slice(1).length > 0 ? paragraphs.slice(1) : [custom.markdownContent],
      },
    ],
    codeBlock: {
      lang: "csharp",
      caption: "Article Code & Reference",
      badge: "PRODUCTION",
      lines: [
        "// " + custom.title,
        "// Author: Javohir Sadullayev",
        "var status = await DeployAsync();",
      ],
    },
    callout: {
      title: "Key Takeaway",
      text: custom.subtitle || "Production systems require telemetry, clean error handling, and thoughtful caching.",
    },
    results: [
      { value: "100%", label: "reliability" },
      { value: "<50ms", label: "latency" },
    ],
    quote: `"${custom.subtitle || custom.title}"`,
    bullets: [
      "Production-ready architecture with comprehensive logging.",
      "Scalable backend design built with .NET and high performance data layers.",
    ],
    tags: [custom.category, ".NET", "Backend", "Architecture"],
    reactions: {
      likes: 42,
      claps: 58,
      fires: 19,
      bulbs: 23,
      reads: "350+",
      bookmarks: 14,
    },
    comments: [],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const custom = getCustomArticles().find((a) => a.slug === slug);

  if (custom) {
    return {
      title: `${custom.title} · Javohir Sadullayev`,
      description: `${custom.subtitle} — Engineering notes by Javohir Sadullayev (javohir engineer).`,
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  }

  return {
    title: `${SAMPLE_ARTICLE.title} · Javohir Sadullayev`,
    description: `${SAMPLE_ARTICLE.subtitle} — Engineering notes by Javohir Sadullayev (javohir engineer).`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const custom = getCustomArticles().find((a) => a.slug === slug);
  const article = custom ? customToArticleData(custom) : SAMPLE_ARTICLE;

  return (
    <div className="w-full flex flex-col bg-cream min-h-screen">
      {/* 1. Preview Banner */}
      <ArticlePreviewBanner />

      {/* 2. Article Header */}
      <ArticleHeader article={article} />

      {/* 3. Cover Graphic */}
      <ArticleCover cover={article.cover} />

      {/* 4. Article 2-Column Layout */}
      <div className="w-full px-6 sm:px-10 lg:px-14 py-11 sm:py-13 max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-11 items-start">
        {/* Left: Sticky Table of Contents */}
        <ArticleTableOfContents items={article.toc} />

        {/* Right: Article Body, Callouts, Reactions & Comments */}
        <ArticleContent article={article} />
      </div>

      {/* 5. Related Articles */}
      <ArticleRelated />

      {/* 6. Previous / Next Navigation */}
      <ArticlePrevNext />
    </div>
  );
}
