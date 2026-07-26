'use client';

import React from 'react';
import { motion, type Variants } from "framer-motion";

interface CoreIdentityItem {
  id: string;
  title: string;
  heading: string;
  description: string;
}

const coreIdentityItems: CoreIdentityItem[] = [
  {
    id: 'mission',
    title: 'Mission',
    heading: 'Revolutionizing Health & Wellness',
    description: 'To revolutionize health and wellness in Myanmar by creating innovative, plant-based nutritional products that promote a balanced diet and support sustainable agricultural practices.',
  },
  {
    id: 'vision',
    title: 'Vision',
    heading: 'SEED to NOURISHING RICH SNACKS',
    description: 'From seed to nourishing rich snacks—we envision a Myanmar where everyone has access to nutritious, delicious food that supports local farmers and builds healthier communities.',
  },
  {
    id: 'motto',
    title: 'Motto',
    heading: '',
    description: '',
  },
];

export const CoreIdentity: React.FC = () => {

  // Card animation
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    // SCROLL animation
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

  // Main card
  const mainCardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
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

  // Green top title tab
  const topTabVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -25,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.25,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Text content
  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Bottom decorations
  const bottomVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="bg-[#f8f6ef] py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-center mb-20 text-black tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Our Core Identity
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 justify-items-center items-stretch">

          {coreIdentityItems.map((item, index) => {
            const headingText = item.heading;
            const descriptionText = item.description;
            const hasContent = headingText || descriptionText;

            return (
  <motion.div
    key={item.id}
    className="relative pt-6 pb-12 flex justify-center w-full"

    // SCROLL
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{
      once: true,
      amount: 0.25,
    }}

    // HOVER
    whileHover={{
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    }}
  >

                <div className="relative w-full max-w-sm md:w-md">

                  {/* Bottom Elements */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none z-0"
                    variants={bottomVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      delay: index * 0.18 + 0.2,
                    }}
                  >

                    {/* Dark Blue Background */}
                    <motion.div
                      className="w-[105%] h-65 bg-[#2c353e] rounded-b-4xl shadow-md translate-y-35"
                      initial={{
                        opacity: 0,
                        scaleY: 0.5,
                        transformOrigin: "top",
                      }}
                      whileInView={{
                        opacity: 1,
                        scaleY: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.25,
                      }}
                      transition={{
                        delay: index * 0.18 + 0.25,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    {/* Dark Accent */}
                    <motion.div
                      className="w-48 h-16 bg-[#3a434c] rounded-3xl shadow-md -translate-y-16"
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.25,
                      }}
                      transition={{
                        delay: index * 0.18 + 0.35,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    {/* Green Bottom Badge */}
                    <motion.div
                      className="w-48 h-20 bg-[#16b300] rounded-4xl shadow-lg translate-y-5"
                      initial={{
                        opacity: 0,
                        y: 30,
                        scale: 0.8,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.25,
                      }}
                      transition={{
                        delay: index * 0.18 + 0.45,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </motion.div>

                  {/* Main Card */}
                  <motion.div
                    className="relative w-full h-full bg-[#e6e4dc] rounded-4xl shadow-xl pt-25 pb-12 px-6 flex flex-col justify-between items-center text-center z-10"
                    variants={mainCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      delay: index * 0.18,
                    }}
                  >

                    {/* Top Green Banner */}
                    <motion.div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#16b300] rounded-t-4xl rounded-b-none shadow-md flex items-center justify-center z-20"
                      variants={topTabVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{
                        once: true,
                        amount: 0.25,
                      }}
                      transition={{
                        delay: index * 0.18 + 0.25,
                      }}
                    >
                      <h3 className="text-white font-extrabold text-xl tracking-wide">
                        {item.title}
                      </h3>
                    </motion.div>

                    {/* Content */}
                    {hasContent ? (
                      <motion.div
                        className="flex flex-col space-y-4 z-10 mt-2 my-auto"
                        variants={contentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                          once: true,
                          amount: 0.25,
                        }}
                        transition={{
                          delay: index * 0.18 + 0.4,
                        }}
                      >
                        {headingText && (
                          <h4 className="font-extrabold text-black text-lg leading-snug">
                            {headingText}
                          </h4>
                        )}

                        {descriptionText && (
                          <p className="text-gray-800 text-sm font-medium leading-relaxed">
                            {descriptionText}
                          </p>
                        )}
                      </motion.div>
                    ) : (
                      <div className="my-auto h-32 z-10" />
                    )}

                    <div className="w-full h-2" />
                  </motion.div>

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
};



export default CoreIdentity;
