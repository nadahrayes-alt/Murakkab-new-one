"use client";

import { useLang } from "@/lib/LanguageProvider";
import { Reveal } from "./Parallax";

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section id="testimonials" className="relative py-10 sm:py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 divider" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t.testimonials.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
              {t.testimonials.title}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="mt-7 flex justify-center">
            <a href="#pricing" className="btn-primary">
              {t.testimonialsCta}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14 columns-1 sm:columns-2 gap-4 sm:gap-5 [column-fill:_balance] max-w-4xl mx-auto">
          {t.testimonials.items.map((tm, i) => (
            <Reveal key={i} delay={(i % 4) * 100} y={20} as="figure" className="break-inside-avoid mb-4 sm:mb-5 block">
              <div className="card-hover rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--accent)]">
                  <path d="M7 7h4v4H7c0 2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-4c0 2 1 3 3 3v3c-4 0-6-2-6-6V7z" fill="currentColor" />
                </svg>
                <blockquote className="mt-3 sm:mt-4 text-sm sm:text-[15px] leading-relaxed text-[var(--foreground)]/90">
                  {tm.quote}
                </blockquote>
                <figcaption className="mt-4 sm:mt-5 flex items-center gap-3">
                  <span
                    className="grid place-items-center w-9 h-9 rounded-full bg-[var(--surface-2)] text-sm font-medium shrink-0"
                    aria-hidden
                  >
                    {tm.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] sm:text-sm truncate">{tm.name}</div>
                    <div className="text-[11px] sm:text-xs text-[var(--muted)] truncate">{tm.role}</div>
                  </div>
                </figcaption>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
