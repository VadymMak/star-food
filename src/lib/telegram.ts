// src/lib/telegram.ts
// Telegram Bot helper for UB Market notifications

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export async function sendTelegramMessage(
  text: string,
  parseMode: "HTML" | "Markdown" = "HTML",
): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured");
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Telegram send error:", error);
    return false;
  }
}

// ===== Notification Formatters =====

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface QuoteFormData {
  company: string;
  contact: string;
  email: string;
  country: string;
  product: string;
  quantity?: string;
  deliveryTerms?: string;
  message?: string;
}

export function formatContactNotification(data: ContactFormData): string {
  const lines = [
    "📩 <b>New Contact Form Submission</b>",
    "",
    `👤 <b>Name:</b> ${escapeHtml(data.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(data.email)}`,
  ];

  if (data.phone) {
    lines.push(`📱 <b>Phone:</b> ${escapeHtml(data.phone)}`);
  }
  if (data.subject) {
    lines.push(`📋 <b>Subject:</b> ${escapeHtml(data.subject)}`);
  }

  lines.push("");
  lines.push(`💬 <b>Message:</b>`);
  lines.push(escapeHtml(data.message));
  lines.push("");
  lines.push(`🌐 <b>Source:</b> ub-market.com/contacts`);
  lines.push(
    `🕐 ${new Date().toLocaleString("en-GB", { timeZone: "Europe/Sofia" })}`,
  );

  return lines.join("\n");
}

export function formatQuoteNotification(data: QuoteFormData): string {
  const lines = [
    "🔥 <b>New Quote Request!</b>",
    "",
    `🏢 <b>Company:</b> ${escapeHtml(data.company)}`,
    `👤 <b>Contact:</b> ${escapeHtml(data.contact)}`,
    `📧 <b>Email:</b> ${escapeHtml(data.email)}`,
    `🌍 <b>Country:</b> ${escapeHtml(data.country)}`,
    `📦 <b>Product:</b> ${escapeHtml(data.product)}`,
  ];

  if (data.quantity) {
    lines.push(`⚖️ <b>Quantity:</b> ${escapeHtml(data.quantity)}`);
  }
  if (data.deliveryTerms) {
    lines.push(`🚚 <b>Delivery:</b> ${escapeHtml(data.deliveryTerms)}`);
  }
  if (data.message) {
    lines.push("");
    lines.push(`💬 <b>Message:</b>`);
    lines.push(escapeHtml(data.message));
  }

  lines.push("");
  lines.push(`🌐 <b>Source:</b> ub-market.com/quote`);
  lines.push(
    `🕐 ${new Date().toLocaleString("en-GB", { timeZone: "Europe/Sofia" })}`,
  );

  return lines.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
