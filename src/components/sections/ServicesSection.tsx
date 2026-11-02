"use client";

import { useState } from "react";
import { m } from "motion/react";
import { ArrowUpRight, CalendarCheck2, Check, Info } from "lucide-react";
import { services, type Service } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { serviceIcons, WhatsAppIcon } from "@/components/ui/icons";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { serviceWhatsAppUrl } from "@/lib/clinic";

export function ServicesSection() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="section-y relative overflow-hidden bg-gradient-to-b from-ivory via-white to-ivory">
      <div className="pointer-events-none absolute right-0 top-40 h-[30rem] w-[30rem] translate-x-1/3 rounded-full bg-mint/60 blur-3xl" aria-hidden="true" />

      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our Treatments"
            title="Complete Dental Care for Every Smile."
            highlight={["Every", "Smile."]}
            intro="Explore our dental treatments designed to support your oral health and help you smile with confidence."
          />
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Not sure which treatment you need? Choose <strong className="text-navy">General Dentistry</strong> and we&rsquo;ll guide you after an examination.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7" stagger={0.07}>
          {services.map((service, i) => (
            <StaggerItem key={service.slug} as="article" className={i === 0 ? "lg:col-span-2" : ""}>
              <ServiceCard service={service} index={i} featured={i === 0} onLearnMore={() => setSelected(service)} />
            </StaggerItem>
          ))}
          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-between rounded-[1.75rem] bg-navy p-8 text-white shadow-lift">
              <div>
                <p className="eyebrow !text-mint">Pricing</p>
                <h3 className="mt-4 text-2xl font-bold !text-white">Transparent guidance before every treatment.</h3>
                {/* PLACEHOLDER: replace with real pricing information when available */}
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Treatment pricing will be updated soon. For now, send us a message and we&rsquo;ll share details for your specific needs.
                </p>
              </div>
              <ButtonLink href={serviceWhatsAppUrl("Treatment pricing information")} external variant="whatsapp" className="mt-8 self-start">
                <WhatsAppIcon className="h-5 w-5" /> Ask About Pricing
              </ButtonLink>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} label={selected ? `${selected.name} details` : "Service details"} className="max-w-3xl rounded-t-[2rem] bg-white sm:rounded-[2rem]">
        {selected && <ServiceDetail service={selected} onClose={() => setSelected(null)} />}
      </Modal>
    </section>
  );
}

function ServiceCard({ service, index, featured, onLearnMore }: { service: Service; index: number; featured?: boolean; onLearnMore: () => void }) {
  const Icon = serviceIcons[service.icon];
  return (
    <m.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      <div className={"relative overflow-hidden " + (featured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[16/10]")}>
        <m.div className="absolute inset-0" variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <SmartImage src={service.image} alt={service.imageAlt} width={featured ? 1200 : 700} sizes={featured ? "(min-width:1024px) 60vw, 92vw" : "(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"} />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/0 to-transparent" aria-hidden="true" />
        <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-teal shadow-soft backdrop-blur transition-colors duration-500 group-hover:bg-teal group-hover:text-white">
          <Icon className="h-5.5 w-5.5" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <span className="absolute right-5 top-5 font-display text-sm font-bold text-white/90">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-bold">{service.name}</h3>
        <p className="mt-2.5 flex-1 leading-relaxed text-muted">{service.short}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <button
            type="button"
            onClick={onLearnMore}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-teal"
            aria-label={`Learn more about ${service.name}`}
          >
            Learn More
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <ButtonLink href={serviceWhatsAppUrl(service.name)} external size="sm" aria-label={`Book ${service.name} on WhatsApp`}>
            <CalendarCheck2 className="h-4 w-4" aria-hidden="true" /> Book This Treatment
          </ButtonLink>
        </div>
      </div>
      <m.span
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-teal to-navy"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </m.div>
  );
}

function ServiceDetail({ service, onClose }: { service: Service; onClose: () => void }) {
  const Icon = serviceIcons[service.icon];
  return (
    <div>
      <div className="relative aspect-[16/7] overflow-hidden">
        <SmartImage src={service.image} alt={service.imageAlt} width={1200} sizes="768px" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 text-white sm:left-8">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="text-2xl font-extrabold !text-white sm:text-3xl">{service.name}</h3>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-lg leading-relaxed text-charcoal">{service.description}</p>
        <h4 className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-teal">What to expect</h4>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {service.expect.map((e) => (
            <li key={e} className="flex items-start gap-3 rounded-xl bg-mint/50 p-3 text-sm text-navy">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" /> {e}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-start gap-2 text-sm text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {service.price ? `Pricing: ${service.price}` : "Pricing on enquiry."} Suitability and treatment are confirmed after an examination by the dentist.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={serviceWhatsAppUrl(service.name)} external variant="whatsapp" size="lg">
            <WhatsAppIcon className="h-5 w-5" /> Book This Treatment
          </ButtonLink>
          <ButtonLink
            href="#appointment"
            variant="outline"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              // Pre-select this service in the appointment form, then scroll to it.
              window.dispatchEvent(new CustomEvent("select-service", { detail: service.name }));
              onClose();
              setTimeout(() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" }), 350);
            }}
          >
            Use the Booking Form
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
