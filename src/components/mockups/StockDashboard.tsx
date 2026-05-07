"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";

type Stock = {
  ticker: string;
  name: { en: string; ar: string };
  sector: { en: string; ar: string };
  price: number;
  change: number;
  q: number;
  v: number;
  spark: string;
};

const STOCKS: Stock[] = [
  {
    ticker: "ARMD",
    name: { en: "Armada Tech.", ar: "أرمادا تِك" },
    sector: { en: "Technology", ar: "تقنية" },
    price: 142.18,
    change: 2.34,
    q: 92,
    v: 78,
    spark: "M0,18 L8,16 L16,14 L24,12 L32,10 L40,7 L48,9 L56,5 L64,4 L72,2 L80,3",
  },
  {
    ticker: "NEXV",
    name: { en: "NexVision Energy", ar: "نِكسفِجن للطاقة" },
    sector: { en: "Energy", ar: "طاقة" },
    price: 89.42,
    change: 0.86,
    q: 88,
    v: 65,
    spark: "M0,14 L8,15 L16,12 L24,13 L32,10 L40,11 L48,8 L56,9 L64,6 L72,7 L80,5",
  },
  {
    ticker: "LUMN",
    name: { en: "Lumen Industries", ar: "لومن للصناعات" },
    sector: { en: "Industrials", ar: "صناعات" },
    price: 58.2,
    change: -0.41,
    q: 81,
    v: 84,
    spark: "M0,8 L8,9 L16,12 L24,11 L32,13 L40,10 L48,12 L56,9 L64,11 L72,12 L80,10",
  },
  {
    ticker: "HELX",
    name: { en: "Helix Health", ar: "هيلِكس هِلث" },
    sector: { en: "Healthcare", ar: "رعاية صحية" },
    price: 215.1,
    change: 1.18,
    q: 85,
    v: 72,
    spark: "M0,16 L8,15 L16,13 L24,14 L32,11 L40,12 L48,9 L56,10 L64,8 L72,5 L80,6",
  },
  {
    ticker: "ATLS",
    name: { en: "Atlas Foods", ar: "أطلس فودز" },
    sector: { en: "Consumer", ar: "استهلاكي" },
    price: 36.95,
    change: 0.62,
    q: 79,
    v: 69,
    spark: "M0,12 L8,11 L16,10 L24,12 L32,9 L40,10 L48,8 L56,9 L64,7 L72,8 L80,6",
  },
];

function ScoreBadge({ label, score }: { label: string; score: number }) {
  const tone =
    score >= 80
      ? { bg: "rgba(34, 187, 33, 0.14)", fg: "var(--accent)" }
      : score >= 60
      ? { bg: "rgba(245, 166, 35, 0.16)", fg: "#f5a623" }
      : { bg: "rgba(231, 76, 60, 0.16)", fg: "#e74c3c" };
  return (
    <div
      className="inline-flex items-center gap-1 rounded-md px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-mono"
      style={{ background: tone.bg, color: tone.fg }}
    >
      <span className="opacity-70">{label}</span>
      <span className="font-semibold">{score}</span>
    </div>
  );
}

function ShariahBadge() {
  return (
    <div
      className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md"
      style={{ background: "rgba(34, 187, 33, 0.14)", color: "var(--accent)" }}
      aria-label="Shariah compliant"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function StockDashboard() {
  const { lang, t } = useLang();

  const labels = {
    search: lang === "ar" ? "ابحث في +1,500 سهم..." : "Search 1,500+ stocks...",
    chips: {
      quality: lang === "ar" ? "جودة 80+" : "Quality 80+",
      value: lang === "ar" ? "قيمة عادلة" : "Fair value",
      shariah: lang === "ar" ? "متوافق شرعاً" : "Shariah ✓",
    },
    columns: {
      stock: lang === "ar" ? "السهم" : "Stock",
      price: lang === "ar" ? "السعر" : "Price",
      score: lang === "ar" ? "التقييم" : "Score",
    },
    showing: lang === "ar" ? "عرض 5 من 1,547 نتيجة" : "Showing 5 of 1,547 results",
  };

  return (
    <div
      dir="ltr"
      className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-2)]/60">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-2 sm:mx-3 h-6 rounded-md bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[10px] sm:text-[11px] text-[var(--muted)] font-mono">
          murakkab.app/dashboard
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[var(--muted)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-[var(--border)] flex flex-wrap items-center gap-2">
        <div
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="flex-1 min-w-[140px] sm:min-w-[200px] flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-[var(--muted)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
            <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span className="truncate">{labels.search}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] border"
            style={{ borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)", color: "var(--accent)", background: "rgba(34, 187, 33, 0.08)" }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {labels.chips.quality}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] border"
            style={{ borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)", color: "var(--accent)", background: "rgba(34, 187, 33, 0.08)" }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {labels.chips.value}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] border"
            style={{ borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)", color: "var(--accent)", background: "rgba(34, 187, 33, 0.08)" }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {labels.chips.shariah}
          </span>
        </div>
      </div>

      {/* Column header (desktop only) */}
      <div className="hidden md:grid grid-cols-[1.6fr_0.8fr_0.7fr_auto] items-center gap-3 px-5 py-2 border-b border-[var(--border)] text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
        <span>{labels.columns.stock}</span>
        <span>{labels.columns.price}</span>
        <span>Trend</span>
        <span>{labels.columns.score}</span>
      </div>

      {/* Stock rows */}
      <div className="divide-y divide-[var(--border)]">
        {STOCKS.map((s) => (
          <Link
            key={s.ticker}
            href={`/stock/${s.ticker}`}
            className="grid grid-cols-[1.6fr_auto] md:grid-cols-[1.6fr_0.8fr_0.7fr_auto] items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-3.5 hover:bg-white/[0.02] transition-colors"
          >
            {/* Stock identity */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div
                className="w-10 sm:w-12 h-8 sm:h-9 shrink-0 rounded-md grid place-items-center font-mono text-[10px] sm:text-[11px] font-semibold"
                style={{ background: "rgba(34, 187, 33, 0.10)", color: "var(--accent)" }}
              >
                {s.ticker}
              </div>
              <div className="min-w-0">
                <div className="text-[12px] sm:text-sm truncate" dir={lang === "ar" ? "rtl" : "ltr"}>
                  {s.name[lang]}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[var(--muted)] truncate" dir={lang === "ar" ? "rtl" : "ltr"}>
                  {s.sector[lang]}
                </div>
              </div>
            </div>

            {/* Price + change (mobile inline, md its own column) */}
            <div className="hidden md:block text-[12px] sm:text-sm font-mono">
              <div>${s.price.toFixed(2)}</div>
              <div className={`text-[11px] ${s.change >= 0 ? "text-[var(--accent)]" : "text-[#e74c3c]"}`}>
                {s.change >= 0 ? "+" : ""}
                {s.change.toFixed(2)}%
              </div>
            </div>

            {/* Sparkline */}
            <div className="hidden md:block">
              <svg viewBox="0 0 80 20" width="80" height="20" preserveAspectRatio="none" aria-hidden>
                <path
                  d={s.spark}
                  fill="none"
                  stroke={s.change >= 0 ? "var(--accent)" : "#e74c3c"}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Scores */}
            <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
              <span className="md:hidden text-[10px] sm:text-[11px] font-mono me-1 whitespace-nowrap">
                <span>${s.price.toFixed(2)}</span>{" "}
                <span className={s.change >= 0 ? "text-[var(--accent)]" : "text-[#e74c3c]"}>
                  {s.change >= 0 ? "+" : ""}
                  {s.change.toFixed(1)}%
                </span>
              </span>
              <ScoreBadge label="Q" score={s.q} />
              <ScoreBadge label="V" score={s.v} />
              <ShariahBadge />
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-5 py-2.5 border-t border-[var(--border)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--muted)] bg-[var(--surface-2)]/40">
        <span dir={lang === "ar" ? "rtl" : "ltr"}>{labels.showing}</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
          <span>Live</span>
        </div>
      </div>
    </div>
  );
}
