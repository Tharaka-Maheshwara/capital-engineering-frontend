type ProjectUrlSource = {
  id: number | string;
  title: string;
  location: string;
  client: string;
};

function slugifySegment(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function buildProjectSlug(project: ProjectUrlSource): string {
  const readableSegments = [project.title, project.location, project.client]
    .map(slugifySegment)
    .filter(Boolean);

  return [String(project.id), ...readableSegments].join("-");
}

export function buildProjectUrl(project: ProjectUrlSource): string {
  return `/projects/${buildProjectSlug(project)}`;
}

export function extractProjectIdFromSlug(slug: string): string | null {
  const match = slug.match(/^(\d+)/);
  return match ? match[1] : null;
}