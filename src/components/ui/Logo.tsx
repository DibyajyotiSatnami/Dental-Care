import { cn } from "@/lib/cn";

/**
 * Typographic logo: a minimal tooth mark carrying the "32" numeral
 * (32 = the number of teeth in a complete adult smile).
 * PLACEHOLDER: swap for the clinic's official logo file when available.
 */
export function LogoMark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-10 w-10", className)} aria-hidden="true">
      <defs>
        <linearGradient id={inverted ? "lm-g-inv" : "lm-g"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={inverted ? "#5fb8c0" : "#0a96a4"} />
          <stop offset="1" stopColor={inverted ? "#ddf4ef" : "#087f8c"} />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="14" fill={inverted ? "rgba(255,255,255,0.08)" : "#123047"} />
      <path
        d="M24 10.5c-2.6-1.7-5.7-2.5-8.4-1.6-4.6 1.5-6.3 6.4-5.4 11.3.7 3.9 1.9 7.5 2.8 11.4.6 2.6 1.1 5.6 3.4 6.2 2.6.6 3.2-2.7 3.7-5.6.4-2.4.9-4.6 3.9-4.6s3.5 2.2 3.9 4.6c.5 2.9 1.1 6.2 3.7 5.6 2.3-.6 2.8-3.6 3.4-6.2.9-3.9 2.1-7.5 2.8-11.4.9-4.9-.8-9.8-5.4-11.3-2.7-.9-5.8-.1-8.4 1.6Z"
        fill="none"
        stroke={`url(#${inverted ? "lm-g-inv" : "lm-g"})`}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text x="24" y="24.5" textAnchor="middle" fontFamily="Manrope Variable, Manrope, sans-serif" fontWeight="800" fontSize="10.5" fill={inverted ? "#ffffff" : "#ffffff"} letterSpacing="-0.5">
        32
      </text>
    </svg>
  );
}

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.15rem] font-extrabold tracking-tight", inverted ? "text-white" : "text-navy")}>
          32 Dental Care
        </span>
        <span className={cn("mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em]", inverted ? "text-mint/70" : "text-teal")}>
          Guwahati · Assam
        </span>
      </span>
    </span>
  );
}
