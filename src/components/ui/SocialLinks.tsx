import { site, type SocialLink } from "@/config/site";
import { FacebookIcon, GoogleIcon, InstagramIcon, YouTubeIcon } from "./icons";
import { cn } from "@/lib/cn";

const iconFor: Record<SocialLink["label"], typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  Google: GoogleIcon,
};

/** Renders only the social profiles configured in src/config/site.ts (none are shown until added). */
export function SocialLinks({ light = false }: { light?: boolean }) {
  if (site.social.length === 0) return null;
  return (
    <ul className="flex gap-2">
      {site.social.map((s) => {
        const Icon = iconFor[s.label];
        return (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`32 Dental Care on ${s.label}`}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full transition",
                light ? "bg-white/10 text-white hover:bg-teal" : "border border-line bg-white text-navy hover:border-teal hover:text-teal",
              )}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
