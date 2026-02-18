import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Sunflower Oil, Sugar, Dairy Wholesale",
  description:
    "Explore Star Food product catalog: refined sunflower oil, crude oil, high-oleic oil, beet sugar, dairy products. Wholesale supply across Europe.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}