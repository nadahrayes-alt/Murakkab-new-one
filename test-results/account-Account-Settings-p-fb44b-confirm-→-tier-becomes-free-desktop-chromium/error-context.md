# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account.spec.ts >> Account / Settings >> premium user 'Cancel subscription' confirm → tier becomes free
- Location: tests/e2e/account.spec.ts:59:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^Cancel subscription$/ })
    - locator resolved to <button type="button" class="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-3.5 h-9 text-[12.5px] text-[#e74c3c] transition-colors hover:border-[#e74c3c]">Cancel subscription</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 100ms
    16 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "Murakkab+" [ref=e5] [cursor=pointer]:
        - /url: "#top"
        - img [ref=e7]
        - generic [ref=e9]: Murakkab+
      - navigation [ref=e10]:
        - link "Features" [ref=e11] [cursor=pointer]:
          - /url: "#features"
        - link "Latest news" [ref=e12] [cursor=pointer]:
          - /url: "#news"
        - link "Reviews" [ref=e13] [cursor=pointer]:
          - /url: "#testimonials"
        - link "Pricing" [ref=e14] [cursor=pointer]:
          - /url: "#pricing"
        - link "Analysis articles" [ref=e15] [cursor=pointer]:
          - /url: "#articles"
          - text: Analysis articles
          - img [ref=e16]
      - generic [ref=e18]:
        - button "Open search" [ref=e19]:
          - img [ref=e20]
          - generic [ref=e23]: Search for a stock or company...
        - button "Switch theme" [ref=e25]:
          - img [ref=e26]
        - generic [ref=e28]:
          - button "EN" [pressed] [ref=e29]
          - button "ع" [ref=e30]
        - button "My account" [ref=e32]: T
  - main [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e38]: My account
        - heading "Settings" [level=1] [ref=e41]
        - paragraph [ref=e43]: Manage your account and preferences in one place.
      - generic [ref=e44]:
        - complementary [ref=e45]:
          - generic [ref=e46]:
            - link "Profile" [ref=e47] [cursor=pointer]:
              - /url: "#profile"
            - link "Subscription" [ref=e48] [cursor=pointer]:
              - /url: "#subscription"
            - link "Preferences" [ref=e49] [cursor=pointer]:
              - /url: "#preferences"
            - link "Notifications" [ref=e50] [cursor=pointer]:
              - /url: "#notifications"
            - link "Security" [ref=e51] [cursor=pointer]:
              - /url: "#security"
            - link "Danger zone" [ref=e52] [cursor=pointer]:
              - /url: "#danger"
        - generic [ref=e53]:
          - generic [ref=e54]:
            - generic [ref=e55]:
              - heading "Profile" [level=2] [ref=e56]
              - paragraph [ref=e57]: Your basic account information.
            - generic [ref=e59]:
              - generic [ref=e60]:
                - generic [ref=e61]: T
                - generic [ref=e62]:
                  - generic [ref=e63]: Test User
                  - generic [ref=e64]: test@example.com
              - generic [ref=e65]:
                - generic [ref=e66]:
                  - generic [ref=e67]: Full name
                  - textbox "Full name" [ref=e69]: Test User
                - generic [ref=e70]:
                  - generic [ref=e71]: Email address
                  - textbox "Email address" [ref=e73]: test@example.com
              - button "Save changes" [ref=e75]
          - generic [ref=e76]:
            - generic [ref=e77]:
              - heading "Subscription & billing" [level=2] [ref=e78]
              - paragraph [ref=e79]: Manage your plan, upgrades, and invoices.
            - generic [ref=e81]:
              - generic [ref=e83]:
                - generic [ref=e84]:
                  - generic [ref=e85]: Current plan
                  - generic [ref=e86]:
                    - generic [ref=e87]: Premium plan
                    - generic [ref=e88]: Pro
                  - generic [ref=e89]: Full access to all Murakkab+ tools.
                - button "Manage subscription" [ref=e90]
              - generic [ref=e91]:
                - button "View invoices" [ref=e92]
                - button "Cancel subscription" [ref=e93]
          - generic [ref=e94]:
            - generic [ref=e95]:
              - heading "Preferences" [level=2] [ref=e96]
              - paragraph [ref=e97]: Language and appearance.
            - generic [ref=e99]:
              - generic [ref=e100]:
                - generic [ref=e101]: Language
                - generic [ref=e102]:
                  - button "English" [pressed] [ref=e103]
                  - button "العربية" [ref=e104]
              - generic [ref=e105]:
                - generic [ref=e106]: Theme
                - generic [ref=e107]:
                  - button "Dark" [pressed] [ref=e108]:
                    - text: Dark
                    - img [ref=e110]
                  - button "Light" [ref=e112]: Light
                  - button "Midnight" [ref=e114]: Midnight
                  - button "Forest" [ref=e116]: Forest
          - generic [ref=e118]:
            - generic [ref=e119]:
              - heading "Notifications" [level=2] [ref=e120]
              - paragraph [ref=e121]: Choose when and how we reach you.
            - generic [ref=e123]:
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - generic [ref=e126]: Weekly digest
                  - generic [ref=e127]: Summary of your stocks and market moves every Sunday.
                - switch "Weekly digest" [checked] [ref=e128]
              - generic [ref=e130]:
                - generic [ref=e131]:
                  - generic [ref=e132]: Price alerts
                  - generic [ref=e133]: Notify me when a stock I follow moves significantly.
                - switch "Price alerts" [checked] [ref=e134]
              - generic [ref=e136]:
                - generic [ref=e137]:
                  - generic [ref=e138]: Earnings releases
                  - generic [ref=e139]: Reminder before earnings dates for stocks you watch.
                - switch "Earnings releases" [checked] [ref=e140]
              - generic [ref=e142]:
                - generic [ref=e143]:
                  - generic [ref=e144]: Product updates
                  - generic [ref=e145]: New features and improvements in Murakkab+.
                - switch "Product updates" [ref=e146]
          - generic [ref=e148]:
            - generic [ref=e149]:
              - heading "Security" [level=2] [ref=e150]
              - paragraph [ref=e151]: Password and two-factor authentication.
            - generic [ref=e153]:
              - generic [ref=e154]:
                - generic [ref=e155]:
                  - generic [ref=e156]:
                    - generic [ref=e157]: Current password
                    - textbox "Current password" [ref=e159]
                  - generic [ref=e160]:
                    - generic [ref=e161]: New password
                    - textbox "New password" [ref=e163]
                - button "Change password" [ref=e165]
              - generic [ref=e166]:
                - generic [ref=e167]:
                  - generic [ref=e168]:
                    - generic [ref=e169]: Two-factor authentication
                    - generic [ref=e170]: Disabled
                  - generic [ref=e171]: Add an extra layer of protection with a code sent to your phone.
                - switch "Two-factor authentication" [ref=e172]
              - generic [ref=e174]:
                - generic [ref=e175]:
                  - generic [ref=e176]: Active sessions
                  - generic [ref=e177]: Log out of all other devices.
                - button "Log out of all devices" [ref=e178]
          - generic [ref=e179]:
            - generic [ref=e180]:
              - heading "Danger zone" [level=2] [ref=e181]
              - paragraph [ref=e182]: Permanent actions that cannot be undone.
            - generic [ref=e183]:
              - paragraph [ref=e184]: Account deletion is permanent and cannot be undone. All your data will be permanently erased.
              - button "Delete account" [ref=e186]:
                - img [ref=e187]
                - text: Delete account
  - contentinfo [ref=e190]:
    - generic [ref=e191]:
      - generic [ref=e192]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e193]
        - link "Subscribe now" [ref=e195] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e196]
      - generic [ref=e198]:
        - generic [ref=e199]:
          - generic [ref=e200]:
            - img [ref=e202]
            - generic [ref=e204]: Murakkab+
          - paragraph [ref=e205]: Shariah-aligned stock analysis platform
          - paragraph [ref=e206]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e207]:
          - generic [ref=e208]:
            - generic [ref=e209]: Explore
            - list [ref=e210]:
              - listitem [ref=e211]:
                - link "Why Murakkab" [ref=e212] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e213]:
                - link "Filters" [ref=e214] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e215]:
                - link "Features" [ref=e216] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e217]:
                - link "Pricing" [ref=e218] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e219]:
            - generic [ref=e220]: Company
            - list [ref=e221]:
              - listitem [ref=e222]:
                - link "About" [ref=e223] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e224]:
                - link "Contact" [ref=e225] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e226]:
            - generic [ref=e227]: Legal
            - list [ref=e228]:
              - listitem [ref=e229]:
                - link "Privacy" [ref=e230] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e231]:
                - link "Terms" [ref=e232] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e233]:
        - generic [ref=e234]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e235]:
          - link "Twitter" [ref=e236] [cursor=pointer]:
            - /url: "#"
            - img [ref=e237]
          - link "LinkedIn" [ref=e239] [cursor=pointer]:
            - /url: "#"
            - img [ref=e240]
  - button "Open Next.js Dev Tools" [ref=e247] [cursor=pointer]:
    - img [ref=e248]
  - alert [ref=e251]
  - dialog [ref=e252]:
    - generic [ref=e254]:
      - button "Close" [ref=e255]:
        - img [ref=e256]
      - img [ref=e260]
      - generic [ref=e262]:
        - heading "Log in" [level=2] [ref=e263]
        - paragraph [ref=e264]: Sign in to access your account and continue your analysis.
      - generic [ref=e265]:
        - generic [ref=e266]:
          - img [ref=e268]
          - textbox "Email address" [active] [ref=e270]
        - generic [ref=e271]:
          - img [ref=e273]
          - textbox "Password" [ref=e276]
          - button "Toggle password visibility" [ref=e278]:
            - img [ref=e279]
        - generic [ref=e282]:
          - generic [ref=e283] [cursor=pointer]:
            - checkbox "Remember me" [ref=e284]
            - text: Remember me
          - link "Forgot password?" [ref=e285] [cursor=pointer]:
            - /url: "#"
        - button "Log in" [ref=e286]
      - generic [ref=e289]: or
      - generic [ref=e291]:
        - button "Log in with Google" [ref=e292]:
          - img [ref=e293]
          - generic [ref=e298]: Log in with Google
        - button "Log in with Apple coming soon" [disabled] [ref=e299]:
          - img [ref=e300]
          - generic [ref=e302]: Log in with Apple
          - generic [ref=e303]: coming soon
      - generic [ref=e304]:
        - text: Don't have an account?
        - button "Sign up" [ref=e305]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser, seedWatchlist } from "./_helpers";
  3  | 
  4  | test.describe("Account / Settings", () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setEnglish(page);
  7  |   });
  8  | 
  9  |   test("profile save updates user in localStorage and shows 'Profile saved' toast", async ({ page }) => {
  10 |     await seedLoggedInUser(page, "free", { name: "Old Name", email: "old@example.com" });
  11 |     await page.goto("/account");
  12 |     await page.getByLabel(/^Full name$/).fill("New Name");
  13 |     await page.getByLabel(/^Email address$/).fill("new@example.com");
  14 |     await page.getByRole("button", { name: /^Save changes$/ }).click();
  15 |     await expect(page.getByText(/^Profile saved$/)).toBeVisible();
  16 |     const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
  17 |     expect(stored.name).toBe("New Name");
  18 |     expect(stored.email).toBe("new@example.com");
  19 |   });
  20 | 
  21 |   test("BUG: Change password 'saves' without doing anything", async ({ page }) => {
  22 |     await seedLoggedInUser(page, "free");
  23 |     await page.goto("/account");
  24 |     await page.getByLabel(/^Current password$/).fill("currentpw");
  25 |     await page.getByLabel(/^New password$/).fill("newpw1!");
  26 |     await page.getByRole("button", { name: /^Change password$/ }).click();
  27 |     await expect(page.getByText(/^Password updated$/)).toBeVisible();
  28 |     // No backend so no real change — but UI claims success
  29 |   });
  30 | 
  31 |   test("BUG: 2FA toggle is purely cosmetic — no setup flow appears", async ({ page }) => {
  32 |     await seedLoggedInUser(page, "free");
  33 |     await page.goto("/account");
  34 |     const twoFa = page.getByRole("switch", { name: /Two-factor authentication/ });
  35 |     await expect(twoFa).toHaveAttribute("aria-checked", "false");
  36 |     await twoFa.click();
  37 |     await expect(twoFa).toHaveAttribute("aria-checked", "true");
  38 |     // No QR / no recovery codes / no challenge appears
  39 |     await expect(page.getByText(/scan|QR|recovery/i)).toHaveCount(0);
  40 |   });
  41 | 
  42 |   test("free user sees 'Upgrade to Premium' CTA pointing to /#pricing", async ({ page }) => {
  43 |     await seedLoggedInUser(page, "free");
  44 |     await page.goto("/account");
  45 |     const upgradeLink = page.getByRole("link", { name: /^Upgrade to Premium$/ }).first();
  46 |     await expect(upgradeLink).toBeVisible();
  47 |     await expect(upgradeLink).toHaveAttribute("href", /#pricing/);
  48 |   });
  49 | 
  50 |   test("premium user can open Invoices modal showing 3 mock invoices", async ({ page }) => {
  51 |     await seedLoggedInUser(page, "premium");
  52 |     await page.goto("/account");
  53 |     await page.getByRole("button", { name: /^View invoices$/ }).click();
  54 |     const dialog = page.getByRole("dialog");
  55 |     await expect(dialog).toBeVisible();
  56 |     await expect(dialog.locator("text=/^INV-/").or(dialog.getByText(/INV-/))).toHaveCount(3);
  57 |   });
  58 | 
  59 |   test("premium user 'Cancel subscription' confirm → tier becomes free", async ({ page }) => {
  60 |     await seedLoggedInUser(page, "premium");
  61 |     await page.goto("/account");
  62 |     page.once("dialog", (d) => d.accept());
> 63 |     await page.getByRole("button", { name: /^Cancel subscription$/ }).click();
     |                                                                       ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  64 |     const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_user") || "{}"));
  65 |     expect(stored.tier).toBe("free");
  66 |     await expect(page.getByText(/Your subscription has been cancelled/)).toBeVisible();
  67 |   });
  68 | 
  69 |   test("Delete account confirm → wipes user + watchlist, returns to /", async ({ page }) => {
  70 |     await seedLoggedInUser(page, "free");
  71 |     await seedWatchlist(page, ["ARMD"]);
  72 |     await page.goto("/account");
  73 |     page.once("dialog", (d) => d.accept());
  74 |     await page.getByRole("button", { name: /^Delete account$/ }).click();
  75 |     await expect(page).toHaveURL(/\/$/);
  76 |     const u = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
  77 |     const wl = await page.evaluate(() => window.localStorage.getItem("murakkab_watchlist"));
  78 |     expect(u).toBeNull();
  79 |     expect(JSON.parse(wl || "[]")).toEqual([]);
  80 |   });
  81 | 
  82 |   test("Language switch inside settings flips dir", async ({ page }) => {
  83 |     await seedLoggedInUser(page, "free");
  84 |     await page.goto("/account");
  85 |     await page.getByRole("button", { name: /^العربية$/ }).click();
  86 |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  87 |   });
  88 | });
  89 | 
```