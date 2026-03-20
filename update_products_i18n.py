#!/usr/bin/env python3
"""
Обновляет секцию products.items во всех языковых файлах.
Запуск: python3 update_products_i18n.py
Из папки: корень проекта star-food
"""

import json
import os

# Путь к папке с переводами
I18N_DIR = "src/i18n"

# Новые переводы для каждого языка
TRANSLATIONS = {
    "en": {
        "sunflower-oil": {
            "name": "Sunflower Oil",
            "description": "Unrefined and RBDW sunflower oil. PET bottles 0.5–10L, plastic canisters 10–20L, and bulk tanker."
        },
        "high-oleic": {
            "name": "High-Oleic Sunflower Oil",
            "description": "RBDW high-oleic sunflower oil. PET bottles 5–10L, plastic canisters 10–20L, and bulk tanker."
        },
        "rapeseed-oil": {
            "name": "Rapeseed Oil (Canola)",
            "description": "Refined and deodorized rapeseed oil. PET bottles 5–10L, 20L canister, and bulk tanker."
        },
        "soybean-oil": {
            "name": "Soybean Oil",
            "description": "Refined and deodorized soybean oil. PET bottles 5–10L, 20L canister, and bulk tanker."
        },
        "frying-oil": {
            "name": "Deep-Frying Oil",
            "description": "High-stability deep-frying oils for HoReCa and industrial use. Sunflower, high-oleic, rapeseed, and soybean varieties."
        },
        "mayonnaise": {
            "name": "Mayonnaise & Ketchup",
            "description": "Mayonnaise 30% and 67% fat. Ketchup Lagidny. Plastic buckets 1.8–10kg for food service."
        },
        "dairy": {
            "name": "Milk UHT",
            "description": "UHT long-life milk in Tetra Pak 1L. Shelf-stable, suitable for B2B wholesale across Europe."
        },
        "sugar": {
            "name": "Beet Sugar",
            "description": "Premium white beet sugar. Available in 25kg, 50kg bags and big bags."
        }
    },
    "bg": {
        "sunflower-oil": {
            "name": "Слънчогледово масло",
            "description": "Нерафинирано и RBDW слънчогледово масло. PET бутилки 0,5–10L, пластмасови канистри 10–20L и насипен танкер."
        },
        "high-oleic": {
            "name": "Високоолеиново слънчогледово масло",
            "description": "RBDW високоолеиново слънчогледово масло. PET бутилки 5–10L, пластмасови канистри 10–20L и насипен танкер."
        },
        "rapeseed-oil": {
            "name": "Рапично масло (Канола)",
            "description": "Рафинирано и дезодорирано рапично масло. PET бутилки 5–10L, канистра 20L и насипен танкер."
        },
        "soybean-oil": {
            "name": "Соево масло",
            "description": "Рафинирано и дезодорирано соево масло. PET бутилки 5–10L, канистра 20L и насипен танкер."
        },
        "frying-oil": {
            "name": "Масло за пържене",
            "description": "Високостабилни масла за пържене за HoReCa и промишлена употреба. Слънчогледово, високоолеиново, рапично и соево."
        },
        "mayonnaise": {
            "name": "Майонеза и кетчуп",
            "description": "Майонезен сос 30% и 67% мазнини. Кетчуп Лагидни. Пластмасови кофи 1,8–10 кг за хранително-вкусовата промишленост."
        },
        "dairy": {
            "name": "UHT мляко",
            "description": "UHT дълготрайно мляко в Tetra Pak 1L. Стабилно при съхранение, подходящо за B2B търговия в Европа."
        },
        "sugar": {
            "name": "Цвеклова захар",
            "description": "Висококачествена бяла цвеклова захар. Налична в чували 25 кг, 50 кг и биг-багове."
        }
    },
    "tr": {
        "sunflower-oil": {
            "name": "Ayçiçek Yağı",
            "description": "Rafine edilmemiş ve RBDW ayçiçek yağı. PET şişeler 0,5–10L, plastik bidonlar 10–20L ve dökme tanker."
        },
        "high-oleic": {
            "name": "Yüksek Oleik Ayçiçek Yağı",
            "description": "RBDW yüksek oleik ayçiçek yağı. PET şişeler 5–10L, plastik bidonlar 10–20L ve dökme tanker."
        },
        "rapeseed-oil": {
            "name": "Kolza Yağı (Kanola)",
            "description": "Rafine edilmiş ve koku giderimi yapılmış kolza yağı. PET şişeler 5–10L, 20L bidon ve dökme tanker."
        },
        "soybean-oil": {
            "name": "Soya Yağı",
            "description": "Rafine edilmiş ve koku giderimi yapılmış soya yağı. PET şişeler 5–10L, 20L bidon ve dökme tanker."
        },
        "frying-oil": {
            "name": "Kızartma Yağı",
            "description": "HoReCa ve endüstriyel kullanım için yüksek kararlılıklı kızartma yağları. Ayçiçek, yüksek oleik, kolza ve soya çeşitleri."
        },
        "mayonnaise": {
            "name": "Mayonez ve Ketçap",
            "description": "Mayonez sosu %30 ve %67 yağ. Lagidny ketçap. Gıda hizmetleri için 1,8–10 kg plastik kovalar."
        },
        "dairy": {
            "name": "UHT Süt",
            "description": "Tetra Pak 1L'de UHT uzun ömürlü süt. Raf kararlı, Avrupa genelinde B2B toptan satışa uygun."
        },
        "sugar": {
            "name": "Pancar Şekeri",
            "description": "Premium beyaz pancar şekeri. 25 kg, 50 kg çuval ve büyük çuvallarda mevcuttur."
        }
    },
    "ro": {
        "sunflower-oil": {
            "name": "Ulei de Floarea-Soarelui",
            "description": "Ulei de floarea-soarelui nerafinat și RBDW. Sticle PET 0,5–10L, bidoane plastice 10–20L și cisternă vrac."
        },
        "high-oleic": {
            "name": "Ulei de Floarea-Soarelui High-Oleic",
            "description": "Ulei de floarea-soarelui RBDW high-oleic. Sticle PET 5–10L, bidoane plastice 10–20L și cisternă vrac."
        },
        "rapeseed-oil": {
            "name": "Ulei de Rapiță (Canola)",
            "description": "Ulei de rapiță rafinat și dezodorizat. Sticle PET 5–10L, bidon 20L și cisternă vrac."
        },
        "soybean-oil": {
            "name": "Ulei de Soia",
            "description": "Ulei de soia rafinat și dezodorizat. Sticle PET 5–10L, bidon 20L și cisternă vrac."
        },
        "frying-oil": {
            "name": "Ulei de Prăjit",
            "description": "Uleiuri de prăjit cu stabilitate ridicată pentru HoReCa și uz industrial. Varietăți de floarea-soarelui, high-oleic, rapiță și soia."
        },
        "mayonnaise": {
            "name": "Maioneză și Ketchup",
            "description": "Sos de maioneză 30% și 67% grăsime. Ketchup Lagidny. Găleți din plastic 1,8–10 kg pentru servicii alimentare."
        },
        "dairy": {
            "name": "Lapte UHT",
            "description": "Lapte UHT de lungă durată în Tetra Pak 1L. Stabil la raft, potrivit pentru vânzări en-gros B2B în Europa."
        },
        "sugar": {
            "name": "Zahăr din Sfeclă",
            "description": "Zahăr alb premium din sfeclă. Disponibil în saci de 25 kg, 50 kg și big bags."
        }
    },
    "de": {
        "sunflower-oil": {
            "name": "Sonnenblumenöl",
            "description": "Unraffiniertes und RBDW Sonnenblumenöl. PET-Flaschen 0,5–10L, Plastikkanister 10–20L und Tankwagen."
        },
        "high-oleic": {
            "name": "High-Oleic Sonnenblumenöl",
            "description": "RBDW High-Oleic Sonnenblumenöl. PET-Flaschen 5–10L, Plastikkanister 10–20L und Tankwagen."
        },
        "rapeseed-oil": {
            "name": "Rapsöl (Canola)",
            "description": "Raffiniertes und desodoriertes Rapsöl. PET-Flaschen 5–10L, 20L Kanister und Tankwagen."
        },
        "soybean-oil": {
            "name": "Sojaöl",
            "description": "Raffiniertes und desodoriertes Sojaöl. PET-Flaschen 5–10L, 20L Kanister und Tankwagen."
        },
        "frying-oil": {
            "name": "Frittieröl",
            "description": "Hochstabiles Frittieröl für HoReCa und industriellen Einsatz. Sonnenblumen-, High-Oleic-, Raps- und Sojavarianten."
        },
        "mayonnaise": {
            "name": "Mayonnaise & Ketchup",
            "description": "Mayonnaise-Sauce 30% und 67% Fett. Ketchup Lagidny. Kunststoffeimer 1,8–10 kg für die Gastronomie."
        },
        "dairy": {
            "name": "UHT-Milch",
            "description": "UHT-Haltbarmilch in Tetra Pak 1L. Lagerstabil, geeignet für den B2B-Großhandel in ganz Europa."
        },
        "sugar": {
            "name": "Rübenzucker",
            "description": "Premium weißer Rübenzucker. Erhältlich in 25-kg-, 50-kg-Säcken und Big Bags."
        }
    },
    "ua": {
        "sunflower-oil": {
            "name": "Соняшникова олія",
            "description": "Нерафінована та RBDW соняшникова олія. PET пляшки 0,5–10L, пластикові каністри 10–20L та наливний танкер."
        },
        "high-oleic": {
            "name": "Високоолеїнова соняшникова олія",
            "description": "RBDW високоолеїнова соняшникова олія. PET пляшки 5–10L, пластикові каністри 10–20L та наливний танкер."
        },
        "rapeseed-oil": {
            "name": "Ріпакова олія (Канола)",
            "description": "Рафінована та дезодорована ріпакова олія. PET пляшки 5–10L, каністра 20L та наливний танкер."
        },
        "soybean-oil": {
            "name": "Соєва олія",
            "description": "Рафінована та дезодорована соєва олія. PET пляшки 5–10L, каністра 20L та наливний танкер."
        },
        "frying-oil": {
            "name": "Олія для смаження",
            "description": "Високостабільна олія для смаження для HoReCa та промислового використання. Соняшникова, високоолеїнова, ріпакова та соєва."
        },
        "mayonnaise": {
            "name": "Майонез і кетчуп",
            "description": "Майонезний соус 30% та 67% жирності. Кетчуп Лагідний. Пластикові відра 1,8–10 кг для громадського харчування."
        },
        "dairy": {
            "name": "Молоко UHT",
            "description": "UHT довготривале молоко в Tetra Pak 1L. Зберігається без холодильника, підходить для B2B оптових продажів по всій Європі."
        },
        "sugar": {
            "name": "Буряковий цукор",
            "description": "Преміальний білий буряковий цукор. Доступний у мішках 25 кг, 50 кг та біг-бегах."
        }
    }
}


def update_file(lang):
    filepath = os.path.join(I18N_DIR, f"{lang}.json")
    if not os.path.exists(filepath):
        print(f"  ⚠️  Файл не найден: {filepath}")
        return

    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Обновляем только products.items
    if "products" not in data:
        data["products"] = {}
    if "items" not in data["products"]:
        data["products"]["items"] = {}

    data["products"]["items"] = TRANSLATIONS[lang]

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(
        f"  ✅  {lang}.json — обновлено ({len(TRANSLATIONS[lang])} продуктов)")


if __name__ == "__main__":
    print("\n🔄 Обновление products.items во всех языках...\n")
    for lang in ["en", "bg", "tr", "ro", "de", "ua"]:
        update_file(lang)
    print("\n✅ Готово! Все файлы обновлены.\n")
    print("Следующий шаг: замени src/data/products.ts и сделай git push.\n")
