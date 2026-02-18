"""
RUN FROM star-food ROOT:
  python fix_toc.py

Adds "contents" key to blogPost in all 6 i18n files
"""

import json
import os

translations = {
    "en": "Contents",
    "bg": "Съдържание",
    "ua": "Зміст",
    "tr": "İçindekiler",
    "ro": "Cuprins",
    "de": "Inhalt",
}

for lang, word in translations.items():
    path = f"src/i18n/{lang}.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if "blogPost" not in data:
            data["blogPost"] = {}
        data["blogPost"]["contents"] = word
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ {lang}.json — added contents: {word}")

print("\nDone!")
