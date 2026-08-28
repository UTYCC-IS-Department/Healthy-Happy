'use client';

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getImagePath } from './imageAssets';
import type { AboutMessages } from "@/i18n/message-types";
import type { Locale } from "@/i18n/config";
//nth//
// ============================================================================
// TypeScript Interfaces
// ============================================================================
export interface LeftCardData {
  id: string;
}

export interface FeatureBoxData {
  id: string;
}

export interface ResearchSectionData {
  id: string;
  title: string;
  description: string;
  smallCirclePlaceholderId: string;
  largeCirclePlaceholderId: string;
  features: FeatureBoxData[];
}

export interface ResearchInnovationData {
  topBannerText: string;
  leftCards: LeftCardData[];
  rightSections: ResearchSectionData[];
}

// ============================================================================
// Static Data
// ============================================================================
const createResearchData = (messages: AboutMessages["research"]): ResearchInnovationData => ({
  topBannerText: messages.banner,
  leftCards: [{ id: 'card-1' }, { id: 'card-2' }, { id: 'card-3' }],
  rightSections: messages.sections.map((section, index) => ({
    id: `section-${index + 1}`,
    title: section.title,
    description: section.description,
    smallCirclePlaceholderId: `circle-small-${index + 1}`,
    largeCirclePlaceholderId: `circle-large-${index + 1}`,
    features: [{ id: `f${index + 1}-1` }, { id: `f${index + 1}-2` }, { id: `f${index + 1}-3` }, { id: `f${index + 1}-4` }],
  })),
});

// ============================================================================
// Framer Motion Animation Variants
// ============================================================================
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const leftContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const rightContainerVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 },
  },
};

const circleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 },
  },
};

const textFadeVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: 'easeInOut' } },
};

// ============================================================================
// Embedded CSS Styles
// ============================================================================
const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&family=Roboto:wght@400;500;700&display=swap');

  .ri-section-wrapper {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f1eb;
    padding: 40px 24px 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    transition: font-family 0.3s ease;
  }

  .ri-section-wrapper[data-lang="en"] {
    font-family: 'Roboto', sans-serif;
  }

  .ri-section-wrapper[data-lang="my"] {
    font-family: 'Padauk', sans-serif;
  }

  .ri-main-heading {
    font-size: 42px;
    font-weight: 700;
    color: #000000;
    text-align: center;
    margin: 0 0 36px 0;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .ri-content-grid {
    width: 100%;
    max-width: 1380px;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 32px;
    align-items: start;
  }

  .ri-left-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Solid Canvas Placeholder Cards */
  .ri-canvas-card {
    width: 100%;
    height: 200px;
    background-color: #a38283;
    border-radius: 28px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    will-change: transform, box-shadow;
  }

  .ri-right-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .ri-top-pill-banner {
    background: #74c51e;
    border-radius: 30px;
    padding: 12px 28px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    box-shadow: 0 6px 20px rgba(116, 197, 30, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ri-green-container {
    position: relative;
    background: #74c51e;
    border-radius: 36px;
    padding: 40px 36px;
    box-shadow: 0 20px 50px rgba(116, 197, 30, 0.3);
    display: flex;
    flex-direction: column;
    gap: 40px;
    overflow: visible;
  }

  .ri-research-row {
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
  }

  .ri-row-top {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    position: relative;
  }

  .ri-small-circle-placeholder {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #2b1d1d;
    border: 3px solid #ffffff;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.4s ease;
  }

  .ri-small-circle-placeholder:hover {
    transform: rotate(8deg) scale(1.05);
  }

  .ri-row-text-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-right: 140px;
    max-width: 85%;
  }

  .ri-row-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    line-height: 1.3;
  }

  .ri-row-description {
    font-size: 16.5px;
    color: #ffffff;
    margin: 0;
    line-height: 1.45;
    font-weight: 500;
  }

  .ri-feature-grid {
    display: flex;
    gap: 16px;
    margin-left: 130px;
    padding-right: 120px;
  }

  /* Empty Rounded Feature Boxes Matching Canvas */
  .ri-feature-box {
    width: 82px;
    height: 110px;
    background: #e2e2e2;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    transition: transform 0.25s ease, background-color 0.25s ease;
  }

  .ri-feature-box:hover {
    transform: translateY(-4px);
    background: #ffffff;
  }

  .ri-large-circle-placeholder {
    position: absolute;
    right: -60px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #2b1d1d;
    border: 4px solid #ffffff;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    z-index: 2;
    transition: transform 0.4s ease;
  }

  .ri-large-circle-placeholder:hover {
    transform: rotate(-6deg) scale(1.04);
  }

  .ri-large-circle-pos1 {
    top: -10px;
  }

  .ri-large-circle-pos2 {
    bottom: -10px;
  }

  .ri-image-placeholder {
    display: block;
  }

  @media (max-width: 1200px) {
    .ri-row-text-content {
      padding-right: 100px;
      max-width: 80%;
    }

    .ri-large-circle-placeholder {
      right: -40px;
      width: 160px;
      height: 160px;
    }

    .ri-feature-grid {
      margin-left: 0;
      padding-right: 0;
    }
  }

  @media (max-width: 992px) {
    .ri-main-heading {
      font-size: 32px;
      margin-bottom: 28px;
    }

    .ri-content-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .ri-left-stack {
      flex-direction: row;
      overflow-x: auto;
      padding-bottom: 12px;
      scroll-snap-type: x mandatory;
    }

    .ri-canvas-card {
      min-width: 280px;
      scroll-snap-align: start;
      height: 190px;
    }

    .ri-green-container {
      padding: 32px 24px;
      overflow: hidden;
    }

    .ri-row-text-content {
      padding-right: 0;
      max-width: 100%;
    }

    .ri-large-circle-placeholder {
      position: static;
      margin: 16px auto 0;
      width: 150px;
      height: 150px;
    }

    .ri-feature-grid {
      margin-left: 0;
      padding-right: 0;
      justify-content: space-between;
    }

    .ri-feature-box {
      flex: 1;
      min-width: 0;
      height: 90px;
    }
  }

  @media (max-width: 768px) {
    .ri-section-wrapper {
      padding: 24px 16px;
    }

    .ri-top-pill-banner {
      font-size: 14px;
      padding: 10px 18px;
    }

    .ri-row-top {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .ri-small-circle-placeholder {
      width: 90px;
      height: 90px;
    }

    .ri-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    .ri-feature-box {
      width: 100%;
      height: 80px;
    }
  }

  @media (max-width: 480px) {
    .ri-main-heading {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .ri-section-wrapper {
      padding: 16px 12px;
    }

    .ri-canvas-card {
      min-width: 220px;
      height: 160px;
    }

    .ri-feature-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .ri-feature-box {
      height: 70px;
    }

    .ri-top-pill-banner {
      font-size: 13px;
      padding: 8px 14px;
    }

    .ri-green-container {
      padding: 20px 16px;
      gap: 24px;
    }

    .ri-small-circle-placeholder {
      width: 70px;
      height: 70px;
    }

    .ri-row-title {
      font-size: 16px;
    }

    .ri-row-description {
      font-size: 14px;
    }
  }

  @media (max-width: 360px) {
    .ri-main-heading {
      font-size: 20px;
    }

    .ri-canvas-card {
      min-width: 200px;
      height: 150px;
    }

    .ri-feature-box {
      height: 60px;
    }

    .ri-small-circle-placeholder {
      width: 60px;
      height: 60px;
    }

    .ri-row-title {
      font-size: 15px;
    }

    .ri-row-description {
      font-size: 13px;
    }
  }

  @media (max-width: 320px) {
    .ri-main-heading {
      font-size: 18px;
    }

    .ri-canvas-card {
      min-width: 180px;
      height: 140px;
    }

    .ri-feature-box {
      height: 55px;
    }

    .ri-small-circle-placeholder {
      width: 55px;
      height: 55px;
    }

    .ri-row-title {
      font-size: 14px;
    }

    .ri-row-description {
      font-size: 12px;
    }
  }
`;

// ============================================================================
// Main React Component
// ============================================================================
export const ResearchInnovation: React.FC<{ locale: Locale; messages: AboutMessages["research"] }> = ({ locale, messages }) => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const researchInnovationData = createResearchData(messages);

  return (
    <>
      <style>{cssStyles}</style>
      <section
        ref={sectionRef}
        className="ri-section-wrapper"
        data-lang={locale}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key="title-en"
            className="ri-main-heading"
            variants={headerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span
              key="span-title-en"
              variants={textFadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {messages.title}
            </motion.span>
          </motion.h1>
        </AnimatePresence>

        <div className="ri-content-grid">
          {/* Left Column: 3 Solid Canvas Placeholder Cards */}
          <motion.div
            className="ri-left-stack"
            variants={leftContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {researchInnovationData.leftCards.map((cardItem: LeftCardData, index: number) => (
              <motion.div
                key={cardItem.id}
                className="ri-canvas-card"
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: '0 22px 40px rgba(0,0,0,0.22)',
                  transition: { type: 'spring', stiffness: 300, damping: 18 },
                }}
                style={{
                  backgroundImage: `url(${getImagePath(`aboutus-0${index + 9}`) || ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </motion.div>

          {/* Right Column Container */}
          <motion.div
            className="ri-right-column"
            variants={rightContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Top Green Banner Pill */}
            <div className="ri-top-pill-banner">
              <AnimatePresence mode="wait">
                <motion.span
                  key="banner-en"
                  variants={textFadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {messages.banner}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Main Green Container */}
            <div className="ri-green-container">
              {researchInnovationData.rightSections.map(
                (section: ResearchSectionData, index: number) => {
                  const largeCircleClass =
                    index === 0
                      ? 'ri-large-circle-pos1'
                      : 'ri-large-circle-pos2';

                  return (
                    <div key={section.id} className="ri-research-row">
                      <div className="ri-row-top">
                        {/* Circle Placeholders 1 & 2 (Small left circles) */}
                        <motion.div
                          id={section.smallCirclePlaceholderId}
                          className="ri-image-placeholder ri-small-circle-placeholder"
                          variants={circleVariants}
                          initial="hidden"
                          animate={inView ? 'visible' : 'hidden'}
                          style={{
                            backgroundImage: `url(${getImagePath(index === 0 ? 'aboutus-01' : 'aboutus-02') || ''})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <div className="ri-row-text-content">
                          <h3 className="ri-row-title">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={`sec-title-${section.id}-en`}
                                variants={textFadeVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                              >
                                {messages.sections[index].title}
                              </motion.span>
                            </AnimatePresence>
                          </h3>
                          <p className="ri-row-description">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={`sec-desc-${section.id}-en`}
                                variants={textFadeVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                              >
                                {messages.sections[index].description}
                              </motion.span>
                            </AnimatePresence>
                          </p>
                        </div>
                      </div>

                      {/* 4 Empty Feature Boxes per section matching canvas */}
                      <div className="ri-feature-grid">
                        {section.features.map((feature: FeatureBoxData) => (
                          <div key={feature.id} className="ri-feature-box" />
                        ))}
                      </div>

                      {/* Circle Placeholders 3 & 4 (Large right side edge circles) */}
                      <motion.div
                        id={section.largeCirclePlaceholderId}
                        className={`ri-image-placeholder ri-large-circle-placeholder ${largeCircleClass}`}
                        variants={circleVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        style={{
                          backgroundImage: `url(${getImagePath(index === 0 ? 'aboutus-03' : 'aboutus-04') || ''})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ResearchInnovation;
