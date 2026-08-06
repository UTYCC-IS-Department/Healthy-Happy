import Image from "next/image";
import Link from "next/link";
import type { Locale, Product } from "@/lib/product-catalog";

export function ProductCard({
  product,
  locale,
  bestSellerLabel,
}: {
  product: Product;
  locale: Locale;
  bestSellerLabel: string;
}) {
  return (
    <Link
      href={`/${locale}/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative m-3 aspect-square overflow-hidden rounded-2xl bg-[#eef1e8]">
        {product.isBestSeller && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-primary shadow-sm">
            {bestSellerLabel}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
        <p className="text-xs font-semibold text-secondary">{product.series}</p>
        <h2 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-foreground">
          {product.name}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#eef1e8] px-2.5 py-1 text-[11px] font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <span className="text-base font-bold text-primary">{product.price}</span>
          <span
            aria-hidden="true"
            className="text-sm font-semibold text-primary transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
