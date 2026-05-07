"use client";

import { useLang } from "@/lib/LanguageProvider";

export default function AISummary() {
  const { lang } = useLang();

  const labels = {
    title: lang === "ar" ? "ملخّص ذكاء اصطناعي" : "AI summary",
    generated: lang === "ar" ? "تم توليده خلال 0.4 ثانية" : "Generated in 0.4s",
    bullets: lang === "ar"
      ? [
          "أساسيات مالية قوية مع نمو إيرادات 14٪ سنوياً",
          "السعر الحالي قريب من القيمة العادلة",
          "متوافق مع جميع المعايير الشرعية المعتمدة",
        ]
      : [
          "Strong fundamentals with 14% YoY revenue growth",
          "Current price near fair-value range",
          "Compliant with all reference Shariah criteria",
        ],
  };

  return (
    <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 overflow-hidden">
      <div className="absolute -top-16 -end-12 w-40 h-40 glow-soft pointer-events-none" />

      <div className="relative flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg grid place-items-center font-display text-xs"
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          AI
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] sm:text-sm font-medium">{labels.title}</div>
          <div className="text-[10px] sm:text-[11px] text-[var(--muted)]">{labels.generated}</div>
        </div>
        <span className="hidden sm:inline-flex w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
      </div>

      <ul className="relative mt-4 space-y-2.5">
        {labels.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[12px] sm:text-[13px] leading-relaxed">
            <span
              className="mt-0.5 grid place-items-center w-4 h-4 rounded-full shrink-0"
              style={{ background: "rgba(34, 187, 33, 0.14)", color: "var(--accent)" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
