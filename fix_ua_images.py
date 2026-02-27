#!/usr/bin/env python3
"""
Fix Ukrainian blog posts: copy image and other frontmatter fields from en.md
"""
import os
import re
import glob

BLOG_DIR = "src/content/blog"


def parse_frontmatter(content):
    """Extract frontmatter as dict and body text"""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
    if not match:
        return {}, content

    fm_text = match.group(1)
    body = match.group(2)

    fm = {}
    for line in fm_text.split('\n'):
        if ':' in line:
            key = line.split(':', 1)[0].strip()
            value = line.split(':', 1)[1].strip()
            fm[key] = value

    return fm, body


def rebuild_frontmatter(ua_fm, en_fm, ua_body):
    """Rebuild ua.md with image/ogImage/readingTime/category/date from en.md, keep ua title/description/tags"""
    # Fields to copy from EN
    copy_fields = ['image', 'ogImage', 'date', 'category', 'readingTime']

    for field in copy_fields:
        if field in en_fm:
            ua_fm[field] = en_fm[field]
        elif field in ua_fm and field not in en_fm:
            del ua_fm[field]  # remove if EN doesn't have it

    # Rebuild frontmatter string
    lines = ['---']
    # Ordered output
    order = ['title', 'date', 'description', 'category',
             'image', 'ogImage', 'readingTime', 'tags']

    written = set()
    for key in order:
        if key in ua_fm:
            lines.append(f'{key}: {ua_fm[key]}')
            written.add(key)

    # Any remaining keys
    for key, value in ua_fm.items():
        if key not in written:
            lines.append(f'{key}: {value}')

    lines.append('---')
    lines.append('')

    return '\n'.join(lines) + ua_body


def main():
    posts = sorted(glob.glob(os.path.join(BLOG_DIR, '*')))

    fixed = 0
    for post_dir in posts:
        if not os.path.isdir(post_dir):
            continue

        en_path = os.path.join(post_dir, 'en.md')
        ua_path = os.path.join(post_dir, 'ua.md')

        if not os.path.exists(en_path) or not os.path.exists(ua_path):
            continue

        slug = os.path.basename(post_dir)

        with open(en_path, 'r', encoding='utf-8') as f:
            en_content = f.read()
        with open(ua_path, 'r', encoding='utf-8') as f:
            ua_content = f.read()

        en_fm, _ = parse_frontmatter(en_content)
        ua_fm, ua_body = parse_frontmatter(ua_content)

        # Show what we're fixing
        en_img = en_fm.get('image', 'NONE')
        ua_img = ua_fm.get('image', 'NONE')

        if en_img != ua_img:
            print(f"📝 {slug}")
            print(f"   EN image: {en_img}")
            print(f"   UA image: {ua_img} → {en_img}")
        else:
            print(f"✅ {slug} — image OK")

        # Rebuild and write
        new_content = rebuild_frontmatter(ua_fm, en_fm, ua_body)

        with open(ua_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        fixed += 1

    print(f"\n✅ Fixed {fixed} Ukrainian blog posts")

    # Verify
    print("\n--- Verification ---")
    for post_dir in sorted(glob.glob(os.path.join(BLOG_DIR, '*'))):
        if not os.path.isdir(post_dir):
            continue
        en_path = os.path.join(post_dir, 'en.md')
        ua_path = os.path.join(post_dir, 'ua.md')
        if not os.path.exists(en_path) or not os.path.exists(ua_path):
            continue

        slug = os.path.basename(post_dir)
        with open(en_path, 'r') as f:
            en_fm, _ = parse_frontmatter(f.read())
        with open(ua_path, 'r') as f:
            ua_fm, _ = parse_frontmatter(f.read())

        en_img = en_fm.get('image', 'NONE')
        ua_img = ua_fm.get('image', 'NONE')
        match = "✅" if en_img == ua_img else "❌"
        print(f"{match} {slug}: {ua_img}")


if __name__ == '__main__':
    main()
