import { test, expect } from "@playwright/test";
import { collectConsoleErrors, setEnglish, seedLoggedInUser, dismissAuthModalIfOpen } from "./_helpers";

const ROUTES = [
  { path: "/", auth: false },
  { path: "/dashboard", auth: true },
  { path: "/account", auth: true },
  { path: "/watchlist", auth: true },
  { path: "/alerts", auth: true }, // restored after CRITICAL-1 fix (EN translations added)
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
    await dismissAuthModalIfOpen(page);
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

test("FIX VERIFY: /alerts in English no longer crashes (CRITICAL-1 fixed)", async ({ page }) => {
  await setEnglish(page);
  await seedLoggedInUser(page, "premium");
  const getErrors = collectConsoleErrors(page);
  await page.goto("/alerts");
  await dismissAuthModalIfOpen(page);
  await page.waitForTimeout(1000);
  const errs = getErrors();
  const hasCrash = errs.some((e) => /Cannot read properties of undefined/.test(e.text));
  expect(hasCrash).toBe(false);
  // English heading renders
  await expect(page.getByRole("heading", { name: /^Alerts$/ })).toBeVisible();
});
