"use client";

import { m } from "motion/react";
import { EASE } from "./Reveal";

/**
 * Editorial word-by-word headline reveal. Each word rises from behind a mask.
 * Screen readers get the plain sentence via aria-label.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  highlight = [],
  as = "h1",
  animateOnMount = false,
  id,
}: {
  id?: string;
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Words (exact match, punctuation included) rendered in the accent gradient. */
  highlight?: string[];
  as?: "h1" | "h2" | "p";
  animateOnMount?: boolean;
}) {
  const Tag = m[as];
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <Tag
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <m.span
            className={
              "inline-block will-change-transform " +
              (highlight.includes(word)
                ? "bg-gradient-to-r from-teal via-[#0a9aa8] to-navy bg-clip-text text-transparent"
                : "")
            }
            variants={{
              hidden: { y: "110%", opacity: 0, rotate: 2 },
              show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </m.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
