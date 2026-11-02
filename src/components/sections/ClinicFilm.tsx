"use client";

import { useEffect, useRef, useState } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { asset } from "@/lib/asset";

/**
 * Branded clinic introduction film — a timeline-based motion graphics sequence
 * authored and rendered with HyperFrames (source: /hyperframes/clinic-intro).
 * Lazy-loaded, muted, and paused when off-screen. Visitors who prefer reduced
 * motion see the poster and can start it manually.
 */
export function ClinicFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], ["4rem", "2rem"]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced && !userPaused) {
          v.preload = "auto";
          v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else if (!entry.isIntersecting) {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, userPaused]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={sectionRef} aria-label="Introduction to 32 Dental Care" className="relative pb-8 pt-4 lg:pb-16">
      <div className="container-x">
        <m.div style={{ scale, borderRadius: radius }} className="relative overflow-hidden bg-navy shadow-lift will-change-transform">
          <div className="relative aspect-[16/9] min-h-[15rem] w-full">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={asset("/videos/clinic-intro.jpg")}
              muted
              loop
              playsInline
              preload="none"
              aria-label="Animated introduction: 32 Dental Care, a dental clinic in Guwahati, Assam"
            >
              <source src={asset("/videos/clinic-intro.webm")} type="video/webm" />
              <source src={asset("/videos/clinic-intro.mp4")} type="video/mp4" />
            </video>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-8 sm:bottom-8">
            <Reveal>
              <p className="eyebrow !text-mint">A glimpse of who we are</p>
              <p className="mt-2 hidden max-w-md font-display text-xl font-bold text-white sm:block sm:text-2xl">
                Modern dental care in the heart of Guwahati.
              </p>
            </Reveal>
            <button
              type="button"
              onClick={toggle}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
              aria-label={playing ? "Pause introduction video" : "Play introduction video"}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
