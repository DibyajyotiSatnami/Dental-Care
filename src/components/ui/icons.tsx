import type { SVGProps } from "react";
import {
  Stethoscope, Sparkles, ShieldCheck, Sun, Anchor, AlignCenterHorizontal,
  WandSparkles, Crown, Baby, type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/content/services";

type P = SVGProps<SVGSVGElement>;

/** Outline tooth icon (lucide has no tooth glyph). */
export function ToothIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5.2C10.7 4.3 9.1 3.9 7.7 4.4 5.3 5.1 4.5 7.6 5 10.1c.4 2 1 3.8 1.4 5.8.3 1.3.6 2.9 1.7 3.2 1.3.3 1.6-1.4 1.9-2.9.2-1.2.5-2.3 2-2.3s1.8 1.1 2 2.3c.3 1.5.6 3.2 1.9 2.9 1.1-.3 1.4-1.9 1.7-3.2.4-2 1-3.8 1.4-5.8.5-2.5-.3-5-2.7-5.7-1.4-.5-3-.1-4.3.8Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2.08 22l5.33-1.4a9.86 9.86 0 0 0 4.63 1.18h.01c5.44 0 9.87-4.43 9.87-9.87 0-2.64-1.03-5.12-2.87-7Zm-7.01 15.2h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.16.83.84-3.08-.2-.32a8.17 8.17 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.21-8.2a8.16 8.16 0 0 1 8.2 8.21c0 4.52-3.68 8.2-8.15 8.23Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46H16.6V4.46A20 20 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.97v2.23H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function YouTubeIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

export function GoogleIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.66 4.1-5.35 4.1a5.94 5.94 0 0 1 0-11.88c1.84 0 3.07.78 3.78 1.46l2.58-2.48A9.13 9.13 0 0 0 12 2.75a9.25 9.25 0 1 0 0 18.5c5.34 0 8.88-3.75 8.88-9.04 0-.6-.07-1.07-.15-1.53l-.01-.02-.37.44Z" />
    </svg>
  );
}

export const serviceIcons: Record<ServiceIcon, LucideIcon | ((p: P) => React.JSX.Element)> = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  shield: ShieldCheck,
  sun: Sun,
  anchor: Anchor,
  align: AlignCenterHorizontal,
  extract: ToothIcon,
  wand: WandSparkles,
  crown: Crown,
  baby: Baby,
};
