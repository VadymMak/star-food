import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Star Food | Premium Sunflower Oil & Food Products — EU Trading Company",
  description:
    "Star Food by UB Market LTD — EU-registered food trading company based in Bulgaria. Wholesale sunflower oil, sugar, dairy products. Export & import across Europe.",
  keywords: [
    "sunflower oil wholesale",
    "bulk sunflower oil Europe",
    "food trading company Bulgaria",
    "vegetable oil supplier EU",
    "Star Food",
    "UB Market LTD",
  ],
  authors: [{ name: "UB Market LTD" }],
  openGraph: {
    type: "website",
    title: "Star Food | Premium Sunflower Oil & Food Products",
    description:
      "EU-registered food trading company. Wholesale sunflower oil, sugar, dairy products across Europe.",
    url: "https://ub-market.com",
    siteName: "Star Food by UB Market LTD",
    locale: "en_US",
    images: [
      {
        url: "https://ub-market.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Star Food — Sunflower Oil Trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Star Food | Premium Sunflower Oil & Food Products",
    description:
      "EU-registered food trading company. Wholesale sunflower oil, sugar, dairy products across Europe.",
    images: ["https://ub-market.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://ub-market.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UB Market LTD",
  alternateName: "Star Food",
  url: "https://ub-market.com",
  logo: "https://ub-market.com/icons/logo.webp",
  description:
    "EU-registered international food trading company specializing in sunflower oil export and import.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sirma Voivoda St., b.1, ap. 21",
    addressLocality: "Varna",
    postalCode: "9010",
    addressCountry: "BG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+359-8844-69860",
    contactType: "sales",
    email: "ubmarket2022@gmail.com",
    availableLanguage: ["English", "Bulgarian", "Ukrainian"],
  },
  sameAs: [
    "https://www.instagram.com/ub_market_ltd",
    "https://t.me/ub_market_ltd",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="canonical" href="https://ub-market.com/" />
        <meta name="theme-color" content="#0a0a0a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={sourceSans.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}