"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Ctx = {
  open: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
};

const SearchContext = createContext<Ctx | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => setOpen(false), []);
  const toggleSearch = useCallback(() => setOpen((v) => !v), []);

  const value = useMemo<Ctx>(
    () => ({ open, openSearch, closeSearch, toggleSearch }),
    [open, openSearch, closeSearch, toggleSearch]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
}
