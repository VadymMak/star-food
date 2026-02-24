#!/usr/bin/env python3
"""
Phase D — Categories Cleanup

The original batch2b script accidentally inserted blog post objects
into the `categories` array instead of `blogPosts`. This script:
1. Finds the categories array
2. Removes any objects that have a 'slug' property (= blog posts)
3. Keeps only proper category objects (id + label)
4. Updates sitemap with all 12 blog slugs

Run from star-food/ root:
    python3 phase_d_cleanup.py
"""

import re
import os
import sys

BLOG_POSTS_FILE = "src/data/blog-posts.ts"
SITEMAP_FILE = "src/app/sitemap.ts"


def find_matching_close(text, open_pos, open_char, close_char):
    """Find matching bracket, properly handling strings and template literals."""
    depth = 1
    i = open_pos + 1
    state = 'code'

    while i < len(text) and depth > 0:
        ch = text[i]
        num_bs = 0
        j = i - 1
        while j >= 0 and text[j] == '\\':
            num_bs += 1
            j -= 1
        escaped = (num_bs % 2 == 1)

        if state == 'code':
            if ch == "'" and not escaped:
                state = 'single'
            elif ch == '"' and not escaped:
                state = 'double'
            elif ch == '`' and not escaped:
                state = 'template'
            elif ch == open_char:
                depth += 1
            elif ch == close_char:
                depth -= 1
                if depth == 0:
                    return i
        elif state == 'single':
            if ch == "'" and not escaped:
                state = 'code'
        elif state == 'double':
            if ch == '"' and not escaped:
                state = 'code'
        elif state == 'template':
            if ch == '`' and not escaped:
                state = 'code'
        i += 1
    return -1


def main():
    print("=" * 60)
    print("Phase D — Categories Cleanup")
    print("=" * 60)

    if not os.path.exists(BLOG_POSTS_FILE):
        print(f"ERROR: {BLOG_POSTS_FILE} not found!")
        sys.exit(1)

    with open(BLOG_POSTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # ---- Step 1: Find the categories array ----
    print("\n1. Finding categories array...")

    cat_match = re.search(r'export\s+const\s+categories\s*=\s*\[', content)
    if not cat_match:
        print("   ERROR: Could not find 'export const categories' array!")
        sys.exit(1)

    cat_open = cat_match.end() - 1  # position of [
    cat_close = find_matching_close(content, cat_open, '[', ']')

    if cat_close == -1:
        print("   ERROR: Could not find matching ] for categories!")
        sys.exit(1)

    cat_inner = content[cat_open + 1:cat_close]
    print(f"   Found categories array: {len(cat_inner)} chars")

    # Check if there are slug: entries inside (= contamination)
    slug_matches = re.findall(r'slug:\s*["\']([^"\']+)["\']', cat_inner)
    if slug_matches:
        print(
            f"   CONTAMINATION FOUND — {len(slug_matches)} blog post objects in categories:")
        for s in slug_matches:
            print(f"     - {s}")
    else:
        print("   No contamination found in categories array.")

    # ---- Step 2: Extract only valid category objects ----
    print("\n2. Rebuilding clean categories array...")

    # Extract individual { ... } blocks from categories
    blocks = []
    i = 0
    while i < len(cat_inner):
        if cat_inner[i] == '{':
            close = find_matching_close(cat_inner, i, '{', '}')
            if close == -1:
                print(f"   ERROR: Unmatched brace at position {i}")
                break
            block = cat_inner[i:close + 1]
            blocks.append(block)
            i = close + 1
        else:
            i += 1

    print(f"   Found {len(blocks)} objects in categories array")

    # Keep only category objects (have 'id' and 'label', no 'slug')
    clean_cats = []
    removed = []
    for block in blocks:
        has_slug = re.search(r'\bslug\s*:', block)
        has_id = re.search(r'\bid\s*:', block)
        has_label = re.search(r'\blabel\s*:', block)

        if has_slug:
            slug_val = re.search(r'slug:\s*["\']([^"\']+)["\']', block)
            removed.append(slug_val.group(1) if slug_val else "unknown")
        elif has_id and has_label:
            clean_cats.append(block)
        else:
            # Unknown structure — keep it to be safe
            clean_cats.append(block)

    print(f"   Keeping {len(clean_cats)} valid categories")
    if removed:
        print(
            f"   Removing {len(removed)} blog post objects: {', '.join(removed)}")

    # ---- Step 3: Rebuild categories array ----
    if removed:
        new_cat_inner = "\n" + \
            ",\n".join(f"  {block.strip()}" for block in clean_cats) + ",\n"
        new_content = content[:cat_open + 1] + \
            new_cat_inner + content[cat_close:]
        print("   Categories array rebuilt.")
    else:
        new_content = content
        print("   No changes needed to categories.")

    # ---- Step 4: Verify entire file ----
    print("\n3. Full file verification...")

    # Count slugs in blogPosts only (not in whole file)
    bp_match = re.search(
        r'export\s+const\s+blogPosts\b[^=]*=\s*\[', new_content)
    if bp_match:
        bp_open = bp_match.end() - 1
        bp_close = find_matching_close(new_content, bp_open, '[', ']')
        if bp_close != -1:
            bp_inner = new_content[bp_open + 1:bp_close]
            bp_slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', bp_inner)
            print(f"   blogPosts array: {len(bp_slugs)} posts")
            for i, s in enumerate(bp_slugs, 1):
                print(f"     {i}. {s}")

            # Check for duplicates within blogPosts
            dupes = [s for s in set(bp_slugs) if bp_slugs.count(s) > 1]
            if dupes:
                print(f"   DUPLICATES in blogPosts: {dupes}")
            else:
                print(f"   No duplicates in blogPosts.")

    # Check categories
    new_cat_match = re.search(
        r'export\s+const\s+categories\s*=\s*\[', new_content)
    if new_cat_match:
        new_cat_open = new_cat_match.end() - 1
        new_cat_close = find_matching_close(
            new_content, new_cat_open, '[', ']')
        if new_cat_close != -1:
            new_cat_section = new_content[new_cat_open + 1:new_cat_close]
            cat_slugs = re.findall(
                r'slug:\s*["\']([^"\']+)["\']', new_cat_section)
            cat_ids = re.findall(r'id:\s*["\']([^"\']+)["\']', new_cat_section)
            print(
                f"   categories array: {len(cat_ids)} categories, {len(cat_slugs)} stray slugs")
            if cat_slugs:
                print(f"   WARNING: Still has slug entries: {cat_slugs}")
            else:
                print(f"   Categories clean.")

    # Check exports
    has_type = "BlogPost" in new_content[:new_content.find(
        "export const blogPosts")]
    has_cats = "export const categories" in new_content
    has_func = "export function getBlogPostBySlug" in new_content
    print(f"   BlogPost type: {'OK' if has_type else 'MISSING!'}")
    print(f"   categories export: {'OK' if has_cats else 'MISSING!'}")
    print(f"   getBlogPostBySlug: {'OK' if has_func else 'MISSING!'}")

    # ---- Step 5: Write file ----
    if removed:
        # Backup current state
        backup_path = BLOG_POSTS_FILE + ".backup_pre_cleanup"
        with open(backup_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"\n4. Backup saved: {backup_path}")

        with open(BLOG_POSTS_FILE, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"   Written: {BLOG_POSTS_FILE}")
    else:
        print(f"\n4. No file changes needed.")

    # ---- Step 6: Update sitemap ----
    print(f"\n5. Checking sitemap ({SITEMAP_FILE})...")
    if os.path.exists(SITEMAP_FILE):
        with open(SITEMAP_FILE, "r", encoding="utf-8") as f:
            sitemap = f.read()

        all_blog_slugs = [
            "sunflower-oil-wholesale-guide",
            "sunflower-oil-prices-europe-2026",
            "how-we-created-star-food-labels",
            "fob-cif-dap-explained",
            "refined-vs-crude-sunflower-oil",
            "high-oleic-sunflower-oil-horeca",
            "how-food-trading-works-europe",
            "food-trading-bulgaria-eu-advantage",
            "best-frying-oil-restaurants",
            "wholesale-beet-sugar-europe",
            "sunflower-oil-packaging-guide",
            "how-to-choose-food-supplier",
        ]

        missing_from_sitemap = [s for s in all_blog_slugs if s not in sitemap]

        if missing_from_sitemap:
            print(
                f"   Missing from sitemap: {len(missing_from_sitemap)} slugs")

            # Find where to insert — look for the return [ ... ] in sitemap
            # Try to find the last entry before the closing ];
            # Look for patterns in the sitemap

            # Strategy: find "return [" and the content, then insert before the last ];
            return_match = re.search(r'return\s*\[', sitemap)
            if return_match:
                # Find the closing ] of the return array
                ret_open = return_match.end() - 1
                ret_close = find_matching_close(sitemap, ret_open, '[', ']')

                if ret_close != -1:
                    # Check format — look for existing entries
                    ret_inner = sitemap[ret_open + 1:ret_close]

                    # Determine format
                    if "localizedEntry" in ret_inner:
                        fmt = "localizedEntry"
                    elif "url:" in ret_inner:
                        fmt = "object"
                    else:
                        fmt = "unknown"

                    print(f"   Sitemap format detected: {fmt}")

                    # Build new entries
                    new_entries = ""
                    dates = {
                        "sunflower-oil-wholesale-guide": "2026-02-20",
                        "sunflower-oil-prices-europe-2026": "2026-02-20",
                        "how-we-created-star-food-labels": "2026-02-20",
                        "fob-cif-dap-explained": "2026-02-20",
                        "refined-vs-crude-sunflower-oil": "2026-03-05",
                        "high-oleic-sunflower-oil-horeca": "2026-03-08",
                        "how-food-trading-works-europe": "2026-03-12",
                        "food-trading-bulgaria-eu-advantage": "2026-03-15",
                        "best-frying-oil-restaurants": "2026-03-05",
                        "wholesale-beet-sugar-europe": "2026-03-08",
                        "sunflower-oil-packaging-guide": "2026-03-05",
                        "how-to-choose-food-supplier": "2026-03-10",
                    }

                    for slug in missing_from_sitemap:
                        date = dates.get(slug, "2026-03-01")
                        if fmt == "localizedEntry":
                            new_entries += f'    localizedEntry("/blog/{slug}", "monthly", 0.6, new Date("{date}")),\n'
                        else:
                            new_entries += f'    // Blog: /blog/{slug}\n'

                    if new_entries:
                        # Insert before the closing ]
                        insert_pos = ret_close
                        # Go back past whitespace
                        while insert_pos > 0 and sitemap[insert_pos - 1] in ' \t\n':
                            insert_pos -= 1
                        # Make sure we're after the last comma or entry
                        # Add a newline after the last entry
                        if sitemap[insert_pos - 1] not in [',', '\n']:
                            new_entries = ",\n" + new_entries
                        else:
                            new_entries = "\n" + new_entries

                        new_sitemap = sitemap[:insert_pos] + \
                            new_entries + "\n  " + sitemap[ret_close:]

                        with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
                            f.write(new_sitemap)
                        print(
                            f"   Added {len(missing_from_sitemap)} entries to sitemap.")
                    else:
                        print(f"   No entries to add.")
                else:
                    print(f"   Could not find closing ] of return array.")
                    print(f"   Add these manually to sitemap.ts:")
                    for s in missing_from_sitemap:
                        print(f"     /blog/{s}")
            else:
                print(f"   Could not find 'return [' in sitemap.")
                print(f"   Add these manually:")
                for s in missing_from_sitemap:
                    print(f"     /blog/{s}")
        else:
            print(f"   All 12 blog slugs present in sitemap.")
    else:
        print(f"   {SITEMAP_FILE} not found.")

    # ---- Done ----
    print(f"\n{'=' * 60}")
    print("DONE!")
    print(f"{'=' * 60}")
    print(f"\nExpected result: 0 TypeScript errors")
    print(f"  - BlogPost type: intact")
    print(f"  - categories: clean (only category objects)")
    print(f"  - getBlogPostBySlug: intact")
    print(f"  - blogPosts: 12 posts, no duplicates")
    print(f"\nTest:")
    print(f"  1. pnpm dev")
    print(f"  2. http://localhost:3000/en/blog")
    print(f"  3. Check category filter tabs work")
    print(f"  4. Open /en/blog/refined-vs-crude-sunflower-oil")


if __name__ == "__main__":
    main()
