import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";

test.describe("Pricing / Plans / Upgrade flow", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("Annual / Monthly toggle changes premium tier price", async ({ page }) => {
    await page.goto("/#pricing");
    const monthly = page.getByRole("button", { name: /^Monthly$/ });
    const annual = page.getByRole("button", { name: /^Annual$/ });
    await monthly.click();
    await expect(page.getByText(/\$35\.00/)).toBeVisible();
    await annual.click();
    await expect(page.getByText(/\$199\.00/)).toBeVisible();
  });

  test("FIX VERIFY: Anonymous → 'Subscribe now' → signup → /checkout (CRITICAL-3 fixed)", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/#pricing");
    await page.getByRole("button", { name: /^Subscribe now$/ }).click();
    await expect(page.getByPlaceholder("Full name")).toBeVisible();
    await page.getByPlaceholder("Full name").fill("Premium Buyer");
    await page.getByPlaceholder("Email address").fill("premium@example.com");
    await page.getByPlaceholder("Password").fill("longenoughpassword");
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    // After signup with intent=premium, user should land on /checkout, not /dashboard
    await expect(page).toHaveURL(/\/checkout/);
    // Tier is still free until they actually complete checkout
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u.tier).toBe("free");
  });

  test("FIX VERIFY: Free user → 'Upgrade now' → /checkout (CRITICAL-3 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "free", { name: "Free", email: "free@example.com" });
    await page.goto("/#pricing");
    await page.getByRole("button", { name: /^Upgrade now$/ }).first().click();
    await expect(page).toHaveURL(/\/checkout/);
    // Tier remains free until they actually complete checkout
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u.tier).toBe("free");
  });

  test("Premium user sees 'Current plan' disabled CTA on featured plan", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/#pricing");
    const current = page.getByRole("button", { name: /^Current plan$/ });
    await expect(current).toBeVisible();
    await expect(current).toBeDisabled();
  });

  test("FIX VERIFY: /checkout simulation flow upgrades tier only after 'Pay' (CRITICAL-3 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "free", { name: "Free Buyer", email: "buyer@example.com" });
    await page.goto("/checkout?billing=annual");
    // Check pricing summary shows annual price (multiple matches — pick the first)
    await expect(page.getByText("$199.00").first()).toBeVisible();
    // Submit empty → all 4 errors
    await page.getByRole("button", { name: /^Confirm and pay/ }).click();
    await expect(page.getByText("Please enter the cardholder name")).toBeVisible();
    await expect(page.getByText("Card number is invalid")).toBeVisible();
    // Use the test card shortcut
    await page.getByRole("button", { name: /^Use test card$/ }).click();
    await page.getByRole("button", { name: /^Confirm and pay/ }).click();
    // Processing → success → redirect
    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 10_000 });
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u.tier).toBe("premium");
  });

  test("FIX VERIFY: Anonymous user hitting /checkout directly is bounced to login", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/checkout");
    // Auth modal should open
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("Email address")).toBeVisible();
  });
});
