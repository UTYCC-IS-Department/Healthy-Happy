"use client";
import Image from "next/image";
import { useState } from "react";
import { assets } from "@/lib/site-data";
import CertificationBlock from "@/components/certification-block";
const awards = [
  {
    label: "Award-1",
    title: "RESILIENCE FOR WOMEN LED SMEs AWARD by UNDP, UNWOMEN in 2022.",
    description:
      "Recognized for outstanding resilience and leadership as a women-led SME, Healthy & Happy Myanmar received this prestigious award in the capacity enhancement fund category.",
  },
  {
    label: "Award-2",
    title: "The Most Responsible Business Award 2022",
    description:
      "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
  },
];
export default function AwardsPage() {
  const [activeAward, setActiveAward] = useState(0);
  const award = awards[activeAward];
  return (
    <div className="bg-background pb-24">
      <section className="border-b px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Awards &amp; Media</h1>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-6 size-52 rounded-full border-4 border-secondary/30">
            <div className="absolute inset-8 flex items-center justify-center rounded-full bg-secondary shadow-md">
              <span
                className="font-serif text-lg font-bold tracking-wider text-white"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Awards
              </span>
            </div>
          </div>
          <div className="w-full space-y-2">
            {awards.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveAward(index)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium ${activeAward === index ? "bg-secondary text-white shadow" : "border bg-white hover:bg-[#f5f0ee]"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <article className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-base font-bold leading-snug text-primary">{award.title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
              <div className="flex min-h-45 items-center rounded-xl bg-[#f5f0ee] p-6">
                <p className="text-center text-sm leading-relaxed text-muted">
                  {award.description}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="rounded-xl border-2 border-secondary/30 p-4 shadow-md">
                  <Image
                    src={assets.award}
                    alt="Award trophy"
                    width={184}
                    height={250}
                    className="h-auto w-40"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-primary">Certifications</h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CertificationBlock key={index} title={`Certification ${index + 1}`} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl border bg-white px-6 py-4 shadow-sm">
          <Image
            src={assets.logo}
            alt="Healthy & Happy"
            width={48}
            height={48}
            className="size-12 rounded-full border object-contain"
          />
          <div className="h-1 flex-1 rounded-full bg-secondary/20" />
        </div>
      </section>
    </div>
  );
}
