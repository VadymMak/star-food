// src/app/[locale]/page.tsx — Homepage (locale-aware)
import Hero from "@/components/Hero/Hero";
import TrustNumbers from "@/components/TrustNumbers/TrustNumbers";
import AboutPreview from "@/components/AboutPreview/AboutPreview";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Logistics from "@/components/Logistics/Logistics";
import CTASection from "@/components/CTASection/CTASection";
import ContactStrip from "@/components/ContactStrip/ContactStrip";
import MapSection from "@/components/MapSection/MapSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustNumbers />
      <AboutPreview />
      <ProductsGrid />
      <HowWeWork />
      <Logistics />
      <CTASection />
      <ContactStrip />
      <MapSection />
    </>
  );
}
