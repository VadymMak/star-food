"""
Phase G Migration — Script 3: Locale Layout Migration
=====================================================================
RUN FROM star-food PROJECT ROOT:
  python 03_locale_layout.py

WHAT IT DOES:
  1. Replaces src/app/[locale]/layout.tsx with NextIntlClientProvider version
  2. Backs up original layout

MODIFIES: src/app/[locale]/layout.tsx
"""

import os
import shutil
import subprocess
import sys

PROJECT_ROOT = os.getcwd()


def check_project():
    if not os.path.exists("package.json"):
        print("❌ Run from star-food root!")
        sys.exit(1)
    if not os.path.exists("src/i18n/routing.ts"):
        print("❌ src/i18n/routing.ts not found. Run Scripts 1-2 first!")
        sys.exit(1)
    print("✅ Project verified")


def backup_file(path):
    if os.path.exists(path):
        backup = path + ".backup"
        shutil.copy2(path, backup)
        print(f"   💾 Backup: {path} → {backup}")


def main():
    print("=" * 60)
    print("🚀 Phase G — Script 3: Locale Layout Migration")
    print("=" * 60)

    check_project()

    layout_path = "src/app/[locale]/layout.tsx"

    # ============================================================
    # 1. Backup existing layout
    # ============================================================
    print(f"\n📂 Replacing {layout_path}...")
    backup_file(layout_path)

    # ============================================================
    # 2. Write new layout with NextIntlClientProvider
    # ============================================================
    new_layout = '''// src/app/[locale]/layout.tsx — Locale layout with next-intl
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import SchemaOrg from "@/components/SchemaOrg";
import SetHtmlLang from "@/components/SetHtmlLang";

// Generate static params for all locales (build time)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Dynamic metadata with hreflang
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = "https://ub-market.com";

  // Hreflang codes (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", ua: "uk", tr: "tr", ro: "ro", de: "de",
  };

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}`;
  }
  languages["x-default"] = `${baseUrl}/en`;

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Load all translations for this locale (server-side)
  const messages = await getMessages();

  const htmlLang = locale === "ua" ? "uk" : locale;

  return (
    <>
      <SchemaOrg locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SetHtmlLang lang={htmlLang} />
        <div className="pageWrapper">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <CookieConsent />
      </NextIntlClientProvider>
    </>
  );
}
'''

    with open(layout_path, "w") as f:
        f.write(new_layout)
    print(f"   ✅ Written: {layout_path}")

    # ============================================================
    # 3. Git commit
    # ============================================================
    print("\\n📝 Creating git commit...")
    subprocess.run(["git", "add", "-A"], capture_output=True)
    result = subprocess.run(
        ["git", "commit", "-m",
            "feat(phase-g): replace locale layout with NextIntlClientProvider"],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print("   ✅ Committed")
    else:
        print(f"   ⚠️  {result.stdout.strip()}")

    # ============================================================
    # Summary
    # ============================================================
    print("\\n" + "=" * 60)
    print("✅ Script 3 Complete!")
    print("=" * 60)
    print("\\nChanged:")
    print("  • src/app/[locale]/layout.tsx — NextIntlClientProvider")
    print("  • setRequestLocale() for SSG")
    print("  • getMessages() loads translations server-side")
    print("\\n⚠️  Site will NOT work yet — components still use useLanguage()")
    print("   Script 4 will migrate all components.")
    print("\\n👉 Next: Run Script 4 (component migration — the big one)")
    print("=" * 60)


if __name__ == "__main__":
    main()
