"use client";

import { useLang } from "@/lib/LanguageProvider";
import { Parallax, Reveal } from "./Parallax";

export default function Benefits() {
  const { t } = useLang();

  return (
    <section id="trust" className="relative py-10 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 divider" />
      <Parallax speed={0.25} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 glow-soft opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </Parallax>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <Reveal>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t.trust.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
            {t.trust.title}
          </h2>
        </Reveal>

        <div className="mt-8 sm:mt-10 space-y-2.5 sm:space-y-3 text-[var(--muted)] text-base sm:text-lg md:text-xl leading-relaxed">
          <Reveal delay={200}><p>{t.trust.bodyP1}</p></Reveal>
          <Reveal delay={300}><p>{t.trust.bodyP2}</p></Reveal>
          <Reveal delay={400}><p>{t.trust.bodyP3}</p></Reveal>
        </div>

        <Reveal delay={520}>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <a href="#articles" className="btn-ghost">
              {t.trustCta}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
