"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";

interface LocationItem {
  id: number;
  name: string;
  active?: boolean;
}

const locations: LocationItem[] = [
  { id: 1, name: "Grandhanthar Hospital"},
  { id: 2, name: "Shwe Ohh Pharmacy" },
  { id: 3, name: "Ko Han Tin Pharmacy" },
  { id: 4, name: "Market Place" },
  { id: 5, name: "Citymart" },
  { id: 6, name: "Grandhanthar Hospital" },
  { id: 7, name: "Grandhanthar Hospital" },
  { id: 8, name: "Grandhanthar Hospital" },
  { id: 9, name: "Grandhanthar Hospital" },
];

/* =========================================================
   STARTUP ANIMATIONS
========================================================= */

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      delay: index * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -15,
  },

  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,

    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      delay: 1.1,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export const WhereCanBuy: React.FC = () => {

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="bg-[#f8f6ef] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* =================================================
            HEADING
        ================================================= */}

        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Where Can Buy
        </motion.h2>

        {/* =================================================
            GRID
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">

          {locations.map((item, index) => {
  const active = item.active ?? false;
  const isHovered = hoveredId === item.id;

  const cardColor =
    active || isHovered
      ? "#16b300"
      : "#dedede";

  return (
    /* ==========================================
       STARTUP ANIMATION
    ========================================== */
    <motion.div
      key={item.id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative mt-4"
    >
      {/* ==========================================
          HOVER ANIMATION
      ========================================== */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={
          isHovered
            ? {
                type: "spring",
                stiffness: 600,
                damping: 25,
              }
            : {
                type: "tween",
                duration: 0.08,
                ease: "easeOut",
              }
        }
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
        className="relative"
      >
        <div className="relative w-full max-sm:w-[80%] mx-auto">

          {/* Background Shadow Badge */}
          <motion.div
            className="
              absolute
              -bottom-3
              left-11
              w-10
              h-18
              bg-[#3a3437]
              rounded-br-xl
              shadow-md
              z-0
              pointer-events-none
            "
            initial={{
              opacity: 0,
              scaleY: 0,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
            }}
            transition={{
              delay: index * 0.1 + 0.25,
              duration: 0.4,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "top",
            }}
          />

          {/* ==========================================
              MAIN CARD
          ========================================== */}

          <motion.div
            className="
              relative
              h-40
              w-full
              rounded-3xl
              shadow-lg
              px-4
              flex
              items-center
              justify-center
              text-center
              pt-1
              z-10
              text-black
            "
            initial={{
              backgroundColor: active
                ? "#16b300"
                : "#dedede",
            }}
            animate={{
              backgroundColor: cardColor,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
          >

            {/* ==========================================
                TOP-RIGHT BUMP
            ========================================== */}

            <motion.div
              className="
                absolute
                -top-8
                right-8
                w-18
                h-18
                rounded-full
              "
              initial={{
                opacity: 0,
                scale: 0,
                backgroundColor: active
                  ? "#16b300"
                  : "#dedede",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: cardColor,
              }}
              transition={{
                opacity: {
                  delay: index * 0.1 + 0.2,
                  duration: 0.4,
                  ease: "easeOut",
                },
                scale: {
                  delay: index * 0.1 + 0.2,
                  duration: 0.4,
                  ease: "easeOut",
                },
                backgroundColor: {
                  duration: 0.15,
                  ease: "easeOut",
                },
              }}
            />

            {/* Brown Circle */}
            <motion.div
              className="
                absolute
                -top-6
                right-10
                w-14
                h-14
                bg-[#825355]
                rounded-full
                z-10
              "
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.1 + 0.3,
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
            />

            {/* Location Title */}
            <motion.p
              className="
                font-extrabold
                text-base
                leading-tight
                z-10
              "
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1 + 0.35,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              {item.name}
            </motion.p>

            {/* ==========================================
                BOTTOM-LEFT BADGE
            ========================================== */}

            <motion.div
              className="
                absolute
                -bottom-3
                left-4
                flex
                flex-col
                items-center
                z-20
              "
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              <div
                className="
                  relative
                  w-15
                  h-18
                  bg-[#4a4246]
                  rounded-t-4xl
                  rounded-bl-xl
                  shadow-lg
                  flex
                  flex-col
                  items-center
                  pt-2
                "
              >
                <div
                  className="
                    relative
                    bottom-1
                    w-12
                    h-12
                    bg-[#825355]
                    rounded-full
                    border-4
                    border-[#e6d5d5]
                    flex
                    items-center
                    justify-center
                    shadow-inner
                  "
                >
                  <span className="text-white font-bold text-2xl">
                    {item.id}
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
})}

          {/* =================================================
              FOOTER NOTE
          ================================================= */}

          <motion.div
            className="
              col-span-1
              sm:col-span-2
              lg:col-span-3
              bg-[#dcdcdc]
              rounded-2xl
              px-6
              py-4
              flex
              items-center
              shadow-sm
              mt-4
            "
            variants={footerVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="text-red-500 text-lg mr-3 flex-shrink-0">
              ◆
            </span>

            <p className="text-sm font-semibold leading-5 text-gray-800">
              Apart from major modern trade venues, our products are widely available at prominent regional supermarkets and trusted local retail shops across the country
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default WhereCanBuy;
