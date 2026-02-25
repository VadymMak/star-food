// src/app/api/notify/route.ts
// This route ONLY sends Telegram notifications
// Web3Forms is called from the client (Cloudflare blocks server-side calls)
import { NextRequest, NextResponse } from "next/server";
import {
  sendTelegramMessage,
  formatContactNotification,
  formatQuoteNotification,
} from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    if (type === "contact") {
      await sendTelegramMessage(formatContactNotification(data));
    } else if (type === "quote") {
      await sendTelegramMessage(formatQuoteNotification(data));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram notify error:", error);
    return NextResponse.json({ success: true }); // Don't break the form
  }
}
