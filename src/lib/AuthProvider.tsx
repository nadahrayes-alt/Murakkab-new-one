"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type AuthMode = "login" | "signup";

type Ctx = {
  mode: AuthMode | null;
  open: (mode: AuthMode) => void;
  close: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);

  const open = useCallback((m: AuthMode) => setMode(m), []);
  const close = useCallback(() => setMode(null), []);

  const value = useMemo<Ctx>(() => ({ mode, open, close }), [mode, open, close]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
