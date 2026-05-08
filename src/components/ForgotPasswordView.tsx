"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/LanguageProvider";

export default function ForgotPasswordView() {
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(lang === "ar" ? "أدخل بريدًا إلكترونيًا صحيحًا" : "Please enter a valid email");
      return;
    }
    setEmailError(null);
    // No real backend — simulate sending and show success state.
    setSent(true);
  };

  const t = {
    en: {
      title: "Reset your password",
      subtitle: "Enter the email address associated with your account and we'll send you a link to reset your password.",
      placeholder: "Email address",
      submit: "Send reset link",
      sentTitle: "Check your inbox",
      sentBody: "If an account exists for that email, we've sent a password reset link. The link expires in 30 minutes.",
      back: "Back to log in",
      stub: "Note: this is a UI stub — no email is actually sent until the backend is wired up.",
    },
    ar: {
      title: "إعادة تعيين كلمة المرور",
      subtitle: "أدخل البريد الإلكتروني المرتبط بحسابك وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
      placeholder: "البريد الإلكتروني",
      submit: "إرسال رابط الإعادة",
      sentTitle: "تحقّق من بريدك",
      sentBody: "إذا كان هناك حساب مرتبط بهذا البريد، فقد أرسلنا رابط إعادة تعيين كلمة المرور. ينتهي الرابط بعد 30 دقيقة.",
      back: "العودة لتسجيل الدخول",
      stub: "ملاحظة: هذه شاشة واجهة فقط — لا يتم إرسال بريد فعلي حتى يتم ربط الـ backend.",
    },
  }[lang];

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-32 sm:py-40">
      <div
        className="rounded-2xl border border-[var(--border)] p-7 sm:p-9"
        style={{
          background: "linear-gradient(180deg, color-mix(in oklab, var(--accent) 4%, var(--surface)) 0%, var(--surface) 60%)",
        }}
      >
        <div className="text-center">
          <span
            className="inline-grid place-items-center w-12 h-12 rounded-xl"
            style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
            aria-hidden
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 10.5V7a4 4 0 118 0v3.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <h1 className="font-display text-2xl sm:text-3xl tracking-tight mt-5">{t.title}</h1>
          {!sent && <p className="mt-3 text-[13.5px] text-[var(--muted)] leading-relaxed">{t.subtitle}</p>}
        </div>

        {sent ? (
          <div className="mt-7 text-center">
            <h2 className="font-display text-lg">{t.sentTitle}</h2>
            <p className="mt-2 text-[13px] text-[var(--muted)] leading-relaxed">{t.sentBody}</p>
            <p className="mt-4 text-[11.5px] text-[var(--muted)] italic">{t.stub}</p>
            <Link href="/" className="btn-ghost mt-6 justify-center">
              {t.back}
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-7 space-y-3" noValidate>
            <div>
              <div
                className="flex items-center gap-2.5 rounded-xl border px-3.5 h-12 transition-colors focus-within:border-[color:color-mix(in_oklab,var(--accent)_50%,transparent)]"
                style={{
                  background: "var(--surface-2)",
                  borderColor: emailError ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[var(--muted)]">
                  <path d="M3 6.5L12 13l9-6.5M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder={t.placeholder}
                  aria-invalid={!!emailError}
                  className="flex-1 bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-[12px]" style={{ color: "#e74c3c" }} role="alert">
                  {emailError}
                </p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full justify-center !py-2.5">
              {t.submit}
            </button>
            <p className="text-center text-[11.5px] text-[var(--muted)] mt-4 italic">{t.stub}</p>
          </form>
        )}
      </div>
    </div>
  );
}
