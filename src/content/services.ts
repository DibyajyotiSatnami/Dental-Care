import { unsplash } from "./images";

/**
 * Dental services shown in the Services section, the booking form dropdown,
 * the footer and the structured data. Edit text here.
 *
 * PLACEHOLDER: `price` — add real pricing (e.g. "From ₹1,500") or leave null
 * to show "Pricing on enquiry".
 * PLACEHOLDER: `image` — stock photos; replace with your own when available.
 */

export type ServiceIcon =
  | "stethoscope" | "sparkles" | "shield" | "sun" | "anchor"
  | "align" | "extract" | "wand" | "crown" | "baby";

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  expect: string[];
  icon: ServiceIcon;
  image: string;
  imageAlt: string;
  price: string | null;
};

export const services: Service[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    short: "Routine check-ups, examinations and preventive care to keep your teeth and gums healthy.",
    description:
      "Regular dental check-ups help identify concerns early, when they are usually simpler to manage. A general consultation includes an examination of your teeth and gums and a discussion of any symptoms or questions you may have.",
    expect: [
      "A thorough oral examination",
      "Discussion of your concerns and dental history",
      "Preventive advice tailored to you",
      "A clear explanation of any recommended treatment",
    ],
    icon: "stethoscope",
    image: unsplash("1606811841689-23dfddce3e95"),
    imageAlt: "Dentist performing a routine dental check-up",
    price: null,
  },
  {
    slug: "teeth-cleaning-scaling",
    name: "Teeth Cleaning & Scaling",
    short: "Professional removal of plaque and tartar for fresher breath and healthier gums.",
    description:
      "Plaque and tartar can build up even with careful brushing. Professional cleaning and scaling removes these deposits from tooth surfaces and along the gumline, supporting gum health.",
    expect: [
      "Gentle removal of plaque and tartar",
      "Polishing of tooth surfaces",
      "Guidance on brushing and flossing technique",
      "Recommendations for your next visit",
    ],
    icon: "sparkles",
    image: unsplash("1559591937-abc3a5b2d5ef"),
    imageAlt: "Dental hygienist cleaning a patient's teeth",
    price: null,
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    short: "Treatment for infected or inflamed tooth pulp, aimed at relieving pain and saving the tooth.",
    description:
      "When the inner pulp of a tooth becomes infected or inflamed, root canal treatment cleans and seals the root canals. It is often recommended to relieve pain and help retain the natural tooth.",
    expect: [
      "Examination and diagnosis of the affected tooth",
      "Local anaesthesia for comfort",
      "Cleaning, shaping and sealing of the canals",
      "Advice on restoring the tooth afterwards",
    ],
    icon: "shield",
    image: unsplash("1629909615184-74f495363b67"),
    imageAlt: "Dentist carefully treating a patient's tooth",
    price: null,
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    short: "Professionally supervised whitening to brighten stained or discoloured teeth.",
    description:
      "Teeth whitening can lighten stains caused by food, drinks and everyday habits. An assessment first helps determine whether whitening is suitable for you and what results to reasonably expect.",
    expect: [
      "Assessment of tooth shade and suitability",
      "Discussion of realistic outcomes",
      "Professionally supervised whitening",
      "Aftercare tips to maintain your results",
    ],
    icon: "sun",
    image: unsplash("1581585093004-9ec3e4bdbb6d"),
    imageAlt: "Close-up of a bright, healthy smile",
    price: null,
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    short: "A long-term option to replace missing teeth with natural-looking restorations.",
    description:
      "Dental implants replace the root of a missing tooth and support a crown, bridge or denture. A detailed evaluation determines whether implants are a suitable option for you.",
    expect: [
      "Evaluation of oral health and bone support",
      "A personalised treatment plan",
      "Step-by-step explanation of each stage",
      "Guidance on care and maintenance",
    ],
    icon: "anchor",
    image: unsplash("1588776814546-daab30f310ce"),
    imageAlt: "Dental model used to explain implant treatment",
    price: null,
  },
  {
    slug: "braces-orthodontics",
    name: "Braces & Orthodontics",
    short: "Orthodontic options to straighten teeth and improve bite alignment.",
    description:
      "Orthodontic treatment gradually moves teeth into better alignment, which can improve both appearance and function. Options are discussed after an assessment of your teeth and bite.",
    expect: [
      "Assessment of alignment and bite",
      "Discussion of suitable orthodontic options",
      "A treatment timeline explained clearly",
      "Regular reviews throughout treatment",
    ],
    icon: "align",
    image: unsplash("1593022356769-11f762e25ed9"),
    imageAlt: "Smiling young person wearing dental braces",
    price: null,
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    short: "Careful removal of damaged, decayed or problematic teeth when needed.",
    description:
      "Sometimes a tooth cannot be saved or is causing problems, such as an impacted wisdom tooth. Extractions are planned carefully with your comfort in mind, along with clear aftercare instructions.",
    expect: [
      "Examination to confirm extraction is needed",
      "Local anaesthesia for comfort",
      "Careful, gentle removal",
      "Detailed aftercare instructions",
    ],
    icon: "extract",
    image: unsplash("1612349317150-e413f6a5b16d"),
    imageAlt: "Dentist reassuring a patient before treatment",
    price: null,
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    short: "Treatments that enhance the appearance of your smile, planned around your goals.",
    description:
      "Cosmetic dentistry covers treatments that improve the look of your teeth, such as reshaping, bonding, veneers or whitening. Every plan starts with understanding what you would like to change.",
    expect: [
      "A smile consultation focused on your goals",
      "Explanation of suitable cosmetic options",
      "A personalised treatment plan",
      "Care advice to keep your smile looking its best",
    ],
    icon: "wand",
    image: unsplash("1570612861542-284f4c12e75f"),
    imageAlt: "Woman with a confident, natural smile",
    price: null,
  },
  {
    slug: "crowns-bridges",
    name: "Dental Crowns & Bridges",
    short: "Restorations that protect weakened teeth or replace missing ones.",
    description:
      "A crown covers and protects a damaged or weakened tooth, while a bridge can replace one or more missing teeth. Both are designed to restore function and blend with your natural smile.",
    expect: [
      "Assessment of the tooth or gap",
      "Discussion of material options",
      "Preparation and impressions",
      "Fitting and bite adjustment",
    ],
    icon: "crown",
    image: unsplash("1606265752439-1f18756aa5fc"),
    imageAlt: "Dental crown models and instruments on a tray",
    price: null,
  },
  {
    slug: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    short: "Gentle, friendly dental care that helps children build healthy habits early.",
    description:
      "Children's dental visits focus on prevention, gentle care and making the experience positive. Early visits help monitor development and build good habits for life.",
    expect: [
      "A calm, child-friendly approach",
      "Check-up of teeth and development",
      "Preventive care and advice for parents",
      "Tips to make brushing fun at home",
    ],
    icon: "baby",
    image: unsplash("1588776814546-ec7e8c1f5b2c"),
    imageAlt: "Happy child at a dental visit",
    price: null,
  },
];

export const serviceOptions = [...services.map((s) => s.name), "Other"];
