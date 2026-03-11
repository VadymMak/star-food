// src/app/api/prices/route.ts
// Fetches IMF sunflower oil benchmark price from FRED (St. Louis Fed)
// Series: PSUNOUSDM — Global price of Sunflower Oil, USD per Metric Ton
// Free API, updates monthly, cached 24h on server

import { NextResponse } from "next/server";

const FRED_API_KEY = process.env.FRED_API_KEY;
const SERIES_ID = "PSUNOUSDM"; // IMF Sunflower Oil benchmark

export const revalidate = 86400; // cache 24 hours (Next.js ISR)

export async function GET() {
  // If no API key configured — return fallback data
  if (!FRED_API_KEY) {
    return NextResponse.json(
      {
        price: null,
        date: null,
        source: "IMF via FRED",
        error: "FRED_API_KEY not configured",
        fallback: true,
      },
      { status: 200 },
    );
  }

  try {
    const url = new URL("https://api.stlouisfed.org/fred/series/observations");
    url.searchParams.set("series_id", SERIES_ID);
    url.searchParams.set("api_key", FRED_API_KEY);
    url.searchParams.set("sort_order", "desc");
    url.searchParams.set("limit", "1");
    url.searchParams.set("file_type", "json");

    const res = await fetch(url.toString(), {
      next: { revalidate: 86400 }, // cache 24h
    });

    if (!res.ok) {
      throw new Error(`FRED API error: ${res.status}`);
    }

    const data = await res.json();
    const observation = data.observations?.[0];

    if (!observation || observation.value === ".") {
      throw new Error("No data from FRED");
    }

    const price = parseFloat(observation.value);
    // Show current fetch date (FRED data updates monthly with ~6 week lag)
    const formatted = new Date().toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });

    return NextResponse.json(
      {
        price: Math.round(price), // e.g. 1786
        date: formatted, // e.g. "Jan 2026"
        source: "IMF via FRED",
        fallback: false,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=3600",
        },
      },
    );
  } catch (error) {
    console.error("FRED API fetch error:", error);

    // Return graceful fallback — site won't break
    return NextResponse.json(
      {
        price: null,
        date: null,
        source: "IMF via FRED",
        error: "Failed to fetch",
        fallback: true,
      },
      { status: 200 },
    );
  }
}
