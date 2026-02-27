// src/lib/auto-reply.ts
import OpenAI from "openai";
import { Resend } from "resend";
import {
  sendTelegramMessage,
  formatAutoReplyNotification,
} from "@/lib/telegram";
import { getRAGContext } from "@/lib/rag-chunks";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "Star Food <noreply@ub-market.com>";

const LANG_CONFIG: Record<string, { subject: string; instruction: string }> = {
  en: {
    subject: "Re: Your inquiry — Star Food / UB Market",
    instruction: "Write your response in English.",
  },
  bg: {
    subject: "Re: Вашето запитване — Star Food / UB Market",
    instruction: "Write your response in Bulgarian (Български).",
  },
  tr: {
    subject: "Re: Talebiniz — Star Food / UB Market",
    instruction: "Write your response in Turkish (Türkçe).",
  },
  ro: {
    subject: "Re: Solicitarea dumneavoastră — Star Food / UB Market",
    instruction: "Write your response in Romanian (Română).",
  },
  de: {
    subject: "Re: Ihre Anfrage — Star Food / UB Market",
    instruction: "Write your response in German (Deutsch).",
  },
  ua: {
    subject: "Re: Ваш запит — Star Food / UB Market",
    instruction: "Write your response in Ukrainian (Українська).",
  },
  ru: {
    subject: "Re: Ваш запрос — Star Food / UB Market",
    instruction: "Write your response in Russian (Русский).",
  },
};

function detectLanguage(text: string): string {
  if (/[а-яА-ЯёЁ]/.test(text)) {
    if (/[іїєґІЇЄҐ]/.test(text)) return "ua";
    if (/[ъьЪЬ]/.test(text)) return "bg";
    return "ru";
  }
  if (/[çğıöşüÇĞİÖŞÜ]/.test(text)) return "tr";
  if (/[ăâîșțĂÂÎȘȚ]/.test(text)) return "ro";
  if (/[äöüßÄÖÜ]/.test(text)) return "de";
  return "en";
}

interface AutoReplyData {
  type: "contact" | "quote";
  name: string;
  email: string;
  locale?: string;
  message?: string;
  subject?: string;
  phone?: string;
  company?: string;
  country?: string;
  product?: string;
  quantity?: string;
  deliveryTerms?: string;
}

export async function sendAutoReply(data: AutoReplyData): Promise<void> {
  const {
    type,
    name,
    email,
    message,
    subject,
    phone,
    company,
    country,
    product,
    quantity,
    deliveryTerms,
    locale,
  } = data;

  if (!process.env.OPENAI_API_KEY || !process.env.RESEND_API_KEY) {
    console.error("Auto-reply: missing OPENAI_API_KEY or RESEND_API_KEY");
    return;
  }

  // Use locale from form (reliable) or fall back to text detection
  const lang = (locale && LANG_CONFIG[locale]) ? locale : detectLanguage(message || product || "");
  const langCfg = LANG_CONFIG[lang] || LANG_CONFIG.en;

  // Build inquiry details
  let inquiryDetails = "";
  if (type === "quote") {
    inquiryDetails = [
      `Type: Quote Request`,
      company ? `Company: ${company}` : null,
      `Contact: ${name}`,
      `Email: ${email}`,
      country ? `Country: ${country}` : null,
      product ? `Product interested in: ${product}` : null,
      quantity ? `Quantity: ${quantity}` : null,
      deliveryTerms ? `Preferred delivery terms: ${deliveryTerms}` : null,
      message ? `Additional message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  } else {
    inquiryDetails = [
      `Type: Contact Form`,
      `Name: ${name}`,
      `Email: ${email}`,
      subject ? `Subject: ${subject}` : null,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // System prompt
  const systemPrompt = `You are the UB Market Team — a professional, warm B2B food trading company representative.

BUSINESS CONTEXT:
${getRAGContext()}

RESPONSE RULES:
- Address the person by their first name
- Reference their specific inquiry details (product, quantity, delivery terms, etc.)
- NEVER mention specific prices — say "we'll prepare a personalized quote within 24 hours"
- If they asked about a specific product, mention relevant details (packaging, certifications)
- Ask 1-2 relevant follow-up questions to better understand their needs
- Keep response concise: 4-6 short paragraphs
- Write in plain text paragraphs (no HTML, no markdown, no bullet points)
- Sign as "Best regards,\\nUB Market Team\\nub-market.com" (NOT a specific person)
- Be professional but warm — this is B2B communication
- ${langCfg.instruction}`;

  // Generate AI response
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 600,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `New inquiry received:\n\n${inquiryDetails}\n\nWrite a personalized response to this person.`,
      },
    ],
  });

  const aiReply = completion.choices[0]?.message?.content?.trim();
  if (!aiReply) {
    console.error("OpenAI returned empty response");
    return;
  }

  // Convert to HTML
  const htmlBody = aiReply
    .split("\n\n")
    .map(
      (p) =>
        `<p style="margin:0 0 16px 0;line-height:1.6">${p.replace(/\n/g, "<br>")}</p>`,
    )
    .join("");

  // Send email to client
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: langCfg.subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
          ${htmlBody}
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#888;font-size:12px">
            UB Market LTD | Star Food<br>
            Sirma Voivoda St., b.1, ap. 21, Varna 9010, Bulgaria<br>
            +359 8844 69860 | ubmarket2022@gmail.com<br>
            <a href="https://ub-market.com" style="color:#d4a843">ub-market.com</a>
          </p>
        </div>
      `,
      replyTo: "ubmarket2022@gmail.com",
    });
  } catch (emailErr) {
    console.error("Auto-reply email error:", emailErr);
    await sendTelegramMessage(
      `⚠️ <b>Auto-reply email FAILED</b>\nTo: ${name} (${email})\nError: ${String(emailErr)}`,
    );
    return;
  }

  // Notify via Telegram
  await sendTelegramMessage(
    formatAutoReplyNotification({ name, email, aiReply }),
  ).catch(() => {});
}
