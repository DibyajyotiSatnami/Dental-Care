import type { Metadata } from "next";
import { ArrowLeft, CalendarCheck2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { generalWhatsAppUrl } from "@/lib/clinic";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-ivory px-5 py-16">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-mint blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-teal/15 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-xl text-center">
        <a href={asset("/")} className="inline-block" aria-label="32 Dental Care home"><Logo /></a>
        <p className="mt-14 font-display text-[7rem] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_#087F8C] sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">This page seems to be missing a tooth.</h1>
        <p className="mt-4 text-lg text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back to a healthy smile.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={asset("/")} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-teal px-6 font-display font-semibold text-white shadow-glow transition hover:bg-teal-600">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Home
          </a>
          <a href={asset("/#appointment")} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-6 font-display font-semibold text-navy transition hover:border-teal">
            <CalendarCheck2 className="h-4 w-4" aria-hidden="true" /> Book Appointment
          </a>
          <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1fae5b] px-6 font-display font-semibold text-white transition hover:bg-[#189a4f]">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
