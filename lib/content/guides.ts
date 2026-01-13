// Node.js filesystem + path utilities (server-only)
import fs from "node:fs";
import path from "node:path";

// Parses frontmatter from MDX files
import matter from "gray-matter";

// Estimates reading time from text
import readingTime from "reading-time";

// Absolute path to where guide MDX files live
const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

/**
 * Required frontmatter every guide must provide
 */
export type GuideFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
};

/**
 * Metadata the app actually uses
 */
export type GuideMeta = GuideFrontmatter & {
  slug: string;
  readingMinutes: number;
};

/**
 * Returns all guide slugs based on filenames
 * e.g. forecast-cloud-costs.mdx → forecast-cloud-costs
 */
export function getGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];

  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Loads a single guide’s metadata + raw content
 */
export function getGuideBySlug(slug: string) {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  // Read and parse the MDX file
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  // Validate required frontmatter
  const fm = parsed.data as Partial<GuideFrontmatter>;
  if (!fm.title || !fm.description || !fm.publishedAt) {
    throw new Error(`Guide "${slug}" missing required frontmatter`);
  }

  // Compute reading time from content body
  const rt = readingTime(parsed.content);

  const meta: GuideMeta = {
    title: fm.title,
    description: fm.description,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    tags: fm.tags ?? [],
    slug,
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
  };

  return { meta, content: parsed.content };
}

/**
 * Returns metadata for all guides (used for /guides index)
 */
export function getAllGuidesMeta(): GuideMeta[] {
  return getGuideSlugs()
    .map((slug) => getGuideBySlug(slug)?.meta)
    .filter(Boolean) as GuideMeta[];
}
