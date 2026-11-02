import { site } from "@/config/site";
import { services } from "@/content/services";
import { normalizeWhatsAppNumber } from "./whatsapp";

/**
 * schema.org Dentist (LocalBusiness) data for Google.
 * Only verified details from src/config/site.ts are included — fields that are
 * still placeholders (null) are omitted automatically.
 */
export function dentistJsonLd() {
  const { location, contact, openingHours, social } = site;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${site.url}/#dentist`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
      ...(location.streetAddress ? { streetAddress: location.streetAddress } : {}),
      ...(location.postalCode ? { postalCode: location.postalCode } : {}),
    },
    areaServed: { "@type": "City", name: location.city },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "appointments",
      telephone: `+${normalizeWhatsAppNumber(contact.whatsapp, contact.whatsappCountryCode)}`,
      contactOption: "WhatsApp",
      availableLanguage: ["English", "Hindi", "Assamese"],
    },
    availableService: services.map((s) => ({ "@type": "MedicalProcedure", name: s.name })),
  };
  if (contact.phone) data.telephone = `+${normalizeWhatsAppNumber(contact.phone, contact.whatsappCountryCode)}`;
  if (contact.email) data.email = contact.email;
  if (location.mapLink) data.hasMap = location.mapLink;
  if (social.length) data.sameAs = social.map((s) => s.url);
  if (openingHours) data.openingHours = openingHours.map((h) => `${h.days} ${h.hours}`);
  return data;
}
