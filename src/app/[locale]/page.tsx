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
      {/* hero section? */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 md:items-center lg:px-12">

        <div className="max-w-xl">
          <h1 className="mb-8 text-5xl font-extrabold leading-[1.15] tracking-tight text-black md:text-6xl">
            Healthy &amp;
            <br />
            Happy Myanmar
          </h1>
          <p className="mb-10 text-muted text-md leading-relaxed">
            Your Daily Nutrition Partner,Every Step of the Way!
          </p>
          <Link
            href="/en/products"
            className="inline-flex items-center gap-2 rounded-full bg-[#2dc100] px-8 py-4 text-sm font-bold text-white hover:bg-[#2d3820]"
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

      <section className="border-y py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <h2 className="mb-6 text-xl font-bold">Feature Categories</h2>
          <div className="mb-6 flex gap-3 overflow-x-auto pb-1">
            {[
              "Protein Bites",
              "No Sugar Cookies",
              "Oat Cookies",
              "Healthy Snacks",
              "Original Series",
            ].map((category) => (
              <div key={category} className="w-28 shrink-0 text-center">
                <div className="mb-1 h-16 rounded-lg bg-secondary/50" />
                <span className="text-[11px] font-medium">{category}</span>
              </div>
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

      {/* production place section */}
      <section className="border-b py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[40%_30%_30%] lg:px-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-[1.6875rem] font-extrabold leading-tight">
              Production Place
              <br />
              Where Our Product Come To Life
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-7 text-muted">
              Our flagship products, including Protein Bite Cookies, are
              meticulously crafted to provide balanced nutrition. Each cookie is
              made using locally sourced ingredients such as chickpeas, peanuts,
              and rolled oats ensuring they are both nutritious and delicious.
              These products are not only suitable for people with diabetes, but
              also serve as a convenient and healthy snack for anyone seeking to
              maintain a balanced lifestyle.
            </p>
            <Link
              href="/en/about#locations"
              className="mt-10 inline-flex w-fit items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d3820]"
            >
              See More
              <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="relative">
            <div className="relative h-full overflow-hidden rounded-3xl bg-[#d9d9d9]">
              <Image
                src={assets.product}
                alt="Production"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="relative h-[430px] overflow-hidden rounded-3xl bg-[#cbb8a3]">
              <Image
                src={assets.map} 
                alt="Map"
                fill
                className="object-cover"
              />
            </div>

            <Link
              href="/en/contact"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-green-600"
            >
              See Location details
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
      <ContactSection />
      <div className="border-t bg-[#d9d9d9]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-8 lg:px-12">
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
function ContactSection() {
  return (
    <section className="border-b bg-[#f5f5f5] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <h2 className="mb-8 text-center text-xl font-bold">Contact Us</h2>
        <div className="mb-8 grid gap-10 md:grid-cols-2">
          <p className="self-center text-base font-medium leading-relaxed">
            Whether you&apos;re curious, dreaming up something curious, or simply want to connect,
            we&apos;d love to hear from you.
          </p>
          <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="First Name"
                className="rounded border bg-white px-3 py-2 text-sm"
              />
              <input
                required
                placeholder="Last Name"
                className="rounded border bg-white px-3 py-2 text-sm"
              />
            </div>
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full rounded border bg-white px-3 py-2 text-sm"
            />
            <textarea
              required
              rows={4}
              placeholder="Message"
              className="w-full resize-none rounded border bg-white px-3 py-2 text-sm"
            />
            <div className="flex justify-end">
              <button className="flex items-center gap-2 rounded bg-primary px-5 py-2 text-sm font-bold text-white">
                Submit <Send className="size-3.5" />
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-wrap items-center gap-6 rounded-xl border bg-white p-4 text-sm">
          <span className="flex items-center gap-2">
            <Phone className="size-4 text-primary" />
            +95 969650030
          </span>
          <span className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            healthyandhappygroup2017@gmail.com
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            Yatanarpon Cyber City, Myanmar
          </span>
          <span className="ml-auto flex gap-3 text-primary">
            <SiFacebook />
            <SiTiktok />
            <SiInstagram />
            <SiWhatsapp />
          </span>
        </div>
      </div>
    </section>
  );
}
