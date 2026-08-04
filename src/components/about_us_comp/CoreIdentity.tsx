'use client';

import React from 'react';
import { motion, type Variants } from "framer-motion";
import type { AboutMessages } from "@/i18n/message-types";

interface CoreIdentityItem { id: string; title: string; heading: string; description: string; }

export const CoreIdentity: React.FC<{ messages: AboutMessages["coreIdentity"] }> = ({ messages }) => {
  const coreIdentityItems: CoreIdentityItem[] = messages.items;
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 80, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const mainCardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const topTabVariants: Variants = {
    hidden: { opacity: 0, y: -25, scale: 0.85 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } },
  };

  const bottomVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="bg-[#f8f6ef] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-12 sm:mb-16 md:mb-20 text-black tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {messages.title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 justify-items-center items-stretch">
          {coreIdentityItems.map((item, index) => {
            const headingText = item.heading;
            const descriptionText = item.description;
            const hasContent = headingText || descriptionText;

            return (
              <motion.div
                key={item.id}
                className="relative pt-4 sm:pt-6 pb-8 sm:pb-12 flex justify-center w-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -10, scale: 1.02, transition: { type: "spring", stiffness: 500, damping: 25 } }}
              >
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                  <motion.div
                    className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none z-0"
                    variants={bottomVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.18 + 0.2 }}
                  >
                    <motion.div
                      className="w-[105%] h-48 sm:h-56 md:h-65 bg-[#2c353e] rounded-b-4xl shadow-md translate-y-24 sm:translate-y-28 md:translate-y-35"
                      initial={{ opacity: 0, scaleY: 0.5, transformOrigin: "top" }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.18 + 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                      className="w-32 sm:w-40 md:w-48 h-12 sm:h-14 md:h-16 bg-[#3a434c] rounded-3xl shadow-md -translate-y-10 sm:-translate-y-12 md:-translate-y-16"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.18 + 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                      className="w-32 sm:w-40 md:w-48 h-16 sm:h-18 md:h-20 bg-[#16b300] rounded-4xl shadow-lg translate-y-3 sm:translate-y-4 md:translate-y-5"
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.18 + 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>

                  <motion.div
                    className="relative w-full h-full bg-[#e6e4dc] rounded-4xl shadow-xl pt-16 sm:pt-20 md:pt-25 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 flex flex-col justify-between items-center text-center z-10"
                    variants={mainCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.18 }}
                  >
                    <motion.div
                      className="absolute -top-3 sm:-top-4 md:-top-5 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-48 h-10 sm:h-11 md:h-12 bg-[#16b300] rounded-t-4xl rounded-b-none shadow-md flex items-center justify-center z-20"
                      variants={topTabVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.18 + 0.25 }}
                    >
                      <h3 className="text-white font-extrabold text-base sm:text-lg md:text-xl tracking-wide">{item.title}</h3>
                    </motion.div>

                    {hasContent ? (
                      <motion.div
                        className="flex flex-col space-y-3 sm:space-y-4 z-10 mt-2 my-auto"
                        variants={contentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ delay: index * 0.18 + 0.4 }}
                      >
                        {headingText && <h4 className="font-extrabold text-black text-sm sm:text-base md:text-lg leading-snug">{headingText}</h4>}
                        {descriptionText && <p className="text-gray-800 text-xs sm:text-sm md:text-sm font-medium leading-relaxed">{descriptionText}</p>}
                      </motion.div>
                    ) : (
                      <div className="my-auto h-24 sm:h-28 md:h-32 z-10" />
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
