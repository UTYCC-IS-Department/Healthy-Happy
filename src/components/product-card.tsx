import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/en/products/${product.id}`}
      className="group overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        {product.isBestSeller && (
          <span className="absolute left-6 top-4 z-10 rounded-sm  px-2 py-0.5 text-[12px] font-normal text-black">
            Best Seller
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105 shadow-xl rounded-2xl inset-4 m-auto !h-[calc(100%-2rem)] !w-[calc(100%-2rem)]"
        />
      </div>
      <div className="p-3">
        <h2 className="line-clamp-2 text-xs font-bold leading-snug">{product.name}</h2>
        <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-muted">
          {product.description}
        </p>
        <span className="my-2 block rounded-sm bg-[#6b6b6b] px-3 py-0.5 text-[10px] font-bold rounded-full shadow-2xl text-white">
          {product.price}
          
        </span>
        <hr />
        <p className="text-[9px] text-muted">{product.tags.join(" / ")}</p>
      </div>
    </Link>
  );
}
