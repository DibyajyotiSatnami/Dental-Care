"use client";

import { m, type Variants } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";
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

// Small `amount` so even very tall elements trigger on small screens.
const VIEWPORT = { once: true, amount: 0.1, margin: "0px 0px -40px 0px" } as const;
const ITEM_VIEWPORT = { once: true, amount: 0.1, margin: "0px 0px -30px 0px" } as const;

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

const StaggerCtx = createContext({ stagger: 0.09, delay: 0 });

/**
 * Container for staggered items. Each `StaggerItem` reveals itself when IT
 * enters the viewport (not when the whole group does), so very tall grids —
 * e.g. the services list on a phone — always appear. Items in the same row
 * are offset by their `index` for the cascading effect.
 */
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
  const Comp = as;
  return (
    <StaggerCtx.Provider value={{ stagger, delay }}>
      <Comp className={className}>{children}</Comp>
    </StaggerCtx.Provider>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article";
  /** Position in the group; only the position within a row (index % 3) adds delay. */
  index?: number;
}) {
  const { stagger, delay } = useContext(StaggerCtx);
  const Comp = m[as];
  return (
    <Comp
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={ITEM_VIEWPORT}
      transition={{ delay: delay + (index % 3) * stagger }}
    >
      {children}
    </Comp>
  );
}
