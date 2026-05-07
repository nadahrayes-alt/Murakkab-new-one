"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Ctx = {
  watchlist: string[];
  isWatched: (ticker: string) => boolean;
  toggle: (ticker: string) => void;
  add: (ticker: string) => void;
  remove: (ticker: string) => void;
  clear: () => void;
};

const WatchlistContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "murakkab_watchlist";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWatchlist(JSON.parse(raw) as string[]);
    } catch {}
  }, []);

  const persist = useCallback((next: string[]) => {
    setWatchlist(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const isWatched = useCallback((t: string) => watchlist.includes(t), [watchlist]);

  const add = useCallback((t: string) => {
    setWatchlist((prev) => {
      if (prev.includes(t)) return prev;
      const next = [...prev, t];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((t: string) => {
    setWatchlist((prev) => {
      const next = prev.filter((x) => x !== t);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggle = useCallback((t: string) => {
    setWatchlist((prev) => {
      const next = prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clear = useCallback(() => persist([]), [persist]);

  const value = useMemo<Ctx>(
    () => ({ watchlist, isWatched, toggle, add, remove, clear }),
    [watchlist, isWatched, toggle, add, remove, clear]
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
