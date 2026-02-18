import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — EU Food Trading Company in Bulgaria",
  description:
    "Learn about UB Market LTD — an EU-registered food trading company based in Varna, Bulgaria. Specializing in sunflower oil export and import across Europe.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}