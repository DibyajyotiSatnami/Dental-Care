"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -60px 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "article" | "span" | "p" | "h2" | "header";
};

/** Scroll-triggered reveal that plays once when the element enters the viewport. */
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
      custom={delay}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its `StaggerItem` children as they scroll into view. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article";
}) {
  const Comp = m[as];
  return (
    <Comp className={cn(className)} variants={variants}>
      {children}
    </Comp>
  );
}
