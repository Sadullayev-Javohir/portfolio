import fs from "fs";
import path from "path";

export interface CustomProject {
  id: string;
  slug: string;
  name: string;
  title: string;
  year: string;
  chip: string;
  categories: string[];
  period: string;
  description: string;
  highlights: string[];
  bulletColor: string;
  tags: string[];
  caseStudyHref: string;
  externalLabel?: string;
  externalUrl?: string;
  githubUrl?: string;
  // Deep Case Study Fields
  role?: string;
  overview?: string;
  problemStatement?: string;
  whatIBuilt?: string[];
  architecture?: string;
  results?: string[];
  createdAt: string;
}

export interface CustomArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categories?: string[];
  chip?: string;
  bulletColor?: string;
  coverImage?: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  markdownContent: string;
  createdAt: string;
}

export interface CustomPlannedArticle {
  id: string;
  index: string;
  title: string;
  desc: string;
  category: string;
  chipColor: "coral" | "yellow" | "mint" | "lilac";
  createdAt: string;
}

const PROJECTS_FILE = path.join(process.cwd(), "src/data/customProjects.json");
const ARTICLES_FILE = path.join(process.cwd(), "src/data/customArticles.json");
const PLANNED_ARTICLES_FILE = path.join(process.cwd(), "src/data/plannedArticles.json");

function ensureFile(filePath: string, defaultData: string = "[]") {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, defaultData, "utf-8");
    }
  } catch (err) {
    console.error(`Failed to ensure file ${filePath}:`, err);
  }
}

// ----------------- PROJECTS -----------------
export function getCustomProjects(): CustomProject[] {
  ensureFile(PROJECTS_FILE);
  try {
    const raw = fs.readFileSync(PROJECTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading custom projects:", err);
    return [];
  }
}

export function saveCustomProject(project: Partial<CustomProject> & { title: string }): CustomProject {
  ensureFile(PROJECTS_FILE);
  const projects = getCustomProjects();

  const slug =
    project.slug?.trim() ||
    project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const id = project.id || slug || `proj_${Date.now()}`;

  const fullProject: CustomProject = {
    id,
    slug,
    name: project.name || project.title.toUpperCase(),
    title: project.title,
    year: project.year || `${new Date().getFullYear()}`,
    chip: project.chip || "BACKEND · FULL-STACK",
    categories: project.categories && project.categories.length > 0 ? project.categories : ["Backend"],
    period: project.period || `Software Engineer · ${new Date().getFullYear()}`,
    description: project.description || "",
    highlights: project.highlights && project.highlights.length > 0 ? project.highlights : [project.description || "Production system build."],
    bulletColor: project.bulletColor || "bg-yellow",
    tags: project.tags && project.tags.length > 0 ? project.tags : [".NET", "C#"],
    caseStudyHref: `/projects/${slug}`,
    externalLabel: project.externalLabel || (project.externalUrl ? "Live Demo ↗" : undefined),
    externalUrl: project.externalUrl,
    githubUrl: project.githubUrl,
    role: project.role || "Backend Engineer",
    overview: project.overview || project.description,
    problemStatement: project.problemStatement || "",
    whatIBuilt: project.whatIBuilt || [],
    architecture: project.architecture || "",
    results: project.results || [],
    createdAt: project.createdAt || new Date().toISOString(),
  };

  const existingIndex = projects.findIndex((p) => p.id === id || p.slug === slug);
  if (existingIndex >= 0) {
    projects[existingIndex] = { ...projects[existingIndex], ...fullProject };
  } else {
    projects.unshift(fullProject);
  }

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
  return fullProject;
}

export function deleteCustomProject(id: string): boolean {
  ensureFile(PROJECTS_FILE);
  const projects = getCustomProjects();
  const filtered = projects.filter((p) => p.id !== id && p.slug !== id);
  if (filtered.length !== projects.length) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}

// ----------------- ARTICLES -----------------
export function getCustomArticles(): CustomArticle[] {
  ensureFile(ARTICLES_FILE);
  try {
    const raw = fs.readFileSync(ARTICLES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading custom articles:", err);
    return [];
  }
}

export function saveCustomArticle(article: Partial<CustomArticle> & { title: string }): CustomArticle {
  ensureFile(ARTICLES_FILE);
  const articles = getCustomArticles();

  const slug =
    article.slug?.trim() ||
    article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const id = article.id || slug || `art_${Date.now()}`;

  const words = (article.markdownContent || "").trim().split(/\s+/).filter(Boolean).length;
  const readTime = article.readTime || `${Math.max(1, Math.ceil(words / 200))} min read`;

  const fullArticle: CustomArticle = {
    id,
    slug,
    title: article.title,
    subtitle: article.subtitle || "",
    category: article.category || (article.categories && article.categories[0]) || ".NET",
    categories: article.categories && article.categories.length > 0 ? article.categories : [article.category || ".NET"],
    chip: article.chip || "JOURNAL · ARTICLE",
    bulletColor: article.bulletColor || "bg-yellow",
    coverImage: article.coverImage || "",
    publishedDate: article.publishedDate || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase(),
    readTime,
    tags: article.tags && article.tags.length > 0 ? article.tags : [".NET", "Backend"],
    markdownContent: article.markdownContent || "",
    createdAt: article.createdAt || new Date().toISOString(),
  };

  const existingIndex = articles.findIndex((a) => a.id === id || a.slug === slug);
  if (existingIndex >= 0) {
    articles[existingIndex] = { ...articles[existingIndex], ...fullArticle };
  } else {
    articles.unshift(fullArticle);
  }

  fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf-8");
  return fullArticle;
}

export function deleteCustomArticle(id: string): boolean {
  ensureFile(ARTICLES_FILE);
  const articles = getCustomArticles();
  const filtered = articles.filter((a) => a.id !== id && a.slug !== id);
  if (filtered.length !== articles.length) {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}

// ----------------- PLANNED ARTICLES -----------------
export function getPlannedArticles(): CustomPlannedArticle[] {
  ensureFile(PLANNED_ARTICLES_FILE);
  try {
    const raw = fs.readFileSync(PLANNED_ARTICLES_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading planned articles:", err);
    return [];
  }
}

export function savePlannedArticle(
  item: Partial<CustomPlannedArticle> & { title: string; desc: string; category: string }
): CustomPlannedArticle {
  ensureFile(PLANNED_ARTICLES_FILE);
  const items = getPlannedArticles();

  const id = item.id || `planned-${Date.now()}`;
  const chipColor = item.chipColor || "coral";

  const updatedItem: CustomPlannedArticle = {
    id,
    index: item.index || "01",
    title: item.title.trim(),
    desc: item.desc.trim(),
    category: item.category.trim(),
    chipColor,
    createdAt: item.createdAt || new Date().toISOString(),
  };

  const existingIndex = items.findIndex((p) => p.id === id);
  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...updatedItem };
  } else {
    items.push(updatedItem);
  }

  // Normalize indices: 01, 02, 03...
  items.forEach((p, idx) => {
    p.index = String(idx + 1).padStart(2, "0");
  });

  fs.writeFileSync(PLANNED_ARTICLES_FILE, JSON.stringify(items, null, 2), "utf-8");
  return items.find((p) => p.id === id) || updatedItem;
}

export function deletePlannedArticle(id: string): boolean {
  ensureFile(PLANNED_ARTICLES_FILE);
  const items = getPlannedArticles();
  const filtered = items.filter((p) => p.id !== id);
  if (filtered.length !== items.length) {
    // Re-index remaining
    filtered.forEach((p, idx) => {
      p.index = String(idx + 1).padStart(2, "0");
    });
    fs.writeFileSync(PLANNED_ARTICLES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}

