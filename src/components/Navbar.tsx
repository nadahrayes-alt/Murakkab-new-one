"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LanguageProvider";
import { useTheme, THEMES, type Theme } from "@/lib/ThemeProvider";
import { useAuth } from "@/lib/AuthProvider";
import { useSearch } from "@/lib/SearchProvider";

const THEME_LABELS: Record<Theme, { en: string; ar: string; swatch: string }> = {
  dark: { en: "Dark", ar: "داكن", swatch: "#22BB21" },
  light: { en: "Light", ar: "فاتح", swatch: "#22BB21" },
  midnight: { en: "Midnight", ar: "ليلي", swatch: "#5dd4ff" },
  sunset: { en: "Forest", ar: "غابة", swatch: "#22BB21" },
};

const THEME_ICON: Record<Theme, React.ReactNode> = {
  dark: (
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  midnight: (
    <path d="M3 12c5 0 9-4 9-9 0 5 4 9 9 9-5 0-9 4-9 9 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  ),
  sunset: (
    <>
      <path d="M12 3v3M12 18v3M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h3M18 12h3M5.6 18.4L7 17M17 7l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
};

const SECTION_IDS = ["features", "news", "testimonials", "pricing", "articles"] as const;

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const { open: openAuth, user, isAuthed, logout } = useAuth();
  const { openSearch } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  // Cmd/Ctrl + K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [active, setActive] = useState<string>("features");
  const themeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!themeOpen) return;
    const onClick = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setThemeOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [themeOpen]);

  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setAccountOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [accountOpen]);

  // Close account dropdown when route changes
  useEffect(() => { setAccountOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Page-trip order, with the highlighted Articles pill anchored at the end.
  const links: Array<{ id: string; label: string; highlighted?: boolean }> = [
    { id: "features", label: t.nav.features },
    { id: "news", label: t.nav.news },
    { id: "testimonials", label: t.nav.reviews },
    { id: "pricing", label: t.nav.pricing },
    { id: "articles", label: t.nav.articles, highlighted: true },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[padding] duration-300 ${
        scrolled ? "py-1.5 sm:py-2" : "py-3 sm:py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div
          className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--border)] backdrop-blur-md transition-colors px-1.5 sm:px-2 h-12 sm:h-13"
          style={{
            background: scrolled ? "var(--nav-bg-bright)" : "var(--nav-bg-dim)",
            height: scrolled ? undefined : undefined,
          }}
        >
          {/* Brand */}
          <a href="#top" className="flex items-center gap-2 px-1.5 shrink-0 group">
            <span
              className="grid place-items-center w-7 h-7 rounded-md bg-[var(--accent)] transition-transform group-hover:scale-105"
              style={{ color: "var(--accent-contrast)" }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
                <path d="M5 4l5 8-5 8M19 4l-5 8 5 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display text-[16px] sm:text-[17px] tracking-tight leading-none">
              {t.footer.brand}
              <span className="text-[var(--accent)]">{t.footer.brandPlus}</span>
            </span>
          </a>

          {/* Center nav links — order follows page trip */}
          <nav className="hidden lg:flex items-center gap-0.5 text-[12.5px] flex-1 justify-center">
            {links.map((l) => {
              const isActive = active === l.id;
              if (l.highlighted) {
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    className="mx-0.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] border transition-all hover:scale-[1.02]"
                    style={{
                      borderColor: isActive
                        ? "color-mix(in oklab, var(--accent) 60%, transparent)"
                        : "color-mix(in oklab, var(--accent) 35%, transparent)",
                      background: isActive
                        ? "color-mix(in oklab, var(--accent) 14%, transparent)"
                        : "color-mix(in oklab, var(--accent) 8%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {l.label}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                );
              }
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="relative px-2.5 py-1.5 rounded-full transition-colors"
                  style={{
                    color: isActive ? "var(--foreground)" : "var(--muted)",
                    background: isActive ? "var(--hover-bg)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--foreground)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1 sm:gap-1.5 ms-auto lg:ms-0">
            {/* Search trigger — full bar at xl+, icon below */}
            <button
              type="button"
              onClick={openSearch}
              className="hidden xl:flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 h-8 text-[12px] text-[var(--muted)] w-[220px] hover:border-[color:color-mix(in_oklab,var(--accent)_45%,transparent)] transition-colors text-start"
              style={{ background: "var(--soft-bg)" }}
              dir={lang === "ar" ? "rtl" : "ltr"}
              aria-label="Open search"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
                <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span className="flex-1 truncate">{t.nav.searchPlaceholder}</span>
              <kbd
                className="hidden 2xl:inline-flex items-center px-1 rounded text-[10px] font-mono"
                style={{ background: "var(--surface-2)", color: "var(--muted)" }}
              >
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={openSearch}
              className="hidden sm:grid xl:hidden place-items-center w-8 h-8 rounded-full border border-[var(--border)] transition-colors hover:border-[color:color-mix(in_oklab,var(--accent)_40%,transparent)]"
              style={{ background: "var(--soft-bg)" }}
              aria-label="Open search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {/* Theme switcher */}
            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setThemeOpen((v) => !v)}
                className="grid place-items-center w-8 h-8 rounded-full border border-[var(--border)] transition-colors hover:border-[color:color-mix(in_oklab,var(--accent)_40%,transparent)]"
                style={{ background: "var(--soft-bg)" }}
                aria-label="Switch theme"
                aria-expanded={themeOpen}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden style={{ color: "var(--accent)" }}>
                  {THEME_ICON[theme]}
                </svg>
              </button>

              {themeOpen && (
                <div
                  className="absolute end-0 mt-2 min-w-[180px] rounded-2xl border border-[var(--border)] backdrop-blur-md p-1.5 z-50"
                  style={{ background: "var(--nav-bg-mobile)" }}
                  role="menu"
                >
                  {THEMES.map((th) => {
                    const isActive = th === theme;
                    return (
                      <button
                        key={th}
                        onClick={() => {
                          setTheme(th);
                          setThemeOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm text-start transition-colors"
                        style={{
                          background: isActive ? "var(--hover-bg)" : "transparent",
                          color: isActive ? "var(--foreground)" : "var(--muted)",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.currentTarget.style.background = "var(--soft-bg)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) e.currentTarget.style.background = "transparent";
                        }}
                        role="menuitemradio"
                        aria-checked={isActive}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full ring-1 ring-[var(--border)]"
                          style={{ background: THEME_LABELS[th].swatch }}
                        />
                        <span className="flex-1">{THEME_LABELS[th][lang]}</span>
                        {isActive && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden style={{ color: "var(--accent)" }}>
                            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language toggle */}
            <div
              className="hidden md:flex items-center rounded-full border border-[var(--border)] p-0.5 text-[11.5px]"
              style={{ background: "var(--soft-bg)" }}
            >
              <button
                onClick={() => setLang("en")}
                className="px-2 py-0.5 rounded-full transition-colors"
                style={{
                  background: lang === "en" ? "var(--accent)" : "transparent",
                  color: lang === "en" ? "var(--accent-contrast)" : "var(--muted)",
                }}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className="px-2 py-0.5 rounded-full transition-colors"
                style={{
                  background: lang === "ar" ? "var(--accent)" : "transparent",
                  color: lang === "ar" ? "var(--accent-contrast)" : "var(--muted)",
                }}
                aria-pressed={lang === "ar"}
              >
                ع
              </button>
            </div>

            {isAuthed && user ? (
              /* Avatar dropdown when logged in */
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((v) => !v)}
                  className="grid place-items-center w-9 h-9 rounded-full border border-[var(--border)] font-medium text-[13px] uppercase transition-colors"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                    color: "var(--accent)",
                  }}
                  aria-expanded={accountOpen}
                  aria-label={t.account.myAccount}
                >
                  {user.name.charAt(0)}
                </button>

                {accountOpen && (
                  <div
                    className="absolute end-0 mt-2 w-72 rounded-2xl border border-[var(--border)] backdrop-blur-md p-1.5 z-50"
                    style={{ background: "var(--nav-bg-mobile)" }}
                    role="menu"
                  >
                    {/* User info */}
                    <div className="flex items-center gap-3 px-3 py-3 border-b border-[var(--border)] mb-1">
                      <span
                        className="grid place-items-center w-10 h-10 rounded-full font-medium text-base uppercase shrink-0"
                        style={{
                          background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                          color: "var(--accent)",
                        }}
                      >
                        {user.name.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium truncate">{user.name}</div>
                        <div className="text-[11px] text-[var(--muted)] truncate">{user.email}</div>
                      </div>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-[0.08em]"
                        style={{
                          background: user.tier === "premium"
                            ? "var(--accent)"
                            : "var(--surface-2)",
                          color: user.tier === "premium" ? "var(--accent-contrast)" : "var(--muted)",
                        }}
                      >
                        {user.tier === "premium" ? "Pro" : "Free"}
                      </span>
                    </div>

                    {[
                      { href: "/dashboard", label: t.account.dashboard, icon: (
                        <>
                          <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                          <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                          <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                          <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                        </>
                      ) },
                      { href: "/watchlist", label: t.account.watchlist, icon: (
                        <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      ) },
                      { href: "/alerts", label: t.account.alerts, icon: (
                        <>
                          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </>
                      ) },
                      { href: "/account", label: t.account.settings, icon: (
                        <>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9v.1a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" stroke="currentColor" strokeWidth="1.4" />
                        </>
                      ) },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] transition-colors"
                        style={{
                          color: pathname === item.href ? "var(--foreground)" : "var(--muted)",
                          background: pathname === item.href ? "var(--hover-bg)" : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (pathname !== item.href) e.currentTarget.style.background = "var(--soft-bg)";
                        }}
                        onMouseLeave={(e) => {
                          if (pathname !== item.href) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          {item.icon}
                        </svg>
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    ))}

                    {user.tier === "free" && (
                      <Link
                        href="/#pricing"
                        className="flex items-center gap-2.5 mx-1 my-1 px-2.5 py-2 rounded-xl text-[13px] transition-colors"
                        style={{
                          background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                          color: "var(--accent)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M12 3l2.39 5.26 5.61.5-4.27 3.74 1.32 5.5L12 15.27 6.95 18l1.32-5.5L4 8.76l5.61-.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                        <span className="flex-1 font-medium">{t.account.upgrade}</span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )}

                    <div className="border-t border-[var(--border)] mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setAccountOpen(false);
                          router.push("/");
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] text-start text-[var(--muted)] hover:text-[#e74c3c] transition-colors"
                        onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, #e74c3c 8%, transparent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{t.account.logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Login (outlined) */}
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="hidden md:inline-flex items-center rounded-full border border-[var(--border)] px-3 h-8 text-[12.5px] hover:border-[color:color-mix(in_oklab,var(--accent)_45%,transparent)] transition-colors"
                  style={{ background: "var(--soft-bg)" }}
                >
                  {t.nav.login}
                </button>

                {/* Signup (primary) */}
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="btn-primary !py-1.5 !px-3 sm:!px-3.5 !text-[12.5px]"
                >
                  {t.nav.signup}
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-8 h-8 rounded-full border border-[var(--border)] shrink-0 ms-0.5"
              aria-label="Toggle menu"
              style={{ background: "var(--soft-bg)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="lg:hidden mt-2 rounded-2xl border border-[var(--border)] backdrop-blur-md p-3 max-h-[calc(100vh-6rem)] overflow-y-auto"
            style={{ background: "var(--nav-bg-mobile)" }}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openSearch();
              }}
              className="md:hidden flex items-center gap-2 rounded-full border border-[var(--border)] px-3 h-9 text-[13px] text-[var(--muted)] mb-3 w-full text-start"
              style={{ background: "var(--soft-bg)" }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
                <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span className="flex-1 truncate">{t.nav.searchPlaceholder}</span>
            </button>

            <div className="flex flex-col gap-0.5">
              {links.map((l) => {
                const isActive = active === l.id;
                if (l.highlighted) {
                  return (
                    <a
                      key={l.id}
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className="my-0.5 inline-flex items-center justify-between gap-1 rounded-xl px-3 py-2.5 text-sm border"
                      style={{
                        borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
                        background: "color-mix(in oklab, var(--accent) 8%, transparent)",
                        color: "var(--accent)",
                      }}
                    >
                      {l.label}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  );
                }
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors"
                    style={{
                      color: isActive ? "var(--foreground)" : "var(--muted)",
                      background: isActive ? "var(--hover-bg)" : "transparent",
                    }}
                  >
                    <span>{l.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    )}
                  </a>
                );
              })}
            </div>

            {isAuthed && user ? (
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                  <span
                    className="grid place-items-center w-9 h-9 rounded-full font-medium text-sm uppercase shrink-0"
                    style={{
                      background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {user.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium truncate">{user.name}</div>
                    <div className="text-[11px] text-[var(--muted)] truncate">{user.email}</div>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  {t.account.dashboard}
                </Link>
                <Link
                  href="/watchlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  {t.account.watchlist}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                    router.push("/");
                  }}
                  className="w-full text-start flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors text-[var(--muted)]"
                >
                  {t.account.logout}
                </button>
              </div>
            ) : (
              <div className="mt-3 pt-3 border-t border-[var(--border)] grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openAuth("login");
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-3 h-9 text-[13px]"
                  style={{ background: "var(--soft-bg)" }}
                >
                  {t.nav.login}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openAuth("signup");
                  }}
                  className="btn-primary !py-2 justify-center !text-[13px]"
                >
                  {t.nav.signup}
                </button>
              </div>
            )}

            <div className="md:hidden mt-3 flex items-center justify-center rounded-full border border-[var(--border)] p-0.5 text-[12px]" style={{ background: "var(--soft-bg)" }}>
              <button
                onClick={() => setLang("en")}
                className="flex-1 px-2 py-1 rounded-full"
                style={{
                  background: lang === "en" ? "var(--accent)" : "transparent",
                  color: lang === "en" ? "var(--accent-contrast)" : "var(--muted)",
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className="flex-1 px-2 py-1 rounded-full"
                style={{
                  background: lang === "ar" ? "var(--accent)" : "transparent",
                  color: lang === "ar" ? "var(--accent-contrast)" : "var(--muted)",
                }}
              >
                ع
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
