const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'none'; " +
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' https://www.virustotal.com https://*.virustotal.com; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              "img-src 'self' data: https: https://*.virustotal.com https://www.virustotal.com https://*.google.com https://*.googlesyndication.com; " +
              "font-src 'self' data: https://fonts.gstatic.com; " +
              "connect-src 'self' https://www.virustotal.com https://api.virustotal.com https://*.virustotal.com https://safebrowsing.googleapis.com; " +
              "frame-src https://www.virustotal.com https://*.virustotal.com; " +
              "upgrade-insecure-requests;"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};
