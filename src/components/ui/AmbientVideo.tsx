"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/**
 * Plays a HyperFrames-rendered motion sequence (see /hyperframes) as a muted,
 * looping background. Heavy video is skipped on phones and for visitors who
 * prefer reduced motion — they see the lightweight poster frame instead.
 * The video only loads once it is near the viewport and pauses off-screen.
 */
export function AmbientVideo({
  name,
  className,
  allowOnMobile = false,
}: {
  /** Base file name in /public/videos, e.g. "hero-ambient" → hero-ambient.webm/.mp4/.jpg */
  name: string;
  className?: string;
  allowOnMobile?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const enabled = !reduced && (allowOnMobile || !isMobile);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  const poster = `/videos/${name}.jpg`;

  if (!enabled) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" aria-hidden="true" className={cn("h-full w-full object-cover", className)} />;
  }

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={poster}
      muted
      loop
      playsInline
      preload={inView ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
