import Link from "next/link";
import { FileText, Package, ShoppingBag, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProductGallery } from "@/components/product-gallery";
import { getProduct, products } from "@/lib/site-data";

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/en/products"
          className="text-sm font-bold text-primary underline underline-offset-4"
        >
          ← Return to Products
        </Link>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <ProductGallery product={product} />
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <div className="flex-1 rounded-2xl bg-[#d9d9d9] px-5 py-3 text-sm font-bold">
                {product.name}
              </div>
              <div className="rounded-2xl bg-[#d9d9d9] px-4 py-3 text-sm font-bold">
                {product.series}
              </div>
            </div>
            <div className="space-y-4 rounded-2xl bg-[#d9d9d9] p-5 text-sm">
              <Detail icon={<Tag />} label="Price" text={product.price} />
              <Detail icon={<Package />} label="Ingredients" text={product.ingredients} />
              <Detail icon={<FileText />} label="Description" text={product.description} />
              <div className="flex justify-end pt-2">
                <Link
                  href="/en/contact"
                  className="rounded-xl bg-[#6b6b6b] px-6 py-2.5 text-sm font-bold text-white"
                >
                  Order Now
                </Link>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <ShoppingBag className="size-6" />
            </div>
          </div>
        </div>
        <div className="my-12 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#e5e5e5] px-6 py-5">
          <p className="text-sm font-medium">Check Out news for last updated products</p>
          <Link
            href="/en/products"
            className="rounded-lg bg-[#6b6b6b] px-4 py-2 text-sm text-white"
          >
            Check out updated news →
          </Link>
        </div>
      </div>
    </div>
  );
}
function Detail({ icon, label, text }: { icon: ReactNode; label: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 size-4 shrink-0">{icon}</span>
      <p>
        <strong>{label} - </strong>
        <span className="text-muted">{text}</span>
      </p>
    </div>
  );
}
