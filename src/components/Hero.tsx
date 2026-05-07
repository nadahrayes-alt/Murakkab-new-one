"use client";

import { useLang } from "@/lib/LanguageProvider";
import StockDashboard from "./mockups/StockDashboard";
import { Parallax, Reveal, Stagger } from "./Parallax";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      <Parallax speed={0.18} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </Parallax>
      <Parallax speed={0.32} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 glow" />
      </Parallax>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot pulse-dot" />
              {t.hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display mt-5 sm:mt-6 text-[2.25rem] leading-[1.15] sm:text-6xl md:text-7xl sm:leading-[1.1] tracking-tight max-w-4xl mx-auto">
              <span className="block">{t.hero.titleLine1}</span>
              <span className="block text-[var(--accent)]">{t.hero.titleLine2}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 sm:mt-7 text-[var(--muted)] text-[15px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-7 sm:mt-9 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              <a href="#signup" className="btn-primary">
                {t.hero.ctaPrimary}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#features" className="btn-ghost">
                {t.hero.ctaSecondary}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Dashboard mockup with subtle parallax */}
        <Reveal delay={340} y={32}>
          <div id="search" className="relative mt-12 sm:mt-16 max-w-5xl mx-auto scroll-mt-24">
            <Parallax speed={-0.04} className="absolute -inset-x-6 sm:-inset-x-10 -top-10 h-40 pointer-events-none">
              <div className="absolute inset-0 glow" />
            </Parallax>
            <Parallax speed={-0.05}>
              <StockDashboard />
            </Parallax>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Stagger base={120} step={90} className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {t.hero.stats.map((s) => (
            <div
              key={s.label}
              className="text-center px-2 sm:px-4 py-3 sm:py-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-sm"
            >
              <div className="font-display text-xl sm:text-3xl text-[var(--foreground)]">{s.value}</div>
              <div className="mt-1 text-[10px] sm:text-xs text-[var(--muted)] leading-tight">{s.label}</div>
            </div>
          ))}
        </Stagger>

        {/* Trust strip */}
        <Reveal delay={200}>
          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              {t.hero.partnersLabel}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
