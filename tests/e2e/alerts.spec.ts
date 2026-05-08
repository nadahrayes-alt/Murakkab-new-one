import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser } from "./_helpers";

test.describe("Alerts page (Arabic, since EN translations are missing)", () => {
  test("free user (Arabic) sees premium upsell card", async ({ page }) => {
    // Don't set English — EN alerts strings don't exist
    await seedLoggedInUser(page, "free");
    await page.goto("/alerts");
    await expect(page.getByRole("button", { name: /الترقية/ })).toBeVisible();
  });

  test("premium user (Arabic) sees alert tabs + 'New alert' button", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    // Tab buttons end with "(N)" counts
    await expect(page.getByRole("button", { name: /\(\d+\)$/ }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /إنشاء تنبيه جديد/ })).toBeVisible();
  });

  test("BUG: '+ New alert' button has no handler", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    const btn = page.getByRole("button", { name: /إنشاء تنبيه جديد/ });
    const before = page.url();
    await btn.click();
    expect(page.url()).toBe(before);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("BUG: row Edit and Delete icons have no handlers", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/alerts");
    const editBtns = page.getByRole("button", { name: /تعديل/ });
    const deleteBtns = page.getByRole("button", { name: /حذف/ });
    if ((await editBtns.count()) > 0) {
      const before = page.url();
      await editBtns.first().click();
      expect(page.url()).toBe(before);
    }
    if ((await deleteBtns.count()) > 0) {
      const before = page.url();
      await deleteBtns.first().click();
      expect(page.url()).toBe(before);
    }
  });

  test("HIGH BUG: switching to English on /alerts breaks (translations missing)", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    // Seed English explicitly
    await page.addInitScript(() => window.localStorage.setItem("lang", "en"));
    await page.goto("/alerts");
    // Title should read something like "Alerts" but t.alerts is undefined in EN
    // Heading should still render but with empty text — or page should crash
    // Capture: any visible empty <h1>
    const h1Text = await page.locator("h1").first().textContent();
    // If translations are missing, h1Text will be empty/whitespace
    expect.soft(h1Text?.trim(), "Alerts page heading should not be empty in English").not.toBe("");
  });
});
