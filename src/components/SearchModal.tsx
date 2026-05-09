"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearch } from "@/lib/SearchProvider";
import { useLang } from "@/lib/LanguageProvider";
import { useAuth } from "@/lib/AuthProvider";
import { useWatchlist } from "@/lib/WatchlistProvider";

const FILTER_ICONS: Record<string, React.ReactNode> = {
  warning: (
    <>
      <path d="M12 4l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  x: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12.5l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  star: (
    <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9-4.6-.5-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  up: (
    <>
      <path d="M4 17l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  down: (
    <>
      <path d="M4 7l6 6 4-4 6 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 17h6v-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  balance: (
    <>
      <path d="M12 4v16M5 8h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 8l-3 6c0 1.6 1.4 3 3 3s3-1.4 3-3l-3-6zM19 8l-3 6c0 1.6 1.4 3 3 3s3-1.4 3-3l-3-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
};

type Stock = {
  ticker: string;
  name: { en: string; ar: string };
  sector: { en: string; ar: string };
  price: number;
  change: number;
  q: number;
  v: "fair" | "above" | "below";
  shariah: "compliant" | "doubtful" | "non";
};

const SUGGESTIONS: Stock[] = [
  { ticker: "ARMD", name: { en: "Armada Tech.", ar: "أرمادا تِك" }, sector: { en: "Technology", ar: "تقنية" }, price: 142.18, change: 2.34, q: 92, v: "fair", shariah: "compliant" },
  { ticker: "NEXV", name: { en: "NexVision Energy", ar: "نِكسفِجن للطاقة" }, sector: { en: "Energy", ar: "طاقة" }, price: 89.42, change: 0.86, q: 88, v: "below", shariah: "compliant" },
  { ticker: "LUMN", name: { en: "Lumen Industries", ar: "لومن للصناعات" }, sector: { en: "Industrials", ar: "صناعات" }, price: 58.20, change: -0.41, q: 81, v: "fair", shariah: "compliant" },
  { ticker: "HELX", name: { en: "Helix Health", ar: "هيلِكس هِلث" }, sector: { en: "Healthcare", ar: "رعاية صحية" }, price: 215.10, change: 1.18, q: 85, v: "above", shariah: "compliant" },
  { ticker: "ATLS", name: { en: "Atlas Foods", ar: "أطلس فودز" }, sector: { en: "Consumer", ar: "استهلاكي" }, price: 36.95, change: 0.62, q: 79, v: "fair", shariah: "compliant" },
  { ticker: "BCON", name: { en: "Beacon Insurance", ar: "بيكون للتأمين" }, sector: { en: "Insurance", ar: "تأمين" }, price: 44.12, change: -0.22, q: 76, v: "below", shariah: "doubtful" },
  { ticker: "ORBT", name: { en: "Orbit Logistics", ar: "أوربت للشحن" }, sector: { en: "Industrials", ar: "صناعات" }, price: 72.35, change: 1.04, q: 84, v: "fair", shariah: "compliant" },
  { ticker: "VANT", name: { en: "Vantage Telecom", ar: "فانتاج للاتصالات" }, sector: { en: "Communication", ar: "اتصالات" }, price: 28.78, change: 0.35, q: 70, v: "below", shariah: "compliant" },
  { ticker: "PRSM", name: { en: "Prism Labs", ar: "بريزم لابز" }, sector: { en: "Healthcare", ar: "رعاية صحية" }, price: 156.40, change: 0.92, q: 87, v: "above", shariah: "compliant" },
  { ticker: "KORE", name: { en: "Kore Materials", ar: "كور للمواد" }, sector: { en: "Materials", ar: "مواد أساسية" }, price: 52.18, change: -0.18, q: 73, v: "fair", shariah: "compliant" },
  { ticker: "VEGA", name: { en: "Vega Pharma", ar: "فيجا فارما" }, sector: { en: "Healthcare", ar: "رعاية صحية" }, price: 98.65, change: 1.45, q: 82, v: "fair", shariah: "compliant" },
  { ticker: "NOVA", name: { en: "NovaPay Fintech", ar: "نوفاباي" }, sector: { en: "Financials", ar: "مالية" }, price: 63.20, change: 0.55, q: 78, v: "below", shariah: "doubtful" },
];

const LockIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11V7.5a4 4 0 118 0V11" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const HelpIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9.5 9a2.5 2.5 0 014.7 1c0 1.5-2 1.5-2 3M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

type FilterItem = {
  icon?: string;
  name: string;
  desc?: string;
  premium?: "login" | "upgrade";
};

function GroupHeader({ title, help }: { title: string; help: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[12.5px] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
        {title}
      </span>
      <span
        className="grid place-items-center w-4 h-4 rounded-full text-[var(--muted)]/70"
        title={help}
        aria-label={help}
      >
        <HelpIcon />
      </span>
    </div>
  );
}

function SimpleFilterRow({
  name,
  active,
  onToggle,
}: {
  name: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-[13px] transition-colors text-start"
      style={{
        background: active ? "color-mix(in oklab, var(--accent) 7%, var(--surface))" : "transparent",
        borderColor: active
          ? "color-mix(in oklab, var(--accent) 50%, transparent)"
          : "var(--border)",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 28%, transparent)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <span>{name}</span>
      <span
        className="grid place-items-center w-4 h-4 rounded-md transition-all"
        style={{
          background: active ? "var(--accent)" : "transparent",
          color: active ? "var(--accent-contrast)" : "var(--muted)",
          border: active ? "none" : "1px solid var(--border)",
        }}
      >
        {active && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  );
}

function FilterCard({
  item,
  active,
  gate,
  onToggle,
  onGate,
  premiumLogin,
  premiumUpgrade,
}: {
  item: FilterItem;
  active: boolean;
  gate: "login" | "upgrade" | null;
  onToggle: () => void;
  onGate: (mode: "login" | "upgrade") => void;
  premiumLogin: string;
  premiumUpgrade: string;
}) {
  const isLocked = gate !== null;

  return (
    <button
      type="button"
      onClick={() => (isLocked ? onGate(gate!) : onToggle())}
      className="group relative w-full text-start rounded-xl border p-3 transition-colors"
      style={{
        background: active ? "color-mix(in oklab, var(--accent) 7%, var(--surface))" : "transparent",
        borderColor: active
          ? "color-mix(in oklab, var(--accent) 50%, transparent)"
          : "var(--border)",
        opacity: isLocked ? 0.78 : 1,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 28%, transparent)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div className="flex items-start gap-2.5">
        {item.icon && (
          <span
            className="grid place-items-center w-7 h-7 rounded-lg shrink-0"
            style={{
              background: "color-mix(in oklab, var(--accent) 10%, transparent)",
              color: "var(--accent)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              {FILTER_ICONS[item.icon]}
            </svg>
          </span>
        )}
        <div className="flex-1 min-w-0 pe-5">
          <div className="text-[13px] font-medium leading-tight">{item.name}</div>
          {item.desc && (
            <div className="mt-1 text-[11px] text-[var(--muted)] leading-relaxed">
              {item.desc}
            </div>
          )}
          {isLocked && (
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-[var(--accent)]">
              <span className="rtl:rotate-180">→</span>
              <span>{gate === "login" ? premiumLogin : premiumUpgrade}</span>
            </div>
          )}
        </div>
      </div>

      {isLocked && (
        <span
          className="absolute top-2.5 end-2.5 grid place-items-center w-5 h-5 rounded-full"
          style={{ background: "var(--surface-2)", color: "var(--muted)" }}
        >
          <LockIcon />
        </span>
      )}
      {!isLocked && active && (
        <span
          className="absolute top-2.5 end-2.5 grid place-items-center w-4 h-4 rounded-md"
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

function StockSuggestion({ stock, lang, onClick }: { stock: Stock; lang: "en" | "ar"; onClick?: () => void }) {
  return (
    <Link
      href={`/stock/${stock.ticker}`}
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-xl border border-[var(--border)] p-3 transition-colors text-start"
      style={{ background: "var(--surface)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <span
        className="w-10 h-9 grid place-items-center rounded-md font-mono text-[11px] font-semibold shrink-0"
        style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
        dir="ltr"
      >
        {stock.ticker}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] truncate" dir="ltr">{stock.name.en}</div>
        <div className="text-[11px] text-[var(--muted)] truncate">{stock.sector[lang]}</div>
      </div>
      <div
        className="text-[11px] font-mono px-1.5 py-0.5 rounded-md"
        style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
      >
        {stock.q}
      </div>
    </Link>
  );
}

function ResultCard({ stock, lang, labels, onNavigate, onStarUnauthed }: {
  stock: Stock;
  lang: "en" | "ar";
  labels: { valuation: string; quality: string; shariah: string };
  onNavigate?: () => void;
  onStarUnauthed: () => void;
}) {
  const { isWatched, toggle } = useWatchlist();
  const { isAuthed } = useAuth();
  const starred = isWatched(stock.ticker);
  const isPositive = stock.change >= 0;

  const valuationTone = stock.v === "fair" ? "good" : "neutral";
  const valuationLabel = stock.v === "fair" ? labels.valuation : stock.v === "above" ? labels.valuation : labels.valuation;
  const qualityTone = stock.q >= 80 ? "good" : stock.q >= 65 ? "neutral" : "bad";
  const shariahTone = stock.shariah === "compliant" ? "good" : stock.shariah === "doubtful" ? "neutral" : "bad";

  const TONE = {
    good: { bg: "color-mix(in oklab, var(--accent) 12%, transparent)", fg: "var(--accent)" },
    neutral: { bg: "color-mix(in srgb, #f5a623 14%, transparent)", fg: "#f5a623" },
    bad: { bg: "color-mix(in srgb, #e74c3c 14%, transparent)", fg: "#e74c3c" },
  };

  return (
    <Link
      href={`/stock/${stock.ticker}`}
      onClick={onNavigate}
      className="group relative block rounded-2xl border border-[var(--border)] p-4 sm:p-5 transition-colors"
      style={{ background: "var(--surface)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 28%, transparent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Star button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isAuthed) {
            onStarUnauthed();
            return;
          }
          toggle(stock.ticker);
        }}
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

      {/* Top row: ticker + logo */}
      <div className="flex items-start justify-end gap-2.5">
        <div className="text-end">
          <div className="font-mono text-[13px] font-semibold" dir="ltr">{stock.ticker}</div>
          <div className="text-[11px] text-[var(--muted)] truncate max-w-[140px]" dir="ltr">
            {stock.name.en}
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

      {/* Price */}
      <div className="mt-4 flex items-baseline justify-between gap-2" dir="ltr">
        <span className="font-display text-2xl sm:text-3xl">${stock.price.toFixed(2)}</span>
        <span
          className="text-[12px] font-mono"
          style={{ color: isPositive ? "var(--accent)" : "#e74c3c" }}
        >
          {isPositive ? "+" : ""}{stock.change.toFixed(2)}%
        </span>
      </div>

      {/* Pills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px]"
          style={{ background: TONE[valuationTone].bg, color: TONE[valuationTone].fg }}
        >
          {labels.valuation}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px]"
          style={{ background: TONE[qualityTone].bg, color: TONE[qualityTone].fg }}
        >
          {labels.quality} <span className="font-mono opacity-80">{stock.q}</span>
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px]"
          style={{ background: TONE[shariahTone].bg, color: TONE[shariahTone].fg }}
        >
          {labels.shariah}
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

export default function SearchModal() {
  const { open, closeSearch } = useSearch();
  const { t, lang } = useLang();
  const { open: openAuth, isAuthed, isPremium } = useAuth();

  // Compute gate mode for premium filters based on auth state.
  const gateForPremium: "login" | "upgrade" | null = !isAuthed
    ? "login"
    : !isPremium
    ? "upgrade"
    : null;

  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [view, setView] = useState<"filters" | "results">("filters");
  const [resultsLimit, setResultsLimit] = useState(9);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setView("filters");
    setResultsLimit(9);
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && closeSearch();
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [open, closeSearch]);

  const activeCount = useMemo(() => Object.values(active).filter(Boolean).length, [active]);

  if (!open) return null;

  const toggle = (key: string) => setActive((p) => ({ ...p, [key]: !p[key] }));
  const clearAll = () => setActive({});
  const handleGate = (mode: "login" | "upgrade") => {
    closeSearch();
    if (mode === "login") {
      openAuth("login");
    } else {
      // Premium upgrade — scroll to pricing
      const el = document.getElementById("pricing");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    !query
      ? true
      : s.ticker.toLowerCase().includes(query.toLowerCase()) ||
        s.name.en.toLowerCase().includes(query.toLowerCase()) ||
        s.name.ar.includes(query)
  );

  // Apply active filters to determine displayed results.
  const filteredResults = SUGGESTIONS.filter((s) => {
    const sectorKeys = Object.keys(active).filter((k) => active[k] && k.startsWith("sector:"));
    if (sectorKeys.length) {
      const okSectors = sectorKeys.map((k) => k.split(":")[1]);
      const stockSector = s.sector[lang];
      if (!okSectors.some((sec) => stockSector.includes(sec) || sec.includes(stockSector))) {
        return false;
      }
    }
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div
        className="modal-backdrop fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={closeSearch}
      />

      <div
        className="modal-content relative w-full max-w-5xl my-4 sm:my-12 rounded-2xl sm:rounded-3xl border border-[var(--border)] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, color-mix(in oklab, var(--accent) 4%, var(--surface)) 0%, var(--surface) 60%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute inset-x-0 -top-12 h-32 glow pointer-events-none" />

        {/* ── Top section: headline + search ── */}
        <div className="relative px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-5 sm:pb-7">
          {/* Floating close button (top corner) */}
          <button
            type="button"
            onClick={closeSearch}
            className="absolute top-3 end-3 grid place-items-center w-9 h-9 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            style={{ background: "transparent" }}
            aria-label={t.auth.close}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover-bg)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Headline first */}
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
              {t.search.title}
            </h2>
            <p className="mt-2 text-[13px] sm:text-sm text-[var(--muted)]">
              {t.search.subtitle}
            </p>
          </div>

          {/* Then search input */}
          <div
            className="mt-6 sm:mt-8 flex items-center gap-2.5 rounded-2xl border px-4 sm:px-5 h-12 sm:h-14 transition-colors focus-within:border-[color:color-mix(in_oklab,var(--accent)_60%,transparent)]"
            style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--muted)] shrink-0">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 bg-transparent outline-none text-[14px] sm:text-[15px] text-[var(--foreground)] placeholder:text-[var(--muted)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="grid place-items-center w-6 h-6 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                style={{ background: "var(--surface)" }}
                aria-label={t.auth.close}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <kbd
              className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}
            >
              Esc
            </kbd>
          </div>

          {/* Quick suggestions */}
          {!query && (
            <div className="mt-6 sm:mt-7">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[11.5px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {t.search.suggestionsTitle}
                </span>
                <span className="flex-1 h-px bg-[var(--border)]" />
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {filteredSuggestions.slice(0, 4).map((s) => (
                  <StockSuggestion key={s.ticker} stock={s} lang={lang} />
                ))}
              </div>
            </div>
          )}

          {/* Search results / no results */}
          {query && (
            <div className="mt-6 sm:mt-7">
              {filteredSuggestions.length > 0 ? (
                <div className="space-y-2">
                  {filteredSuggestions.map((s) => (
                    <StockSuggestion key={s.ticker} stock={s} lang={lang} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div
                    className="inline-grid place-items-center w-12 h-12 rounded-full mb-3"
                    style={{ background: "var(--surface-2)", color: "var(--muted)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    {t.search.noResults} <span className="font-medium">&ldquo;{query}&rdquo;</span>
                  </div>
                  <div className="mt-1 text-[12.5px] text-[var(--muted)]">{t.search.tryAgain}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Filters card OR results grid ── */}
        {view === "filters" ? (
        <div className="px-4 sm:px-8 lg:px-12 pb-6 sm:pb-10">
          <div
            className="rounded-2xl border border-[var(--border)] overflow-hidden"
            style={{ background: "var(--surface)" }}
          >
            {/* Filters header */}
            <button
              type="button"
              onClick={() => setFiltersExpanded((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 transition-colors text-start"
              style={{ background: "var(--surface-2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in oklab, var(--accent) 4%, var(--surface-2))")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
              aria-expanded={filtersExpanded}
            >
              <div className="inline-flex items-center gap-2.5 text-sm">
                <span
                  className="grid place-items-center w-7 h-7 rounded-lg"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 5h16l-6 8v6l-4-2v-4L4 5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-medium">{t.search.filtersTitle}</span>
                {activeCount > 0 && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px]"
                    style={{
                      background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {activeCount} {t.search.activeFilters}
                  </span>
                )}
              </div>

              <div className="inline-flex items-center gap-2">
                {activeCount > 0 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAll();
                    }}
                    className="inline-flex items-center gap-1 text-[12px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                    role="button"
                    tabIndex={0}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {t.search.clearAll}
                  </span>
                )}
                <span
                  className="grid place-items-center w-6 h-6 rounded-md text-[var(--muted)] transition-transform"
                  style={{
                    background: "var(--surface)",
                    transform: filtersExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Filter columns */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                filtersExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Sector */}
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-e border-[var(--border)] last:border-e-0">
                    <GroupHeader title={t.search.groups.sector.title} help={t.search.groups.sector.help} />
                    <div className="mt-3 space-y-1.5">
                      {t.search.groups.sector.items.map((it) => (
                        <SimpleFilterRow
                          key={it.name}
                          name={it.name}
                          active={!!active[`sector:${it.name}`]}
                          onToggle={() => toggle(`sector:${it.name}`)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Shariah */}
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-e border-[var(--border)] last:border-e-0">
                    <GroupHeader title={t.search.groups.shariah.title} help={t.search.groups.shariah.help} />
                    <div className="mt-3 space-y-2">
                      {t.search.groups.shariah.items.map((it) => (
                        <FilterCard
                          key={it.name}
                          item={it as FilterItem}
                          active={!!active[`shariah:${it.name}`]}
                          onToggle={() => toggle(`shariah:${it.name}`)}
                          gate={(it as FilterItem).premium ? gateForPremium : null}
                          onGate={handleGate}
                          premiumLogin={t.search.premiumLogin}
                          premiumUpgrade={t.search.premiumUpgrade}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quality */}
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-e border-[var(--border)] last:border-e-0">
                    <GroupHeader title={t.search.groups.quality.title} help={t.search.groups.quality.help} />
                    <div className="mt-3 space-y-2">
                      {t.search.groups.quality.items.map((it) => (
                        <FilterCard
                          key={it.name}
                          item={it as FilterItem}
                          active={!!active[`quality:${it.name}`]}
                          onToggle={() => toggle(`quality:${it.name}`)}
                          gate={(it as FilterItem).premium ? gateForPremium : null}
                          onGate={handleGate}
                          premiumLogin={t.search.premiumLogin}
                          premiumUpgrade={t.search.premiumUpgrade}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Valuation */}
                  <div className="p-4 sm:p-5">
                    <GroupHeader title={t.search.groups.valuation.title} help={t.search.groups.valuation.help} />
                    <div className="mt-3 space-y-2">
                      {t.search.groups.valuation.items.map((it) => (
                        <FilterCard
                          key={it.name}
                          item={it as FilterItem}
                          active={!!active[`valuation:${it.name}`]}
                          onToggle={() => toggle(`valuation:${it.name}`)}
                          gate={(it as FilterItem).premium ? gateForPremium : null}
                          onGate={handleGate}
                          premiumLogin={t.search.premiumLogin}
                          premiumUpgrade={t.search.premiumUpgrade}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Apply CTA */}
                {activeCount > 0 && (
                  <div className="px-4 sm:px-5 py-3 border-t border-[var(--border)] flex items-center justify-end gap-2" style={{ background: "var(--surface-2)" }}>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="inline-flex items-center px-3 h-8 text-[12.5px] rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                      style={{ background: "var(--surface)" }}
                    >
                      {t.search.clearAll}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setView("results");
                        setResultsLimit(9);
                      }}
                      className="btn-primary !py-1.5 !px-3.5 !text-[12.5px]"
                    >
                      {t.search.applyFilters} ({activeCount})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12">
            {/* Back to filters */}
            <button
              type="button"
              onClick={() => setView("filters")}
              className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{t.search.backToFilters}</span>
            </button>

            {/* Results header */}
            <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6">
              <h3 className="font-display text-xl sm:text-2xl">
                {t.search.resultsTitle}{" "}
                <span className="text-[var(--muted)] font-mono text-base sm:text-lg">
                  ({filteredResults.length.toLocaleString()})
                </span>
              </h3>
              {activeCount > 0 && (
                <span className="text-[11.5px] text-[var(--muted)]">
                  {activeCount} {t.search.activeFilters}
                </span>
              )}
            </div>

            {/* Active filter chips */}
            {activeCount > 0 && (
              <div className="mb-5 flex flex-wrap gap-1.5">
                {Object.entries(active)
                  .filter(([, v]) => v)
                  .map(([key]) => {
                    const [, label] = key.split(":");
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] border"
                        style={{
                          background: "color-mix(in oklab, var(--accent) 8%, transparent)",
                          borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)",
                          color: "var(--accent)",
                        }}
                      >
                        {label}
                        <button
                          type="button"
                          onClick={() => toggle(key)}
                          aria-label="Remove filter"
                          className="grid place-items-center w-3.5 h-3.5 rounded-full hover:bg-[var(--accent)]/20 transition-colors"
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </span>
                    );
                  })}
              </div>
            )}

            {/* Results grid */}
            {filteredResults.length === 0 ? (
              <div className="text-center py-14">
                <div
                  className="inline-grid place-items-center w-12 h-12 rounded-full mb-3"
                  style={{ background: "var(--surface-2)", color: "var(--muted)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-sm">{t.search.tryAgain}</div>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredResults.slice(0, resultsLimit).map((s) => (
                    <ResultCard
                      key={s.ticker}
                      stock={s}
                      lang={lang}
                      labels={t.search.resultLabels}
                      onNavigate={closeSearch}
                      onStarUnauthed={() => {
                        closeSearch();
                        openAuth("login");
                      }}
                    />
                  ))}
                </div>

                {filteredResults.length > resultsLimit && (
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setResultsLimit((n) => n + 9)}
                      className="btn-ghost"
                    >
                      {t.search.loadMore}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
