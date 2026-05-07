import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/config/site";
import { AVAILABLE_TOOLS } from "@/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteOrigin = getSiteOrigin();
  const lastModified = new Date();

  const staticRoutes = [
    {
      url: siteOrigin,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteOrigin}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ] satisfies MetadataRoute.Sitemap;

  const toolRoutes = AVAILABLE_TOOLS.map((tool) => ({
    url: `${siteOrigin}/${tool.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticRoutes, ...toolRoutes];
}
