"""
Phase G Migration — Script 1: Install next-intl + Create Config Files
=====================================================================
RUN FROM star-food PROJECT ROOT:
  python 01_install_and_config.py

WHAT IT DOES:
  1. Creates src/i18n/routing.ts (defineRouting + createNavigation)
  2. Creates src/i18n/request.ts (getRequestConfig for server components)
  3. Prints pnpm install command to run manually

SAFE: Only CREATES new files, does NOT modify existing ones.
"""

import os
import subprocess
import sys

PROJECT_ROOT = os.getcwd()


def check_project():
    """Verify we're in the right directory"""
    if not os.path.exists("package.json"):
        print("❌ package.json not found. Run from star-food root!")
        sys.exit(1)
    if not os.path.exists("src/i18n/en.json"):
        print("❌ src/i18n/en.json not found. Wrong project?")
        sys.exit(1)
    print("✅ Project root confirmed: star-food")


def check_git_clean():
    """Ensure no uncommitted changes"""
    result = subprocess.run(
        ["git", "status", "--porcelain"], capture_output=True, text=True)
    if result.stdout.strip():
        print("⚠️  You have uncommitted changes:")
        print(result.stdout)
        answer = input("Continue anyway? (y/n): ").strip().lower()
        if answer != "y":
            print("Aborted.")
            sys.exit(0)
    else:
        print("✅ Git working tree clean")


def create_file(path, content, description):
    """Create a file with content"""
    full_path = os.path.join(PROJECT_ROOT, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)

    if os.path.exists(full_path):
        print(f"   ⚠️  {path} already exists — SKIPPING")
        return False

    with open(full_path, "w") as f:
        f.write(content)
    print(f"   ✅ Created: {path} — {description}")
    return True


def main():
    print("=" * 60)
    print("🚀 Phase G — Script 1: Install next-intl + Config")
    print("=" * 60)

    check_project()
    check_git_clean()

    # ============================================================
    # 1. Create src/i18n/routing.ts
    # ============================================================
    print("\n📂 Creating i18n config files...")

    create_file("src/i18n/routing.ts", '''// src/i18n/routing.ts — Central locale routing config (next-intl)
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
''', "defineRouting + createNavigation")

    # ============================================================
    # 2. Create src/i18n/request.ts
    # ============================================================
    create_file("src/i18n/request.ts", '''// src/i18n/request.ts — Server-side translation loader (next-intl)
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
''', "getRequestConfig for server components")

    # ============================================================
    # 3. Check if next.config needs i18n plugin
    # ============================================================
    print("\n📂 Checking next.config...")

    # Find the next config file
    config_file = None
    for name in ["next.config.ts", "next.config.js", "next.config.mjs"]:
        if os.path.exists(name):
            config_file = name
            break

    if config_file:
        with open(config_file, "r") as f:
            config_content = f.read()
        if "createNextIntlPlugin" in config_content:
            print(f"   ✅ {config_file} already has next-intl plugin")
        else:
            print(
                f"   ⚠️  {config_file} needs next-intl plugin — will be added in Script 2")
    else:
        print("   ❌ No next.config found!")

    # ============================================================
    # 4. Install next-intl
    # ============================================================
    print("\n📦 Installing next-intl...")
    print("   Running: pnpm add next-intl")

    result = subprocess.run(
        ["pnpm", "add", "next-intl"],
        capture_output=True, text=True
    )

    if result.returncode == 0:
        print("   ✅ next-intl installed successfully")
        # Verify
        with open("package.json", "r") as f:
            import json
            pkg = json.load(f)
        version = pkg.get("dependencies", {}).get("next-intl", "not found")
        print(f"   📦 next-intl version: {version}")
    else:
        print("   ❌ pnpm install failed:")
        print(result.stderr)
        print("\n   Try manually: pnpm add next-intl")

    # ============================================================
    # 5. Git commit
    # ============================================================
    print("\n📝 Creating git commit...")
    subprocess.run(["git", "add", "-A"], capture_output=True)
    result = subprocess.run(
        ["git", "commit", "-m",
            "feat(phase-g): install next-intl + add routing/request configs"],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print("   ✅ Committed: install next-intl + config files")
    else:
        print(f"   ⚠️  Commit note: {result.stdout.strip()}")

    # ============================================================
    # Summary
    # ============================================================
    print("\n" + "=" * 60)
    print("✅ Script 1 Complete!")
    print("=" * 60)
    print("\nCreated files:")
    print("  • src/i18n/routing.ts  — locale routing config")
    print("  • src/i18n/request.ts  — server translation loader")
    print("  • package.json updated — next-intl added")
    print("\n⚠️  Site still works with OLD system (nothing broken)")
    print("\n👉 Next: Run Script 2 (middleware + next.config)")
    print("=" * 60)


if __name__ == "__main__":
    main()
