"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageProvider";
import { STOCKS } from "@/lib/stockData";
import type { AlertCondition, AlertRecord, AlertType } from "@/lib/AlertsProvider";

const TYPES: { value: AlertType; needsCondition: boolean }[] = [
  { value: "price", needsCondition: true },
  { value: "score", needsCondition: true },
  { value: "earnings", needsCondition: false },
  { value: "shariah", needsCondition: false },
];

const CONDITIONS_BY_TYPE: Record<AlertType, AlertCondition[]> = {
  price: ["priceAbove", "priceBelow"],
  score: ["scoreUp", "scoreDown"],
  earnings: [null],
  shariah: [null],
};

type Props = {
  open: boolean;
  initial?: AlertRecord | null;
  onClose: () => void;
  onSubmit: (data: { ticker: string; type: AlertType; condition: AlertCondition; value: string }) => void;
};

export default function AlertFormModal({ open, initial, onClose, onSubmit }: Props) {
  const { t, lang } = useLang();
  const [ticker, setTicker] = useState("");
  const [type, setType] = useState<AlertType>("price");
  const [condition, setCondition] = useState<AlertCondition>("priceAbove");
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<{ ticker?: string; value?: string }>({});

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setTicker(initial.ticker);
      setType(initial.type);
      setCondition(initial.condition);
      setValue(initial.value);
    } else {
      setTicker(STOCKS[0]?.ticker ?? "");
      setType("price");
      setCondition("priceAbove");
      setValue("");
    }
    setErrors({});
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [open, initial, onClose]);

  if (!open) return null;

  const needsCondition = TYPES.find((x) => x.value === type)?.needsCondition;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!ticker.trim()) next.ticker = lang === "ar" ? "اختر سهمًا" : "Pick a stock";
    if (!value.trim()) next.value = lang === "ar" ? "أدخل قيمة" : "Enter a value";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmit({ ticker: ticker.toUpperCase(), type, condition: needsCondition ? condition : null, value });
  };

  const title = initial
    ? lang === "ar" ? "تعديل التنبيه" : "Edit alert"
    : t.alerts.newAlert;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="modal-backdrop fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="modal-content relative w-full max-w-md rounded-2xl border border-[var(--border)] p-6 sm:p-7"
        style={{
          background: "linear-gradient(180deg, color-mix(in oklab, var(--accent) 4%, var(--surface)) 0%, var(--surface) 60%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <h3 className="font-display text-2xl tracking-tight">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid place-items-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label={t.auth.close}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-3.5">
          {/* Ticker */}
          <div>
            <label className="block text-[12px] text-[var(--muted)] mb-1.5">
              {lang === "ar" ? "السهم" : "Stock"}
            </label>
            <select
              value={ticker}
              onChange={(e) => {
                setTicker(e.target.value);
                if (errors.ticker) setErrors((p) => ({ ...p, ticker: undefined }));
              }}
              className="w-full rounded-xl border px-3.5 h-11 outline-none text-sm"
              style={{
                background: "var(--surface-2)",
                borderColor: errors.ticker ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
                color: "var(--foreground)",
              }}
            >
              {STOCKS.map((s) => (
                <option key={s.ticker} value={s.ticker}>
                  {s.ticker} — {s.name.en}
                </option>
              ))}
            </select>
            {errors.ticker && <p className="mt-1.5 text-[12px]" style={{ color: "#e74c3c" }} role="alert">{errors.ticker}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-[12px] text-[var(--muted)] mb-1.5">
              {lang === "ar" ? "نوع التنبيه" : "Alert type"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TYPES.map((opt) => {
                const isActive = type === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setType(opt.value);
                      const conds = CONDITIONS_BY_TYPE[opt.value];
                      setCondition(conds[0] ?? null);
                    }}
                    className="rounded-xl border px-3 py-2 text-[13px] transition-colors text-start"
                    style={{
                      background: isActive ? "color-mix(in oklab, var(--accent) 7%, var(--surface))" : "var(--surface-2)",
                      borderColor: isActive ? "color-mix(in oklab, var(--accent) 50%, transparent)" : "var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    {t.alerts.types[opt.value]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Condition (when applicable) */}
          {needsCondition && (
            <div>
              <label className="block text-[12px] text-[var(--muted)] mb-1.5">
                {lang === "ar" ? "الشرط" : "Condition"}
              </label>
              <select
                value={condition ?? ""}
                onChange={(e) => setCondition((e.target.value || null) as AlertCondition)}
                className="w-full rounded-xl border border-[var(--border)] px-3.5 h-11 outline-none text-sm"
                style={{ background: "var(--surface-2)", color: "var(--foreground)" }}
              >
                {CONDITIONS_BY_TYPE[type].map(
                  (c) =>
                    c && (
                      <option key={c} value={c}>
                        {t.alerts.conditions[c as keyof typeof t.alerts.conditions]}
                      </option>
                    )
                )}
              </select>
            </div>
          )}

          {/* Value */}
          <div>
            <label className="block text-[12px] text-[var(--muted)] mb-1.5">
              {lang === "ar" ? "القيمة" : "Value"}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (errors.value) setErrors((p) => ({ ...p, value: undefined }));
              }}
              placeholder={type === "price" ? "$150.00" : type === "score" ? "85" : ""}
              aria-invalid={!!errors.value}
              className="w-full rounded-xl border px-3.5 h-11 bg-transparent outline-none text-sm font-mono"
              style={{
                background: "var(--surface-2)",
                borderColor: errors.value ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
                color: "var(--foreground)",
              }}
              dir="ltr"
            />
            {errors.value && <p className="mt-1.5 text-[12px]" style={{ color: "#e74c3c" }} role="alert">{errors.value}</p>}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="btn-ghost !text-[13px]">
            {lang === "ar" ? "إلغاء" : "Cancel"}
          </button>
          <button type="submit" className="btn-primary !text-[13px]">
            {initial ? (lang === "ar" ? "حفظ" : "Save") : (lang === "ar" ? "إنشاء" : "Create")}
          </button>
        </div>
      </form>
    </div>
  );
}
