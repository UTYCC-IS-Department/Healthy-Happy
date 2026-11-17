import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/panel",
          "/en/panel",
          "/my/panel",
          "/api/panel/",
          "/api/ai-chat",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
