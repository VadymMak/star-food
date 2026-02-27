// src/lib/seo-stats.ts
// Google Search Console + PageSpeed Insights APIs
// Uses service account JWT auth (jose library)

import { SignJWT, importPKCS8 } from "jose";

//Commit for update
// ── Google Auth via Service Account ──

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
  project_id: string;
}

function getServiceAccountKey(): ServiceAccountKey | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY");
    return null;
  }
}

async function getGoogleAccessToken(scopes: string[]): Promise<string | null> {
  const sa = getServiceAccountKey();
  if (!sa) return null;

  const now = Math.floor(Date.now() / 1000);
  const privateKey = await importPKCS8(sa.private_key, "RS256");

  const jwt = await new SignJWT({
    iss: sa.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    console.error("Google OAuth error:", await res.text());
    return null;
  }

  const data = await res.json();
  return data.access_token;
}

// ── Search Console API ──

interface SearchConsoleData {
  impressions: number;
  clicks: number;
  ctr: string;
  position: string;
  topQueries: {
    query: string;
    clicks: number;
    impressions: number;
    position: string;
  }[];
  topPages: { page: string; clicks: number; impressions: number }[];
}

export async function getSearchConsoleData(
  days: number = 7,
): Promise<SearchConsoleData | null> {
  const token = await getGoogleAccessToken([
    "https://www.googleapis.com/auth/webmasters.readonly",
  ]);
  if (!token) return null;

  const siteUrl = "https://ub-market.com";
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  // Overall stats
  const overallRes = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: [],
        rowLimit: 1,
      }),
    },
  );

  let impressions = 0,
    clicks = 0,
    ctr = "0%",
    position = "0";

  if (overallRes.ok) {
    const data = await overallRes.json();
    if (data.rows && data.rows.length > 0) {
      const row = data.rows[0];
      impressions = row.impressions || 0;
      clicks = row.clicks || 0;
      ctr = ((row.ctr || 0) * 100).toFixed(1) + "%";
      position = (row.position || 0).toFixed(1);
    }
  }

  // Top queries
  const queriesRes = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ["query"],
        rowLimit: 10,
        orderBy: "clicks",
      }),
    },
  );

  const topQueries: SearchConsoleData["topQueries"] = [];
  if (queriesRes.ok) {
    const data = await queriesRes.json();
    for (const row of data.rows || []) {
      topQueries.push({
        query: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
        position: (row.position || 0).toFixed(1),
      });
    }
  }

  // Top pages
  const pagesRes = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ["page"],
        rowLimit: 5,
        orderBy: "clicks",
      }),
    },
  );

  const topPages: SearchConsoleData["topPages"] = [];
  if (pagesRes.ok) {
    const data = await pagesRes.json();
    for (const row of data.rows || []) {
      const page = row.keys[0].replace("https://ub-market.com", "");
      topPages.push({
        page: page || "/",
        clicks: row.clicks,
        impressions: row.impressions,
      });
    }
  }

  return { impressions, clicks, ctr, position, topQueries, topPages };
}

// ── PageSpeed Insights API ──

interface PageSpeedData {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  lcp: string;
  cls: string;
}

export async function getPageSpeedData(): Promise<PageSpeedData | null> {
  try {
    const url = encodeURIComponent("https://ub-market.com/en");
    const apiKey = process.env.GOOGLE_API_KEY || "";
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=desktop&category=performance&category=seo${apiKey ? `&key=${apiKey}` : ""}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const data = await res.json();
    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;

    return {
      performance: Math.round((cats?.performance?.score || 0) * 100),
      seo: Math.round((cats?.seo?.score || 0) * 100),
      accessibility: Math.round((cats?.accessibility?.score || 0) * 100),
      bestPractices: Math.round((cats?.["best-practices"]?.score || 0) * 100),
      lcp: audits?.["largest-contentful-paint"]?.displayValue || "N/A",
      cls: audits?.["cumulative-layout-shift"]?.displayValue || "N/A",
    };
  } catch (err) {
    console.error("PageSpeed error:", err);
    return null;
  }
}

// ── GA4 Data API (optional — enable when ready) ──

interface GA4Data {
  users: number;
  sessions: number;
  pageViews: number;
  topCountries: { country: string; users: number }[];
}

export async function getGA4Data(days: number = 7): Promise<GA4Data | null> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) return null;

  const token = await getGoogleAccessToken([
    "https://www.googleapis.com/auth/analytics.readonly",
  ]);
  if (!token) return null;

  try {
    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
          ],
          dimensions: [{ name: "country" }],
          orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
          limit: 10,
        }),
      },
    );

    if (!res.ok) return null;
    const data = await res.json();

    let users = 0,
      sessions = 0,
      pageViews = 0;
    const topCountries: GA4Data["topCountries"] = [];

    for (const row of data.rows || []) {
      const u = parseInt(row.metricValues[0].value) || 0;
      const s = parseInt(row.metricValues[1].value) || 0;
      const pv = parseInt(row.metricValues[2].value) || 0;
      users += u;
      sessions += s;
      pageViews += pv;
      if (topCountries.length < 5) {
        topCountries.push({ country: row.dimensionValues[0].value, users: u });
      }
    }

    return { users, sessions, pageViews, topCountries };
  } catch (err) {
    console.error("GA4 error:", err);
    return null;
  }
}

// ── Format SEO Report for Telegram ──

function scoreEmoji(score: number): string {
  if (score >= 90) return "🟢";
  if (score >= 50) return "🟡";
  return "🔴";
}

export async function collectAndFormatSEOReport(): Promise<string> {
  const today = new Date().toISOString().split("T")[0];
  const lines: string[] = [`📊 <b>SEO Report — ${today}</b>`, ""];

  // Search Console
  const gsc = await getSearchConsoleData(7);
  if (gsc) {
    lines.push("🔍 <b>Google Search (7 days)</b>");
    lines.push(`  👁 Impressions: <b>${gsc.impressions.toLocaleString()}</b>`);
    lines.push(`  👆 Clicks: <b>${gsc.clicks}</b>`);
    lines.push(`  📈 CTR: <b>${gsc.ctr}</b>`);
    lines.push(`  📍 Avg Position: <b>${gsc.position}</b>`);

    if (gsc.topQueries.length > 0) {
      lines.push("");
      lines.push("  🏆 <b>Top Queries:</b>");
      gsc.topQueries.slice(0, 5).forEach((q, i) => {
        lines.push(
          `  ${i + 1}. "${q.query}" — ${q.clicks} clicks, pos ${q.position}`,
        );
      });
    }

    if (gsc.topPages.length > 0) {
      lines.push("");
      lines.push("  📄 <b>Top Pages:</b>");
      gsc.topPages.slice(0, 5).forEach((p) => {
        lines.push(`  • ${p.page} — ${p.clicks} clicks, ${p.impressions} impr`);
      });
    }
  } else {
    lines.push("🔍 Search Console: ⚠️ No data (check service account access)");
  }

  lines.push("");

  // GA4 (optional)
  const ga4 = await getGA4Data(7);
  if (ga4) {
    lines.push("📈 <b>Google Analytics (7 days)</b>");
    lines.push(`  👥 Users: <b>${ga4.users}</b>`);
    lines.push(`  🔄 Sessions: <b>${ga4.sessions}</b>`);
    lines.push(`  📄 Page Views: <b>${ga4.pageViews}</b>`);

    if (ga4.topCountries.length > 0) {
      lines.push("");
      lines.push("  🌍 <b>Top Countries:</b>");
      ga4.topCountries.forEach((c) => {
        lines.push(`  • ${c.country}: ${c.users} users`);
      });
    }
    lines.push("");
  }

  // PageSpeed
  const ps = await getPageSpeedData();
  if (ps) {
    lines.push("⚡ <b>PageSpeed (Desktop)</b>");
    lines.push(
      `  ${scoreEmoji(ps.performance)} Performance: <b>${ps.performance}</b>`,
    );
    lines.push(`  ${scoreEmoji(ps.seo)} SEO: <b>${ps.seo}</b>`);
    lines.push(
      `  ${scoreEmoji(ps.accessibility)} Accessibility: <b>${ps.accessibility}</b>`,
    );
    lines.push(
      `  ${scoreEmoji(ps.bestPractices)} Best Practices: <b>${ps.bestPractices}</b>`,
    );
    lines.push(`  ⏱ LCP: ${ps.lcp} | CLS: ${ps.cls}`);
  } else {
    lines.push("⚡ PageSpeed: ⚠️ Failed to fetch");
  }

  lines.push("");
  lines.push(
    `🔗 <a href="https://search.google.com/search-console?resource_id=https://ub-market.com">Open Search Console</a>`,
  );

  return lines.join("\n");
}
