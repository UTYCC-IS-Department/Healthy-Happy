import Link from "next/link";
import { FileText, Package, ShoppingBag, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProductGallery } from "@/components/product-gallery";
import {
  getLocalizedProduct,
  hasLocale,
  type ProductDetailMessages,
  type ProductListMessages,
} from "@/lib/product-catalog";
import { productMedia } from "@/lib/site-data";
import { getMessages } from "@/i18n/get-messages";

export function generateStaticParams() {
  return productMedia.map(({ id }) => ({ id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!hasLocale(locale)) notFound();

  const [messages, detailMessages] = await Promise.all([
    getMessages<ProductListMessages>(locale, "product"),
    getMessages<ProductDetailMessages>(locale, "product-detail"),
  ]);
  const product = getLocalizedProduct(messages, detailMessages, id);
  if (!product) notFound();
  const productListPath = `/${locale}/products`;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={productListPath}
          className="inline-flex items-center text-sm font-bold text-primary underline underline-offset-4"
        >
          ← {detailMessages.returnToProducts}
        </Link>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery product={product} showImageLabel={detailMessages.showImage} />
          <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-secondary">{product.series}</p>
                <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {product.name}
                </h1>
              </div>
              <span className="rounded-full bg-[#eef1e8] px-4 py-2 text-sm font-bold text-primary">
                {product.price}
              </span>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-5 border-t pt-6 text-sm">
              <Detail icon={<Tag />} label={detailMessages.price} text={product.price} />
              <Detail
                icon={<Package />}
                label={detailMessages.ingredients}
                text={product.ingredients}
              />
              <Detail
                icon={<FileText />}
                label={detailMessages.description}
                text={product.description}
              />
              <div className="pt-3">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2f3b22] sm:w-auto"
                >
                  {detailMessages.orderNow}
                </Link>
              </div>
            </div>
            <div className="mt-6 flex justify-end text-secondary">
              <ShoppingBag className="size-6" />
            </div>
          </div>
        </div>
        <div className="my-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-[#eef1e8] px-6 py-5">
          <p className="text-sm font-medium">{detailMessages.newsText}</p>
          <Link
            href={productListPath}
            className="rounded-lg bg-[#6b6b6b] px-4 py-2 text-sm text-white"
          >
            {detailMessages.newsAction} →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon, label, text }: { icon: ReactNode; label: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 size-5 shrink-0 text-secondary">{icon}</span>
      <p>
        <strong className="text-foreground">{label}</strong>
        <span className="block pt-1 leading-relaxed text-muted">{text}</span>
      </p>
    </div>
  );
}
