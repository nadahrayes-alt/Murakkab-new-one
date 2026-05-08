import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser } from "./_helpers";

// Runs only under the mobile-iphone project.
test.describe("Mobile (iPhone 13 viewport)", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("hamburger toggles mobile menu, anchor links and auth buttons visible", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.getByRole("button", { name: /Toggle menu/ });
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    // Anchor link to Pricing
    await expect(page.getByRole("link", { name: /^Pricing$/ }).first()).toBeVisible();
    // Login + Create account inline
    await expect(page.getByRole("button", { name: /^Log in$/ }).last()).toBeVisible();
    await expect(page.getByRole("button", { name: /^Create account$/ }).last()).toBeVisible();
  });

  test("Search trigger inside hamburger menu opens SearchModal", async ({ page }) => {
    await page.goto("/");
    // On <640px, the search icon in the navbar is hidden. Search lives inside the mobile drawer.
    await page.getByRole("button", { name: /Toggle menu/ }).click();
    // Click the search-styled button at the top of the drawer (placeholder text is the search hint)
    await page.locator(".lg\\:hidden button", { hasText: /Search/ }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("Search stocks by name or symbol...")).toBeVisible();
  });

  test("Dashboard fits viewport without horizontal scroll", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/dashboard");
    const widths = await page.evaluate(() => ({
      docWidth: document.documentElement.scrollWidth,
      viewWidth: window.innerWidth,
    }));
    expect(widths.docWidth).toBeLessThanOrEqual(widths.viewWidth + 1);
  });

  test("Plans grid stacks vertically on mobile", async ({ page }) => {
    await page.goto("/#pricing");
    const cards = page.locator("section#pricing article");
    await expect(cards).toHaveCount(2);
    const [b1, b2] = await Promise.all([cards.nth(0).boundingBox(), cards.nth(1).boundingBox()]);
    if (b1 && b2) {
      expect(b2.y).toBeGreaterThan(b1.y);
    }
  });
});
