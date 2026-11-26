'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { AboutMessages } from '@/i18n/message-types';

interface CoreIdentityItem {
  id: string;
  title: string;
  heading: string;
  description: string;
}

interface CoreValueEntry {
  code?: string;
  title: string;
  description: string;
}

interface PhilosophyEntry {
  title: string;
  heading: string;
  description: string;
  motto?: string;
}

type ExtendedCoreIdentityMessages = AboutMessages['coreIdentity'] & {
  coreValuesTitle?: string;
  coreValuesIntro?: string;
  coreValues?: CoreValueEntry[];
  philosophy?: PhilosophyEntry;
};

type ExtendedHeadline = AboutMessages['headline'] & {
  coreValuesTitle?: string;
  coreValuesIntro?: string;
  coreValues?: CoreValueEntry[];
  philosophy?: PhilosophyEntry;
};

interface CoreIdentityProps {
  messages: ExtendedCoreIdentityMessages;
  headline?: ExtendedHeadline;
}

const DEFAULT_CORE_VALUES_TITLE = 'Our Core Values — HCPPN';
const DEFAULT_CORE_VALUES_INTRO =
  'At Healthy & Happy, we believe that better nutrition can create healthier people, happier families, and a stronger community.';

const DEFAULT_CORE_VALUES: CoreValueEntry[] = [
  {
    code: 'H',
    title: 'Healthy',
    description:
      'We believe in creating better food choices that support healthier everyday living.',
  },
  {
    code: 'C',
    title: 'Community Support',
    description:
      'We create positive impact by supporting farmers, communities, and people around us.',
  },
  {
    code: 'P',
    title: 'Plant-Based',
    description:
      'We promote nutritious plant-based protein food as a better choice for people and the planet.',
  },
  {
    code: 'P',
    title: 'High Protein',
    description:
      'We focus on high-protein nutrition to support energy, strength, and everyday well-being.',
  },
  {
    code: 'N',
    title: 'Nutrition',
    description:
      'We put nutrition at the heart of everything we create, combining quality ingredients with purposeful nutrition.',
  },
];

const DEFAULT_PHILOSOPHY: PhilosophyEntry = {
  title: 'Our Philosophy',
  heading: 'Healthy People. Happy Lives. Stronger Communities.',
  description:
    'We believe that every better food choice can create a positive change — for individuals, families, farmers, and society.',
  motto: 'Healthy & Happy — Your Daily Nutrition Partner, Every Step of the Way!',
};

const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <motion.div
    className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
    initial={{ opacity: 0, y: -16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-gray-800 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export const CoreIdentity: React.FC<CoreIdentityProps> = ({ messages, headline }) => {
  const coreIdentityItems: CoreIdentityItem[] = messages.items;

  const coreValuesTitle =
    headline?.coreValuesTitle ??
    messages.coreValuesTitle ??
    DEFAULT_CORE_VALUES_TITLE;

  const coreValuesIntro =
    headline?.coreValuesIntro ??
    messages.coreValuesIntro ??
    DEFAULT_CORE_VALUES_INTRO;

  const rawCoreValues =
    headline?.coreValues && headline.coreValues.length > 0
      ? headline.coreValues
      : messages.coreValues && messages.coreValues.length > 0
      ? messages.coreValues
      : DEFAULT_CORE_VALUES;

  const coreValuesList: CoreValueEntry[] = rawCoreValues.map((item, idx) => ({
    code: item.code ?? DEFAULT_CORE_VALUES[idx]?.code,
    title: item.title,
    description: item.description,
  }));

  const rawPhilosophy = headline?.philosophy ?? messages.philosophy;
  const philosophy: PhilosophyEntry = {
    title: rawPhilosophy?.title ?? DEFAULT_PHILOSOPHY.title,
    heading: rawPhilosophy?.heading ?? DEFAULT_PHILOSOPHY.heading,
    description: rawPhilosophy?.description ?? DEFAULT_PHILOSOPHY.description,
    motto: rawPhilosophy?.motto ?? DEFAULT_PHILOSOPHY.motto,
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const mainCardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const topTabVariants: Variants = {
    hidden: { opacity: 0, y: -14, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.5, ease: 'easeOut' },
    },
  };

  const bottomVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="bg-[#f8f6ef] py-14 sm:py-20 px-4 sm:px-6 space-y-20 sm:space-y-24">
      {/* 1. Our Core Values (HCPPN) */}
      <section className="max-w-6xl mx-auto">
        <SectionHeading title={coreValuesTitle} subtitle={coreValuesIntro} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreValuesList.map((cv, idx) => (
            <motion.div
              key={`${cv.code ?? 'val'}-${cv.title}-${idx}`}
              className="bg-[#e6e4dc] rounded-4xl shadow-xl p-6 sm:p-7 border border-[#2c353e]/15 flex flex-col justify-between"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{
                y: -4,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 450, damping: 25 },
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {cv.code && (
                    <span className="w-9 h-9 rounded-2xl bg-[#16b300] text-white font-black text-base flex items-center justify-center shadow-sm shrink-0">
                      {cv.code}
                    </span>
                  )}
                  <h3 className="font-extrabold text-black text-base sm:text-lg leading-snug">
                    {cv.title}
                  </h3>
                </div>
                <p className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed">
                  {cv.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Our Philosophy */}
      <section className="max-w-5xl mx-auto">
        <SectionHeading title={philosophy.title} />

        <motion.div
          className="bg-[#e6e4dc] rounded-4xl shadow-xl border border-[#2c353e]/15 p-6 sm:p-10 text-center"
          variants={mainCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="font-extrabold text-black text-lg sm:text-xl md:text-2xl leading-snug mb-3">
            {philosophy.heading}
          </h3>
          <p className="text-gray-800 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-3xl mx-auto mb-5">
            {philosophy.description}
          </p>
          {philosophy.motto && (
            <p className="text-[#16b300] font-extrabold text-sm sm:text-base md:text-lg">
              {philosophy.motto}
            </p>
          )}
        </motion.div>
      </section>

      {/* 3. Our Core Identity (Mission / Vision / Motto Cards) */}
      <section className="max-w-6xl mx-auto pt-2">
        <SectionHeading title={messages.title} />

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
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 500, damping: 25 },
                }}
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
                      initial={{ opacity: 0, scaleY: 0.5, transformOrigin: 'top' }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        delay: index * 0.18 + 0.25,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <motion.div
                      className="w-32 sm:w-40 md:w-48 h-12 sm:h-14 md:h-16 bg-[#3a434c] rounded-3xl shadow-md -translate-y-10 sm:-translate-y-12 md:-translate-y-16"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        delay: index * 0.18 + 0.35,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <motion.div
                      className="w-32 sm:w-40 md:w-48 h-16 sm:h-18 md:h-20 bg-[#16b300] rounded-4xl shadow-lg translate-y-3 sm:translate-y-4 md:translate-y-5"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        delay: index * 0.18 + 0.45,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
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
                      <h3 className="text-white font-extrabold text-base sm:text-lg md:text-xl tracking-wide">
                        {item.title}
                      </h3>
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
                        {headingText && (
                          <h4 className="font-extrabold text-black text-sm sm:text-base md:text-lg leading-snug">
                            {headingText}
                          </h4>
                        )}
                        {descriptionText && (
                          <p className="text-gray-800 text-xs sm:text-sm md:text-sm font-medium leading-relaxed">
                            {descriptionText}
                          </p>
                        )}
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
      </section>
    </div>
  );
};

export default CoreIdentity;
