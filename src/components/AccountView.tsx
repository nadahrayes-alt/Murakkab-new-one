"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";
import { useTheme, THEMES, type Theme } from "@/lib/ThemeProvider";
import { useWatchlist } from "@/lib/WatchlistProvider";
import { Reveal } from "./Parallax";

const MOCK_INVOICES = [
  { id: "INV-2026-005", date: { en: "May 1, 2026", ar: "1 مايو 2026" }, amount: "$199.00" },
  { id: "INV-2025-005", date: { en: "May 1, 2025", ar: "1 مايو 2025" }, amount: "$199.00" },
  { id: "INV-2024-005", date: { en: "May 1, 2024", ar: "1 مايو 2024" }, amount: "$179.00" },
];

const THEME_SWATCH: Record<Theme, string> = {
  dark: "#0e0e12",
  light: "#fafaf7",
  midnight: "#0a1024",
  sunset: "#0a1f10",
};

function Toggle({ value, onChange, label, disabled }: { value: boolean; onChange: (v: boolean) => void; label?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      role="switch"
      aria-checked={value}
      aria-label={label}
      disabled={disabled}
      className="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors"
      style={{
        background: value ? "var(--accent)" : "var(--surface-2)",
        border: "1px solid var(--border)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        className="block w-4 h-4 rounded-full transition-transform"
        style={{
          background: value ? "var(--accent-contrast)" : "var(--muted)",
          transform: value ? "translateX(calc(1.25rem))" : "translateX(0.15rem)",
          marginTop: "0.125rem",
        }}
      />
    </button>
  );
}

function Field({
  label,
  type = "text",
  value,
  defaultValue,
  onChange,
  placeholder,
  name,
  trailing,
  disabled,
}: {
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  name?: string;
  trailing?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] text-[var(--muted)] mb-1.5">{label}</span>
      <div
        className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] px-3.5 h-11 transition-colors focus-within:border-[color:color-mix(in_oklab,var(--accent)_50%,transparent)]"
        style={{ background: "var(--surface-2)", opacity: disabled ? 0.6 : 1 }}
      >
        <input
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
        />
        {trailing}
      </div>
    </label>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, 2400);
    return () => clearTimeout(id);
  }, [onClose]);
  return (
    <div
      className="fixed bottom-6 inset-x-0 z-[200] flex justify-center px-4 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div
        className="modal-content pointer-events-auto inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13px]"
        style={{
          background: "var(--surface)",
          borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)",
          color: "var(--foreground)",
        }}
      >
        <span
          className="grid place-items-center w-5 h-5 rounded-full"
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
}

function InvoicesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useLang();

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-backdrop fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="modal-content relative w-full max-w-xl rounded-2xl border border-[var(--border)] overflow-hidden"
        style={{ background: "var(--surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[var(--border)]">
          <div>
            <h3 className="font-display text-xl">{t.settings.invoices.title}</h3>
            <p className="text-[12px] text-[var(--muted)] mt-0.5">{t.settings.invoices.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid place-items-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label={t.settings.invoices.close}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {MOCK_INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center gap-3 px-5 sm:px-6 py-3.5">
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-mono" dir="ltr">{inv.id}</div>
                <div className="text-[11.5px] text-[var(--muted)] mt-0.5">{inv.date[lang]}</div>
              </div>
              <div className="font-mono text-[13px]" dir="ltr">{inv.amount}</div>
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px]"
                style={{
                  background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                  color: "var(--accent)",
                }}
              >
                {t.settings.invoices.paid}
              </span>
              <button
                type="button"
                className="grid place-items-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0"
                aria-label={t.settings.invoices.download}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--soft-bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="font-display text-xl sm:text-2xl tracking-tight">{title}</h2>
        <p className="mt-1 text-[13px] text-[var(--muted)]">{desc}</p>
      </div>
      <div
        className="rounded-2xl border border-[var(--border)] overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        {children}
      </div>
    </section>
  );
}

function SaveButton({
  saved,
  savedLabel,
  label,
  onClick,
  type = "submit",
}: {
  saved: boolean;
  savedLabel: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={saved ? "btn-ghost" : "btn-primary"}
      style={saved ? { color: "var(--accent)", borderColor: "color-mix(in oklab, var(--accent) 50%, transparent)" } : {}}
    >
      {saved ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {savedLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}

export default function AccountView() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const { user, isAuthed, logout, open: openAuth, downgrade, updateUser, hydrated } = useAuth();
  const { clear: clearWatchlist } = useWatchlist();
  const router = useRouter();

  const [notifs, setNotifs] = useState({ weekly: true, priceAlerts: true, earnings: true, productUpdates: false });
  const [twoFa, setTwoFa] = useState(false);
  const [profileName, setProfileName] = useState(user?.name ?? "");
  const [profileEmail, setProfileEmail] = useState(user?.email ?? "");
  const [profileSaved, setProfileSaved] = useState(false);
  const [invoicesOpen, setInvoicesOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && !isAuthed) openAuth("login");
  }, [hydrated, isAuthed, openAuth]);

  // Sync controlled state when user object changes (e.g., after upgrade)
  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfileEmail(user.email);
    }
  }, [user]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: profileName, email: profileEmail });
    setProfileSaved(true);
    setToast(t.settings.toast.savedProfile);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleManageSubscription = () => {
    setToast(t.settings.toast.manageSub);
    setInvoicesOpen(true);
  };

  const handleCancelSubscription = () => {
    if (typeof window === "undefined") return;
    if (confirm(t.settings.cancelConfirm)) {
      downgrade();
      setToast(t.settings.toast.cancelled);
    }
  };

  if (hydrated && (!isAuthed || !user)) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-32 sm:py-40 text-center">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight">{t.settings.title}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {lang === "ar" ? "سجّل الدخول للوصول إلى الإعدادات." : "Log in to access settings."}
        </p>
        <button type="button" onClick={() => openAuth("login")} className="btn-primary mt-6 justify-center">
          {t.nav.login}
        </button>
      </div>
    );
  }

  if (!hydrated || !user) {
    return <div className="min-h-[60vh]" />;
  }

  const sections = [
    { id: "profile", label: t.settings.nav.profile },
    { id: "subscription", label: t.settings.nav.subscription },
    { id: "preferences", label: t.settings.nav.preferences },
    { id: "notifications", label: t.settings.nav.notifications },
    { id: "security", label: t.settings.nav.security },
    { id: "danger", label: t.settings.nav.danger },
  ];

  return (
    <div className="relative">
      {/* Header */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 pt-24 sm:pt-32">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t.account.myAccount}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display mt-4 text-3xl sm:text-5xl tracking-tight leading-tight">
              {t.settings.title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 text-sm sm:text-base text-[var(--muted)] max-w-xl">
              {t.settings.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Sidebar nav */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-3 py-2 rounded-lg text-[13px] transition-colors"
                style={{ color: s.id === "danger" ? "#e74c3c" : "var(--muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--soft-bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9 space-y-12">
          {/* Profile */}
          <SectionCard id="profile" title={t.settings.sections.profile.title} desc={t.settings.sections.profile.desc}>
            <form onSubmit={handleProfileSave} className="p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-4">
                <span
                  className="grid place-items-center w-16 h-16 rounded-full font-display text-2xl uppercase"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  {profileName.charAt(0) || "?"}
                </span>
                <div>
                  <div className="text-[15px] font-medium">{profileName || t.settings.emptyName}</div>
                  <div className="text-[12px] text-[var(--muted)]">{profileEmail}</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field
                  label={t.settings.fields.name}
                  value={profileName}
                  onChange={setProfileName}
                />
                <Field
                  label={t.settings.fields.email}
                  type="email"
                  value={profileEmail}
                  onChange={setProfileEmail}
                />
              </div>

              <div className="flex justify-end">
                <SaveButton
                  saved={profileSaved}
                  label={t.settings.actions.save}
                  savedLabel={t.settings.actions.saved}
                />
              </div>
            </form>
          </SectionCard>

          {/* Subscription */}
          <SectionCard
            id="subscription"
            title={t.settings.sections.subscription.title}
            desc={t.settings.sections.subscription.desc}
          >
            <div className="p-5 sm:p-6">
              {/* Current plan */}
              <div
                className="rounded-xl border border-[var(--border)] p-4 sm:p-5"
                style={{ background: "var(--surface-2)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {t.settings.sub.currentPlan}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-display text-xl">
                        {user.tier === "premium" ? t.account.premiumTier : t.account.freeTier}
                      </span>
                      {user.tier === "premium" && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-[0.08em]"
                          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
                        >
                          Pro
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[12px] text-[var(--muted)]">
                      {user.tier === "premium" ? t.settings.sub.premiumDesc : t.settings.sub.freeDesc}
                    </div>
                  </div>
                  {user.tier === "premium" ? (
                    <button
                      type="button"
                      onClick={handleManageSubscription}
                      className="btn-ghost !text-[12.5px] !py-1.5"
                    >
                      {t.settings.actions.manage}
                    </button>
                  ) : null}
                </div>
              </div>

              {user.tier === "free" ? (
                <div
                  className="mt-5 relative overflow-hidden rounded-xl border p-5 sm:p-6"
                  style={{
                    borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
                    background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 10%, var(--surface)) 0%, var(--surface) 70%)",
                  }}
                >
                  <div className="absolute -top-12 -end-10 w-40 h-40 glow-soft pointer-events-none" />
                  <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div className="max-w-md">
                      <div className="text-[10.5px] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                        ★ {t.settings.sub.upgradeTitle}
                      </div>
                      <p className="mt-2 text-[14px]">{t.settings.sub.upgradeBody}</p>
                    </div>
                    <a href="/#pricing" className="btn-primary !text-[12.5px]">
                      {t.settings.actions.upgrade}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInvoicesOpen(true)}
                    className="btn-ghost justify-center"
                  >
                    {t.settings.actions.invoices}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelSubscription}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-3.5 h-9 text-[12.5px] text-[#e74c3c] transition-colors hover:border-[#e74c3c]"
                    style={{ background: "var(--soft-bg)" }}
                  >
                    {t.settings.actions.cancelSubscription}
                  </button>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Preferences */}
          <SectionCard
            id="preferences"
            title={t.settings.sections.preferences.title}
            desc={t.settings.sections.preferences.desc}
          >
            <div className="p-5 sm:p-6 space-y-6">
              {/* Language */}
              <div>
                <div className="text-[12px] text-[var(--muted)] mb-2">
                  {lang === "ar" ? "اللغة" : "Language"}
                </div>
                <div
                  className="inline-flex items-center rounded-full border border-[var(--border)] p-0.5 text-[12.5px]"
                  style={{ background: "var(--soft-bg)" }}
                >
                  {([
                    { v: "en", label: "English" },
                    { v: "ar", label: "العربية" },
                  ] as const).map((l) => (
                    <button
                      key={l.v}
                      type="button"
                      onClick={() => setLang(l.v)}
                      className="px-3 py-1.5 rounded-full transition-colors"
                      style={{
                        background: lang === l.v ? "var(--accent)" : "transparent",
                        color: lang === l.v ? "var(--accent-contrast)" : "var(--muted)",
                      }}
                      aria-pressed={lang === l.v}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <div className="text-[12px] text-[var(--muted)] mb-2">
                  {lang === "ar" ? "الثيم" : "Theme"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {THEMES.map((th) => {
                    const isActive = theme === th;
                    const labels: Record<Theme, { en: string; ar: string }> = {
                      dark: { en: "Dark", ar: "داكن" },
                      light: { en: "Light", ar: "فاتح" },
                      midnight: { en: "Midnight", ar: "ليلي" },
                      sunset: { en: "Forest", ar: "غابة" },
                    };
                    return (
                      <button
                        key={th}
                        type="button"
                        onClick={() => setTheme(th)}
                        className="inline-flex items-center gap-2 rounded-full border px-3 h-9 text-[12.5px] transition-colors"
                        style={{
                          background: isActive ? "color-mix(in oklab, var(--accent) 8%, var(--surface))" : "var(--surface)",
                          borderColor: isActive
                            ? "color-mix(in oklab, var(--accent) 50%, transparent)"
                            : "var(--border)",
                        }}
                        aria-pressed={isActive}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full ring-1 ring-[var(--border)]"
                          style={{ background: THEME_SWATCH[th] }}
                        />
                        {labels[th][lang]}
                        {isActive && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden style={{ color: "var(--accent)" }}>
                            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Notifications */}
          <SectionCard
            id="notifications"
            title={t.settings.sections.notifications.title}
            desc={t.settings.sections.notifications.desc}
          >
            <div className="divide-y divide-[var(--border)]">
              {[
                { key: "weekly" as const, ...t.settings.notifs.weekly },
                { key: "priceAlerts" as const, ...t.settings.notifs.priceAlerts },
                { key: "earnings" as const, ...t.settings.notifs.earnings },
                { key: "productUpdates" as const, ...t.settings.notifs.productUpdates },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium">{n.title}</div>
                    <div className="text-[12px] text-[var(--muted)] mt-0.5">{n.desc}</div>
                  </div>
                  <Toggle
                    value={notifs[n.key]}
                    onChange={(v) => setNotifs((p) => ({ ...p, [n.key]: v }))}
                    label={n.title}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Security */}
          <SectionCard
            id="security"
            title={t.settings.sections.security.title}
            desc={t.settings.sections.security.desc}
          >
            <div className="divide-y divide-[var(--border)]">
              {/* Change password — disabled until real auth backend exists */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.settings.fields.currentPassword} type="password" disabled />
                  <Field label={t.settings.fields.newPassword} type="password" disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.14em]"
                    style={{ background: "color-mix(in oklab, var(--accent) 16%, transparent)", color: "var(--accent)" }}
                  >
                    {t.auth.comingSoon}
                  </span>
                  <button type="button" disabled className="btn-primary opacity-60 cursor-not-allowed">
                    {t.settings.actions.changePassword}
                  </button>
                </div>
              </div>

              {/* 2FA — disabled until real setup flow exists */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium">{t.settings.security.twoFa}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-[0.14em]"
                      style={{ background: "color-mix(in oklab, var(--accent) 16%, transparent)", color: "var(--accent)" }}
                    >
                      {t.auth.comingSoon}
                    </span>
                  </div>
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">{t.settings.security.twoFaDesc}</div>
                </div>
                <Toggle value={twoFa} onChange={setTwoFa} label={t.settings.security.twoFa} disabled />
              </div>

              {/* Sessions */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium">{t.settings.security.sessionsTitle}</div>
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">{t.settings.security.sessionsDesc}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="btn-ghost !text-[12.5px] !py-1.5 shrink-0"
                >
                  {t.settings.actions.logoutAll}
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Danger zone */}
          <section id="danger" className="scroll-mt-24">
            <div className="mb-4">
              <h2 className="font-display text-xl sm:text-2xl tracking-tight" style={{ color: "#e74c3c" }}>
                {t.settings.sections.danger.title}
              </h2>
              <p className="mt-1 text-[13px] text-[var(--muted)]">{t.settings.sections.danger.desc}</p>
            </div>
            <div
              className="rounded-2xl border p-5 sm:p-6"
              style={{
                borderColor: "color-mix(in srgb, #e74c3c 30%, transparent)",
                background: "color-mix(in srgb, #e74c3c 5%, var(--surface))",
              }}
            >
              <p className="text-[13px] text-[var(--muted)] leading-relaxed">{t.settings.danger.warning}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(t.settings.danger.confirm)) {
                      clearWatchlist();
                      logout();
                      router.push("/");
                    }
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 h-9 text-[12.5px] font-medium transition-colors text-white"
                  style={{ background: "#e74c3c" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#c0392b")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#e74c3c")}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  {t.settings.actions.deleteAccount}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <InvoicesModal open={invoicesOpen} onClose={() => setInvoicesOpen(false)} />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
