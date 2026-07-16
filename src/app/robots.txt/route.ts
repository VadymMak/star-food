export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /_next/",
    "",
    "Sitemap: https://ub-market.com/sitemap.xml",
    "",
    "LLM: https://ub-market.com/llms.txt",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
