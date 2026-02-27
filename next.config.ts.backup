import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 301 Redirects — URLs without locale → /en/ versions
  // Google transfers 90-99% SEO weight through 301
  async redirects() {
    return [
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/products", destination: "/en/products", permanent: true },
      {
        source: "/products/:slug",
        destination: "/en/products/:slug",
        permanent: true,
      },
      { source: "/blog", destination: "/en/blog", permanent: true },
      { source: "/blog/:slug", destination: "/en/blog/:slug", permanent: true },
      { source: "/contacts", destination: "/en/contacts", permanent: true },
      {
        source: "/brands/:path*",
        destination: "/en/brands/:path*",
        permanent: true,
      },
      { source: "/partners", destination: "/en/partners", permanent: true },
      { source: "/quote", destination: "/en/quote", permanent: true },
      {
        source: "/services/:path*",
        destination: "/en/services/:path*",
        permanent: true,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
