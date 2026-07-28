"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Mail, MapPin, Phone, RefreshCcw, Send } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import PerfectCoverCarousel, { ProductCarousel, ProductionPlaceCarousel } from "@/components/home-carousel";
import { assets } from "@/lib/site-data";
import { useEffect, useState } from "react";

interface Feature {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  title: string;
  content: string;
}

const JourneyAndHappyFeatures: Feature[] = [
  {
    id: "story",
    label: "Our Story",
    icon: BookOpen,
    href: "/en/about",
    title: "Our Story",
    content:
      "Established in 2017 in the vibrant city of Mandalay, Myanmar, Healthy & Happy Myanmar Co., Ltd. was founded by three visionary women entrepreneurs together with a pioneering nutritionist. Our mission is to revolutionize health and wellness in Myanmar by creating innovative, plant-based nutritional products that promote a balanced diet while supporting sustainable agricultural practices.",
  },
  {
    id: "products",
    label: "Our Products",
    icon: RefreshCcw,
    href: "/en/products",
    title: "Our Products",
    content:
      "We offer a carefully crafted selection of organic, nutrient-dense snacks and plant-based foods. Made from locally sourced, high-quality ingredients, every product is formulated to support your wellness journey while keeping taste rich and delicious without added artificial preservatives.",
  },
  {
    id: "brands",
    label: "Our Brands",
    icon: Award,
    href: "/en/about",
    title: "Our Brands",
    content:
      "Under Healthy & Happy Myanmar, our signature product lines lead the local health movement. Recognized across major retail channels and health forums, our brand represents reliability, wholesome nutrition, and a firm commitment to clean eating for every household.",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-rotate tabs every 5 seconds (5000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % JourneyAndHappyFeatures.length);
    }, 15000); // 15 seconds for each tab

    return () => clearInterval(timer);
  }, []);

  const currentTab = JourneyAndHappyFeatures[activeTab];

  return (
    <div className="w-full bg-white">

      {/* hero section? */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 md:items-center lg:px-12">
        <div className="max-w-xl">
          <h1 className="mb-8 text-[8rem] font-extrabold leading-[1.15] tracking-tight text-black md:text-6xl">
            Healthy &amp;
            <br />
            Happy Myanmar
          </h1>
          <p className="mb-10 text-muted text-md leading-relaxed">
            Your Daily Nutrition Partner, Every Step of the Way!
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-5 lg:px-12">
          <div className="md:col-span-2">
            <div className="md:mb-6 mb-2 flex items-center gap-3 md:gap-1">
              <Image
                src={assets.logo}
                alt="Healthy & Happy"
                width={115}
                height={61}
                className="mb-3 lg:h-12 md:h-9 w-auto h-10"
              />
              <h2 className="md:mb-4 mb-2 lg:text-3xl md:text-2xl text-2xl font-extrabold tracking-wide text-black">
                The Journey of <span className="inline-block md:hidden">Happy &amp; Healthy</span>
                <br />
                <span className="hidden md:block">Happy &amp; Healthy</span>
              </h2>
            </div>
            <p className="mb-3 lg:text-sm md:text-xs text-xs font-medium leading-relaxed text-muted ">
              Healthy &amp; Happy began with a deeply personal story. One of our co-founders
              experienced the heartbreak of losing her father to cancer due to a lack of access to
              nutritious food.
            </p>
            <p className="md:mb-5 mb-1 lg:text-sm md:text-xs text-xs font-medium leading-relaxed text-muted">
              This profound loss ignited a passion to ensure that no one else would suffer from
              preventable health issues caused by poor nutrition. Recognizing the growing prevalence
              of diabetes and other health conditions in our community, we committed ourselves to
              making a meaningful difference through accessible, honest, and nourishing food.
            </p>
          </div>
          <div className="space-y-3 md:col-span-3">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:h-80 grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="relative w-full h-37.5 sm:h-45.5 rounded-2xl overflow-hidden bg-[#d9d9d9]">
                  <Image
                    src={assets.banner}
                    alt="Healthy & Happy journey"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full h-37.5 sm:h-45.5 rounded-2xl overflow-hidden bg-[#d9d9d9]">
                  <Image
                    src={assets.banner}
                    alt="Healthy & Happy journey"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#d9d9d9]">
                <Image
                  src={assets.product}
                  alt="Healthy & Happy product"
                  fill
                  className=" w-full h-full "
                />
              </div>
            </div>
            {/* <p className="text-[10px] text-muted">
              Our story is one of family, perseverance, and commitment to the communities we serve.
            </p> */}
          </div>
        </div>
        <div className="mx-auto grid md:max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-6 lg:px-12 mt-7 md:mt-12 lg:mt-7">
          <div className="flex items-center  gap-2 text-xs font-bold text-primary lg:col-span-2">
            {JourneyAndHappyFeatures.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = index === activeTab;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 lg:text-[10px] xl:text-[12px] text-[12px] rounded-full lg:px-2 xl:px-3  px-3 py-2 cursor-pointer transition-all duration-300 ${isActive
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-gray-200 text-gray-800 hover:bg-amber-50"
                    }`}
                >
                  <Icon className="lg:size-3.5 size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="space-y-3  lg:col-span-4 backdrop:blur-sm bg-[#2dc100] p-4 px-5 rounded-3xl text-white shadow-xl shadow-[#2dc100]/30 border border-white/20">
            {/* title */}
            <h4 className="text-lg font-bold">{currentTab.title}</h4>
            <p className="text-[13px] font-medium text-gray-100 leading-4.5 -mt-3 relative">
              {currentTab.content}
              <Link
                href={currentTab.href}
                className="ml-2 text-white bg-black absolute -bottom-8 right-5 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-600 transition-colors text-md font-semibold"
              >
                See More
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-[#f5f0ee] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <h2 className=" text-3xl font-bold">Awards &amp; Recognitions</h2>
          <PerfectCoverCarousel />
        </div>
      </section>

      {/* production place section */}
      <section className="border-b py-12">

        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[40%_30%_30%] lg:px-10">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[1.6875rem] font-extrabold leading-tight">
              Production Place
              <br />
              Where Our Product Come To Life
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-7 text-muted">
              Our flagship products, including Protein Bite Cookies, are meticulously crafted to
              provide balanced nutrition. Each cookie is made using locally sourced ingredients such
              as chickpeas, peanuts, and rolled oats ensuring they are both nutritious and
              delicious. These products are not only suitable for people with diabetes, but also
              serve as a convenient and healthy snack for anyone seeking to maintain a balanced
              lifestyle.
            </p>
            <Link
              href="/en/about#locations"
              className="mt-10 inline-flex w-fit items-center rounded-full bg-[#2dc100] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d3820]"
            >
              See More
              <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Production Place Carousel */}
          <div className="relative">
            <div className='relative min-h-[430px]'>
              <ProductionPlaceCarousel />
            </div>
          </div>

          {/* Map & Location Button */}
          <div className="flex h-[430px] flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.0!2d96.08!3d21.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6e3a7af05de5%3A0x4e1e5e4c5c5a5c5a!2sYatanarpon%20Cyber%20City!5e0!3m2!1sen!2smm!4v1620000000000!5m2!1sen!2smm"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="Location map"
              />
            </div>

            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[#2dc100] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-green-600"
            >
              See Location details
              <span className="ml-2">→</span>
            </Link>
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
              Whether you&apos;re curious, dreaming up something custom, or simply want to connect,
              we&apos;d love to hear from you
            </h3>
          </div>

          {/* Right Form */}
          <form className="flex flex-col space-y-4" onSubmit={(event) => event.preventDefault()}>
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
            <span className="mb-2 text-xs font-bold text-black">Follow Us On</span>
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
                လိပ်စာ - ၇၅ လမ်း၊ ၁၁၁ နှင့် ၁၁၄ ကြား၊ ပြည်ကြီးတံခွန်မြို့နယ်၊ မန္တလေးတိုင်းဒေသကြီး၊
                မြန်မာ။
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
