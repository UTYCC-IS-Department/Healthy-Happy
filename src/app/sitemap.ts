import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { productMedia } from "@/lib/site-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/about", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/products", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/awards", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/chat", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Generate localized pages
  routes.forEach(({ path, changeFrequency, priority }) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
          ),
        },
      });
    });
  });

  // Generate individual product detail pages
  productMedia.forEach(({ id }) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/products/${id}`])
          ),
        },
      });
    });
  });

  return entries;
}
