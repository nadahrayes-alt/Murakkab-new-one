import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";

const PROTECTED = ["/dashboard", "/account", "/watchlist", "/alerts"];

test.describe("Protected route gating (client-side only)", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
    await clearAuth(page);
  });

  for (const route of PROTECTED) {
    test(`anonymous on ${route} sees the in-page Log-in fallback and modal opens`, async ({ page }) => {
      await page.goto(route);
      // common.loginToAccess = "Log in to access" — but each view writes its own EN/AR copy:
      //  Dashboard: "Log in to access your dashboard."
      //  Account:   "Log in to access settings."
      //  Watchlist: "Log in to access your watchlist."
      //  Alerts:    "Log in to access alerts."
      await expect(page.getByText(/^Log in to access/i).first()).toBeVisible();
      await expect(page.getByRole("dialog")).toBeVisible();
    });
  }

  test("authed user reaches /dashboard with no modal and welcome heading", async ({ page }) => {
    await seedLoggedInUser(page, "free", { name: "Dash User" });
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: /Welcome back/ })).toBeVisible();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("server returns full HTML for protected routes regardless of auth (no SSR redirect)", async ({ request }) => {
    for (const r of PROTECTED) {
      const resp = await request.get(r);
      expect(resp.status(), `${r} should serve 200 even unauthed`).toBe(200);
    }
  });
});
