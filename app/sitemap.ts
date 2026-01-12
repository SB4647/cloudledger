// Sitemap generator for Next.js app router
// Returns an array of sitemap entries consumed by Next's metadata API.
import { MetadataRoute } from "next";

/**
 * Generate the sitemap entries for the site.
 *
 * Each entry should include a fully-qualified `url` and an optional
 * `lastModified` date. Next will use this data to emit a sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Root homepage
    {
      url: "https://cloudledger.dev",
      lastModified: new Date(),
    },
    // Guides listing page
    {
      url: "https://cloudledger.dev/guides",
      lastModified: new Date(),
    },
    // Specific guide: reducing Azure costs
    {
      url: "https://cloudledger.dev/guides/reduce-azure-costs",
      lastModified: new Date(),
    },
    // Specific guide: forecasting cloud costs
    {
      url: "https://cloudledger.dev/guides/forecast-cloud-costs",
      lastModified: new Date(),
    },
    // Tools listing page
    {
      url: "https://cloudledger.dev/tools",
      lastModified: new Date(),
    },
    // Specific tool: cloud cost estimator
    {
      url: "https://cloudledger.dev/tools/cloud-cost-estimator",
      lastModified: new Date(),
    },
  ];
}
