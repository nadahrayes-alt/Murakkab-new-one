"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type AlertStatus = "active" | "triggered" | "paused";
export type AlertType = "price" | "earnings" | "score" | "shariah";
export type AlertCondition = "priceAbove" | "priceBelow" | "scoreUp" | "scoreDown" | null;

export type AlertRecord = {
  id: string;
  ticker: string;
  type: AlertType;
  condition: AlertCondition;
  value: string;
  status: AlertStatus;
};

const STORAGE_KEY = "murakkab_alerts";

const SEED: AlertRecord[] = [
  { id: "seed-1", ticker: "ARMD", type: "price", condition: "priceAbove", value: "$150.00", status: "active" },
  { id: "seed-2", ticker: "HELX", type: "earnings", condition: null, value: "Jun 12, 2026", status: "active" },
  { id: "seed-3", ticker: "NEXV", type: "price", condition: "priceBelow", value: "$80.00", status: "active" },
  { id: "seed-4", ticker: "LUMN", type: "score", condition: "scoreUp", value: "85", status: "triggered" },
];

type Ctx = {
  alerts: AlertRecord[];
  add: (a: Omit<AlertRecord, "id" | "status">) => string;
  update: (id: string, patch: Partial<Omit<AlertRecord, "id">>) => void;
  remove: (id: string) => void;
};

const AlertsContext = createContext<Ctx | null>(null);

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setAlerts(raw ? (JSON.parse(raw) as AlertRecord[]) : SEED);
    } catch {
      setAlerts(SEED);
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        setAlerts(e.newValue ? (JSON.parse(e.newValue) as AlertRecord[]) : []);
      } catch {
        setAlerts([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: AlertRecord[]) => {
    setAlerts(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const add = useCallback<Ctx["add"]>(
    (a) => {
      const id = `usr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
      const record: AlertRecord = { id, status: "active", ...a };
      setAlerts((prev) => {
        const next = [record, ...prev];
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
      return id;
    },
    []
  );

  const update = useCallback<Ctx["update"]>((id, patch) => {
    setAlerts((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...patch } : a));
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const remove = useCallback<Ctx["remove"]>((id) => {
    setAlerts((prev) => {
      const next = prev.filter((a) => a.id !== id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(() => ({ alerts, add, update, remove }), [alerts, add, update, remove]);

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>;
}

export function useAlerts() {
  const ctx = useContext(AlertsContext);
  if (!ctx) throw new Error("useAlerts must be used inside AlertsProvider");
  return ctx;
}
