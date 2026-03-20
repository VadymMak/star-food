// src/app/api/product-prices/route.ts
// Отдаёт data/prices.json клиенту
// Кэш: 1 час (revalidate)

import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { resolve } from "path";

export const revalidate = 3600; // 1 час

export async function GET() {
  try {
    const filePath = resolve(process.cwd(), "data", "prices.json");
    const raw = readFileSync(filePath, "utf-8");
    const prices = JSON.parse(raw);
    return NextResponse.json(prices);
  } catch {
    return NextResponse.json({ error: "prices not found" }, { status: 404 });
  }
}
