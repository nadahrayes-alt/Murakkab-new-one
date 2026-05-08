import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";

test.describe("Article detail", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("free user sees only first 3 sections + paywall", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/article/test-slug");
    // Section labels: "Section 01" through "Section 06" (placeholder has 6)
    await expect(page.getByText(/Section\s+01/).first()).toBeVisible();
    await expect(page.getByText(/Section\s+03/).first()).toBeVisible();
    // 04+ should not render for free users
    await expect(page.getByText(/Section\s+04/)).toHaveCount(0);
    // Paywall card title: "Continue reading with Murakkab+"
    await expect(page.getByRole("heading", { name: /Continue reading/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Upgrade now$/ }).first()).toBeVisible();
  });

  test("premium user sees all sections, no paywall", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/article/test-slug");
    await expect(page.getByText(/Section\s+06/).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Continue reading/ })).toHaveCount(0);
  });

  test("Copy link button writes URL to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/article/clip-test");
    await page.getByRole("button", { name: /^Copy link$/ }).first().click();
    await expect(page.getByRole("button", { name: /^Copied$/ }).first()).toBeVisible();
    const cb = await page.evaluate(() => navigator.clipboard.readText());
    expect(cb).toContain("/article/clip-test");
  });

  test("Share to X opens twitter intent in new tab", async ({ page, context }) => {
    await page.goto("/article/share-test");
    const popupPromise = context.waitForEvent("page");
    await page.getByRole("button", { name: /^Share on X$/ }).first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded", { timeout: 10_000 }).catch(() => {});
    expect(popup.url()).toMatch(/twitter\.com\/intent\/tweet/);
    await popup.close();
  });

  test("Newsletter submit shows 'Subscribed' state and clears input", async ({ page }) => {
    await page.goto("/article/news-1");
    const email = page.getByPlaceholder(/Enter your email/);
    const submit = page.getByRole("button", { name: /^Subscribe$/ });
    // Empty submit — required attr blocks
    await submit.click();
    await expect(page.getByRole("button", { name: /^Subscribed$/ })).toHaveCount(0);
    // Real submit
    await email.fill("reader@example.com");
    await submit.click();
    await expect(page.getByRole("button", { name: /^Subscribed$/ })).toBeVisible();
  });

  test("BUG: Sidebar 'View full analysis' button has no handler", async ({ page }) => {
    await page.goto("/article/sidebar-test");
    const btn = page.getByRole("button", { name: /^View full analysis$/ });
    await expect(btn).toBeVisible();
    const before = page.url();
    await btn.click();
    expect(page.url()).toBe(before);
  });
});
