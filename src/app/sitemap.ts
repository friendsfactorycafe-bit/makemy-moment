import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";

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

  for (const city of cities) {
    routes.push({
      url: `${BASE_URL}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const pkg of city.venue.packages) {
      routes.push({
        url: `${BASE_URL}/${city.slug}/${pkg.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return routes;
}
