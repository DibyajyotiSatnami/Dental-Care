import { unsplash } from "./images";

/**
 * CLINIC GALLERY — PLACEHOLDER STOCK PHOTOS
 * Replace each `src` with real 32 Dental Care photographs (e.g. "/images/gallery/reception.webp"),
 * update the caption/alt and set `placeholder: false`.
 * `span` controls the asymmetric layout on large screens: "tall" | "wide" | "normal".
 */
export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  span: "tall" | "wide" | "normal";
  placeholder: boolean;
};

export const gallery: GalleryItem[] = [
  { src: unsplash("1629909613654-28e377c37b09"), alt: "Dentist with a patient in the treatment room", caption: "Dentist & Patient Care", span: "tall", placeholder: true },
  { src: unsplash("1588776814546-1ffcf47267a5"), alt: "Modern dental treatment room", caption: "Treatment Room", span: "wide", placeholder: true },
  { src: unsplash("1598256989800-fe5f95da9787"), alt: "Bright clinic reception and waiting area", caption: "Reception", span: "normal", placeholder: true },
  { src: unsplash("1606811971618-4486d14f3f99"), alt: "Modern dental equipment", caption: "Modern Equipment", span: "normal", placeholder: true },
  { src: unsplash("1609840114035-3c981b782dfe"), alt: "Dental team preparing for treatment", caption: "Dentist & Staff", span: "wide", placeholder: true },
  { src: unsplash("1629909615184-74f495363b67"), alt: "Calm, comfortable clinic interior", caption: "Clinic Interiors", span: "wide", placeholder: true },
  { src: unsplash("1606811841689-23dfddce3e95"), alt: "Patient-friendly consultation space", caption: "Patient-Friendly Environment", span: "wide", placeholder: true },
];
