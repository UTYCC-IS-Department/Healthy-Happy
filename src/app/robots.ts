import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/_next/static/",
          "/_next/image/",
          "/images/",
          "/healthy-happy/",
          "/videos/",
          "/favicon.ico",
        ],
        disallow: [
          "/panel/",
          "/panel",
          "/en/panel/",
          "/en/panel",
          "/my/panel/",
          "/my/panel",
          "/*/panel/",
          "/*/panel",
          "/api/",
          "/api/*",
        ],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "YandexBot"],
        allow: "/",
        disallow: [
          "/panel/",
          "/panel",
          "/*/panel/",
          "/*/panel",
          "/api/",
          "/api/*",
        ],
      },
      {
        // Generative Engine Optimization (GEO) & AI Search discovery (ChatGPT Search, Perplexity, Claude, etc.)
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Amazonbot"],
        allow: "/",
        disallow: [
          "/panel/",
          "/panel",
          "/*/panel/",
          "/*/panel",
          "/api/",
          "/api/*",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
