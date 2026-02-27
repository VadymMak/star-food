// src/i18n/request.ts — Server-side translation loader (next-intl)
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming locale is supported
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../src/i18n/${locale}.json`)).default,
  };
});
