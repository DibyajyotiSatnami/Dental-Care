import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeWhatsAppNumber,
  buildWhatsAppUrl,
  validatePhone,
  formatDisplayDate,
  buildAppointmentMessage,
} from "../src/lib/whatsapp.ts";

test("normalises the clinic number to international format", () => {
  assert.equal(normalizeWhatsAppNumber("07002715099"), "917002715099");
  assert.equal(normalizeWhatsAppNumber("7002715099"), "917002715099");
  assert.equal(normalizeWhatsAppNumber("+91 70027 15099"), "917002715099");
  assert.equal(normalizeWhatsAppNumber("917002715099"), "917002715099");
});

test("builds an encoded wa.me URL", () => {
  const url = buildWhatsAppUrl("07002715099", "Hello & welcome!\nLine 2");
  assert.equal(url, "https://wa.me/917002715099?text=Hello%20%26%20welcome!%0ALine%202");
  assert.equal(buildWhatsAppUrl("07002715099"), "https://wa.me/917002715099");
});

test("validates Indian and international phone numbers", () => {
  assert.deepEqual(validatePhone("9876543210"), { valid: true, normalized: "9876543210" });
  assert.deepEqual(validatePhone("+91 98765-43210"), { valid: true, normalized: "9876543210" });
  assert.deepEqual(validatePhone("09876543210"), { valid: true, normalized: "9876543210" });
  assert.equal(validatePhone("+44 20 7946 0958").valid, true);
  assert.equal(validatePhone("12345").valid, false);
  assert.equal(validatePhone("5876543210").valid, false);
  assert.equal(validatePhone("98765abc10").valid, false);
  assert.equal(validatePhone("").valid, false);
});

test("formats dates for the message", () => {
  assert.equal(formatDisplayDate("2026-11-10"), "10 November 2026");
  assert.equal(formatDisplayDate("2027-01-03"), "3 January 2027");
});

test("builds the appointment message in the agreed format", () => {
  const msg = buildAppointmentMessage({
    name: "Rahul Sharma",
    phone: "9876543210",
    service: "Root Canal Treatment",
    date: "2026-11-10",
    time: "11:00 AM",
    message: "I am experiencing tooth pain.",
  });
  assert.equal(
    msg,
    [
      "Hello 32 Dental Care!",
      "I would like to request a dental appointment.",
      "",
      "Patient Details:",
      "Name: Rahul Sharma",
      "Phone: 9876543210",
      "",
      "Appointment Details:",
      "Service: Root Canal Treatment",
      "Preferred Date: 10 November 2026",
      "Preferred Time: 11:00 AM",
      "",
      "Additional Message:",
      "I am experiencing tooth pain.",
      "",
      "Please let me know if this appointment time is available.",
      "Thank you!",
    ].join("\n"),
  );
  assert.ok(!buildAppointmentMessage({ name: "A", phone: "9", service: "S", date: "2026-11-10", time: "t" }).includes("Additional Message"));
});

import { buildWhatsAppWebUrl, slotToMinutes, isMobileUserAgent } from "../src/lib/whatsapp.ts";

test("desktop WhatsApp Web link and helpers", () => {
  assert.equal(buildWhatsAppWebUrl("07002715099", "Hi there"), "https://web.whatsapp.com/send?phone=917002715099&text=Hi%20there");
  assert.equal(slotToMinutes("09:30 AM"), 570);
  assert.equal(slotToMinutes("12:00 PM"), 720);
  assert.equal(slotToMinutes("12:30 AM"), 30);
  assert.equal(slotToMinutes("07:30 PM"), 1170);
  assert.equal(isMobileUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"), true);
  assert.equal(isMobileUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"), false);
});
