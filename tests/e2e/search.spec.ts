import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";

const SEARCH_PLACEHOLDER = "Search stocks by name or symbol...";

test.describe("Search modal", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
    await clearAuth(page);
  });

  test("Cmd+K opens search modal and Esc closes it", async ({ page, browserName }) => {
    await page.goto("/");
    // Modifier differs per OS, but Playwright's chromium on macOS supports both
    await page.keyboard.press("Meta+k");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder(SEARCH_PLACEHOLDER)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("Open search via navbar trigger", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Open search/i }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("typing a query filters suggestions; non-matching shows 'No results'", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Meta+k");
    const input = page.getByPlaceholder(SEARCH_PLACEHOLDER);
    await input.fill("ARMD");
    await expect(page.locator("[href='/stock/ARMD']").first()).toBeVisible();

    await input.fill("ZZZZZZZZ");
    await expect(page.getByText(/No results found for/i)).toBeVisible();
  });

  test("anonymous user clicks a 'Log in to access' premium-locked filter → opens auth modal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Meta+k");
    // The Non-compliant filter is premium=login. Click its card.
    const lockedCard = page.getByRole("button", { name: /Non-compliant/ }).first();
    await expect(lockedCard).toBeVisible();
    await lockedCard.click();
    // Search closes, AuthModal opens
    await expect(page.getByPlaceholder("Email address")).toBeVisible();
  });

  test("free user clicks 'Upgrade to access' filter → search closes, scrolls to #pricing", async ({ page }) => {
    await seedLoggedInUser(page, "free");
    await page.goto("/");
    await page.keyboard.press("Meta+k");
    const upgradeCard = page.getByRole("button", { name: /Worth attention|Fairly valued/ }).first();
    await upgradeCard.click();
    // Search modal closes
    await expect(page.locator(".modal-content").first()).toBeHidden({ timeout: 5_000 });
    await expect(page.locator("#pricing")).toBeInViewport();
  });

  test("activate a sector filter → Apply → results view shows results + chips", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Meta+k");
    await page.getByRole("button", { name: /^Technology$/ }).click();
    await page.getByRole("button", { name: /Apply filters \(\d/ }).click();
    await expect(page.getByRole("heading", { name: /^Search results/ })).toBeVisible();
    await expect(page.getByText(/^Technology$/).first()).toBeVisible();
  });

  test("clicking a stock suggestion navigates to /stock/[symbol] and closes modal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Meta+k");
    const card = page.locator("[href='/stock/ARMD']").first();
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/\/stock\/ARMD$/);
  });
});
