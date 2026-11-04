"use client";

import React, { useState } from "react";
import { BlogHeader } from "./BlogHeader";
import { BlogTools } from "./BlogTools";
import { BlogFeaturedEmpty } from "./BlogFeaturedEmpty";
import { PlannedArticlesSection } from "./PlannedArticlesSection";
import { LatestArticlesSection } from "./LatestArticlesSection";
import { CustomArticle } from "@/lib/dynamicContent";

interface BlogViewProps {
  customArticles?: CustomArticle[];
}

export function BlogView({ customArticles = [] }: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(".NET");

  return (
    <div className="flex flex-col w-full">
      <BlogHeader />
      <BlogTools
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BlogFeaturedEmpty />
      <PlannedArticlesSection
        filterText={searchQuery}
        categoryFilter={selectedCategory}
      />
      <LatestArticlesSection customArticles={customArticles} />
    </div>
  );
}
