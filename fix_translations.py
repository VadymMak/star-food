"""
RUN FROM star-food PROJECT ROOT:
  python fix_translations.py

Writes:
  src/i18n/tr.json (complete Turkish)
  src/i18n/ro.json (complete Romanian)
  src/i18n/de.json (complete German)
  src/components/Header/Header.tsx (fix: nav instead of menu)
"""

import json
import os

# ====================================================================
# TURKISH — COMPLETE
# ====================================================================
tr = {
    "nav": {
        "home": "Ana Sayfa",
        "about": "Hakkımızda",
        "products": "Ürünler",
        "blog": "Blog",
        "contacts": "İletişim"
    },
    "hero": {
        "badge": "Uluslararası Gıda Ticareti",
        "title1": "Premium",
        "titleHighlight": "Ayçiçek Yağı",
        "title2": "ve Avrupa İçin Gıda Ürünleri",
        "subtitle": "UB Market LTD, Avrupa genelinde önde gelen üreticileri toptan alıcılarla buluşturur. Güvenilir tedarik, rekabetçi fiyatlar, karayolu taşımacılığı.",
        "cta1": "Teklif İste",
        "cta2": "Ürünleri Görüntüle"
    },
    "trust": {
        "years": "Yıllık Deneyim",
        "countries": "Ülke",
        "tons": "Ton Teslim",
        "partners": "İş Ortağı"
    },
    "aboutPreview": {
        "label": "Hakkımızda",
        "title": "Gıda İhracat ve İthalatında Güvenilir Ortağınız",
        "p1": "UB MARKET LTD, gıda ürünlerinin ihracat ve ithalatında uzmanlaşmış uluslararası bir ticaret şirketidir. Avrupa genelinde önde gelen üreticileri toptan alıcılarla buluştururuz.",
        "p2": "Ana uzmanlık alanımız uluslararası ayçiçek yağı ticareti — rafine, ham ve yüksek oleik çeşitleri, şişe ve tanker olarak sunulmaktadır.",
        "features": [
            "Rafine ve Ham Yağlar",
            "Karayolu Taşımacılığı (AB)",
            "PET Şişe ve Dökme",
            "Rekabetçi Fiyatlar",
            "Kalite Sertifikalı",
            "Çok Dilli Destek"
        ],
        "cta": "Daha Fazla Bilgi"
    },
    "products": {
        "label": "Ürünlerimiz",
        "title": "Neler Tedarik Ediyoruz",
        "subtitle": "Avrupa genelindeki toptan alıcılar için güvenilir üreticilerden yüksek kaliteli gıda ürünleri tedarik ediyoruz.",
        "cta": "Tüm Ürünleri Görüntüle",
        "requestPrice": "Fiyat İste",
        "items": {
            "sunflower-oil": {
                "name": "Ayçiçek Yağı",
                "description": "Rafine, deodorize, kışa dayanıklı. PET şişeler (0,5–10L) ve dökme tankerler."
            },
            "frying-oil": {
                "name": "Kızartma Yağı",
                "description": "Profesyonel gıda hizmetleri ve endüstriyel kızartma için yüksek stabiliteli yağ."
            },
            "sugar": {
                "name": "Pancar Şekeri",
                "description": "Premium beyaz pancar şekeri. 25kg, 50kg çuvallar ve big bag olarak."
            },
            "high-oleic": {
                "name": "Yüksek Oleik Ayçiçek Yağı",
                "description": "Rafine yüksek oleik çeşidi — şişe ve dökme. Sağlık bilincine sahip pazarlar için ideal."
            },
            "dairy": {
                "name": "Süt Ürünleri",
                "description": "Sertifikalı Avrupa üreticilerinden süt, tereyağı ve süt türevleri."
            },
            "mayonnaise": {
                "name": "Mayonez ve Soslar",
                "description": "Geleneksel ve endüstriyel mayonez, soslar ve çeşni ürünleri."
            }
        }
    },
    "howWeWork": {
        "label": "Nasıl Çalışırız",
        "title": "Basit Süreç, Güvenilir Sonuçlar",
        "subtitle": "İlk temastan teslimata kadar — sorunsuz bir ticaret deneyimi için her şeyi biz yönetiyoruz.",
        "steps": [
            {
                "title": "İletişim ve Sorgu",
                "text": "Neye ihtiyacınız olduğunu bize bildirin — ürün tipi, hacim, teslimat noktası. 24 saat içinde yanıt veririz."
            },
            {
                "title": "Teklif ve Anlaşma",
                "text": "Rekabetçi fiyat sunuyoruz, gerekirse numune ayarlıyoruz ve sözleşme koşullarını belirliyoruz."
            },
            {
                "title": "Teslimat ve Destek",
                "text": "Ürünler tam belgelerle karayolu taşımacılığıyla gönderilir. Zamanında teslimat ve sürekli destek sağlıyoruz."
            }
        ]
    },
    "logistics": {
        "label": "Lojistik ve Kalite",
        "title": "B2B Ticaret İçin Tasarlandı",
        "delivery": "Teslimat Seçenekleri",
        "quality": "Kalite Standartları",
        "deliveryItems": [
            "Karayolu Taşımacılığı (AB)",
            "PET Şişeler (0,5–10L)",
            "Dökme Tankerler",
            "Paletli Kargo",
            "FOB / CIF / DAP",
            "Tüm Avrupa Teslimat"
        ],
        "qualityItems": [
            "ISO Sertifikalı Tedarikçiler",
            "HACCP Uyumlu",
            "GDO'suz Seçenek",
            "Tam Belgelendirme",
            "Laboratuvar Test Raporları",
            "AB Gıda Güvenliği Standartları"
        ]
    },
    "cta": {
        "label": "Birlikte Çalışalım",
        "title": "Kaliteli Gıda Ürünleri Tedarik Etmeye Hazır Mısınız?",
        "subtitle": "Ayçiçek yağı, şeker, süt ürünleri ve daha fazlası için rekabetçi teklif alın. 24 saat içinde yanıt veriyoruz.",
        "cta1": "Teklif İste",
        "cta2": "Bizi Arayın"
    },
    "contact": {
        "address": "Adres",
        "addressValue": "Bulgaristan, Varna 9010\nSirma Voivoda Cd., b.1, d. 21",
        "email": "E-posta",
        "phone": "Telefon",
        "hours": "Çalışma Saatleri",
        "hoursValue": "Pzt–Cum: 9:00–17:00\nCts: 10:00–14:00\nPaz: Kapalı",
        "social": "Bizi Takip Edin",
        "socialTitle": "Sosyal Medyada Bağlanın",
        "mapLabel": "Konumumuz",
        "mapTitle": "Varna, Bulgaristan'da Bulun"
    },
    "footer": {
        "copyright": "UB Market LTD. Tüm hakları saklıdır."
    },
    "aboutPage": {
        "label": "Hakkımızda",
        "heroTitle": "Avrupa Gıda Ticaretinde Güvenilir Ortağınız",
        "whoWeAre": "Biz Kimiz",
        "whoP1": "UB MARKET LTD, Bulgaristan Varna merkezli AB kayıtlı uluslararası bir ticaret şirketidir. Gıda ürünlerinin ihracat ve ithalatında uzmanlaşmış olup, önde gelen üreticiler ile Avrupa genelindeki toptan alıcılar arasında köprü görevi görüyoruz.",
        "whoP2": "Ana uzmanlık alanımız uluslararası ayçiçek yağı ticareti. Rafine, ham ve yüksek oleik çeşitleri — PET şişeler (0,5–10 litre) ve dökme tankerler olarak sunulmaktadır.",
        "whoP3": "Ürünleri doğrudan doğrulanmış üreticilerden tedarik ediyoruz ve fiyat müzakeresinden lojistik ve belgelendirmeye kadar her şeyi yönetiyoruz.",
        "whyLabel": "Neden Bizi Seçmelisiniz",
        "whyTitle": "Bizi Farklı Kılan Ne",
        "values": [
            {"title": "Avrupa Erişimi",
                "text": "12'den fazla AB ülkesine teslimat yapıyor, Doğu Avrupa üreticilerini Batı alıcılarıyla buluşturuyoruz."},
            {"title": "Güvenilir Ortaklıklar",
                "text": "Doğrulanmış üreticilerle uzun vadeli ilişkiler, tutarlı kalite ve tedarik sağlar."},
            {"title": "Güvenilir Lojistik",
                "text": "Avrupa genelinde tam karayolu taşımacılığı — FOB, CIF, DAP esnek teslimat koşulları."},
            {"title": "Kalite Güvencesi",
                "text": "Tüm ürünler AB gıda güvenliği standartlarına uygun, tam belgelendirme ve laboratuvar raporları ile."}
        ],
        "rangeLabel": "Neler Ticaretini Yapıyoruz",
        "rangeTitle": "Ürün Yelpazemiz",
        "rangeSubtitle": "Doğu Avrupa'daki güvenilir üreticilerden geniş bir gıda ürünü yelpazesi tedarik ediyoruz.",
        "productList": [
            "Ayçiçek yağı (rafine, deodorize, kışa dayanıklı)",
            "Ayçiçek yağı (rafine edilmemiş, ham) — dökme",
            "Yüksek oleik ayçiçek yağı (rafine)",
            "Gıda hizmeti için kızartma yağı",
            "Pancar şekeri (25kg, 50kg çuvallar)",
            "Süt ürünleri (süt, tereyağı)",
            "Mayonez ve çeşniler",
            "Diğer bitkisel yağlar (zeytin, soya, kolza)"
        ],
        "ctaTitle": "Ticarete Başlamaya Hazır Mısınız?",
        "ctaText": "Rekabetçi fiyatlar ve güvenilir tedarik için bugün bize ulaşın.",
        "ctaCta": "İletişime Geçin"
    },
    "productsPage": {
        "label": "Ürün Katalogu",
        "heroTitle": "Ürünlerimiz",
        "heroSubtitle": "AB genelindeki toptan alıcılar için doğrulanmış Doğu Avrupa üreticilerinden tedarik edilen yüksek kaliteli gıda ürünleri."
    },
    "contactsPage": {
        "label": "İletişime Geçin",
        "heroTitle": "Bize Ulaşın",
        "heroSubtitle": "24 saat içinde yanıt veriyoruz. Fiyat, numune veya ortaklık sorularınız için bize ulaşın."
    },
    "blog": {
        "label": "Blog",
        "title": "Haberler ve Bilgiler",
        "subtitle": "Pazar güncellemeleri, sektör trendleri ve gıda ticareti dünyasından hikayeler.",
        "comingTitle": "Blog Yakında",
        "comingText": "Ayçiçek yağı pazarları, gıda sektörü trendleri ve perde arkası hikayeler hakkında ilk makalelerimizi hazırlıyoruz.",
        "backHome": "Ana Sayfaya Dön"
    },
    "notFound": {
        "title": "Sayfa Bulunamadı",
        "text": "Aradığınız sayfa mevcut değil veya taşınmış.",
        "cta": "Ana Sayfaya Dön"
    },
    "contactForm": {
        "title": "Bize Mesaj Gönderin",
        "subtitle": "Formu doldurun, 24 saat içinde size dönüş yapacağız.",
        "name": "Ad",
        "namePlaceholder": "Tam adınız",
        "email": "E-posta",
        "emailPlaceholder": "mail@adresiniz.com",
        "phone": "Telefon",
        "phonePlaceholder": "+90 555 123 4567",
        "subject": "Konu",
        "subjectDefault": "Bir konu seçin...",
        "subjects": ["Fiyat Sorgulama", "Ürün Numuneleri", "Lojistik ve Teslimat", "Ortaklık", "Diğer"],
        "message": "Mesaj",
        "messagePlaceholder": "İhtiyaçlarınızı bize anlatın — ürünler, hacimler, teslimat noktası...",
        "send": "Mesaj Gönder",
        "sending": "Gönderiliyor...",
        "successTitle": "Mesaj Gönderildi!",
        "successText": "Sorgunuz için teşekkürler. 24 saat içinde yanıt vereceğiz.",
        "sendAnother": "Başka Mesaj Gönder",
        "errorText": "Bir hata oluştu. Lütfen tekrar deneyin veya bize doğrudan e-posta gönderin.",
        "emailDirect": "Doğrudan e-posta gönderin: ubmarket2022@gmail.com"
    }
}

# ====================================================================
# ROMANIAN — COMPLETE
# ====================================================================
ro = {
    "nav": {
        "home": "Acasă",
        "about": "Despre Noi",
        "products": "Produse",
        "blog": "Blog",
        "contacts": "Contact"
    },
    "hero": {
        "badge": "Comerț Internațional cu Alimente",
        "title1": "Ulei de",
        "titleHighlight": "Floarea Soarelui",
        "title2": "Premium și Produse Alimentare pentru Europa",
        "subtitle": "UB Market LTD conectează producătorii de top cu cumpărătorii angro din toată Europa. Aprovizionare fiabilă, prețuri competitive, transport rutier.",
        "cta1": "Solicită Ofertă",
        "cta2": "Vezi Produsele"
    },
    "trust": {
        "years": "Ani Experiență",
        "countries": "Țări",
        "tons": "Tone Livrate",
        "partners": "Parteneri"
    },
    "aboutPreview": {
        "label": "Despre Noi",
        "title": "Partenerul Dvs. de Încredere în Export și Import Alimentar",
        "p1": "UB MARKET LTD este o companie internațională de comerț specializată în exportul și importul de produse alimentare. Conectăm producătorii de top cu cumpărătorii angro din toată Europa.",
        "p2": "Specializarea noastră principală este comerțul internațional cu ulei de floarea soarelui — rafinat, brut și varietăți cu conținut ridicat de acid oleic, în sticle și cisterne.",
        "features": [
            "Uleiuri Rafinate și Brute",
            "Transport Rutier (UE)",
            "Sticle PET și Vrac",
            "Prețuri Competitive",
            "Certificat de Calitate",
            "Suport Multilingv"
        ],
        "cta": "Află Mai Multe"
    },
    "products": {
        "label": "Produsele Noastre",
        "title": "Ce Furnizăm",
        "subtitle": "Furnizăm produse alimentare de înaltă calitate de la producători verificați pentru cumpărătorii angro din Europa.",
        "cta": "Vezi Toate Produsele",
        "requestPrice": "Solicită Preț",
        "items": {
            "sunflower-oil": {
                "name": "Ulei de Floarea Soarelui",
                "description": "Rafinat, dezodorizat, winterizat. Sticle PET (0,5–10L) și cisterne vrac."
            },
            "frying-oil": {
                "name": "Ulei de Prăjit",
                "description": "Ulei cu stabilitate ridicată pentru servicii alimentare profesionale și prăjire industrială."
            },
            "sugar": {
                "name": "Zahăr din Sfeclă",
                "description": "Zahăr alb premium din sfeclă. Disponibil în saci de 25kg, 50kg și big bags."
            },
            "high-oleic": {
                "name": "Ulei de Floarea Soarelui High-Oleic",
                "description": "Varietate rafinată high-oleic — în sticle și vrac. Ideal pentru piețele orientate spre sănătate."
            },
            "dairy": {
                "name": "Produse Lactate",
                "description": "Lapte, unt și derivate lactate de la producători europeni certificați."
            },
            "mayonnaise": {
                "name": "Maioneză și Condimente",
                "description": "Maioneză tradițională și industrială, sosuri și produse de condimentare."
            }
        }
    },
    "howWeWork": {
        "label": "Cum Lucrăm",
        "title": "Proces Simplu, Rezultate Fiabile",
        "subtitle": "De la primul contact la livrare — ne ocupăm de tot pentru o experiență comercială fără probleme.",
        "steps": [
            {
                "title": "Contact și Solicitare",
                "text": "Spuneți-ne ce aveți nevoie — tip de produs, volum, destinație de livrare. Răspundem în 24 de ore."
            },
            {
                "title": "Ofertă și Acord",
                "text": "Oferim prețuri competitive, organizăm mostre dacă este necesar și finalizăm termenii contractului."
            },
            {
                "title": "Livrare și Suport",
                "text": "Produsele sunt expediate prin transport rutier cu documentație completă. Asigurăm livrare la timp și suport continuu."
            }
        ]
    },
    "logistics": {
        "label": "Logistică și Calitate",
        "title": "Construit pentru Comerț B2B",
        "delivery": "Opțiuni de Livrare",
        "quality": "Standarde de Calitate",
        "deliveryItems": [
            "Transport Rutier (UE)",
            "Sticle PET (0,5–10L)",
            "Cisterne Vrac",
            "Marfă Paletizată",
            "FOB / CIF / DAP",
            "Livrare Pan-Europeană"
        ],
        "qualityItems": [
            "Furnizori Certificați ISO",
            "Conformitate HACCP",
            "Non-GMO Disponibil",
            "Documentație Completă",
            "Rapoarte de Testare",
            "Standarde UE de Siguranță Alimentară"
        ]
    },
    "cta": {
        "label": "Să Lucrăm Împreună",
        "title": "Pregătit să Achiziționezi Produse Alimentare de Calitate?",
        "subtitle": "Obțineți o ofertă competitivă pentru ulei de floarea soarelui, zahăr, produse lactate și altele. Răspundem în 24 de ore.",
        "cta1": "Solicită Ofertă",
        "cta2": "Sună-ne Acum"
    },
    "contact": {
        "address": "Adresă",
        "addressValue": "Bulgaria, Varna 9010\nStr. Sirma Voivoda, bl.1, ap. 21",
        "email": "E-mail",
        "phone": "Telefon",
        "hours": "Program",
        "hoursValue": "Lun–Vin: 9:00–17:00\nSâm: 10:00–14:00\nDum: Închis",
        "social": "Urmărește-ne",
        "socialTitle": "Conectează-te pe Social Media",
        "mapLabel": "Locația Noastră",
        "mapTitle": "Ne Găsiți în Varna, Bulgaria"
    },
    "footer": {
        "copyright": "UB Market LTD. Toate drepturile rezervate."
    },
    "aboutPage": {
        "label": "Despre Noi",
        "heroTitle": "Partenerul Dvs. de Încredere în Comerțul Alimentar European",
        "whoWeAre": "Cine Suntem",
        "whoP1": "UB MARKET LTD este o companie internațională de comerț înregistrată în UE, cu sediul în Varna, Bulgaria. Ne specializăm în exportul și importul de produse alimentare, acționând ca intermediar între producători și cumpărători angro din Europa.",
        "whoP2": "Specializarea noastră principală este comerțul internațional cu ulei de floarea soarelui. Furnizăm o gamă largă — rafinat, brut și high-oleic — în sticle PET (0,5–10 litri) și cisterne vrac.",
        "whoP3": "Achiziționăm produse direct de la producători verificați și gestionăm totul, de la negocierea prețurilor la logistică și documentație.",
        "whyLabel": "De Ce Să Ne Alegeți",
        "whyTitle": "Ce Ne Diferențiază",
        "values": [
            {"title": "Acoperire Europeană",
                "text": "Livrăm în peste 12 țări UE, conectând producătorii est-europeni cu cumpărătorii occidentali."},
            {"title": "Parteneriate de Încredere",
                "text": "Relații pe termen lung cu producători verificați asigură calitate și aprovizionare constantă."},
            {"title": "Logistică Fiabilă",
                "text": "Acoperire completă de transport rutier în Europa cu termeni flexibili — FOB, CIF, DAP."},
            {"title": "Calitate Asigurată",
                "text": "Toate produsele respectă standardele UE de siguranță alimentară cu documentație completă și rapoarte de laborator."}
        ],
        "rangeLabel": "Ce Comercializăm",
        "rangeTitle": "Gama Noastră de Produse",
        "rangeSubtitle": "Furnizăm o gamă largă de produse alimentare direct de la producători fiabili din Europa de Est.",
        "productList": [
            "Ulei de floarea soarelui (rafinat, dezodorizat, winterizat)",
            "Ulei de floarea soarelui (nerafinat, brut) — vrac",
            "Ulei de floarea soarelui high-oleic (rafinat)",
            "Ulei de prăjit pentru servicii alimentare",
            "Zahăr din sfeclă (saci 25kg, 50kg)",
            "Produse lactate (lapte, unt)",
            "Maioneză și condimente",
            "Alte uleiuri vegetale (măsline, soia, rapiță)"
        ],
        "ctaTitle": "Pregătit să Începeți Comercializarea?",
        "ctaText": "Contactați-ne astăzi pentru prețuri competitive și aprovizionare fiabilă.",
        "ctaCta": "Contactează-ne"
    },
    "productsPage": {
        "label": "Catalog de Produse",
        "heroTitle": "Produsele Noastre",
        "heroSubtitle": "Produse alimentare de înaltă calitate de la producători est-europeni verificați pentru cumpărătorii angro din UE."
    },
    "contactsPage": {
        "label": "Contactează-ne",
        "heroTitle": "Contact",
        "heroSubtitle": "Răspundem în 24 de ore. Contactați-ne pentru prețuri, mostre sau întrebări despre parteneriat."
    },
    "blog": {
        "label": "Blog",
        "title": "Știri și Informații",
        "subtitle": "Actualizări de piață, tendințe din industrie și povești din lumea comerțului alimentar.",
        "comingTitle": "Blogul Vine în Curând",
        "comingText": "Pregătim primele articole despre piețele de ulei de floarea soarelui, tendințe din industria alimentară și povești din culise.",
        "backHome": "Înapoi Acasă"
    },
    "notFound": {
        "title": "Pagina Nu a Fost Găsită",
        "text": "Pagina pe care o căutați nu există sau a fost mutată.",
        "cta": "Înapoi Acasă"
    },
    "contactForm": {
        "title": "Trimite-ne un Mesaj",
        "subtitle": "Completați formularul și vă vom răspunde în 24 de ore.",
        "name": "Nume",
        "namePlaceholder": "Numele complet",
        "email": "E-mail",
        "emailPlaceholder": "email@adresa.com",
        "phone": "Telefon",
        "phonePlaceholder": "+40 700 123 456",
        "subject": "Subiect",
        "subjectDefault": "Selectați un subiect...",
        "subjects": ["Solicitare Preț", "Mostre Produse", "Logistică și Livrare", "Parteneriat", "Altele"],
        "message": "Mesaj",
        "messagePlaceholder": "Spuneți-ne despre nevoile dvs. — produse, volume, destinație de livrare...",
        "send": "Trimite Mesaj",
        "sending": "Se trimite...",
        "successTitle": "Mesaj Trimis!",
        "successText": "Mulțumim pentru solicitare. Vom răspunde în 24 de ore.",
        "sendAnother": "Trimite Alt Mesaj",
        "errorText": "Ceva nu a funcționat. Încercați din nou sau trimiteți-ne un email direct.",
        "emailDirect": "Trimiteți email direct la ubmarket2022@gmail.com"
    }
}

# ====================================================================
# GERMAN — COMPLETE
# ====================================================================
de = {
    "nav": {
        "home": "Startseite",
        "about": "Über Uns",
        "products": "Produkte",
        "blog": "Blog",
        "contacts": "Kontakt"
    },
    "hero": {
        "badge": "Internationaler Lebensmittelhandel",
        "title1": "Premium",
        "titleHighlight": "Sonnenblumenöl",
        "title2": "und Lebensmittel für Europa",
        "subtitle": "UB Market LTD verbindet führende Hersteller mit Großhandelskäufern in ganz Europa. Zuverlässige Versorgung, wettbewerbsfähige Preise, Straßentransport.",
        "cta1": "Angebot Anfordern",
        "cta2": "Produkte Ansehen"
    },
    "trust": {
        "years": "Jahre Erfahrung",
        "countries": "Länder",
        "tons": "Tonnen Geliefert",
        "partners": "Partner"
    },
    "aboutPreview": {
        "label": "Über Uns",
        "title": "Ihr Zuverlässiger Partner im Lebensmittel-Export und -Import",
        "p1": "UB MARKET LTD ist ein internationales Handelsunternehmen, spezialisiert auf den Export und Import von Lebensmitteln. Wir verbinden führende Hersteller mit Großhandelskäufern in ganz Europa.",
        "p2": "Unsere Hauptspezialisierung ist der internationale Handel mit Sonnenblumenöl — raffiniert, roh und High-Oleic-Sorten, in Flaschen und Tanklastwagen.",
        "features": [
            "Raffinierte und Rohe Öle",
            "Straßentransport (EU)",
            "PET-Flaschen und Bulk",
            "Wettbewerbsfähige Preise",
            "Qualitätszertifiziert",
            "Mehrsprachiger Support"
        ],
        "cta": "Mehr Erfahren"
    },
    "products": {
        "label": "Unsere Produkte",
        "title": "Was Wir Liefern",
        "subtitle": "Wir beziehen hochwertige Lebensmittel direkt von zuverlässigen Herstellern und liefern sie an Großhandelskäufer in Europa.",
        "cta": "Alle Produkte Ansehen",
        "requestPrice": "Preis Anfragen",
        "items": {
            "sunflower-oil": {
                "name": "Sonnenblumenöl",
                "description": "Raffiniert, desodoriert, winterfest. PET-Flaschen (0,5–10L) und Tanklastwagen."
            },
            "frying-oil": {
                "name": "Frittieröl",
                "description": "Hochstabiles Öl für professionelle Gastronomie und industrielles Frittieren."
            },
            "sugar": {
                "name": "Rübenzucker",
                "description": "Premium weißer Rübenzucker. Verfügbar in 25kg, 50kg Säcken und Big Bags."
            },
            "high-oleic": {
                "name": "High-Oleic Sonnenblumenöl",
                "description": "Raffinierte High-Oleic-Sorte — in Flaschen und Bulk. Ideal für gesundheitsbewusste Märkte."
            },
            "dairy": {
                "name": "Milchprodukte",
                "description": "Milch, Butter und Milchderivate von zertifizierten europäischen Herstellern."
            },
            "mayonnaise": {
                "name": "Mayonnaise und Gewürze",
                "description": "Traditionelle und industrielle Mayonnaise, Soßen und Gewürzprodukte."
            }
        }
    },
    "howWeWork": {
        "label": "Wie Wir Arbeiten",
        "title": "Einfacher Prozess, Zuverlässige Ergebnisse",
        "subtitle": "Vom ersten Kontakt bis zur Lieferung — wir kümmern uns um alles für eine reibungslose Handelserfahrung.",
        "steps": [
            {
                "title": "Kontakt und Anfrage",
                "text": "Teilen Sie uns mit, was Sie brauchen — Produkttyp, Menge, Lieferziel. Wir antworten innerhalb von 24 Stunden."
            },
            {
                "title": "Angebot und Vereinbarung",
                "text": "Wir bieten wettbewerbsfähige Preise, organisieren bei Bedarf Produktmuster und finalisieren die Vertragsbedingungen."
            },
            {
                "title": "Lieferung und Support",
                "text": "Produkte werden per Straßentransport mit vollständiger Dokumentation versandt. Pünktliche Lieferung und fortlaufende Unterstützung."
            }
        ]
    },
    "logistics": {
        "label": "Logistik und Qualität",
        "title": "Für B2B-Handel Entwickelt",
        "delivery": "Lieferoptionen",
        "quality": "Qualitätsstandards",
        "deliveryItems": [
            "Straßentransport (EU)",
            "PET-Flaschen (0,5–10L)",
            "Tanklastwagen",
            "Palettierte Fracht",
            "FOB / CIF / DAP",
            "Europaweite Lieferung"
        ],
        "qualityItems": [
            "ISO-Zertifizierte Lieferanten",
            "HACCP-Konformität",
            "Gentechnikfrei Verfügbar",
            "Vollständige Dokumentation",
            "Labortestberichte",
            "EU-Lebensmittelsicherheitsstandards"
        ]
    },
    "cta": {
        "label": "Lassen Sie Uns Zusammenarbeiten",
        "title": "Bereit, Hochwertige Lebensmittel zu Beschaffen?",
        "subtitle": "Erhalten Sie ein wettbewerbsfähiges Angebot für Sonnenblumenöl, Zucker, Milchprodukte und mehr. Wir antworten innerhalb von 24 Stunden.",
        "cta1": "Angebot Anfordern",
        "cta2": "Jetzt Anrufen"
    },
    "contact": {
        "address": "Adresse",
        "addressValue": "Bulgarien, Varna 9010\nSirma Voivoda Str., Bl.1, Ap. 21",
        "email": "E-Mail",
        "phone": "Telefon",
        "hours": "Geschäftszeiten",
        "hoursValue": "Mo–Fr: 9:00–17:00\nSa: 10:00–14:00\nSo: Geschlossen",
        "social": "Folgen Sie Uns",
        "socialTitle": "Verbinden Sie Sich auf Social Media",
        "mapLabel": "Unser Standort",
        "mapTitle": "Finden Sie Uns in Varna, Bulgarien"
    },
    "footer": {
        "copyright": "UB Market LTD. Alle Rechte vorbehalten."
    },
    "aboutPage": {
        "label": "Über Uns",
        "heroTitle": "Ihr Zuverlässiger Partner im Europäischen Lebensmittelhandel",
        "whoWeAre": "Wer Wir Sind",
        "whoP1": "UB MARKET LTD ist ein EU-registriertes internationales Handelsunternehmen mit Sitz in Varna, Bulgarien. Wir sind spezialisiert auf den Export und Import von Lebensmitteln und fungieren als verantwortungsvoller Vermittler zwischen Herstellern und Großhandelskäufern in Europa.",
        "whoP2": "Unsere Hauptspezialisierung ist der internationale Handel mit Sonnenblumenöl. Wir liefern eine breite Palette — raffiniert, roh und High-Oleic — in PET-Flaschen (0,5–10 Liter) und Tanklastwagen.",
        "whoP3": "Wir beziehen Produkte direkt von verifizierten Herstellern und kümmern uns um alles — von der Preisverhandlung bis zur Logistik und Dokumentation.",
        "whyLabel": "Warum Uns Wählen",
        "whyTitle": "Was Uns Auszeichnet",
        "values": [
            {"title": "Europäische Reichweite",
                "text": "Wir liefern in über 12 EU-Länder und verbinden osteuropäische Hersteller mit westlichen Käufern."},
            {"title": "Vertrauensvolle Partnerschaften",
                "text": "Langfristige Beziehungen mit verifizierten Herstellern gewährleisten konstante Qualität und Versorgung."},
            {"title": "Zuverlässige Logistik",
                "text": "Vollständige Straßentransportabdeckung in Europa mit flexiblen Lieferbedingungen — FOB, CIF, DAP."},
            {"title": "Qualitätsgarantie",
                "text": "Alle Produkte entsprechen EU-Lebensmittelsicherheitsstandards mit vollständiger Dokumentation und Laborberichten."}
        ],
        "rangeLabel": "Was Wir Handeln",
        "rangeTitle": "Unser Produktsortiment",
        "rangeSubtitle": "Wir liefern eine breite Palette an Lebensmitteln direkt von zuverlässigen Herstellern aus Osteuropa.",
        "productList": [
            "Sonnenblumenöl (raffiniert, desodoriert, winterfest)",
            "Sonnenblumenöl (unraffiniert, roh) — Bulk",
            "High-Oleic Sonnenblumenöl (raffiniert)",
            "Frittieröl für die Gastronomie",
            "Rübenzucker (25kg, 50kg Säcke)",
            "Milchprodukte (Milch, Butter)",
            "Mayonnaise und Gewürze",
            "Andere Pflanzenöle (Oliven, Soja, Raps)"
        ],
        "ctaTitle": "Bereit, mit dem Handel zu Beginnen?",
        "ctaText": "Kontaktieren Sie uns noch heute für wettbewerbsfähige Preise und zuverlässige Versorgung.",
        "ctaCta": "Kontaktieren Sie Uns"
    },
    "productsPage": {
        "label": "Produktkatalog",
        "heroTitle": "Unsere Produkte",
        "heroSubtitle": "Hochwertige Lebensmittel von verifizierten osteuropäischen Herstellern für Großhandelskäufer in der EU."
    },
    "contactsPage": {
        "label": "Kontaktieren Sie Uns",
        "heroTitle": "Kontakt",
        "heroSubtitle": "Wir antworten innerhalb von 24 Stunden. Kontaktieren Sie uns für Preise, Muster oder Partnerschaftsanfragen."
    },
    "blog": {
        "label": "Blog",
        "title": "Nachrichten und Einblicke",
        "subtitle": "Marktaktualisierungen, Branchentrends und Geschichten aus der Welt des Lebensmittelhandels.",
        "comingTitle": "Blog Kommt Bald",
        "comingText": "Wir bereiten unsere ersten Artikel über Sonnenblumenölmärkte, Trends der Lebensmittelindustrie und Geschichten hinter den Kulissen vor.",
        "backHome": "Zurück zur Startseite"
    },
    "notFound": {
        "title": "Seite Nicht Gefunden",
        "text": "Die gesuchte Seite existiert nicht oder wurde verschoben.",
        "cta": "Zurück zur Startseite"
    },
    "contactForm": {
        "title": "Senden Sie Uns eine Nachricht",
        "subtitle": "Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden.",
        "name": "Name",
        "namePlaceholder": "Ihr vollständiger Name",
        "email": "E-Mail",
        "emailPlaceholder": "ihre@email.de",
        "phone": "Telefon",
        "phonePlaceholder": "+49 170 1234567",
        "subject": "Betreff",
        "subjectDefault": "Wählen Sie ein Thema...",
        "subjects": ["Preisanfrage", "Produktmuster", "Logistik und Lieferung", "Partnerschaft", "Sonstiges"],
        "message": "Nachricht",
        "messagePlaceholder": "Teilen Sie uns Ihre Bedürfnisse mit — Produkte, Mengen, Lieferziel...",
        "send": "Nachricht Senden",
        "sending": "Wird gesendet...",
        "successTitle": "Nachricht Gesendet!",
        "successText": "Vielen Dank für Ihre Anfrage. Wir antworten innerhalb von 24 Stunden.",
        "sendAnother": "Weitere Nachricht Senden",
        "errorText": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder senden Sie uns direkt eine E-Mail.",
        "emailDirect": "E-Mail direkt an ubmarket2022@gmail.com senden"
    }
}

# ====================================================================
# HEADER FIX — use "nav" not "menu"
# ====================================================================
header_code = '''// src/components/Header/Header.tsx — Locale-aware routing
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useLanguage();

  const prefix = `/${locale}`;

  const navLinks = [
    { href: prefix, label: t?.nav?.home || "Home" },
    { href: `${prefix}/about`, label: t?.nav?.about || "About" },
    { href: `${prefix}/products`, label: t?.nav?.products || "Products" },
    { href: `${prefix}/blog`, label: t?.nav?.blog || "Blog" },
    { href: `${prefix}/contacts`, label: t?.nav?.contacts || "Contacts" },
  ];

  const isActive = (href: string) => {
    if (href === prefix) {
      return pathname === prefix || pathname === `${prefix}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={prefix} className={styles.logo}>
          <Image
            src="/icons/logo.webp"
            alt="UB Market — Star Food"
            width={50}
            height={50}
            priority
          />
          <span className={styles.logoText}>
            <strong>UB Market</strong>
          </span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.active : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${
                  isActive(link.href) ? styles.active : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
'''

# ====================================================================
# WRITE ALL FILES
# ====================================================================
files = {
    "src/i18n/tr.json": tr,
    "src/i18n/ro.json": ro,
    "src/i18n/de.json": de,
}

for path, data in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ Written: {path}")

# Write Header
header_path = "src/components/Header/Header.tsx"
with open(header_path, "w", encoding="utf-8") as f:
    f.write(header_code.strip() + "\n")
print(f"✅ Written: {header_path}")

print("\nDone! All translation files are now COMPLETE.")
print("Run: pnpm dev")
