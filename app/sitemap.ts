import type { MetadataRoute } from "next";

const SITE_URL = "https://nexozdigital.com";

// Single-page site for now — extend as routes (e.g. /servicios) are added.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
