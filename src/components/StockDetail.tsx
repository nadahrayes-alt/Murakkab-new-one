"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/LanguageProvider";
import { useWatchlist } from "@/lib/WatchlistProvider";
import { Reveal } from "./Parallax";

const PLACEHOLDER_COMPANIES: Record<string, { name: { en: string; ar: string }; sector: { en: string; ar: string }; price: number; change: number }> = {
  ARMD: { name: { en: "Armada Tech.", ar: "أرمادا تِك" }, sector: { en: "Technology", ar: "تقنية" }, price: 142.18, change: 2.34 },
  NEXV: { name: { en: "NexVision Energy", ar: "نِكسفِجن للطاقة" }, sector: { en: "Energy", ar: "طاقة" }, price: 89.42, change: 0.86 },
  LUMN: { name: { en: "Lumen Industries", ar: "لومن للصناعات" }, sector: { en: "Industrials", ar: "صناعات" }, price: 58.20, change: -0.41 },
  HELX: { name: { en: "Helix Health", ar: "هيلِكس هِلث" }, sector: { en: "Healthcare", ar: "رعاية صحية" }, price: 215.10, change: 1.18 },
  ATLS: { name: { en: "Atlas Foods", ar: "أطلس فودز" }, sector: { en: "Consumer", ar: "استهلاكي" }, price: 36.95, change: 0.62 },
};

const FALLBACK = {
  name: { en: "Sample Co.", ar: "شركة تجريبية" },
  sector: { en: "Sample sector", ar: "قطاع تجريبي" },
  price: 124.56,
  change: 1.42,
};

const TIME_RANGES = ["1D", "1W", "1M", "3M", "1Y", "5Y", "ALL"] as const;
type TimeRange = (typeof TIME_RANGES)[number];

// Pre-computed paths for each time range — placeholder data
const PRICE_PATHS: Record<TimeRange, string> = {
  "1D": "M0,55 L50,52 L100,58 L150,50 L200,45 L250,48 L300,42 L350,40 L400,38 L450,35 L500,30 L550,32 L600,28",
  "1W": "M0,60 L60,55 L120,50 L180,52 L240,45 L300,48 L360,40 L420,42 L480,35 L540,30 L600,28",
  "1M": "M0,70 L40,65 L80,68 L120,60 L160,55 L200,58 L240,50 L280,45 L320,48 L360,40 L400,42 L440,35 L480,32 L520,30 L560,28 L600,26",
  "3M": "M0,80 L40,75 L80,70 L120,72 L160,65 L200,60 L240,55 L280,58 L320,50 L360,52 L400,45 L440,40 L480,35 L520,32 L560,30 L600,28",
  "1Y": "M0,90 L40,85 L80,82 L120,78 L160,75 L200,70 L240,65 L280,68 L320,60 L360,55 L400,50 L440,52 L480,45 L520,42 L560,38 L600,32",
  "5Y": "M0,95 L40,92 L80,88 L120,80 L160,75 L200,70 L240,72 L280,65 L320,55 L360,60 L400,50 L440,42 L480,38 L520,35 L560,30 L600,25",
  ALL: "M0,98 L40,95 L80,92 L120,88 L160,85 L200,80 L240,75 L280,72 L320,65 L360,55 L400,50 L440,45 L480,38 L520,32 L560,28 L600,22",
};

function ChangePill({ value }: { value: number }) {
  const positive = value >= 0;
  const color = positive ? "var(--accent)" : "#e74c3c";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-mono"
      style={{
        background: positive ? "color-mix(in oklab, var(--accent) 14%, transparent)" : "color-mix(in srgb, #e74c3c 14%, transparent)",
        color,
      }}
      dir="ltr"
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden style={{ transform: positive ? "none" : "rotate(180deg)" }}>
        <path d="M12 5l-7 8h4v6h6v-6h4l-7-8z" fill="currentColor" />
      </svg>
      {positive ? "+" : ""}{value.toFixed(2)}%
    </span>
  );
}

function ScoreBadge({ label, score, tone }: { label: string; score?: number; tone: "good" | "neutral" | "bad" }) {
  const map = {
    good: { bg: "color-mix(in oklab, var(--accent) 14%, transparent)", fg: "var(--accent)" },
    neutral: { bg: "color-mix(in srgb, #f5a623 14%, transparent)", fg: "#f5a623" },
    bad: { bg: "color-mix(in srgb, #e74c3c 14%, transparent)", fg: "#e74c3c" },
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px]"
      style={{ background: map.bg, color: map.fg, border: `1px solid ${map.fg}25` }}
    >
      <span className="font-medium">{label}</span>
      {score !== undefined && <span className="font-mono opacity-90">{score}</span>}
    </span>
  );
}

function PriceChart({ range, change }: { range: TimeRange; change: number }) {
  const path = PRICE_PATHS[range];
  const isPositive = change >= 0;
  const stroke = isPositive ? "var(--accent)" : "#e74c3c";
  const gradId = `chart-grad-${range}-${isPositive ? "up" : "dn"}`;

  return (
    <div className="relative">
      <svg viewBox="0 0 600 110" className="w-full h-56 sm:h-72" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
          <pattern id="chart-grid" width="60" height="22" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 22" fill="none" stroke="var(--border)" strokeWidth="0.4" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="600" height="110" fill="url(#chart-grid)" />
        <path d={`${path} L600,110 L0,110 Z`} fill={`url(#${gradId})`} />
        <path d={path} fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Y-axis labels (placeholder) */}
      <div className="absolute end-0 inset-y-0 w-12 flex flex-col justify-between py-2 text-[10px] font-mono text-[var(--muted)]/70 pointer-events-none">
        <span dir="ltr">$152</span>
        <span dir="ltr">$140</span>
        <span dir="ltr">$128</span>
      </div>
    </div>
  );
}

function AnalystDonut({ buy, hold, sell }: { buy: number; hold: number; sell: number }) {
  const total = buy + hold + sell;
  const C = 2 * Math.PI * 40;
  const segs = [
    { value: buy, color: "var(--accent)" },
    { value: hold, color: "#f5a623" },
    { value: sell, color: "#e74c3c" },
  ];
  let cumulative = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-32 h-32 sm:w-36 sm:h-36 -rotate-90" aria-hidden>
      <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="14" fill="none" />
      {segs.map((s, i) => {
        const len = (s.value / total) * C;
        const offset = -((cumulative / total) * C);
        cumulative += s.value;
        return (
          <circle
            key={i}
            cx="50"
            cy="50"
            r="40"
            stroke={s.color}
            strokeWidth="14"
            fill="none"
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
}

export default function StockDetail({ symbol }: { symbol: string }) {
  const { t, lang } = useLang();
  const { isWatched, toggle } = useWatchlist();
  const [range, setRange] = useState<TimeRange>("1M");
  const watchlisted = isWatched(symbol);

  const company = PLACEHOLDER_COMPANIES[symbol] ?? FALLBACK;
  const isPositive = company.change >= 0;

  const priceLabels = useMemo(() => {
    const p = company.price;
    return {
      open: (p * 0.992).toFixed(2),
      high: (p * 1.014).toFixed(2),
      low: (p * 0.987).toFixed(2),
      prevClose: (p * 0.984).toFixed(2),
    };
  }, [company.price]);

  // Placeholder analyst rating distribution
  const ratings = { buy: 18, hold: 8, sell: 3 };
  const totalAnalysts = ratings.buy + ratings.hold + ratings.sell;
  const consensus = ratings.buy / totalAnalysts >= 0.6 ? t.stock.analyst.buy : ratings.sell / totalAnalysts >= 0.5 ? t.stock.analyst.sell : t.stock.analyst.hold;
  const target = (company.price * 1.13).toFixed(2);
  const upside = (((company.price * 1.13) / company.price - 1) * 100).toFixed(1);

  // Earnings placeholder
  const earningsDate = lang === "ar" ? "12 يونيو 2026" : "Jun 12, 2026";
  const epsEstimate = "$1.84";
  const daysAway = 14;

  // Metrics
  const metrics = [
    { label: t.stock.metrics.eps, value: "$6.42" },
    { label: t.stock.metrics.pe, value: "18.4" },
    { label: t.stock.metrics.marketCap, value: "$48.2B" },
    { label: t.stock.metrics.volume, value: "12.4M" },
    { label: t.stock.metrics.week52, value: "$98.40 — $156.20" },
    { label: t.stock.metrics.debtEquity, value: "0.42" },
    { label: t.stock.metrics.revenue, value: "$12.8B" },
    { label: t.stock.metrics.grossMargin, value: "38.6%" },
    { label: t.stock.metrics.netMargin, value: "16.2%" },
    { label: t.stock.metrics.roe, value: "21.8%" },
    { label: t.stock.metrics.dividendYield, value: "1.4%" },
    { label: t.stock.metrics.beta, value: "1.12" },
  ];

  return (
    <div className="relative">
      {/* Top breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-5 pt-24 sm:pt-28 flex items-center justify-between gap-3 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{t.stock.back}</span>
          </Link>
          <span className="text-[11px] text-[var(--muted)] inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
            {t.stock.lastUpdate}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <Reveal>
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex items-start gap-4 min-w-0">
                <span
                  className="grid place-items-center w-14 h-12 sm:w-16 sm:h-14 rounded-xl font-mono text-[15px] sm:text-base font-semibold shrink-0"
                  style={{ background: "color-mix(in oklab, var(--accent) 14%, transparent)", color: "var(--accent)" }}
                  dir="ltr"
                >
                  {symbol}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-display text-2xl sm:text-3xl tracking-tight truncate">
                      {company.name[lang]}
                    </h1>
                    <span className="text-[12px] text-[var(--muted)] font-mono" dir="ltr">NYSE: {symbol}</span>
                  </div>
                  <div className="mt-1 text-[13px] text-[var(--muted)]">{company.sector[lang]}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggle(symbol)}
                className="inline-flex items-center gap-2 rounded-full border px-3.5 h-9 text-[12.5px] transition-colors"
                style={{
                  background: watchlisted ? "color-mix(in oklab, var(--accent) 12%, transparent)" : "var(--soft-bg)",
                  color: watchlisted ? "var(--accent)" : "var(--foreground)",
                  borderColor: watchlisted
                    ? "color-mix(in oklab, var(--accent) 50%, transparent)"
                    : "var(--border)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill={watchlisted ? "currentColor" : "none"} aria-hidden>
                  <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                <span>{watchlisted ? t.stock.watchlistAdded : t.stock.watchlist}</span>
              </button>
            </div>
          </Reveal>

          {/* Score badges */}
          <Reveal delay={120}>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <ScoreBadge label={t.stock.shariahCompliant} tone="good" />
              <ScoreBadge label={t.stock.highQuality} score={92} tone="good" />
              <ScoreBadge label={t.stock.fairValue} score={78} tone="neutral" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Price + chart */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="flex items-baseline gap-3" dir="ltr">
                  <span className="font-display text-5xl sm:text-6xl text-[var(--foreground)]">${company.price.toFixed(2)}</span>
                  <ChangePill value={company.change} />
                </div>
                <div className="mt-1 text-[12px] text-[var(--muted)]" dir="ltr">USD · NYSE</div>
              </div>

              {/* Time range tabs */}
              <div
                className="inline-flex items-center rounded-full border border-[var(--border)] p-0.5 text-[12px]"
                style={{ background: "var(--soft-bg)" }}
              >
                {TIME_RANGES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRange(r)}
                    className="px-2.5 sm:px-3 py-1 rounded-full transition-colors"
                    style={{
                      background: range === r ? "var(--accent)" : "transparent",
                      color: range === r ? "var(--accent-contrast)" : "var(--muted)",
                    }}
                    aria-pressed={range === r}
                  >
                    {t.stock.timeRanges[r]}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Chart */}
          <Reveal delay={120}>
            <div className="mt-6 sm:mt-7 rounded-2xl border border-[var(--border)] p-4 sm:p-5" style={{ background: "var(--surface)" }}>
              <PriceChart range={range} change={company.change} />
            </div>
          </Reveal>

          {/* Companion price metrics */}
          <Reveal delay={200}>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([
                ["open", priceLabels.open],
                ["high", priceLabels.high],
                ["low", priceLabels.low],
                ["prevClose", priceLabels.prevClose],
              ] as const).map(([key, val]) => (
                <div
                  key={key}
                  className="rounded-xl border border-[var(--border)] px-4 py-3"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {t.stock.priceLabels[key]}
                  </div>
                  <div className="mt-1 font-mono text-[15px]" dir="ltr">${val}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Analyst Ratings + Earnings */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Analyst donut */}
          <Reveal className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--border)] p-6 sm:p-7" style={{ background: "var(--surface)" }}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {t.stock.sections.analysts}
                  </span>
                </div>
                <span className="text-[11px] text-[var(--muted)]">
                  {totalAnalysts} {t.stock.analyst.analysts}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-around gap-6">
                <div className="relative shrink-0">
                  <AnalystDonut buy={ratings.buy} hold={ratings.hold} sell={ratings.sell} />
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                        {t.stock.analyst.consensus}
                      </div>
                      <div className="font-display text-xl mt-0.5" style={{ color: "var(--accent)" }}>
                        {consensus}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-[200px] space-y-3">
                  {[
                    { label: t.stock.analyst.buy, count: ratings.buy, color: "var(--accent)" },
                    { label: t.stock.analyst.hold, count: ratings.hold, color: "#f5a623" },
                    { label: t.stock.analyst.sell, count: ratings.sell, color: "#e74c3c" },
                  ].map((r) => {
                    const pct = ((r.count / totalAnalysts) * 100).toFixed(0);
                    return (
                      <div key={r.label}>
                        <div className="flex items-center justify-between text-[12.5px]">
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                            {r.label}
                          </span>
                          <span className="font-mono text-[var(--muted)]">{r.count} · {pct}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: r.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border)] grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {t.stock.analyst.target}
                  </div>
                  <div className="mt-1 font-display text-2xl" dir="ltr">${target}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {t.stock.analyst.upside}
                  </div>
                  <div className="mt-1 font-display text-2xl" style={{ color: isPositive ? "var(--accent)" : "#e74c3c" }} dir="ltr">
                    +{upside}%
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Earnings callout */}
          <Reveal className="lg:col-span-5" delay={120}>
            <div
              className="rounded-2xl border p-6 sm:p-7 h-full relative overflow-hidden"
              style={{
                borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)",
                background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 9%, var(--surface)) 0%, var(--surface) 70%)",
              }}
            >
              <div className="absolute -top-16 -end-12 w-40 h-40 glow-soft pointer-events-none" />

              <div className="relative">
                <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
                  {t.stock.sections.earnings}
                </span>
                <div className="mt-3 font-display text-2xl sm:text-3xl leading-tight">
                  {earningsDate}
                </div>
                <div className="mt-1 text-[12px] text-[var(--muted)]">{t.stock.earnings.timeAfter}</div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px]" style={{ background: "var(--surface-2)", color: "var(--foreground)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span dir="ltr">{daysAway} {t.stock.earnings.daysAway}</span>
                </div>

                <div className="mt-6 pt-5 border-t border-[var(--border)] grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">{t.stock.earnings.estimate}</div>
                    <div className="mt-1 font-mono">{epsEstimate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">{t.stock.earnings.actual}</div>
                    <div className="mt-1 font-mono text-[var(--muted)]">—</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Key metrics */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <Reveal>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
                {t.stock.sections.metrics}
              </h2>
              <span className="flex-1 h-px bg-[var(--border)]" />
            </div>
          </Reveal>

          <div className="rounded-2xl border border-[var(--border)] overflow-hidden" style={{ background: "var(--surface)" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-[var(--border)]">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex items-center justify-between gap-2 px-5 py-3.5 ${
                    i % 3 !== 2 ? "lg:border-e lg:border-[var(--border)]" : ""
                  } ${i % 2 !== 1 ? "sm:border-e sm:border-[var(--border)] lg:border-e-0" : ""} ${
                    i % 3 === 2 ? "lg:border-e lg:border-[var(--border)]" : ""
                  } ${
                    Math.floor(i / 3) < Math.floor((metrics.length - 1) / 3) ? "lg:border-b lg:border-[var(--border)]" : ""
                  }`}
                >
                  <span className="text-[13px] text-[var(--muted)]">{m.label}</span>
                  <span className="font-mono text-[14px]" dir="ltr">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News & articles */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <Reveal>
            <div className="flex items-end justify-between gap-3 mb-6">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
                {t.stock.sections.news}
              </h2>
              <Link href="/#news" className="text-[13px] text-[var(--accent)] hover:underline inline-flex items-center gap-1">
                <span>{t.stock.newsViewAll}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {[0, 1].map((i) => (
              <Reveal key={i} delay={i * 100}>
                <Link
                  href={`/article/${symbol.toLowerCase()}-news-${i + 1}`}
                  className="rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col h-full transition-colors"
                  style={{ background: "var(--surface)" }}
                >
                  <div
                    className="relative h-32 sm:h-36 border-b border-[var(--border)] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, color-mix(in oklab, var(--accent) ${12 + i * 4}%, var(--surface)), var(--surface))`,
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
                      <path
                        d={i === 0 ? "M0,70 Q50,20 100,55 T200,40" : "M0,50 L40,55 L80,30 L120,60 L160,35 L200,50"}
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className="absolute top-3 start-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px]"
                      style={{ background: "var(--surface-2)", color: "var(--accent)" }}
                    >
                      {lang === "ar" ? "تحليل سهم" : "Stock analysis"}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg leading-snug">
                      {lang === "ar"
                        ? `قراءة في أداء ${company.name.ar} للربع الأخير`
                        : `Reading ${company.name.en} latest quarter performance`}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-[var(--muted)]">
                      <span>{lang === "ar" ? "فريق تحليل مُركّب" : "Murakkab research"}</span>
                      <span>{i === 0 ? "5 " + (lang === "ar" ? "دقائق" : "min") : "8 " + (lang === "ar" ? "دقائق" : "min")}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Similar stocks */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <Reveal>
            <div className="flex items-end justify-between gap-3 mb-6">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
                {t.stock.similarStocks}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {Object.entries(PLACEHOLDER_COMPANIES)
              .filter(([s]) => s !== symbol)
              .slice(0, 4)
              .map(([s, c], i) => (
                <Reveal key={s} delay={i * 80}>
                  <Link
                    href={`/stock/${s}`}
                    className="card-hover block rounded-xl border border-[var(--border)] p-4 transition-colors"
                    style={{ background: "var(--surface)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-10 h-9 grid place-items-center rounded-md font-mono text-[11px] font-semibold"
                        style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                        dir="ltr"
                      >
                        {s}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[12.5px] truncate">{c.name[lang]}</div>
                        <div className="text-[10.5px] text-[var(--muted)] truncate">{c.sector[lang]}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between" dir="ltr">
                      <span className="font-mono text-[13px]">${c.price.toFixed(2)}</span>
                      <span className={`font-mono text-[12px] ${c.change >= 0 ? "text-[var(--accent)]" : "text-[#e74c3c]"}`}>
                        {c.change >= 0 ? "+" : ""}{c.change.toFixed(2)}%
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
