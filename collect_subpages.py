import os

output = "subpages.txt"
# Files inside [locale] directory
targets = [
    "src/app/[locale]/page.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/products/page.tsx",
    "src/app/[locale]/contacts/page.tsx",
    "src/app/[locale]/blog/page.tsx",
    "src/app/[locale]/not-found.tsx",
    "src/app/[locale]/layout.tsx",
    "src/app/layout.tsx",
    "src/context/LanguageContext.tsx",
    "src/components/LanguageSwitcher/LanguageSwitcher.tsx",
    "src/components/Header/Header.tsx",
    "src/components/WhatsAppButton/WhatsAppButton.tsx",
]

with open(output, "w", encoding="utf-8") as out:
    for f in targets:
        if os.path.exists(f):
            out.write(f"{'='*60}\n")
            out.write(f"FILE: {f}\n")
            out.write(f"{'='*60}\n")
            with open(f, "r", encoding="utf-8") as infile:
                out.write(infile.read())
            out.write("\n\n")
        else:
            out.write(f"{'='*60}\n")
            out.write(f"MISSING: {f}\n")
            out.write(f"{'='*60}\n\n")

print(f"Done! Upload {output}")
