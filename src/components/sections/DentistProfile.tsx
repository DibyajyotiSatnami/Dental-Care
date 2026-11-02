"use client";

import { Award, BadgeCheck, CalendarCheck2, GraduationCap, Hourglass } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal, Stagger, StaggerItem, scaleIn } from "@/components/motion/Reveal";
import { generalWhatsAppUrl } from "@/lib/clinic";

/** Treatment areas offered at the clinic (not personal credentials). PLACEHOLDER: refine to the dentist's actual focus areas. */
const expertise = ["Preventive care", "Root canal treatment", "Cosmetic dentistry", "Restorative dentistry", "Children's dentistry", "Oral health guidance"];

function Pending() {
  return <span className="italic text-muted/80">To be updated</span>;
}

export function DentistProfile() {
  const d = site.dentist;
  const facts = [
    { icon: GraduationCap, label: "Qualifications", value: d.qualifications },
    { icon: Award, label: "Specialization", value: d.specialization },
    { icon: Hourglass, label: "Experience", value: d.experience },
  ];

  return (
    <section id="dentist" className="section-y relative overflow-hidden">
      <div className="container-x">
        <SectionHeading eyebrow="Our Dentist" title="Meet Your Dental Care Professional." highlight={["Professional."]} align="center" />

        <div className="mt-16 grid items-stretch gap-8 overflow-hidden rounded-[2.5rem] border border-line bg-white p-4 shadow-lift sm:p-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:p-8">
          <Reveal variants={scaleIn} className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-mint via-white to-mint-200">
            <SmartImage src={d.photo} alt={`Professional portrait of ${d.name}, dentist at 32 Dental Care`} width={800} sizes="(min-width:1024px) 35vw, 92vw" />
            {d.photoIsPlaceholder && (
              <span className="absolute left-4 top-4 rounded-full bg-navy/75 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                Portrait — to be updated
              </span>
            )}
            <div className="glass absolute inset-x-4 bottom-4 rounded-2xl p-4">
              <p className="font-display text-lg font-bold text-navy">{d.name}</p>
              <p className="text-sm text-muted">Dentist · 32 Dental Care, {site.location.city}</p>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center px-2 py-4 sm:px-4 lg:py-8 lg:pr-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-teal">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Dental Care Professional
              </span>
              <h3 className="mt-5 text-3xl font-extrabold sm:text-4xl">{d.name}</h3>
              {/* PLACEHOLDER: replace this introduction with the dentist's own words */}
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Our dentist is committed to gentle, attentive care and clear communication — taking the time to understand
                each patient, explain every option and build treatment plans around individual needs and comfort.
              </p>
            </Reveal>

            <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <StaggerItem key={label} className="rounded-2xl border border-line bg-ivory p-4">
                  <Icon className="h-5 w-5 text-teal" strokeWidth={1.7} aria-hidden="true" />
                  <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy/60">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-navy">{value ?? <Pending />}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-navy/60">Areas of care</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {expertise.map((e) => (
                  <li key={e} className="rounded-full border border-teal/20 bg-white px-3.5 py-1.5 text-sm text-navy">
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#appointment" size="lg">
                <CalendarCheck2 className="h-5 w-5" aria-hidden="true" /> Book Appointment
              </ButtonLink>
              <ButtonLink href={generalWhatsAppUrl()} external size="lg" variant="outline">
                <WhatsAppIcon className="h-5 w-5 text-[#1fae5b]" /> Ask a Question
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
