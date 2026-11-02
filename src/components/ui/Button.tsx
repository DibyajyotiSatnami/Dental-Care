"use client";

import { m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-tight " +
  "transition-[background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-premium)] select-none " +
  "disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-teal text-white shadow-glow hover:bg-teal-600",
  dark: "bg-navy text-white shadow-soft hover:bg-navy-900",
  outline: "border border-navy/15 bg-white/60 text-navy backdrop-blur hover:border-teal/40 hover:bg-white",
  light: "bg-white text-navy shadow-soft hover:bg-mint",
  ghost: "text-navy hover:text-teal",
  whatsapp: "bg-[#1fae5b] text-white shadow-[0_18px_40px_-16px_rgba(31,174,91,0.7)] hover:bg-[#189a4f]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

const motionProps = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 28 },
} as const;

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: Common & HTMLMotionProps<"a"> & { external?: boolean }) {
  return (
    <m.a
      className={cn(base, variants[variant], sizes[size], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...motionProps}
      {...rest}
    >
      {children}
    </m.a>
  );
}

export function Button({ variant = "primary", size = "md", className, children, ...rest }: Common & HTMLMotionProps<"button">) {
  return (
    <m.button className={cn(base, variants[variant], sizes[size], className)} {...motionProps} {...rest}>
      {children}
    </m.button>
  );
}
