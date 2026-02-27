// src/app/api/cron/seo-report/route.ts
// Daily SEO report → Telegram (triggered by Vercel Cron)
import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { collectAndFormatSEOReport } from "@/lib/seo-stats";

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends this automatically)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const report = await collectAndFormatSEOReport();
    await sendTelegramMessage(report);
    return NextResponse.json({ success: true, message: "SEO report sent" });
  } catch (error) {
    console.error("SEO report cron error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
