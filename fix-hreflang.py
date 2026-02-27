#!/usr/bin/env python3
"""
Fix hreflang alternates in all page.tsx files for UB Market (star-food).
Pattern copied from akillustrator.com project.

Run from project root:
  python3 fix-hreflang.py
"""

import os
import re

BASE_URL = "https://ub-market.com"

# ─── Page definitions: filepath → URL path segment ───
STATIC_PAGES = {
    "src/app/[locale]/page.tsx": "",
    "src/app/[locale]/about/page.tsx": "/about",
    "src/app/[locale]/contacts/page.tsx": "/contacts",
    "src/app/[locale]/partners/page.tsx": "/partners",
    "src/app/[locale]/products/page.tsx": "/products",
    "src/app/[locale]/quote/page.tsx": "/quote",
    "src/app/[locale]/services/private-label/page.tsx": "/services/private-label",
    "src/app/[locale]/brands/star-food/page.tsx": "/brands/star-food",
}

# Blog listing (no slug)
BLOG_LISTING = "src/app/[locale]/blog/page.tsx"
BLOG_LISTING_PATH = "/blog"

# Blog post (dynamic slug)
BLOG_POST = "src/app/[locale]/blog/[slug]/page.tsx"

# ─── Hreflang helper block (static pages) ───
HREFLANG_STATIC = '''
  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {{
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  }};
  const languages: Record<string, string> = {{}};
  for (const loc of routing.locales) {{
    languages[hreflangMap[loc] || loc] = `${{baseUrl}}/${{loc}}{path}`;
  }}
  languages["x-default"] = `${{baseUrl}}/en{path}`;
'''

# ─── Hreflang helper block (blog post with slug) ───
HREFLANG_DYNAMIC = '''
  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}/blog/${slug}`;
  }
  languages["x-default"] = `${baseUrl}/en/blog/${slug}`;
'''


def fix_static_page(filepath: str, url_path: str) -> bool:
    """Fix a static page's generateMetadata to include hreflang."""
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        return False

    with open(filepath, "r") as f:
        content = f.read()

    original = content

    # Skip if already has hreflang
    if "hreflangMap" in content:
        print(f"  SKIP (already has hreflang): {filepath}")
        return False

    # 1. Build hreflang block for this page
    block = HREFLANG_STATIC.format(path=url_path)

    # 2. Insert hreflang block before "return {" (the one inside generateMetadata)
    #    Pattern: find the return statement that has "title" on next line
    return_pattern = r"(\n  return \{\n    title)"
    if re.search(return_pattern, content):
        content = re.sub(return_pattern, block + r"\1", content, count=1)
    else:
        print(
            f"  WARNING: Could not find 'return {{ title' pattern in {filepath}")
        return False

    # 3. Fix canonical URL — add page path if not root
    if url_path:
        content = content.replace(
            "canonical: `${baseUrl}/${locale}`",
            f"canonical: `${{baseUrl}}/${{locale}}{url_path}`",
        )
        # Fix OG url too
        content = content.replace(
            "url: `${baseUrl}/${locale}`",
            f"url: `${{baseUrl}}/${{locale}}{url_path}`",
        )

    # 4. Add "languages" to alternates object
    content = content.replace(
        "alternates: {\n      canonical:",
        "alternates: {\n      languages,\n      canonical:",
    )

    if content != original:
        with open(filepath, "w") as f:
            f.write(content)
        print(
            f"  FIXED: {filepath} (path: /{url_path.lstrip('/')})" if url_path else f"  FIXED: {filepath} (path: /)")
        return True
    else:
        print(f"  NO CHANGE: {filepath}")
        return False


def fix_blog_listing(filepath: str) -> bool:
    """Fix blog listing page (/blog) — same as static but with /blog path."""
    return fix_static_page(filepath, BLOG_LISTING_PATH)


def fix_blog_post(filepath: str) -> bool:
    """Fix blog post page (/blog/[slug]) — dynamic slug in URLs."""
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        return False

    with open(filepath, "r") as f:
        content = f.read()

    original = content

    if "hreflangMap" in content:
        print(f"  SKIP (already has hreflang): {filepath}")
        return False

    # For blog posts, we need to check what variable name is used for baseUrl
    # and ensure slug is available in generateMetadata scope
    has_base_url = "baseUrl" in content or "BASE_URL" in content

    # Check if slug is destructured from params
    has_slug = 'slug' in content

    if not has_slug:
        print(f"  WARNING: 'slug' not found in {filepath} — check manually")

    # Insert hreflang block before "return {"
    return_pattern = r"(\n  return \{\n)"
    if not re.search(return_pattern, content):
        # Try alternate pattern with title on same line
        return_pattern = r"(\n  return \{)"

    if re.search(return_pattern, content):
        content = re.sub(return_pattern, HREFLANG_DYNAMIC +
                         r"\1", content, count=1)
    else:
        print(f"  WARNING: Could not find 'return {{' pattern in {filepath}")
        return False

    # Fix canonical to include /blog/${slug}
    # Replace simple canonical with full path
    content = content.replace(
        "canonical: `${baseUrl}/${locale}`",
        "canonical: `${baseUrl}/${locale}/blog/${slug}`",
    )

    # If canonical already has /blog/ but not slug
    if "canonical: `${baseUrl}/${locale}/blog`" in content:
        content = content.replace(
            "canonical: `${baseUrl}/${locale}/blog`",
            "canonical: `${baseUrl}/${locale}/blog/${slug}`",
        )

    # Add languages to alternates
    content = content.replace(
        "alternates: {\n      canonical:",
        "alternates: {\n      languages,\n      canonical:",
    )

    # Also fix OG url if present
    if "url: `${baseUrl}/${locale}`" in content:
        content = content.replace(
            "url: `${baseUrl}/${locale}`",
            "url: `${baseUrl}/${locale}/blog/${slug}`",
        )

    if content != original:
        with open(filepath, "w") as f:
            f.write(content)
        print(f"  FIXED: {filepath} (dynamic: /blog/[slug])")
        return True
    else:
        print(f"  NO CHANGE: {filepath}")
        return False


def verify_routing_config():
    """Check that routing.ts has alternateLinks: false."""
    routing_file = "src/i18n/routing.ts"
    if not os.path.exists(routing_file):
        print(f"\n⚠️  {routing_file} not found!")
        return

    with open(routing_file, "r") as f:
        content = f.read()

    if "alternateLinks: false" in content:
        print(f"\n✅ {routing_file}: alternateLinks: false — OK")
    elif "alternateLinks" not in content:
        print(
            f"\n⚠️  {routing_file}: alternateLinks not set — ADD 'alternateLinks: false' to routing config!")
    else:
        print(
            f"\n⚠️  {routing_file}: alternateLinks found but not 'false' — CHECK manually")


def main():
    print("=" * 60)
    print("UB Market — Hreflang Fix Script")
    print("Pattern from: akillustrator.com")
    print("=" * 60)

    # 1. Check routing.ts
    verify_routing_config()

    # 2. Fix static pages
    print("\n📄 Fixing static pages...")
    fixed_count = 0
    for filepath, url_path in STATIC_PAGES.items():
        if fix_static_page(filepath, url_path):
            fixed_count += 1

    # 3. Fix blog listing
    print("\n📄 Fixing blog listing...")
    if os.path.exists(BLOG_LISTING):
        if fix_blog_listing(BLOG_LISTING):
            fixed_count += 1
    else:
        # Check if blog listing has generateMetadata
        print(f"  SKIP: {BLOG_LISTING} (check if it has generateMetadata)")

    # 4. Fix blog post (dynamic)
    print("\n📄 Fixing blog post (dynamic [slug])...")
    if fix_blog_post(BLOG_POST):
        fixed_count += 1

    # Summary
    print("\n" + "=" * 60)
    print(f"✅ Fixed {fixed_count} files")
    print()
    print("Next steps:")
    print("  1. Run: pnpm build")
    print("  2. Run: pnpm start")
    print("  3. Verify: curl -s http://localhost:3000/en | grep hreflang")
    print("  4. Verify: curl -s http://localhost:3000/ua | grep hreflang")
    print("     → Should show hreflang='uk' (not 'ua')")
    print("=" * 60)


if __name__ == "__main__":
    main()
