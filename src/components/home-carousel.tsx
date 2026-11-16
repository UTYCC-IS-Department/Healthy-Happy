"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import enProduct from "../../messages/en/product.json";
import { assets, productMedia } from "@/lib/site-data";
// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

const products = productMedia.map((media) => ({
  ...media,
  ...enProduct.products[media.id as keyof typeof enProduct.products],
}));

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
                      className="rounded-full bg-[#1EB500] px-6 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-[#3d9140] hover:shadow-lg active:scale-95 sm:text-sm"
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
const CAROUSEL_ITEMS = [
  { id: 1, title: "Healthy & Happy award", src: assets.award1 },
  { id: 2, title: "Healthy & Happy award", src: assets.award2 },
  { id: 3, title: "Healthy & Happy award", src: assets.award3 },
  { id: 4, title: "Healthy & Happy award", src: assets.award4 },
  { id: 5, title: "Healthy & Happy award", src: assets.award5 },
  { id: 6, title: "Healthy & Happy award", src: assets.award6 },
  { id: 7, title: "Healthy & Happy award", src: assets.award7 },
  { id: 8, title: "Healthy & Happy award", src: assets.award8 },
  { id: 9, title: "Healthy & Happy award", src: assets.award9 },
  { id: 10, title: "Healthy & Happy award", src: assets.award10 },
  { id: 11, title: "Healthy & Happy award", src: assets.award11 },
];

export default function PerfectCoverCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // ⏱️ Auto-play loop set to 10 seconds (10,000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === CAROUSEL_ITEMS.length - 1 ? 0 : prev + 1));
    }, 10000); // 👈 10 seconds loop time

    return () => clearInterval(timer); // Clean up timer on unmount/interaction
  }, [activeIndex]);

  return (
    <div className="w-full py-10 px-4 overflow-hidden">
      <div className="max-w-5xl  mx-auto relative flex items-center justify-center md:min-h-[420px] sm:m-h-[400px]  min-h-[320px]">
        {CAROUSEL_ITEMS.map((item, index) => {
          // Calculate distance from active slide
          const total = CAROUSEL_ITEMS.length;
          let offset = index - activeIndex;

          // Handle loop offsets
          if (offset < -1) offset += total;
          if (offset > 1) offset -= total;

          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;

          // Hide slides that are further than 1 step away
          if (!isActive && !isLeft && !isRight) return null;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                // Explicit z-index: Center is top (30), sides are behind (10)
                zIndex: isActive ? 30 : 10,
                // Horizontal offset positioning to create the overlap
                transform: `translateX(${
                  isActive ? "0%" : isLeft ? "-35%" : "35%"
                }) scale(${isActive ? 1 : 0.85})`,
              }}
              className={`absolute w-[250px] sm:w-[350px] md:w-[380px] lg:w-[420px] aspect-[362/366] rounded-[32px] bg-white cursor-pointer transition-all duration-500 ease-out overflow-hidden shadow-2xl ${
                isActive
                  ? "translate-x-0 scale-100 opacity-100 "
                  : isLeft
                    ? "-translate-x-[35%] sm:-translate-x-[52%] scale-[0.88] opacity-75 hover:opacity-90"
                    : "translate-x-[35%] sm:translate-x-[52%] scale-[0.88] opacity-75 hover:opacity-90"
              }`}
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain pointer-events-none"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-5 max-w-3xl mx-auto rounded-lg bg-white p-4 text-sm text-gray-700 shadow-lg sm:text-base">
        <p className="font-bold text-left">“The Most Responsible Business Award 2023”</p>
        <span className="text-left text-xs sm:text-sm">
          The most responsible business award in women entrepreneurship program by myanmar women
          entrepreneur network, MILS and USAID in 2023
        </span>
      </div>
    </div>
  );
}



const PRODUCTION_IMAGES = [
  { id: 1, src: assets.product, alt: 'Production 1' },
  { id: 2, src: assets.product, alt: 'Production 2' },
];


// Production Carousel Component
export function ProductionPlaceCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative h-full w-full">

      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={setSwiper}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="h-full w-full overflow-hidden rounded-3xl"
      >
        {PRODUCTION_IMAGES.map((item) => (
          <SwiperSlide key={item.id} className="h-full">

            <div className="relative h-full min-h-[300px] w-full sm:min-h-[380px] lg:min-h-[430px]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

          </SwiperSlide>
        ))}
      </Swiper>


      {/* Bottom Left Arrow */}
      <button
        type="button"
        aria-label="Previous production image"
        onClick={() => swiper?.slidePrev()}
        className="absolute bottom-4 left-4 z-20 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
      >
        <ChevronLeft className="size-5 text-black" />
      </button>


      {/* Bottom Right Arrow */}
      <button
        type="button"
        aria-label="Next production image"
        onClick={() => swiper?.slideNext()}
        className="absolute bottom-4 right-4 z-20 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
      >
        <ChevronRight className="size-5 text-black" />
      </button>

    </div>
  );
}
