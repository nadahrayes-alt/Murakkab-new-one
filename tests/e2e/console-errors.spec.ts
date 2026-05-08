import { test, expect } from "@playwright/test";
import { collectConsoleErrors, setEnglish, seedLoggedInUser } from "./_helpers";

const ROUTES = [
  { path: "/", auth: false },
  { path: "/dashboard", auth: true },
  { path: "/account", auth: true },
  { path: "/watchlist", auth: true },
  { path: "/alerts", auth: true },
  { path: "/article/test-slug", auth: false },
  { path: "/stock/ARMD", auth: false },
  { path: "/stock/ZZZZZZ", auth: false }, // unknown ticker → fallback
];

for (const r of ROUTES) {
  test(`no console errors on ${r.path}`, async ({ page }) => {
    await setEnglish(page);
    if (r.auth) await seedLoggedInUser(page, "premium");
    const getErrors = collectConsoleErrors(page);
    await page.goto(r.path);
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    const errs = getErrors().filter(
      (e) =>
        !/Failed to load resource/i.test(e.text) &&
        !/Download the React DevTools/i.test(e.text) &&
        !/HMR/i.test(e.text)
    );
    if (errs.length) {
      console.log(`Console errors on ${r.path}:`, JSON.stringify(errs, null, 2));
    }
    expect(errs, `Console errors on ${r.path}`).toEqual([]);
  });
}
