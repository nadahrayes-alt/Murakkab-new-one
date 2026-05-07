"use client";

import { useLang } from "@/lib/LanguageProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative pt-16 sm:pt-24 lg:pt-28 pb-8 sm:pb-10 overflow-hidden">
      <div className="absolute inset-x-0 -top-10 h-40 glow-soft pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        {/* Final CTA */}
        <div className="text-center">
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight max-w-3xl mx-auto">
            {t.footer.cta}
          </h3>
          <div className="mt-6 sm:mt-7">
            <a href="#pricing" className="btn-primary">
              {t.footer.ctaButton}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer grid */}
        <div className="mt-14 sm:mt-20 grid md:grid-cols-12 gap-8 sm:gap-10 pt-8 sm:pt-10 border-t border-[var(--border)]">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-8 h-8 rounded-md bg-[var(--accent)] text-[var(--accent-contrast)]">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                  <path d="M5 4l5 8-5 8M19 4l-5 8 5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display text-xl">
                {t.footer.brand}
                <span className="text-[var(--accent)]">{t.footer.brandPlus}</span>
              </span>
            </div>
            <p className="mt-3 sm:mt-4 text-sm text-[var(--muted)] max-w-xs leading-relaxed">{t.footer.tagline}</p>
            <p className="mt-3 sm:mt-4 text-xs text-[var(--muted)]/80 max-w-xs leading-relaxed">{t.footer.disclaimer}</p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
            <div>
              <div className="text-[var(--muted)] text-[10px] sm:text-xs uppercase tracking-[0.16em]">
                {t.footer.sections.explore}
              </div>
              <ul className="mt-3 sm:mt-4 space-y-2">
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#problem">{t.footer.links.problem}</a></li>
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#filters">{t.footer.links.filters}</a></li>
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#features">{t.footer.links.features}</a></li>
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#pricing">{t.footer.links.pricing}</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[var(--muted)] text-[10px] sm:text-xs uppercase tracking-[0.16em]">
                {t.footer.sections.company}
              </div>
              <ul className="mt-3 sm:mt-4 space-y-2">
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#">{t.footer.links.about}</a></li>
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#">{t.footer.links.contact}</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[var(--muted)] text-[10px] sm:text-xs uppercase tracking-[0.16em]">
                {t.footer.sections.legal}
              </div>
              <ul className="mt-3 sm:mt-4 space-y-2 grid grid-cols-2 sm:grid-cols-1 gap-y-2">
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#">{t.footer.links.privacy}</a></li>
                <li><a className="hover:text-[var(--accent)] transition-colors" href="#">{t.footer.links.terms}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-[var(--muted)] pt-5 sm:pt-6 border-t border-[var(--border)]">
          <span>© {new Date().getFullYear()} {t.footer.brand}{t.footer.brandPlus}. {t.footer.rights}</span>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Twitter" className="hover:text-[var(--foreground)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 3H21l-6.49 7.41L22 21h-6.844l-4.83-6.27L4.5 21H1.74l6.94-7.93L1.5 3h7l4.36 5.78L18.244 3zm-1.2 16.2h1.69L7.06 4.7h-1.8l11.784 14.5z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[var(--foreground)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.66 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.55v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.88V8z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
