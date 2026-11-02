"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight, Droplets, HeartPulse, Leaf } from "lucide-react";
import { images } from "@/content/images";
import { site } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem, scaleIn } from "@/components/motion/Reveal";
import { useIsMobile } from "@/lib/hooks";

const pillars = [
  {
    icon: Leaf,
    title: "About the clinic",
    text: `32 Dental Care is a dental clinic in ${site.location.city}, ${site.location.region}, created to make quality dental care approachable, comfortable and clear for every patient.`,
  },
  {
    icon: HeartPulse,
    title: "Our approach to care",
    text: "We take time to understand your concerns, explain your options in plain language and plan treatment that suits your needs, comfort and goals.",
  },
  {
    icon: Droplets,
    title: "Hygiene & patient comfort",
    text: "Careful hygiene practices and a calm, welcoming environment are at the heart of every visit — so you can relax while we take care of your smile.",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["8%", "-8%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["18%", "-14%"]);

  return (
    <section id="about" ref={ref} className="section-y relative overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Layered imagery */}
        <div className="relative order-2 lg:order-1">
          <m.div style={{ y: yBack }} className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-[2.25rem] shadow-lift">
            <Reveal variants={scaleIn} className="h-full w-full">
              <SmartImage src={images.aboutClinic.src} alt={images.aboutClinic.alt} width={900} sizes="(min-width:1024px) 40vw, 80vw" placeholderTag={images.aboutClinic.placeholder} />
            </Reveal>
          </m.div>
          <m.div style={{ y: yFront }} className="absolute -bottom-10 left-0 w-[48%]">
            <Reveal variants={scaleIn} delay={0.2} className="overflow-hidden rounded-[1.75rem] border-[6px] border-ivory shadow-lift">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-mint to-white">
                <SmartImage src={site.dentist.photo} alt={`Portrait of ${site.dentist.name}, dentist at 32 Dental Care`} width={500} sizes="25vw" />
                {site.dentist.photoIsPlaceholder && (
                  <span className="absolute inset-x-0 bottom-0 bg-navy/75 px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                    Dentist photo — to be updated
                  </span>
                )}
              </div>
            </Reveal>
          </m.div>
          <div className="absolute -left-10 top-10 -z-10 h-64 w-64 rounded-full bg-mint blur-3xl" aria-hidden="true" />
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About 32 Dental Care"
            title="Where Healthy Smiles Begin."
            highlight={["Smiles"]}
            intro="At 32 Dental Care, we believe every smile deserves thoughtful attention and quality dental care. Our focus is on providing a comfortable patient experience through modern dental practices and personalized treatment approaches."
          />
          <Stagger className="mt-10 space-y-6">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <StaggerItem key={title} index={i} className="flex gap-5">
                <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-teal/15 bg-white text-teal shadow-soft">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <ButtonLink href="#dentist" variant="dark" size="lg">
              Get to Know Us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
