"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { AwardCarousel, ProductCarousel } from "@/components/home-carousel";
import { assets } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 md:items-center lg:px-12">
        <div>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Healthy &amp;
            <br />
            Happy Myanmar
          </h1>
          <p className="mb-8 text-base text-muted">
            Your Daily Nutrition Partner, Every Step of the Way!
          </p>
          <Link
            href="/en/products"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2d3820]"
          >
            Explore our products <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#d9d9d9]">
          <Image
            src={assets.banner}
            alt="Healthy & Happy products"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>
      {/* ----------------- Feature Categories Section ----------------- */}
<section className="border-y py-10 bg-[#faf8f5]">
  <div className="mx-auto max-w-5xl px-4">
    
    {/* Section Title */}
    <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-black sm:text-3xl">
      Feature Categories
    </h2>
<div className="mb-10 flex justify-center gap-3 overflow-x-auto pb-6 scrollbar-hide sm:gap-5">
  {[
    { name: "Protein Bites", slug: "protein-bites" },
    { name: "No Sugar Cookies", slug: "no-sugar-cookies" },
    { name: "Oat Cookies", slug: "oat-cookies" },
    { name: "Healthy Snacks", slug: "healthy-snacks" },
    { name: "Original Series", slug: "original-series" },
  ].map((category) => (
    <a
      key={category.slug}
      href={`/products?category=${category.slug}`}
      className="group relative flex w-36 shrink-0 flex-col items-center transition-transform duration-300 hover:-translate-y-1 sm:w-40"
    >
      <div className="relative w-full">
        <svg
          viewBox="0 0 160 165"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full drop-shadow-md"
        >
          {/* Green Container Shape with Inverted Smooth Curved Corners */}
          <path
            d="M 16 0 
               H 144 
               A 16 16 0 0 1 160 16 
               V 108 
               A 16 16 0 0 1 144 124 
               A 12 12 0 0 0 132 136 
               V 149 
               A 16 16 0 0 1 116 165 
               H 44 
               A 16 16 0 0 1 28 149 
               V 136 
               A 12 12 0 0 0 16 124 
               A 16 16 0 0 1 0 108 
               V 16 
               A 16 16 0 0 1 16 0 Z"
            fill="#4cae4f"
          />
        </svg>
        <div className="absolute left-[7%] top-[6%] h-[68%] w-[86%] overflow-hidden rounded-xl bg-white">
          <Image
            src={assets.product}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 144px, 160px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="absolute bottom-[4%] left-0 right-0 flex items-center justify-center px-2">
          <span className="whitespace-nowrap text-center text-[11px] font-bold text-white sm:text-xs">
            {category.name}
          </span>
        </div>
      </div>
    </a>
  ))}
</div>
    <ProductCarousel />

  </div>
</section>
      <section className="border-b py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 md:grid-cols-2 lg:px-12">
          <div>
            <Image
              src={assets.logo}
              alt="Healthy & Happy"
              width={76}
              height={40}
              className="mb-3 h-8 w-auto"
            />
            <h2 className="mb-4 text-2xl font-bold leading-snug">
              The Journey of
              <br />
              Happy &amp; Healthy
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-muted">
              Healthy &amp; Happy began with a deeply personal story. One of our co-founders
              experienced the heartbreaking loss of her father to the complications of diabetes,
              unable to access the nutritional support he needed during his final years.
            </p>
            <p className="mb-5 text-sm leading-relaxed text-muted">
              This profound loss ignited a passion to make honest, nourishing food accessible to
              families throughout Myanmar.
            </p>
            <div className="flex gap-4 text-xs font-bold text-primary">
              <Link href="/en/about">Our Story</Link>
              <Link href="/en/products">Our Products</Link>
              <Link href="/en/about">Our Brands</Link>
            </div>
          </div>
          <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={assets.banner}
                alt="Healthy & Happy journey"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/6] overflow-hidden rounded-xl bg-[#d9d9d9]">
              <Image
                src={assets.product}
                alt="Healthy & Happy product"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <p className="text-[10px] text-muted">
              Our story is one of family, perseverance, and commitment to the communities we serve.
            </p>
          </div>
        </div>
      </section>
      <section className="border-b bg-[#f5f0ee] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <h2 className="mb-8 text-xl font-bold">Awards &amp; Recognitions</h2>
          <AwardCarousel />
        </div>
      </section>
      <section className="border-b py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 md:grid-cols-2 md:items-center lg:px-12">
          <div>
            <Image
              src={assets.logo}
              alt="Healthy & Happy"
              width={76}
              height={40}
              className="mb-3 h-8 w-auto"
            />
            <h2 className="mb-4 text-2xl font-bold leading-snug">
              Production Place
              <br />
              Where Our Product Come To Life
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Our flagship products, including Protein Bite Cookies, are carefully crafted to
              support balanced nutrition. Every recipe is developed to be nutritious, delicious, and
              accessible for people with diabetes and anyone seeking a balanced lifestyle.
            </p>
            <Link
              href="/en/about#locations"
              className="mt-6 inline-block text-xs font-bold text-primary"
            >
              See More →
            </Link>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#d9d9d9]">
              <Image
                src={assets.product}
                alt="Healthy & Happy production"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <Link
                href="/en/contact"
                className="inline-block rounded-md bg-primary px-4 py-2 text-xs font-bold text-white"
              >
                Get Location Detail →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
function ContactSection() {
  return (
    <section className="bg-[#f4f2eb] pt-12 pb-16 font-['Roboto',sans-serif]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
          Contact Us
        </h2>

        {/* Top Grid: Left Card & Form */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Gray Container Card */}
          <div className="flex items-center justify-center rounded-2xl bg-[#dadada] p-8 text-center sm:p-12">
            <h3 className="max-w-md text-xl font-extrabold leading-snug text-black sm:text-2xl">
              Whether you&apos;re curious, dreaming up something custom, or
              simply want to connect, we&apos;d love to hear from you
            </h3>
          </div>

          {/* Right Form */}
          <form
            className="flex flex-col space-y-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder="First Name"
                className="w-full rounded-2xl bg-[#dadada] px-5 py-3.5 text-sm font-bold text-black placeholder:font-bold placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                required
                placeholder="Last Name"
                className="w-full rounded-2xl bg-[#dadada] px-5 py-3.5 text-sm font-medium text-black placeholder:font-bold placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <input
              required
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl bg-[#dadada] px-5 py-3.5 text-sm font-medium text-black placeholder:font-bold placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Asymmetric Message Input Box matching photo 1 */}
            <textarea
              required
              rows={4}
              placeholder="Message"
              className="w-full resize-none rounded-t-10xl rounded-bl-[3.5rem] rounded-tr-[3.5rem] bg-[#dadada] px-5 py-4 text-sm font-medium text-black placeholder:font-bold placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Submit Pill Button */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#2a2f3a] px-7 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-black"
              >
                Submit <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Quick Contact Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {/* Social Links Card */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#dadada] p-4 lg:col-span-4">
            <span className="mb-2 text-xs font-bold text-black">
              Follow Us On
            </span>
            <div className="flex items-center gap-6 text-xl text-black">
              <a href="#" aria-label="Facebook" className="hover:opacity-80">
                <SiFacebook />
              </a>
              <a href="#" aria-label="WhatsApp" className="hover:opacity-80">
                <SiWhatsapp />
              </a>
              <a href="#" aria-label="TikTok" className="hover:opacity-80">
                <SiTiktok />
              </a>
            </div>
          </div>

          {/* Call Us Box */}
          <div className="flex items-center gap-3 rounded-2xl bg-[#dadada] p-4 lg:col-span-2">
            <Phone className="h-5 w-5 shrink-0  text-black" />
            <div className="text-xs">
              <span className="block font-extrabold text-black">Call Us</span>
              <span className="font-bold text-black">+95 969650030</span>
            </div>
          </div>

          {/* Email Us Box */}
          <div className="flex items-center gap-3 rounded-2xl bg-[#dadada] p-4 lg:col-span-3">
            <Mail className="h-5 w-5 shrink-0  text-black" />
            <div className="text-xs">
              <span className="block font-extrabold text-black">Email Us</span>
              <span className="break-all font-bold text-black">
                healthyandhappygroup2017@gmail.com
              </span>
            </div>
          </div>

          {/* Location Box */}
          <div className="flex items-center gap-3 rounded-2xl bg-[#dadada] p-4 lg:col-span-3">
            <MapPin className="h-5 w-5 shrink-0  text-black" />
            <div className="text-xs">
              <span className="block font-extrabold text-black">Location</span>
              <span className="font-bold leading-tight text-black">
                လိပ်စာ - ၇၅ လမ်း၊ ၁၁၁ နှင့် ၁၁၄ ကြား၊ ပြည်ကြီးတံခွန်မြို့နယ်၊ မန္တလေးတိုင်းဒေသကြီး၊ မြန်မာ။
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}