"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global motion setup:
 *  - LazyMotion keeps the animation bundle small (components use `m.*`).
 *  - reducedMotion="user" automatically disables transform animations for
 *    visitors who enable "reduce motion" in their OS settings.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
