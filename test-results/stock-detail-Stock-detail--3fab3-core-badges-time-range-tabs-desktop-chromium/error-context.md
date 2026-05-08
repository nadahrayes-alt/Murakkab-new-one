# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: stock-detail.spec.ts >> Stock detail >> renders header, score badges, time-range tabs
- Location: tests/e2e/stock-detail.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Armada Tech\./)
Expected: visible
Error: strict mode violation: getByText(/Armada Tech\./) resolved to 3 elements:
    1) <h1 class="font-display text-2xl sm:text-3xl tracking-tight truncate">Armada Tech.</h1> aka getByRole('heading', { name: 'Armada Tech.', exact: true })
    2) <h3 class="font-display text-lg leading-snug">Reading Armada Tech. latest quarter performance</h3> aka getByRole('link', { name: 'Stock analysis Reading Armada Tech. latest quarter performance Murakkab research 5 min', exact: true })
    3) <h3 class="font-display text-lg leading-snug">Reading Armada Tech. latest quarter performance</h3> aka getByRole('link', { name: 'Stock analysis Reading Armada Tech. latest quarter performance Murakkab research 8 min', exact: true })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText(/Armada Tech\./)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - button "Log in" [ref=e31]
        - button "Create account" [ref=e32]
  - main [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e36]:
        - link "Back" [ref=e37] [cursor=pointer]:
          - /url: /
          - img [ref=e38]
          - generic [ref=e40]: Back
        - generic [ref=e41]: Updated 1 min ago
      - generic [ref=e44]:
        - generic [ref=e46]:
          - generic [ref=e47]:
            - generic [ref=e48]: ARMD
            - generic [ref=e49]:
              - generic [ref=e50]:
                - heading "Armada Tech." [level=1] [ref=e51]
                - generic [ref=e52]: "NYSE: ARMD"
              - generic [ref=e53]: Technology
          - button "Add to watchlist" [ref=e54]:
            - img [ref=e55]
            - generic [ref=e57]: Add to watchlist
        - generic [ref=e59]:
          - generic [ref=e61]: Shariah compliant
          - generic [ref=e62]:
            - generic [ref=e63]: High quality
            - generic [ref=e64]: "92"
          - generic [ref=e65]:
            - generic [ref=e66]: Fairly valued
            - generic [ref=e67]: "78"
      - generic [ref=e69]:
        - generic [ref=e71]:
          - generic [ref=e72]:
            - generic [ref=e73]:
              - generic [ref=e74]: $142.18
              - generic [ref=e75]:
                - img [ref=e76]
                - text: +2.34%
            - generic [ref=e78]: USD · NYSE
          - generic [ref=e79]:
            - button "1D" [ref=e80]
            - button "1W" [ref=e81]
            - button "1M" [pressed] [ref=e82]
            - button "3M" [ref=e83]
            - button "1Y" [ref=e84]
            - button "5Y" [ref=e85]
            - button "All" [ref=e86]
        - generic [ref=e89]:
          - img [ref=e90]
          - generic:
            - generic: $152
            - generic: $140
            - generic: $128
        - generic [ref=e95]:
          - generic [ref=e96]:
            - generic [ref=e97]: Open
            - generic [ref=e98]: $141.04
          - generic [ref=e99]:
            - generic [ref=e100]: High
            - generic [ref=e101]: $144.17
          - generic [ref=e102]:
            - generic [ref=e103]: Low
            - generic [ref=e104]: $140.33
          - generic [ref=e105]:
            - generic [ref=e106]: Prev close
            - generic [ref=e107]: $139.91
      - generic [ref=e110]:
        - generic:
          - generic:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - generic: Analyst ratings
                  - generic: 29 analysts
                - generic:
                  - generic:
                    - img
                    - generic:
                      - generic:
                        - generic: Analyst consensus
                        - generic: Buy
                  - generic:
                    - generic:
                      - generic:
                        - generic: Buy
                        - generic: 18 · 62%
                    - generic:
                      - generic:
                        - generic: Hold
                        - generic: 8 · 28%
                    - generic:
                      - generic:
                        - generic: Sell
                        - generic: 3 · 10%
                - generic:
                  - generic:
                    - generic: Price target
                    - generic: $160.66
                  - generic:
                    - generic: Expected upside
                    - generic: +13.0%
            - generic:
              - generic:
                - generic:
                  - text: Next earnings
                  - generic: Jun 12, 2026
                  - generic: After market close
                  - generic:
                    - img
                    - generic: 14 days away
                  - generic:
                    - generic:
                      - generic: Estimated EPS
                      - generic: $1.84
                    - generic:
                      - generic: Actual EPS
                      - generic: —
        - generic [ref=e112]:
          - generic [ref=e113]:
            - img [ref=e114]
            - text: Premium feature
          - heading "Unlock the full analysis" [level=3] [ref=e117]
          - paragraph [ref=e118]: Get analyst ratings, earnings forecasts, and advanced metrics with Murakkab+ Premium.
          - generic [ref=e119]:
            - button "Upgrade now" [ref=e120]
            - link "See plans" [ref=e121] [cursor=pointer]:
              - /url: /#pricing
      - generic [ref=e123]:
        - heading "Key metrics" [level=2] [ref=e126]
        - generic [ref=e129]:
          - generic [ref=e130]:
            - generic [ref=e131]: Earnings per share (EPS)
            - generic [ref=e132]: $6.42
          - generic [ref=e133]:
            - generic [ref=e134]: P/E ratio
            - generic [ref=e135]: "18.4"
          - generic [ref=e136]:
            - generic [ref=e137]: Market cap
            - generic [ref=e138]: $48.2B
          - generic [ref=e139]:
            - generic [ref=e140]: Volume
            - generic [ref=e141]: 12.4M
          - generic [ref=e142]:
            - generic [ref=e143]: 52-week range
            - generic [ref=e144]: $98.40 — $156.20
          - generic [ref=e145]:
            - generic [ref=e146]: Debt / equity
            - generic [ref=e147]: "0.42"
          - generic [ref=e148]:
            - generic [ref=e149]: Annual revenue
            - generic [ref=e150]: $12.8B
          - generic [ref=e151]:
            - generic [ref=e152]: Gross margin
            - generic [ref=e153]: 38.6%
          - generic [ref=e154]:
            - generic [ref=e155]: Net margin
            - generic [ref=e156]: 16.2%
          - generic [ref=e157]:
            - generic [ref=e158]: Return on equity
            - generic [ref=e159]: 21.8%
          - generic [ref=e160]:
            - generic [ref=e161]: Dividend yield
            - generic [ref=e162]: 1.4%
          - generic [ref=e163]:
            - generic [ref=e164]: Beta
            - generic [ref=e165]: "1.12"
      - generic [ref=e167]:
        - generic [ref=e169]:
          - heading "Recent news & articles" [level=2] [ref=e170]
          - link "View all news" [ref=e171] [cursor=pointer]:
            - /url: /#news
            - generic [ref=e172]: View all news
            - img [ref=e173]
        - generic [ref=e175]:
          - link "Stock analysis Reading Armada Tech. latest quarter performance Murakkab research 5 min" [ref=e177] [cursor=pointer]:
            - /url: /article/armd-news-1
            - generic [ref=e178]:
              - img [ref=e179]
              - generic [ref=e181]: Stock analysis
            - generic [ref=e182]:
              - heading "Reading Armada Tech. latest quarter performance" [level=3] [ref=e183]
              - generic [ref=e184]:
                - generic [ref=e185]: Murakkab research
                - generic [ref=e186]: 5 min
          - link "Stock analysis Reading Armada Tech. latest quarter performance Murakkab research 8 min" [ref=e188] [cursor=pointer]:
            - /url: /article/armd-news-2
            - generic [ref=e189]:
              - img [ref=e190]
              - generic [ref=e192]: Stock analysis
            - generic [ref=e193]:
              - heading "Reading Armada Tech. latest quarter performance" [level=3] [ref=e194]
              - generic [ref=e195]:
                - generic [ref=e196]: Murakkab research
                - generic [ref=e197]: 8 min
      - generic [ref=e199]:
        - heading "Stocks in this sector" [level=2] [ref=e202]
        - generic [ref=e203]:
          - link "NEXV NexVision Energy Energy $89.42 +0.86%" [ref=e205] [cursor=pointer]:
            - /url: /stock/NEXV
            - generic [ref=e206]:
              - generic [ref=e207]: NEXV
              - generic [ref=e208]:
                - generic [ref=e209]: NexVision Energy
                - generic [ref=e210]: Energy
            - generic [ref=e211]:
              - generic [ref=e212]: $89.42
              - generic [ref=e213]: +0.86%
          - link "LUMN Lumen Industries Industrials $58.20 -0.41%" [ref=e215] [cursor=pointer]:
            - /url: /stock/LUMN
            - generic [ref=e216]:
              - generic [ref=e217]: LUMN
              - generic [ref=e218]:
                - generic [ref=e219]: Lumen Industries
                - generic [ref=e220]: Industrials
            - generic [ref=e221]:
              - generic [ref=e222]: $58.20
              - generic [ref=e223]: "-0.41%"
          - link "HELX Helix Health Healthcare $215.10 +1.18%" [ref=e225] [cursor=pointer]:
            - /url: /stock/HELX
            - generic [ref=e226]:
              - generic [ref=e227]: HELX
              - generic [ref=e228]:
                - generic [ref=e229]: Helix Health
                - generic [ref=e230]: Healthcare
            - generic [ref=e231]:
              - generic [ref=e232]: $215.10
              - generic [ref=e233]: +1.18%
          - link "ATLS Atlas Foods Consumer $36.95 +0.62%" [ref=e235] [cursor=pointer]:
            - /url: /stock/ATLS
            - generic [ref=e236]:
              - generic [ref=e237]: ATLS
              - generic [ref=e238]:
                - generic [ref=e239]: Atlas Foods
                - generic [ref=e240]: Consumer
            - generic [ref=e241]:
              - generic [ref=e242]: $36.95
              - generic [ref=e243]: +0.62%
  - contentinfo [ref=e244]:
    - generic [ref=e245]:
      - generic [ref=e246]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e247]
        - link "Subscribe now" [ref=e249] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e250]
      - generic [ref=e252]:
        - generic [ref=e253]:
          - generic [ref=e254]:
            - img [ref=e256]
            - generic [ref=e258]: Murakkab+
          - paragraph [ref=e259]: Shariah-aligned stock analysis platform
          - paragraph [ref=e260]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e261]:
          - generic [ref=e262]:
            - generic [ref=e263]: Explore
            - list [ref=e264]:
              - listitem [ref=e265]:
                - link "Why Murakkab" [ref=e266] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e267]:
                - link "Filters" [ref=e268] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e269]:
                - link "Features" [ref=e270] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e271]:
                - link "Pricing" [ref=e272] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e273]:
            - generic [ref=e274]: Company
            - list [ref=e275]:
              - listitem [ref=e276]:
                - link "About" [ref=e277] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e278]:
                - link "Contact" [ref=e279] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e280]:
            - generic [ref=e281]: Legal
            - list [ref=e282]:
              - listitem [ref=e283]:
                - link "Privacy" [ref=e284] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e285]:
                - link "Terms" [ref=e286] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e287]:
        - generic [ref=e288]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e289]:
          - link "Twitter" [ref=e290] [cursor=pointer]:
            - /url: "#"
            - img [ref=e291]
          - link "LinkedIn" [ref=e293] [cursor=pointer]:
            - /url: "#"
            - img [ref=e294]
  - button "Open Next.js Dev Tools" [ref=e301] [cursor=pointer]:
    - img [ref=e302]
  - alert [ref=e305]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";
  3  | 
  4  | test.describe("Stock detail", () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setEnglish(page);
  7  |   });
  8  | 
  9  |   test("renders header, score badges, time-range tabs", async ({ page }) => {
  10 |     await clearAuth(page);
  11 |     await page.goto("/stock/ARMD");
> 12 |     await expect(page.getByText(/Armada Tech\./)).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  13 |     await expect(page.getByText(/^Shariah compliant$/).first()).toBeVisible();
  14 |     for (const r of ["1D", "1W", "1M", "3M", "1Y", "5Y"]) {
  15 |       await expect(page.getByRole("button", { name: new RegExp(`^${r}$`) })).toBeVisible();
  16 |     }
  17 |   });
  18 | 
  19 |   test("clicking a time range updates aria-pressed", async ({ page }) => {
  20 |     await page.goto("/stock/ARMD");
  21 |     await page.getByRole("button", { name: /^3M$/ }).click();
  22 |     await expect(page.getByRole("button", { name: /^3M$/ })).toHaveAttribute("aria-pressed", "true");
  23 |   });
  24 | 
  25 |   test("free user sees premium gate over Analyst Ratings + Earnings", async ({ page }) => {
  26 |     await seedLoggedInUser(page, "free");
  27 |     await page.goto("/stock/ARMD");
  28 |     await expect(page.getByText(/^Premium feature$/i).first()).toBeVisible();
  29 |     await expect(page.getByRole("button", { name: /^Upgrade now$/ }).first()).toBeVisible();
  30 |   });
  31 | 
  32 |   test("premium user sees Buy/Hold/Sell, Price target, Expected upside", async ({ page }) => {
  33 |     await seedLoggedInUser(page, "premium");
  34 |     await page.goto("/stock/ARMD");
  35 |     await expect(page.getByText(/^Buy$/).first()).toBeVisible();
  36 |     await expect(page.getByText("Price target")).toBeVisible();
  37 |     await expect(page.getByText("Expected upside")).toBeVisible();
  38 |   });
  39 | 
  40 |   test("unknown ticker shows 'Sample Co.' fallback rather than 404", async ({ page }) => {
  41 |     const resp = await page.goto("/stock/ZZZZZZ");
  42 |     expect(resp?.status()).toBe(200);
  43 |     await expect(page.getByText(/Sample Co\./)).toBeVisible();
  44 |   });
  45 | 
  46 |   test("similar stocks links navigate", async ({ page }) => {
  47 |     await page.goto("/stock/ARMD");
  48 |     const link = page.locator("[href='/stock/NEXV']").first();
  49 |     await expect(link).toBeVisible();
  50 |     await link.click();
  51 |     await expect(page).toHaveURL(/\/stock\/NEXV$/);
  52 |   });
  53 | 
  54 |   test("Back link returns to /", async ({ page }) => {
  55 |     await page.goto("/stock/ARMD");
  56 |     await page.getByRole("link", { name: /^Back$/ }).click();
  57 |     await expect(page).toHaveURL(/\/$/);
  58 |   });
  59 | });
  60 | 
```