"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { useLang } from "@/lib/LanguageProvider";
import { useAlerts, type AlertRecord, type AlertType } from "@/lib/AlertsProvider";
import { getStock } from "@/lib/stockData";
import PremiumGate from "./PremiumGate";
import { Reveal } from "./Parallax";
import AlertFormModal from "./AlertFormModal";

const TYPE_ICONS: Record<AlertType, React.ReactNode> = {
  price: (
    <>
      <path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  earnings: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  score: (
    <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  ),
  shariah: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9-4.6-.5-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function AlertsView() {
  const { t, lang } = useLang();
  const { isAuthed, isPremium, open: openAuth, hydrated } = useAuth();
  const { alerts, add, update, remove } = useAlerts();
  const [tab, setTab] = useState<"all" | "active" | "triggered">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AlertRecord | null>(null);

  useEffect(() => {
    if (hydrated && !isAuthed) openAuth("login");
  }, [hydrated, isAuthed, openAuth]);

  if (!hydrated) {
    return <div className="min-h-[60vh]" />;
  }

  // Anonymous → prompt login
  if (!isAuthed) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-32 sm:py-40 text-center">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight">{t.alerts.title}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {lang === "ar" ? "سجّل الدخول للوصول إلى التنبيهات." : "Log in to access alerts."}
        </p>
        <button type="button" onClick={() => openAuth("login")} className="btn-primary mt-6 justify-center">
          {t.nav.login}
        </button>
      </div>
    );
  }

  // Free → premium upsell
  if (!isPremium) {
    return (
      <div className="relative">
        <div className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 pt-24 sm:pt-32">
            <Reveal>
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t.alerts.title}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display mt-4 text-3xl sm:text-5xl tracking-tight leading-tight">
                {t.alerts.title}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-3 text-sm sm:text-base text-[var(--muted)] max-w-xl">{t.alerts.subtitle}</p>
            </Reveal>
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
          <Reveal>
            <PremiumGate variant="card" />
          </Reveal>
        </div>
      </div>
    );
  }

  // Premium experience — alerts now come from AlertsProvider, not from translations.
  const filtered = tab === "all" ? alerts : alerts.filter((a) => a.status === tab);
  const activeCount = alerts.filter((a) => a.status === "active").length;
  const triggeredCount = alerts.filter((a) => a.status === "triggered").length;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (a: AlertRecord) => {
    setEditing(a);
    setFormOpen(true);
  };
  const handleFormSubmit = (data: { ticker: string; type: AlertType; condition: AlertRecord["condition"]; value: string }) => {
    if (editing) {
      update(editing.id, data);
    } else {
      add(data);
    }
    setFormOpen(false);
    setEditing(null);
  };
  const handleDelete = (a: AlertRecord) => {
    const stock = getStock(a.ticker);
    const name = stock?.name.en ?? a.ticker;
    const msg = lang === "ar"
      ? `هل تريد حذف التنبيه على ${name}?`
      : `Delete the alert on ${name}?`;
    if (typeof window !== "undefined" && window.confirm(msg)) {
      remove(a.id);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 pt-24 sm:pt-32">
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="eyebrow">
                <span className="eyebrow-dot pulse-dot" />
                {t.alerts.title}
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] uppercase tracking-[0.14em]"
                style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
              >
                Pro
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="font-display text-3xl sm:text-5xl tracking-tight leading-tight">
                  {t.alerts.title}
                </h1>
                <p className="mt-2 text-sm text-[var(--muted)]">{t.alerts.subtitle}</p>
              </div>
              <button type="button" onClick={openCreate} className="btn-primary !text-[12.5px]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {t.alerts.newAlert}
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Tabs */}
        <div className="mb-5 inline-flex items-center rounded-full border border-[var(--border)] p-0.5 text-[12.5px]" style={{ background: "var(--soft-bg)" }}>
          {([
            { v: "all", label: t.alerts.tabs.all, count: alerts.length },
            { v: "active", label: t.alerts.tabs.active, count: activeCount },
            { v: "triggered", label: t.alerts.tabs.triggered, count: triggeredCount },
          ] as const).map((tabItem) => (
            <button
              key={tabItem.v}
              type="button"
              onClick={() => setTab(tabItem.v)}
              className="px-3 sm:px-4 py-1.5 rounded-full transition-colors"
              style={{
                background: tab === tabItem.v ? "var(--accent)" : "transparent",
                color: tab === tabItem.v ? "var(--accent-contrast)" : "var(--muted)",
              }}
              aria-pressed={tab === tabItem.v}
            >
              {tabItem.label}{" "}
              <span className="font-mono text-[10.5px] opacity-80">({tabItem.count})</span>
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <Reveal>
            <div
              className="rounded-2xl border border-dashed border-[var(--border)] p-10 text-center"
              style={{ background: "var(--surface)" }}
            >
              <div className="font-medium">{t.alerts.empty}</div>
              <div className="mt-1.5 text-[13px] text-[var(--muted)] max-w-sm mx-auto">
                {t.alerts.emptyDesc}
              </div>
              <button type="button" onClick={openCreate} className="btn-primary mt-5 justify-center">
                {t.alerts.newAlert}
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] overflow-hidden divide-y divide-[var(--border)]" style={{ background: "var(--surface)" }}>
            {filtered.map((alert, i) => {
              const stock = getStock(alert.ticker);
              if (!stock) return null;
              const isTriggered = alert.status === "triggered";
              return (
                <Reveal key={i} delay={i * 60}>
                  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4">
                    {/* Type icon */}
                    <span
                      className="grid place-items-center w-9 h-9 rounded-lg shrink-0"
                      style={{
                        background: isTriggered
                          ? "color-mix(in oklab, var(--accent) 14%, transparent)"
                          : "var(--surface-2)",
                        color: isTriggered ? "var(--accent)" : "var(--muted)",
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                        {TYPE_ICONS[alert.type]}
                      </svg>
                    </span>

                    {/* Stock */}
                    <Link href={`/stock/${stock.ticker}`} className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-10 h-8 grid place-items-center rounded-md font-mono text-[10.5px] font-semibold shrink-0"
                        style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)" }}
                        dir="ltr"
                      >
                        {stock.ticker}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] truncate" dir="ltr">
                          {stock.name.en}
                        </div>
                      </div>
                    </Link>

                    {/* Condition */}
                    <div className="flex-1 hidden sm:block min-w-0">
                      <div className="text-[11.5px] text-[var(--muted)]">{t.alerts.types[alert.type]}</div>
                      <div className="text-[13px] truncate" dir={lang === "ar" ? "rtl" : "ltr"}>
                        {alert.condition ? (t.alerts.conditions as Record<string, string>)[alert.condition] : ""}{" "}
                        <span className="font-mono" dir="ltr">{alert.value}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] whitespace-nowrap"
                      style={{
                        background: isTriggered
                          ? "color-mix(in oklab, var(--accent) 14%, transparent)"
                          : alert.status === "paused"
                          ? "color-mix(in srgb, #f5a623 14%, transparent)"
                          : "var(--surface-2)",
                        color: isTriggered
                          ? "var(--accent)"
                          : alert.status === "paused"
                          ? "#f5a623"
                          : "var(--muted)",
                      }}
                    >
                      {isTriggered && <span className="w-1.5 h-1.5 rounded-full bg-current pulse-dot" />}
                      {t.alerts.status[alert.status]}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEdit(alert)}
                        className="grid place-items-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                        aria-label={t.alerts.actions.edit}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--soft-bg)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M14 4l6 6L8 22H2v-6L14 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(alert)}
                        className="grid place-items-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[#e74c3c] transition-colors"
                        aria-label={t.alerts.actions.delete}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, #e74c3c 8%, transparent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      <AlertFormModal
        open={formOpen}
        initial={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
