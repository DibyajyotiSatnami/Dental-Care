"use client";

import { HeartHandshake, MonitorSmartphone, Sofa, UserRoundCheck } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const highlights = [
  { icon: HeartHandshake, title: "Patient-Centred Care", text: "We listen first, explain clearly and plan around your needs." },
  { icon: MonitorSmartphone, title: "Modern Dental Technology", text: "Contemporary dental practices for careful, precise treatment." },
  { icon: Sofa, title: "Comfortable Environment", text: "A calm, welcoming space designed to put you at ease." },
  { icon: UserRoundCheck, title: "Personalized Treatments", text: "Every treatment plan is tailored to your smile and goals." },
];

export function TrustHighlights() {
  return (
    <section id="highlights" aria-label="Why patients feel at ease with us" className="relative z-10 -mt-6 lg:-mt-14">
      <div className="container-x">
        <Stagger className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem
              key={title}
              index={i}
              className={
                "group relative p-7 transition-colors duration-500 hover:bg-mint/40 lg:p-8 " +
                (i > 0 ? "border-t border-line sm:border-t-0 " : "") +
                (i % 2 === 1 ? "sm:border-l " : "") +
                (i >= 2 ? "sm:border-t lg:border-t-0 " : "") +
                (i > 0 ? "lg:border-l" : "")
              }
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-teal transition-all duration-500 group-hover:bg-teal group-hover:text-white group-hover:shadow-glow">
                <Icon className="h-5.5 w-5.5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
