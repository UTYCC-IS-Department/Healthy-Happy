"use client";



import React, { useState } from "react";

import { motion, type Variants } from "framer-motion";

import type { AboutMessages } from "@/i18n/message-types";



interface LocationItem {

  id: number;

  name: string;

  active?: boolean;

}



interface WhereCanBuyProps {

  messages: AboutMessages["whereCanBuy"];

}



const headingVariants: Variants = {

  hidden: { opacity: 0, y: -30 },

  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },

};



const cardVariants: Variants = {

  hidden: { opacity: 0, y: 50, scale: 0.9 },

  visible: (index: number) => ({

    opacity: 1,

    y: 0,

    scale: 1,

    transition: { delay: index * 0.1, duration: 0.6, ease: "easeOut" },

  }),

};



const badgeVariants: Variants = {

  hidden: { opacity: 0, scale: 0.5, rotate: -15 },

  visible: {

    opacity: 1,

    scale: 1,

    rotate: 0,

    transition: { type: "spring", stiffness: 400, damping: 20 },

  },

};



const footerVariants: Variants = {

  hidden: { opacity: 0, y: 30 },

  visible: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.6, ease: "easeOut" } },

};



export const WhereCanBuy: React.FC<WhereCanBuyProps> = ({ messages }) => {

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const locations: LocationItem[] = messages.retailers.map((name, index) => ({ id: index + 1, name }));



  return (

    <div className="bg-[#f8f6ef] py-8 sm:py-10 md:py-12 px-4 sm:px-6">

      <div className="max-w-6xl mx-auto">

        <motion.h2

          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"

          variants={headingVariants}

          initial="hidden"

          animate="visible"

        >

          {messages.title}

        </motion.h2>



        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 lg:gap-y-14">

          {locations.map((item, index) => {

            const active = item.active ?? false;

            const isHovered = hoveredId === item.id;

            const cardColor = active || isHovered ? "#16b300" : "#dedede";



            return (

              <motion.div

                key={item.id}

                custom={index}

                variants={cardVariants}

                initial="hidden"

                animate="visible"

                className="relative mt-4"

              >

                <motion.div

                  animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.02 : 1 }}

                  transition={

                    isHovered

                      ? { type: "spring", stiffness: 600, damping: 25 }

                      : { type: "tween", duration: 0.08, ease: "easeOut" }

                  }

                  onMouseEnter={() => setHoveredId(item.id)}

                  onMouseLeave={() => setHoveredId(null)}

                  className="relative"

                >

                  <div className="relative w-full max-w-[85%] sm:max-w-[80%] mx-auto">

                    <motion.div

                      className="absolute -bottom-3 left-11 w-10 h-14 sm:h-16 md:h-18 bg-[#3a3437] rounded-br-xl shadow-md z-0 pointer-events-none"

                      initial={{ opacity: 0, scaleY: 0 }}

                      animate={{ opacity: 1, scaleY: 1 }}

                      transition={{ delay: index * 0.1 + 0.25, duration: 0.4, ease: "easeOut" }}

                      style={{ transformOrigin: "top" }}

                    />



                    <motion.div

                      className="relative h-32 sm:h-36 md:h-40 w-full rounded-3xl shadow-lg px-3 sm:px-4 flex items-center justify-center text-center pt-1 z-10 text-black"

                      initial={{ backgroundColor: active ? "#16b300" : "#dedede" }}

                      animate={{ backgroundColor: cardColor }}

                      transition={{ duration: 0.15, ease: "easeOut" }}

                    >

                      <motion.div

                        className="absolute -top-6 sm:-top-7 md:-top-8 right-8 sm:right-9 md:right-8 w-14 sm:w-16 md:w-18 h-14 sm:h-16 md:h-18 rounded-full"

                        initial={{

                          opacity: 0,

                          scale: 0,

                          backgroundColor: active ? "#16b300" : "#dedede",

                        }}

                        animate={{ opacity: 1, scale: 1, backgroundColor: cardColor }}

                        transition={{

                          opacity: { delay: index * 0.1 + 0.2, duration: 0.4, ease: "easeOut" },

                          scale: { delay: index * 0.1 + 0.2, duration: 0.4, ease: "easeOut" },

                          backgroundColor: { duration: 0.15, ease: "easeOut" },

                        }}

                      />

                      <motion.div

                        className="absolute -top-4 right-10 w-10 h-10 sm:-top-5 sm:right-11 sm:w-12 sm:h-12 md:right-10 md:w-14 md:h-14 lg:-top-6 lg:right-10 lg:w-14 lg:h-14 bg-[#825355] rounded-full z-10"

                        initial={{ opacity: 0, scale: 0 }}

                        animate={{ opacity: 1, scale: 1 }}

                        transition={{

                          delay: index * 0.1 + 0.3,

                          type: "spring",

                          stiffness: 400,

                          damping: 18,

                        }}

                      />



                      <motion.p

                        className="font-extrabold text-sm sm:text-base leading-tight z-10"

                        initial={{ opacity: 0, y: 15 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ delay: index * 0.1 + 0.35, duration: 0.4, ease: "easeOut" }}

                      >

                        {item.name}

                      </motion.p>



                      <motion.div

                        className="absolute -bottom-3 left-4 flex flex-col items-center z-20"

                        variants={badgeVariants}

                        initial="hidden"

                        animate="visible"

                      >

                        <div className="relative w-15 h-14 sm:h-16 md:h-18 bg-[#4a4246] rounded-t-4xl rounded-bl-xl shadow-lg flex flex-col items-center pt-2">

                          <div className="relative bottom-1 w-12 h-12 bg-[#825355] rounded-full border-4 border-[#e6d5d5] flex items-center justify-center shadow-inner">

                            <span className="text-white font-bold text-2xl">{item.id}</span>

                          </div>

                        </div>

                      </motion.div>

                    </motion.div>

                  </div>

                </motion.div>

              </motion.div>

            );

          })}



          <motion.div

            className="col-span-2 sm:col-span-2 lg:col-span-4 bg-[#dcdcdc] rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center shadow-sm mt-4"

            variants={footerVariants}

            initial="hidden"

            animate="visible"

          >

            <span className="text-red-500 text-base sm:text-lg mr-2 sm:mr-3 shrink-0">◆</span>

            <p className="text-sm font-semibold leading-5 text-gray-800">

              {messages.note}

            </p>

          </motion.div>

        </div>

      </div>

    </div>

  );

};



export default WhereCanBuy;

