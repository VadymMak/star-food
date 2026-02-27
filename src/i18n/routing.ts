// src/i18n/routing.ts — Central locale routing config (next-intl)
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "bg", "ua", "tr", "ro", "de"],
  defaultLocale: "en",
  localePrefix: "always",  // Always show /en/, /bg/, etc.
  localeDetection: true,   // Auto-detect browser language
});

// Navigation helpers — auto-add locale prefix to URLs
// Use these INSTEAD of next/link and next/navigation
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// Type helper
export type Locale = (typeof routing.locales)[number];
