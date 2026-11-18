import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { assets, productMedia } from "@/lib/site-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";
const STATIC_LAST_MODIFIED = "2026-11-18";

function buildLocalizedUrl(siteUrl: string, locale: string, path = ""): string {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const base = `${siteUrl}/${locale}${normalizedPath}`;
  return base.endsWith("/") ? base : `${base}/`;
}

function buildAlternateLanguages(siteUrl: string, path = ""): Record<string, string> {
  return {
    en: buildLocalizedUrl(siteUrl, "en", path),
    my: buildLocalizedUrl(siteUrl, "my", path),
  };
}

function toAbsoluteUrl(url: string, siteUrl: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${siteUrl}${cleanPath}`;
}

function sanitizeImages(images: (string | undefined)[], siteUrl: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const img of images) {
    if (!img) continue;
    const abs = toAbsoluteUrl(img, siteUrl);
    if (abs && !seen.has(abs)) {
      seen.add(abs);
      result.push(abs);
    }
  }
  return result;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Top products image URLs for the products overview page
  const featuredProductImages = sanitizeImages(
    productMedia.slice(0, 6).map((p) => p.image),
    SITE_URL
  );

  // Core static routes
  const routes = [
    {
      path: "",
      lastModified: STATIC_LAST_MODIFIED,
      images: sanitizeImages([assets.banner, assets.logo, assets.product], SITE_URL),
    },
    {
      path: "/products",
      lastModified: STATIC_LAST_MODIFIED,
      images: sanitizeImages([assets.banner, ...featuredProductImages], SITE_URL),
    },
    {
      path: "/about",
      lastModified: STATIC_LAST_MODIFIED,
      images: sanitizeImages([assets.banner], SITE_URL),
    },
    {
      path: "/awards",
      lastModified: STATIC_LAST_MODIFIED,
      images: sanitizeImages(
        [
          assets.award1,
          assets.award2,
          assets.award3,
          assets.award4,
          assets.award5,
          assets.award6,
          assets.award7,
          assets.award8,
          assets.fda,
        ],
        SITE_URL
      ),
    },
    {
      path: "/contact",
      lastModified: STATIC_LAST_MODIFIED,
      images: sanitizeImages(
        ["https://res.cloudinary.com/dh6jges3r/image/upload/f_auto,q_auto,c_limit,w_1600/healthy-happy-site/images/healthy-happy/contact_us_1784649192452"],
        SITE_URL
      ),
    },
    {
      path: "/chat",
      lastModified: STATIC_LAST_MODIFIED,
      images: sanitizeImages([assets.banner], SITE_URL),
    },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Generate localized pages
  routes.forEach(({ path, lastModified, images }) => {
    locales.forEach((locale) => {
      entries.push({
        url: buildLocalizedUrl(SITE_URL, locale, path),
        lastModified,
        alternates: {
          languages: buildAlternateLanguages(SITE_URL, path),
        },
        images,
      });
    });
  });

  // Generate individual product detail pages
  productMedia.forEach((product) => {
    const productImages = sanitizeImages(
      [product.image, ...(product.thumbnails || [])],
      SITE_URL
    );
    const productPath = `/products/${product.id}`;

    locales.forEach((locale) => {
      entries.push({
        url: buildLocalizedUrl(SITE_URL, locale, productPath),
        lastModified: STATIC_LAST_MODIFIED,
        alternates: {
          languages: buildAlternateLanguages(SITE_URL, productPath),
        },
        images: productImages,
      });
    });
  });

  return entries;
}
