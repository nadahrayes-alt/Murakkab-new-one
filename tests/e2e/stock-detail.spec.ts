import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";

test.describe("Stock detail", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("renders header, score badges, time-range tabs", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/stock/ARMD");
    await expect(page.getByText(/Armada Tech\./)).toBeVisible();
    await expect(page.getByText(/^Shariah compliant$/).first()).toBeVisible();
    for (const r of ["1D", "1W", "1M", "3M", "1Y", "5Y"]) {
      await expect(page.getByRole("button", { name: new RegExp(`^${r}$`) })).toBeVisible();
    }
  });

  test("clicking a time range updates aria-pressed", async ({ page }) => {
    await page.goto("/stock/ARMD");
    await page.getByRole("button", { name: /^3M$/ }).click();
    await expect(page.getByRole("button", { name: /^3M$/ })).toHaveAttribute("aria-pressed", "true");
  });

  test("free user sees premium gate over Analyst Ratings + Earnings", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/stock/ARMD");
    await expect(page.getByText(/^Premium feature$/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /^Upgrade now$/ }).first()).toBeVisible();
  });

  test("premium user sees Buy/Hold/Sell, Price target, Expected upside", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/stock/ARMD");
    await expect(page.getByText(/^Buy$/).first()).toBeVisible();
    await expect(page.getByText("Price target")).toBeVisible();
    await expect(page.getByText("Expected upside")).toBeVisible();
  });

  test("unknown ticker shows 'Sample Co.' fallback rather than 404", async ({ page }) => {
    const resp = await page.goto("/stock/ZZZZZZ");
    expect(resp?.status()).toBe(200);
    await expect(page.getByText(/Sample Co\./)).toBeVisible();
  });

  test("similar stocks links navigate", async ({ page }) => {
    await page.goto("/stock/ARMD");
    const link = page.locator("[href='/stock/NEXV']").first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/stock\/NEXV$/);
  });

  test("Back link returns to /", async ({ page }) => {
    await page.goto("/stock/ARMD");
    await page.getByRole("link", { name: /^Back$/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
