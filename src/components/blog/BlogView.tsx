"use client";

import React, { useState } from "react";
import { BlogHeader } from "./BlogHeader";
import { BlogTools } from "./BlogTools";
import { BlogFeaturedArticle } from "./BlogFeaturedArticle";
import { PlannedArticlesSection } from "./PlannedArticlesSection";
import { LatestArticlesSection } from "./LatestArticlesSection";
import { CustomArticle } from "@/lib/dynamicContent";

interface BlogViewProps {
  customArticles?: CustomArticle[];
}

export function BlogView({ customArticles = [] }: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const featuredArticle = customArticles.length > 0 ? customArticles[0] : null;

  return (
    <div className="flex flex-col w-full">
      <BlogHeader publishedCount={customArticles.length} />
      <BlogTools
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BlogFeaturedArticle article={featuredArticle} />
      <LatestArticlesSection
        customArticles={customArticles}
        searchQuery={searchQuery}
        categoryFilter={selectedCategory}
      />
      <PlannedArticlesSection
        filterText={searchQuery}
        categoryFilter={selectedCategory}
      />
    </div>
  );
}
