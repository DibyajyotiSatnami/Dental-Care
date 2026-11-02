"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { CalendarClock, ClipboardList, HandHeart, ShieldPlus, Sofa, Stethoscope } from "lucide-react";
import { images } from "@/content/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ArchDots } from "./HeroSection";
import { useIsMobile } from "@/lib/hooks";

const reasons = [
  { icon: HandHeart, title: "Patient-focused approach", text: "Your comfort, questions and concerns guide every step of your care." },
  { icon: Stethoscope, title: "Modern dental practices", text: "Contemporary techniques and careful clinical attention at every visit." },
  { icon: ShieldPlus, title: "Hygiene-focused environment", text: "Clean, carefully maintained treatment spaces you can feel confident in." },
  { icon: ClipboardList, title: "Personalized treatment plans", text: "Options explained clearly, with plans tailored to your needs and goals." },
  { icon: Sofa, title: "Comfortable patient experience", text: "A calm, welcoming atmosphere designed to help you feel at ease." },
  { icon: CalendarClock, title: "Convenient appointment enquiries", text: "Request your preferred date and time on WhatsApp in under a minute." },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} id="why-us" className="section-y grain relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-teal/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            light
            eyebrow="Why Choose 32 Dental Care"
            title="Your Smile Is in Caring Hands."
            highlight={[]}
            intro="We combine attentive, personal care with modern dental practices — so every visit feels clear, comfortable and reassuring."
          />
          <Reveal delay={0.15} className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <m.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
              <SmartImage src={images.whyChoose.src} alt={images.whyChoose.alt} width={900} sizes="(min-width:1024px) 40vw, 92vw" placeholderTag={images.whyChoose.placeholder} />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
              <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-md">
                <ArchDots className="h-9 w-28 [&_circle]:fill-mint" />
              </div>
              <p className="text-right font-display text-sm font-semibold text-white/90">Care for all 32 —<br />every tooth matters.</p>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title}>
              <m.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="group relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-teal-300/40 hover:bg-white/[0.08]"
              >
                <span className="font-display text-[0.7rem] font-bold tracking-[0.25em] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-4 grid h-12 w-12 place-items-center rounded-2xl bg-teal/25 text-mint ring-1 ring-teal-300/30 transition-all duration-500 group-hover:bg-teal group-hover:text-white">
                  {i === 5 ? <WhatsAppIcon className="h-5 w-5" /> : <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />}
                </span>
                <h3 className="mt-5 text-lg font-bold !text-white">{title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-white/65">{text}</p>
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal/0 blur-2xl transition-colors duration-700 group-hover:bg-teal/30" aria-hidden="true" />
              </m.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
