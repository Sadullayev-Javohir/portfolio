"use client";

import React, { useState } from "react";
import { BlogHeader } from "./BlogHeader";
import { BlogTools } from "./BlogTools";
import { BlogFeaturedArticle } from "./BlogFeaturedArticle";
import { PlannedArticlesSection } from "./PlannedArticlesSection";
import { LatestArticlesSection } from "./LatestArticlesSection";
import { CustomArticle, CustomPlannedArticle } from "@/lib/dynamicContent";

interface BlogViewProps {
  customArticles?: CustomArticle[];
  plannedArticles?: CustomPlannedArticle[];
}

export function BlogView({
  customArticles = [],
  plannedArticles = [],
}: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const featuredArticle = customArticles.length > 0 ? customArticles[0] : null;

  return (
    <div className="flex flex-col w-full">
      <BlogHeader
        publishedCount={customArticles.length}
        plannedCount={plannedArticles.length}
      />
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
        articles={plannedArticles}
        filterText={searchQuery}
        categoryFilter={selectedCategory}
      />
    </div>
  );
}
