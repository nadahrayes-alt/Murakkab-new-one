import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, seedWatchlist } from "./_helpers";

test.describe("Dashboard — free user", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
    await seedLoggedInUser(page, "free", { name: "Free Person", email: "free@example.com" });
  });

  test("renders welcome, free banner, empty watchlist, recommendations", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: /Welcome back/ })).toBeVisible();
    await expect(page.getByText("Free Person")).toBeVisible();
    // Free user banner — title "You're on the free plan"
    await expect(page.getByText("You're on the free plan")).toBeVisible();
    // Empty watchlist state with CTA
    await expect(page.getByText("You haven't added any stocks yet")).toBeVisible();
  });

  test("'Search stocks' quick action opens SearchModal", async ({ page }) => {
    await page.goto("/dashboard");
    // Multiple "Search stocks" labels — pick the visible button by role
    await page.getByRole("button", { name: /^Search stocks$/ }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("Search stocks by name or symbol...")).toBeVisible();
  });

  test("does NOT show premium-only AI insights / earnings / movers", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Today's AI brief")).toHaveCount(0);
    await expect(page.getByText("Upcoming earnings")).toHaveCount(0);
    await expect(page.getByText("Top movers")).toHaveCount(0);
  });
});

test.describe("Dashboard — premium user", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
    await seedLoggedInUser(page, "premium", { name: "Pro Person", email: "pro@example.com" });
    await seedWatchlist(page, ["ARMD", "NEXV"]);
  });

  test("shows Pro badge, AI insights, earnings calendar, top movers", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText(/^Pro$/).first()).toBeVisible();
    await expect(page.getByText("Today's AI brief")).toBeVisible();
    await expect(page.getByText("Upcoming earnings")).toBeVisible();
    await expect(page.getByText("Top movers")).toBeVisible();
  });

  test("watchlist preview shows seeded tickers and links to detail", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("[href='/stock/ARMD']").first()).toBeVisible();
    await expect(page.locator("[href='/stock/NEXV']").first()).toBeVisible();
  });

  test("BUG: AI 'Deeper analysis' button has no handler (no navigation)", async ({ page }) => {
    await page.goto("/dashboard");
    const btn = page.getByRole("button", { name: /^Deeper analysis$/ });
    await expect(btn).toBeVisible();
    const before = page.url();
    await btn.click();
    expect(page.url()).toBe(before);
  });

  test("BUG: 'All earnings' link is href='#'", async ({ page }) => {
    await page.goto("/dashboard");
    const link = page.getByRole("link", { name: /^All earnings$/ });
    await expect(link).toBeVisible();
    expect.soft(await link.getAttribute("href"), "All earnings link href").not.toBe("#");
  });
});
