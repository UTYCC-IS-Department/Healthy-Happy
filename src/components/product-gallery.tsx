"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/site-data";

export function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = [product.image, ...product.thumbnails].slice(0, 3);
  return (
    <div>
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-[#d9d9d9]">
        <Image
          src={images[activeImage]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            aria-label={`Show image ${index + 1} of ${product.name}`}
            aria-pressed={activeImage === index}
            onClick={() => setActiveImage(index)}
            className={`relative size-20 overflow-hidden rounded-xl border-2 ${activeImage === index ? "border-primary" : "border-transparent"}`}
          >
            <Image src={image} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
