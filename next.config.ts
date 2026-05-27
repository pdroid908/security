import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Optimasi Gambar untuk Cloudflare (Opsional)
  images: {
    unoptimized: true, // Cloudflare Pages lebih stabil dengan ini untuk export statis
  },

  // 2. Proteksi Keamanan Full Power
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Content Security Policy (CSP) untuk XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://*.monetag.com", // Tambahkan Monetag agar iklan tetap muncul
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "frame-ancestors 'none'", // Anti-Clickjacking
              "upgrade-insecure-requests", // Paksa HTTPS
            ].join("; "),
          },
          // Proteksi Sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Anti-Clickjacking tambahan
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // HSTS (HTTP Strict Transport Security)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
