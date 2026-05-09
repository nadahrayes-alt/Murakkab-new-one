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

export default function Articles() {
  const { t } = useLang();

  return (
    <section id="articles" className="relative py-10 sm:py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 divider" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 sm:gap-8">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t.articles.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
                {t.articles.title}
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--muted)]">{t.articles.subtitle}</p>
            </Reveal>
          </div>
          <Reveal delay={240}>
            <a href="#" className="btn-ghost shrink-0">
              {t.articles.cta}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.articles.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} y={20}>
              <Link
                href={`/article/${slugify(item.title, `article-${i + 1}`)}`}
                className="card-hover h-full flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
              >
                {/* Visual band */}
                <div
                  className="relative h-28 sm:h-32 border-b border-[var(--border)] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in oklab, var(--accent) ${10 + i * 4}%, var(--surface)), var(--surface))`,
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
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
                  <div className="absolute top-3 start-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-[11px]" style={{ background: "var(--surface-2)", color: "var(--accent)" }}>
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-base sm:text-lg leading-snug">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-[11px] sm:text-xs text-[var(--muted)]">
                    <span>{item.author}</span>
                    <span className="inline-flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      {item.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
