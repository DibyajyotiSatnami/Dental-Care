# 32 Dental Care — Website

A premium, fully responsive website for **32 Dental Care**, a dental clinic in Guwahati, Assam. Appointment requests go through **WhatsApp**.

**Stack:** Next.js 16 (static export) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · Lucide icons · HyperFrames (rendered motion graphics)

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → ./out (upload to any static host)
npm test           # unit tests for the WhatsApp booking logic
```

Set the live domain before building for production (used for SEO, the sitemap and structured data):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```

### Publishing on GitHub Pages

The workflow `.github/workflows/deploy-pages.yml` tests, builds and deploys the site automatically on every push. The base path (`/Dental-Care`) and site URL come from GitHub, so links and SEO tags point to the right address.

**Live URL:** https://dibyajyotisatnami.github.io/Dental-Care/

If the first run fails at *Configure Pages* or *Deploy*, enable Pages once: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Then re-run the workflow from the **Actions** tab.

**Custom domain (optional):** add it under Settings → Pages. Then set `NEXT_PUBLIC_BASE_PATH` to empty and `NEXT_PUBLIC_SITE_URL` to your domain in the workflow.

---

## ✏️ Items to replace (placeholders)

All clinic information lives in **`src/config/site.ts`**. Fields set to `null` show “To be updated” on the site and are **left out of Google structured data** automatically. To find every placeholder, search the project for `PLACEHOLDER`.

| What | Where |
| --- | --- |
| Website domain | `site.url` / `NEXT_PUBLIC_SITE_URL` |
| Street address, PIN code | `site.location.streetAddress`, `postalCode` |
| Google Map (embed + directions link) | `site.location.mapEmbedUrl`, `mapLink`. The map and the “Get Directions” button appear once these are set |
| Phone for calls | `site.contact.phone`. Click-to-call buttons appear once this is set |
| Email | `site.contact.email` |
| Opening hours | `site.openingHours` (also adjust `appointmentSlots`) |
| Social media | `site.social`. Icons appear only for profiles you add |
| Dentist name, qualifications, specialisation, experience, portrait | `site.dentist` |
| Dentist introduction text and “Areas of care” | `src/components/sections/DentistProfile.tsx` |
| Treatment pricing | `price` in `src/content/services.ts`, plus the pricing card in `ServicesSection.tsx` |
| Photos (hero, about, services, gallery) | `src/content/images.ts`, `src/content/services.ts`, `src/content/gallery.ts` |
| Patient testimonials (currently clearly marked samples) | `src/content/testimonials.ts` |
| Logo | `src/components/ui/Logo.tsx`, `src/app/icon.svg`, `public/icon.svg` |

**Replacing photos:** put your images in `public/images/` (WebP/AVIF, about 1600px wide), change the `src` to e.g. `"/images/reception.webp"`, update the `alt` text and set `placeholder: false`. The “Placeholder photo” tag then disappears. The current stock photos load from Unsplash. If any image fails to load, a branded fallback is shown instead.

No medical qualifications, awards, statistics or reviews were invented. Please add only verified information.

---

## WhatsApp booking

- Clinic number `07002715099` is converted to international format → `917002715099` (`src/lib/whatsapp.ts`).
- The booking form checks every required field and the phone number (Indian mobile, or international with `+`). It keeps what the patient typed when there is an error and moves focus to the first problem field.
- On submit, it builds the formatted message, encodes it with `encodeURIComponent()` and then:
  - **phones/tablets:** opens `https://wa.me/917002715099?text=…`, which launches the WhatsApp app
  - **desktop:** opens WhatsApp Web (`web.whatsapp.com/send?phone=…&text=…`) in a new tab
- A confirmation panel explains that the request is **not confirmed** until the clinic replies. It always includes fallback links (WhatsApp app and WhatsApp Web) in case a pop-up blocker stops the new tab.
- Each service has a **Book This Treatment** button that opens WhatsApp with a message naming that treatment. **Learn More** opens a detail dialog, which can also pre-fill the booking form with that service.
- No data is sent to or stored on any server.

---

## Motion design

**Motion (Framer Motion)** handles the interface animations:
- word-by-word headline reveals
- scroll-triggered staggered reveals (each plays once)
- parallax images
- an animated navigation pill and full-screen mobile menu
- service card hover effects
- carousel and lightbox transitions
- form state transitions
- the floating WhatsApp button

`MotionConfig reducedMotion="user"` respects the visitor's reduce-motion setting, and parallax is toned down on phones. `LazyMotion` keeps the animation bundle small.

**HyperFrames** (HeyGen's HTML-to-video framework, CLI `hyperframes@0.9.1`) was checked before use. It is a timeline renderer that turns HTML/GSAP compositions into video, not a React library. So the cinematic sequences are written as compositions and rendered to optimised video files:

| Composition | Output | Used in |
| --- | --- | --- |
| `hyperframes/hero-ambient/` | 12s seamless loop: light fields, dental-arch line drawings, the 32-dot motif | Hero background |
| `hyperframes/clinic-intro/` | 16s branded film: 32 dots form the dental arches → wordmark → “Your Smile. Our Passion. Your Health.” → services → WhatsApp CTA | Clinic film section, Open Graph image |

Re-render after editing a composition (requires FFmpeg):

```bash
npm run videos     # → public/videos/*.webm, *.mp4, *.jpg posters + public/og-image.jpg
```

Together the videos are about 1.4 MB (VP9 WebM with an H.264 MP4 fallback). They load lazily, pause when off-screen, and are swapped for a still poster on phones and when reduce-motion is on.

---

## Project structure

```
src/
  app/              layout (SEO metadata), page, 404, sitemap.xml, robots.txt, icon
  config/site.ts    ← all clinic details
  content/          services, images, gallery, testimonials
  components/
    sections/       Navbar, HeroSection, TrustHighlights, AboutSection, ServicesSection,
                    ClinicFilm, WhyChooseUs, DentistProfile, GallerySection,
                    TestimonialsSection, AppointmentForm, ContactSection, Footer
    ui/             Button, SmartImage, Modal, Logo, icons, AmbientVideo, FloatingActions…
    motion/         MotionProvider, Reveal/Stagger, WordReveal
  lib/              whatsapp.ts (booking logic), clinic.ts, structuredData.ts, hooks
hyperframes/        motion graphics source + render script
tests/              node:test unit tests
```

## SEO

- Page title and meta description written around local search terms (dentist / dental clinic in Guwahati)
- Open Graph and Twitter cards
- Canonical URL, `sitemap.xml` and `robots.txt`
- Descriptive alt text on every image
- `Dentist` schema.org structured data, built only from verified fields
- Name, address and phone are taken from the single config file, so they stay consistent everywhere

When the real address, phone and hours are added to `site.ts`, they flow into the structured data automatically.
