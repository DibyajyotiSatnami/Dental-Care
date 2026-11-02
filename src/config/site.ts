/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  32 DENTAL CARE — CENTRAL CLINIC CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every piece of clinic information shown on the website lives in this file.
 *  Update a value here and it changes everywhere (pages, footer, structured
 *  data for Google, WhatsApp messages).
 *
 *  Values set to `null` are NOT YET PROVIDED. The site will show a clearly
 *  marked "To be updated" placeholder for them and will leave them OUT of the
 *  Google structured data, so no unverified information is ever published.
 *
 *  Search the project for "PLACEHOLDER" to find every item that needs real data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type SocialLink = { label: "Instagram" | "Facebook" | "YouTube" | "Google"; url: string };

export const site = {
  name: "32 Dental Care",
  shortName: "32 Dental",
  tagline: "Your Smile. Our Passion. Your Health.",
  description:
    "32 Dental Care is a modern dental clinic in Guwahati, Assam offering general dentistry, teeth cleaning, root canal treatment, teeth whitening, implants, braces and more. Book your appointment on WhatsApp.",

  /** PLACEHOLDER: set to the live domain once the site is published (no trailing slash). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  location: {
    city: "Guwahati",
    region: "Assam",
    country: "India",
    countryCode: "IN",
    /** PLACEHOLDER: full street address, e.g. "1st Floor, ABC Complex, GS Road". */
    streetAddress: null as string | null,
    /** PLACEHOLDER: postal PIN code, e.g. "781005". */
    postalCode: null as string | null,
    /**
     * PLACEHOLDER: Google Maps embed URL. In Google Maps → Share → "Embed a map",
     * copy only the `src="…"` value. The map appears automatically once set.
     */
    mapEmbedUrl: null as string | null,
    /** PLACEHOLDER: Google Maps share link used for the "Get directions" button. */
    mapLink: null as string | null,
  },

  contact: {
    /** WhatsApp number exactly as provided by the clinic (normalised automatically). */
    whatsapp: "07002715099",
    whatsappCountryCode: "91",
    /**
     * PLACEHOLDER: verified phone number for calls. Click-to-call buttons only
     * appear when this is set. If the WhatsApp number also accepts calls,
     * set this to "07002715099".
     */
    phone: null as string | null,
    /** PLACEHOLDER: clinic email address. */
    email: null as string | null,
  },

  /**
   * PLACEHOLDER: opening hours. Example:
   *   [{ days: "Monday – Saturday", hours: "10:00 AM – 8:00 PM" }, { days: "Sunday", hours: "Closed" }]
   */
  openingHours: null as { days: string; hours: string }[] | null,

  /** PLACEHOLDER: add real profile URLs. Icons only appear for links that are set. */
  social: [] as SocialLink[],

  dentist: {
    /** PLACEHOLDER: dentist's full name, e.g. "Dr. Firstname Lastname". */
    name: "Doctor",
    /** PLACEHOLDER: e.g. "BDS, MDS (Conservative Dentistry & Endodontics)". */
    qualifications: null as string | null,
    /** PLACEHOLDER */
    specialization: null as string | null,
    /** PLACEHOLDER: e.g. "10+ years". */
    experience: null as string | null,
    /** PLACEHOLDER: dental council registration number, if you wish to display it. */
    registration: null as string | null,
    /** PLACEHOLDER: replace with the real portrait, e.g. "/images/dentist.webp". */
    photo: "/images/placeholders/dentist-portrait.svg",
    photoIsPlaceholder: true,
  },

  /** Appointment time slots offered in the booking form. Adjust to match opening hours. */
  appointmentSlots: [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Dentist", href: "#dentist" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

/** Human readable full address built from whatever is available. */
export function displayAddress(): string {
  const { streetAddress, city, region, country, postalCode } = site.location;
  return [streetAddress, city, region + (postalCode ? ` ${postalCode}` : ""), country]
    .filter(Boolean)
    .join(", ");
}
