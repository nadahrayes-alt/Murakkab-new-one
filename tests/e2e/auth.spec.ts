import { test, expect } from "@playwright/test";
import { setEnglish, seedLoggedInUser, openSignupModal, openLoginModal, submitSignup } from "./_helpers";

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

  test("HTML5 required attribute blocks empty submission", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    // Modal stays open — browser native validation popup blocks
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });

  test("submitting any data redirects to /dashboard and persists user", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await submitSignup(page, "Ada Lovelace", "ada@example.com", "anything");
    await expect(page).toHaveURL(/\/dashboard$/);
    const u = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
    expect(u).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com", tier: "free" });
  });

  test("BUG: invalid email format gets through (only browser-native checks)", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await page.getByPlaceholder("Full name").fill("X");
    await page.getByPlaceholder("Email address").fill("not-an-email");
    await page.getByPlaceholder("Password").fill("a");
    await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
    // Browser's email type validation should block
    await expect(page.getByRole("dialog")).toBeVisible();
    // BUT no app-level validation message
    expect.soft(await page.getByText(/Invalid email|valid email/i).count(), "no app-level email validation").toBe(0);
  });

  test("BUG: trivially short password is accepted (no policy)", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    await submitSignup(page, "Weak", "weak@example.com", "a");
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test("BUG: Terms and Privacy links are href='#'", async ({ page }) => {
    await page.goto("/");
    await openSignupModal(page);
    const terms = page.getByRole("link", { name: /Terms of Service/i });
    const privacy = page.getByRole("link", { name: /Privacy Policy/i });
    expect.soft(await terms.getAttribute("href"), "Terms link href").not.toBe("#");
    expect.soft(await privacy.getAttribute("href"), "Privacy link href").not.toBe("#");
  });
});

test.describe("Auth modal — Login", () => {
  test.beforeEach(async ({ page }) => {
    await setEnglish(page);
  });

  test("login form has Remember me + Forgot password (cosmetic)", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    await expect(page.getByText(/Remember me/)).toBeVisible();
    const forgot = page.getByRole("link", { name: /Forgot password/ });
    await expect(forgot).toBeVisible();
    expect.soft(await forgot.getAttribute("href"), "Forgot password link href").not.toBe("#");
  });

  test("BUG: 'Log in with Google' button has no handler", async ({ page }) => {
    await page.goto("/");
    await openLoginModal(page);
    const google = page.getByRole("button", { name: /Log in with Google/ });
    await expect(google).toBeVisible();
    await google.click();
    // Modal still open, URL unchanged
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("dialog")).toBeVisible();
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
    // Click avatar (button with aria-label "My account")
    await page.getByRole("button", { name: /^My account$/ }).click();
    await page.getByRole("button", { name: /^Log out$/ }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("button", { name: /^Log in$/ }).first()).toBeVisible();
    const stored = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
    expect(stored).toBeNull();
  });

  test("logout-all-sessions in Settings does the same as logout (no real session list)", async ({ page }) => {
    await setEnglish(page);
    await seedLoggedInUser(page, "free");
    await page.goto("/account");
    await page.getByRole("button", { name: /Log out of all devices/ }).click();
    await expect(page).toHaveURL(/\/$/);
    const stored = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
    expect(stored).toBeNull();
  });
});
