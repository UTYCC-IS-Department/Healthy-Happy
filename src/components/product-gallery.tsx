"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/product-catalog";

export function ProductGallery({
  product,
  showImageLabel,
}: {
  product: Product;
  showImageLabel: string;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const images = [product.image, ...product.thumbnails].slice(0, 3);
  return (
    <div className="rounded-3xl border bg-card p-3 shadow-sm sm:p-4">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-[#eef1e8]">
        <Image
          src={images[activeImage]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex justify-center gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            aria-label={showImageLabel
              .replace("{number}", String(index + 1))
              .replace("{product}", product.name)}
            aria-pressed={activeImage === index}
            onClick={() => setActiveImage(index)}
            className={`relative size-16 overflow-hidden rounded-xl border-2 transition sm:size-20 ${activeImage === index ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"}`}
          >
            <Image src={image} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
