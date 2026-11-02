"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { gallery } from "@/content/gallery";
import { sized } from "@/content/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Modal } from "@/components/ui/Modal";
import { Stagger, StaggerItem, scaleIn } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const spanClass = {
  tall: "lg:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
} as const;

export function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const open = index !== null;

  const go = useCallback((delta: number) => {
    setDir(delta);
    setIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const item = index !== null ? gallery[index] : null;

  return (
    <section id="gallery" className="section-y relative bg-cream/60">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Clinic Gallery" title="A Glimpse Inside 32 Dental Care." highlight={["Inside"]} />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {/* PLACEHOLDER notice — remove once real clinic photographs are added in src/content/gallery.ts */}
            Temporary stock images shown — real photographs of our clinic will be added soon. Tap any photo to enlarge.
          </p>
        </div>

        <Stagger className="mt-14 grid grid-flow-row-dense auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4" stagger={0.07}>
          {gallery.map((g, i) => (
            <StaggerItem key={i} variants={scaleIn} className={cn("relative", spanClass[g.span])}>
              <button
                type="button"
                onClick={() => { setDir(1); setIndex(i); }}
                className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] text-left shadow-soft"
                aria-label={`Open photo: ${g.caption}`}
              >
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.08]">
                  <SmartImage src={g.src} alt={g.alt} width={g.span === "normal" ? 600 : 1000} sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 92vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                  <span className="font-display text-base font-semibold text-white">{g.caption}</span>
                  <span className="grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                {g.placeholder && (
                  <span className="absolute left-3 top-3 rounded-full bg-navy/60 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                    Placeholder
                  </span>
                )}
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Modal open={open} onClose={() => setIndex(null)} label="Photo viewer" dark className="max-w-6xl">
        {item && (
          <figure className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] bg-navy-950 sm:aspect-[16/10]">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <m.div
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -60 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SmartImage src={item.src} alt={item.alt} width={1800} sizes="90vw" className="object-contain" priority />
                </m.div>
              </AnimatePresence>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 px-1 text-white">
              <span className="font-display text-lg font-semibold">{item.caption}</span>
              <span className="text-sm text-white/60">{(index ?? 0) + 1} / {gallery.length}</span>
            </figcaption>
            <button type="button" onClick={() => go(-1)} className="absolute left-3 top-[45%] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-lift transition hover:bg-white" aria-label="Previous photo">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-3 top-[45%] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-lift transition hover:bg-white" aria-label="Next photo">
              <ChevronRight className="h-5 w-5" />
            </button>
            {/* Preload neighbours for instant navigation */}
            <link rel="prefetch" href={sized(gallery[((index ?? 0) + 1) % gallery.length].src, 1800)} />
          </figure>
        )}
      </Modal>
    </section>
  );
}
