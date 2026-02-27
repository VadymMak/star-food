"""
Phase G Checker — Is next-intl migration done on UB Market?
RUN FROM star-food PROJECT ROOT:
  python check_phase_g.py
"""

import os
import json
import subprocess

results = {
    "next-intl": [],
    "custom-context": [],
    "server-side": [],
    "missing": [],
}

print("=" * 60)
print("🔍 Phase G Check: next-intl Migration Status")
print("=" * 60)

# 1. Check if next-intl is installed
print("\n📦 1. Package check...")
pkg_path = "package.json"
if os.path.exists(pkg_path):
    with open(pkg_path, "r") as f:
        pkg = json.load(f)
    deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
    if "next-intl" in deps:
        print(f"   ✅ next-intl INSTALLED: {deps['next-intl']}")
        results["next-intl"].append("next-intl in package.json")
    else:
        print("   ❌ next-intl NOT installed")
        results["custom-context"].append("no next-intl in package.json")
else:
    print("   ⚠️  package.json not found — run from project root!")

# 2. Check for next-intl routing config
print("\n📂 2. next-intl config files...")
intl_files = [
    ("src/i18n/routing.ts", "defineRouting + createNavigation"),
    ("src/i18n/request.ts", "getRequestConfig for server"),
]
for path, desc in intl_files:
    if os.path.exists(path):
        with open(path, "r") as f:
            content = f.read()
        if "next-intl" in content or "defineRouting" in content or "getRequestConfig" in content:
            print(f"   ✅ {path} — {desc}")
            results["next-intl"].append(path)
        else:
            print(f"   ⚠️  {path} exists but no next-intl imports")
    else:
        print(f"   ❌ {path} — NOT FOUND")
        results["missing"].append(path)

# 3. Check LanguageContext (custom approach)
print("\n📂 3. LanguageContext (custom i18n)...")
ctx_path = "src/context/LanguageContext.tsx"
if os.path.exists(ctx_path):
    with open(ctx_path, "r") as f:
        content = f.read()
    if "useLanguage" in content and "LanguageProvider" in content:
        print(f"   ⚠️  {ctx_path} — CUSTOM useLanguage() found")
        results["custom-context"].append("LanguageContext with useLanguage()")
        if "next-intl" in content:
            print(f"   🔀 ...but also imports next-intl (hybrid?)")
            results["next-intl"].append("hybrid LanguageContext")
    else:
        print(f"   ℹ️  {ctx_path} exists but no useLanguage")
else:
    print(f"   ✅ {ctx_path} — NOT FOUND (good if using next-intl)")
    results["next-intl"].append("no LanguageContext.tsx")

# 4. Check middleware/proxy
print("\n📂 4. Middleware / Proxy...")
for mw_path in ["src/middleware.ts", "src/proxy.ts", "proxy.ts", "middleware.ts"]:
    if os.path.exists(mw_path):
        with open(mw_path, "r") as f:
            content = f.read()
        if "next-intl" in content:
            print(f"   ✅ {mw_path} — uses next-intl middleware")
            results["next-intl"].append(f"{mw_path} with next-intl")
        else:
            print(f"   ⚠️  {mw_path} — custom middleware (no next-intl)")
            results["custom-context"].append(f"{mw_path} custom")

# 5. Check locale layout for NextIntlClientProvider or generateMetadata
print("\n📂 5. Locale layout...")
layout_path = "src/app/[locale]/layout.tsx"
if os.path.exists(layout_path):
    with open(layout_path, "r") as f:
        content = f.read()
    checks = {
        "NextIntlClientProvider": "next-intl",
        "getMessages": "next-intl",
        "setRequestLocale": "server-side",
        "generateMetadata": "server-side",
        "LanguageProvider": "custom-context",
        "useLanguage": "custom-context",
    }
    for keyword, category in checks.items():
        if keyword in content:
            icon = "✅" if category in ("next-intl", "server-side") else "⚠️"
            print(f"   {icon} {keyword} — found in layout")
            results[category].append(f"{keyword} in locale layout")
else:
    print(f"   ❌ {layout_path} NOT FOUND")

# 6. Check a sample page for generateMetadata
print("\n📂 6. Server-side metadata...")
sample_pages = [
    "src/app/[locale]/page.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/products/page.tsx",
]
for page_path in sample_pages:
    if os.path.exists(page_path):
        with open(page_path, "r") as f:
            content = f.read()
        if "generateMetadata" in content:
            print(f"   ✅ {page_path} — has generateMetadata()")
            results["server-side"].append(f"generateMetadata in {page_path}")
        elif "use client" in content:
            print(
                f"   ⚠️  {page_path} — client component (no server metadata)")
            results["custom-context"].append(f"client-side {page_path}")
        else:
            print(
                f"   ℹ️  {page_path} — server component, no generateMetadata")

# 7. Check component imports
print("\n📂 7. Component translation pattern...")
sample_components = [
    "src/components/Header/Header.tsx",
    "src/components/Hero/Hero.tsx",
    "src/components/Footer/Footer.tsx",
]
for comp_path in sample_components:
    if os.path.exists(comp_path):
        with open(comp_path, "r") as f:
            content = f.read()
        if "useTranslations" in content:
            print(f"   ✅ {comp_path} — uses useTranslations() (next-intl)")
            results["next-intl"].append(f"useTranslations in {comp_path}")
        elif "useLanguage" in content:
            print(f"   ⚠️  {comp_path} — uses useLanguage() (custom)")
            results["custom-context"].append(f"useLanguage in {comp_path}")
        else:
            print(f"   ℹ️  {comp_path} — no translation hook found")

# 8. Check for hreflang in sitemap
print("\n📂 8. Dynamic sitemap...")
sitemap_path = "src/app/sitemap.ts"
if os.path.exists(sitemap_path):
    with open(sitemap_path, "r") as f:
        content = f.read()
    if "alternates" in content or "hreflang" in content.lower():
        print(f"   ✅ {sitemap_path} — has hreflang/alternates")
        results["server-side"].append("dynamic sitemap with hreflang")
    else:
        print(f"   ⚠️  {sitemap_path} — exists but no hreflang")
else:
    sitemap_xml = "public/sitemap.xml"
    if os.path.exists(sitemap_xml):
        print(f"   ⚠️  Static {sitemap_xml} (not dynamic)")
        results["custom-context"].append("static sitemap.xml")
    else:
        print(f"   ❌ No sitemap found")
        results["missing"].append("sitemap")

# ============================================================
# VERDICT
# ============================================================
print("\n" + "=" * 60)
print("📊 VERDICT")
print("=" * 60)

ni = len(results["next-intl"])
cc = len(results["custom-context"])
ss = len(results["server-side"])

if ni >= 5 and cc == 0:
    verdict = "✅ PHASE G DONE — Full next-intl migration"
    color = "🟢"
elif ni >= 3 and cc >= 1:
    verdict = "🔀 PARTIAL — Hybrid (some next-intl, some custom)"
    color = "🟡"
elif cc >= 3 and ni <= 1:
    verdict = "❌ PHASE G NOT DONE — Still using custom LanguageContext"
    color = "🔴"
else:
    verdict = "❓ UNCLEAR — Need manual review"
    color = "⚪"

print(f"\n{color} {verdict}")
print(f"\n   next-intl signals:    {ni}")
print(f"   custom-context signals: {cc}")
print(f"   server-side signals:  {ss}")

if results["next-intl"]:
    print(f"\n   next-intl evidence:")
    for item in results["next-intl"]:
        print(f"     • {item}")

if results["custom-context"]:
    print(f"\n   Custom context evidence:")
    for item in results["custom-context"]:
        print(f"     • {item}")

if results["server-side"]:
    print(f"\n   Server-side evidence:")
    for item in results["server-side"]:
        print(f"     • {item}")

print("\n" + "=" * 60)
if cc > ni:
    print("💡 To complete Phase G, you would need to:")
    print("   1. Install next-intl")
    print("   2. Replace LanguageContext → next-intl provider")
    print("   3. Replace useLanguage() → useTranslations()")
    print("   4. Add generateMetadata() to all pages")
    print("   5. Create src/i18n/routing.ts + request.ts")
    print("   6. Update middleware to use next-intl")
    print("   7. Add setRequestLocale() for SSG")
print("=" * 60)
