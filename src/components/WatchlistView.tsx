"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";
import { useSearch } from "@/lib/SearchProvider";
import { useWatchlist } from "@/lib/WatchlistProvider";
import { getStock } from "@/lib/stockData";
import StockResultCard from "./StockResultCard";
import { Reveal } from "./Parallax";

type Sort = "recent" | "quality" | "gain" | "loss";

export default function WatchlistView() {
  const { t, lang } = useLang();
  const { isAuthed, open: openAuth, hydrated } = useAuth();
  const { watchlist } = useWatchlist();
  const { openSearch } = useSearch();
  const [sort, setSort] = useState<Sort>("recent");

  useEffect(() => {
    if (hydrated && !isAuthed) openAuth("login");
  }, [hydrated, isAuthed, openAuth]);

  const stocks = useMemo(
    () => watchlist.map((t) => getStock(t)).filter(Boolean),
    [watchlist]
  );

  const sortedStocks = useMemo(() => {
    const arr = [...stocks];
    switch (sort) {
      case "quality":
        return arr.sort((a, b) => b!.q - a!.q);
      case "gain":
        return arr.sort((a, b) => b!.change - a!.change);
      case "loss":
        return arr.sort((a, b) => a!.change - b!.change);
      case "recent":
      default:
        return arr.reverse();
    }
  }, [stocks, sort]);

  const sortLabels: Record<Sort, string> = {
    recent: t.watchlist.sort.recent,
    quality: t.watchlist.sort.quality,
    gain: t.watchlist.sort.gain,
    loss: t.watchlist.sort.loss,
  };

  if (hydrated && !isAuthed) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-32 sm:py-40 text-center">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight">{t.account.watchlist}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {lang === "ar" ? "سجّل الدخول للوصول إلى قائمة المتابعة." : "Log in to access your watchlist."}
        </p>
        <button type="button" onClick={() => openAuth("login")} className="btn-primary mt-6 justify-center">
          {t.nav.login}
        </button>
      </div>
    );
  }

  if (!hydrated) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 pt-24 sm:pt-32">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t.account.watchlist}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="font-display text-3xl sm:text-5xl tracking-tight leading-tight">
                  {t.watchlist.title}
                </h1>
                <p className="mt-2 text-sm text-[var(--muted)]">{t.watchlist.subtitle}</p>
              </div>
              {sortedStocks.length > 0 && (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px]"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  <span className="font-mono text-[var(--foreground)] me-1.5">{sortedStocks.length}</span>
                  {t.watchlist.countSuffix}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {sortedStocks.length === 0 ? (
          <Reveal>
            <div
              className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center max-w-xl mx-auto"
              style={{ background: "var(--surface)" }}
            >
              <div
                className="inline-grid place-items-center w-14 h-14 rounded-full mb-4"
                style={{ background: "var(--surface-2)", color: "var(--muted)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-2xl">{t.watchlist.empty}</h3>
              <p className="mt-2 text-[13.5px] text-[var(--muted)]">{t.watchlist.emptyDesc}</p>
              <button type="button" onClick={openSearch} className="btn-primary mt-6 justify-center">
                {t.watchlist.emptyAction}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
              <div className="mt-6 text-[12px] text-[var(--muted)]">
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                  ← {t.account.dashboard}
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            {/* Sort controls */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="text-[12px] text-[var(--muted)]">{t.watchlist.sortLabel}</span>
              <div
                className="inline-flex items-center rounded-full border border-[var(--border)] p-0.5 text-[12px]"
                style={{ background: "var(--soft-bg)" }}
              >
                {(Object.keys(sortLabels) as Sort[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSort(key)}
                    className="px-3 py-1 rounded-full transition-colors"
                    style={{
                      background: sort === key ? "var(--accent)" : "transparent",
                      color: sort === key ? "var(--accent-contrast)" : "var(--muted)",
                    }}
                    aria-pressed={sort === key}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {sortedStocks.map((s, i) => (
                <Reveal key={s!.ticker} delay={i * 50}>
                  <StockResultCard stock={s!} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
