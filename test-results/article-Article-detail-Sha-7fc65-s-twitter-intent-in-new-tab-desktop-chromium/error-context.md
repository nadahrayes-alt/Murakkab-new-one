# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: article.spec.ts >> Article detail >> Share to X opens twitter intent in new tab
- Location: tests/e2e/article.spec.ts:38:7

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /twitter\.com\/intent\/tweet/
Received string:  "https://x.com/intent/tweet?text=Sample%20stock%20analysis%20%E2%80%94%20solid%20growth%20and%20strong%20fundamentals&url=http%3A%2F%2Flocalhost%3A3047%2Farticle%2Fshare-test"
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
        - button "Log in" [ref=e31]
        - button "Create account" [ref=e32]
  - main [ref=e33]:
    - article [ref=e34]:
      - generic [ref=e36]:
        - link "Back" [ref=e37] [cursor=pointer]:
          - /url: /#news
          - img [ref=e38]
          - generic [ref=e40]: Back
        - button "Copy link" [ref=e42]:
          - img [ref=e43]
          - generic [ref=e45]: Copy link
      - generic [ref=e47]:
        - generic [ref=e49]:
          - generic [ref=e50]: Stock analysis
          - generic [ref=e51]: ·
          - generic [ref=e52]: Published May 5, 2026
          - generic [ref=e53]: ·
          - generic [ref=e54]: 8 min read
        - heading "Sample stock analysis — solid growth and strong fundamentals" [level=1] [ref=e56]
        - paragraph [ref=e58]: A concise read on the company's performance across quality, fair value and Shariah compliance criteria.
        - generic [ref=e60]:
          - generic [ref=e61]: M
          - generic [ref=e62]:
            - generic [ref=e63]: Murakkab research team
            - generic [ref=e64]: murakkab.com/article/share-test
      - generic [ref=e66]:
        - generic [ref=e67]:
          - generic [ref=e69]:
            - generic [ref=e70]:
              - generic [ref=e72]: Section 01
              - heading "📌 Executive summary" [level=2] [ref=e74]
              - paragraph [ref=e75]: This is a placeholder section representing the company's summary. It walks through overall performance across the latest financial period and highlights the key strengths and weaknesses identified by our research team.
              - list [ref=e76]:
                - listitem [ref=e77]:
                  - generic [ref=e79]: "Revenue growth: strong YoY trajectory across the last four quarters."
                - listitem [ref=e80]:
                  - generic [ref=e82]: "Gross margin: in line with the sector average."
                - listitem [ref=e83]:
                  - generic [ref=e85]: "Free cash flow: positive and growing."
                - listitem [ref=e86]:
                  - generic [ref=e88]: "Liquidity: healthy coverage of short-term debt."
            - generic [ref=e89]:
              - generic [ref=e91]: Section 02
              - heading "📈 Revenue growth and operating performance" [level=2] [ref=e93]
              - paragraph [ref=e94]: This section covers revenue growth and the performance of the main operating lines. Replace the text via your CMS later.
              - generic [ref=e95]:
                - generic [ref=e96]:
                  - generic [ref=e97]:
                    - img [ref=e98]
                    - text: Chart placeholder
                  - generic [ref=e100]: 12M
                - img [ref=e102]
              - list [ref=e105]:
                - listitem [ref=e106]:
                  - generic [ref=e108]: "Latest quarter revenue: notable growth vs. the same period last year."
                - listitem [ref=e109]:
                  - generic [ref=e111]: "Operating margin: slight improvement from cost control."
                - listitem [ref=e112]:
                  - generic [ref=e114]: "EBITDA: within the market's expected range."
              - complementary [ref=e115]:
                - generic [ref=e116]:
                  - generic [ref=e117]:
                    - generic [ref=e118]: 🧠
                    - generic [ref=e119]: Murakkab view
                  - paragraph [ref=e120]: Sustained revenue growth is positive, but the market is waiting for proof that operating margins hold. Any weakness next quarter could pressure the valuation.
            - generic [ref=e121]:
              - generic [ref=e123]: Section 03
              - heading "💵 Profit margins" [level=2] [ref=e125]
              - paragraph [ref=e126]: Some margins are pressured by labor costs and rising raw-input prices. The team expects gradual improvement in the second half.
              - list [ref=e127]:
                - listitem [ref=e128]:
                  - generic [ref=e130]: "Gross margin: ~32%, two points below sector average."
                - listitem [ref=e131]:
                  - generic [ref=e133]: "Net margin: ~12%, stable for three quarters."
                - listitem [ref=e134]:
                  - generic [ref=e136]: "ROE: ~18%, reflecting efficient capital deployment."
          - generic [ref=e138]:
            - generic [ref=e140]:
              - img [ref=e142]
              - heading "Continue reading with Murakkab+" [level=3] [ref=e145]
              - paragraph [ref=e146]: The rest of this article — full valuation, deep financial breakdown, and our team's verdict — is available to Premium subscribers.
              - button "Upgrade now" [ref=e147]:
                - text: Upgrade now
                - img [ref=e148]
            - paragraph [ref=e150]: This article is part of your monthly free quota (5 articles).
          - generic [ref=e151]:
            - generic [ref=e152]: Share article
            - generic [ref=e153]:
              - button "Share on X" [active] [ref=e154]:
                - img [ref=e155]
                - generic [ref=e157]: Share on X
              - button "Share on LinkedIn" [ref=e158]:
                - img [ref=e159]
                - generic [ref=e161]: Share on LinkedIn
              - button "Copy link" [ref=e162]:
                - img [ref=e163]
                - generic [ref=e165]: Copy link
        - complementary [ref=e166]:
          - generic [ref=e167]:
            - generic [ref=e168]:
              - generic [ref=e169]:
                - generic [ref=e171]:
                  - generic [ref=e172]: ARMD
                  - generic [ref=e173]:
                    - generic [ref=e174]: Armada Tech.
                    - generic [ref=e175]: NYSE · Technology
                - generic [ref=e176]:
                  - generic [ref=e177]:
                    - generic [ref=e178]: $142.18
                    - generic [ref=e179]: +2.34%
                  - generic [ref=e180]:
                    - img [ref=e181]
                    - text: Shariah ✓
              - generic [ref=e183]:
                - generic [ref=e184]: Stock summary
                - generic [ref=e185]:
                  - generic [ref=e186]:
                    - generic [ref=e187]: Quality
                    - generic [ref=e188]: "92"
                  - generic [ref=e189]:
                    - generic [ref=e190]: Value
                    - generic [ref=e191]: "78"
                  - generic [ref=e192]:
                    - generic [ref=e193]: Revenue growth
                    - generic [ref=e194]: +14.2%
                  - generic [ref=e195]:
                    - generic [ref=e196]: P/E
                    - generic [ref=e197]: "18.4"
                - img [ref=e199]
                - button "View full analysis" [ref=e202]:
                  - text: View full analysis
                  - img [ref=e203]
            - generic [ref=e205]:
              - generic [ref=e206]: Table of contents
              - list [ref=e207]:
                - listitem [ref=e208]:
                  - link "01 📌 Executive summary" [ref=e209] [cursor=pointer]:
                    - /url: "#section-0"
                    - generic [ref=e210]: "01"
                    - generic [ref=e211]: 📌 Executive summary
                - listitem [ref=e212]:
                  - link "02 📈 Revenue growth and operating performance" [ref=e213] [cursor=pointer]:
                    - /url: "#section-1"
                    - generic [ref=e214]: "02"
                    - generic [ref=e215]: 📈 Revenue growth and operating performance
                - listitem [ref=e216]:
                  - link "03 💵 Profit margins" [ref=e217] [cursor=pointer]:
                    - /url: "#section-2"
                    - generic [ref=e218]: "03"
                    - generic [ref=e219]: 💵 Profit margins
                - listitem [ref=e220]:
                  - link "04 ⚖️ Fair valuation" [ref=e221] [cursor=pointer]:
                    - /url: "#section-3"
                    - generic [ref=e222]: "04"
                    - generic [ref=e223]: ⚖️ Fair valuation
                - listitem [ref=e224]:
                  - link "05 ✅ Shariah compliance" [ref=e225] [cursor=pointer]:
                    - /url: "#section-4"
                    - generic [ref=e226]: "05"
                    - generic [ref=e227]: ✅ Shariah compliance
                - listitem [ref=e228]:
                  - link "06 🧭 Conclusion" [ref=e229] [cursor=pointer]:
                    - /url: "#section-5"
                    - generic [ref=e230]: "06"
                    - generic [ref=e231]: 🧭 Conclusion
      - generic [ref=e233]:
        - generic [ref=e234]:
          - heading "Related articles" [level=2] [ref=e235]
          - link "Read more" [ref=e236] [cursor=pointer]:
            - /url: /#articles
            - generic [ref=e237]: Read more
            - img [ref=e238]
        - generic [ref=e240]:
          - link "Fundamentals How to evaluate a stock before investing 6 min read" [ref=e241] [cursor=pointer]:
            - /url: /article/share-test-related-0
            - generic [ref=e242]:
              - img [ref=e243]
              - generic [ref=e245]: Fundamentals
            - generic [ref=e246]:
              - heading "How to evaluate a stock before investing" [level=3] [ref=e247]
              - generic [ref=e248]:
                - img [ref=e249]
                - text: 6 min read
          - link "Valuation Book value vs. market value explained 5 min read" [ref=e252] [cursor=pointer]:
            - /url: /article/share-test-related-1
            - generic [ref=e253]:
              - img [ref=e254]
              - generic [ref=e256]: Valuation
            - generic [ref=e257]:
              - heading "Book value vs. market value explained" [level=3] [ref=e258]
              - generic [ref=e259]:
                - img [ref=e260]
                - text: 5 min read
          - link "Indicators 5 financial indicators every investor should know 10 min read" [ref=e263] [cursor=pointer]:
            - /url: /article/share-test-related-2
            - generic [ref=e264]:
              - img [ref=e265]
              - generic [ref=e267]: Indicators
            - generic [ref=e268]:
              - heading "5 financial indicators every investor should know" [level=3] [ref=e269]
              - generic [ref=e270]:
                - img [ref=e271]
                - text: 10 min read
          - link "Technology The role of AI in stock analysis 7 min read" [ref=e274] [cursor=pointer]:
            - /url: /article/share-test-related-3
            - generic [ref=e275]:
              - img [ref=e276]
              - generic [ref=e278]: Technology
            - generic [ref=e279]:
              - heading "The role of AI in stock analysis" [level=3] [ref=e280]
              - generic [ref=e281]:
                - img [ref=e282]
                - text: 7 min read
      - generic [ref=e288]:
        - generic [ref=e289]: Newsletter
        - heading "Subscribe to the Murakkab newsletter" [level=3] [ref=e291]
        - paragraph [ref=e292]: Get our latest analysis and articles in your inbox weekly.
        - generic [ref=e293]:
          - generic [ref=e294]:
            - img [ref=e295]
            - textbox "Enter your email" [ref=e297]
          - button "Subscribe" [ref=e298]
        - paragraph [ref=e299]: No spam. Unsubscribe anytime.
  - contentinfo [ref=e300]:
    - generic [ref=e301]:
      - generic [ref=e302]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e303]
        - link "Subscribe now" [ref=e305] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e306]
      - generic [ref=e308]:
        - generic [ref=e309]:
          - generic [ref=e310]:
            - img [ref=e312]
            - generic [ref=e314]: Murakkab+
          - paragraph [ref=e315]: Shariah-aligned stock analysis platform
          - paragraph [ref=e316]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e317]:
          - generic [ref=e318]:
            - generic [ref=e319]: Explore
            - list [ref=e320]:
              - listitem [ref=e321]:
                - link "Why Murakkab" [ref=e322] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e323]:
                - link "Filters" [ref=e324] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e325]:
                - link "Features" [ref=e326] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e327]:
                - link "Pricing" [ref=e328] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e329]:
            - generic [ref=e330]: Company
            - list [ref=e331]:
              - listitem [ref=e332]:
                - link "About" [ref=e333] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e334]:
                - link "Contact" [ref=e335] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e336]:
            - generic [ref=e337]: Legal
            - list [ref=e338]:
              - listitem [ref=e339]:
                - link "Privacy" [ref=e340] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e341]:
                - link "Terms" [ref=e342] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e343]:
        - generic [ref=e344]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e345]:
          - link "Twitter" [ref=e346] [cursor=pointer]:
            - /url: "#"
            - img [ref=e347]
          - link "LinkedIn" [ref=e349] [cursor=pointer]:
            - /url: "#"
            - img [ref=e350]
  - button "Open Next.js Dev Tools" [ref=e357] [cursor=pointer]:
    - img [ref=e358]
  - alert [ref=e361]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";
  3  | 
  4  | test.describe("Article detail", () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setEnglish(page);
  7  |   });
  8  | 
  9  |   test("free user sees only first 3 sections + paywall", async ({ page }) => {
  10 |     await clearAuth(page);
  11 |     await page.goto("/article/test-slug");
  12 |     // Section labels: "Section 01" through "Section 06" (placeholder has 6)
  13 |     await expect(page.getByText(/Section\s+01/).first()).toBeVisible();
  14 |     await expect(page.getByText(/Section\s+03/).first()).toBeVisible();
  15 |     // 04+ should not render for free users
  16 |     await expect(page.getByText(/Section\s+04/)).toHaveCount(0);
  17 |     // Paywall card title: "Continue reading with Murakkab+"
  18 |     await expect(page.getByRole("heading", { name: /Continue reading/ })).toBeVisible();
  19 |     await expect(page.getByRole("button", { name: /^Upgrade now$/ }).first()).toBeVisible();
  20 |   });
  21 | 
  22 |   test("premium user sees all sections, no paywall", async ({ page }) => {
  23 |     await seedLoggedInUser(page, "premium");
  24 |     await page.goto("/article/test-slug");
  25 |     await expect(page.getByText(/Section\s+06/).first()).toBeVisible();
  26 |     await expect(page.getByRole("heading", { name: /Continue reading/ })).toHaveCount(0);
  27 |   });
  28 | 
  29 |   test("Copy link button writes URL to clipboard", async ({ page, context }) => {
  30 |     await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  31 |     await page.goto("/article/clip-test");
  32 |     await page.getByRole("button", { name: /^Copy link$/ }).first().click();
  33 |     await expect(page.getByRole("button", { name: /^Copied$/ }).first()).toBeVisible();
  34 |     const cb = await page.evaluate(() => navigator.clipboard.readText());
  35 |     expect(cb).toContain("/article/clip-test");
  36 |   });
  37 | 
  38 |   test("Share to X opens twitter intent in new tab", async ({ page, context }) => {
  39 |     await page.goto("/article/share-test");
  40 |     const popupPromise = context.waitForEvent("page");
  41 |     await page.getByRole("button", { name: /^Share on X$/ }).first().click();
  42 |     const popup = await popupPromise;
  43 |     await popup.waitForLoadState("domcontentloaded", { timeout: 10_000 }).catch(() => {});
> 44 |     expect(popup.url()).toMatch(/twitter\.com\/intent\/tweet/);
     |                         ^ Error: expect(received).toMatch(expected)
  45 |     await popup.close();
  46 |   });
  47 | 
  48 |   test("Newsletter submit shows 'Subscribed' state and clears input", async ({ page }) => {
  49 |     await page.goto("/article/news-1");
  50 |     const email = page.getByPlaceholder(/Enter your email/);
  51 |     const submit = page.getByRole("button", { name: /^Subscribe$/ });
  52 |     // Empty submit — required attr blocks
  53 |     await submit.click();
  54 |     await expect(page.getByRole("button", { name: /^Subscribed$/ })).toHaveCount(0);
  55 |     // Real submit
  56 |     await email.fill("reader@example.com");
  57 |     await submit.click();
  58 |     await expect(page.getByRole("button", { name: /^Subscribed$/ })).toBeVisible();
  59 |   });
  60 | 
  61 |   test("BUG: Sidebar 'View full analysis' button has no handler", async ({ page }) => {
  62 |     await page.goto("/article/sidebar-test");
  63 |     const btn = page.getByRole("button", { name: /^View full analysis$/ });
  64 |     await expect(btn).toBeVisible();
  65 |     const before = page.url();
  66 |     await btn.click();
  67 |     expect(page.url()).toBe(before);
  68 |   });
  69 | });
  70 | 
```