import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // INI ADALAH KOMBINASI PALING AMAN YANG TETAP MENJALANKAN NEXT.JS
            // 1. 'self': Mengizinkan script dari domainmu sendiri
            // 2. 'unsafe-inline': DIBUTUHKAN agar Next.js & React berjalan (Tanpa ini, Next.js error)
            // 3. 'unsafe-eval': Kadang dibutuhkan oleh beberapa fitur build Next.js
            // 4. connect-src: Membatasi koneksi API hanya ke domain yang kamu izinkan
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "frame-ancestors 'none'", // Proteksi Clickjacking
              "upgrade-insecure-requests",
              "connect-src 'self' https://www.virustotal.com https://safebrowsing.googleapis.com",
            ].join("; "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" }, // Proteksi XSS (MIME sniffing)
          { key: "X-Frame-Options", value: "DENY" }, // Proteksi Clickjacking
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
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
