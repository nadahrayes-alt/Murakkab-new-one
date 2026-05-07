"use client";

import { useState } from "react";
import { useLang } from "@/lib/LanguageProvider";
import { useAuth } from "@/lib/AuthProvider";
import { Parallax, Reveal } from "./Parallax";

type Billing = "monthly" | "annual";

export default function Plans() {
  const { t } = useLang();
  const { open: openAuth } = useAuth();
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section id="pricing" className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 divider" />
      <Parallax speed={0.2} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom,black_30%,transparent_70%)] bg-grid opacity-30" />
      </Parallax>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t.pricing.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
              {t.pricing.title}
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[var(--muted)]">
              {t.pricing.body}
            </p>
          </Reveal>

          {/* Billing toggle */}
          <Reveal delay={240}>
            <div
              className="mt-7 sm:mt-9 inline-flex items-center rounded-full border border-[var(--border)] p-1 text-[13px] mx-auto"
              style={{ background: "var(--soft-bg)" }}
            >
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className="px-4 sm:px-5 py-1.5 rounded-full transition-colors"
                style={{
                  background: billing === "monthly" ? "var(--accent)" : "transparent",
                  color: billing === "monthly" ? "var(--accent-contrast)" : "var(--muted)",
                }}
                aria-pressed={billing === "monthly"}
              >
                {t.pricing.billingMonthly}
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className="px-4 sm:px-5 py-1.5 rounded-full transition-colors"
                style={{
                  background: billing === "annual" ? "var(--accent)" : "transparent",
                  color: billing === "annual" ? "var(--accent-contrast)" : "var(--muted)",
                }}
                aria-pressed={billing === "annual"}
              >
                {t.pricing.billingAnnual}
              </button>
            </div>
          </Reveal>
        </div>

        {/* Tiers */}
        <div className="mt-10 sm:mt-14 grid md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          {t.pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={280 + i * 120} y={26}>
              <article
                className={`relative h-full rounded-2xl sm:rounded-3xl border p-6 sm:p-8 flex flex-col ${
                  tier.featured
                    ? "border-[color:color-mix(in_oklab,var(--accent)_45%,transparent)]"
                    : "border-[var(--border)]"
                }`}
                style={{
                  background: tier.featured
                    ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 6%, var(--surface)) 0%, var(--surface) 100%)"
                    : "var(--surface)",
                }}
              >
                {tier.featured && (
                  <span
                    className="absolute -top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] sm:text-[12px] font-medium"
                    style={{
                      background: "var(--accent)",
                      color: "var(--accent-contrast)",
                      insetInlineStart: "1.5rem",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2l2.39 6.99H22l-6.06 4.41L18.34 22 12 17.27 5.66 22l2.4-8.6L2 8.99h7.61z" />
                    </svg>
                    {t.pricing.popular}
                  </span>
                )}

                {/* Name + tagline */}
                <h3 className="font-display text-3xl sm:text-4xl">{tier.name}</h3>
                <p className="mt-2 text-[13px] sm:text-sm text-[var(--muted)] min-h-[2.5rem]">
                  {tier.tagline}
                </p>

                {/* Price */}
                <div className="mt-5 sm:mt-6">
                  {tier.isFree ? (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-display text-5xl sm:text-6xl text-[var(--foreground)]">
                        {tier.priceFreeLabel}
                      </span>
                      <span className="text-sm text-[var(--muted)]">{t.pricing.forever}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2 flex-wrap" dir="ltr">
                        {billing === "annual" && tier.priceAnnualOriginal && (
                          <span className="text-base sm:text-lg text-[var(--muted)] line-through">
                            {tier.priceAnnualOriginal}
                          </span>
                        )}
                        <span className="font-display text-5xl sm:text-6xl text-[var(--foreground)]">
                          {billing === "monthly" ? tier.priceMonthly : tier.priceAnnual}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-[var(--muted)]">
                        <span>{billing === "monthly" ? t.pricing.monthlyLabel : t.pricing.annualLabel}</span>
                        {billing === "annual" && (
                          <span
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                            style={{
                              background: "color-mix(in oklab, var(--accent) 18%, transparent)",
                              color: "var(--accent)",
                            }}
                          >
                            {t.pricing.saveLabel}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="mt-7 sm:mt-8 space-y-3 text-sm sm:text-[15px]">
                  {tier.included.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 grid place-items-center w-5 h-5 rounded-full shrink-0"
                        style={{
                          background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                          color: "var(--accent)",
                        }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                  {tier.excluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 opacity-50">
                      <span
                        className="mt-0.5 grid place-items-center w-5 h-5 rounded-full shrink-0 border border-[var(--border)]"
                        style={{ color: "var(--muted)" }}
                      >
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="leading-relaxed line-through decoration-[var(--muted)]">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA — pinned to bottom */}
                <div className="mt-auto pt-7 sm:pt-8">
                  <button
                    type="button"
                    onClick={() => openAuth("signup")}
                    className={
                      tier.featured
                        ? "btn-primary w-full justify-center !py-2.5"
                        : "btn-ghost w-full justify-center !py-2.5"
                    }
                  >
                    {tier.ctaLabel}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
