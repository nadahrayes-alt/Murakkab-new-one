"use client";

import { useLang } from "@/lib/LanguageProvider";

function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const tone =
    score >= 80 ? "var(--accent)" : score >= 60 ? "#f5a623" : "#e74c3c";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16">
        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
          <circle cx="28" cy="28" r={radius} stroke="var(--border)" strokeWidth="4" fill="none" />
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke={tone}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-base sm:text-lg" style={{ color: tone }}>
            {score}
          </span>
        </div>
      </div>
      <div className="text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-[0.1em]">{label}</div>
    </div>
  );
}

export default function StockCard() {
  const { lang } = useLang();
  const labels = {
    sector: lang === "ar" ? "تقنية" : "Technology",
    quality: lang === "ar" ? "الجودة" : "Quality",
    value: lang === "ar" ? "القيمة" : "Value",
    shariah: lang === "ar" ? "شرعاً" : "Shariah",
    overall: lang === "ar" ? "تقييم إجمالي" : "Overall rating",
    excellent: lang === "ar" ? "ممتاز" : "Excellent",
    fair: lang === "ar" ? "سعر عادل" : "Fairly priced",
    pe: lang === "ar" ? "مكرر الربحية" : "P/E",
    growth: lang === "ar" ? "نمو الإيرادات" : "Revenue growth",
    margin: lang === "ar" ? "هامش الربح" : "Profit margin",
  };

  return (
    <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-[var(--border)] flex items-center justify-between" dir="ltr">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl grid place-items-center font-mono font-semibold"
            style={{ background: "rgba(34, 187, 33, 0.12)", color: "var(--accent)" }}
          >
            ARMD
          </div>
          <div>
            <div className="font-medium text-sm sm:text-base">Armada Tech.</div>
            <div className="text-xs text-[var(--muted)]">NYSE · {labels.sector}</div>
          </div>
        </div>
        <div className="text-right" dir="ltr">
          <div className="font-mono text-sm sm:text-base">$142.18</div>
          <div className="text-xs font-mono" style={{ color: "var(--accent)" }}>+2.34%</div>
        </div>
      </div>

      {/* Score rings */}
      <div className="px-5 sm:px-6 py-5 sm:py-6 flex items-start justify-around gap-3">
        <ScoreRing score={92} label={labels.quality} />
        <ScoreRing score={78} label={labels.value} />
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full grid place-items-center"
            style={{ background: "rgba(34, 187, 33, 0.14)", color: "var(--accent)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-[0.1em]">{labels.shariah}</div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="px-5 sm:px-6 py-4 border-t border-[var(--border)] grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-[0.08em]">{labels.pe}</div>
          <div className="mt-1 font-mono text-xs sm:text-sm">18.4</div>
        </div>
        <div className="border-x border-[var(--border)]">
          <div className="text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-[0.08em]">{labels.growth}</div>
          <div className="mt-1 font-mono text-xs sm:text-sm" style={{ color: "var(--accent)" }}>+14.2%</div>
        </div>
        <div>
          <div className="text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-[0.08em]">{labels.margin}</div>
          <div className="mt-1 font-mono text-xs sm:text-sm">23.1%</div>
        </div>
      </div>
    </div>
  );
}
