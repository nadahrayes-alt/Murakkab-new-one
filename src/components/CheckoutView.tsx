"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";

type Billing = "monthly" | "annual";

const PRICES: Record<Billing, { display: string; subtitle: { en: string; ar: string } }> = {
  monthly: { display: "$35.00", subtitle: { en: "per month, billed monthly", ar: "شهريًا" } },
  annual: { display: "$199.00", subtitle: { en: "per year — save 52%", ar: "سنويًا — وفّر 52٪" } },
};

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}
function formatCardNumber(s: string) {
  return digitsOnly(s).slice(0, 19).replace(/(\d{4})/g, "$1 ").trim();
}
function formatExpiry(s: string) {
  const d = digitsOnly(s).slice(0, 4);
  if (d.length < 3) return d;
  return d.slice(0, 2) + "/" + d.slice(2);
}

const TEST_CARD = "4242 4242 4242 4242";

export default function CheckoutView() {
  const { lang } = useLang();
  const { isAuthed, hydrated, upgrade, open: openAuth, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const billing: Billing = searchParams.get("billing") === "monthly" ? "monthly" : "annual";

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<{ name?: string; card?: string; expiry?: string; cvc?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Anonymous users get bounced to login.
  useEffect(() => {
    if (hydrated && !isAuthed) openAuth("login", "premium");
  }, [hydrated, isAuthed, openAuth]);

  // After success, redirect to dashboard
  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => router.push("/dashboard"), 1400);
    return () => clearTimeout(id);
  }, [success, router]);

  const t = useMemo(
    () => ({
      en: {
        eyebrow: "Checkout",
        title: "Subscribe to Murakkab+ Premium",
        backToPricing: "← Back to plans",
        plan: "Plan",
        plansLine: "Premium",
        billed: { monthly: "Billed monthly", annual: "Billed annually" }[billing],
        total: "Total today",
        cardholder: "Cardholder name",
        cardNumber: "Card number",
        expiry: "Expiry",
        cvc: "CVC",
        useTest: "Fill the form with this card",
        testBanner: {
          title: "Test card for QA",
          subtitle: "Use these values to walk through the flow — no real charge.",
          number: "Card number",
          expiryLabel: "Expiry",
          cvcLabel: "CVC",
          nameLabel: "Cardholder",
          anyName: "Any name",
        },
        pay: "Confirm and pay",
        paying: "Processing…",
        successTitle: "Payment confirmed",
        successBody: "Your Premium plan is active. Redirecting to your dashboard…",
        stub:
          "⚠ This is a simulated checkout. No real card is ever charged — it is a UI placeholder for a Stripe / Paddle integration that has not yet been wired up.",
        error: {
          name: "Please enter the cardholder name",
          card: "Card number is invalid (use 4242 4242 4242 4242 to test)",
          expiry: "Expiry must be MM/YY in the future",
          cvc: "CVC must be 3 or 4 digits",
        },
      },
      ar: {
        eyebrow: "إتمام الاشتراك",
        title: "اشترك في مركّب+ Premium",
        backToPricing: "← الرجوع إلى الخطط",
        plan: "الخطة",
        plansLine: "Premium",
        billed: { monthly: "اشتراك شهري", annual: "اشتراك سنوي" }[billing],
        total: "الإجمالي الآن",
        cardholder: "الاسم على البطاقة",
        cardNumber: "رقم البطاقة",
        expiry: "تاريخ الانتهاء",
        cvc: "CVC",
        useTest: "تعبئة الفورم بهذه البطاقة",
        testBanner: {
          title: "بطاقة تجريبية للفريق",
          subtitle: "استخدم هذه القيم لتجربة عملية الدفع — لن يتم خصم أي مبلغ.",
          number: "رقم البطاقة",
          expiryLabel: "تاريخ الانتهاء",
          cvcLabel: "CVC",
          nameLabel: "اسم حامل البطاقة",
          anyName: "أي اسم",
        },
        pay: "تأكيد الدفع",
        paying: "جارٍ المعالجة…",
        successTitle: "تم تأكيد الدفع",
        successBody: "خطة Premium مفعّلة الآن. جاري التحويل إلى لوحة التحكم…",
        stub:
          "⚠ هذه شاشة دفع محاكاة فقط. لا يتم خصم أي مبلغ حقيقي — هي placeholder لتكامل Stripe / Paddle لم يتم ربطه بعد.",
        error: {
          name: "أدخل اسم حامل البطاقة",
          card: "رقم البطاقة غير صحيح (استخدم 4242 4242 4242 4242 للتجربة)",
          expiry: "MM/YY لتاريخ مستقبلي",
          cvc: "CVC من 3 أو 4 أرقام",
        },
      },
    })[lang],
    [lang, billing]
  );

  const useTestCard = () => {
    setName(user?.name ?? "Test Cardholder");
    setCard(TEST_CARD);
    setExpiry("12/30");
    setCvc("123");
    setErrors({});
  };

  const validate = (): typeof errors => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = t.error.name;
    const cardDigits = digitsOnly(card);
    if (cardDigits.length < 13 || cardDigits.length > 19) e.card = t.error.card;
    const ed = digitsOnly(expiry);
    if (ed.length !== 4) {
      e.expiry = t.error.expiry;
    } else {
      const mm = parseInt(ed.slice(0, 2), 10);
      const yy = parseInt(ed.slice(2), 10);
      if (mm < 1 || mm > 12) e.expiry = t.error.expiry;
      // 2026 → yy=26. Compare as years-since-2000.
      const nowYY = new Date().getFullYear() - 2000;
      const nowMM = new Date().getMonth() + 1;
      if (yy < nowYY || (yy === nowYY && mm < nowMM)) e.expiry = t.error.expiry;
    }
    const cd = digitsOnly(cvc);
    if (cd.length < 3 || cd.length > 4) e.cvc = t.error.cvc;
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitting(true);
    // Simulated 1.2s processing
    await new Promise((r) => setTimeout(r, 1200));
    upgrade();
    setSubmitting(false);
    setSuccess(true);
  };

  if (!hydrated) return <div className="min-h-[60vh]" />;
  if (!isAuthed) return <div className="min-h-[60vh]" />;

  if (success) {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6 py-32 sm:py-40 text-center">
        <span
          className="inline-grid place-items-center w-14 h-14 rounded-full mb-5"
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="font-display text-3xl tracking-tight">{t.successTitle}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">{t.successBody}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 pt-24 sm:pt-32">
      <Link
        href="/#pricing"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
      >
        {t.backToPricing}
      </Link>
      <span className="eyebrow">
        <span className="eyebrow-dot pulse-dot" />
        {t.eyebrow}
      </span>
      <h1 className="font-display mt-4 text-3xl sm:text-4xl tracking-tight">{t.title}</h1>

      <div className="mt-8 grid lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Order summary */}
        <aside className="lg:col-span-5">
          <div
            className="rounded-2xl border border-[var(--border)] p-5 sm:p-6"
            style={{
              background: "linear-gradient(180deg, color-mix(in oklab, var(--accent) 5%, var(--surface)) 0%, var(--surface) 60%)",
            }}
          >
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--muted)]">{t.plan}</div>
            <div className="mt-1 font-display text-2xl flex items-center gap-2">
              {t.plansLine}
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-[0.08em]"
                style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
              >
                Pro
              </span>
            </div>
            <div className="mt-1 text-[12.5px] text-[var(--muted)]">{t.billed}</div>

            <div className="mt-5 pt-5 border-t border-[var(--border)] flex items-baseline justify-between" dir="ltr">
              <span className="text-[13px] text-[var(--muted)]">{t.total}</span>
              <span className="font-display text-3xl">{PRICES[billing].display}</span>
            </div>
            <p className="mt-4 text-[11.5px] text-[var(--muted)] italic leading-relaxed">{t.stub}</p>
          </div>
        </aside>

        {/* Payment form */}
        <form onSubmit={onSubmit} className="lg:col-span-7 space-y-4" noValidate>
          {/* Test card banner — visible to anyone testing the flow */}
          <div
            className="rounded-2xl border p-4 sm:p-5"
            style={{
              borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
              background: "color-mix(in oklab, var(--accent) 7%, var(--surface))",
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
                  {t.testBanner.title}
                </div>
                <p className="mt-1.5 text-[12.5px] text-[var(--muted)] leading-relaxed">{t.testBanner.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={useTestCard}
                className="shrink-0 rounded-lg px-3 py-1.5 text-[11.5px] font-medium border transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_15%,transparent)]"
                style={{ borderColor: "color-mix(in oklab, var(--accent) 45%, transparent)", color: "var(--accent)" }}
              >
                {t.useTest}
              </button>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-[12px]">
              <div className="rounded-lg px-2.5 py-2 bg-[var(--surface-2)]/60 border border-[var(--border)] col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{t.testBanner.number}</dt>
                <dd className="mt-0.5 font-mono text-[13px]" dir="ltr">4242 4242 4242 4242</dd>
              </div>
              <div className="rounded-lg px-2.5 py-2 bg-[var(--surface-2)]/60 border border-[var(--border)]">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{t.testBanner.expiryLabel}</dt>
                <dd className="mt-0.5 font-mono text-[13px]" dir="ltr">12/30</dd>
              </div>
              <div className="rounded-lg px-2.5 py-2 bg-[var(--surface-2)]/60 border border-[var(--border)]">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{t.testBanner.cvcLabel}</dt>
                <dd className="mt-0.5 font-mono text-[13px]" dir="ltr">123</dd>
              </div>
              <div className="rounded-lg px-2.5 py-2 bg-[var(--surface-2)]/60 border border-[var(--border)] col-span-2 sm:col-span-4">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{t.testBanner.nameLabel}</dt>
                <dd className="mt-0.5 text-[13px]">{t.testBanner.anyName}</dd>
              </div>
            </dl>
          </div>

          <div>
            <label className="block text-[12px] text-[var(--muted)] mb-1.5">{t.cardholder}</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              aria-invalid={!!errors.name}
              className="w-full rounded-xl border px-3.5 h-11 bg-transparent outline-none text-sm"
              style={{
                background: "var(--surface-2)",
                borderColor: errors.name ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
              }}
              autoComplete="cc-name"
            />
            {errors.name && <p className="mt-1.5 text-[12px]" style={{ color: "#e74c3c" }} role="alert">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-[12px] text-[var(--muted)] mb-1.5">{t.cardNumber}</label>
            <input
              value={card}
              onChange={(e) => {
                setCard(formatCardNumber(e.target.value));
                if (errors.card) setErrors((p) => ({ ...p, card: undefined }));
              }}
              placeholder="4242 4242 4242 4242"
              inputMode="numeric"
              autoComplete="cc-number"
              aria-invalid={!!errors.card}
              className="w-full rounded-xl border px-3.5 h-11 bg-transparent outline-none text-sm font-mono"
              style={{
                background: "var(--surface-2)",
                borderColor: errors.card ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
              }}
              dir="ltr"
            />
            {errors.card && <p className="mt-1.5 text-[12px]" style={{ color: "#e74c3c" }} role="alert">{errors.card}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] text-[var(--muted)] mb-1.5">{t.expiry}</label>
              <input
                value={expiry}
                onChange={(e) => {
                  setExpiry(formatExpiry(e.target.value));
                  if (errors.expiry) setErrors((p) => ({ ...p, expiry: undefined }));
                }}
                placeholder="MM/YY"
                inputMode="numeric"
                autoComplete="cc-exp"
                aria-invalid={!!errors.expiry}
                className="w-full rounded-xl border px-3.5 h-11 bg-transparent outline-none text-sm font-mono"
                style={{
                  background: "var(--surface-2)",
                  borderColor: errors.expiry ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
                }}
                dir="ltr"
              />
              {errors.expiry && <p className="mt-1.5 text-[12px]" style={{ color: "#e74c3c" }} role="alert">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-[12px] text-[var(--muted)] mb-1.5">{t.cvc}</label>
              <input
                value={cvc}
                onChange={(e) => {
                  setCvc(digitsOnly(e.target.value).slice(0, 4));
                  if (errors.cvc) setErrors((p) => ({ ...p, cvc: undefined }));
                }}
                placeholder="123"
                inputMode="numeric"
                autoComplete="cc-csc"
                aria-invalid={!!errors.cvc}
                className="w-full rounded-xl border px-3.5 h-11 bg-transparent outline-none text-sm font-mono"
                style={{
                  background: "var(--surface-2)",
                  borderColor: errors.cvc ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
                }}
                dir="ltr"
              />
              {errors.cvc && <p className="mt-1.5 text-[12px]" style={{ color: "#e74c3c" }} role="alert">{errors.cvc}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full justify-center !py-3 mt-4 disabled:opacity-70"
          >
            {submitting ? t.paying : `${t.pay} · ${PRICES[billing].display}`}
          </button>
        </form>
      </div>
    </div>
  );
}
