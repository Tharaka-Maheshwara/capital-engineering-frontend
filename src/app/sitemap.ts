import type { MetadataRoute } from "next";
import { buildProjectSlug } from "@/lib/project-url";
import { createAbsoluteUrl, siteUrl } from "@/lib/seo";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type ProjectSummary = {
  id: number;
  title: string;
};

type DesignSummary = {
  id: number;
};

type ArticleSummary = {
  id: number;
};

async function fetchCollection<T>(path: string): Promise<T[]> {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { data?: T[] };
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, designs, articles] = await Promise.all([
    fetchCollection<ProjectSummary>("/api/v1/projects?per_page=1000"),
    fetchCollection<DesignSummary>("/api/v1/designs?per_page=1000"),
    fetchCollection<ArticleSummary>("/api/v1/articles?per_page=1000"),
  ]);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: createAbsoluteUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: createAbsoluteUrl("/services"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: createAbsoluteUrl("/projects"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: createAbsoluteUrl("/designs"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: createAbsoluteUrl("/articles"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: createAbsoluteUrl("/pricing"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: createAbsoluteUrl("/calculator"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: createAbsoluteUrl("/contact"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: createAbsoluteUrl(`/projects/${buildProjectSlug(project)}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...designs.map((design) => ({
      url: createAbsoluteUrl(`/designs/${design.id}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: createAbsoluteUrl(`/articles/${article.id}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

