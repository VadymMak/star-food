import Hero from "@/components/Hero/Hero";
import TrustNumbers from "@/components/TrustNumbers/TrustNumbers";
import AboutPreview from "@/components/AboutPreview/AboutPreview";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Logistics from "@/components/Logistics/Logistics";
import CTASection from "@/components/CTASection/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustNumbers />
      <AboutPreview />
      <ProductsGrid />
      <HowWeWork />
      <Logistics />
      <CTASection />
    </>
  );
}