import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, openSignupModal, openLoginModal, submitSignup, dismissAuthModalIfOpen } from "./_helpers";

test.describe("Auth modal — Signup", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("opens from Navbar 'Create account' button with all fields", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await expect(page.getByPlaceholder("Full name")).toBeVisible();
    await expect(page.getByPlaceholder("Email address")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ })).toBeVisible();
  });

  test("Empty submission shows inline errors and does not navigate", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Please enter your full name")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Valid signup redirects to /dashboard and persists free user", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await submitSignup(page, "Ada Lovelace", "ada@example.com", "longenoughpassword");
    await expect(page).toHaveURL(/\/dashboard$/);
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com", tier: "free" });
  });

  test("FIX VERIFY: invalid email format shows inline error (HIGH-4 fixed)", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await page.getByPlaceholder("Full name").fill("X");
    await page.getByPlaceholder("Email address").fill("not-an-email");
    await page.getByPlaceholder("Password").fill("longenough");
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    // Modal stays open, app-level error shown
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("FIX VERIFY: short password rejected with inline error (HIGH-4 fixed)", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await page.getByPlaceholder("Full name").fill("Weak");
    await page.getByPlaceholder("Email address").fill("weak@example.com");
    await page.getByPlaceholder("Password").fill("a");
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters")).toBeVisible();
    // Did NOT redirect to dashboard
    await expect(page).toHaveURL(/\/$/);
  });

  test("FIX VERIFY: Terms and Privacy links resolve to real routes (HIGH-10 fixed)", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    const terms = page.getByRole("link", { name: /Terms of Service/i });
    const privacy = page.getByRole("link", { name: /Privacy Policy/i });
    expect(await terms.getAttribute("href")).toBe("/terms");
    expect(await privacy.getAttribute("href")).toBe("/privacy");
  });
});

test.describe("Auth modal — Login", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("FIX VERIFY: Forgot password link points to /forgot-password (HIGH-10 fixed)", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    await expect(page.getByText(/Remember me/)).toBeVisible();
    const forgot = page.getByRole("link", { name: /Forgot password/ });
    await expect(forgot).toBeVisible();
    expect(await forgot.getAttribute("href")).toBe("/forgot-password");
  });

  test("FIX VERIFY: 'Log in with Google' is disabled with 'coming soon' (HIGH-7 fixed)", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    const google = page.getByRole("button", { name: /Log in with Google/ });
    await expect(google).toBeDisabled();
    await expect(google).toContainText(/coming soon/i);
  });

  test("'Log in with Apple' is correctly disabled with coming soon badge", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    const apple = page.getByRole("button", { name: /Log in with Apple/ });
    await expect(apple).toBeDisabled();
    await expect(apple).toContainText(/coming soon/i);
  });

  test("ESC closes the modal", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("Backdrop click closes the modal", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    await page.locator(".modal-backdrop").first().click({ position: { x: 5, y: 5 } });
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("Mode switch link toggles between login and signup", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    // Login mode: link says "Sign up" (auth.login.switchTo)
    await page.getByRole("button", { name: /^Sign up$/ }).first().click();
    await expect(page.getByPlaceholder("Full name")).toBeVisible();
    // Signup mode: link says "Log in" (auth.signup.switchTo) — BUT navbar button is also "Log in" — uniqueness
    const dialogLogin = page.getByRole("dialog").getByRole("button", { name: /^Log in$/ });
    await dialogLogin.click();
    // Back to login mode — full name field gone
    await expect(page.getByPlaceholder("Full name")).toHaveCount(0);
  });
});

test.describe("Logout", () => {
  test("logout from avatar menu clears user and redirects to /", async ({ page }) => {
    await setEnglish(page);
    await seedLoggedInUser(page, "free", { name: "Logout Test", email: "logout@example.com" });
    await page.goto("/dashboard");
    await dismissAuthModalIfOpen(page);
    // Click avatar (button with aria-label "My account")
    await page.getByRole("button", { name: /^My account$/ }).click();
    // Inside the dropdown menu specifically — multiple "Log out" buttons may exist
    await page.getByRole("menu").getByRole("button", { name: /^Log out$/ }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("button", { name: /^Log in$/ }).first()).toBeVisible();
    const stored = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
    expect(stored).toBeNull();
  });

  test("logout-all-sessions in Settings does the same as logout (no real session list)", async ({ page }) => {
    await setEnglish(page);
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await dismissAuthModalIfOpen(page);
    await page.getByRole("button", { name: /Log out of all devices/ }).click();
    await expect(page).toHaveURL(/\/$/);
    const stored = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
    expect(stored).toBeNull();
  });
});
