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

  test("Anonymous → 'Subscribe now' opens signup with intent=premium → user signs up → tier=premium on dashboard", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/#pricing");
    await page.getByRole("button", { name: /^Subscribe now$/ }).click();
    await expect(page.getByPlaceholder("Full name")).toBeVisible();
    await page.getByPlaceholder("Full name").fill("Premium Buyer");
    await page.getByPlaceholder("Email address").fill("premium@example.com");
    await page.getByPlaceholder("Password").fill("anything");
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u.tier).toBe("premium");
  });

  test("Free user → 'Upgrade now' button silently flips tier", async ({ page }) => {
    await seedLoggedInUser(page, "free", { name: "Free", email: "free@example.com" });
    await page.goto("/#pricing");
    await page.getByRole("button", { name: /^Upgrade now$/ }).first().click();
    await expect(page).toHaveURL(/\/dashboard$/);
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u.tier).toBe("premium");
  });

  test("Premium user sees 'Current plan' disabled CTA on featured plan", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/#pricing");
    const current = page.getByRole("button", { name: /^Current plan$/ });
    await expect(current).toBeVisible();
    await expect(current).toBeDisabled();
  });

  test("LAUNCH BLOCKER: There is NO payment step — premium granted instantly without a card", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/#pricing");
    await page.getByRole("button", { name: /^Subscribe now$/ }).click();
    await page.getByPlaceholder("Full name").fill("X");
    await page.getByPlaceholder("Email address").fill("x@y.z");
    await page.getByPlaceholder("Password").fill("a");
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    // No /checkout, no Stripe iframe, no card fields anywhere
    expect(page.url()).not.toMatch(/checkout|stripe|paddle|payment/i);
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u.tier).toBe("premium");
  });
});
