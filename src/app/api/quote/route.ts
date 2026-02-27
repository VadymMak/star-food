// src/app/api/quote/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendTelegramMessage, formatQuoteNotification } from "@/lib/telegram";
import { sendAutoReply } from "@/lib/auto-reply";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = ["ubmarket2022@gmail.com", "ubmarketsite@gmail.com"];
const FROM_EMAIL = "Star Food <noreply@ub-market.com>";

export async function POST(req: NextRequest) {
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
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Send notification email to owner via Resend
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

    // 2. Send Telegram notification
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

    // 3. AI auto-reply (direct call, no fetch)
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
