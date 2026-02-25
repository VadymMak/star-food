// src/app/layout.tsx — Root layout (fonts + metadata only)
// Schemas are in SchemaOrg component (locale-aware)
// Header, Footer, WhatsApp are in [locale]/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
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
  title: {
    default:
      "Star Food | Premium Sunflower Oil & Food Products — EU Trading Company",
    template: "%s | Star Food",
  },
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
  robots: { index: true, follow: true },
  metadataBase: new URL("https://ub-market.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={sourceSans.className}>{children}</body>
    </html>
  );
}
