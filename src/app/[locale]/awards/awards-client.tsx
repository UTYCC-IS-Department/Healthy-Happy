"use client";

import Image from "next/image";
import { useState } from "react";

import AwardWheel from "@/components/award-wheel";
import CertificationBlock from "@/components/certification-block";
import { assets } from "@/lib/site-data";
import type { AwardsMessages } from "@/i18n/message-types";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const leftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const certificationsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const certificationItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
          gap: 24,
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
    <div
      style={{
        flex: "0 0 58%",
        position: "relative",
        minWidth: 0,
      }}
    >
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
        width: "38%",
        flexShrink: 0,
        background: "#ffffff",
        borderRadius: 15,
        border: "2.5px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
        padding: 8,
        boxShadow: "0 2px 14px rgba(0,0,0,0.22)",
      }}
    >
      {" "}
      <Image src={awardImage} alt={title} fill style={{ objectFit: "contain", padding: 14 }} />{" "}
    </div>
  );
}

const awardImages = [
  assets.award1,
  assets.award2,
  assets.award3,
  assets.award4,
  assets.award5,
  assets.award6,
  assets.award7,
  assets.award8,
  assets.award9,
  assets.award10,
  assets.award11,
];

export default function AwardsClient({ messages }: { messages: AwardsMessages }) {
  const [activeAward, setActiveAward] = useState(0);
  const awards = messages.items.map((item, index) => ({ ...item, image: awardImages[index] }));
  const award = awards[activeAward];

  return (
    <div className="bg-background pb-24">
      {/* Header */}
      <motion.section
        className="px-4 pt-10 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary md:text-4xl">{messages.title}</h1>
      </motion.section>
      {/* Awards */}
      <section className="mx-auto px-4 py-12">
        <div className="grid items-center gap-4 lg:grid-cols-[430px_minmax(0,1fr)]">
          {/* Wheel */}
          <motion.div
            className="flex justify-center"
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-[430px]">
              <AwardWheel awards={awards} activeAward={activeAward} onSelect={setActiveAward} />
            </div>
          </motion.div>

          {/* Folder */}
          <motion.div
            className="-ml-10 mr-20"
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FolderCard title={award.title}>
              <DocCard description={award.description} />
              <TrophyCard title={award.title} awardImage={award.image} />
            </FolderCard>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold text-primary"
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {messages.certifications}
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 gap-5 sm:grid-cols-4"
          variants={certificationsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {messages.certificateLabels.map((label) => (
            <motion.div
              key={label}
              variants={certificationItem}
              whileHover={{
                y: -8,
                scale: 1.04,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 22,
                },
              }}
            >
              <CertificationBlock title={label} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
          <Image
            src={assets.fda}
            alt={messages.brandAlt}
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
