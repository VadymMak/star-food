// src/app/api/telegram/route.ts
// Telegram Bot Webhook — handles /report, /help commands
import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { collectAndFormatSEOReport } from "@/lib/seo-stats";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const message = update?.message;

    if (!message?.text) {
      return NextResponse.json({ ok: true });
    }

    // Only respond to authorized chat
    const chatId = String(message.chat.id);
    const allowedChat = process.env.TELEGRAM_CHAT_ID;
    if (!allowedChat || chatId !== allowedChat) {
      return NextResponse.json({ ok: true });
    }

    const command = message.text.split(" ")[0].toLowerCase();
    let reply = "";

    switch (command) {
      case "/report": {
        await sendTelegramMessage("⏳ Generating SEO report...");
        reply = await collectAndFormatSEOReport();
        break;
      }

      case "/blog": {
        reply = [
          "📝 <b>Blog Status — UB Market</b>",
          "",
          "Published posts: 12",
          "Languages: EN, BG, UA, TR, RO, DE",
          "",
          "📂 <b>Categories:</b>",
          "• Sunflower Oil: 5 posts",
          "• Trading: 4 posts",
          "• Brand: 1 post",
          "• Products: 2 posts",
          "",
          "🔗 https://ub-market.com/en/blog",
        ].join("\n");
        break;
      }

      case "/help":
      case "/start": {
        reply = [
          "🤖 <b>UB Market Bot</b>",
          "",
          "Available commands:",
          "/report — Live SEO report (Search Console + PageSpeed)",
          "/blog — Blog posts status",
          "/help — Show this message",
          "",
          "📊 Daily report sent automatically at 8:00 UTC",
        ].join("\n");
        break;
      }

      default: {
        reply = "Unknown command. Type /help to see available commands.";
        break;
      }
    }

    if (reply) {
      await sendTelegramMessage(reply);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}
