import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, seedWatchlist, dismissAuthModalIfOpen } from "./_helpers";

test.describe("Account / Settings", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("profile save updates user in localStorage and shows 'Profile saved' toast", async ({ page }) => {
    await seedLoggedInUser(page, "free", { name: "Old Name", email: "old@example.com" });
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    // Profile section: first text input is name, first email input is email
    const profile = page.locator("section#profile").or(page.locator("form").first());
    const nameInput = page.locator("input[type='text']").first();
    const emailInput = page.locator("input[type='email']").first();
    await nameInput.fill("New Name");
    await emailInput.fill("new@example.com");
    await page.getByRole("button", { name: /^Save changes$/ }).click();
    await expect(page.getByText("Profile saved")).toBeVisible();
    const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(stored.name).toBe("New Name");
    expect(stored.email).toBe("new@example.com");
  });

  test("FIX VERIFY: Change password form is disabled with 'coming soon' (HIGH-5 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    // Password inputs disabled
    const pwInputs = page.locator("input[type='password']");
    await expect(pwInputs.nth(0)).toBeDisabled();
    await expect(pwInputs.nth(1)).toBeDisabled();
    // Submit button disabled
    await expect(page.getByRole("button", { name: /^Change password$/ })).toBeDisabled();
  });

  test("FIX VERIFY: 2FA toggle is disabled with 'coming soon' (HIGH-6 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    const twoFa = page.getByRole("switch", { name: /Two-factor authentication/ });
    await expect(twoFa).toBeDisabled();
    // Click should be a no-op
    await twoFa.click({ force: true }).catch(() => {});
    await expect(twoFa).toHaveAttribute("aria-checked", "false");
  });

  test("free user sees 'Upgrade to Premium' link → /#pricing", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    const upgradeLink = page.getByRole("link", { name: /^Upgrade to Premium$/ }).first();
    await expect(upgradeLink).toBeVisible();
    await expect(upgradeLink).toHaveAttribute("href", /#pricing/);
  });

  test("premium user can open Invoices modal showing 3 mock invoices", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    await page.getByRole("button", { name: /^View invoices$/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // 3 mock invoice IDs INV-2026-005 / INV-2025-005 / INV-2024-005
    await expect(dialog.locator("text=/INV-/").first()).toBeVisible();
    const count = await dialog.locator("text=/INV-/").count();
    expect(count).toBe(3);
  });

  test("premium user 'Cancel subscription' confirm → tier becomes free + toast", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: /^Cancel subscription$/ }).click();
    await expect(page.getByText(/Your subscription has been cancelled/)).toBeVisible();
    const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(stored.tier).toBe("free");
  });

  test("Delete account confirm → wipes user + watchlist, returns to /", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await seedWatchlist(page, ["ARMD"]);
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: /^Delete account$/ }).click();
    await expect(page).toHaveURL(/\/$/);
    const u = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
    const wl = await page.evaluate(() => window.localStorage.getItem("murakkab_watchlist"));
    expect(u).toBeNull();
    expect(JSON.parse(wl || "[]")).toEqual([]);
  });

  test("Language switch inside Settings flips dir to rtl", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    // Inside Preferences section there's an arabic option button
    await page.locator("section#preferences").getByRole("button", { name: /^العربية$/ }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});
