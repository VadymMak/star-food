// src/app/api/quote/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendTelegramMessage, formatQuoteNotification } from "@/lib/telegram";
import { sendAutoReply } from "@/lib/auto-reply";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = ["ubmarket2022@gmail.com", "ubmarketsite@gmail.com"];
const FROM_EMAIL = "Star Food <noreply@ub-market.com>";

// ─── ANTI-SPAM ────────────────────────────────────────────────

// Rate limit: max 3 запроса с одного IP за 60 секунд
const rateLimitMap = new Map<string, { count: number; ts: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > 60_000) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return true;
  }
  entry.count++;
  return entry.count <= 3;
}

// Мусорные строки: base64-подобные, без пробелов, много заглавных
function isGarbage(str: string): boolean {
  if (!str || str.length < 3) return false;
  const upperRatio = (str.match(/[A-Z]/g) || []).length / str.length;
  if (upperRatio > 0.4 && str.length > 10) return true;
  if (str.length > 20 && !/[\s\-\.]/.test(str)) return true;
  return false;
}

// Подозрительный email: we.ti.pix.ev.o.6.69@gmail.com
function isSuspiciousEmail(email: string): boolean {
  const local = email.split("@")[0] || "";
  const dots = (local.match(/\./g) || []).length;
  if (dots >= 3) return true;
  if (/(\w\.){3,}/.test(local)) return true;
  return false;
}

// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    console.warn(`[RATE LIMIT] IP: ${ip}`);
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const {
      company,
      name,
      email,
      phone,
      country,
      product,
      quantity,
      deliveryTerms,
      message,
      locale,
      honeypot, // скрытое поле — люди не заполняют
    } = body;

    // 2. Honeypot — бот заполнил скрытое поле
    if (honeypot) {
      console.warn(`[HONEYPOT] IP: ${ip}`);
      return NextResponse.json({ success: true }); // тихий reject
    }

    // 3. Обязательные поля
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 4. Email валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    // 5. Подозрительный email
    if (isSuspiciousEmail(email)) {
      console.warn(`[SPAM EMAIL] IP: ${ip} email: ${email}`);
      return NextResponse.json({ success: true }); // тихий reject
    }

    // 6. Мусорные строки в полях
    if (
      isGarbage(company || "") ||
      isGarbage(name) ||
      isGarbage(quantity || "")
    ) {
      console.warn(`[GARBAGE] IP: ${ip} company: ${company} name: ${name}`);
      return NextResponse.json({ success: true }); // тихий reject
    }

    // ── Всё чисто — обрабатываем заявку ──────────────────────

    // 1. Email уведомление владельцу через Resend
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `[Star Food Quote] ${product || "General"} — ${company || name}`,
        html: `
          <h2>💰 New Quote Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            ${company ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${company}</td></tr>` : ""}
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Contact</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>` : ""}
            ${country ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Country</td><td style="padding:8px;border:1px solid #ddd">${country}</td></tr>` : ""}
            ${product ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Product</td><td style="padding:8px;border:1px solid #ddd">${product}</td></tr>` : ""}
            ${quantity ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Quantity</td><td style="padding:8px;border:1px solid #ddd">${quantity}</td></tr>` : ""}
            ${deliveryTerms ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Delivery Terms</td><td style="padding:8px;border:1px solid #ddd">${deliveryTerms}</td></tr>` : ""}
          </table>
          ${message ? `<h3>Additional Notes:</h3><p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${message}</p>` : ""}
          <hr>
          <p style="color:#888;font-size:12px">Sent from ub-market.com quote form</p>
        `,
      });
    } catch (emailErr) {
      console.error("Resend email error:", emailErr);
    }

    // 2. Telegram уведомление
    await sendTelegramMessage(
      formatQuoteNotification({
        company,
        contact: name,
        email,
        country,
        product,
        quantity,
        deliveryTerms,
        message,
      }),
    ).catch((err) => console.error("Telegram error:", err));

    // 3. AI авто-ответ клиенту
    try {
      await sendAutoReply({
        type: "quote",
        name,
        email,
        phone,
        company,
        country,
        product,
        quantity,
        deliveryTerms,
        message,
        locale: locale || "en",
      });
    } catch (err) {
      console.error("Auto-reply error:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote route error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
