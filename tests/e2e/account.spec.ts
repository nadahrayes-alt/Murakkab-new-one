import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, seedWatchlist } from "./_helpers";

test.describe("Account / Settings", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("profile save updates user in localStorage and shows 'Profile saved' toast", async ({ page }) => {
    await seedLoggedInUser(page, "free", { name: "Old Name", email: "old@example.com" });
    await page.goto("/account");
    await page.getByLabel(/^Full name$/).fill("New Name");
    await page.getByLabel(/^Email address$/).fill("new@example.com");
    await page.getByRole("button", { name: /^Save changes$/ }).click();
    await expect(page.getByText(/^Profile saved$/)).toBeVisible();
    const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(stored.name).toBe("New Name");
    expect(stored.email).toBe("new@example.com");
  });

  test("BUG: Change password 'saves' without doing anything", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await page.getByLabel(/^Current password$/).fill("currentpw");
    await page.getByLabel(/^New password$/).fill("newpw1!");
    await page.getByRole("button", { name: /^Change password$/ }).click();
    await expect(page.getByText(/^Password updated$/)).toBeVisible();
    // No backend so no real change — but UI claims success
  });

  test("BUG: 2FA toggle is purely cosmetic — no setup flow appears", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    const twoFa = page.getByRole("switch", { name: /Two-factor authentication/ });
    await expect(twoFa).toHaveAttribute("aria-checked", "false");
    await twoFa.click();
    await expect(twoFa).toHaveAttribute("aria-checked", "true");
    // No QR / no recovery codes / no challenge appears
    await expect(page.getByText(/scan|QR|recovery/i)).toHaveCount(0);
  });

  test("free user sees 'Upgrade to Premium' CTA pointing to /#pricing", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    const upgradeLink = page.getByRole("link", { name: /^Upgrade to Premium$/ }).first();
    await expect(upgradeLink).toBeVisible();
    await expect(upgradeLink).toHaveAttribute("href", /#pricing/);
  });

  test("premium user can open Invoices modal showing 3 mock invoices", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/account");
    await page.getByRole("button", { name: /^View invoices$/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("text=/^INV-/").or(dialog.getByText(/INV-/))).toHaveCount(3);
  });

  test("premium user 'Cancel subscription' confirm → tier becomes free", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/account");
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: /^Cancel subscription$/ }).click();
    const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(stored.tier).toBe("free");
    await expect(page.getByText(/Your subscription has been cancelled/)).toBeVisible();
  });

  test("Delete account confirm → wipes user + watchlist, returns to /", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await seedWatchlist(page, ["ARMD"]);
    await page.goto("/account");
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: /^Delete account$/ }).click();
    await expect(page).toHaveURL(/\/$/);
    const u = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
    const wl = await page.evaluate(() => window.localStorage.getItem("murakkab_watchlist"));
    expect(u).toBeNull();
    expect(JSON.parse(wl || "[]")).toEqual([]);
  });

  test("Language switch inside settings flips dir", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await page.getByRole("button", { name: /^العربية$/ }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});
