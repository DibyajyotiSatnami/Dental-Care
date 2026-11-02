"use client";

import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { site, displayAddress } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Stagger, StaggerItem, Reveal, scaleIn } from "@/components/motion/Reveal";
import { generalWhatsAppUrl, prettyWhatsApp, telHref } from "@/lib/clinic";

function ToBeUpdated() {
  return <span className="italic text-muted/80">To be updated</span>;
}

export function ContactSection() {
  const tel = telHref();
  const { location, contact, openingHours } = site;

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-gradient-to-b from-ivory to-mint/40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's Take Care of Your Smile."
          highlight={["Smile."]}
          intro={`Visit us in ${location.city}, or send a message on WhatsApp — we're happy to help with appointments and questions.`}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Stagger className="grid content-start gap-4 sm:grid-cols-2" stagger={0.07}>
            <InfoCard icon={<MapPin />} title="32 Dental Care" className="sm:col-span-2">
              <p>{displayAddress()}</p>
              {!location.streetAddress && <p className="mt-1 text-sm"><span className="font-medium text-navy/70">Street address:</span> <ToBeUpdated /></p>}
            </InfoCard>
            <InfoCard icon={<WhatsAppIcon />} title="WhatsApp">
              <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal hover:underline">
                {contact.whatsapp}
              </a>
              <p className="text-sm">({prettyWhatsApp()})</p>
            </InfoCard>
            <InfoCard icon={<Phone />} title="Phone">
              {tel && contact.phone ? <a href={tel} className="font-semibold text-teal hover:underline">{contact.phone}</a> : <ToBeUpdated />}
            </InfoCard>
            <InfoCard icon={<Mail />} title="Email">
              {contact.email ? <a href={`mailto:${contact.email}`} className="break-all font-semibold text-teal hover:underline">{contact.email}</a> : <ToBeUpdated />}
            </InfoCard>
            <InfoCard icon={<Clock />} title="Opening Hours">
              {openingHours ? (
                <ul className="space-y-1">
                  {openingHours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-3"><span>{h.days}</span><span className="font-medium text-navy">{h.hours}</span></li>
                  ))}
                </ul>
              ) : (
                <ToBeUpdated />
              )}
            </InfoCard>

            <StaggerItem className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:flex-wrap">
              <ButtonLink href={generalWhatsAppUrl()} external variant="whatsapp" size="lg">
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </ButtonLink>
              {tel && (
                <ButtonLink href={tel} variant="dark" size="lg">
                  <Phone className="h-5 w-5" aria-hidden="true" /> Call the Clinic
                </ButtonLink>
              )}
              {location.mapLink && (
                <ButtonLink href={location.mapLink} external variant="outline" size="lg">
                  <Navigation className="h-5 w-5" aria-hidden="true" /> Get Directions
                </ButtonLink>
              )}
            </StaggerItem>
            {site.social.length > 0 && (
              <StaggerItem className="sm:col-span-2">
                <SocialLinks />
              </StaggerItem>
            )}
          </Stagger>

          <Reveal variants={scaleIn} className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift">
            {location.mapEmbedUrl ? (
              <iframe
                src={location.mapEmbedUrl}
                title="Map showing the location of 32 Dental Care"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <MapPlaceholder />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, children, className }: { icon: ReactNode; title: string; children: ReactNode; className?: string }) {
  return (
    <StaggerItem className={"rounded-[1.5rem] border border-line bg-white p-6 shadow-soft " + (className ?? "")}>
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-teal [&>svg]:h-5 [&>svg]:w-5" aria-hidden="true">{icon}</span>
        <div className="min-w-0 text-muted">
          <h3 className="mb-1 text-base font-bold">{title}</h3>
          {children}
        </div>
      </div>
    </StaggerItem>
  );
}

/** Stylised map shown until the real Google Maps embed URL is added in src/config/site.ts. */
function MapPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[#eef6f5]">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 400" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#d6e8e6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#grid)" />
        <path d="M-20 290C90 250 160 300 260 250S430 140 620 170" fill="none" stroke="#bfe3f0" strokeWidth="26" strokeLinecap="round" />
        <path d="M60 -10C120 120 180 180 300 210S520 330 560 420" fill="none" stroke="#ffffff" strokeWidth="14" />
        <path d="M-10 120H620" stroke="#ffffff" strokeWidth="9" />
        <path d="M410 -10V420" stroke="#ffffff" strokeWidth="9" />
        <path d="M150 -10L230 420" stroke="#ffffff" strokeWidth="6" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <span className="absolute left-1/2 top-full h-4 w-10 -translate-x-1/2 rounded-full bg-navy/20 blur-sm" />
        <span className="relative grid h-16 w-16 place-items-center rounded-full rounded-br-none bg-teal text-white shadow-glow [transform:rotate(45deg)]">
          <MapPin className="h-7 w-7 [transform:rotate(-45deg)]" aria-hidden="true" />
        </span>
      </div>
      <div className="glass absolute inset-x-5 bottom-5 rounded-2xl p-5">
        <p className="font-display font-bold text-navy">32 Dental Care · {site.location.city}, {site.location.region}</p>
        <p className="mt-1 text-sm text-muted">The interactive Google Map will appear here once the clinic address is added.</p>
      </div>
    </div>
  );
}
