"use client";

import { useLang } from "@/lib/LanguageProvider";
import { Reveal } from "./Parallax";

export default function About() {
  const { t } = useLang();
  return (
    <section id="problem" className="relative py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-start">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t.problem.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
                {t.problem.title}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 space-y-4 sm:space-y-5 text-[var(--muted)] text-sm sm:text-base md:text-lg leading-relaxed">
            <Reveal delay={180}>
              <p>{t.problem.bodyP1}</p>
            </Reveal>
            <Reveal delay={260}>
              <p>{t.problem.bodyP2}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
