"use client";

import { useLang } from "@/lib/LanguageProvider";
import StockCard from "./mockups/StockCard";
import { Parallax, Reveal } from "./Parallax";

const FILTER_ICONS: Record<string, React.ReactNode> = {
  quality: (
    <>
      <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  value: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9.5C9.6 8.6 10.7 8 12 8c1.66 0 3 1.12 3 2.5S13.66 13 12 13v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 17.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  shariah: (
    <>
      <path d="M14 4a8 8 0 100 16 8 8 0 010-16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16.5 12l3-1.5-1 3.2L20 16.5l-3.2-.7L15 18l-.5-3.2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
};

export default function Process() {
  const { t } = useLang();
  return (
    <section id="filters" className="relative py-16 sm:py-24 lg:py-28">
      <div className="absolute inset-x-0 top-0 divider" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t.filters.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
              {t.filters.title}
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--muted)]">{t.filters.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {t.filters.items.map((f, i) => (
              <Reveal key={f.title} delay={i * 120} y={20}>
                <article className="card-hover relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                        {FILTER_ICONS[f.icon]}
                      </svg>
                    </div>
                    <span className="text-[var(--muted)] font-display text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl">{f.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Stock card mockup with parallax */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Reveal delay={240} y={32}>
              <Parallax speed={-0.06}>
                <StockCard />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
