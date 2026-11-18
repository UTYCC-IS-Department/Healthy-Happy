"use client";

import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";

import AwardWheel from "@/components/award-wheel";
import CertificationBlock from "@/components/certification-block";
import { assets } from "@/lib/site-data";
import type { AwardsMessages } from "@/i18n/message-types";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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
    x: -36,
    scale: 0.97,
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
    x: 36,
    scale: 0.97,
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
    y: 24,
    scale: 0.97,
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
function FolderCard({
  title,
  children,
  onTap,
}: {
  title: string;
  children: React.ReactNode;
  onTap: (direction: -1 | 1) => void;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !window.matchMedia("(max-width: 767px)").matches) return;

    const touch = event.changedTouches[0];
    if (!touch || Math.abs(touch.clientX - start.x) > 12 || Math.abs(touch.clientY - start.y) > 12) {
      return;
    }

    const { left, width } = event.currentTarget.getBoundingClientRect();
    onTap(touch.clientX < left + width / 2 ? -1 : 1);
  };

  return (
    <div
      className="relative w-full pb-[57%] xl:pb-[65%]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
    >
      {/* SVG backdrop */}
      <svg
        viewBox={FOLDER_VB}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
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
          right: "25%",
          height: "14%",
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
            fontSize: "clamp(12px, 1.5vw, 17px)",
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
        className="absolute inset-x-[4%] top-[22%] bottom-[5%] flex items-stretch gap-[2%] sm:top-[30%] sm:bottom-[8%]"
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
        className="absolute inset-x-[6%] top-[6%] bottom-[6%] flex items-center justify-center sm:top-[25%] sm:bottom-[21%]"
      >
        <p
          className="m-0 text-center text-[clamp(11px,3vw,14px)] font-medium leading-[1.2] text-[#f0eae8] sm:text-[clamp(14px,1.7vw,18px)] sm:leading-[1.5]"
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── TrophyCard ──────────────────────────────────────────────────
   
──────────────────────────────────────────────────────────────── */
function TrophyCard({
  title,
  awardImage,
  onSwipe,
}: {
  title: string;
  awardImage: string;
  onSwipe: (direction: -1 | 1) => void;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !window.matchMedia("(max-width: 767px)").matches) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    onSwipe(deltaX < 0 ? 1 : -1);
  };

  return (
    <div
      className="touch-pan-y md:touch-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
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
const certificationImages = [
  assets.certification1,
  assets.certification2,
  assets.certification3,
  assets.certification4,
  assets.certification5,
  assets.certification6,
  assets.certification7,
  assets.certification8,
];

export default function AwardsClient({ messages }: { messages: AwardsMessages }) {
  const [activeAward, setActiveAward] = useState(0);
  const awards = messages.items.map((item, index) => ({ ...item, image: awardImages[index] }));
  const award = awards[activeAward];
  const navigateAward = (direction: -1 | 1) =>
    setActiveAward((current) => (current + direction + awards.length) % awards.length);

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
      <section className="mx-auto px-4 py-12 xl:px-0">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-10 xl:max-w-[1440px] xl:grid-cols-[minmax(0,600px)_minmax(0,1fr)] xl:gap-4 xl:-translate-x-12">
          {/* Award selector */}
          <motion.div
            className="flex justify-center"
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="mx-auto hidden w-full max-w-[520px] md:block xl:max-w-[660px] xl:translate-x-[28%]">
              <AwardWheel awards={awards} activeAward={activeAward} onSelect={setActiveAward} />
            </div>
            <nav className="w-full md:hidden" aria-label={messages.title}>
              <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-3 [scrollbar-width:thin]">
                {awards.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-label={`${item.label}: ${item.title}`}
                    aria-pressed={activeAward === index}
                    onClick={() => setActiveAward(index)}
                    className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      activeAward === index
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>

          {/* Folder */}
          <motion.div
            className="mx-auto w-full max-w-[640px] min-w-0 xl:max-w-[800px] xl:-translate-x-12"
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FolderCard title={award.title} onTap={navigateAward}>
              <DocCard description={award.description} />
              <TrophyCard
                title={award.title}
                awardImage={award.image}
                onSwipe={navigateAward}
              />
            </FolderCard>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold text-primary"
          initial={{ opacity: 0, y: -16 }}
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
          {certificationImages.slice(0, 4).map((certiImage) => (
            <motion.div
              key={certiImage}
              variants={certificationItem}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 22,
                },
              }}
            >
              <CertificationBlock CertificationImage={certiImage} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
          <Image
            src={assets.fda}
            alt={messages.brandAlt}
            width={48}
            height={48}
            className="size-12 rounded-full border object-contain"
          />
          <Image
            src="/images/aboutusimg/0-02-06-8e4be1da8644c46ad5cd8607a2716c397f089aa4cb712ce44eaee9ab66c7811a_a4a6475e35ae5f8e.png"
            alt="UMFCCI logo"
            width={48}
            height={48}
            className="size-12 object-contain"
          />
          <Image
            src="/images/aboutusimg/0-02-06-787609da3f6218cfa5984e6bc0277a127e0f9f667a9316b14eb84fa644a085e4_c07ee3f094c14cfd.png"
            alt="MSME Myanmar logo"
            width={48}
            height={48}
            className="size-12 object-contain"
          />
          <Image
            src="/images/aboutusimg/0-02-06-f32ca52d27cf92d32b6573a2a8cbac86e7a50d481a5031b00c90f237e39662cf_d53af37bb8c41c2c.png"
            alt="Partner organization logo"
            width={48}
            height={48}
            className="size-12 object-contain"
          />
          <Image
            src="/images/aboutusimg/0-02-06-f62677f3e3a73303469d8bd895df2e34c8195ed32e8b176b6f8f2fcbcca11bc9_d2629094ac8a5b98.png"
            alt="Food science organization logo"
            width={48}
            height={48}
            className="size-12 object-contain"
          />
          <Image
            src="/images/aboutusimg/images (6).jpg"
            alt="University of Technology Yatanarpon Cyber City logo"
            width={48}
            height={48}
            className="size-12 object-contain"
          />
          <Image
            src="/images/aboutusimg/images (5).png"
            alt="Information Science and Technology logo"
            width={48}
            height={48}
            className="size-12 object-contain"
          />

          <div className="h-1 flex-1 rounded-full bg-secondary/20" />
        </div>
      </section>
    </div>
  );
}
