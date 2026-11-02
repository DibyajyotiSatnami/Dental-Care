import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustHighlights } from "@/components/sections/TrustHighlights";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ClinicFilm } from "@/components/sections/ClinicFilm";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { DentistProfile } from "@/components/sections/DentistProfile";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { dentistJsonLd } from "@/lib/structuredData";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistJsonLd()) }} />
      <Navbar />
      <main id="main">
        <HeroSection />
        <TrustHighlights />
        <AboutSection />
        <ServicesSection />
        <ClinicFilm />
        <WhyChooseUs />
        <DentistProfile />
        <GallerySection />
        <TestimonialsSection />
        <AppointmentForm />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
