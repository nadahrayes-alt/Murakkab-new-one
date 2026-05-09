"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";
import { Reveal } from "./Parallax";

function slugify(s: string, fallback: string) {
  const slug = s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return slug || fallback;
}

export default function News() {
  const { t } = useLang();

  return (
    <section id="news" className="relative py-10 sm:py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 divider" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 sm:gap-8">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t.news.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
                {t.news.title}
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--muted)]">{t.news.subtitle}</p>
            </Reveal>
          </div>
          <Reveal delay={240}>
            <a href="#" className="btn-ghost shrink-0">
              {t.news.cta}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 gap-4 sm:gap-5">
          {t.news.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 100} y={20}>
              <Link
                href={`/article/${slugify(item.title, `news-${i + 1}`)}`}
                className="card-hover h-full block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 text-[11px] sm:text-xs">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5"
                    style={{
                      background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-[var(--muted)]">{item.date}</span>
                </div>
                <h3 className="mt-3 sm:mt-4 font-display text-lg sm:text-xl leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-sm text-[var(--muted)] leading-relaxed">
                  {item.snippet}
                </p>
                <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-[var(--accent)]">
                  <span>{t.common.readMore}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
