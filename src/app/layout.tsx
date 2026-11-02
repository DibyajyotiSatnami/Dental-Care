import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/config/site";
import { MotionProvider } from "@/components/motion/MotionProvider";

const title = "32 Dental Care | Dental Clinic & Dentist in Guwahati, Assam";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | 32 Dental Care" },
  description: site.description,
  keywords: [
    "dental clinic in Guwahati",
    "dentist in Guwahati",
    "dental care in Guwahati",
    "teeth cleaning in Guwahati",
    "root canal treatment in Guwahati",
    "teeth whitening Guwahati",
    "dental implants Guwahati",
    "braces Guwahati",
    "32 Dental Care",
  ],
  applicationName: site.name,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/`,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: `${site.url}/og-image.jpg`, width: 1200, height: 630, alt: "32 Dental Care — Your Smile. Our Passion. Your Health." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [`${site.url}/og-image.jpg`],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#087F8C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
