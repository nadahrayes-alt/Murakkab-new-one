"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/LanguageProvider";
import { Reveal } from "./Parallax";

function MiniSparkline({ trend = "up" }: { trend?: "up" | "down" }) {
  const path =
    trend === "up"
      ? "M0,40 L20,38 L40,30 L60,32 L80,22 L100,18 L120,14 L140,10 L160,12 L180,6 L200,4"
      : "M0,10 L20,12 L40,18 L60,16 L80,24 L100,30 L120,28 L140,34 L160,30 L180,38 L200,42";
  return (
    <svg viewBox="0 0 200 50" className="w-full h-24" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="grad-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L200,50 L0,50 Z`} fill="url(#grad-up)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StockSidebarCard() {
  const { t, lang } = useLang();
  return (
    <div
      className="rounded-2xl border border-[var(--border)] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, color-mix(in oklab, var(--accent) 5%, var(--surface)) 0%, var(--surface) 60%)",
      }}
    >
      <div className="p-5 border-b border-[var(--border)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="w-12 h-10 grid place-items-center rounded-md font-mono text-[12px] font-semibold"
              style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
              dir="ltr"
            >
              ARMD
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">
                {lang === "ar" ? "أرمادا تك." : "Armada Tech."}
              </div>
              <div className="text-[11px] text-[var(--muted)]">NYSE · {lang === "ar" ? "تقنية" : "Technology"}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-2" dir="ltr">
          <div>
            <div className="font-display text-3xl">$142.18</div>
            <div className="text-[11px]" style={{ color: "var(--accent)" }}>+2.34%</div>
          </div>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]"
            style={{ background: "color-mix(in oklab, var(--accent) 14%, transparent)", color: "var(--accent)" }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Shariah ✓
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
          {t.article.stockSidebarTitle}
        </div>
        <div className="mt-3 space-y-2.5 text-[13px]">
          {[
            { k: "Quality", v: "92" },
            { k: "Value", v: "78" },
            { k: lang === "ar" ? "نمو الإيرادات" : "Revenue growth", v: "+14.2%" },
            { k: "P/E", v: "18.4" },
          ].map((row) => (
            <div key={row.k} className="flex items-center justify-between">
              <span className="text-[var(--muted)]">{row.k}</span>
              <span className="font-mono">{row.v}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 -mx-2">
          <MiniSparkline />
        </div>

        <button
          type="button"
          className="btn-primary w-full justify-center !py-2 mt-4 !text-[12.5px]"
        >
          {t.article.fullAnalysis}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CalloutBox({ title, body }: { title: string; body: string }) {
  return (
    <aside
      className="my-8 sm:my-10 relative rounded-2xl border overflow-hidden"
      style={{
        borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
        background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 8%, var(--surface)) 0%, var(--surface) 70%)",
      }}
    >
      <div className="absolute -top-12 -end-12 w-40 h-40 glow-soft pointer-events-none" />
      <div className="relative p-5 sm:p-6">
        <div className="inline-flex items-center gap-2">
          <span
            className="grid place-items-center w-8 h-8 rounded-lg font-display text-sm"
            style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
          >
            🧠
          </span>
          <span className="text-[12.5px] uppercase tracking-[0.18em] text-[var(--accent)] font-medium">
            {title}
          </span>
        </div>
        <p className="mt-3 text-[14.5px] sm:text-[15.5px] leading-relaxed">{body}</p>
      </div>
    </aside>
  );
}

function ChartPlaceholder({ kind = "line" }: { kind?: "line" | "bars" }) {
  return (
    <div
      className="my-6 rounded-xl border border-[var(--border)] overflow-hidden"
      style={{ background: "var(--surface-2)" }}
    >
      <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--muted)]">
        <span className="inline-flex items-center gap-1.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Chart placeholder
        </span>
        <span className="font-mono">12M</span>
      </div>
      <div className="px-4 py-5">
        {kind === "line" ? (
          <svg viewBox="0 0 400 100" className="w-full h-32" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,80 L40,75 L80,60 L120,65 L160,50 L200,40 L240,45 L280,30 L320,25 L360,15 L400,10 L400,100 L0,100 Z" fill="url(#line-grad)" />
            <path d="M0,80 L40,75 L80,60 L120,65 L160,50 L200,40 L240,45 L280,30 L320,25 L360,15 L400,10" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        ) : (
          <div className="flex items-end gap-1.5 h-32">
            {[40, 60, 50, 75, 55, 80, 70, 90, 65, 85, 95, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: i === 11 ? "var(--accent)" : "color-mix(in oklab, var(--accent) 25%, transparent)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ShareButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 h-9 text-[12.5px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      style={{ background: "var(--soft-bg)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 35%, transparent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function ArticleDetail({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const article = t.article.placeholder;

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <article className="relative">
      {/* Top breadcrumb / back */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-5 pt-24 sm:pt-28 flex items-center justify-between gap-3 text-sm">
          <Link
            href="/#news"
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{t.article.back}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ShareButton
              icon={
                copied ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden style={{ color: "var(--accent)" }}>
                    <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M10 14a4 4 0 005.66 0l3.66-3.66a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0L4.68 13.66a4 4 0 005.66 5.66l1-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
              label={copied ? t.article.copied : t.article.copyLink}
              onClick={handleCopy}
            />
          </div>
        </div>
      </div>

      {/* Hero / title block */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[12px] text-[var(--muted)]">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5"
                style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
              >
                {article.category}
              </span>
              <span>·</span>
              <span>
                {t.article.publishedOn} {article.date}
              </span>
              <span>·</span>
              <span>
                {article.readTimeValue} {t.article.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-display mt-5 sm:mt-6 text-3xl sm:text-5xl md:text-[3.4rem] leading-[1.1] tracking-tight">
              {article.title}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              {article.excerpt}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              <span
                className="grid place-items-center w-9 h-9 rounded-full font-display text-sm"
                style={{ background: "var(--surface-2)" }}
                aria-hidden
              >
                M
              </span>
              <div>
                <div className="text-[13px]">{article.author}</div>
                <div className="text-[11px] text-[var(--muted)]">murakkab.com/article/{slug}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Body + sidebar */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main column */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="prose-article">
                {article.sections.map((section, i) => (
                  <div key={i}>
                    {/* Section number badge */}
                    <div className="flex items-center gap-2 mt-10 first:mt-0 mb-4">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        {t.article.sectionLabel} {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 h-px bg-[var(--border)]" />
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-tight">
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-[15.5px] sm:text-[16.5px] leading-[1.85] text-[var(--foreground)]/95">
                      {section.paragraph}
                    </p>

                    {"chart" in section && section.chart && (
                      <ChartPlaceholder kind={i === 1 ? "line" : "bars"} />
                    )}

                    {"bullets" in section && section.bullets && (
                      <ul className="mt-5 space-y-2.5">
                        {section.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-[14.5px] sm:text-[15.5px]">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: "var(--accent)" }}
                            />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Callout after specific sections */}
                    {article.callouts
                      .filter((c) => c.after === i)
                      .map((c, ci) => (
                        <CalloutBox key={ci} title={c.title} body={c.body} />
                      ))}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Share row at bottom */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
              <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--muted)]">
                {t.article.shareTitle}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <ShareButton
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M18.244 3H21l-6.49 7.41L22 21h-6.844l-4.83-6.27L4.5 21H1.74l6.94-7.93L1.5 3h7l4.36 5.78L18.244 3zm-1.2 16.2h1.69L7.06 4.7h-1.8l11.784 14.5z" />
                    </svg>
                  }
                  label={t.article.shareTwitter}
                />
                <ShareButton
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.66 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.55v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.88V8z" />
                    </svg>
                  }
                  label={t.article.shareLinkedin}
                />
                <ShareButton
                  icon={
                    copied ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden style={{ color: "var(--accent)" }}>
                        <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M10 14a4 4 0 005.66 0l3.66-3.66a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0L4.68 13.66a4 4 0 005.66 5.66l1-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  }
                  label={copied ? t.article.copied : t.article.copyLink}
                  onClick={handleCopy}
                />
              </div>
            </div>
          </div>

          {/* Sidebar — sticky on lg+ */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-5">
              <StockSidebarCard />

              {/* Table of contents */}
              <div className="rounded-2xl border border-[var(--border)] p-5" style={{ background: "var(--surface)" }}>
                <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {t.article.tableOfContents}
                </div>
                <ul className="mt-3 space-y-2 text-[13px]">
                  {article.sections.map((s, i) => (
                    <li key={i}>
                      <a
                        href={`#section-${i}`}
                        className="flex items-start gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <span className="font-mono text-[10.5px] mt-0.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="line-clamp-2 leading-snug">{s.heading}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
              {t.article.related}
            </h2>
            <Link
              href="/#articles"
              className="text-[13px] text-[var(--accent)] hover:underline inline-flex items-center gap-1"
            >
              <span>{t.common.readMore}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {article.related.map((r, i) => (
              <Link
                key={i}
                href={`/article/${slug}-related-${i}`}
                className="group rounded-2xl border border-[var(--border)] overflow-hidden transition-colors"
                style={{ background: "var(--surface)" }}
              >
                <div
                  className="relative h-28 overflow-hidden border-b border-[var(--border)]"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in oklab, var(--accent) ${10 + i * 4}%, var(--surface)), var(--surface))`,
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
                    <path
                      d={
                        i === 0
                          ? "M0,70 Q50,20 100,55 T200,40"
                          : i === 1
                          ? "M0,50 L40,55 L80,30 L120,60 L160,35 L200,50"
                          : i === 2
                          ? "M0,80 Q40,70 80,65 T160,50 T200,30"
                          : "M0,40 L50,45 L100,30 L150,50 L200,25"
                      }
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
                    {r.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base sm:text-lg leading-snug group-hover:text-[var(--accent)] transition-colors">
                    {r.title}
                  </h3>
                  <div className="mt-3 text-[11px] text-[var(--muted)] inline-flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    {r.readTime} {t.article.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--accent)]/30 p-7 sm:p-10"
            style={{
              background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 10%, var(--surface)) 0%, var(--surface) 70%)",
            }}
          >
            <div className="absolute -top-20 -end-12 w-60 h-60 glow pointer-events-none" />
            <div className="relative text-center">
              <span className="eyebrow">
                <span className="eyebrow-dot pulse-dot" />
                {lang === "ar" ? "النشرة" : "Newsletter"}
              </span>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl leading-tight tracking-tight">
                {t.article.newsletter.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--muted)] max-w-md mx-auto">
                {t.article.newsletter.body}
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
              >
                <div
                  className="flex-1 flex items-center gap-2 rounded-full border border-[var(--border)] px-4 h-11"
                  style={{ background: "var(--surface)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--muted)] shrink-0">
                    <path d="M3 6.5L12 13l9-6.5M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                  <input
                    type="email"
                    placeholder={t.article.newsletter.placeholder}
                    className="bg-transparent outline-none flex-1 min-w-0 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  />
                </div>
                <button type="submit" className="btn-primary justify-center !px-5 whitespace-nowrap">
                  {t.article.newsletter.submit}
                </button>
              </form>
              <p className="mt-3 text-[11.5px] text-[var(--muted)]">{t.article.newsletter.notice}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
