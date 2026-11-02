"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star, UserRound } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/cn";

export function TestimonialsSection() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const t = testimonials[index];

  const go = useCallback((delta: number) => {
    setState(([i]) => [(i + delta + testimonials.length) % testimonials.length, delta]);
  }, []);

  useEffect(() => {
    if (paused || reduced || testimonials.length < 2) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused, reduced, go]);

  return (
    <section id="testimonials" className="section-y relative overflow-hidden">
      <div className="container-x">
        <SectionHeading eyebrow="Patient Testimonials" title="Smiles That Speak for Themselves." highlight={["Speak"]} align="center" />

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-line bg-white px-6 py-12 shadow-lift sm:px-14 sm:py-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
          >
            <Quote className="absolute left-6 top-6 h-16 w-16 text-mint sm:left-10 sm:top-8 sm:h-24 sm:w-24" aria-hidden="true" />
            {t.placeholder && (
              <span className="absolute right-5 top-5 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-amber-700">
                Placeholder — not a real review
              </span>
            )}

            <div className="relative min-h-[17rem] sm:min-h-[14rem]" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <m.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: dir * -40, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pt-8 text-center"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                >
                  <div className="flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`} role="img">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("h-5 w-5", i < t.rating ? "fill-amber-400 text-amber-400" : "text-line")} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className={cn("mx-auto mt-6 max-w-2xl text-balance font-display text-xl font-medium leading-relaxed sm:text-2xl", t.placeholder ? "text-navy/60" : "text-navy")}>
                    &ldquo;{t.review}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-center gap-3">
                    {t.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.photo} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                    ) : (
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-mint text-teal">
                        <UserRound className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                    <span className="text-left">
                      <span className="block font-display font-bold text-navy">{t.name}</span>
                      {t.treatment && <span className="block text-sm text-muted">{t.treatment}</span>}
                    </span>
                  </figcaption>
                </m.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-5">
              <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy transition hover:border-teal hover:text-teal" aria-label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    className="relative h-2.5 rounded-full bg-line transition-all duration-500"
                    style={{ width: i === index ? 32 : 10 }}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                  >
                    {i === index && <m.span layoutId="t-dot" className="absolute inset-0 rounded-full bg-teal" />}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy transition hover:border-teal hover:text-teal" aria-label="Next testimonial">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-muted">
            Genuine patient reviews will be published here with permission. Visited us recently?{" "}
            <a href="#contact" className="font-semibold text-teal underline-offset-4 hover:underline">Share your experience</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
