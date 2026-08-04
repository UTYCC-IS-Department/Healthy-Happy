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

const FOLDER_VB = "0 0 500 285";
const FOLDER_PATH =
  "M312 0 L460 0 Q480 0 480 20" +
  " L480 24 A12 12 0 0 0 492 36" +
  " Q500 36 500 56" +
  " L500 265 Q500 285 480 285" +
  " L20 285 Q0 285 0 265" +
  " L0 56 Q0 36 20 36" +
  " L280 36 A12 12 0 0 0 292 24" +
  " L292 20 Q292 0 312 0 Z";

const DOC_VB = "0 0 300 230";
const DOC_PATH =
  "M12 0 L108 0 Q120 0 120 12" +
  " L120 36 Q120 48 132 48" +
  " L300 48" +
  " L300 200 Q300 212 288 212" +
  " L87 212 Q75 212 75 200" +
  " L75 196 Q75 186 63 186" +
  " L12 186 Q0 186 0 174" +
  " L0 12 Q0 0 12 0 Z";

/* ── FolderCard ──────────────────────────────────────────────────
   
──────────────────────────────────────────────────────────────── */
function FolderCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", paddingBottom: "57%" }}>
      {/* SVG backdrop */}
      <svg
        viewBox={FOLDER_VB}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <path fill="#2dc100" d={FOLDER_PATH} />
      </svg>

      {/* ── Title — top-LEFT of body*/}
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "-2%",
          right: "44%",
          height: "11%",
          display: "flex",
          alignItems: "center",
          border: "1.5px solid #2dc100",
          borderRadius: 30,
          justifyContent: "center",
          padding: "4px 10px",
          background: "#2dc100 ",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "clamp(8px, 1.1vw, 12px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </p>
      </div>

      {/* ── Cards row — DocCard + Troph */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "4%",
          right: "4%",
          bottom: "8%",
          display: "flex",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── DocCard ─────────────────────────────────────────────────────
  
──────────────────────────────────────────────────────────────── */
function DocCard({ description }: { description: string }) {
  return (
    <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
      {/* SVG backdrop */}
      <svg
        viewBox={DOC_VB}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <path fill="#8a7b77" d={DOC_PATH} />
      </svg>

      {/* Description text */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "6%",
          right: "6%",
          bottom: "21%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: "clamp(10px,1.3vw,13px)",
            fontWeight: 500,
            lineHeight: 1.5,
            color: "#f0eae8",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── TrophyCard ──────────────────────────────────────────────────
   
──────────────────────────────────────────────────────────────── */
function TrophyCard({ title, awardImage }: { title: string; awardImage: string }) {
  return (
    <div
      style={{
        width: "30%",
        flexShrink: 0,
        background: "#ffffff",
        borderRadius: 10,
        border: "2.5px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        boxShadow: "0 2px 14px rgba(0,0,0,0.22)",
      }}
    >
      <Image
        src={awardImage}
        alt={title}
        width={120}
        height={180}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
      />
    </div>
  );
}

const awards = [
  {
    label: "Award-1",
    title: "RESILIENCE FOR WOMEN LED SMEs AWARD by UNDP, UNWOMEN in 2022.",
    description:
      "Recognized for outstanding resilience and leadership as a women-led SME, Healthy & Happy Myanmar received this prestigious award in the capacity enhancement fund category.",
    image: assets.award1,
  },
  {
    label: "Award-2",
    title: "The Most Responsible Business Award 2022",
    description:
      "An honour celebrating the work of women entrepreneurs creating positive impact for their communities.",
    image: assets.award2,
  },
  {
    label: "Award-3",
    title: "Award Title 3",
    description: "Award description 3.",
    image: assets.award3,
  },
  {
    label: "Award-4",
    title: "Award Title 4",
    description: "Award description 4.",
    image: assets.award4,
  },
  {
    label: "Award-5",
    title: "Award Title 5",
    description: "Award description 5.",
    image: assets.award5,
  },
  {
    label: "Award-6",
    title: "Award Title 6",
    description: "Award description 6.",
    image: assets.award6,
  },
  {
    label: "Award-7",
    title: "Award Title 7",
    description: "Award description 7.",
    image: assets.award7,
  },
  {
    label: "Award-8",
    title: "Award Title 8",
    description: "Award description 8.",
    image: assets.award8,
  },
  {
    label: "Award-9",
    title: "Award Title 9",
    description: "Award description 9.",
    image: assets.award9,
  },
  {
    label: "Award-10",
    title: "Award Title 10",
    description: "Award description 10.",
    image: assets.award10,
  },
  {
    label: "Award-11",
    title: "Award Title 11",
    description: "Award description 11.",
    image: assets.award11,
  },
];

export default function AwardsPage() {
  const [activeAward, setActiveAward] = useState(0);

  const award = awards[activeAward];

  return (
    <div className="bg-background pb-24">
      {/* Header */}
      <section className=" px-4 pt-10 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Awards &amp; Media</h1>
      </section>

      {/* Awards */}
      <section className="mx-auto  px-4 py-12">
        <div className="grid items-center justify-between gap-2 lg:grid-cols-[520px_1fr]">
          {/* Wheel */}
          <div className="flex justify-center ">
            <AwardWheel awards={awards} activeAward={activeAward} onSelect={setActiveAward} />
          </div>

          {/* Detail — folder shape */}
          <div>
            <FolderCard title={award.title}>
              <DocCard description={award.description} />
              <TrophyCard title={award.title} awardImage={award.image} />
            </FolderCard>
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
            src={assets.fda}
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
