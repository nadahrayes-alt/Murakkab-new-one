"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";

const LockSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11V7.5a4 4 0 118 0V11" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

/**
 * Wraps premium content. For premium users renders children unchanged.
 * For free/anonymous users blurs the content and overlays an upgrade CTA.
 */
export default function PremiumGate({
  children,
  variant = "blur",
  title,
  body,
  ctaLabel,
}: {
  children?: React.ReactNode;
  variant?: "blur" | "card";
  title?: string;
  body?: string;
  ctaLabel?: string;
}) {
  const { isPremium, isAuthed, open: openAuth } = useAuth();
  const { t } = useLang();
  const router = useRouter();

  if (isPremium) return <>{children}</>;

  const handleUpgrade = () => {
    if (!isAuthed) {
      openAuth("signup", "premium");
    } else {
      router.push("/checkout?billing=annual");
    }
  };

  if (variant === "card") {
    // Standalone upgrade card (no children blur, just the card).
    return (
      <div
        className="relative overflow-hidden rounded-2xl border p-6 sm:p-7 text-center"
        style={{
          borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
          background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 10%, var(--surface)) 0%, var(--surface) 70%)",
        }}
      >
        <div className="absolute -top-12 -end-10 w-40 h-40 glow-soft pointer-events-none" />
        <div className="relative">
          <span
            className="inline-grid place-items-center w-10 h-10 rounded-xl mb-3"
            style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
          >
            <LockSvg />
          </span>
          <h3 className="font-display text-xl sm:text-2xl tracking-tight">
            {title || t.gate.unlockTitle}
          </h3>
          <p className="mt-2 text-[13.5px] text-[var(--muted)] max-w-md mx-auto">
            {body || t.gate.unlockBody}
          </p>
          <button
            type="button"
            onClick={handleUpgrade}
            className="btn-primary mt-5 justify-center"
          >
            {ctaLabel || t.common.upgradeNow}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Blur variant — children blurred, overlay on top
  return (
    <div className="relative isolate">
      <div className="blur-md pointer-events-none select-none" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          className="relative max-w-md w-full rounded-2xl border p-5 sm:p-6 text-center"
          style={{
            borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)",
            background: "color-mix(in oklab, var(--accent) 4%, var(--surface))",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] mb-3"
            style={{
              background: "color-mix(in oklab, var(--accent) 16%, transparent)",
              color: "var(--accent)",
            }}
          >
            <LockSvg />
            {t.gate.premiumFeature}
          </div>
          <h3 className="font-display text-lg sm:text-xl tracking-tight">
            {title || t.gate.unlockTitle}
          </h3>
          <p className="mt-1.5 text-[12.5px] text-[var(--muted)]">
            {body || t.gate.unlockBody}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleUpgrade}
              className="btn-primary !py-1.5 !px-3.5 !text-[12.5px]"
            >
              {ctaLabel || t.common.upgradeNow}
            </button>
            <Link
              href="/#pricing"
              className="text-[12px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {t.gate.seePlans}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Top-of-page banner shown to free authed users — encouraging upgrade.
 * Hides for premium users.
 */
export function FreeUserBanner() {
  const { isAuthed, isPremium } = useAuth();
  const { t } = useLang();
  const router = useRouter();

  if (!isAuthed || isPremium) return null;

  return (
    <div
      className="rounded-2xl border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3"
      style={{
        borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
        background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 10%, var(--surface)) 0%, var(--surface) 70%)",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="grid place-items-center w-9 h-9 rounded-xl shrink-0"
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2l2.39 6.99H22l-6.06 4.41L18.34 22 12 17.27 5.66 22l2.4-8.6L2 8.99h7.61z" />
          </svg>
        </span>
        <div className="min-w-0">
          <div className="text-[13.5px] font-medium" style={{ color: "var(--accent)" }}>
            {t.gate.banner.title}
          </div>
          <div className="text-[12px] text-[var(--muted)] mt-0.5">{t.gate.banner.body}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => router.push("/checkout?billing=annual")}
        className="btn-primary !py-1.5 !px-3.5 !text-[12.5px] shrink-0"
      >
        {t.gate.banner.cta}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
