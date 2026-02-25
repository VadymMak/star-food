// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendTelegramMessage, formatContactNotification } from "@/lib/telegram";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = ["ubmarket2022@gmail.com", "ubmarketsite@gmail.com"];
const FROM_EMAIL = "Star Food <noreply@ub-market.com>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
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
        subject: `[Star Food] ${subject || "New inquiry"} — ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>` : ""}
            ${subject ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Subject</td><td style="padding:8px;border:1px solid #ddd">${subject}</td></tr>` : ""}
          </table>
          <h3>Message:</h3>
          <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${message}</p>
          <hr>
          <p style="color:#888;font-size:12px">Sent from ub-market.com contact form</p>
        `,
      });
    } catch (emailErr) {
      console.error("Resend email error:", emailErr);
      // Don't fail — Telegram will still work
    }

    // 2. Send Telegram notification
    await sendTelegramMessage(
      formatContactNotification({ name, email, phone, subject, message }),
    ).catch((err) => console.error("Telegram error:", err));

    // 3. Trigger AI auto-reply (fire-and-forget)
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    fetch(`${baseUrl}/api/auto-reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTO_REPLY_SECRET || "internal"}`,
      },
      body: JSON.stringify({
        type: "contact",
        name,
        email,
        phone,
        subject,
        message,
      }),
    }).catch((err) => console.error("Auto-reply trigger error:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
