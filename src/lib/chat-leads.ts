// src/lib/chat-leads.ts
// Detects potential leads from chat messages and sends Telegram notifications
// HOT = ready to buy, WARM = interested, COLD = browsing

import { sendTelegramMessage } from "@/lib/telegram";

const HOT_SIGNALS = [
  // English
  "budget",
  "price",
  "cost",
  "how much",
  "quote",
  "order",
  "buy",
  "purchase",
  "wholesale",
  "bulk",
  "container",
  "tons",
  "moq",
  "minimum order",
  "price list",
  "contract",
  // Turkish
  "fiyat",
  "sipariş",
  "satın al",
  "toptan",
  "teklif",
  "maliyet",
  // German
  "preis",
  "kosten",
  "bestellen",
  "großhandel",
  "angebot",
  // Bulgarian
  "цена",
  "стоимост",
  "поръчка",
  "купя",
  "оферта",
  // Romanian
  "preț",
  "comandă",
  "cumpăra",
  "angro",
  // Ukrainian/Russian
  "цена",
  "стоимость",
  "заказать",
  "купить",
  "оптом",
  "прайс",
];

const WARM_SIGNALS = [
  // English
  "product",
  "oil",
  "sugar",
  "sunflower",
  "frying",
  "mayonnaise",
  "dairy",
  "delivery",
  "shipping",
  "certificate",
  "non-gmo",
  "iso",
  "haccp",
  "private label",
  "packaging",
  "sample",
  // Turkish
  "ürün",
  "yağ",
  "şeker",
  "teslimat",
  "sertifika",
  // German
  "produkt",
  "öl",
  "zucker",
  "lieferung",
  "zertifikat",
  // Bulgarian
  "продукт",
  "олио",
  "захар",
  "доставка",
  "сертификат",
  // Romanian
  "produs",
  "ulei",
  "zahăr",
  "livrare",
  "certificat",
  // Ukrainian/Russian
  "продукт",
  "масло",
  "сахар",
  "доставка",
  "сертификат",
];

type LeadRating = "HOT" | "WARM" | "COLD";

function detectLead(message: string): {
  rating: LeadRating;
  signals: string[];
} {
  const lower = message.toLowerCase();
  const hotMatches = HOT_SIGNALS.filter((s) => lower.includes(s));
  const warmMatches = WARM_SIGNALS.filter((s) => lower.includes(s));

  if (hotMatches.length > 0) {
    return { rating: "HOT", signals: hotMatches };
  }
  if (warmMatches.length > 0) {
    return { rating: "WARM", signals: warmMatches };
  }
  return { rating: "COLD", signals: [] };
}

export async function checkAndNotifyLead(
  message: string,
  locale?: string,
): Promise<void> {
  const { rating, signals } = detectLead(message);

  // Only notify for HOT and WARM leads
  if (rating === "COLD") return;

  const emoji = rating === "HOT" ? "🔥" : "💡";
  const text = [
    `${emoji} <b>Chat Lead (${rating})</b>`,
    ``,
    `<b>Signals:</b> ${signals.join(", ")}`,
    `<b>Language:</b> ${locale || "unknown"}`,
    `<b>Message:</b> ${message.slice(0, 200)}${message.length > 200 ? "..." : ""}`,
  ].join("\n");

  try {
    await sendTelegramMessage(text);
  } catch (err) {
    console.error("Lead notification failed:", err);
  }
}
