"""
Phase G Migration — Script 4: Component Migration
=====================================================================
RUN FROM star-food PROJECT ROOT:
  python 04_migrate_components.py

WHAT IT DOES:
  1. Replaces useLanguage() → useTranslations() / useLocale() in ALL files
  2. Replaces t.X.Y → t('X.Y') access patterns
  3. Handles namespace aliases (const h = t?.hero || {})
  4. Rewrites LanguageSwitcher for next-intl
  5. Backs up ALL modified files

MODIFIES: 29 files (20 components + 8 pages + LanguageContext)
"""

import os
import re
import shutil
import subprocess
import sys
from typing import Dict, List, Tuple

PROJECT_ROOT = os.getcwd()


def check_project():
    if not os.path.exists("src/i18n/routing.ts"):
        print("❌ Run Scripts 1-3 first!")
        sys.exit(1)
    print("✅ Project verified")


def backup_file(path):
    if os.path.exists(path):
        backup = path + ".backup"
        if not os.path.exists(backup):
            shutil.copy2(path, backup)

# ============================================================
# CORE MIGRATION LOGIC
# ============================================================


def find_namespace_aliases(content: str) -> Dict[str, str]:
    """Find patterns like: const h = t?.hero || {};"""
    aliases = {}
    # Pattern: const ALIAS = t?.NAMESPACE || {};
    pattern = r'const\s+(\w+)\s*=\s*t\?\.(\w+)\s*(?:\|\||%%)\s*\{?\s*\}?\s*;'
    for match in re.finditer(pattern, content):
        aliases[match.group(1)] = match.group(2)
    # Also: const ALIAS = t?.NAMESPACE ?? {};
    pattern2 = r'const\s+(\w+)\s*=\s*t\?\.(\w+)\s*\?\?\s*\{?\s*\}?\s*;'
    for match in re.finditer(pattern2, content):
        aliases[match.group(1)] = match.group(2)
    # Also without optional chaining: const ALIAS = t.NAMESPACE || {};
    pattern3 = r'const\s+(\w+)\s*=\s*t\.(\w+)\s*\|\|\s*\{?\s*\}?\s*;'
    for match in re.finditer(pattern3, content):
        aliases[match.group(1)] = match.group(2)
    return aliases


def check_needs_locale(content: str) -> bool:
    """Check if component uses locale variable (not just t)"""
    # Remove the destructuring line to avoid false positives
    cleaned = re.sub(r'const\s*\{[^}]*\}\s*=\s*useLanguage\(\)', '', content)
    # Check if 'locale' is used elsewhere
    return bool(re.search(r'(?<!\w)locale(?!\w)', cleaned))


def check_uses_switch_locale(content: str) -> bool:
    return 'switchLocale' in content


def check_uses_available_locales(content: str) -> bool:
    return 'availableLocales' in content


def check_has_array_access(content: str) -> List[str]:
    """Find patterns like t.X.Y.map( or t?.X?.Y?.map("""
    arrays = []
    # t.ns.key.map or t?.ns?.key?.map
    pattern = r't\??\.\w+\??\.(\w+)\??\.(map|forEach|filter|length|join)'
    for match in re.finditer(pattern, content):
        arrays.append(match.group(0))
    return arrays


def migrate_content(content: str, filepath: str) -> Tuple[str, List[str]]:
    """Migrate a single file's content. Returns (new_content, warnings)."""
    warnings = []

    # Skip if already migrated
    if 'useTranslations' in content and 'useLanguage' not in content:
        return content, ["Already migrated"]

    if 'useLanguage' not in content:
        return content, ["No useLanguage found"]

    needs_locale = check_needs_locale(content)
    uses_switch = check_uses_switch_locale(content)
    uses_available = check_uses_available_locales(content)
    aliases = find_namespace_aliases(content)
    array_accesses = check_has_array_access(content)

    if uses_switch:
        warnings.append(
            "USES switchLocale — needs LanguageSwitcher rewrite (handled separately)")
        return content, warnings

    if array_accesses:
        warnings.append(
            f"Array access found: {array_accesses} — may need t.raw()")

    # ── Step 1: Replace import ──
    # Remove old import
    content = re.sub(
        r'import\s*\{\s*useLanguage\s*\}\s*from\s*["\']@/context/LanguageContext["\'];?\s*\n?',
        '',
        content
    )
    # Remove type import if present
    content = re.sub(
        r'import\s+type\s*\{\s*Locale\s*\}\s*from\s*["\']@/lib/locale["\'];?\s*\n?',
        '',
        content
    )

    # Add new imports after "use client" or at top
    new_imports = []
    new_imports.append('import { useTranslations } from "next-intl";')
    if needs_locale:
        new_imports.append('import { useLocale } from "next-intl";')

    import_block = "\n".join(new_imports) + "\n"

    # Insert after "use client" if present, otherwise at top after existing imports
    if '"use client"' in content or "'use client'" in content:
        content = re.sub(
            r'(["\']use client["\'];?\s*\n)',
            r'\1' + import_block,
            content,
            count=1
        )
    else:
        # Find last import line and add after it
        lines = content.split('\n')
        last_import_idx = -1
        for i, line in enumerate(lines):
            if line.strip().startswith('import '):
                last_import_idx = i
        if last_import_idx >= 0:
            lines.insert(last_import_idx + 1, import_block.rstrip())
            content = '\n'.join(lines)
        else:
            content = import_block + content

    # ── Step 2: Replace destructuring ──
    # const { locale, t } = useLanguage();  →  const locale = useLocale(); const t = useTranslations();
    # const { t } = useLanguage();  →  const t = useTranslations();
    # Various destructuring patterns

    if needs_locale:
        replacement = 'const locale = useLocale();\n  const t = useTranslations();'
    else:
        replacement = 'const t = useTranslations();'

    # Match various destructuring patterns
    content = re.sub(
        r'const\s*\{[^}]*\}\s*=\s*useLanguage\(\);?',
        replacement,
        content
    )

    # ── Step 3: Handle namespace aliases ──
    for alias_var, namespace in aliases.items():
        # Replace alias.key || "fallback" → t('namespace.key')
        # In JSX: {alias.key || "fallback"} → {t("namespace.key")}
        content = re.sub(
            rf'{alias_var}\.(\w+)\s*\|\|\s*"[^"]*"',
            lambda m: f't("{namespace}.{m.group(1)}")',
            content
        )
        content = re.sub(
            rf"{alias_var}\.(\w+)\s*\|\|\s*'[^']*'",
            lambda m: f't("{namespace}.{m.group(1)}")',
            content
        )
        # Replace alias.key (standalone) → t('namespace.key')
        content = re.sub(
            rf'(?<![.\w]){alias_var}\.(\w+)(?![.\w(])',
            lambda m: f't("{namespace}.{m.group(1)}")',
            content
        )
        # Also handle alias.key followed by } or , or )
        # This catches cases in JSX expressions

    # Remove alias declarations
    for alias_var, namespace in aliases.items():
        content = re.sub(
            rf'\s*const\s+{alias_var}\s*=\s*t\??\.{namespace}\s*(?:\|\||%%|\?\?)\s*\{{?\s*\}}?\s*;?\s*\n?',
            '\n',
            content
        )
        content = re.sub(
            rf'\s*const\s+{alias_var}\s*=\s*t\.{namespace}\s*\|\|\s*\{{?\s*\}}?\s*;?\s*\n?',
            '\n',
            content
        )

    # ── Step 4: Replace remaining t?.X?.Y patterns ──
    # t?.hero?.badge || "fallback" → t("hero.badge")
    content = re.sub(
        r't\?\.\s*(\w+)\?\.\s*(\w+)\s*\|\|\s*"[^"]*"',
        lambda m: f't("{m.group(1)}.{m.group(2)}")',
        content
    )
    content = re.sub(
        r"t\?\.\s*(\w+)\?\.\s*(\w+)\s*\|\|\s*'[^']*'",
        lambda m: f't("{m.group(1)}.{m.group(2)}")',
        content
    )
    # t?.X?.Y (without fallback)
    content = re.sub(
        r't\?\.\s*(\w+)\?\.\s*(\w+)',
        lambda m: f't("{m.group(1)}.{m.group(2)}")',
        content
    )

    # ── Step 5: Replace t.X.Y patterns ──
    # t.hero.badge → t("hero.badge")
    # But NOT: t("already.done") or t.raw(...)
    content = re.sub(
        r'(?<!["\'\w])t\.(\w+)\.(\w+)(?!\w|\()',
        lambda m: f't("{m.group(1)}.{m.group(2)}")',
        content
    )

    # ── Step 6: Handle array access patterns ──
    # t.X.Y.map( → (t.raw('X.Y') as string[]).map(
    content = re.sub(
        r't\.(\w+)\.(\w+)\.(map|forEach|filter)\(',
        lambda m: f'(t.raw("{m.group(1)}.{m.group(2)}") as string[]).{m.group(3)}(',
        content
    )
    # t.X.Y.length → (t.raw('X.Y') as string[]).length
    content = re.sub(
        r't\.(\w+)\.(\w+)\.length',
        lambda m: f'(t.raw("{m.group(1)}.{m.group(2)}") as string[]).length',
        content
    )

    # ── Step 7: Clean up double imports ──
    # Remove duplicate import lines
    lines = content.split('\n')
    seen_imports = set()
    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('import ') and stripped in seen_imports:
            continue
        if stripped.startswith('import '):
            seen_imports.add(stripped)
        cleaned_lines.append(line)
    content = '\n'.join(cleaned_lines)

    # Remove excessive blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    return content, warnings


# ============================================================
# LANGUAGE SWITCHER — Complete rewrite
# ============================================================

LANGUAGE_SWITCHER_NEW = '''"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.css";

const FLAGS: Record<string, string> = {
  en: "🇬🇧",
  bg: "🇧🇬",
  tr: "🇹🇷",
  ro: "🇷🇴",
  de: "🇩🇪",
  ua: "🇺🇦",
};

const LABELS: Record<string, string> = {
  en: "English",
  bg: "Български",
  tr: "Türkçe",
  ro: "Română",
  de: "Deutsch",
  ua: "Українська",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={styles.switcher}>
      <button className={styles.current} aria-label="Change language">
        {FLAGS[locale] || "🌐"} {locale.toUpperCase()}
      </button>
      <div className={styles.dropdown}>
        {routing.locales.map((loc) => (
          <button
            key={loc}
            className={`${styles.option} ${loc === locale ? styles.active : ""}`}
            onClick={() => handleSwitch(loc)}
          >
            {FLAGS[loc]} {LABELS[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}
'''


def main():
    print("=" * 60)
    print("🚀 Phase G — Script 4: Component Migration (29 files)")
    print("=" * 60)

    check_project()

    # All files that use useLanguage
    target_files = []
    for root, dirs, files in os.walk("src"):
        for f in files:
            if f.endswith(('.tsx', '.ts')) and not f.endswith('.backup'):
                fpath = os.path.join(root, f)
                with open(fpath) as file:
                    if 'useLanguage' in file.read():
                        target_files.append(fpath)

    print(f"\n📋 Found {len(target_files)} files to migrate:")
    for f in sorted(target_files):
        print(f"   • {f}")

    # ============================================================
    # 1. Backup all files
    # ============================================================
    print(f"\n💾 Backing up {len(target_files)} files...")
    for f in target_files:
        backup_file(f)
    print("   ✅ All backups created")

    # ============================================================
    # 2. Handle LanguageSwitcher separately
    # ============================================================
    print("\n🔧 Rewriting LanguageSwitcher...")
    ls_path = "src/components/LanguageSwitcher/LanguageSwitcher.tsx"
    if os.path.exists(ls_path):
        with open(ls_path, "w") as f:
            f.write(LANGUAGE_SWITCHER_NEW)
        print(f"   ✅ {ls_path} — completely rewritten for next-intl")
        target_files = [f for f in target_files if 'LanguageSwitcher' not in f]

    # ============================================================
    # 3. Migrate each file
    # ============================================================
    print(f"\n🔄 Migrating {len(target_files)} files...")

    all_warnings = {}
    migrated = 0
    skipped = 0

    for filepath in sorted(target_files):
        # Skip LanguageContext.tsx itself (will handle later)
        if 'LanguageContext.tsx' in filepath:
            print(f"   ⏭️  {filepath} — context file, skip for now")
            skipped += 1
            continue

        with open(filepath) as f:
            original = f.read()

        new_content, warnings = migrate_content(original, filepath)

        if warnings and warnings[0] in ("Already migrated", "No useLanguage found"):
            print(f"   ⏭️  {filepath} — {warnings[0]}")
            skipped += 1
            continue

        if "USES switchLocale" in str(warnings):
            print(f"   ⏭️  {filepath} — switchLocale (handled above)")
            skipped += 1
            continue

        if new_content != original:
            with open(filepath, "w") as f:
                f.write(new_content)

            status = "✅"
            if warnings:
                status = "⚠️"
                all_warnings[filepath] = warnings

            print(f"   {status} {filepath}")
            migrated += 1
        else:
            print(f"   ⏭️  {filepath} — no changes needed")
            skipped += 1

    # ============================================================
    # 4. Update LanguageContext to add deprecation notice
    # ============================================================
    print("\n📂 Marking LanguageContext as deprecated...")
    ctx_path = "src/context/LanguageContext.tsx"
    if os.path.exists(ctx_path):
        with open(ctx_path, "r") as f:
            ctx_content = f.read()
        # Add deprecation comment at top
        if "DEPRECATED" not in ctx_content:
            ctx_content = '// DEPRECATED: This file is no longer used after next-intl migration.\n// All components now use useTranslations() from "next-intl".\n// Safe to delete after verifying everything works.\n\n' + ctx_content
            with open(ctx_path, "w") as f:
                f.write(ctx_content)
            print(f"   ✅ Added deprecation notice to {ctx_path}")

    # ============================================================
    # 5. Git commit
    # ============================================================
    print("\n📝 Creating git commit...")
    subprocess.run(["git", "add", "-A"], capture_output=True)
    result = subprocess.run(
        ["git", "commit", "-m",
            f"feat(phase-g): migrate {migrated} components from useLanguage to next-intl useTranslations"],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print("   ✅ Committed")
    else:
        print(f"   ⚠️  {result.stdout.strip()}")

    # ============================================================
    # Summary
    # ============================================================
    print("\n" + "=" * 60)
    print("📊 Migration Summary")
    print("=" * 60)
    print(f"\n   ✅ Migrated:  {migrated} files")
    print(f"   ⏭️  Skipped:   {skipped} files")
    print(f"   📝 Rewritten: LanguageSwitcher (complete)")

    if all_warnings:
        print(f"\n   ⚠️  Files needing manual review ({len(all_warnings)}):")
        for fpath, warns in all_warnings.items():
            print(f"\n   📄 {fpath}:")
            for w in warns:
                print(f"      → {w}")

    # ============================================================
    # Verification hints
    # ============================================================
    print("\n" + "=" * 60)
    print("🧪 NEXT STEP: Test the build")
    print("=" * 60)
    print("\nRun:")
    print("  pnpm dev")
    print("\nIf errors appear, they'll likely be:")
    print("  • Missing quotes: t.X.Y that wasn't caught → change to t('X.Y')")
    print("  • Array access: t.X.Y.map() → (t.raw('X.Y') as string[]).map()")
    print("  • LanguageContext import still referenced somewhere")
    print("\n👉 After fixing errors: Run Script 5 (page metadata)")
    print("=" * 60)


if __name__ == "__main__":
    main()
