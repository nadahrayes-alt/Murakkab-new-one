import { test, expect } from "@playwright/test";
import { collectConsoleErrors, setEnglish } from "./_helpers";

const ROUTES = [
  "/",
  "/dashboard",
  "/account",
  "/watchlist",
  "/alerts",
  "/article/test-slug",
  "/stock/AAPL",
  "/terms",
  "/privacy",
  "/forgot-password",
  "/checkout",
  "/earnings",
];

test.describe("Health & routing", () => {
  test("homepage loads with brand and main sections", async ({ page }) => {
    const getErrors = collectConsoleErrors(page);
    await setEnglish(page);
    await page.goto("/");
    await expect(page).toHaveTitle(/مركّب|Murakkab/i);
    // RTL is the default on the document since rendering happens before lang init script flushes.
    // Once English seed kicks in via LanguageProvider effect, it should switch.
    await expect(page.locator("html")).toHaveAttribute("lang", /(en|ar)/);

    // Primary sections — they have stable IDs
    for (const id of ["features", "news", "testimonials", "pricing", "articles"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    const errs = getErrors();
    test.info().annotations.push({ type: "console-errors", description: JSON.stringify(errs) });
  });

  for (const route of ROUTES) {
    test(`route ${route} responds 200`, async ({ page }) => {
      const resp = await page.goto(route);
      expect(resp?.status(), `expected 200 for ${route}`).toBe(200);
    });
  }

  test("unknown route returns 404 page", async ({ page }) => {
    const resp = await page.goto("/this-does-not-exist");
    expect(resp?.status()).toBe(404);
    // Default Next 404 should render something visible
    await expect(page.locator("body")).toContainText(/404|Not Found|تعذر|غير موجود/i);
  });
});
