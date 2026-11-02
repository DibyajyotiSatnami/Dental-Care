import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site, displayAddress } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { generalWhatsAppUrl, prettyWhatsApp, serviceWhatsAppUrl, telHref } from "@/lib/clinic";

export function Footer() {
  const tel = telHref();
  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white/70">
      <div className="pointer-events-none absolute -top-40 left-1/3 h-80 w-[40rem] rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />

      <div className="container-x relative">
        {/* CTA band */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-14 lg:flex-row lg:items-center">
          <p className="max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            A healthier, more confident smile starts with a simple message.
          </p>
          <a
            href={generalWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-[#1fae5b] px-7 font-display font-semibold text-white shadow-[0_18px_40px_-16px_rgba(31,174,91,0.7)] transition hover:bg-[#189a4f]"
          >
            <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.1fr]">
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              32 Dental Care is a dental clinic in {site.location.city}, {site.location.region}, dedicated to comfortable, personalised and modern dental care for the whole family.
            </p>
            <div className="mt-6"><SocialLinks light /></div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] !text-white">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="transition hover:text-mint">{l.label}</a></li>
              ))}
              <li><a href="#appointment" className="transition hover:text-mint">Book Appointment</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] !text-white">Services</h2>
            <ul className="mt-5 grid gap-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={serviceWhatsAppUrl(s.name)} target="_blank" rel="noopener noreferrer" className="transition hover:text-mint" aria-label={`Enquire about ${s.name} on WhatsApp`}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] !text-white">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" /> <span>{displayAddress()}</span></li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="transition hover:text-mint">{prettyWhatsApp()}</a>
              </li>
              {tel && site.contact.phone && (
                <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" /> <a href={tel} className="hover:text-mint">{site.contact.phone}</a></li>
              )}
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                {site.contact.email ? <a href={`mailto:${site.contact.email}`} className="hover:text-mint">{site.contact.email}</a> : <span className="italic text-white/45">Email to be updated</span>}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 32 Dental Care. All Rights Reserved.</p>
          <p>Appointment requests are confirmed by the clinic via WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
