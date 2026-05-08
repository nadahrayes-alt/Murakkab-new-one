import { test, expect } from "@playwright/test";

test.describe("Language and theme", () => {
  test("default Arabic, RTL direction", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto("/");
    // First paint always uses lang=ar dir=rtl per layout.tsx
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  });

  test("language toggle EN/ع flips dir and persists across reload", async ({ page }) => {
    await page.goto("/");

    // Find the EN button in navbar (visible md+)
    const enBtn = page.getByRole("button", { name: "EN", exact: true }).first();
    await enBtn.click();
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    // Reload — should stay English
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("theme switcher offers four themes and persists", async ({ page }) => {
    await page.goto("/");
    // Open theme menu (icon button)
    const themeBtn = page.getByRole("button", { name: /Switch theme/i });
    await themeBtn.click();
    const items = page.getByRole("menuitemradio");
    await expect(items).toHaveCount(4);
    // Pick "Light" / "فاتح"
    await page.getByRole("menuitemradio").nth(1).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});
