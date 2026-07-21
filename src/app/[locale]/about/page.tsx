import Image from "next/image";
import { FlaskConical, Leaf, Sprout, Users } from "lucide-react";
import type { ReactNode } from "react";
import { assets } from "@/lib/site-data";

const retailers = [
  "Grandmother Hospital",
  "Shan Dila Pharmacy",
  "Ku Kin Tin Pharmacy",
  "Market Plaza",
  "CityMart",
  "Healthy & Happy Store",
  "Family Pharmacy",
  "Local Partners",
];
export default function AboutPage() {
  return (
    <div className="w-full">
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="relative min-h-80 overflow-hidden rounded-2xl shadow-md">
              <Image
                src={assets.product}
                alt="About Healthy & Happy"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain bg-[#d9d9d9]"
              />
            </div>
            <span className="absolute -bottom-4 -right-4 rounded-xl bg-primary p-4 text-sm font-bold text-white shadow-lg">
              Since 2017
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">About us</p>
            <h1 className="mt-4 text-4xl font-bold">Healthy &amp; Happy Myanmar</h1>
            <p className="mt-5 leading-8 text-muted">
              Healthy &amp; Happy is committed to becoming the dependable nutrition partner for
              Myanmar families—creating wholesome food that is honest, accessible, and delicious.
            </p>
            <div id="mission" className="mt-8 grid gap-4">
              <Value
                icon={<Sprout />}
                title="Our Mission"
                text="To make practical, nutritious food a positive part of every family’s daily routine."
              />
              <Value
                icon={<Users />}
                title="Our Vision"
                text="A healthier Myanmar where everyone can choose food that supports their wellbeing."
              />
              <Value
                icon={<Leaf />}
                title="Our Motto"
                text="Daily Nutrition Partner, Every Step of the Way."
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f5f0ee] py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="mt-6 leading-8 text-muted">
              Born from a family’s experience with diabetes, Healthy &amp; Happy was founded to give
              more Myanmar families access to food that feels both caring and practical. We work
              with nutrition in mind, without losing the joy of eating.
            </p>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-2xl">
            <Image
              src={assets.banner}
              alt="Healthy & Happy story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section id="sustainability" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">What We Believe In</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <Value
              icon={<FlaskConical />}
              title="Thoughtful recipes"
              text="Every product is developed with care and nutritional purpose."
            />
            <Value
              icon={<Leaf />}
              title="Natural goodness"
              text="Better everyday ingredients, made for daily enjoyment."
            />
            <Value
              icon={<Users />}
              title="Community first"
              text="Food that is accessible to the people and places we serve."
            />
            <Value
              icon={<Sprout />}
              title="Growing responsibly"
              text="We improve our products and practices one step at a time."
            />
          </div>
        </div>
      </section>
      <section id="locations" className="bg-[#f5f0ee] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">Where to Buy</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Find Healthy &amp; Happy products through our trusted retail partners.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {retailers.map((retailer) => (
              <div
                key={retailer}
                className="rounded-xl border bg-white p-5 text-center text-sm font-semibold"
              >
                {retailer}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function Value({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-2xl border bg-white p-5">
      <span className="text-primary">{icon}</span>
      <h3 className="mt-3 text-lg font-bold text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </article>
  );
}
