// src/data/blog-posts.ts — Blog post registry
// Add new posts here. Content is markdown per locale.

export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  readingTime: number; // minutes
  image: string;
  content: Record<string, BlogPostLocale>;
}

export interface BlogPostLocale {
  title: string;
  description: string;
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sunflower-oil-wholesale-guide",
    category: "sunflower-oil",
    date: "2026-03-01",
    readingTime: 8,
    image: "/images/vegetable-oil.webp",
    content: {
      en: {
        title: "Complete Guide to Buying Sunflower Oil Wholesale in Europe",
        description: "Everything you need to know about sourcing high-quality sunflower oil in bulk — types, grades, pricing factors, and how to choose a reliable supplier.",
        body: `## Why Sunflower Oil Is Europe's Most Traded Vegetable Oil

Sunflower oil remains one of the most widely consumed cooking oils in Europe. With the European market valued at approximately **$9.36 billion in 2025**, demand continues to grow across food service, retail, and industrial segments.

For wholesale buyers, understanding the market landscape is essential to securing the best deals.

## Types of Sunflower Oil

### Refined Sunflower Oil
The most common type for retail and food service. It goes through a full refining process — degumming, neutralization, bleaching, deodorization, and winterization. The result is a light, neutral-tasting oil with a high smoke point.

### Crude (Unrefined) Sunflower Oil
Used primarily as a raw material for further processing. It retains its natural color and flavor. Typically traded in bulk tank trucks.

### High-Oleic Sunflower Oil
A premium variety with higher oleic acid content (80%+). It offers better oxidative stability, making it ideal for frying and health-conscious markets. Growing in popularity across Western Europe.

## Quality Grades and Certifications

When sourcing sunflower oil wholesale, look for these certifications:

- **ISO 22000** — Food safety management
- **HACCP** — Hazard analysis and critical control points
- **Non-GMO** — Increasingly required by EU retailers
- **EU Food Safety Standards** — Mandatory for EU market

## Pricing Factors

Several factors affect wholesale sunflower oil prices:

1. **Crop harvest quality** — Annual yield from Ukraine, Russia, Argentina
2. **Global commodity markets** — CBOT and EU exchange prices
3. **Packaging type** — PET bottles vs bulk tankers
4. **Delivery terms** — FOB, CIF, or DAP
5. **Volume** — Larger orders get better per-ton pricing
6. **Season** — Prices typically dip after harvest (September–November)

## Packaging Options

| Format | Volume | Best For |
|--------|--------|----------|
| PET Bottles | 0.5L – 10L | Retail, food service |
| IBC Containers | 1000L | Medium buyers |
| Flexitanks | 20,000L | Large importers |
| Bulk Tank Trucks | 22–25 tons | Industrial buyers |

## How to Choose a Reliable Supplier

A good wholesale oil supplier should offer:

- Transparent pricing with no hidden fees
- Full documentation (certificates, lab reports, phytosanitary docs)
- Flexible delivery terms (FOB, CIF, DAP)
- Product samples before large orders
- Responsive communication (24-hour response time)

## How UB Market Can Help

UB Market LTD is an EU-registered food trading company based in Bulgaria. We specialize in connecting verified Eastern European producers with wholesale buyers across Europe.

**What we offer:**
- Refined, crude, and high-oleic sunflower oil
- PET bottles (0.5–10L) and bulk tank trucks
- Competitive pricing with full documentation
- Road transport delivery across 12+ EU countries

## Frequently Asked Questions

**What is the minimum order quantity?**
Our minimum order is typically 20 tons (one full truck). For PET bottles, we can arrange smaller palletized shipments.

**What delivery terms do you offer?**
We work with FOB, CIF, and DAP terms depending on your location and preference.

**How quickly can you deliver?**
Standard delivery within the EU takes 5–10 business days from order confirmation.

**Do you provide samples?**
Yes, we can arrange product samples for serious buyers before placing a large order.`,
      },
      bg: {
        title: "Пълен наръчник за покупка на слънчогледово олио на едро в Европа",
        description: "Всичко, което трябва да знаете за снабдяването с висококачествено слънчогледово олио на едро — видове, класове, ценови фактори и как да изберете надежден доставчик.",
        body: `## Защо слънчогледовото олио е най-търгуваното растително масло в Европа

Слънчогледовото олио остава едно от най-широко потребяваните масла за готвене в Европа. С европейския пазар на стойност приблизително **9,36 милиарда долара през 2025**, търсенето продължава да расте.

## Видове слънчогледово олио

### Рафинирано слънчогледово олио
Най-разпространеният вид за търговия и хранителни услуги. Преминава през пълен процес на рафиниране.

### Сурово (нерафинирано) слънчогледово олио
Използва се предимно като суровина за допълнителна обработка.

### Високоолеиново слънчогледово олио
Премиум вариант с по-високо съдържание на олеинова киселина (80%+). Идеален за пържене и здравословни пазари.

## Как UB Market може да помогне

UB Market LTD е регистрирана в ЕС компания за търговия с хранителни продукти, базирана в България. Свържете се с нас за конкурентни цени и надеждна доставка.`,
      },
      tr: {
        title: "Avrupa'da Toptan Ayçiçek Yağı Satın Alma Rehberi",
        description: "Yüksek kaliteli ayçiçek yağı tedariki hakkında bilmeniz gereken her şey — türler, kalite dereceleri, fiyatlandırma faktörleri ve güvenilir tedarikçi seçimi.",
        body: `## Ayçiçek Yağı Neden Avrupa'nın En Çok Ticareti Yapılan Bitkisel Yağıdır

Ayçiçek yağı, Avrupa'da en yaygın tüketilen pişirme yağlarından biri olmaya devam etmektedir. 2025 yılında Avrupa pazarı yaklaşık **9,36 milyar dolar** değerindedir.

## Ayçiçek Yağı Türleri

### Rafine Ayçiçek Yağı
Perakende ve gıda hizmetleri için en yaygın tür. Tam rafinasyon sürecinden geçer.

### Ham (Rafine Edilmemiş) Ayçiçek Yağı
Esas olarak ileri işleme için hammadde olarak kullanılır.

### Yüksek Oleik Ayçiçek Yağı
Daha yüksek oleik asit içeriğine (%80+) sahip premium çeşit. Kızartma ve sağlık bilincine sahip pazarlar için idealdir.

## UB Market Nasıl Yardımcı Olabilir

UB Market LTD, Bulgaristan merkezli AB kayıtlı bir gıda ticaret şirketidir. Rekabetçi fiyatlar ve güvenilir teslimat için bizimle iletişime geçin.`,
      },
      ro: {
        title: "Ghid complet pentru achiziția de ulei de floarea soarelui angro în Europa",
        description: "Tot ce trebuie să știți despre aprovizionarea cu ulei de floarea soarelui de înaltă calitate — tipuri, grade, factori de preț și alegerea unui furnizor.",
        body: `## De ce uleiul de floarea soarelui este cel mai tranzacționat ulei vegetal din Europa

Uleiul de floarea soarelui rămâne unul dintre cele mai consumate uleiuri de gătit din Europa. Piața europeană este evaluată la aproximativ **9,36 miliarde dolari în 2025**.

## Tipuri de ulei de floarea soarelui

### Ulei rafinat
Cel mai comun tip pentru retail și servicii alimentare.

### Ulei brut (nerafinat)
Utilizat în principal ca materie primă pentru prelucrare ulterioară.

### Ulei high-oleic
Varietate premium cu conținut ridicat de acid oleic (80%+).

## Cum vă poate ajuta UB Market

UB Market LTD este o companie de comerț alimentar înregistrată în UE, cu sediul în Bulgaria. Contactați-ne pentru prețuri competitive.`,
      },
      de: {
        title: "Kompletter Leitfaden zum Großhandelskauf von Sonnenblumenöl in Europa",
        description: "Alles, was Sie über die Beschaffung von hochwertigem Sonnenblumenöl im Großhandel wissen müssen — Sorten, Qualitätsgrade, Preisfaktoren und Lieferantenwahl.",
        body: `## Warum Sonnenblumenöl das meistgehandelte Pflanzenöl Europas ist

Sonnenblumenöl bleibt eines der am meisten konsumierten Speiseöle in Europa. Der europäische Markt wird 2025 auf etwa **9,36 Milliarden Dollar** geschätzt.

## Arten von Sonnenblumenöl

### Raffiniertes Sonnenblumenöl
Die häufigste Art für Einzelhandel und Gastronomie.

### Rohes (unraffiniertes) Sonnenblumenöl
Wird hauptsächlich als Rohstoff für die Weiterverarbeitung verwendet.

### High-Oleic Sonnenblumenöl
Eine Premium-Sorte mit höherem Ölsäuregehalt (80%+). Ideal für Frittieren und gesundheitsbewusste Märkte.

## Wie UB Market helfen kann

UB Market LTD ist ein EU-registriertes Lebensmittelhandelsunternehmen mit Sitz in Bulgarien. Kontaktieren Sie uns für wettbewerbsfähige Preise.`,
      },
      ua: {
        title: "Повний посібник з оптової закупівлі соняшникової олії в Європі",
        description: "Все, що потрібно знати про постачання високоякісної соняшникової олії оптом — види, сорти, цінові фактори та вибір надійного постачальника.",
        body: `## Чому соняшникова олія є найбільш торгованою рослинною олією в Європі

Соняшникова олія залишається однією з найбільш споживаних олій для приготування їжі в Європі. Європейський ринок оцінюється приблизно в **9,36 мільярда доларів у 2025 році**.

## Види соняшникової олії

### Рафінована соняшникова олія
Найпоширеніший тип для роздрібної торгівлі та харчових послуг.

### Сира (нерафінована) соняшникова олія
Використовується переважно як сировина для подальшої переробки.

### Високоолеїнова соняшникова олія
Преміальний сорт з підвищеним вмістом олеїнової кислоти (80%+).

## Як UB Market може допомогти

UB Market LTD — зареєстрована в ЄС компанія з торгівлі продуктами харчування, що базується в Болгарії. Зв\'яжіться з нами для конкурентних цін.`,
      },
    },
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "sunflower-oil", label: "Sunflower Oil" },
  { id: "trading", label: "Trading" },
  { id: "brand", label: "Brand" },
  { id: "products", label: "Products" },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "all") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}
