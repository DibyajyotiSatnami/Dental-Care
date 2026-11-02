/**
 * PATIENT TESTIMONIALS — PLACEHOLDERS ONLY
 * ─────────────────────────────────────────
 * These are NOT real reviews. They are clearly-labelled sample slots that show
 * the layout until genuine reviews are provided (e.g. copied, with permission,
 * from your Google Business Profile).
 *
 * To publish a real review: replace the text, name and rating, add an optional
 * photo path, and set `placeholder: false`. Only publish reviews you have
 * permission to use.
 */
export type Testimonial = {
  name: string;
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
  treatment?: string;
  photo?: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Patient Name",
    review:
      "Sample review — this space is reserved for a genuine patient testimonial. Replace this text with a real review shared by a patient of 32 Dental Care.",
    rating: 5,
    treatment: "Treatment received",
    placeholder: true,
  },
  {
    name: "Patient Name",
    review:
      "Sample review — genuine patient feedback will appear here once it has been collected with the patient's permission.",
    rating: 5,
    treatment: "Treatment received",
    placeholder: true,
  },
  {
    name: "Patient Name",
    review:
      "Sample review — add verified reviews from Google or directly from patients. This placeholder will be replaced with real words from real patients.",
    rating: 5,
    treatment: "Treatment received",
    placeholder: true,
  },
];
