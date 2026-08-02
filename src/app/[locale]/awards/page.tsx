// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { assets } from "@/lib/site-data";
// import CertificationBlock from "@/components/certification-block";
// import AwardWheel from "@/components/award-wheel";
// const awards = [
//   {
//     label: "Award-1",
//     title: "RESILIENCE FOR WOMEN LED SMEs AWARD by UNDP, UNWOMEN in 2022.",
//     description:
//       "Recognized for outstanding resilience and leadership as a women-led SME, Healthy & Happy Myanmar received this prestigious award in the capacity enhancement fund category.",
//   },
//   {
//     label: "Award-2",
//     title: "The Most Responsible Business Award 2022",
//     description:
//       "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
//   },
//   {
//     label: "Award-3",
//     title: "The Most Responsible Business Award 2022",
//     description:
//       "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
//   },
//   {
//     label: "Award-4",
//     title: "The Most Responsible Business Award 2022",
//     description:
//       "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
//   },
//   {
//     label: "Award-5",
//     title: "The Most Responsible Business Award 2022",
//     description:
//       "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
//   },
//   {
//     label: "Award-6",
//     title: "The Most Responsible Business Award 2022",
//     description:
//       "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
//   },
//   {
//     label: "Award-7",
//     title: "The Most Responsible Business Award 2022",
//     description:
//       "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
//   },
//   {
//     label: "Award-8",
//     title: "The Most Responsible Business Award 2022",
//     description:
//       "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
//   },
// ];
// export default function AwardsPage() {
//   const [activeAward, setActiveAward] = useState(0);
//   const award = awards[activeAward];
//   return (
//     <div className="bg-background pb-24">
//       <section className="border-b px-4 py-12 text-center">
//         <h1 className="text-3xl font-bold text-primary md:text-4xl">Awards &amp; Media</h1>
//       </section>
//       <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[620px_1fr]">
//         {/* Award Wheel */}
//         <div className="flex justify-center">
//           <AwardWheel awards={awards} activeAward={activeAward} onSelect={setActiveAward} />
//         </div>

//         {/* Detail */}
//         <div>
//           <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
//             <h2 className="mb-8 text-2xl font-bold leading-relaxed text-primary">{award.title}</h2>

//             <div className="grid items-center gap-8 lg:grid-cols-2">
//               <div className="rounded-2xl bg-[#F6F3F1] p-8">
//                 <p className="leading-8 text-muted">{award.description}</p>
//               </div>

//               <div className="flex justify-center">
//                 <Image
//                   src={assets.award}
//                   alt={award.title}
//                   width={260}
//                   height={340}
//                   className="h-auto w-56"
//                 />
//               </div>
//             </div>
//           </article>
//         </div>
//       </section>
//       <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
//         <h2 className="mb-8 text-center text-2xl font-bold text-primary">Certifications</h2>

//         <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <CertificationBlock key={index} title={`Certification ${index + 1}`} />
//           ))}
//         </div>

//         <div className="mt-8 flex items-center gap-4 rounded-xl border bg-white px-6 py-4 shadow-sm">
//           <Image
//             src={assets.logo}
//             alt="Healthy & Happy"
//             width={48}
//             height={48}
//             className="size-12 rounded-full border object-contain"
//           />
//           <div className="h-1 flex-1 rounded-full bg-secondary/20" />
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";

import AwardWheel from "@/components/award-wheel";
import CertificationBlock from "@/components/certification-block";
import { assets } from "@/lib/site-data";

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
  {
    label: "Award-3",
    title: "Award Title 3",
    description: "Award description 3.",
  },
  {
    label: "Award-4",
    title: "Award Title 4",
    description: "Award description 4.",
  },
  {
    label: "Award-5",
    title: "Award Title 5",
    description: "Award description 5.",
  },
  {
    label: "Award-6",
    title: "Award Title 6",
    description: "Award description 6.",
  },
  {
    label: "Award-7",
    title: "Award Title 7",
    description: "Award description 7.",
  },
  {
    label: "Award-8",
    title: "Award Title 8",
    description: "Award description 8.",
  },
  {
    label: "Award-9",
    title: "Award Title 9",
    description: "Award description 9.",
  },
];

export default function AwardsPage() {
  const [activeAward, setActiveAward] = useState(0);

  const award = awards[activeAward];

  return (
    <div className="bg-background pb-24">
      {/* Header */}
      <section className="border-b px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Awards &amp; Media</h1>
      </section>

      {/* Awards */}
      <section className="mx-auto  px-4 py-12">
        <div className="grid items-center justify-between gap-2 lg:grid-cols-[650px_1fr]">
          {/* Wheel */}
          <div className="flex justify-center ">
            <AwardWheel awards={awards} activeAward={activeAward} onSelect={setActiveAward} />
          </div>

          {/* Detail */}
          <div>
            <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <h2 className="mb-8 text-2xl font-bold leading-relaxed text-primary">
                {award.title}
              </h2>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="flex items-center rounded-2xl bg-[#F7F3F1] p-8">
                  <p className="leading-8 text-muted">{award.description}</p>
                </div>

                <div className="flex justify-center">
                  <Image
                    src={assets.award}
                    alt={award.title}
                    width={250}
                    height={320}
                    className="h-auto w-52 object-contain"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-primary">Certifications</h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CertificationBlock key={index} title={`Certification ${index + 1}`} />
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
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
