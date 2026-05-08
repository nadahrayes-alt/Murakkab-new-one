# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account.spec.ts >> Account / Settings >> profile save updates user in localStorage and shows 'Profile saved' toast
- Location: tests/e2e/account.spec.ts:9:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^Save changes$/ })
    - locator resolved to <button type="submit" class="btn-primary">Save changes</button>
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
    15 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

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
        - button "My account" [ref=e32]: O
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
                - generic [ref=e61]: "N"
                - generic [ref=e62]:
                  - generic [ref=e63]: New Name
                  - generic [ref=e64]: new@example.com
              - generic [ref=e65]:
                - generic [ref=e66]:
                  - generic [ref=e67]: Full name
                  - textbox "Full name" [ref=e69]: New Name
                - generic [ref=e70]:
                  - generic [ref=e71]: Email address
                  - textbox "Email address" [active] [ref=e73]: new@example.com
              - button "Save changes" [ref=e75]
          - generic [ref=e76]:
            - generic [ref=e77]:
              - heading "Subscription & billing" [level=2] [ref=e78]
              - paragraph [ref=e79]: Manage your plan, upgrades, and invoices.
            - generic [ref=e81]:
              - generic [ref=e84]:
                - generic [ref=e85]: Current plan
                - generic [ref=e87]: Free plan
                - generic [ref=e88]: Limited access — 5 articles per month.
              - generic [ref=e90]:
                - generic [ref=e91]:
                  - generic [ref=e92]: ★ Unlock all features
                  - paragraph [ref=e93]: Upgrade to Premium for full access to 1,300+ stocks and every advanced analysis tool.
                - link "Upgrade to Premium" [ref=e94] [cursor=pointer]:
                  - /url: /#pricing
                  - text: Upgrade to Premium
                  - img [ref=e95]
          - generic [ref=e97]:
            - generic [ref=e98]:
              - heading "Preferences" [level=2] [ref=e99]
              - paragraph [ref=e100]: Language and appearance.
            - generic [ref=e102]:
              - generic [ref=e103]:
                - generic [ref=e104]: Language
                - generic [ref=e105]:
                  - button "English" [pressed] [ref=e106]
                  - button "العربية" [ref=e107]
              - generic [ref=e108]:
                - generic [ref=e109]: Theme
                - generic [ref=e110]:
                  - button "Dark" [pressed] [ref=e111]:
                    - text: Dark
                    - img [ref=e113]
                  - button "Light" [ref=e115]: Light
                  - button "Midnight" [ref=e117]: Midnight
                  - button "Forest" [ref=e119]: Forest
          - generic [ref=e121]:
            - generic [ref=e122]:
              - heading "Notifications" [level=2] [ref=e123]
              - paragraph [ref=e124]: Choose when and how we reach you.
            - generic [ref=e126]:
              - generic [ref=e127]:
                - generic [ref=e128]:
                  - generic [ref=e129]: Weekly digest
                  - generic [ref=e130]: Summary of your stocks and market moves every Sunday.
                - switch "Weekly digest" [checked] [ref=e131]
              - generic [ref=e133]:
                - generic [ref=e134]:
                  - generic [ref=e135]: Price alerts
                  - generic [ref=e136]: Notify me when a stock I follow moves significantly.
                - switch "Price alerts" [checked] [ref=e137]
              - generic [ref=e139]:
                - generic [ref=e140]:
                  - generic [ref=e141]: Earnings releases
                  - generic [ref=e142]: Reminder before earnings dates for stocks you watch.
                - switch "Earnings releases" [checked] [ref=e143]
              - generic [ref=e145]:
                - generic [ref=e146]:
                  - generic [ref=e147]: Product updates
                  - generic [ref=e148]: New features and improvements in Murakkab+.
                - switch "Product updates" [ref=e149]
          - generic [ref=e151]:
            - generic [ref=e152]:
              - heading "Security" [level=2] [ref=e153]
              - paragraph [ref=e154]: Password and two-factor authentication.
            - generic [ref=e156]:
              - generic [ref=e157]:
                - generic [ref=e158]:
                  - generic [ref=e159]:
                    - generic [ref=e160]: Current password
                    - textbox "Current password" [ref=e162]
                  - generic [ref=e163]:
                    - generic [ref=e164]: New password
                    - textbox "New password" [ref=e166]
                - button "Change password" [ref=e168]
              - generic [ref=e169]:
                - generic [ref=e170]:
                  - generic [ref=e171]:
                    - generic [ref=e172]: Two-factor authentication
                    - generic [ref=e173]: Disabled
                  - generic [ref=e174]: Add an extra layer of protection with a code sent to your phone.
                - switch "Two-factor authentication" [ref=e175]
              - generic [ref=e177]:
                - generic [ref=e178]:
                  - generic [ref=e179]: Active sessions
                  - generic [ref=e180]: Log out of all other devices.
                - button "Log out of all devices" [ref=e181]
          - generic [ref=e182]:
            - generic [ref=e183]:
              - heading "Danger zone" [level=2] [ref=e184]
              - paragraph [ref=e185]: Permanent actions that cannot be undone.
            - generic [ref=e186]:
              - paragraph [ref=e187]: Account deletion is permanent and cannot be undone. All your data will be permanently erased.
              - button "Delete account" [ref=e189]:
                - img [ref=e190]
                - text: Delete account
  - contentinfo [ref=e193]:
    - generic [ref=e194]:
      - generic [ref=e195]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e196]
        - link "Subscribe now" [ref=e198] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e199]
      - generic [ref=e201]:
        - generic [ref=e202]:
          - generic [ref=e203]:
            - img [ref=e205]
            - generic [ref=e207]: Murakkab+
          - paragraph [ref=e208]: Shariah-aligned stock analysis platform
          - paragraph [ref=e209]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e210]:
          - generic [ref=e211]:
            - generic [ref=e212]: Explore
            - list [ref=e213]:
              - listitem [ref=e214]:
                - link "Why Murakkab" [ref=e215] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e216]:
                - link "Filters" [ref=e217] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e218]:
                - link "Features" [ref=e219] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e220]:
                - link "Pricing" [ref=e221] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e222]:
            - generic [ref=e223]: Company
            - list [ref=e224]:
              - listitem [ref=e225]:
                - link "About" [ref=e226] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e227]:
                - link "Contact" [ref=e228] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e229]:
            - generic [ref=e230]: Legal
            - list [ref=e231]:
              - listitem [ref=e232]:
                - link "Privacy" [ref=e233] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e234]:
                - link "Terms" [ref=e235] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e236]:
        - generic [ref=e237]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e238]:
          - link "Twitter" [ref=e239] [cursor=pointer]:
            - /url: "#"
            - img [ref=e240]
          - link "LinkedIn" [ref=e242] [cursor=pointer]:
            - /url: "#"
            - img [ref=e243]
  - button "Open Next.js Dev Tools" [ref=e250] [cursor=pointer]:
    - img [ref=e251]
  - alert [ref=e254]
  - dialog [ref=e255]:
    - generic [ref=e257]:
      - button "Close" [ref=e258]:
        - img [ref=e259]
      - img [ref=e263]
      - generic [ref=e265]:
        - heading "Log in" [level=2] [ref=e266]
        - paragraph [ref=e267]: Sign in to access your account and continue your analysis.
      - generic [ref=e268]:
        - generic [ref=e269]:
          - img [ref=e271]
          - textbox "Email address" [ref=e273]
        - generic [ref=e274]:
          - img [ref=e276]
          - textbox "Password" [ref=e279]
          - button "Toggle password visibility" [ref=e281]:
            - img [ref=e282]
        - generic [ref=e285]:
          - generic [ref=e286] [cursor=pointer]:
            - checkbox "Remember me" [ref=e287]
            - text: Remember me
          - link "Forgot password?" [ref=e288] [cursor=pointer]:
            - /url: "#"
        - button "Log in" [ref=e289]
      - generic [ref=e292]: or
      - generic [ref=e294]:
        - button "Log in with Google" [ref=e295]:
          - img [ref=e296]
          - generic [ref=e301]: Log in with Google
        - button "Log in with Apple coming soon" [disabled] [ref=e302]:
          - img [ref=e303]
          - generic [ref=e305]: Log in with Apple
          - generic [ref=e306]: coming soon
      - generic [ref=e307]:
        - text: Don't have an account?
        - button "Sign up" [ref=e308]
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
> 14 |     await page.getByRole("button", { name: /^Save changes$/ }).click();
     |                                                                ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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
  63 |     await page.getByRole("button", { name: /^Cancel subscription$/ }).click();
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