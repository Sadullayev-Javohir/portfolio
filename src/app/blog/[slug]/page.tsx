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

function extractTocFromMarkdown(content: string) {
  const lines = content.split("\n");
  const toc: { id: string; num: string; text: string }[] = [];
  let count = 1;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") && !trimmed.startsWith("###")) {
      const heading = trimmed.replace(/^##\s+/, "");
      // Clean leading numbering like "01. Title" if present
      const cleanText = heading.replace(/^\d+[\.\)]\s*/, "");
      const slugId =
        "section-" +
        cleanText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      toc.push({
        id: slugId || `section-${count}`,
        num: String(count).padStart(2, "0"),
        text: cleanText || heading,
      });
      count++;
    }
  }

  if (toc.length === 0) {
    toc.push(
      { id: "section-01", num: "01", text: "Maqola Mazmuni" },
      { id: "section-02", num: "02", text: "Xulosalar" }
    );
  }

  return toc;
}

function customToArticleData(custom: CustomArticle): ArticleData {
  const toc = extractTocFromMarkdown(custom.markdownContent || "");

  const categories = custom.categories && custom.categories.length > 0
    ? custom.categories
    : [custom.category || ".NET"];

  return {
    slug: custom.slug,
    title: custom.title,
    subtitle: custom.subtitle || custom.title,
    breadcrumb: {
      parent: "BLOG",
      current: custom.title.toUpperCase(),
    },
    categories: [...categories, ...(custom.tags || [])],
    publishedDate: custom.publishedDate,
    readTime: custom.readTime,
    views: "180+ VIEWS",
    likesCount: 14,
    commentsCount: 2,
    author: {
      name: "Javohir Sadullayev",
      role: "Backend & Systems Engineer",
      bio: "Building high-performance .NET 8 services, distributed architectures, and AI speech systems.",
      avatar: "/javohir.jpg",
    },
    cover: {
      label: custom.chip || custom.category.toUpperCase(),
      code: "JOURNAL",
      caption: custom.subtitle || custom.title,
      stats: [
        { value: custom.readTime, label: "READ TIME" },
        { value: custom.category, label: "CATEGORY" },
      ],
    },
    toc,
    intro: custom.subtitle || custom.title,
    sections: [
      {
        id: "section-01",
        num: "01",
        title: "Overview",
        content: [custom.subtitle || ""],
      },
      {
        id: "section-02",
        num: "02",
        title: "Technical Notes",
        content: [custom.markdownContent || ""],
      },
    ],
    codeBlock: {
      lang: "csharp",
      caption: "Article Reference Code",
      badge: "PRODUCTION",
      lines: [
        "// " + custom.title,
        "// Javohir Sadullayev · Engineering Journal",
        "var result = await ProcessAsync();",
      ],
    },
    callout: {
      title: "Asosiy Xulosa",
      text: custom.subtitle || "Tizim arxitekturasi va samaradorlik yechimlari.",
    },
    results: [
      { value: "100%", label: "uptime" },
      { value: "<25ms", label: "latency" },
    ],
    quote: `"${custom.subtitle || custom.title}"`,
    bullets: [
      "Production-ready backend architecture and event streaming.",
      "Reliable and performant systems built with .NET and high-performance data pipelines.",
    ],
    tags: custom.tags || [custom.category, ".NET", "Backend"],
    customMarkdown: custom.markdownContent,
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
      description: `${custom.subtitle || custom.title} — Engineering notes by Javohir Sadullayev.`,
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  }

  return {
    title: `${SAMPLE_ARTICLE.title} · Javohir Sadullayev`,
    description: `${SAMPLE_ARTICLE.subtitle} — Engineering notes by Javohir Sadullayev.`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const custom = getCustomArticles().find((a) => a.slug === slug);
  if (!custom && slug !== SAMPLE_ARTICLE.slug) {
    notFound();
  }

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
