# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: watchlist.spec.ts >> Watchlist >> ISSUE: logout does NOT clear watchlist (data persists for next user)
- Location: tests/e2e/watchlist.spec.ts:49:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^My account$/ })
    - locator resolved to <button type="button" aria-expanded="false" aria-label="My account" class="grid place-items-center w-9 h-9 rounded-full border border-[var(--border)] font-medium text-[13px] uppercase transition-colors">T</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div> from <div role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    14 × waiting for element to be visible, enabled and stable
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
        - generic [ref=e39]: Dashboard
        - heading "Welcome back, Test User" [level=1] [ref=e42]
        - paragraph [ref=e44]: Your snapshot of the market and your investing activity.
      - generic [ref=e47]:
        - generic [ref=e48]:
          - img [ref=e50]
          - generic [ref=e52]:
            - generic [ref=e53]: You're on the free plan
            - generic [ref=e54]: Unlock full access to 1,300+ stocks and all advanced analysis tools.
        - button "Upgrade now" [ref=e55]:
          - text: Upgrade now
          - img [ref=e56]
      - generic [ref=e61]:
        - generic [ref=e62]:
          - generic [ref=e63]: On your watchlist
          - generic [ref=e64]: "1"
        - generic [ref=e65]:
          - generic [ref=e66]: Avg. quality score
          - generic [ref=e67]: "92"
        - generic [ref=e68]:
          - generic [ref=e69]: Shariah compliant
          - generic [ref=e70]: "1"
        - generic [ref=e71]:
          - generic [ref=e72]: Sectors
          - generic [ref=e73]: "1"
      - generic [ref=e75]:
        - generic [ref=e77]:
          - heading "Your watchlist" [level=2] [ref=e79]
          - link "View all" [ref=e80] [cursor=pointer]:
            - /url: /watchlist
            - generic [ref=e81]: View all
            - img [ref=e82]
        - link "Toggle watchlist ARMD Armada Tech. AR $142.18 +2.34% Valuation Quality 92 Shariah" [ref=e86] [cursor=pointer]:
          - /url: /stock/ARMD
          - button "Toggle watchlist" [ref=e87]:
            - img [ref=e88]
          - generic [ref=e90]:
            - generic [ref=e91]:
              - generic [ref=e92]: ARMD
              - generic [ref=e93]: Armada Tech.
            - generic [ref=e94]: AR
          - generic [ref=e95]:
            - generic [ref=e96]: $142.18
            - generic [ref=e97]: +2.34%
          - generic [ref=e98]:
            - generic [ref=e99]: Valuation
            - generic [ref=e100]:
              - text: Quality
              - generic [ref=e101]: "92"
            - generic [ref=e102]:
              - text: Shariah
              - img [ref=e103]
      - generic [ref=e106]:
        - generic [ref=e108]:
          - heading "Recommended for you" [level=2] [ref=e109]
          - paragraph [ref=e110]: Based on your interests and our quality criteria
        - generic [ref=e111]:
          - link "Toggle watchlist NEXV NexVision Energy NE $89.42 +0.86% Valuation Quality 88 Shariah" [ref=e113] [cursor=pointer]:
            - /url: /stock/NEXV
            - button "Toggle watchlist" [ref=e114]:
              - img [ref=e115]
            - generic [ref=e117]:
              - generic [ref=e118]:
                - generic [ref=e119]: NEXV
                - generic [ref=e120]: NexVision Energy
              - generic [ref=e121]: NE
            - generic [ref=e122]:
              - generic [ref=e123]: $89.42
              - generic [ref=e124]: +0.86%
            - generic [ref=e125]:
              - generic [ref=e126]: Valuation
              - generic [ref=e127]:
                - text: Quality
                - generic [ref=e128]: "88"
              - generic [ref=e129]:
                - text: Shariah
                - img [ref=e130]
          - link "Toggle watchlist PRSM Prism Labs PR $156.40 +0.92% Valuation Quality 87 Shariah" [ref=e133] [cursor=pointer]:
            - /url: /stock/PRSM
            - button "Toggle watchlist" [ref=e134]:
              - img [ref=e135]
            - generic [ref=e137]:
              - generic [ref=e138]:
                - generic [ref=e139]: PRSM
                - generic [ref=e140]: Prism Labs
              - generic [ref=e141]: PR
            - generic [ref=e142]:
              - generic [ref=e143]: $156.40
              - generic [ref=e144]: +0.92%
            - generic [ref=e145]:
              - generic [ref=e146]: Valuation
              - generic [ref=e147]:
                - text: Quality
                - generic [ref=e148]: "87"
              - generic [ref=e149]:
                - text: Shariah
                - img [ref=e150]
          - link "Toggle watchlist HELX Helix Health HE $215.10 +1.18% Valuation Quality 85 Shariah" [ref=e153] [cursor=pointer]:
            - /url: /stock/HELX
            - button "Toggle watchlist" [ref=e154]:
              - img [ref=e155]
            - generic [ref=e157]:
              - generic [ref=e158]:
                - generic [ref=e159]: HELX
                - generic [ref=e160]: Helix Health
              - generic [ref=e161]: HE
            - generic [ref=e162]:
              - generic [ref=e163]: $215.10
              - generic [ref=e164]: +1.18%
            - generic [ref=e165]:
              - generic [ref=e166]: Valuation
              - generic [ref=e167]:
                - text: Quality
                - generic [ref=e168]: "85"
              - generic [ref=e169]:
                - text: Shariah
                - img [ref=e170]
          - link "Toggle watchlist ORBT Orbit Logistics OR $72.35 +1.04% Valuation Quality 84 Shariah" [ref=e173] [cursor=pointer]:
            - /url: /stock/ORBT
            - button "Toggle watchlist" [ref=e174]:
              - img [ref=e175]
            - generic [ref=e177]:
              - generic [ref=e178]:
                - generic [ref=e179]: ORBT
                - generic [ref=e180]: Orbit Logistics
              - generic [ref=e181]: OR
            - generic [ref=e182]:
              - generic [ref=e183]: $72.35
              - generic [ref=e184]: +1.04%
            - generic [ref=e185]:
              - generic [ref=e186]: Valuation
              - generic [ref=e187]:
                - text: Quality
                - generic [ref=e188]: "84"
              - generic [ref=e189]:
                - text: Shariah
                - img [ref=e190]
      - generic [ref=e193]:
        - generic [ref=e194]:
          - heading "Quick actions" [level=2] [ref=e195]
          - generic [ref=e196]:
            - button "Search stocks Browse 1,300+ stocks" [ref=e197]:
              - img [ref=e199]
              - generic [ref=e202]:
                - generic [ref=e203]: Search stocks
                - generic [ref=e204]: Browse 1,300+ stocks
              - img [ref=e205]
            - link "Analysis articles Read the latest analysis" [ref=e207] [cursor=pointer]:
              - /url: /#articles
              - img [ref=e209]
              - generic [ref=e212]:
                - generic [ref=e213]: Analysis articles
                - generic [ref=e214]: Read the latest analysis
              - img [ref=e215]
            - link "★ Upgrade to Premium Unlock all features" [ref=e217] [cursor=pointer]:
              - /url: /#pricing
              - generic [ref=e218]: ★
              - generic [ref=e219]:
                - generic [ref=e220]: Upgrade to Premium
                - generic [ref=e221]: Unlock all features
              - img [ref=e222]
        - generic [ref=e224]:
          - heading "Latest news" [level=2] [ref=e225]
          - generic [ref=e226]:
            - link "Platform update May 5, 2026 200 new stocks added to the Murakkab+ database" [ref=e227] [cursor=pointer]:
              - /url: /article/news-1
              - generic [ref=e228]:
                - generic [ref=e229]: Platform update
                - generic [ref=e230]: May 5, 2026
              - generic [ref=e231]: 200 new stocks added to the Murakkab+ database
            - link "Market analysis May 1, 2026 US market performance summary for April" [ref=e232] [cursor=pointer]:
              - /url: /article/news-2
              - generic [ref=e233]:
                - generic [ref=e234]: Market analysis
                - generic [ref=e235]: May 1, 2026
              - generic [ref=e236]: US market performance summary for April
            - link "Shariah standards Apr 22, 2026 AAOIFI Shariah compliance standards update" [ref=e237] [cursor=pointer]:
              - /url: /article/news-3
              - generic [ref=e238]:
                - generic [ref=e239]: Shariah standards
                - generic [ref=e240]: Apr 22, 2026
              - generic [ref=e241]: AAOIFI Shariah compliance standards update
  - contentinfo [ref=e242]:
    - generic [ref=e243]:
      - generic [ref=e244]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e245]
        - link "Subscribe now" [ref=e247] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e248]
      - generic [ref=e250]:
        - generic [ref=e251]:
          - generic [ref=e252]:
            - img [ref=e254]
            - generic [ref=e256]: Murakkab+
          - paragraph [ref=e257]: Shariah-aligned stock analysis platform
          - paragraph [ref=e258]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e259]:
          - generic [ref=e260]:
            - generic [ref=e261]: Explore
            - list [ref=e262]:
              - listitem [ref=e263]:
                - link "Why Murakkab" [ref=e264] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e265]:
                - link "Filters" [ref=e266] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e267]:
                - link "Features" [ref=e268] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e269]:
                - link "Pricing" [ref=e270] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e271]:
            - generic [ref=e272]: Company
            - list [ref=e273]:
              - listitem [ref=e274]:
                - link "About" [ref=e275] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e276]:
                - link "Contact" [ref=e277] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e278]:
            - generic [ref=e279]: Legal
            - list [ref=e280]:
              - listitem [ref=e281]:
                - link "Privacy" [ref=e282] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e283]:
                - link "Terms" [ref=e284] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e285]:
        - generic [ref=e286]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e287]:
          - link "Twitter" [ref=e288] [cursor=pointer]:
            - /url: "#"
            - img [ref=e289]
          - link "LinkedIn" [ref=e291] [cursor=pointer]:
            - /url: "#"
            - img [ref=e292]
  - button "Open Next.js Dev Tools" [ref=e299] [cursor=pointer]:
    - img [ref=e300]
  - alert [ref=e303]
  - dialog [ref=e304]:
    - generic [ref=e306]:
      - button "Close" [ref=e307]:
        - img [ref=e308]
      - img [ref=e312]
      - generic [ref=e314]:
        - heading "Log in" [level=2] [ref=e315]
        - paragraph [ref=e316]: Sign in to access your account and continue your analysis.
      - generic [ref=e317]:
        - generic [ref=e318]:
          - img [ref=e320]
          - textbox "Email address" [active] [ref=e322]
        - generic [ref=e323]:
          - img [ref=e325]
          - textbox "Password" [ref=e328]
          - button "Toggle password visibility" [ref=e330]:
            - img [ref=e331]
        - generic [ref=e334]:
          - generic [ref=e335] [cursor=pointer]:
            - checkbox "Remember me" [ref=e336]
            - text: Remember me
          - link "Forgot password?" [ref=e337] [cursor=pointer]:
            - /url: "#"
        - button "Log in" [ref=e338]
      - generic [ref=e341]: or
      - generic [ref=e343]:
        - button "Log in with Google" [ref=e344]:
          - img [ref=e345]
          - generic [ref=e350]: Log in with Google
        - button "Log in with Apple coming soon" [disabled] [ref=e351]:
          - img [ref=e352]
          - generic [ref=e354]: Log in with Apple
          - generic [ref=e355]: coming soon
      - generic [ref=e356]:
        - text: Don't have an account?
        - button "Sign up" [ref=e357]
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
  34 |     await page.getByRole("button", { name: /^Go to search$/ }).click();
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
> 53 |     await page.getByRole("button", { name: /^My account$/ }).click();
     |                                                              ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  54 |     await page.getByRole("button", { name: /^Log out$/ }).click();
  55 |     const wl = await page.evaluate(() => JSON.parse(window.localStorage.getItem("murakkab_watchlist") || "[]"));
  56 |     expect(wl).toEqual(["ARMD"]); // documents the bug
  57 |   });
  58 | });
  59 | 
```