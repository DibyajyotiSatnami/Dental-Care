"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight, CalendarCheck2, HeartHandshake, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WordReveal } from "@/components/motion/WordReveal";
import { EASE } from "@/components/motion/Reveal";
import { useIsMobile } from "@/lib/hooks";
import { generalWhatsAppUrl } from "@/lib/clinic";

const intro = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Gentle parallax — reduced on phones.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "6%" : "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative isolate overflow-hidden bg-ivory pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-36">
      {/* Cinematic HyperFrames background sequence */}
      <div className="absolute inset-0 -z-20 opacity-70" aria-hidden="true">
        <AmbientVideo name="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/40 to-ivory" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ivory via-ivory/70 to-transparent lg:w-2/3" />
      </div>
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-mint/70 blur-3xl animate-float-slow" aria-hidden="true" />

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28">
        {/* Copy */}
        <m.div style={{ y: textY, opacity: fade }} className="relative">
          <m.p {...intro(0.2)} className="inline-flex items-center gap-2 rounded-full border border-teal/15 bg-white/70 py-1.5 pl-1.5 pr-4 text-[0.8rem] font-medium text-navy shadow-soft backdrop-blur">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-white">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Dental Clinic in {site.location.city}, {site.location.region}
          </m.p>

          <div className="mt-7 flex items-center gap-3 sm:gap-4 lg:block">
            <WordReveal
              text={site.tagline}
              highlight={["Smile.", "Passion."]}
              animateOnMount
              delay={0.35}
              stagger={0.08}
              // Phones: font scales with screen width so the headline and the doctor portrait share the row.
              className="min-w-0 flex-1 text-balance text-[clamp(1.85rem,calc((100vw-2.5rem)*0.108),2.9rem)] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]"
            />
            <HeroDoctorPortrait />
          </div>

          <m.p {...intro(0.95)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Experience exceptional dental care with modern treatments, personalized attention, and a commitment to keeping
            your smile healthy and confident.
          </m.p>

          <m.div {...intro(1.1)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#appointment" size="lg">
              <CalendarCheck2 className="h-5 w-5" aria-hidden="true" />
              Book Your Appointment
            </ButtonLink>
            <ButtonLink href="#services" size="lg" variant="outline">
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </ButtonLink>
          </m.div>

          <m.p {...intro(1.25)} className="mt-9 flex items-center gap-3 text-sm font-medium text-navy/80">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-teal">
              <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            Your Comfort. Your Confidence. Our Priority.
          </m.p>
        </m.div>

        {/* Visual composition */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <m.div
            initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12% round 2.5rem)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2.5rem)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-[5/6]"
          >
            <m.div style={{ y: imgY, scale: imgScale }} className="absolute -inset-y-[8%] inset-x-0">
              <SmartImage
                src={images.hero.src}
                alt={images.hero.alt}
                priority
                width={1100}
                sizes="(min-width: 1024px) 45vw, 92vw"
              />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" aria-hidden="true" />
            {images.hero.placeholder && (
              <span className="absolute right-4 top-4 rounded-full bg-navy/60 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                Placeholder photo
              </span>
            )}
            <div className="absolute bottom-6 left-5 max-w-[60%] text-white sm:bottom-8 sm:left-7">
              <div>
                <p className="font-display text-2xl font-bold leading-tight sm:text-3xl">Healthy smiles,<br />thoughtfully cared for.</p>
              </div>
            </div>
          </m.div>

          {/* Floating trust indicators */}
          <m.div
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.2 }}
            className="absolute -left-4 top-10 sm:-left-10 lg:-left-14"
          >
            <div className="glass animate-float-slow flex items-center gap-3 rounded-2xl p-3 pr-5 shadow-lift">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal text-white">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-sm font-bold text-navy">Patient-Centred</span>
                <span className="block text-xs text-muted">Care that listens first</span>
              </span>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.4 }}
            className="absolute -right-3 top-[52%] sm:-right-8"
          >
            <a
              href={generalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center gap-3 rounded-2xl p-3 pr-5 shadow-lift transition-transform duration-300 hover:-translate-y-1"
              style={{ animation: "float-slow 9s ease-in-out -4s infinite" }}
              aria-label="Enquire on WhatsApp"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1fae5b] text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-sm font-bold text-navy">Quick WhatsApp Booking</span>
                <span className="block text-xs text-muted">Request a slot in a minute</span>
              </span>
            </a>
          </m.div>

          {/* 32-dot dental arch motif */}
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.6 }}
            className="absolute -bottom-6 right-8 hidden sm:block"
            aria-hidden="true"
          >
            <div className="glass rounded-2xl px-4 py-3 shadow-soft">
              <ArchDots />
              <p className="mt-1 text-center text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-teal">32 · A complete smile</p>
            </div>
          </m.div>
        </div>
      </div>

      {/* Scroll cue */}
      <m.a
        href="#highlights"
        {...intro(1.8)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-navy/50 lg:flex"
        aria-label="Scroll to highlights"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-navy/15">
          <m.span
            className="absolute inset-x-0 top-0 h-1/2 bg-teal"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </m.a>
    </section>
  );
}

/**
 * Doctor portrait beside the headline on phones & tablets (the large hero image
 * covers this on desktop). Uses the dentist's real photo once provided in
 * src/config/site.ts; until then a placeholder stock portrait (src/content/images.ts).
 */
function HeroDoctorPortrait() {
  const real = !site.dentist.photoIsPlaceholder;
  const src = real ? site.dentist.photo : images.heroDoctor.src;
  const alt = real ? `${site.dentist.name}, dentist at 32 Dental Care` : images.heroDoctor.alt;
  return (
    <m.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
      className="relative w-[26vw] max-w-[8.5rem] shrink-0 sm:w-44 sm:max-w-none lg:hidden"
    >
      <div className="absolute -inset-2 rounded-t-full rounded-b-[1.9rem] bg-gradient-to-b from-mint to-teal/20" aria-hidden="true" />
      <div className="relative aspect-[3/4.2] overflow-hidden rounded-t-full rounded-b-[1.5rem] border-[3px] border-white bg-mint shadow-lift">
        <SmartImage src={src} alt={alt} width={400} sizes="(min-width:640px) 176px, 30vw" priority className="object-[50%_20%]" />
      </div>
      <span className="absolute -bottom-2 -left-2 grid h-9 w-9 place-items-center rounded-full bg-teal text-white shadow-glow ring-[3px] ring-white sm:h-11 sm:w-11">
        <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </span>
    </m.div>
  );
}

/** 32 dots arranged as upper + lower dental arches — the brand motif. */
export function ArchDots({ className = "h-12 w-36" }: { className?: string }) {
  const dots: { x: number; y: number }[] = [];
  for (let arch = 0; arch < 2; arch++) {
    for (let i = 0; i < 16; i++) {
      const t = (i / 15) * Math.PI;
      const x = 72 - Math.cos(t) * 62;
      const y = arch === 0 ? 26 - Math.sin(t) * 20 : 30 + Math.sin(t) * 18;
      dots.push({ x, y });
    }
  }
  return (
    <svg viewBox="0 0 144 52" className={className}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r={2.6} fill={i % 16 === 7 || i % 16 === 8 ? "#087F8C" : "#123047"} opacity={i < 16 ? 0.9 : 0.55} />
      ))}
    </svg>
  );
}
