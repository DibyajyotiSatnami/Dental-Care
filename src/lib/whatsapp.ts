/**
 * WhatsApp Click-to-Chat helpers.
 *
 * Nothing is sent to any server: the patient's details are only placed in a
 * pre-filled WhatsApp message that the patient reviews and sends themselves.
 * The clinic then confirms the appointment in that WhatsApp conversation.
 *
 * Kept free of React / browser APIs so it can be unit-tested with Node.
 */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Convert a locally written number to the international digits-only format
 * required by wa.me. "07002715099" + "91" → "917002715099".
 */
export function normalizeWhatsAppNumber(raw: string, countryCode = "91"): string {
  let digits = raw.replace(/\D/g, "");
  if (raw.trim().startsWith("+")) return digits; // already international
  if (digits.startsWith("00")) return digits.slice(2); // 00-prefixed international
  digits = digits.replace(/^0+/, ""); // remove trunk prefix (leading zero)
  if (digits.startsWith(countryCode) && digits.length > 10) return digits;
  return countryCode + digits;
}

/** Build a wa.me link, optionally with a pre-filled message. */
export function buildWhatsAppUrl(number: string, message?: string, countryCode = "91"): string {
  const base = `https://wa.me/${normalizeWhatsAppNumber(number, countryCode)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type PhoneCheck = { valid: true; normalized: string } | { valid: false; reason: string };

/**
 * Validate the patient's phone number.
 * Accepts Indian mobile numbers (with or without +91 / 0 prefix) and
 * international numbers written with a leading "+".
 */
export function validatePhone(input: string): PhoneCheck {
  const trimmed = input.trim();
  if (!trimmed) return { valid: false, reason: "Please enter your phone number." };
  if (/[^\d\s()+-]/.test(trimmed)) {
    return { valid: false, reason: "Phone number can only contain digits, spaces, +, - and brackets." };
  }
  const digits = trimmed.replace(/\D/g, "");

  // International number other than India
  if (trimmed.startsWith("+") && !digits.startsWith("91")) {
    return digits.length >= 8 && digits.length <= 15
      ? { valid: true, normalized: `+${digits}` }
      : { valid: false, reason: "Please enter a valid international phone number." };
  }

  let local = digits;
  if (local.length === 12 && local.startsWith("91")) local = local.slice(2);
  else if (local.length === 11 && local.startsWith("0")) local = local.slice(1);

  if (/^[6-9]\d{9}$/.test(local)) return { valid: true, normalized: local };
  return { valid: false, reason: "Please enter a valid 10-digit mobile number." };
}

/** "2026-11-10" → "10 November 2026" (timezone-safe, no Date parsing). */
export function formatDisplayDate(isoDate: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return isoDate;
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${Number(m[3])} ${month} ${m[1]}` : isoDate;
}

/** Today's date as YYYY-MM-DD in the visitor's local timezone. */
export function todayIso(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export type AppointmentDetails = {
  name: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string;
  message?: string;
};

/** Remove control characters and cap length so the message stays tidy. */
function clean(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

/** Compose the formatted WhatsApp appointment request. */
export function buildAppointmentMessage(d: AppointmentDetails, clinicName = "32 Dental Care"): string {
  const lines = [
    `Hello ${clinicName}!`,
    "I would like to request a dental appointment.",
    "",
    "Patient Details:",
    `Name: ${clean(d.name, 80)}`,
    `Phone: ${clean(d.phone, 20)}`,
    "",
    "Appointment Details:",
    `Service: ${clean(d.service, 80)}`,
    `Preferred Date: ${formatDisplayDate(d.date)}`,
    `Preferred Time: ${clean(d.time, 20)}`,
  ];
  const extra = d.message ? clean(d.message, 500) : "";
  if (extra) lines.push("", "Additional Message:", extra);
  lines.push("", "Please let me know if this appointment time is available.", "Thank you!");
  return lines.join("\n");
}

/** Short pre-filled message used by "Book This Treatment" buttons. */
export function buildServiceEnquiryMessage(service: string, clinicName = "32 Dental Care"): string {
  return [
    `Hello ${clinicName}!`,
    `I would like to enquire about / book an appointment for: ${service}.`,
    "",
    "Please let me know the available appointment times.",
    "Thank you!",
  ].join("\n");
}

export function buildGeneralEnquiryMessage(clinicName = "32 Dental Care"): string {
  return `Hello ${clinicName}!\nI would like to book a dental appointment. Please share the available times.\nThank you!`;
}

/** WhatsApp Web link (desktop) — same chat and message as wa.me, but skips the landing page. */
export function buildWhatsAppWebUrl(number: string, message: string, countryCode = "91"): string {
  return `https://web.whatsapp.com/send?phone=${normalizeWhatsAppNumber(number, countryCode)}&text=${encodeURIComponent(message)}`;
}

/** Rough mobile/tablet detection used only to choose app vs WhatsApp Web. */
export function isMobileUserAgent(ua: string): boolean {
  return /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile|webOS|BlackBerry/i.test(ua);
}

/** Convert a slot label like "02:30 PM" to minutes after midnight. */
export function slotToMinutes(slot: string): number | null {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(slot.trim());
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2]);
}
