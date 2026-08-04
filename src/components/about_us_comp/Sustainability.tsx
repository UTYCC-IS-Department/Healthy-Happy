"use client";

import { motion } from "framer-motion";
import { getImagePath } from "./imageAssets";

const Sustainability = () => {
  const buttons = [
    "Farm to Factory Model",
    "Farmer Support",
    "ESG & Community Impact",
    "SDGs Goals",
  ];

  return (
    <section id="sustainability1" className="bg-[#F8F5EC] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 lg:mb-16"
        >
          Sustainability
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between h-full"
          >
<div className="space-y-4 sm:space-y-5 max-w-md mx-auto w-full">

  {buttons.map((item, index) => (

    <motion.button
      key={item}

      initial={{
        opacity: 0,
        x: -50
      }}

      whileInView={{
        opacity: 1,
        x: 0
      }}

      transition={{
        duration: 0.5,
        delay: index * 0.15
      }}

      viewport={{
        once: true
      }}

      // Move right on hover
      whileHover={{
        x: 50,
        scale: 1.03
      }}

      whileTap={{
        scale: 0.97
      }}

      className="
        w-full
        rounded-full
        bg-lime-500
        py-3 sm:py-4
        text-sm sm:text-base
        font-bold
        text-black
        shadow-lg
        transition-shadow
        duration-300
        hover:bg-lime-400
        hover:shadow-xl
        cursor-pointer
      "
    >
      {item}

    </motion.button>

  ))}

</div>

            {/* Gray Box */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.8,
              }}

              viewport={{
                once: true,
              }}

              className="
                mt-12 sm:mt-16
                max-w-md
                mx-auto
                w-full
                bg-gray-300
                p-6 sm:p-8
                rounded-md
                min-h-30
                flex
                items-center
                justify-center
              "
            >
              <p className="font-semibold text-sm sm:text-base">You can add some text here</p>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            viewport={{
              once: true,
            }}

            className="relative min-h-80 sm:min-h-96 md:min-h-120 lg:min-h-130"
          >
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Card 1 */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}

                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}

                className="
                  w-32 sm:w-40 md:w-48 lg:w-56
                  h-40 sm:h-48 md:h-56 lg:h-72
                  rounded-2xl
                  overflow-hidden
                "
              >
                <img
                  src={getImagePath('aboutus-06') || ''}
                  alt="Sustainability Card 1"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Card 2 */}
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}

                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}

                className="
                  w-36 sm:w-44 md:w-52 lg:w-60
                  h-24 sm:h-28 md:h-32 lg:h-40
                  mt-8 sm:mt-10 md:mt-12 lg:mt-16
                  rounded-2xl
                  overflow-hidden
                "
              >
                <img
                  src={getImagePath('aboutus-07') || ''}
                  alt="Sustainability Card 2"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Bottom Card */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}

              whileInView={{
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 0.7,
              }}

              viewport={{
                once: true,
              }}

              className="mt-4 sm:mt-5 md:mt-6"
            >
              <div
                className="
                  mx-auto
                  w-[70%] sm:w-[72%] md:w-[74%] lg:w-[75%]
                  h-32 sm:h-36 md:h-44 lg:h-52
                  rounded-2xl
                  overflow-hidden
                "
              >
                <img
                  src={getImagePath('aboutus-08') || ''}
                  alt="Sustainability Bottom Card"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* SVG */}
            <motion.svg
              initial={{
                opacity: 0,
              }}

              whileInView={{
                opacity: 1,
              }}

              transition={{
                duration: 1,
              }}

              viewport={{
                once: true,
              }}

              className="
                absolute
                inset-0
                w-full
                h-full
                pointer-events-none
              "

              viewBox="0 0 700 500"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="topCurvedArrowHead"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path
                    d="M 1 1 L 8 5 L 1 9"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>

                <marker
                  id="leftCurvedArrowHead"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 1 1 L 9 5 L 1 9"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>

              {/* TOP ARROW */}
              <path
                d="
                  M 350 20
                  L 360 20
                  C 430 20 470 50 470 50
                "
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                markerEnd="url(#topCurvedArrowHead)"
              />

              {/* LEFT ARROW */}
              <path
                d="
                  M 30 160
                  C -10 210 -5 265 30 310
                  C 40 322 52 330 65 335
                "
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                markerEnd="url(#leftCurvedArrowHead)"
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
