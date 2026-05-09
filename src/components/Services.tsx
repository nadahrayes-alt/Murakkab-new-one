"use client";

import { useLang } from "@/lib/LanguageProvider";
import AISummary from "./mockups/AISummary";
import { Parallax, Reveal } from "./Parallax";

const BULLET_ICONS: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  filter: (
    <>
      <path d="M4 5h16l-6 8v6l-4-2v-4L4 5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </>
  ),
  compare: (
    <>
      <path d="M5 4v16M19 4v16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 8h6M5 14h4M19 12h-4M19 18h-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  explain: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  pulse: (
    <>
      <path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function Services() {
  const { t } = useLang();

  return (
    <section id="features" className="relative py-10 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 divider" />
      <Parallax speed={0.22} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)] bg-grid opacity-30" />
      </Parallax>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t.features.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
              {t.features.title}
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--muted)]">{t.features.intro}</p>
          </Reveal>
        </div>

        {/* Bullet grid with stagger */}
        <ul className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {t.features.bullets.map((b, i) => (
            <Reveal key={b.text} delay={i * 90} y={18} as="li" className="block">
              <div className="card-hover h-full flex items-start gap-3 sm:gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
                <span className="grid place-items-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 shrink-0">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                    {BULLET_ICONS[b.icon]}
                  </svg>
                </span>
                <span className="pt-1 sm:pt-1.5 text-sm sm:text-[15px] leading-relaxed">{b.text}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Section CTA */}
        <Reveal delay={200}>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <a href="#pricing" className="btn-ghost">
              {t.featuresCta}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>

        {/* AI Support — split with mockup */}
        <Reveal delay={300} y={28}>
          <div className="mt-8 sm:mt-10 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/[0.08] via-[var(--surface)] to-[var(--surface)]">
            <Parallax speed={0.18} className="absolute -top-24 -end-16 w-72 h-72 pointer-events-none">
              <div className="absolute inset-0 glow-soft" />
            </Parallax>
            <div className="relative grid md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10 items-center">
              <div className="md:col-span-7">
                <span className="eyebrow">{t.features.ai.eyebrow}</span>
                <h3 className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl md:text-3xl leading-tight">
                  {t.features.ai.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-xl">
                  {t.features.ai.desc}
                </p>
              </div>
              <div className="md:col-span-5">
                <Parallax speed={-0.04}>
                  <AISummary />
                </Parallax>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
