"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import {
  AlertCircle, CalendarDays, CheckCircle2, ChevronDown, Clock, ExternalLink,
  MessageSquareText, Phone, RotateCcw, Stethoscope, UserRound,
} from "lucide-react";
import { site } from "@/config/site";
import { serviceOptions } from "@/content/services";
import { images } from "@/content/images";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal, EASE } from "@/components/motion/Reveal";
import {
  buildAppointmentMessage, buildWhatsAppUrl, buildWhatsAppWebUrl, isMobileUserAgent,
  slotToMinutes, todayIso, validatePhone,
} from "@/lib/whatsapp";
import { prettyWhatsApp } from "@/lib/clinic";
import { cn } from "@/lib/cn";

type Values = { name: string; phone: string; service: string; date: string; time: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", phone: "", service: "", date: "", time: "", message: "" };
const MAX_MESSAGE = 500;
const MAX_DAYS_AHEAD = 180;

function addDays(iso: string, days: number): string {
  const [y, mo, d] = iso.split("-").map(Number);
  return todayIso(new Date(y, mo - 1, d + days));
}

function validate(v: Values): Errors {
  const e: Errors = {};
  const name = v.name.trim();
  if (!name) e.name = "Please enter your full name.";
  else if (name.length < 2) e.name = "Name looks too short.";
  else if (!/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(name)) e.name = "Please use letters only (spaces, dots and hyphens are fine).";

  const phone = validatePhone(v.phone);
  if (!phone.valid) e.phone = phone.reason;

  if (!v.service) e.service = "Please select a dental service.";

  const today = todayIso();
  if (!v.date) e.date = "Please choose your preferred date.";
  else if (v.date < today) e.date = "Please choose today or a future date.";
  else if (v.date > addDays(today, MAX_DAYS_AHEAD)) e.date = "Please choose a date within the next 6 months.";

  if (!v.time) e.time = "Please choose your preferred time.";
  else if (v.date === today) {
    const now = new Date();
    const slot = slotToMinutes(v.time);
    if (slot !== null && slot <= now.getHours() * 60 + now.getMinutes()) e.time = "This time has already passed today — please pick a later slot.";
  }

  if (v.message.length > MAX_MESSAGE) e.message = `Please keep the message under ${MAX_MESSAGE} characters.`;
  return e;
}

export function AppointmentForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [links, setLinks] = useState<{ app: string; web: string; blocked: boolean } | null>(null);
  const [minDate, setMinDate] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();

  useEffect(() => setMinDate(todayIso()), []);

  // "Use the Booking Form" from a service detail pre-selects that service.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (serviceOptions.includes(name)) {
        setValues((v) => ({ ...v, service: name }));
        setStatus("idle");
      }
    };
    window.addEventListener("select-service", onSelect);
    return () => window.removeEventListener("select-service", onSelect);
  }, []);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };
  const blur = (key: keyof Values) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, phone: true, service: true, date: true, time: true, message: true });
    if (Object.keys(errs).length) {
      // Keep everything the patient typed; move focus to the first problem.
      const first = (Object.keys(EMPTY) as (keyof Values)[]).find((k) => errs[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const phone = validatePhone(values.phone);
    const message = buildAppointmentMessage(
      {
        name: values.name,
        phone: phone.valid ? phone.normalized : values.phone,
        service: values.service,
        date: values.date,
        time: values.time,
        message: values.message,
      },
      site.name,
    );
    const app = buildWhatsAppUrl(site.contact.whatsapp, message, site.contact.whatsappCountryCode);
    const web = buildWhatsAppWebUrl(site.contact.whatsapp, message, site.contact.whatsappCountryCode);

    let blocked = false;
    if (isMobileUserAgent(navigator.userAgent)) {
      // Phones & tablets: wa.me hands over to the WhatsApp app.
      window.location.href = app;
    } else {
      // Desktop: open WhatsApp Web in a new tab.
      // (No "noopener" feature string: it makes window.open return null even on
      // success, which would hide real pop-up blocking. Opener is cleared instead.)
      const win = window.open(web, "_blank");
      if (win) win.opener = null;
      blocked = !win;
    }
    setLinks({ app, web, blocked });
    setStatus("sent");
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setLinks(null);
  }

  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined);

  return (
    <section id="appointment" className="section-y relative overflow-hidden">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-navy shadow-lift">
          <div className="pointer-events-none absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-teal/40 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-12 p-5 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
            {/* Left: invitation */}
            <div className="flex flex-col">
              <Reveal>
                <span className="eyebrow !text-mint">
                  <span className="h-px w-8 bg-mint/60" aria-hidden="true" /> Book an Appointment
                </span>
              </Reveal>
              <WordReveal
                as="h2"
                text="Ready for a Healthier, Brighter Smile?"
                highlight={[]}
                className="mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.06] !text-white sm:text-5xl"
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-lg leading-relaxed text-white/70">
                  Take the first step towards better oral health. Request your appointment with 32 Dental Care today.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <ol className="mt-10 space-y-5">
                  {[
                    ["Fill in your details", "Choose a treatment and your preferred date and time."],
                    ["Send on WhatsApp", "We prepare the message — just review it and tap send."],
                    ["We confirm your slot", "Our team replies on WhatsApp to confirm availability."],
                  ].map(([title, text], i) => (
                    <li key={title} className="flex gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 font-display text-sm font-bold text-mint ring-1 ring-white/15">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-white">{title}</p>
                        <p className="text-sm text-white/60">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.3} className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 lg:block">
                <SmartImage src={images.appointment.src} alt={images.appointment.alt} width={800} sizes="35vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden="true" />
                <a
                  href={buildWhatsAppUrl(site.contact.whatsapp, undefined, site.contact.whatsappCountryCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/20"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1fae5b]">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span className="text-sm leading-tight">
                    Prefer to chat directly?
                    <span className="block font-display font-bold">{prettyWhatsApp()}</span>
                  </span>
                </a>
              </Reveal>
            </div>

            {/* Right: form */}
            <m.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              className="relative rounded-[2rem] bg-white p-6 shadow-lift sm:p-9"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "idle" ? (
                  <m.form
                    key="form"
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    aria-describedby={`${formId}-note`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h3 className="text-2xl font-extrabold">Request an appointment</h3>
                    <p id={`${formId}-note`} className="mt-1.5 text-sm text-muted">
                      Fields marked <span className="text-teal">*</span> are required. Your details are only used to prepare your WhatsApp message.
                    </p>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <Field id={`${formId}-name`} label="Full Name" required error={err("name")} icon={<UserRound />} className="sm:col-span-2">
                        <input
                          id={`${formId}-name`} name="name" type="text" autoComplete="name" placeholder="e.g. Rahul Sharma"
                          value={values.name} onChange={set("name")} onBlur={blur("name")} maxLength={80} required
                          aria-invalid={!!err("name")} aria-describedby={err("name") ? `${formId}-name-err` : undefined}
                          className={inputCls(!!err("name"))}
                        />
                      </Field>

                      <Field id={`${formId}-phone`} label="Phone Number" required error={err("phone")} icon={<Phone />}>
                        <input
                          id={`${formId}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number"
                          value={values.phone} onChange={set("phone")} onBlur={blur("phone")} maxLength={20} required
                          aria-invalid={!!err("phone")} aria-describedby={err("phone") ? `${formId}-phone-err` : undefined}
                          className={inputCls(!!err("phone"))}
                        />
                      </Field>

                      <Field id={`${formId}-service`} label="Dental Service" required error={err("service")} icon={<Stethoscope />} select>
                        <select
                          id={`${formId}-service`} name="service" value={values.service} onChange={set("service")} onBlur={blur("service")} required
                          aria-invalid={!!err("service")} aria-describedby={err("service") ? `${formId}-service-err` : undefined}
                          className={cn(inputCls(!!err("service")), "appearance-none pr-10", !values.service && "text-muted/70")}
                        >
                          <option value="" disabled>Select a service</option>
                          {serviceOptions.map((s) => <option key={s} value={s} className="text-charcoal">{s}</option>)}
                        </select>
                      </Field>

                      <Field id={`${formId}-date`} label="Preferred Date" required error={err("date")} icon={<CalendarDays />}>
                        <input
                          id={`${formId}-date`} name="date" type="date" min={minDate || undefined} max={minDate ? addDays(minDate, MAX_DAYS_AHEAD) : undefined}
                          value={values.date} onChange={set("date")} onBlur={blur("date")} required
                          aria-invalid={!!err("date")} aria-describedby={err("date") ? `${formId}-date-err` : undefined}
                          className={cn(inputCls(!!err("date")), !values.date && "text-muted/70")}
                        />
                      </Field>

                      <Field id={`${formId}-time`} label="Preferred Time" required error={err("time")} icon={<Clock />} select>
                        <select
                          id={`${formId}-time`} name="time" value={values.time} onChange={set("time")} onBlur={blur("time")} required
                          aria-invalid={!!err("time")} aria-describedby={err("time") ? `${formId}-time-err` : undefined}
                          className={cn(inputCls(!!err("time")), "appearance-none pr-10", !values.time && "text-muted/70")}
                        >
                          <option value="" disabled>Select a time</option>
                          {site.appointmentSlots.map((s) => <option key={s} value={s} className="text-charcoal">{s}</option>)}
                        </select>
                      </Field>

                      <Field id={`${formId}-message`} label="Additional Message" error={err("message")} icon={<MessageSquareText />} className="sm:col-span-2" optional>
                        <textarea
                          id={`${formId}-message`} name="message" rows={3} placeholder="Tell us about any symptoms or questions (optional)"
                          value={values.message} onChange={set("message")} onBlur={blur("message")} maxLength={MAX_MESSAGE}
                          aria-invalid={!!err("message")} aria-describedby={`${formId}-message-count`}
                          className={cn(inputCls(!!err("message")), "h-auto resize-none py-3")}
                        />
                        <span id={`${formId}-message-count`} className="absolute bottom-2 right-3 text-[0.7rem] text-muted/70">
                          {values.message.length}/{MAX_MESSAGE}
                        </span>
                      </Field>
                    </div>

                    <Button type="submit" variant="whatsapp" size="lg" className="mt-8 w-full">
                      <WhatsAppIcon className="h-5 w-5" /> Book Appointment on WhatsApp
                    </Button>
                    <p className="mt-4 text-center text-xs leading-relaxed text-muted">
                      This sends a request, not a confirmed booking. The clinic will confirm your appointment on WhatsApp.
                    </p>
                  </m.form>
                ) : (
                  <m.div
                    key="sent"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    role="status"
                    aria-live="polite"
                    className="flex min-h-[32rem] flex-col"
                  >
                    <m.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="grid h-16 w-16 place-items-center rounded-2xl bg-mint text-teal"
                    >
                      <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                    </m.span>
                    <h3 className="mt-6 text-2xl font-extrabold">Your request is ready in WhatsApp</h3>
                    <p className="mt-3 leading-relaxed text-muted">
                      We&rsquo;ve opened WhatsApp with your appointment details filled in. <strong className="text-navy">Please review the message and tap Send</strong> to share it with 32 Dental Care.
                    </p>
                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                      <p className="flex gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Your appointment is <strong>not confirmed yet</strong>. The clinic will reply on WhatsApp to confirm your date and time.</span>
                      </p>
                    </div>

                    <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                      {[
                        ["Service", values.service],
                        ["Preferred time", values.time],
                        ["Name", values.name.trim()],
                        ["Date", values.date ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(values.date + "T00:00:00")) : ""],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-xl bg-ivory p-3">
                          <dt className="text-xs text-muted">{k}</dt>
                          <dd className="font-semibold text-navy">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className={cn("mt-6 rounded-2xl p-4 text-sm", links?.blocked ? "bg-red-50 text-red-800 ring-1 ring-red-200" : "bg-mint/50 text-navy")}>
                      <p className="font-semibold">{links?.blocked ? "WhatsApp was blocked from opening." : "WhatsApp didn’t open?"}</p>
                      <p className="mt-1 text-[0.85rem] opacity-80">Use one of these links — your message is already included:</p>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <a href={links?.app} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1fae5b] px-4 py-2.5 font-semibold text-white transition hover:bg-[#189a4f]">
                          <WhatsAppIcon className="h-4 w-4" /> Open WhatsApp
                        </a>
                        <a href={links?.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2.5 font-semibold text-navy transition hover:border-teal">
                          <ExternalLink className="h-4 w-4" aria-hidden="true" /> WhatsApp Web
                        </a>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                      <Button type="button" variant="outline" onClick={() => setStatus("idle")}>
                        Edit details
                      </Button>
                      <Button type="button" variant="ghost" onClick={reset}>
                        <RotateCcw className="h-4 w-4" aria-hidden="true" /> New request
                      </Button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          </div>
        </div>

        <Reveal className="mt-6 flex flex-col items-center justify-center gap-3 text-center text-sm text-muted sm:flex-row">
          <span>Prefer not to fill in a form?</span>
          <ButtonLink href={buildWhatsAppUrl(site.contact.whatsapp, undefined, site.contact.whatsappCountryCode)} external variant="ghost" size="sm" className="!px-0 text-teal">
            <WhatsAppIcon className="h-4 w-4" /> Message us at {prettyWhatsApp()}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function inputCls(invalid: boolean) {
  return cn(
    "h-12 w-full rounded-xl border bg-ivory pl-11 pr-4 text-[0.95rem] text-charcoal placeholder:text-muted/60",
    "transition-[border-color,box-shadow,background-color] duration-300 outline-none",
    "focus:bg-white focus:ring-4",
    invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-line hover:border-teal/40 focus:border-teal focus:ring-teal/15",
  );
}

function Field({
  id, label, required, optional, error, icon, children, className, select,
}: {
  id: string; label: string; required?: boolean; optional?: boolean; error?: string; icon: ReactNode;
  children: ReactNode; className?: string; select?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-center gap-1 text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-teal" aria-hidden="true">*</span>}
        {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-[0.85rem] text-teal/70 [&>svg]:h-[1.1rem] [&>svg]:w-[1.1rem]" aria-hidden="true">
          {icon}
        </span>
        {children}
        {select && <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />}
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`${id}-err`}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="mt-1.5 flex items-center gap-1.5 overflow-hidden text-[0.8rem] font-medium text-red-600"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
