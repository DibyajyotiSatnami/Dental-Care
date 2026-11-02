"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { X } from "lucide-react";
import { useBodyScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/Reveal";

/** Accessible animated dialog: Esc to close, focus moved in and restored, Tab trapped. */
export function Modal({
  open,
  onClose,
  label,
  children,
  className,
  dark = false,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={cn("absolute inset-0 backdrop-blur-sm", dark ? "bg-navy-950/90" : "bg-navy/50")} onClick={onClose} aria-hidden="true" />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={cn("relative max-h-[92svh] w-full overflow-y-auto", className)}
          >
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow-soft backdrop-blur transition hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
