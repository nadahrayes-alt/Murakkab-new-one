"use client";

import { useLang } from "@/lib/LanguageProvider";
import { Parallax, Reveal } from "./Parallax";

export default function Register() {
  const { t } = useLang();

  return (
    <section id="register" className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 divider" />
      <Parallax speed={0.22} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-grid opacity-30" />
      </Parallax>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal y={28}>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/[0.10] via-[var(--surface)] to-[var(--surface)]">
            <Parallax speed={0.18} className="absolute -top-24 -end-16 w-72 h-72 pointer-events-none">
              <div className="absolute inset-0 glow" />
            </Parallax>

            <div className="relative p-7 sm:p-10 lg:p-12 text-center">
              <span className="eyebrow">
                <span className="eyebrow-dot pulse-dot" />
                {t.register.eyebrow}
              </span>

              <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
                {t.register.title}
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
                {t.register.body}
              </p>

              {/* Email + CTA */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
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
                    required
                    placeholder={t.register.emailPlaceholder}
                    className="bg-transparent outline-none flex-1 min-w-0 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  />
                </div>
                <button type="submit" className="btn-primary justify-center sm:!px-5 whitespace-nowrap">
                  {t.register.cta}
                </button>
              </form>

              {/* Bullets */}
              <ul className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] sm:text-[13px] text-[var(--muted)]">
                {t.register.bullets.map((b) => (
                  <li key={b} className="inline-flex items-center gap-1.5">
                    <span className="grid place-items-center w-4 h-4 rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 16%, transparent)", color: "var(--accent)" }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-7 text-[12px] sm:text-[13px] text-[var(--muted)]">
                <a href="#" className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors">
                  <span className="underline-offset-4 hover:underline">{t.register.altCta}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
