import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { allKeywordPages } from "@/data/keywords";

const BASE_URL = "https://bookmymoment.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // City pages
  for (const city of cities) {
    routes.push({
      url: `${BASE_URL}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Package pages
    for (const pkg of city.venue.packages) {
      routes.push({
        url: `${BASE_URL}/${city.slug}/${pkg.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Keyword SEO pages
  for (const kp of allKeywordPages) {
    routes.push({
      url: `${BASE_URL}/${kp.citySlug}/${kp.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
