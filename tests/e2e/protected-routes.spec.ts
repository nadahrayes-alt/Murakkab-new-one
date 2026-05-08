import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, clearAuth, dismissAuthModalIfOpen } from "./_helpers";

const PROTECTED = ["/dashboard", "/account", "/watchlist", "/alerts"];

test.describe("Protected route gating (client-side only)", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
    await clearAuth(page);
  });

  for (const route of PROTECTED) {
    test(`anonymous on ${route} sees the in-page Log-in fallback and modal opens`, async ({ page }) => {
      await page.goto(route);
      // After CRITICAL-1 fix, English works on /alerts too.
      await expect(page.getByText(/^Log in to access/i).first()).toBeVisible();
      await expect(page.getByRole("dialog")).toBeVisible();
    });
  }

  test("FIX VERIFY: authed user reaches /dashboard with NO modal (CRITICAL-2 fixed)", async ({ page }) => {
    // After fixing AuthProvider to read localStorage synchronously in useState,
    // the first render already has isAuthed=true, so the unauthed branch never fires.
    await seedLoggedInUser(page, "free", { name: "Dash User" });
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: /Welcome back/ })).toBeVisible();
    // Modal must NOT appear at all
    await page.waitForTimeout(800);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("server returns full HTML for protected routes regardless of auth (no SSR redirect)", async ({ request }) => {
    for (const r of PROTECTED) {
      const resp = await request.get(r);
      expect(resp.status(), `${r} should serve 200 even unauthed`).toBe(200);
    }
  });
});
