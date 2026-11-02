"use client";

import { useState, type ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";
import { sized, srcSet } from "@/content/images";
import { cn } from "@/lib/cn";
import { ToothIcon } from "./icons";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  src: string;
  alt: string;
  /** Rendered width used for the default (non-srcset) URL. */
  width?: number;
  sizes?: string;
  priority?: boolean;
  /** Show a discreet "Placeholder photo" tag. */
  placeholderTag?: boolean;
  wrapperClassName?: string;
};

/**
 * Responsive, lazy-loaded image with automatic WebP/AVIF (via the image CDN),
 * and a branded fallback if the image cannot be loaded.
 * It fills its (relatively positioned) wrapper — size the wrapper to avoid layout shift.
 */
export function SmartImage({
  src,
  alt,
  width = 1200,
  sizes = "100vw",
  priority = false,
  placeholderTag = false,
  className,
  wrapperClassName,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-mint/60", wrapperClassName)}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-mint via-white to-mint-200 text-teal"
        >
          <ToothIcon className="h-10 w-10 opacity-70" />
          <span className="flex items-center gap-1.5 px-6 text-center text-xs font-medium text-muted">
            <ImageOff className="h-3.5 w-3.5" aria-hidden="true" /> Clinic photo coming soon
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sized(src, width)}
          srcSet={srcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("absolute inset-0 h-full w-full object-cover text-transparent", className)}
          {...rest}
        />
      )}
      {placeholderTag && (
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-navy/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
          Placeholder photo
        </span>
      )}
    </div>
  );
}
