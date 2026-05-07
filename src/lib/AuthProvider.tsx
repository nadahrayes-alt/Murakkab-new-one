"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type AuthMode = "login" | "signup";

export type User = {
  name: string;
  email: string;
  tier: "free" | "premium";
};

type Ctx = {
  // Auth modal state
  mode: AuthMode | null;
  open: (mode: AuthMode) => void;
  close: () => void;
  // User state
  user: User | null;
  isAuthed: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "murakkab_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);
  const [user, setUserState] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserState(JSON.parse(raw) as User);
    } catch {}
  }, []);

  const open = useCallback((m: AuthMode) => setMode(m), []);
  const close = useCallback(() => setMode(null), []);

  const login = useCallback((u: User) => {
    setUserState(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(
    () => ({ mode, open, close, user, isAuthed: !!user, login, logout }),
    [mode, open, close, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
