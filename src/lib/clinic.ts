import { site } from "@/config/site";
import {
  buildWhatsAppUrl,
  buildServiceEnquiryMessage,
  buildGeneralEnquiryMessage,
  normalizeWhatsAppNumber,
} from "./whatsapp";

/** wa.me link to the clinic with an optional pre-filled message. */
export const clinicWhatsAppUrl = (message?: string) =>
  buildWhatsAppUrl(site.contact.whatsapp, message, site.contact.whatsappCountryCode);

export const generalWhatsAppUrl = () => clinicWhatsAppUrl(buildGeneralEnquiryMessage(site.name));
export const serviceWhatsAppUrl = (service: string) => clinicWhatsAppUrl(buildServiceEnquiryMessage(service, site.name));

/** "+91 70027 15099" — pretty international display. */
export function prettyWhatsApp(): string {
  const n = normalizeWhatsAppNumber(site.contact.whatsapp, site.contact.whatsappCountryCode);
  const cc = site.contact.whatsappCountryCode;
  const local = n.slice(cc.length);
  return local.length === 10 ? `+${cc} ${local.slice(0, 5)} ${local.slice(5)}` : `+${n}`;
}

/** tel: link for the verified phone number, or null when not yet provided. */
export function telHref(): string | null {
  const p = site.contact.phone;
  if (!p) return null;
  return `tel:+${normalizeWhatsAppNumber(p, site.contact.whatsappCountryCode)}`;
}

export { buildWhatsAppWebUrl } from "./whatsapp";
