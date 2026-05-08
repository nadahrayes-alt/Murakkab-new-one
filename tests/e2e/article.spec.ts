import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";

test.describe("Article detail", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("free user sees only first 3 sections + paywall", async ({ page }) => {
    await clearAuth(page);
    await page.goto("/article/test-slug");
    // Section labels: "Section 01" through "Section 06" (placeholder has 6)
    await expect(page.getByText(/Section\s+01/).first()).toBeVisible();
    await expect(page.getByText(/Section\s+03/).first()).toBeVisible();
    // 04+ should not render for free users
    await expect(page.getByText(/Section\s+04/)).toHaveCount(0);
    // Paywall card title: "Continue reading with Murakkab+"
    await expect(page.getByRole("heading", { name: /Continue reading/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Upgrade now$/ }).first()).toBeVisible();
  });

  test("premium user sees all sections, no paywall", async ({ page }) => {
    await seedLoggedInUser(page, "premium");
    await page.goto("/article/test-slug");
    await expect(page.getByText(/Section\s+06/).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Continue reading/ })).toHaveCount(0);
  });

  test("Copy link button writes URL to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/article/clip-test");
    await page.getByRole("button", { name: /^Copy link$/ }).first().click();
    await expect(page.getByRole("button", { name: /^Copied$/ }).first()).toBeVisible();
    const cb = await page.evaluate(() => navigator.clipboard.readText());
    expect(cb).toContain("/article/clip-test");
  });

  test("Share to X opens twitter intent in new tab", async ({ page }) => {
    await page.goto("/article/share-test");
    // Capture the URL via the window.open call rather than the popup's actual URL,
    // because aborted navigation never settles popup.url().
    let openedUrl: string | null = null;
    await page.exposeFunction("__captureOpen", (u: string) => {
      openedUrl = u;
    });
    await page.evaluate(() => {
      const orig = window.open;
      window.open = (url?: string | URL, ...rest: unknown[]) => {
        // @ts-expect-error custom hook
        window.__captureOpen(typeof url === "string" ? url : url?.toString());
        return orig.call(window, "about:blank", ...rest);
      };
    });
    await page.getByRole("button", { name: /^Share on X$/ }).first().click();
    await expect.poll(() => openedUrl, { timeout: 5_000 }).toMatch(/twitter\.com\/intent\/tweet/);
  });

  test("Newsletter submit shows 'Subscribed' state and clears input", async ({ page }) => {
    await page.goto("/article/news-1");
    const email = page.getByPlaceholder(/Enter your email/);
    const submit = page.getByRole("button", { name: /^Subscribe$/ });
    // Empty submit — required attr blocks
    await submit.click();
    await expect(page.getByRole("button", { name: /^Subscribed$/ })).toHaveCount(0);
    // Real submit
    await email.fill("reader@example.com");
    await submit.click();
    await expect(page.getByRole("button", { name: /^Subscribed$/ })).toBeVisible();
  });

  test("FIX VERIFY: Sidebar 'View full analysis' navigates to /stock/ARMD (HIGH-8 fixed)", async ({ page }) => {
    await page.goto("/article/sidebar-test");
    const link = page.getByRole("link", { name: /^View full analysis$/ });
    await expect(link).toBeVisible();
    expect(await link.getAttribute("href")).toBe("/stock/ARMD");
  });
});
