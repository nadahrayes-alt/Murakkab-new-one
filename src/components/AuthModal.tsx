"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type AuthMode } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";

const FIELD_ICONS = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  email: (
    <>
      <path d="M3 6.5L12 13l9-6.5M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V7a4 4 0 118 0v3.5" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
} as const;

type FieldIcon = keyof typeof FIELD_ICONS;

function Field({
  icon,
  type = "text",
  placeholder,
  required,
  autoFocus,
  trailing,
  name,
  error,
}: {
  icon: FieldIcon;
  type?: string;
  placeholder: string;
  required?: boolean;
  autoFocus?: boolean;
  trailing?: React.ReactNode;
  name?: string;
  error?: string;
}) {
  return (
    <div>
      <div
        className="group flex items-center gap-2.5 rounded-xl border px-3.5 h-11 sm:h-12 transition-colors focus-within:border-[color:color-mix(in_oklab,var(--accent)_50%,transparent)]"
        style={{
          background: "var(--surface-2)",
          borderColor: error ? "color-mix(in srgb, #e74c3c 50%, transparent)" : "var(--border)",
        }}
      >
        <span className="text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            {FIELD_ICONS[icon]}
          </svg>
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          aria-invalid={!!error}
          className="flex-1 bg-transparent outline-none text-sm sm:text-[15px] text-[var(--foreground)] placeholder:text-[var(--muted)]"
        />
        {trailing && <span className="shrink-0">{trailing}</span>}
      </div>
      {error && (
        <p className="mt-1 text-[12px] px-1" style={{ color: "#e74c3c" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" fill="#34A853"/>
      <path d="M5.84 14.1A6.6 6.6 0 015.5 12c0-.73.13-1.43.34-2.1V7.07H2.18A11 11 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC04"/>
      <path d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15A11 11 0 0012 1 11 11 0 002.18 7.07L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.23-1.21 3.06-.85.91-2.16 1.62-3.43 1.5-.13-1.13.43-2.32 1.18-3.06.86-.84 2.32-1.5 3.46-1.5zm3.4 16.04c-.55 1.27-.81 1.83-1.52 2.95-.99 1.55-2.39 3.49-4.13 3.51-1.55.01-1.95-1.01-4.05-.99-2.1.01-2.55 1.01-4.1 1.0-1.74-.02-3.07-1.77-4.06-3.32-2.77-4.34-3.07-9.42-1.36-12.13 1.22-1.93 3.14-3.07 4.95-3.07 1.83 0 2.99.96 4.51.96 1.47 0 2.36-.96 4.49-.96 1.6 0 3.31.87 4.52 2.36-3.97 2.18-3.32 7.86.75 9.69z" />
    </svg>
  );
}

function ModalContent({ mode, switchMode, close }: { mode: AuthMode; switchMode: () => void; close: () => void }) {
  const { t } = useLang();
  const { login, intent } = useAuth();
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});
  const isSignup = mode === "signup";

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = ((data.get("email") as string) || "").trim();
    const fullName = ((data.get("fullName") as string) || "").trim();
    const password = (data.get("password") as string) || "";

    const next: typeof errors = {};
    if (isSignup && !fullName) next.fullName = t.auth.validation.nameRequired;
    if (!email) next.email = t.auth.validation.emailRequired;
    else if (!validateEmail(email)) next.email = t.auth.validation.emailInvalid;
    if (!password) next.password = t.auth.validation.passwordRequired;
    else if (password.length < 8) next.password = t.auth.validation.passwordShort;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const wantsPremium = intent === "premium";
    login({ name: fullName || email.split("@")[0], email, tier: "free" });
    close();
    router.push(wantsPremium ? "/checkout?billing=annual" : "/dashboard");
  };

  const auth = isSignup ? t.auth.signup : t.auth.login;

  const eyeIcon = showPwd ? (
    <>
      <path d="M2 12s3.5-7 10-7c2.2 0 4 .6 5.5 1.5M22 12s-3.5 7-10 7c-2.2 0-4-.6-5.5-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ) : (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </>
  );

  return (
    <>
      {/* Close */}
      <button
        type="button"
        onClick={close}
        className="absolute top-3 end-3 grid place-items-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        style={{ background: "transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover-bg)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        aria-label={t.auth.close}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Glow */}
      <div className="absolute inset-x-0 -top-12 h-32 glow-soft pointer-events-none" />

      {/* Logo */}
      <div className="relative flex justify-center pt-2">
        <span
          className="grid place-items-center w-12 h-12 rounded-xl bg-[var(--accent)]"
          style={{ color: "var(--accent-contrast)" }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
            <path d="M5 4l5 8-5 8M19 4l-5 8 5 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Title */}
      <div className="relative mt-5 text-center">
        <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-tight">
          {auth.title}
        </h2>
        <p className="mt-2 text-[13px] sm:text-sm text-[var(--muted)] max-w-sm mx-auto leading-relaxed">
          {auth.subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative mt-6 space-y-2.5" noValidate>
        {isSignup && (
          <Field icon="user" name="fullName" placeholder={t.auth.fields.fullName} autoFocus error={errors.fullName} />
        )}
        <Field
          icon="email"
          type="email"
          name="email"
          placeholder={t.auth.fields.email}
          autoFocus={!isSignup}
          error={errors.email}
        />
        <Field
          icon="lock"
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder={t.auth.fields.password}
          error={errors.password}
          trailing={
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="grid place-items-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              aria-label={t.auth.fields.showPassword}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                {eyeIcon}
              </svg>
            </button>
          }
        />

        {!isSignup && (
          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 text-[12.5px] text-[var(--muted)] cursor-pointer select-none">
              <input
                type="checkbox"
                className="appearance-none w-3.5 h-3.5 rounded border border-[var(--border)] cursor-pointer checked:bg-[var(--accent)] checked:border-[var(--accent)] transition-colors"
                style={{ background: "var(--surface-2)" }}
              />
              {t.auth.login.rememberMe}
            </label>
            <Link
              href="/forgot-password"
              onClick={close}
              className="text-[12.5px] text-[var(--accent)] hover:underline"
            >
              {t.auth.login.forgotPassword}
            </Link>
          </div>
        )}

        <button type="submit" className="btn-primary w-full justify-center !py-2.5 mt-3">
          {auth.submit}
        </button>
      </form>

      {/* Legal (signup only) */}
      {isSignup && (
        <p className="relative mt-3 text-center text-[11.5px] text-[var(--muted)] leading-relaxed">
          {t.auth.signup.legalPre}{" "}
          <Link
            href="/terms"
            onClick={close}
            className="text-[var(--foreground)] underline-offset-2 hover:underline"
          >
            {t.auth.signup.terms}
          </Link>{" "}
          {t.auth.signup.legalAnd}{" "}
          <Link
            href="/privacy"
            onClick={close}
            className="text-[var(--foreground)] underline-offset-2 hover:underline"
          >
            {t.auth.signup.privacy}
          </Link>
        </p>
      )}

      {/* Divider */}
      <div className="relative my-5 flex items-center gap-3">
        <span className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-[11px] text-[var(--muted)] uppercase tracking-[0.22em]">{t.auth.or}</span>
        <span className="flex-1 h-px bg-[var(--border)]" />
      </div>

      {/* OAuth — disabled until provider is wired up */}
      <div className="relative space-y-2.5">
        <button
          type="button"
          disabled
          className="w-full inline-flex items-center justify-center gap-2 rounded-full px-4 h-11 text-[13.5px] font-medium text-white bg-[#1a73e8] opacity-60 cursor-not-allowed"
        >
          <GoogleIcon />
          <span>{auth.google}</span>
          <span
            className="ms-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px]"
            style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
          >
            {t.auth.comingSoon}
          </span>
        </button>
        <button
          type="button"
          disabled
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] px-4 h-11 text-[13.5px] font-medium opacity-80 cursor-not-allowed"
          style={{ background: "var(--soft-bg)" }}
        >
          <AppleIcon />
          <span>{auth.apple}</span>
          <span
            className="ms-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px]"
            style={{ background: "color-mix(in oklab, var(--accent) 18%, transparent)", color: "var(--accent)" }}
          >
            {t.auth.comingSoon}
          </span>
        </button>
      </div>

      {/* Switch */}
      <div className="relative mt-5 text-center text-[13px] text-[var(--muted)]">
        {isSignup ? t.auth.signup.haveAccount : t.auth.login.noAccount}{" "}
        <button
          type="button"
          onClick={switchMode}
          className="text-[var(--accent)] font-medium hover:underline"
        >
          {isSignup ? t.auth.signup.switchTo : t.auth.login.switchTo}
        </button>
      </div>
    </>
  );
}

export default function AuthModal() {
  const { mode, open, close } = useAuth();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (!mode) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mode]);

  // ESC to close
  useEffect(() => {
    if (!mode) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [mode, close]);

  if (!mode) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div
        ref={dialogRef}
        className="modal-content relative w-full max-w-md rounded-2xl border border-[var(--border)] p-6 sm:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto"
        style={{
          background: "linear-gradient(180deg, color-mix(in oklab, var(--accent) 4%, var(--surface)) 0%, var(--surface) 60%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent
          mode={mode}
          switchMode={() => open(mode === "signup" ? "login" : "signup")}
          close={close}
        />
      </div>
    </div>
  );
}
