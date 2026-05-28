"use client";
import { useState, useEffect } from "react";

export default function SecurityPage() {
  const [urlInput, setUrlInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [statusText, setStatusText] = useState("SCAN LINK SEKARANG");

  const [manualVideo, setManualVideo] = useState("tzYhNOu7Bdg"); // Video default saat pertama buka
  // 1. Simpan ID video tadi di variable atau state
  const videoId = "tzYhNOu7Bdg";

  const handleManualVideo = (id: string) => {
    setManualVideo(id);
    // Scroll otomatis ke video agar terlihat di HP
    const element = document.getElementById("video-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      const messages = [
        "INITIALIZING ARTUP NEURAL CORE...",
        "DECRYPTING PACKET OBFUSCATION...",
        "SCANNING DATABASE REPUTATION...",
        "EXTRACTING HEURISTIC PATTERNS...",
        "CALCULATING RISK PROBABILITY...",
        "FINALIZING SECURITY INTEGRITY...",
      ];
      let i = 0;
      setStatusText(messages[0]);
      interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setStatusText(messages[i]);
      }, 3000);
    } else {
      setStatusText("SCAN LINK SEKARANG!");
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleCekKeamanan = async () => {
    if (!urlInput) return;

    // --- 2. LOGIKA SCAn (Tetap Jalan) ---
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Gagal menyambung ke Artup Infrastructure" });
    } finally {
      setLoading(false);
      setStatusText("SCAN LINK SEKARANG");
    }
  };

  const finalStatus = result?.finalStatus;
  const isPublicHosting = result?.details?.isPublicHosting; // Ambil data dari backend

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans selection:bg-red-600/40 relative overflow-x-hidden">
      {/* --- SIDEBAR/DOCK MEDSOS (Responsive) --- */}
      




      <aside className="fixed bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-1/2 md:right-4 md:left-auto z-50 flex flex-row md:flex-col gap-3 bg-zinc-900/80 md:bg-transparent p-3 md:p-0 rounded-full md:rounded-none border border-zinc-800 md:border-none backdrop-blur-md md:backdrop-blur-none shadow-2xl md:shadow-none">
        <a
          href="https://humanizer-638.pages.dev/"
          target="_blank"
          rel="noopener noreferrer" // Tambahkan ini agar aman
          className="p-3 bg-blue-700 rounded-full hover:scale-110 transition-all text-xs font-black"
        >
          Humanizer AI
        </a>
        <a
          href="https://converter-artup.pages.dev/"
          target="_blank"
          rel="noopener noreferrer" // Tambahkan ini agar aman
          className="p-3 bg-pink-700 rounded-full hover:scale-110 transition-all text-xs font-black"
        >
          foto converter
        </a>
        <a
          href="https://www.tiktok.com/@artupstd?lang=id-ID"
          target="_blank"
          rel="noopener noreferrer" // Tambahkan ini agar aman
          className=" p-3 bg-red-600 rounded-full hover:scale-110 transition-all text-xs font-black"
        >
          My TikTok
        </a>
      </aside>

      



      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-blue-600 mb-3 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)] uppercase">
            🛡️ ARTUP SECURITY
          </h1>
          <p className="text-zinc-500 text-[10px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] px-4">
            Multi-Engine Real-time Verification System
          </p>
        </header>

        <div className="bg-zinc-900/40 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-800/50 shadow-2xl mb-8 backdrop-blur-xl">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Tempel link bank, e-commerce, atau link mencurigakan..."
            className="w-full p-4 md:p-5 bg-black/60 border border-zinc-800 rounded-2xl mb-4 focus:ring-2 focus:ring-red-600 outline-none transition-all font-medium text-zinc-300 placeholder:text-zinc-700 text-sm md:text-base"
          />
          <button
            onClick={handleCekKeamanan}
            disabled={loading}
            className={`w-full py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl tracking-tight transition-all active:scale-95 ${
              loading
                ? "bg-zinc-800 text-red-500 cursor-not-allowed animate-pulse"
                : "bg-red-700 hover:bg-red-600 shadow-[0_10px_40px_rgba(185,28,28,0.2)] text-white"
            }`}
          >
            {loading ? statusText : "LINK / WEBSITE SCANNER"}
          </button>
        </div>

        {result && !result.error && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div
              className={`p-6 md:p-10 rounded-[2.5rem] border-2 md:border-4 transition-all duration-700 shadow-2xl ${
                finalStatus === "BAHAYA"
                  ? "bg-red-950/80 border-red-600 shadow-[0_0_60px_rgba(220,38,38,0.2)]"
                  : finalStatus === "Hati-hati"
                    ? "bg-orange-950/80 border-orange-600 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                    : "bg-zinc-900/90 border-green-600 shadow-[0_0_40_rgba(34,197,94,0.15)]"
              }`}
            >
              <h2 className="text-2xl md:text-4xl font-black italic mb-6 md:mb-10 leading-tight uppercase tracking-tighter text-center">
                {finalStatus === "BAHAYA"
                  ? "🚨 WEBSITE BERBAHAYA"
                  : finalStatus === "HATI-HATI"
                    ? "⚠️ PERLU KEWASPADAAN"
                    : finalStatus === "AMAN"
                      ? "✅ WEBSITE AMAN"
                      : "🛡️ AMAN TERVERIFIKASI"}
              </h2>

              <div className="bg-black/60 backdrop-blur-md p-5 md:p-7 rounded-3xl space-y-5 border border-white/5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 border-b border-white/5 pb-4">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">
                    GLOBAL ENGINE:
                  </span>
                  <span
                    className={`font-black tracking-widest text-xs md:text-sm ${
                      result.googleStatus === "BAHAYA"
                        ? "text-red-500"
                        : result.googleStatus === "ADA CELAH"
                          ? "text-orange-500"
                          : "text-green-500"
                    }`}
                  >
                    {result.googleStatus === "BAHAYA"
                      ? "⚠️ BLACKLISTED"
                      : result.googleStatus === "ADA CELAH"
                        ? "❓ BELUM TERVERIFIKASI"
                        : "✔️  VERIFIED"}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 border-b border-white/5 pb-4">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">
                    VIRUS ENGINE:
                  </span>
                  <span
                    className={`font-black tracking-widest text-xs md:text-sm ${result.virusTotal === "BAHAYA" ? "text-red-500" : result.virusTotal === "TIDAK ADA DATA" ? "text-orange-500" : "text-green-500"}`}
                  >
                    {result.virusTotal === "BAHAYA"
                      ? `⚠️ DETECTED (${result.vtDetails?.malicious || 0} Engines)`
                      : result.virusTotal === "TIDAK ADA DATA"
                        ? "NO RECORD"
                        : "✔️ NO VIRUS"}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">
                    ARTUP LOGIC:
                  </span>

                  {result.heuristicFlags?.length > 0 ? (
                    result.heuristicFlags.map((flag: string, index: number) => (
                      <span
                        key={index}
                        className="text-orange-400 text-xs font-bold"
                      >
                        ⚠️ {flag}
                      </span>
                    ))
                  ) : (
                    <span className="text-green-500 text-xs font-bold">
                      🛡️ Tidak ada indikator manipulasi
                    </span>
                  )}
                </div>

                <div className="border-b border-white/5 pb-4">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">
                    TRUST SCORE
                  </span>

                  <div className="mt-2">
                    <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${result.trustScore}%`,
                        }}
                        className={`h-full ${
                          result.trustScore < 50
                            ? "bg-red-500"
                            : result.trustScore < 90
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }`}
                      />
                    </div>

                    <p className="mt-2 font-black">{result.trustScore}/100</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center px-2">
                <p className="font-black text-[10px] md:text-xs uppercase tracking-widest leading-relaxed opacity-90 text-zinc-200">
                  <p className="font-black text-[10px] md:text-xs uppercase tracking-widest leading-relaxed opacity-90 text-zinc-200">
                    {result.userMessage}
                  </p>
                  
                </p>
              </div>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="p-5 bg-red-600/10 border border-red-600/50 rounded-2xl text-center text-red-500 text-xs font-bold uppercase tracking-widest animate-bounce">
            {result.error}
          </div>
        )}
      </div>

      

      <footer className="mt-20 text-center pb-10">
        <p className="text-[9px] text-zinc-800 font-black uppercase tracking-[0.5em]">
          ARTUP STUDIO Security Division &copy; 2026
        </p>
      </footer>
    </div>
  );
}
