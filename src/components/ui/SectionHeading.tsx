import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  intro,
  align = "left",
  light = false,
  className,
  id,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <span className={cn("eyebrow", light && "text-mint")}>
          <span className={cn("h-px w-8", light ? "bg-mint/60" : "bg-teal/50")} aria-hidden="true" />
          {eyebrow}
        </span>
      </Reveal>
      <WordReveal
        as="h2"
        text={title}
        highlight={highlight}
        className={cn(
          "mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.06] sm:text-5xl lg:text-[3.6rem]",
          light && "!text-white",
        )}
        id={id}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 text-lg leading-relaxed", light ? "text-white/70" : "text-muted", align === "center" && "mx-auto max-w-2xl")}>
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
