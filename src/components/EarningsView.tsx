"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";
import { getStock, STOCKS } from "@/lib/stockData";
import { Reveal } from "./Parallax";
import PremiumGate from "./PremiumGate";

// Static placeholder earnings — chronological order, mixed sectors
const UPCOMING: { ticker: string; daysAway: number; estimate: string; previous?: string }[] = [
  { ticker: "ARMD", daysAway: 3, estimate: "$1.84", previous: "$1.62" },
  { ticker: "NEXV", daysAway: 7, estimate: "$0.62", previous: "$0.55" },
  { ticker: "HELX", daysAway: 12, estimate: "$2.10" },
  { ticker: "LUMN", daysAway: 18, estimate: "$0.95", previous: "$0.88" },
  { ticker: "PRSM", daysAway: 22, estimate: "$1.45" },
  { ticker: "ATLS", daysAway: 28, estimate: "$0.42" },
  { ticker: "ORBT", daysAway: 34, estimate: "$0.78" },
  { ticker: "VEGA", daysAway: 41, estimate: "$1.10" },
];

export default function EarningsView() {
  const { t, lang } = useLang();
  const { isAuthed, isPremium, hydrated, open: openAuth } = useAuth();

  useEffect(() => {
    if (hydrated && !isAuthed) openAuth("login");
  }, [hydrated, isAuthed, openAuth]);

  if (!hydrated) {
    return <div className="min-h-[60vh]" />;
  }

  if (!isAuthed) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-32 sm:py-40 text-center">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight">
          {lang === "ar" ? "تقويم الأرباح" : "Earnings calendar"}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {lang === "ar" ? "سجّل الدخول لرؤية تقويم الأرباح القادمة." : "Log in to see the upcoming earnings calendar."}
        </p>
        <button onClick={() => openAuth("login")} type="button" className="btn-primary mt-6 justify-center">
          {t.nav.login}
        </button>
      </div>
    );
  }

  const Header = (
    <div className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 pt-24 sm:pt-32">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t.account.dashboard}</span>
        </Link>
        <Reveal>
          <span className="eyebrow">
            <span className="eyebrow-dot pulse-dot" />
            {lang === "ar" ? "تقويم الأرباح" : "Earnings"}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display mt-4 text-3xl sm:text-5xl tracking-tight leading-tight">
            {lang === "ar" ? "تقويم الأرباح القادمة" : "Upcoming earnings"}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted)] max-w-xl">
            {lang === "ar"
              ? "تواريخ إعلانات الأرباح المتوقعة لأبرز الأسهم خلال الأسابيع القادمة."
              : "Expected earnings release dates for major stocks over the coming weeks."}
          </p>
        </Reveal>
      </div>
    </div>
  );

  if (!isPremium) {
    return (
      <div className="relative">
        {Header}
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
          <Reveal>
            <PremiumGate variant="card" />
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {Header}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        <div
          className="rounded-2xl border border-[var(--border)] overflow-hidden"
          style={{ background: "var(--surface)" }}
        >
          <ul className="divide-y divide-[var(--border)]">
            {UPCOMING.map((e) => {
              const stock = getStock(e.ticker) ?? STOCKS[0];
              return (
                <li key={e.ticker}>
                  <Link
                    href={`/stock/${e.ticker}`}
                    className="flex items-center gap-4 px-5 sm:px-6 py-4 transition-colors"
                    onMouseEnter={(ev) => (ev.currentTarget.style.background = "var(--soft-bg)")}
                    onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                  >
                    <span
                      className="w-12 h-10 grid place-items-center rounded-md font-mono text-[11px] font-semibold shrink-0"
                      style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                      dir="ltr"
                    >
                      {stock.ticker}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] truncate" dir="ltr">
                        {stock.name.en}
                      </div>
                      <div className="text-[11.5px] text-[var(--muted)]" dir="ltr">
                        EPS estimate: {e.estimate}
                        {e.previous && <span className="ms-2 opacity-70">prev {e.previous}</span>}
                      </div>
                    </div>
                    <div
                      className="text-[12px] font-mono px-2.5 py-1 rounded-md whitespace-nowrap"
                      style={{ background: "var(--surface-2)", color: "var(--foreground)" }}
                    >
                      {lang === "ar" ? "بعد" : "in"} {e.daysAway} {lang === "ar" ? "يوم" : "days"}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
