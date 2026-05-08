import { Page, expect } from "@playwright/test";

export const USER_KEY = "murakkab_user";
export const WATCHLIST_KEY = "murakkab_watchlist";
export const LANG_KEY = "lang";
export const THEME_KEY = "theme";

export type Tier = "free" | "premium";

/**
 * Seeds localStorage with a logged-in user before the app boots.
 * Must be called BEFORE the first navigation so the auth provider picks it up.
 */
export async function seedLoggedInUser(
  page: Page,
  tier: Tier = "free",
  overrides: { name?: string; email?: string } = {}
) {
  const user = {
    name: overrides.name ?? "Test User",
    email: overrides.email ?? "test@example.com",
    tier,
  };
  await page.addInitScript(
    ({ key, user }) => {
      window.localStorage.setItem(key, JSON.stringify(user));
    },
    { key: USER_KEY, user }
  );
}

export async function seedWatchlist(page: Page, tickers: string[]) {
  await page.addInitScript(
    ({ key, list }) => {
      window.localStorage.setItem(key, JSON.stringify(list));
    },
    { key: WATCHLIST_KEY, list: tickers }
  );
}

export async function clearAuth(page: Page) {
  await page.addInitScript(
    ({ keys }) => {
      keys.forEach((k) => window.localStorage.removeItem(k));
    },
    { keys: [USER_KEY, WATCHLIST_KEY] }
  );
}

export function collectConsoleErrors(page: Page) {
  const errors: { type: string; text: string; location?: string }[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push({
        type: msg.type(),
        text: msg.text(),
        location: `${msg.location().url}:${msg.location().lineNumber}`,
      });
    }
  });
  page.on("pageerror", (err) => {
    errors.push({ type: "pageerror", text: err.message });
  });
  return () => errors;
}

/**
 * Set English BEFORE the app boots, so all strings asserted match en translations.
 */
export async function setEnglish(page: Page) {
  await page.addInitScript(({ key }) => {
    window.localStorage.setItem(key, "en");
  }, { key: LANG_KEY });
}

/**
 * Open the auth modal in signup mode via the navbar primary button ("Create account").
 */
export async function openSignupModal(page: Page) {
  await page.getByRole("button", { name: /^Create account$/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

/**
 * Open the auth modal in login mode via the navbar outlined button ("Log in").
 */
export async function openLoginModal(page: Page) {
  // The desktop login button is hidden md:inline-flex — visible at >=md
  await page.getByRole("button", { name: /^Log in$/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

/**
 * Submit the signup form. Modal must already be open.
 */
export async function submitSignup(page: Page, fullName: string, email: string, password: string) {
  await page.getByPlaceholder("Full name").fill(fullName);
  await page.getByPlaceholder("Email address").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
}

export async function submitLogin(page: Page, email: string, password: string) {
  await page.getByPlaceholder("Email address").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("dialog").getByRole("button", { name: /^Log in$/ }).click();
}

/**
 * BUG WORKAROUND: Authed users hitting protected routes still see the auth modal pop open
 * (DashboardView/AccountView/WatchlistView/AlertsView call openAuth in a useEffect that fires
 * BEFORE localStorage hydrates the user, and never closes it). Press Escape if the modal is up.
 * This documents the bug — see Phase 16 / Phase 11 findings.
 */
export async function dismissAuthModalIfOpen(page: Page) {
  // Wait briefly for the bug-induced auto-open to fire (useEffect after hydration).
  const dialog = page.getByRole("dialog");
  await dialog.first().waitFor({ state: "visible", timeout: 2_500 }).catch(() => {});
  if (await dialog.count() > 0 && await dialog.first().isVisible().catch(() => false)) {
    // Try Escape first
    await page.keyboard.press("Escape");
    const closed = await dialog.first().isHidden().catch(() => false);
    if (!closed) {
      // Click the close button inside the modal as a backup
      const close = page.getByRole("dialog").getByRole("button", { name: /^(Close|إغلاق|×)$/ }).first();
      if (await close.count() > 0) await close.click({ force: true }).catch(() => {});
    }
    await expect(dialog.first()).toBeHidden({ timeout: 5_000 });
  }
}
