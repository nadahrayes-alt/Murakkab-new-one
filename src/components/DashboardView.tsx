"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";
import { useSearch } from "@/lib/SearchProvider";
import { useWatchlist } from "@/lib/WatchlistProvider";
import { STOCKS, getStock, type StockData } from "@/lib/stockData";
import StockResultCard from "./StockResultCard";
import { Reveal } from "./Parallax";
import { FreeUserBanner } from "./PremiumGate";

// Placeholder upcoming earnings — randomized days in the future per ticker
const EARNINGS_DATA: { ticker: string; daysAway: number; estimate: string }[] = [
  { ticker: "ARMD", daysAway: 3, estimate: "$1.84" },
  { ticker: "NEXV", daysAway: 7, estimate: "$0.62" },
  { ticker: "HELX", daysAway: 12, estimate: "$2.10" },
  { ticker: "LUMN", daysAway: 18, estimate: "$0.95" },
];

export default function DashboardView() {
  const { t, lang } = useLang();
  const { user, isAuthed, isPremium, open: openAuth, hydrated } = useAuth();
  const { watchlist } = useWatchlist();
  const { openSearch } = useSearch();
  const router = useRouter();

  // If not authed, prompt login — only after auth has hydrated from localStorage,
  // so we don't flash the modal for users who ARE logged in.
  useEffect(() => {
    if (hydrated && !isAuthed) openAuth("login");
  }, [hydrated, isAuthed, openAuth]);

  const watchedStocks = useMemo(
    () => watchlist.map((t) => getStock(t)).filter(Boolean) as ReturnType<typeof getStock>[],
    [watchlist]
  );

  // Recommendations: stocks NOT on watchlist, sorted by quality desc, top 4
  const recommendations = useMemo(
    () =>
      STOCKS.filter((s) => !watchlist.includes(s.ticker))
        .sort((a, b) => b.q - a.q)
        .slice(0, 4),
    [watchlist]
  );

  // Stats
  const compliantCount = watchedStocks.filter((s) => s!.shariah === "compliant").length;
  const avgQuality = watchedStocks.length
    ? Math.round(watchedStocks.reduce((sum, s) => sum + s!.q, 0) / watchedStocks.length)
    : 0;
  const sectors = new Set(watchedStocks.map((s) => s!.sector[lang])).size;

  if (hydrated && !isAuthed) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-32 sm:py-40 text-center">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight">
          {t.account.dashboard}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {lang === "ar" ? "سجّل الدخول للوصول إلى لوحة التحكم." : "Log in to access your dashboard."}
        </p>
        <button
          type="button"
          onClick={() => openAuth("login")}
          className="btn-primary mt-6 justify-center"
        >
          {t.nav.login}
        </button>
      </div>
    );
  }

  // While hydrating (or for unauthed before the effect runs), render nothing — avoids
  // both the SSR-vs-client mismatch and the modal flash for authed users.
  if (!hydrated || !isAuthed) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <div className="relative">
      {/* Hero greeting */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 pt-24 sm:pt-32">
          <Reveal>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="eyebrow">
                <span className="eyebrow-dot pulse-dot" />
                {t.account.dashboard}
              </span>
              {isPremium && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l2.39 6.99H22l-6.06 4.41L18.34 22 12 17.27 5.66 22l2.4-8.6L2 8.99h7.61z" />
                  </svg>
                  {t.dashboard.proBadge}
                </span>
              )}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display mt-4 text-3xl sm:text-5xl tracking-tight leading-tight">
              {t.dashboard.welcomeBack}
              {user?.name ? (
                <>
                  ,{" "}
                  <span className="text-[var(--accent)]">{user.name}</span>
                </>
              ) : null}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 text-sm sm:text-base text-[var(--muted)]">
              {isPremium ? t.dashboard.proWelcome : t.dashboard.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Free user banner — only when isAuthed && !isPremium */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6">
        <Reveal>
          <FreeUserBanner />
        </Reveal>
      </div>

      {/* Premium-only AI Insights */}
      {isPremium && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-2xl border p-5 sm:p-7"
              style={{
                borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
                background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 9%, var(--surface)) 0%, var(--surface) 70%)",
              }}
            >
              <div className="absolute -top-16 -end-12 w-60 h-60 glow-soft pointer-events-none" />
              <div className="relative grid md:grid-cols-12 gap-5 sm:gap-7 items-start">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="grid place-items-center w-9 h-9 rounded-xl font-display text-sm shrink-0"
                      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
                    >
                      AI
                    </span>
                    <div>
                      <div
                        className="text-[10.5px] uppercase tracking-[0.16em]"
                        style={{ color: "var(--accent)" }}
                      >
                        {t.dashboard.ai.eyebrow}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-0.5 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
                        {t.dashboard.ai.generated}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl sm:text-2xl leading-tight">
                    {t.dashboard.ai.title}
                  </h3>
                  <Link
                    href="/article/ai-deeper-analysis"
                    className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-[var(--accent)] hover:underline"
                  >
                    {t.dashboard.ai.viewMore}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </Link>
                </div>

                <ul className="md:col-span-8 space-y-2.5">
                  {t.dashboard.ai.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13.5px] sm:text-[14.5px] leading-relaxed">
                      <span
                        className="mt-0.5 grid place-items-center w-5 h-5 rounded-full shrink-0"
                        style={{ background: "color-mix(in oklab, var(--accent) 14%, transparent)", color: "var(--accent)" }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* Stats */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-7 sm:py-9">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: t.dashboard.stats.watchlistCount, value: watchedStocks.length },
                { label: t.dashboard.stats.avgQuality, value: avgQuality || "—" },
                { label: t.dashboard.stats.compliantCount, value: compliantCount },
                { label: t.dashboard.stats.sectors, value: sectors || "—" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--border)] p-4 sm:p-5"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {s.label}
                  </div>
                  <div className="mt-2 font-display text-2xl sm:text-3xl">{s.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Watchlist preview */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <Reveal>
            <div className="flex items-end justify-between gap-3 mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
                  {t.dashboard.watchlistTitle}
                </h2>
              </div>
              {watchedStocks.length > 0 && (
                <Link
                  href="/watchlist"
                  className="text-[13px] text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                >
                  <span>{t.dashboard.viewAll}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </Link>
              )}
            </div>
          </Reveal>

          {watchedStocks.length === 0 ? (
            <Reveal>
              <div
                className="rounded-2xl border border-dashed border-[var(--border)] p-10 text-center"
                style={{ background: "var(--surface)" }}
              >
                <div
                  className="inline-grid place-items-center w-12 h-12 rounded-full mb-3"
                  style={{ background: "var(--surface-2)", color: "var(--muted)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="font-medium">{t.dashboard.watchlistEmpty}</div>
                <div className="mt-1 text-[13px] text-[var(--muted)] max-w-sm mx-auto">
                  {t.dashboard.watchlistEmptyAction}
                </div>
                <button
                  type="button"
                  onClick={openSearch}
                  className="btn-primary mt-5 justify-center"
                >
                  {t.dashboard.actions.search.title}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </Reveal>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {watchedStocks.slice(0, 4).map((s, i) => (
                <Reveal key={s!.ticker} delay={i * 70}>
                  <StockResultCard stock={s!} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Premium-only: Earnings calendar + Top movers */}
      {isPremium && (
        <div className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 grid lg:grid-cols-12 gap-5 lg:gap-6">
            {/* Earnings calendar */}
            <Reveal className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden h-full" style={{ background: "var(--surface)" }}>
                <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg">{t.dashboard.earnings.title}</h3>
                    <p className="text-[11.5px] text-[var(--muted)] mt-0.5">{t.dashboard.earnings.subtitle}</p>
                  </div>
                  <Link href="/earnings" className="text-[11.5px] text-[var(--accent)] hover:underline shrink-0">
                    {t.dashboard.earnings.viewAll}
                  </Link>
                </div>
                <ul className="divide-y divide-[var(--border)]">
                  {EARNINGS_DATA.map((e) => {
                    const stock = getStock(e.ticker);
                    if (!stock) return null;
                    const isToday = e.daysAway === 0;
                    return (
                      <li key={e.ticker}>
                        <Link
                          href={`/stock/${e.ticker}`}
                          className="flex items-center gap-3 px-5 py-3.5 transition-colors"
                          onMouseEnter={(ev) => (ev.currentTarget.style.background = "var(--soft-bg)")}
                          onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                        >
                          <span
                            className="w-10 h-9 grid place-items-center rounded-md font-mono text-[10.5px] font-semibold shrink-0"
                            style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                            dir="ltr"
                          >
                            {stock.ticker}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] truncate" dir={lang === "ar" ? "rtl" : "ltr"}>
                              {stock.name[lang]}
                            </div>
                            <div className="text-[11px] text-[var(--muted)]" dir="ltr">
                              EPS estimate: {e.estimate}
                            </div>
                          </div>
                          <div
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap"
                            style={{
                              background: isToday
                                ? "color-mix(in oklab, var(--accent) 14%, transparent)"
                                : "var(--surface-2)",
                              color: isToday ? "var(--accent)" : "var(--muted)",
                            }}
                          >
                            {isToday ? t.dashboard.earnings.today : `${t.dashboard.earnings.in} ${e.daysAway} ${t.dashboard.earnings.days}`}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* Top movers */}
            <Reveal className="lg:col-span-7" delay={120}>
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden h-full" style={{ background: "var(--surface)" }}>
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <h3 className="font-display text-lg">{t.dashboard.movers.title}</h3>
                  <p className="text-[11.5px] text-[var(--muted)] mt-0.5">{t.dashboard.movers.subtitle}</p>
                </div>
                <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)] rtl:sm:divide-x-reverse">
                  {([
                    { label: t.dashboard.movers.gainers, list: [...STOCKS].sort((a, b) => b.change - a.change).slice(0, 3), tone: "good" as const },
                    { label: t.dashboard.movers.losers, list: [...STOCKS].sort((a, b) => a.change - b.change).slice(0, 3), tone: "bad" as const },
                    { label: t.dashboard.movers.active, list: [...STOCKS].sort((a, b) => b.q - a.q).slice(0, 3), tone: "neutral" as const },
                  ]).map((col) => (
                    <div key={col.label} className="p-4">
                      <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--muted)] mb-3">
                        {col.label}
                      </div>
                      <ul className="space-y-2">
                        {col.list.map((s) => (
                          <li key={s.ticker}>
                            <Link
                              href={`/stock/${s.ticker}`}
                              className="flex items-center gap-2 group"
                            >
                              <span
                                className="w-9 h-7 grid place-items-center rounded-md font-mono text-[10px] font-semibold shrink-0"
                                style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                                dir="ltr"
                              >
                                {s.ticker}
                              </span>
                              <span className="flex-1 min-w-0 text-[12px] truncate group-hover:text-[var(--foreground)]">
                                {s.name[lang]}
                              </span>
                              <span
                                className="text-[11px] font-mono whitespace-nowrap"
                                style={{ color: s.change >= 0 ? "var(--accent)" : "#e74c3c" }}
                                dir="ltr"
                              >
                                {s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <Reveal>
            <div className="mb-6">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
                {t.dashboard.recommendedTitle}
              </h2>
              <p className="mt-1.5 text-[13px] text-[var(--muted)]">
                {t.dashboard.recommendedSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {recommendations.map((s, i) => (
              <Reveal key={s.ticker} delay={i * 70}>
                <StockResultCard stock={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions + Recent news */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 grid lg:grid-cols-12 gap-5 lg:gap-8">
          {/* Quick actions */}
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-xl sm:text-2xl tracking-tight mb-4">
              {t.dashboard.quickActionsTitle}
            </h2>
            <div className="space-y-3">
              <button
                type="button"
                onClick={openSearch}
                className="w-full flex items-center gap-4 rounded-2xl border border-[var(--border)] p-4 sm:p-5 text-start transition-colors"
                style={{ background: "var(--surface)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl shrink-0"
                  style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium">{t.dashboard.actions.search.title}</div>
                  <div className="text-[11.5px] text-[var(--muted)]">{t.dashboard.actions.search.desc}</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--muted)] rtl:rotate-180">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <Link
                href="/#articles"
                className="w-full flex items-center gap-4 rounded-2xl border border-[var(--border)] p-4 sm:p-5 text-start transition-colors"
                style={{ background: "var(--surface)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl shrink-0"
                  style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 4h11l3 3v13H5V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M8 9h7M8 13h7M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium">{t.dashboard.actions.articles.title}</div>
                  <div className="text-[11.5px] text-[var(--muted)]">{t.dashboard.actions.articles.desc}</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--muted)] rtl:rotate-180">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {user?.tier === "free" && (
                <Link
                  href="/#pricing"
                  className="w-full flex items-center gap-4 rounded-2xl border p-4 sm:p-5 text-start transition-colors"
                  style={{
                    background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 9%, var(--surface)) 0%, var(--surface) 70%)",
                    borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
                  }}
                >
                  <span
                    className="grid place-items-center w-10 h-10 rounded-xl shrink-0 font-display text-sm"
                    style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
                  >
                    ★
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium" style={{ color: "var(--accent)" }}>{t.dashboard.actions.upgrade.title}</div>
                    <div className="text-[11.5px] text-[var(--muted)]">{t.dashboard.actions.upgrade.desc}</div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden style={{ color: "var(--accent)" }} className="rtl:rotate-180">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </div>
          </Reveal>

          {/* Recent news */}
          <Reveal className="lg:col-span-7" delay={120}>
            <h2 className="font-display text-xl sm:text-2xl tracking-tight mb-4">
              {t.dashboard.recentNewsTitle}
            </h2>
            <div className="space-y-3">
              {t.news.items.slice(0, 3).map((item, i) => (
                <Link
                  key={i}
                  href={`/article/news-${i + 1}`}
                  className="block rounded-2xl border border-[var(--border)] p-4 sm:p-5 transition-colors"
                  style={{ background: "var(--surface)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div className="flex items-center gap-2 text-[11px]">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5"
                      style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                    >
                      {item.tag}
                    </span>
                    <span className="text-[var(--muted)]">{item.date}</span>
                  </div>
                  <div className="mt-2 text-[14px] font-medium leading-snug line-clamp-2">{item.title}</div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
