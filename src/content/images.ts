/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IMAGE LIBRARY — PLACEHOLDER STOCK PHOTOGRAPHY
 * ─────────────────────────────────────────────────────────────────────────────
 *  All photographs on the site are referenced from this one file.
 *  They are temporary stock images (Unsplash) and must be replaced with real
 *  32 Dental Care photographs.
 *
 *  To replace an image:
 *   1. Put your photo in /public/images/ (WebP or AVIF, ~1600px wide is ideal).
 *   2. Change `src` below to e.g. "/images/reception.webp".
 *   3. Update `alt` to describe the real photo, and set `placeholder: false`.
 *
 *  If a remote image ever fails to load, the site shows an elegant branded
 *  fallback instead of a broken image.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** true while this is a stock / placeholder photo (shows a small "Placeholder photo" tag). */
  placeholder: boolean;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  hero: {
    src: unsplash("1629909613654-28e377c37b09"),
    alt: "Dentist gently examining a smiling patient in a bright, modern dental treatment room",
    placeholder: true,
  },
  aboutClinic: {
    src: unsplash("1588776814546-1ffcf47267a5"),
    alt: "Clean, modern dental treatment room with a patient chair and overhead light",
    placeholder: true,
  },
  aboutCare: {
    src: unsplash("1606811971618-4486d14f3f99"),
    alt: "Dentist explaining a treatment plan to a relaxed patient",
    placeholder: true,
  },
  whyChoose: {
    src: unsplash("1609840114035-3c981b782dfe"),
    alt: "Dental professional wearing gloves preparing sterilised instruments",
    placeholder: true,
  },
  appointment: {
    src: unsplash("1598256989800-fe5f95da9787"),
    alt: "Welcoming dental clinic interior with soft natural light",
    placeholder: true,
  },
} satisfies Record<string, SiteImage>;

/**
 * Append Unsplash resizing params (served as WebP/AVIF automatically).
 * Local images are returned unchanged.
 */
export function sized(src: string, width: number, quality = 72): string {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  return `${src}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export function srcSet(src: string, widths: number[] = [480, 768, 1080, 1440, 1920]): string | undefined {
  if (!src.startsWith("https://images.unsplash.com/")) return undefined;
  return widths.map((w) => `${sized(src, w)} ${w}w`).join(", ");
}

export { unsplash };
