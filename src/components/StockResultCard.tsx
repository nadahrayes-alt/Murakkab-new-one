"use client";

import Link from "next/link";
import type { StockData } from "@/lib/stockData";
import { useWatchlist } from "@/lib/WatchlistProvider";
import { useLang } from "@/lib/LanguageProvider";

const TONE = {
  good: { bg: "color-mix(in oklab, var(--accent) 12%, transparent)", fg: "var(--accent)" },
  neutral: { bg: "color-mix(in srgb, #f5a623 14%, transparent)", fg: "#f5a623" },
  bad: { bg: "color-mix(in srgb, #e74c3c 14%, transparent)", fg: "#e74c3c" },
};

export default function StockResultCard({ stock }: { stock: StockData }) {
  const { isWatched, toggle } = useWatchlist();
  const { t, lang } = useLang();
  const starred = isWatched(stock.ticker);

  const isPositive = stock.change >= 0;
  const valuationTone: keyof typeof TONE = stock.v === "fair" ? "good" : "neutral";
  const qualityTone: keyof typeof TONE = stock.q >= 80 ? "good" : stock.q >= 65 ? "neutral" : "bad";
  const shariahTone: keyof typeof TONE = stock.shariah === "compliant" ? "good" : stock.shariah === "doubtful" ? "neutral" : "bad";

  return (
    <Link
      href={`/stock/${stock.ticker}`}
      className="group relative block rounded-2xl border border-[var(--border)] p-4 sm:p-5 transition-colors"
      style={{ background: "var(--surface)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 28%, transparent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(stock.ticker); }}
        className="absolute top-3 start-3 grid place-items-center w-7 h-7 rounded-full transition-colors"
        style={{
          background: starred ? "color-mix(in oklab, var(--accent) 14%, transparent)" : "transparent",
          color: starred ? "var(--accent)" : "var(--muted)",
        }}
        aria-label="Toggle watchlist"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill={starred ? "currentColor" : "none"} aria-hidden>
          <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-start justify-end gap-2.5">
        <div className="text-end">
          <div className="font-mono text-[13px] font-semibold" dir="ltr">{stock.ticker}</div>
          <div className="text-[11px] text-[var(--muted)] truncate max-w-[140px]" dir={lang === "ar" ? "rtl" : "ltr"}>
            {stock.name[lang]}
          </div>
        </div>
        <span
          className="grid place-items-center w-9 h-9 rounded-md font-mono text-[10px] font-semibold shrink-0"
          style={{ background: "color-mix(in oklab, var(--accent) 14%, transparent)", color: "var(--accent)" }}
          dir="ltr"
        >
          {stock.ticker.slice(0, 2)}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2" dir="ltr">
        <span className="font-display text-2xl sm:text-3xl">${stock.price.toFixed(2)}</span>
        <span
          className="text-[12px] font-mono"
          style={{ color: isPositive ? "var(--accent)" : "#e74c3c" }}
        >
          {isPositive ? "+" : ""}{stock.change.toFixed(2)}%
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px]"
          style={{ background: TONE[valuationTone].bg, color: TONE[valuationTone].fg }}
        >
          {t.search.resultLabels.valuation}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px]"
          style={{ background: TONE[qualityTone].bg, color: TONE[qualityTone].fg }}
        >
          {t.search.resultLabels.quality} <span className="font-mono opacity-80">{stock.q}</span>
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px]"
          style={{ background: TONE[shariahTone].bg, color: TONE[shariahTone].fg }}
        >
          {t.search.resultLabels.shariah}
          {stock.shariah === "compliant" && (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </div>
    </Link>
  );
}
