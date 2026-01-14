import { getGuideBySlug, getGuideSlugs } from "@/lib/content/guides";
import { MetadataRoute } from "next";

const BASE_URL = "https://cloudledger.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const guideEntries: MetadataRoute.Sitemap = getGuideSlugs().map((slug) => {
    const g = getGuideBySlug(slug);

    const lastModified = g?.meta.updatedAt ?? g?.meta.publishedAt ?? undefined;

    return {
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: lastModified ? new Date(lastModified) : undefined,
    };
  });

  return [
    { url: BASE_URL },
    { url: `${BASE_URL}/guides` },
    ...guideEntries,
    { url: `${BASE_URL}/tools` },
    { url: `${BASE_URL}/tools/cloud-cost-estimator` },
    { url: `${BASE_URL}/tools/forecast-cloud-costs` }, // <-- make sure this matches your actual route
    { url: `${BASE_URL}/cases` },
    { url: `${BASE_URL}/resources` },
  ];
}
