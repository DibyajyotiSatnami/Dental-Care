"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, site } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { generalWhatsAppUrl, prettyWhatsApp } from "@/lib/clinic";
import { useBodyScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/Reveal";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  useBodyScrollLock(open);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <m.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[62]"
      >
        <div
          className={cn(
            "transition-[background-color,box-shadow,backdrop-filter,padding] duration-500 ease-[var(--ease-premium)]",
            scrolled || open
              ? "bg-white/85 py-3 shadow-[0_1px_0_rgba(18,48,71,0.06),0_10px_30px_-18px_rgba(18,48,71,0.25)] backdrop-blur-xl"
              : "bg-transparent py-5",
          )}
        >
          <nav className="container-x flex items-center justify-between gap-6" aria-label="Main navigation">
            <a href="#home" className="shrink-0" aria-label={`${site.name} — back to top`} onClick={() => setOpen(false)}>
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300",
                      active === link.href ? "text-navy" : "text-charcoal/70 hover:text-navy",
                    )}
                    aria-current={active === link.href ? "true" : undefined}
                  >
                    {active === link.href && (
                      <m.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-mint/80"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <span className="hidden sm:block">
                <ButtonLink href="#appointment" size="sm" aria-label="Book an appointment">
                  Book Appointment
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </ButtonLink>
              </span>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-navy/10 bg-white/70 text-navy backdrop-blur lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={open ? "x" : "menu"}
                    initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </m.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-[61] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
          >
            <m.div
              className="absolute inset-0 bg-ivory"
              initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
              transition={{ duration: 0.65, ease: EASE }}
            />
            <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-mint blur-3xl" aria-hidden="true" />
            <m.nav
              className="relative flex h-full flex-col px-6 pb-10 pt-28"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } } }}
            >
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <m.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-display text-3xl font-bold tracking-tight text-navy"
                    >
                      {link.label}
                      <span className="text-xs font-semibold tracking-widest text-teal">0{i + 1}</span>
                    </a>
                  </m.li>
                ))}
              </ul>
              <m.div
                className="mt-auto flex flex-col gap-3"
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              >
                <ButtonLink href="#appointment" size="lg" onClick={() => setOpen(false)}>
                  Book Appointment
                </ButtonLink>
                <ButtonLink href={generalWhatsAppUrl()} external variant="whatsapp" size="lg">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp {prettyWhatsApp()}
                </ButtonLink>
              </m.div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
