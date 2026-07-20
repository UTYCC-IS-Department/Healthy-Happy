"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function AnimatedContent({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.main
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1"
    >
      {children}
    </motion.main>
  );
}
