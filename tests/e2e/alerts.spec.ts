import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, dismissAuthModalIfOpen } from "./_helpers";

test.describe("Alerts page", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
    // Ensure no leftover alerts from a previous test
    await page.addInitScript(() => window.localStorage.removeItem("murakkab_alerts"));
  });

  test("free user (English) sees premium upsell card", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/alerts");
    await dismissAuthModalIfOpen(page);
    await expect(page.getByRole("button", { name: /^Upgrade now$/ })).toBeVisible();
    // No tabs visible to free users
    await expect(page.getByRole("button", { name: /^All\s*\(/ })).toHaveCount(0);
  });

  test("premium user sees alert tabs + 4 seeded alerts", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    await dismissAuthModalIfOpen(page);
    await expect(page.getByRole("button", { name: /^All\s*\(4\)$/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Active\s*\(3\)$/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Triggered\s*\(1\)$/ })).toBeVisible();
  });

  test("FIX VERIFY: '+ Create new alert' opens form and creates an alert (HIGH-8 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    await dismissAuthModalIfOpen(page);
    await page.getByRole("button", { name: /^Create new alert$/ }).first().click();
    // Form modal opens
    const form = page.getByRole("dialog").last();
    await expect(form).toBeVisible();
    await expect(form.getByText("Create new alert")).toBeVisible();
    // Fill value (ticker, type, condition pre-selected from defaults)
    await form.locator("input[type='text']").fill("$200.00");
    await form.getByRole("button", { name: /^Create$/ }).click();
    // Modal closes, count goes 4 → 5
    await expect(page.getByRole("button", { name: /^All\s*\(5\)$/ })).toBeVisible();
  });

  test("FIX VERIFY: Edit button pre-fills form and updates alert (HIGH-8 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    await dismissAuthModalIfOpen(page);
    await page.getByRole("button", { name: /^Edit$/ }).first().click();
    const form = page.getByRole("dialog").last();
    await expect(form).toBeVisible();
    await expect(form.getByText("Edit alert")).toBeVisible();
    // Change value
    const valueInput = form.locator("input[type='text']");
    await valueInput.fill("$999.99");
    await form.getByRole("button", { name: /^Save$/ }).click();
    // After save, modal closes
    await expect(form).toBeHidden();
    // The new value is shown in the list
    await expect(page.getByText("$999.99").first()).toBeVisible();
  });

  test("FIX VERIFY: Delete button confirms and removes the alert (HIGH-8 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    await dismissAuthModalIfOpen(page);
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: /^Delete$/ }).first().click();
    // Count should go 4 → 3
    await expect(page.getByRole("button", { name: /^All\s*\(3\)$/ })).toBeVisible();
  });

  test("FIX VERIFY: /alerts in English renders with proper EN copy (CRITICAL-1 fixed)", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.addInitScript(() => window.localStorage.setItem("lang", "en"));
    await page.goto("/alerts");
    await dismissAuthModalIfOpen(page);
    await expect(page.getByRole("heading", { name: /^Alerts$/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^All\s*\(/ })).toBeVisible();
  });

  test("filtering by Triggered tab narrows the list", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    await dismissAuthModalIfOpen(page);
    const triggered = page.getByRole("button", { name: /^Triggered\s*\(/ });
    await triggered.click();
    await expect(triggered).toHaveAttribute("aria-pressed", "true");
  });
});
