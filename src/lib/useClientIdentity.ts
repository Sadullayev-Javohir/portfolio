"use client";

export function getOrCreateAuthorToken(): string {
  if (typeof window === "undefined") return "";
  const KEY = "blog_author_token";
  let token = localStorage.getItem(KEY);
  if (!token) {
    token = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    try {
      localStorage.setItem(KEY, token);
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
  }
  return token;
}

export function getSavedAuthorName(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("blog_author_name") || "";
}

export function saveAuthorName(name: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("blog_author_name", name.trim());
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
}
