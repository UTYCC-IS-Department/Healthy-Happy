"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { assets, products } from "@/lib/site-data";

export function ProductCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous products"
        onClick={() => swiper?.slidePrev()}
        className="absolute left-0 top-1/2 z-10 -translate-x-3 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
      >
        <ChevronLeft className="size-4" />
      </button>
      <Swiper
        modules={[Navigation]}
        onSwiper={setSwiper}
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 2.3 } }}
      >
        {products.slice(0, 3).map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              href={`/en/products/${product.id}`}
              className="group relative block overflow-hidden rounded-xl bg-[#d9d9d9]"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-sm font-bold text-white">{product.series}</span>
                <span className="rounded-md bg-primary px-3 py-1 text-xs font-bold text-white">
                  Explore ↗
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        aria-label="Next products"
        onClick={() => swiper?.slideNext()}
        className="absolute right-0 top-1/2 z-10 translate-x-3 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

export function AwardCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const awards = [
    "The Most Responsible Business Award 2022",
    "RESILIENCE FOR WOMEN LED SMEs AWARD by UNDP, UNWOMEN in 2022",
  ];
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous award"
        onClick={() => swiper?.slidePrev()}
        className="absolute left-0 top-1/3 z-10 -translate-x-3 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
      >
        <ChevronLeft className="size-4" />
      </button>
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={setSwiper}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        <>
          {awards.map((award) => (
            <SwiperSlide key={award}>
              <div className="grid overflow-hidden rounded-2xl md:grid-cols-2">
                <div className="flex aspect-[4/3] items-center justify-center bg-secondary/30 p-8">
                  <Image
                    src={assets.award}
                    alt="Award"
                    width={184}
                    height={250}
                    className="h-44 w-auto object-contain"
                  />
                </div>
                <div className="bg-[#d9d9d9] p-8">
                  <p className="mb-3 text-sm font-bold italic">“{award}”</p>
                  <p className="text-xs leading-relaxed text-muted">
                    Healthy &amp; Happy Myanmar is recognized for outstanding resilience,
                    leadership, and a commitment to nutritious food for Myanmar families.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </>
      </Swiper>
      <button
        type="button"
        aria-label="Next award"
        onClick={() => swiper?.slideNext()}
        className="absolute right-0 top-1/3 z-10 translate-x-3 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
