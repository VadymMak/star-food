import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Food Industry News & Market Insights",
  description:
    "Stay updated with sunflower oil market trends, food industry news, and behind-the-scenes stories from Star Food by UB Market LTD.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}