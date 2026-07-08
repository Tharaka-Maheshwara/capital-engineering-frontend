export const siteName = "Capital Engineering Ceylon";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lankacapital.com";

export const defaultDescription =
  "Capital Engineering Ceylon delivers commercial, residential, and industrial construction projects with quality, precision, and trusted delivery.";

export const defaultKeywords = [
  "Capital Engineering Ceylon",
  "construction company Sri Lanka",
  "commercial construction",
  "residential construction",
  "industrial construction",
  "building contractor",
  "engineering services",
];

export function createAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export function stripHtmlTags(value?: string | null) {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value: string, maxLength = 160) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}
