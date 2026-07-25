"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { assets, products } from "@/lib/site-data";
// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

export function ProductCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-10">
      {/* 1. Left Black Arrow Button */}
      <button
        type="button"
        aria-label="Previous products"
        onClick={() => swiper?.slidePrev()}
        className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 p-2 text-black transition-transform hover:scale-125 focus:outline-none sm:-left-4"
      >
        <ArrowLeft className="size-8 stroke-[2.5]" />
      </button>

      {/* 2. Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        onSwiper={setSwiper}
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        className="w-full py-4"
      >
        {products.map((product, index) => {
          
          const isDarkCard = index % 2 !== 0;

          return (
            <SwiperSlide key={product.id || index}>
            
              <div className="group relative block h-[340px] w-full overflow-hidden rounded-[2rem] shadow-sm sm:h-[380px]">
                
                {/* Background Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

               
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${
                    isDarkCard
                      ? "from-black/70 via-black/40 to-black/60"
                      : "from-white/80 via-white/40 to-transparent"
                  }`}
                />

                {/* Content Overlay */}
                <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-8">
                  
                  
                  <div className="max-w-[85%] sm:max-w-[80%]">
                    <h3
                      className={`text-xl font-black leading-snug sm:text-2xl ${
                        isDarkCard ? "text-white" : "text-black"
                      }`}
                    >
                      {product.name}
                    </h3>
                    <p
                      className={`mt-2.5 line-clamp-5 text-xs font-medium leading-relaxed sm:text-sm ${
                        isDarkCard ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {product.description ||
                        "A pure, health-conscious treat made entirely from organic and wholesome ingredients with no added sugar."}
                    </p>
                  </div>

                  {/*Green Explore Button */}
                  <div className="flex justify-end">
                    <Link
                      href={`/en/products/${product.id}`}
                      className="rounded-full bg-[#4cae4f] px-6 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-[#3d9140] hover:shadow-lg active:scale-95 sm:text-sm"
                    >
                      Explore &gt;
                    </Link>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 3. Right Black Arrow Button */}
      <button
        type="button"
        aria-label="Next products"
        onClick={() => swiper?.slideNext()}
        className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 p-2 text-black transition-transform hover:scale-125 focus:outline-none sm:-right-4"
      >
        <ArrowRight className="size-8 stroke-[2.5]" />
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

