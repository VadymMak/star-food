"""
Phase G Migration — Script 6: Verification
=====================================================================
RUN FROM star-food PROJECT ROOT:
  python 06_verify_migration.py

WHAT IT DOES:
  1. Checks for remaining useLanguage() references
  2. Verifies next-intl setup is complete
  3. Checks for common migration issues
  4. Runs pnpm build to catch compile errors
  5. Generates final report
"""

import os
import re
import subprocess
import sys
import json

PROJECT_ROOT = os.getcwd()


def check_project():
    if not os.path.exists("package.json"):
        print("❌ Run from star-food root!")
        sys.exit(1)


def count_pattern(pattern: str, extensions=('.tsx', '.ts')) -> list:
    """Find all files containing a pattern."""
    results = []
    for root, dirs, files in os.walk("src"):
        # Skip backup files and node_modules
        dirs[:] = [d for d in dirs if d != 'node_modules']
        for f in files:
            if f.endswith(extensions) and not f.endswith('.backup') and not f.endswith('.backup2'):
                fpath = os.path.join(root, f)
                with open(fpath) as file:
                    content = file.read()
                if re.search(pattern, content):
                    results.append(fpath)
    return results


def main():
    print("=" * 60)
    print("🔍 Phase G — Script 6: Migration Verification")
    print("=" * 60)

    check_project()
    issues = []
    passed = []

    # ============================================================
    # 1. Check: No more useLanguage references
    # ============================================================
    print("\n📋 1. Checking for remaining useLanguage()...")
    old_refs = count_pattern(r'useLanguage')
    # Exclude the deprecated LanguageContext itself
    old_refs = [f for f in old_refs if 'LanguageContext' not in f]
    if old_refs:
        issues.append(f"❌ {len(old_refs)} files still use useLanguage():")
        for f in old_refs:
            issues.append(f"   • {f}")
    else:
        passed.append("✅ No useLanguage() references remain")

    # ============================================================
    # 2. Check: next-intl installed
    # ============================================================
    print("📋 2. Checking next-intl installation...")
    with open("package.json") as f:
        pkg = json.load(f)
    if "next-intl" in pkg.get("dependencies", {}):
        passed.append(
            f"✅ next-intl installed: {pkg['dependencies']['next-intl']}")
    else:
        issues.append("❌ next-intl not in dependencies")

    # ============================================================
    # 3. Check: Config files exist
    # ============================================================
    print("📋 3. Checking config files...")
    required_files = {
        "src/i18n/routing.ts": "Locale routing config",
        "src/i18n/request.ts": "Server request config",
    }
    for fpath, desc in required_files.items():
        if os.path.exists(fpath):
            passed.append(f"✅ {fpath} exists ({desc})")
        else:
            issues.append(f"❌ {fpath} missing ({desc})")

    # ============================================================
    # 4. Check: Middleware uses next-intl
    # ============================================================
    print("📋 4. Checking middleware...")
    mw_path = "src/middleware.ts"
    if os.path.exists(mw_path):
        with open(mw_path) as f:
            mw_content = f.read()
        if "next-intl" in mw_content or "createMiddleware" in mw_content:
            passed.append("✅ Middleware uses next-intl")
        else:
            issues.append("❌ Middleware not using next-intl")
    else:
        issues.append("❌ Middleware file not found")

    # ============================================================
    # 5. Check: Layout uses NextIntlClientProvider
    # ============================================================
    print("📋 5. Checking locale layout...")
    layout_path = "src/app/[locale]/layout.tsx"
    if os.path.exists(layout_path):
        with open(layout_path) as f:
            layout_content = f.read()

        checks = {
            "NextIntlClientProvider": "Provider in layout",
            "getMessages": "Server-side message loading",
            "setRequestLocale": "SSG support",
            "generateMetadata": "Server-side metadata",
            "generateStaticParams": "Static params for locales",
        }
        for keyword, desc in checks.items():
            if keyword in layout_content:
                passed.append(f"✅ Layout: {desc}")
            else:
                issues.append(f"❌ Layout missing: {desc}")

        if "LanguageProvider" in layout_content:
            issues.append(
                "⚠️  Layout still has old LanguageProvider reference")

    # ============================================================
    # 6. Check: Components use useTranslations
    # ============================================================
    print("📋 6. Checking component patterns...")
    use_translations = count_pattern(r'useTranslations')
    use_locale = count_pattern(r'useLocale')

    passed.append(f"✅ {len(use_translations)} files use useTranslations()")
    if use_locale:
        passed.append(f"✅ {len(use_locale)} files use useLocale()")

    # ============================================================
    # 7. Check: No old t.X.Y patterns (should be t('X.Y'))
    # ============================================================
    print("📋 7. Checking translation access patterns...")
    # Look for t.word.word that's NOT t.raw( or t.rich(
    old_pattern_files = []
    for root, dirs, files in os.walk("src"):
        dirs[:] = [d for d in dirs if d != 'node_modules']
        for f in files:
            if f.endswith('.tsx') and not f.endswith('.backup'):
                fpath = os.path.join(root, f)
                with open(fpath) as file:
                    content = file.read()
                # Skip files without translations
                if 'useTranslations' not in content and 'useLanguage' not in content:
                    continue
                # Find t.word.word that isn't t.raw( or t.rich(
                matches = re.findall(
                    r'(?<!["\'])t\.(?!raw|rich|markup)(\w+)\.(\w+)', content)
                if matches:
                    old_pattern_files.append(
                        (fpath, matches[:3]))  # Show first 3

    if old_pattern_files:
        issues.append(
            f"⚠️  {len(old_pattern_files)} files may have old t.X.Y patterns:")
        for fpath, matches in old_pattern_files:
            examples = ", ".join([f"t.{a}.{b}" for a, b in matches])
            issues.append(f"   • {fpath}: {examples}")
    else:
        passed.append("✅ No old t.X.Y access patterns found")

    # ============================================================
    # 8. Check: Pages have generateMetadata
    # ============================================================
    print("📋 8. Checking page metadata...")
    page_dirs = [
        "src/app/[locale]/page.tsx",
        "src/app/[locale]/about/page.tsx",
        "src/app/[locale]/products/page.tsx",
        "src/app/[locale]/contacts/page.tsx",
        "src/app/[locale]/partners/page.tsx",
        "src/app/[locale]/quote/page.tsx",
        "src/app/[locale]/brands/star-food/page.tsx",
        "src/app/[locale]/services/private-label/page.tsx",
    ]
    for page_path in page_dirs:
        if os.path.exists(page_path):
            with open(page_path) as f:
                content = f.read()
            if "generateMetadata" in content:
                passed.append(f"✅ {page_path} — has generateMetadata")
            else:
                issues.append(f"⚠️  {page_path} — no generateMetadata")

    # ============================================================
    # 9. Check: Meta translations exist
    # ============================================================
    print("📋 9. Checking meta translations...")
    for lang in ["en", "bg", "ua", "tr", "ro", "de"]:
        json_path = f"src/i18n/{lang}.json"
        if os.path.exists(json_path):
            with open(json_path) as f:
                data = json.load(f)
            if "meta" in data:
                passed.append(f"✅ {json_path} — has meta section")
            else:
                issues.append(f"⚠️  {json_path} — no meta section")

    # ============================================================
    # 10. Check: next.config has next-intl plugin
    # ============================================================
    print("📋 10. Checking next.config...")
    for config_name in ["next.config.ts", "next.config.js", "next.config.mjs"]:
        if os.path.exists(config_name):
            with open(config_name) as f:
                config_content = f.read()
            if "createNextIntlPlugin" in config_content or "withNextIntl" in config_content:
                passed.append(f"✅ {config_name} — has next-intl plugin")
            else:
                issues.append(
                    f"❌ {config_name} — missing next-intl plugin wrapper")
            break

    # ============================================================
    # 11. Try build
    # ============================================================
    print("\n📋 11. Running pnpm build (this may take a minute)...")
    result = subprocess.run(
        ["pnpm", "build"],
        capture_output=True, text=True,
        timeout=120
    )
    if result.returncode == 0:
        passed.append("✅ pnpm build — SUCCESS")
    else:
        issues.append("❌ pnpm build — FAILED")
        # Extract first few error lines
        error_lines = result.stderr.split('\n')
        error_summary = [
            l for l in error_lines if 'Error' in l or 'error' in l][:5]
        for line in error_summary:
            issues.append(f"   {line.strip()}")

    # ============================================================
    # FINAL REPORT
    # ============================================================
    print("\n" + "=" * 60)
    print("📊 PHASE G MIGRATION REPORT")
    print("=" * 60)

    print(f"\n✅ PASSED ({len(passed)}):")
    for p in passed:
        print(f"   {p}")

    if issues:
        print(f"\n❌ ISSUES ({len(issues)}):")
        for i in issues:
            print(f"   {i}")

    # Score
    total = len(passed) + len([i for i in issues if i.startswith("❌")])
    score = len(passed) / max(total, 1) * 100

    print(f"\n{'=' * 60}")
    if score >= 90:
        print(f"🟢 Score: {score:.0f}% — Phase G migration COMPLETE!")
        print("   Ready to push dev and merge to main")
    elif score >= 70:
        print(f"🟡 Score: {score:.0f}% — Almost done, fix remaining issues")
    else:
        print(f"🔴 Score: {score:.0f}% — Significant issues remain")

    print(f"\n📌 Next steps:")
    if issues:
        print("   1. Fix issues listed above")
        print("   2. Run pnpm dev and test all pages")
        print("   3. Run this script again")
    else:
        print("   1. Test all pages: pnpm dev")
        print("   2. git push origin dev")
        print("   3. Create PR: dev → main")
        print("   4. Merge after review")
    print("=" * 60)


if __name__ == "__main__":
    main()
