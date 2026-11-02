"use client";

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { generalWhatsAppUrl } from "@/lib/clinic";

/** Floating WhatsApp button (always visible) + back-to-top button (after scrolling). */
export function FloatingActions() {
  const { scrollY } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const [hint, setHint] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 800));

  return (
    <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {showTop && (
          <m.button
            type="button"
            key="top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white/90 text-navy shadow-lift backdrop-blur"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </m.button>
        )}
      </AnimatePresence>

      <div className="relative flex items-center" onMouseEnter={() => setHint(true)} onMouseLeave={() => setHint(false)}>
        <AnimatePresence>
          {hint && (
            <m.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy px-4 py-2 text-sm font-medium text-white shadow-lift sm:block"
            >
              Book on WhatsApp
            </m.span>
          )}
        </AnimatePresence>
        <m.a
          href={generalWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with 32 Dental Care on WhatsApp"
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.6 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-[#1fae5b] text-white shadow-[0_14px_34px_-10px_rgba(31,174,91,0.8)] sm:h-16 sm:w-16"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#1fae5b]/40 [animation-duration:2.6s]" aria-hidden="true" />
          <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
        </m.a>
      </div>
    </div>
  );
}
