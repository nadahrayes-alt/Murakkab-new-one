# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: watchlist.spec.ts >> Watchlist >> /watchlist empty state shows search CTA
- Location: tests/e2e/watchlist.spec.ts:30:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^Go to search$/ })
    - locator resolved to <button type="button" class="btn-primary mt-6 justify-center">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="modal-content relative w-full max-w-md rounded-2xl border border-[var(--border)] p-6 sm:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto">…</div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="modal-content relative w-full max-w-md rounded-2xl border border-[var(--border)] p-6 sm:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto">…</div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 100ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <form class="relative mt-6 space-y-2.5">…</form> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
    3 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="modal-content relative w-full max-w-md rounded-2xl border border-[var(--border)] p-6 sm:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto">…</div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <form class="relative mt-6 space-y-2.5">…</form> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="modal-content relative w-full max-w-md rounded-2xl border border-[var(--border)] p-6 sm:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto">…</div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <form class="relative mt-6 space-y-2.5">…</form> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
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
        - generic [ref=e38]: Watchlist
        - generic [ref=e42]:
          - heading "Watchlist" [level=1] [ref=e43]
          - paragraph [ref=e44]: Every stock you're tracking, in one place.
      - generic [ref=e47]:
        - img [ref=e49]
        - heading "Your watchlist is empty" [level=3] [ref=e51]
        - paragraph [ref=e52]: Start adding stocks from search results to track them here.
        - button "Go to search" [ref=e53]:
          - text: Go to search
          - img [ref=e54]
        - link "← Dashboard" [ref=e58] [cursor=pointer]:
          - /url: /
  - contentinfo [ref=e59]:
    - generic [ref=e60]:
      - generic [ref=e61]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e62]
        - link "Subscribe now" [ref=e64] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e65]
      - generic [ref=e67]:
        - generic [ref=e68]:
          - generic [ref=e69]:
            - img [ref=e71]
            - generic [ref=e73]: Murakkab+
          - paragraph [ref=e74]: Shariah-aligned stock analysis platform
          - paragraph [ref=e75]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e76]:
          - generic [ref=e77]:
            - generic [ref=e78]: Explore
            - list [ref=e79]:
              - listitem [ref=e80]:
                - link "Why Murakkab" [ref=e81] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e82]:
                - link "Filters" [ref=e83] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e84]:
                - link "Features" [ref=e85] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e86]:
                - link "Pricing" [ref=e87] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e88]:
            - generic [ref=e89]: Company
            - list [ref=e90]:
              - listitem [ref=e91]:
                - link "About" [ref=e92] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e93]:
                - link "Contact" [ref=e94] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e95]:
            - generic [ref=e96]: Legal
            - list [ref=e97]:
              - listitem [ref=e98]:
                - link "Privacy" [ref=e99] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e100]:
                - link "Terms" [ref=e101] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e102]:
        - generic [ref=e103]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e104]:
          - link "Twitter" [ref=e105] [cursor=pointer]:
            - /url: "#"
            - img [ref=e106]
          - link "LinkedIn" [ref=e108] [cursor=pointer]:
            - /url: "#"
            - img [ref=e109]
  - button "Open Next.js Dev Tools" [ref=e116] [cursor=pointer]:
    - img [ref=e117]
  - alert [ref=e120]
  - dialog [ref=e121]:
    - generic [ref=e123]:
      - button "Close" [ref=e124]:
        - img [ref=e125]
      - img [ref=e129]
      - generic [ref=e131]:
        - heading "Log in" [level=2] [ref=e132]
        - paragraph [ref=e133]: Sign in to access your account and continue your analysis.
      - generic [ref=e134]:
        - generic [ref=e135]:
          - img [ref=e137]
          - textbox "Email address" [active] [ref=e139]
        - generic [ref=e140]:
          - img [ref=e142]
          - textbox "Password" [ref=e145]
          - button "Toggle password visibility" [ref=e147]:
            - img [ref=e148]
        - generic [ref=e151]:
          - generic [ref=e152] [cursor=pointer]:
            - checkbox "Remember me" [ref=e153]
            - text: Remember me
          - link "Forgot password?" [ref=e154] [cursor=pointer]:
            - /url: "#"
        - button "Log in" [ref=e155]
      - generic [ref=e158]: or
      - generic [ref=e160]:
        - button "Log in with Google" [ref=e161]:
          - img [ref=e162]
          - generic [ref=e167]: Log in with Google
        - button "Log in with Apple coming soon" [disabled] [ref=e168]:
          - img [ref=e169]
          - generic [ref=e171]: Log in with Apple
          - generic [ref=e172]: coming soon
      - generic [ref=e173]:
        - text: Don't have an account?
        - button "Sign up" [ref=e174]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser, seedWatchlist, clearAuth } from "./_helpers";
  3  | 
  4  | test.describe("Watchlist", () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setEnglish(page);
  7  |   });
  8  | 
  9  |   test("anonymous clicking 'Add to watchlist' on stock detail → opens login modal", async ({ page }) => {
  10 |     await clearAuth(page);
  11 |     await page.goto("/stock/ARMD");
  12 |     await page.getByRole("button", { name: /^Add to watchlist$/ }).click();
  13 |     await expect(page.getByRole("dialog")).toBeVisible();
  14 |     await expect(page.getByPlaceholder("Email address")).toBeVisible();
  15 |   });
  16 | 
  17 |   test("authed user toggles watchlist and persists across reload", async ({ page }) => {
  18 |     await seedLoggedInUser(page, "free");
  19 |     await page.goto("/stock/ARMD");
  20 |     await page.getByRole("button", { name: /^Add to watchlist$/ }).click();
  21 |     // Button label changes to "In watchlist"
  22 |     await expect(page.getByRole("button", { name: /^In watchlist$/ })).toBeVisible();
  23 |     const wl = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_watchlist") || "[]"));
  24 |     expect(wl).toContain("ARMD");
  25 | 
  26 |     await page.reload();
  27 |     await expect(page.getByRole("button", { name: /^In watchlist$/ })).toBeVisible();
  28 |   });
  29 | 
  30 |   test("/watchlist empty state shows search CTA", async ({ page }) => {
  31 |     await seedLoggedInUser(page, "free");
  32 |     await page.goto("/watchlist");
  33 |     await expect(page.getByRole("heading", { name: /Your watchlist is empty/ })).toBeVisible();
> 34 |     await page.getByRole("button", { name: /^Go to search$/ }).click();
     |                                                                ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  35 |     await expect(page.getByRole("dialog")).toBeVisible();
  36 |   });
  37 | 
  38 |   test("/watchlist with seeded tickers shows cards and sort tabs", async ({ page }) => {
  39 |     await seedLoggedInUser(page, "free");
  40 |     await seedWatchlist(page, ["ARMD", "NEXV", "HELX"]);
  41 |     await page.goto("/watchlist");
  42 |     await expect(page.locator("[href='/stock/ARMD']").first()).toBeVisible();
  43 |     await expect(page.locator("[href='/stock/NEXV']").first()).toBeVisible();
  44 |     await expect(page.locator("[href='/stock/HELX']").first()).toBeVisible();
  45 |     await expect(page.getByRole("button", { name: /^Recently added$/ })).toBeVisible();
  46 |     await expect(page.getByRole("button", { name: /^Highest quality$/ })).toBeVisible();
  47 |   });
  48 | 
  49 |   test("ISSUE: logout does NOT clear watchlist (data persists for next user)", async ({ page }) => {
  50 |     await seedLoggedInUser(page, "free");
  51 |     await seedWatchlist(page, ["ARMD"]);
  52 |     await page.goto("/dashboard");
  53 |     await page.getByRole("button", { name: /^My account$/ }).click();
  54 |     await page.getByRole("button", { name: /^Log out$/ }).click();
  55 |     const wl = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_watchlist") || "[]"));
  56 |     expect(wl).toEqual(["ARMD"]); // documents the bug
  57 |   });
  58 | });
  59 | 
```