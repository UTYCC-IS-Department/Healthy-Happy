import { notFound } from "next/navigation";
import { ProductsClient } from "./products-client";
import { buildLocalizedProducts, hasLocale, type ProductListMessages } from "@/lib/product-catalog";
import type { ProductDetailMessages } from "@/lib/product-catalog";
import { getMessages } from "@/i18n/get-messages";

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [messages, detailMessages] = await Promise.all([
    getMessages<ProductListMessages>(locale, "product"),
    getMessages<ProductDetailMessages>(locale, "product-detail"),
  ]);
  return <ProductsClient locale={locale} products={buildLocalizedProducts(messages, detailMessages)} messages={messages} />;
}
