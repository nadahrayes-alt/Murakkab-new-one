import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, seedWatchlist, clearAuth } from "./_helpers";

test.describe("Watchlist", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("anonymous clicking 'Add to watchlist' on stock detail → opens login modal", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/stock/ARMD");
    await page.getByRole("button", { name: /^Add to watchlist$/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("Email address")).toBeVisible();
  });

  test("authed user toggles watchlist and persists across reload", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/stock/ARMD");
    await page.getByRole("button", { name: /^Add to watchlist$/ }).click();
    // Button label changes to "In watchlist"
    await expect(page.getByRole("button", { name: /^In watchlist$/ })).toBeVisible();
    const wl = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_watchlist") || "[]"));
    expect(wl).toContain("ARMD");

    await page.reload();
    await expect(page.getByRole("button", { name: /^In watchlist$/ })).toBeVisible();
  });

  test("/watchlist empty state shows search CTA", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/watchlist");
    await expect(page.getByRole("heading", { name: /Your watchlist is empty/ })).toBeVisible();
    await page.getByRole("button", { name: /^Go to search$/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("/watchlist with seeded tickers shows cards and sort tabs", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await seedWatchlist(page, ["ARMD", "NEXV", "HELX"]);
    await page.goto("/watchlist");
    await expect(page.locator("[href='/stock/ARMD']").first()).toBeVisible();
    await expect(page.locator("[href='/stock/NEXV']").first()).toBeVisible();
    await expect(page.locator("[href='/stock/HELX']").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /^Recently added$/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Highest quality$/ })).toBeVisible();
  });

  test("ISSUE: logout does NOT clear watchlist (data persists for next user)", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await seedWatchlist(page, ["ARMD"]);
    await page.goto("/dashboard");
    await page.getByRole("button", { name: /^My account$/ }).click();
    await page.getByRole("button", { name: /^Log out$/ }).click();
    const wl = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_watchlist") || "[]"));
    expect(wl).toEqual(["ARMD"]); // documents the bug
  });
});
