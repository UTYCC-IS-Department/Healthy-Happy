import "server-only";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { productMedia, type ProductMedia } from "@/lib/site-data";
import type product from "../../messages/en/product.json";
import type productDetail from "../../messages/en/product-detail.json";

export { hasLocale, locales, type Locale };

export type ProductListMessages = typeof product;
export type ProductDetailMessages = typeof productDetail;

export type ProductId = keyof ProductListMessages["products"];
export type Product = ProductMedia & {
  id: ProductId;
  name: string;
  series: string;
  description: string;
  ingredients: string;
  tags: string[];
  price: string;
};

export function buildLocalizedProducts(product: ProductListMessages, productDetail: ProductDetailMessages): Product[] {
  assertCatalogIntegrity(product, productDetail);

  return productMedia.map((media) => {
    const id = media.id as ProductId;
    const listing = product.products[id];
    const detail = productDetail.products[id];

    return {
      ...media,
      id,
      ...listing,
      ingredients: detail.ingredients,
    };
  });
}

export function getLocalizedProduct(
  product: ProductListMessages,
  productDetail: ProductDetailMessages,
  id: string,
) {
  return buildLocalizedProducts(product, productDetail).find((item) => item.id === id);
}

function assertCatalogIntegrity(product: ProductListMessages, productDetail: ProductDetailMessages) {
  const listingIds = Object.keys(product.products);
  const detailIds = Object.keys(productDetail.products);
  if (listingIds.length !== detailIds.length || listingIds.some((id) => !(id in productDetail.products))) {
    throw new Error("Product and product-detail resources must have matching product IDs");
  }
  for (const media of productMedia) {
    if (!(media.id in product.products)) throw new Error(`Missing product copy for media ID ${media.id}`);
  }
}
