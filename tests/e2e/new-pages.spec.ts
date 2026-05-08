import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";

test.describe("New pages added during P1 fixes", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("/terms renders with title and sections", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: /^Terms of Service$/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Acceptance$/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Subscriptions$/ })).toBeVisible();
  });

  test("/privacy renders with title and sections", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: /^Privacy Policy$/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^What we collect$/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Cookies$/ })).toBeVisible();
  });

  test("/forgot-password validates email and shows confirmation", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByRole("heading", { name: /^Reset your password$/ })).toBeVisible();

    // Invalid email blocked
    await page.getByPlaceholder("Email address").fill("not-an-email");
    await page.getByRole("button", { name: /^Send reset link$/ }).click();
    await expect(page.getByText("Please enter a valid email")).toBeVisible();

    // Valid email goes to "check your inbox" state
    await page.getByPlaceholder("Email address").fill("user@example.com");
    await page.getByRole("button", { name: /^Send reset link$/ }).click();
    await expect(page.getByRole("heading", { name: /^Check your inbox$/ })).toBeVisible();
  });

  test("/earnings — anonymous gets login prompt", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/earnings");
    await expect(page.getByText("Log in to see the upcoming earnings calendar.")).toBeVisible();
  });

  test("/earnings — free user sees premium gate", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/earnings");
    await expect(page.getByRole("button", { name: /^Upgrade now$/ }).first()).toBeVisible();
  });

  test("/earnings — premium user sees the calendar list", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/earnings");
    await expect(page.getByRole("heading", { name: /^Upcoming earnings$/ })).toBeVisible();
    // 8 placeholder rows
    const rows = page.locator("ul > li");
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThanOrEqual(5);
  });
});
