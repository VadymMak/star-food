// src/lib/telegram.ts
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

// ── Contact form notification ──
export function formatContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): string {
  return [
    `📩 <b>New Contact Form</b>`,
    ``,
    `👤 <b>Name:</b> ${esc(data.name)}`,
    `📧 <b>Email:</b> ${esc(data.email)}`,
    data.phone ? `📱 <b>Phone:</b> ${esc(data.phone)}` : null,
    data.subject ? `📋 <b>Subject:</b> ${esc(data.subject)}` : null,
    ``,
    `💬 <b>Message:</b>`,
    esc(data.message),
  ]
    .filter(Boolean)
    .join("\n");
}

// ── Quote form notification ──
export function formatQuoteNotification(data: {
  company?: string;
  contact?: string;
  email: string;
  country?: string;
  product?: string;
  quantity?: string;
  deliveryTerms?: string;
  message?: string;
}): string {
  return [
    `💰 <b>New Quote Request</b>`,
    ``,
    data.company ? `🏢 <b>Company:</b> ${esc(data.company)}` : null,
    data.contact ? `👤 <b>Contact:</b> ${esc(data.contact)}` : null,
    `📧 <b>Email:</b> ${esc(data.email)}`,
    data.country ? `🌍 <b>Country:</b> ${esc(data.country)}` : null,
    data.product ? `📦 <b>Product:</b> ${esc(data.product)}` : null,
    data.quantity ? `⚖️ <b>Quantity:</b> ${esc(data.quantity)}` : null,
    data.deliveryTerms ? `🚛 <b>Terms:</b> ${esc(data.deliveryTerms)}` : null,
    data.message ? `\n💬 <b>Note:</b>\n${esc(data.message)}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

// ── AI auto-reply sent notification ──
export function formatAutoReplyNotification(data: {
  name: string;
  email: string;
  aiReply: string;
}): string {
  const preview =
    data.aiReply.length > 300
      ? data.aiReply.slice(0, 300) + "..."
      : data.aiReply;
  return [
    `🤖 <b>AI Auto-Reply Sent</b>`,
    ``,
    `👤 <b>To:</b> ${esc(data.name)} (${esc(data.email)})`,
    ``,
    `📝 <b>Reply preview:</b>`,
    esc(preview),
  ].join("\n");
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
