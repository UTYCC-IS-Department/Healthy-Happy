import "server-only";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { productMedia, type ProductMedia } from "@/lib/site-data";
import type product from "../../messages/en/product.json";
import type productDetail from "../../messages/en/product-detail.json";

export { hasLocale, locales, type Locale };

export type ProductListMessages = typeof product;
export type ProductDetailMessages = typeof productDetail;

type RawProductItem = {
  id: string;
  name?: string;
  pcs?: string;
  series?: string;
  seriesLabel?: string;
  highlight?: string;
  tags?: string[];
  description?: string;
  price?: string;
};

type RawDetailEntry = {
  ingredients?: string;
  [key: string]: unknown;
};

type ProductListingRecord = Record<string, RawProductItem>;
type ProductDetailRecord = Record<string, RawDetailEntry>;

export type ProductId = string;
export type Product = ProductMedia & {
  id: ProductId;
  name: string;
  pcs?: string;
  series: string;
  seriesLabel?: string;
  highlight?: string;
  description: string;
  ingredients: string;
  tags: string[];
  price: string;
};

function normalizeListingMap(msg: ProductListMessages): ProductListingRecord {
  const raw = msg as unknown as {
    products?: ProductListingRecord;
    items?: RawProductItem[];
  };

  if (raw?.products && typeof raw.products === "object") {
    return raw.products;
  }

  const map: ProductListingRecord = {};
  if (Array.isArray(raw?.items)) {
    for (const item of raw.items) {
      if (item?.id) {
        map[item.id] = item;
      }
    }
  }
  return map;
}

function normalizeDetailMap(msg: ProductDetailMessages): ProductDetailRecord {
  const raw = msg as unknown as {
    products?: ProductDetailRecord;
    items?: Array<{ id: string; ingredients?: string; [key: string]: unknown }>;
  };

  if (raw?.products && typeof raw.products === "object") {
    return raw.products;
  }

  const map: ProductDetailRecord = {};
  if (Array.isArray(raw?.items)) {
    for (const item of raw.items) {
      if (item?.id) {
        map[item.id] = item;
      }
    }
  }
  return map;
}

export function assertCatalogIntegrity(
  productMsg: ProductListMessages,
  productDetailMsg: ProductDetailMessages,
): void {
  const listingMap = normalizeListingMap(productMsg);
  const detailMap = normalizeDetailMap(productDetailMsg);

  const listingKeys = listingMap && typeof listingMap === "object" ? Object.keys(listingMap) : [];
  const detailKeys = detailMap && typeof detailMap === "object" ? Object.keys(detailMap) : [];

  if (process.env.NODE_ENV === "development") {
    if (listingKeys.length === 0) {
      console.warn("[product-catalog] No product listing items found.");
    }
    if (detailKeys.length === 0) {
      console.warn("[product-catalog] No product detail items found.");
    }
  }
}

export function buildLocalizedProducts(
  productMsg: ProductListMessages,
  productDetailMsg: ProductDetailMessages,
): Product[] {
  assertCatalogIntegrity(productMsg, productDetailMsg);

  const listingMap = normalizeListingMap(productMsg);
  const detailMap = normalizeDetailMap(productDetailMsg);

  const safeMedia = Array.isArray(productMedia) ? productMedia : [];
  const seenIds = new Set<string>();
  const uniqueMedia = safeMedia.filter((m) => {
    if (!m?.id || seenIds.has(m.id)) return false;
    seenIds.add(m.id);
    return true;
  });

  return uniqueMedia.map((media) => {
    const id = media.id;
    const listing = listingMap[id] ?? { id };
    const detail = detailMap[id] ?? {};
    const mediaAlt = (media as ProductMedia & { alt?: string }).alt;

    return {
      ...media,
      id,
      name: listing.name ?? mediaAlt ?? id,
      pcs: listing.pcs ?? "",
      series: listing.series ?? listing.seriesLabel ?? "",
      seriesLabel: listing.seriesLabel,
      highlight: listing.highlight ?? "",
      description: listing.description ?? "",
      ingredients: typeof detail.ingredients === "string" ? detail.ingredients : "",
      tags: Array.isArray(listing.tags) ? listing.tags : [],
      price: listing.price ?? "",
    };
  });
}

export function getLocalizedProduct(
  productMsg: ProductListMessages,
  productDetailMsg: ProductDetailMessages,
  id: string,
) {
  return buildLocalizedProducts(productMsg, productDetailMsg).find((item) => item.id === id);
}