"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type AuthMode = "login" | "signup";

export type User = {
  name: string;
  email: string;
  tier: "free" | "premium";
};

export type AuthIntent = "premium" | null;

type Ctx = {
  // Auth modal state
  mode: AuthMode | null;
  intent: AuthIntent;
  open: (mode: AuthMode, intent?: AuthIntent) => void;
  close: () => void;
  // User state
  user: User | null;
  isAuthed: boolean;
  isPremium: boolean;
  login: (user: User) => void;
  logout: () => void;
  upgrade: () => void;
  downgrade: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "murakkab_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);
  const [intent, setIntent] = useState<AuthIntent>(null);
  const [user, setUserState] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserState(JSON.parse(raw) as User);
    } catch {}
  }, []);

  const open = useCallback((m: AuthMode, nextIntent: AuthIntent = null) => {
    setIntent(nextIntent);
    setMode(m);
  }, []);
  const close = useCallback(() => {
    setMode(null);
    setIntent(null);
  }, []);

  const persist = useCallback((u: User | null) => {
    if (typeof window === "undefined") return;
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const login = useCallback((u: User) => {
    // If signup happened from a premium CTA, auto-upgrade after login.
    const finalUser: User = intent === "premium" ? { ...u, tier: "premium" } : u;
    setUserState(finalUser);
    persist(finalUser);
    setIntent(null);
  }, [intent, persist]);

  const logout = useCallback(() => {
    setUserState(null);
    persist(null);
  }, [persist]);

  const upgrade = useCallback(() => {
    setUserState((prev) => {
      if (!prev) return prev;
      const next = { ...prev, tier: "premium" as const };
      persist(next);
      return next;
    });
  }, [persist]);

  const downgrade = useCallback(() => {
    setUserState((prev) => {
      if (!prev) return prev;
      const next = { ...prev, tier: "free" as const };
      persist(next);
      return next;
    });
  }, [persist]);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUserState((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      persist(next);
      return next;
    });
  }, [persist]);

  const value = useMemo<Ctx>(
    () => ({
      mode,
      intent,
      open,
      close,
      user,
      isAuthed: !!user,
      isPremium: user?.tier === "premium",
      login,
      logout,
      upgrade,
      downgrade,
      updateUser,
    }),
    [mode, intent, open, close, user, login, logout, upgrade, downgrade, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
