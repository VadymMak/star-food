#!/usr/bin/env python3
"""
Generate OG images (1200x630) for all blog posts.
Uses dark+gold theme matching the UB Market site design.

Requirements: pip3 install Pillow
Run from star-food/ root: python3 scripts/generate-og-images.py
"""

import os
import textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ============================================================
# CONFIG
# ============================================================

OUTPUT_DIR = "public/images/blog"
IMAGES_DIR = "public/images"

WIDTH = 1200
HEIGHT = 630

# Colors (matching site theme)
DARK_BG = (10, 10, 10)           # #0a0a0a
GOLD = (212, 168, 67)            # #d4a843
GOLD_DARK = (184, 146, 46)      # #b8922e
WHITE = (255, 255, 255)
TEXT_MUTED = (180, 180, 180)
OVERLAY_COLOR = (10, 10, 10, 180)  # Dark overlay for readability

# Post data: slug → (title, category, background_image)
POSTS = [
    {
        "slug": "sunflower-oil-wholesale-guide",
        "title": "Complete Guide to Buying\nSunflower Oil Wholesale",
        "category": "SUNFLOWER OIL",
        "bg": "vegetable-oil.webp",
    },
    {
        "slug": "sunflower-oil-prices-europe-2026",
        "title": "Sunflower Oil Prices\nEurope 2026",
        "category": "SUNFLOWER OIL",
        "bg": "vegetable-oil.webp",
    },
    {
        "slug": "how-we-created-star-food-labels",
        "title": "How We Created the\nStar Food Label Design",
        "category": "BRAND",
        "bg": "star-food-logo.webp",
    },
    {
        "slug": "fob-cif-dap-explained",
        "title": "FOB, CIF, DAP Explained\nfor Food Buyers",
        "category": "TRADING",
        "bg": "our-location.webp",
    },
    {
        "slug": "refined-vs-crude-sunflower-oil",
        "title": "Refined vs Crude\nSunflower Oil",
        "category": "SUNFLOWER OIL",
        "bg": "vegetable-oil.webp",
    },
    {
        "slug": "high-oleic-sunflower-oil-horeca",
        "title": "High-Oleic Sunflower Oil\nfor HORECA",
        "category": "SUNFLOWER OIL",
        "bg": "frying-oil.webp",
    },
    {
        "slug": "how-food-trading-works-europe",
        "title": "How Food Trading Works\nin Europe",
        "category": "TRADING",
        "bg": "our-location.webp",
    },
    {
        "slug": "food-trading-bulgaria-eu-advantage",
        "title": "Food Trading from Bulgaria\n5 EU Gateway Advantages",
        "category": "TRADING",
        "bg": "about-us.webp",
    },
    {
        "slug": "best-frying-oil-restaurants",
        "title": "Best Frying Oil\nfor Restaurants",
        "category": "PRODUCTS",
        "bg": "frying-oil.webp",
    },
    {
        "slug": "wholesale-beet-sugar-europe",
        "title": "Wholesale Beet Sugar\nin Europe",
        "category": "PRODUCTS",
        "bg": "sugar.webp",
    },
    {
        "slug": "sunflower-oil-packaging-guide",
        "title": "Sunflower Oil\nPackaging Guide",
        "category": "SUNFLOWER OIL",
        "bg": "vegetable-oil.webp",
    },
    {
        "slug": "how-to-choose-food-supplier",
        "title": "How to Choose\na Food Supplier",
        "category": "TRADING",
        "bg": "our-products.webp",
    },
]


def get_font(size, bold=False):
    """Try to load a good font, fall back to default."""
    # Common system font paths
    font_paths = [
        # macOS
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/SFNSDisplay.ttf",
        # Linux
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        # Generic
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]

    if bold:
        bold_paths = [
            "/System/Library/Fonts/Helvetica.ttc",
            "/Library/Fonts/Arial Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        ]
        font_paths = bold_paths + font_paths

    for fp in font_paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except Exception:
                continue

    # Fallback to default
    try:
        return ImageFont.truetype("Arial", size)
    except Exception:
        return ImageFont.load_default()


def create_og_image(post_data):
    """Generate a single OG image for a blog post."""
    slug = post_data["slug"]
    title = post_data["title"]
    category = post_data["category"]
    bg_filename = post_data["bg"]

    # Create base image
    img = Image.new("RGB", (WIDTH, HEIGHT), DARK_BG)

    # Try to load and add background image
    bg_path = os.path.join(IMAGES_DIR, bg_filename)
    if os.path.exists(bg_path):
        try:
            bg = Image.open(bg_path).convert("RGB")
            # Resize to cover
            bg_ratio = max(WIDTH / bg.width, HEIGHT / bg.height)
            new_size = (int(bg.width * bg_ratio), int(bg.height * bg_ratio))
            bg = bg.resize(new_size, Image.LANCZOS)
            # Center crop
            left = (bg.width - WIDTH) // 2
            top = (bg.height - HEIGHT) // 2
            bg = bg.crop((left, top, left + WIDTH, top + HEIGHT))
            # Apply blur for readability
            bg = bg.filter(ImageFilter.GaussianBlur(radius=3))
            img.paste(bg, (0, 0))
        except Exception as e:
            print(f"    Warning: Could not load bg {bg_filename}: {e}")

    # Dark overlay for text readability
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), OVERLAY_COLOR)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

    draw = ImageDraw.Draw(img)

    # Gold accent bar at top
    draw.rectangle([(0, 0), (WIDTH, 6)], fill=GOLD)

    # Gold vertical accent line on left
    draw.rectangle([(60, 160), (64, 460)], fill=GOLD)

    # Category badge
    cat_font = get_font(18, bold=True)
    cat_bbox = draw.textbbox((0, 0), category, font=cat_font)
    cat_w = cat_bbox[2] - cat_bbox[0]
    cat_h = cat_bbox[3] - cat_bbox[1]
    cat_x = 90
    cat_y = 170
    # Badge background
    padding = 8
    draw.rounded_rectangle(
        [(cat_x - padding, cat_y - padding),
         (cat_x + cat_w + padding, cat_y + cat_h + padding)],
        radius=4,
        fill=GOLD_DARK,
    )
    draw.text((cat_x, cat_y), category, fill=DARK_BG, font=cat_font)

    # Title
    title_font = get_font(52, bold=True)
    title_y = cat_y + cat_h + 40
    title_lines = title.split("\n")

    for line in title_lines:
        draw.text((90, title_y), line, fill=WHITE, font=title_font)
        line_bbox = draw.textbbox((0, 0), line, font=title_font)
        title_y += (line_bbox[3] - line_bbox[1]) + 12

    # Bottom section: UB Market branding
    brand_font = get_font(22, bold=True)
    url_font = get_font(18)

    # Brand name
    draw.text((90, HEIGHT - 90), "UB MARKET", fill=GOLD, font=brand_font)

    # URL
    draw.text((90, HEIGHT - 58), "ub-market.com",
              fill=TEXT_MUTED, font=url_font)

    # Bottom gold line
    draw.rectangle([(0, HEIGHT - 4), (WIDTH, HEIGHT)], fill=GOLD)

    # Divider line above brand
    draw.rectangle([(90, HEIGHT - 110), (400, HEIGHT - 108)], fill=(*GOLD, 80))

    # Save
    slug_dir = os.path.join(OUTPUT_DIR, slug)
    os.makedirs(slug_dir, exist_ok=True)

    out_path = os.path.join(slug_dir, "og.jpg")
    img.save(out_path, "JPEG", quality=85, optimize=True)

    file_size = os.path.getsize(out_path)
    return out_path, file_size


def main():
    print("=" * 60)
    print("OG Image Generator — UB Market Blog")
    print("=" * 60)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    total_size = 0
    for post in POSTS:
        out_path, size = create_og_image(post)
        size_kb = size / 1024
        total_size += size
        print(f"  ✅ {post['slug']}/og.jpg ({size_kb:.0f} KB)")

    print(f"\n{'=' * 60}")
    print(f"Done! {len(POSTS)} OG images generated")
    print(f"Total size: {total_size / 1024:.0f} KB")
    print(f"Location: {OUTPUT_DIR}/")
    print(f"\nNext steps:")
    print(f"  1. Update frontmatter in .md files to reference OG images")
    print(f"  2. Wire ogImage into blog post metadata")


main()
