// src/app/[locale]/page.tsx — Homepage (locale-aware)
import Hero from "@/components/Hero/Hero";
import TrustNumbers from "@/components/TrustNumbers/TrustNumbers";
import TrustedBy from "@/components/TrustedBy/TrustedBy";
import AboutPreview from "@/components/AboutPreview/AboutPreview";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import { getAllPosts } from "@/lib/blog";
import LatestBlog from "@/components/LatestBlog/LatestBlog";
import Logistics from "@/components/Logistics/Logistics";
import CTASection from "@/components/CTASection/CTASection";
import ContactStrip from "@/components/ContactStrip/ContactStrip";
import MapSection from "@/components/MapSection/MapSection";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://ub-market.com";

  let title =
    "Star Food | Premium Sunflower Oil & Food Products — EU Trading Company";
  let description =
    "UB Market LTD — EU-registered food trading company. Wholesale sunflower oil, sugar, dairy. Export across Europe.";

  try {
    const t = await getTranslations({ locale, namespace: "meta" });
    title = t("homeTitle");
    description = t("homeDescription");
  } catch {
    // Use fallback values
  }

  const hreflangMap: Record<string, string> = {
    en: "en",
    bg: "bg",
    tr: "tr",
    ro: "ro",
    de: "de",
    ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}`;
  }
  languages["x-default"] = `${baseUrl}/en`;

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "Star Food — UB Market",
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const posts = getAllPosts(locale)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      category: p.category,
      image: p.image,
    }));

  return (
    <>
      <Hero />
      <TrustNumbers />
      <TrustedBy />
      <AboutPreview />
      <ProductsGrid />
      <HowWeWork />
      <Logistics />
      <LatestBlog posts={posts} />
      <CTASection />
      <ContactStrip />
      <MapSection />
    </>
  );
}
