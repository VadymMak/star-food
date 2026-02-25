#!/usr/bin/env python3
"""
Add ogImage to frontmatter in all blog .md files.
Run from star-food/ root: python3 scripts/add-og-to-frontmatter.py
"""

import os
import re

CONTENT_DIR = "src/content/blog"

# Map slug → ogImage path
OG_MAP = {
    "sunflower-oil-wholesale-guide": "/images/blog/sunflower-oil-wholesale-guide/og.jpg",
    "sunflower-oil-prices-europe-2026": "/images/blog/sunflower-oil-prices-europe-2026/og.jpg",
    "how-we-created-star-food-labels": "/images/blog/how-we-created-star-food-labels/og.jpg",
    "fob-cif-dap-explained": "/images/blog/fob-cif-dap-explained/og.jpg",
    "refined-vs-crude-sunflower-oil": "/images/blog/refined-vs-crude-sunflower-oil/og.jpg",
    "high-oleic-sunflower-oil-horeca": "/images/blog/high-oleic-sunflower-oil-horeca/og.jpg",
    "how-food-trading-works-europe": "/images/blog/how-food-trading-works-europe/og.jpg",
    "food-trading-bulgaria-eu-advantage": "/images/blog/food-trading-bulgaria-eu-advantage/og.jpg",
    "best-frying-oil-restaurants": "/images/blog/best-frying-oil-restaurants/og.jpg",
    "wholesale-beet-sugar-europe": "/images/blog/wholesale-beet-sugar-europe/og.jpg",
    "sunflower-oil-packaging-guide": "/images/blog/sunflower-oil-packaging-guide/og.jpg",
    "how-to-choose-food-supplier": "/images/blog/how-to-choose-food-supplier/og.jpg",
}

updated = 0
for slug, og_path in OG_MAP.items():
    post_dir = os.path.join(CONTENT_DIR, slug)
    if not os.path.isdir(post_dir):
        print(f"  SKIP: {slug} (directory not found)")
        continue

    for fname in os.listdir(post_dir):
        if not fname.endswith(".md"):
            continue

        fpath = os.path.join(post_dir, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        # Skip if ogImage already present
        if "ogImage:" in content:
            continue

        # Insert ogImage before the closing ---
        # Find the second --- (end of frontmatter)
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = parts[2]
            # Add ogImage at end of frontmatter
            frontmatter = frontmatter.rstrip() + f'\nogImage: "{og_path}"\n'
            content = "---" + frontmatter + "---" + body

            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            updated += 1

    print(f"  ✅ {slug}")

print(f"\nDone! Updated {updated} files.")
