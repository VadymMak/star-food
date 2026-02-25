// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendTelegramMessage, formatContactNotification } from "@/lib/telegram";
import { sendAutoReply } from "@/lib/auto-reply";

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
    }

    // 2. Send Telegram notification
    await sendTelegramMessage(
      formatContactNotification({ name, email, phone, subject, message }),
    ).catch((err) => console.error("Telegram error:", err));

    // 3. AI auto-reply (direct call, no fetch)
    try {
      await sendAutoReply({
        type: "contact",
        name,
        email,
        phone,
        subject,
        message,
      });
    } catch (err) {
      console.error("Auto-reply error:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
