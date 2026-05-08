# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard — premium user >> BUG: 'All earnings' link is href='#'
- Location: tests/e2e/dashboard.spec.ts:66:7

# Error details

```
Error: All earnings link href

expect(received).not.toBe(expected) // Object.is equality

Expected: not "#"
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
        - button "My account" [ref=e32]: P
  - main [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e38]:
          - generic [ref=e39]: Dashboard
          - generic [ref=e41]:
            - img [ref=e42]
            - text: Pro
        - heading "Welcome back, Pro Person" [level=1] [ref=e45]
        - paragraph [ref=e47]: All your tools are ready 🎯
      - generic [ref=e52]:
        - generic [ref=e53]:
          - generic [ref=e54]:
            - generic [ref=e55]: AI
            - generic [ref=e56]:
              - generic [ref=e57]: Today's AI brief
              - generic [ref=e58]: Just generated
          - heading "Smart summary for your market" [level=3] [ref=e60]
          - button "Deeper analysis" [ref=e61]:
            - text: Deeper analysis
            - img [ref=e62]
        - list [ref=e64]:
          - listitem [ref=e65]:
            - img [ref=e67]
            - generic [ref=e69]: US market opens the week on tech sector with 1.4% expected growth
          - listitem [ref=e70]:
            - img [ref=e72]
            - generic [ref=e74]: Energy sector divergent — slight pullback expected next quarter
          - listitem [ref=e75]:
            - img [ref=e77]
            - generic [ref=e79]: 3 stocks in your watchlist report earnings within 2 weeks
          - listitem [ref=e80]:
            - img [ref=e82]
            - generic [ref=e84]: "Your watchlist Shariah compliance: 87% — above market average"
      - generic [ref=e88]:
        - generic [ref=e89]:
          - generic [ref=e90]: On your watchlist
          - generic [ref=e91]: "2"
        - generic [ref=e92]:
          - generic [ref=e93]: Avg. quality score
          - generic [ref=e94]: "90"
        - generic [ref=e95]:
          - generic [ref=e96]: Shariah compliant
          - generic [ref=e97]: "2"
        - generic [ref=e98]:
          - generic [ref=e99]: Sectors
          - generic [ref=e100]: "2"
      - generic [ref=e102]:
        - generic [ref=e104]:
          - heading "Your watchlist" [level=2] [ref=e106]
          - link "View all" [ref=e107] [cursor=pointer]:
            - /url: /watchlist
            - generic [ref=e108]: View all
            - img [ref=e109]
        - generic [ref=e111]:
          - link "Toggle watchlist ARMD Armada Tech. AR $142.18 +2.34% Valuation Quality 92 Shariah" [ref=e113] [cursor=pointer]:
            - /url: /stock/ARMD
            - button "Toggle watchlist" [ref=e114]:
              - img [ref=e115]
            - generic [ref=e117]:
              - generic [ref=e118]:
                - generic [ref=e119]: ARMD
                - generic [ref=e120]: Armada Tech.
              - generic [ref=e121]: AR
            - generic [ref=e122]:
              - generic [ref=e123]: $142.18
              - generic [ref=e124]: +2.34%
            - generic [ref=e125]:
              - generic [ref=e126]: Valuation
              - generic [ref=e127]:
                - text: Quality
                - generic [ref=e128]: "92"
              - generic [ref=e129]:
                - text: Shariah
                - img [ref=e130]
          - link "Toggle watchlist NEXV NexVision Energy NE $89.42 +0.86% Valuation Quality 88 Shariah" [ref=e133] [cursor=pointer]:
            - /url: /stock/NEXV
            - button "Toggle watchlist" [ref=e134]:
              - img [ref=e135]
            - generic [ref=e137]:
              - generic [ref=e138]:
                - generic [ref=e139]: NEXV
                - generic [ref=e140]: NexVision Energy
              - generic [ref=e141]: NE
            - generic [ref=e142]:
              - generic [ref=e143]: $89.42
              - generic [ref=e144]: +0.86%
            - generic [ref=e145]:
              - generic [ref=e146]: Valuation
              - generic [ref=e147]:
                - text: Quality
                - generic [ref=e148]: "88"
              - generic [ref=e149]:
                - text: Shariah
                - img [ref=e150]
      - generic [ref=e153]:
        - generic [ref=e155]:
          - generic [ref=e156]:
            - generic [ref=e157]:
              - heading "Upcoming earnings" [level=3] [ref=e158]
              - paragraph [ref=e159]: Earnings reports for stocks you watch this week.
            - link "All earnings" [ref=e160] [cursor=pointer]:
              - /url: "#"
          - list [ref=e161]:
            - listitem [ref=e162]:
              - 'link "ARMD Armada Tech. EPS estimate: $1.84 in 3 days" [ref=e163] [cursor=pointer]':
                - /url: /stock/ARMD
                - generic [ref=e164]: ARMD
                - generic [ref=e165]:
                  - generic [ref=e166]: Armada Tech.
                  - generic [ref=e167]: "EPS estimate: $1.84"
                - generic [ref=e168]: in 3 days
            - listitem [ref=e169]:
              - 'link "NEXV NexVision Energy EPS estimate: $0.62 in 7 days" [ref=e170] [cursor=pointer]':
                - /url: /stock/NEXV
                - generic [ref=e171]: NEXV
                - generic [ref=e172]:
                  - generic [ref=e173]: NexVision Energy
                  - generic [ref=e174]: "EPS estimate: $0.62"
                - generic [ref=e175]: in 7 days
            - listitem [ref=e176]:
              - 'link "HELX Helix Health EPS estimate: $2.10 in 12 days" [ref=e177] [cursor=pointer]':
                - /url: /stock/HELX
                - generic [ref=e178]: HELX
                - generic [ref=e179]:
                  - generic [ref=e180]: Helix Health
                  - generic [ref=e181]: "EPS estimate: $2.10"
                - generic [ref=e182]: in 12 days
            - listitem [ref=e183]:
              - 'link "LUMN Lumen Industries EPS estimate: $0.95 in 18 days" [ref=e184] [cursor=pointer]':
                - /url: /stock/LUMN
                - generic [ref=e185]: LUMN
                - generic [ref=e186]:
                  - generic [ref=e187]: Lumen Industries
                  - generic [ref=e188]: "EPS estimate: $0.95"
                - generic [ref=e189]: in 18 days
        - generic [ref=e191]:
          - generic [ref=e192]:
            - heading "Top movers" [level=3] [ref=e193]
            - paragraph [ref=e194]: Today's US market.
          - generic [ref=e195]:
            - generic [ref=e196]:
              - generic [ref=e197]: Top gainers
              - list [ref=e198]:
                - listitem [ref=e199]:
                  - link "ARMD Armada Tech. +2.34%" [ref=e200] [cursor=pointer]:
                    - /url: /stock/ARMD
                    - generic [ref=e201]: ARMD
                    - generic [ref=e202]: Armada Tech.
                    - generic [ref=e203]: +2.34%
                - listitem [ref=e204]:
                  - link "VEGA Vega Pharma +1.45%" [ref=e205] [cursor=pointer]:
                    - /url: /stock/VEGA
                    - generic [ref=e206]: VEGA
                    - generic [ref=e207]: Vega Pharma
                    - generic [ref=e208]: +1.45%
                - listitem [ref=e209]:
                  - link "HELX Helix Health +1.18%" [ref=e210] [cursor=pointer]:
                    - /url: /stock/HELX
                    - generic [ref=e211]: HELX
                    - generic [ref=e212]: Helix Health
                    - generic [ref=e213]: +1.18%
            - generic [ref=e214]:
              - generic [ref=e215]: Top losers
              - list [ref=e216]:
                - listitem [ref=e217]:
                  - link "LUMN Lumen Industries -0.41%" [ref=e218] [cursor=pointer]:
                    - /url: /stock/LUMN
                    - generic [ref=e219]: LUMN
                    - generic [ref=e220]: Lumen Industries
                    - generic [ref=e221]: "-0.41%"
                - listitem [ref=e222]:
                  - link "BCON Beacon Insurance -0.22%" [ref=e223] [cursor=pointer]:
                    - /url: /stock/BCON
                    - generic [ref=e224]: BCON
                    - generic [ref=e225]: Beacon Insurance
                    - generic [ref=e226]: "-0.22%"
                - listitem [ref=e227]:
                  - link "KORE Kore Materials -0.18%" [ref=e228] [cursor=pointer]:
                    - /url: /stock/KORE
                    - generic [ref=e229]: KORE
                    - generic [ref=e230]: Kore Materials
                    - generic [ref=e231]: "-0.18%"
            - generic [ref=e232]:
              - generic [ref=e233]: Most active
              - list [ref=e234]:
                - listitem [ref=e235]:
                  - link "ARMD Armada Tech. +2.34%" [ref=e236] [cursor=pointer]:
                    - /url: /stock/ARMD
                    - generic [ref=e237]: ARMD
                    - generic [ref=e238]: Armada Tech.
                    - generic [ref=e239]: +2.34%
                - listitem [ref=e240]:
                  - link "NEXV NexVision Energy +0.86%" [ref=e241] [cursor=pointer]:
                    - /url: /stock/NEXV
                    - generic [ref=e242]: NEXV
                    - generic [ref=e243]: NexVision Energy
                    - generic [ref=e244]: +0.86%
                - listitem [ref=e245]:
                  - link "PRSM Prism Labs +0.92%" [ref=e246] [cursor=pointer]:
                    - /url: /stock/PRSM
                    - generic [ref=e247]: PRSM
                    - generic [ref=e248]: Prism Labs
                    - generic [ref=e249]: +0.92%
      - generic [ref=e251]:
        - generic [ref=e253]:
          - heading "Recommended for you" [level=2] [ref=e254]
          - paragraph [ref=e255]: Based on your interests and our quality criteria
        - generic [ref=e256]:
          - link "Toggle watchlist PRSM Prism Labs PR $156.40 +0.92% Valuation Quality 87 Shariah" [ref=e258] [cursor=pointer]:
            - /url: /stock/PRSM
            - button "Toggle watchlist" [ref=e259]:
              - img [ref=e260]
            - generic [ref=e262]:
              - generic [ref=e263]:
                - generic [ref=e264]: PRSM
                - generic [ref=e265]: Prism Labs
              - generic [ref=e266]: PR
            - generic [ref=e267]:
              - generic [ref=e268]: $156.40
              - generic [ref=e269]: +0.92%
            - generic [ref=e270]:
              - generic [ref=e271]: Valuation
              - generic [ref=e272]:
                - text: Quality
                - generic [ref=e273]: "87"
              - generic [ref=e274]:
                - text: Shariah
                - img [ref=e275]
          - link "Toggle watchlist HELX Helix Health HE $215.10 +1.18% Valuation Quality 85 Shariah" [ref=e278] [cursor=pointer]:
            - /url: /stock/HELX
            - button "Toggle watchlist" [ref=e279]:
              - img [ref=e280]
            - generic [ref=e282]:
              - generic [ref=e283]:
                - generic [ref=e284]: HELX
                - generic [ref=e285]: Helix Health
              - generic [ref=e286]: HE
            - generic [ref=e287]:
              - generic [ref=e288]: $215.10
              - generic [ref=e289]: +1.18%
            - generic [ref=e290]:
              - generic [ref=e291]: Valuation
              - generic [ref=e292]:
                - text: Quality
                - generic [ref=e293]: "85"
              - generic [ref=e294]:
                - text: Shariah
                - img [ref=e295]
          - link "Toggle watchlist ORBT Orbit Logistics OR $72.35 +1.04% Valuation Quality 84 Shariah" [ref=e298] [cursor=pointer]:
            - /url: /stock/ORBT
            - button "Toggle watchlist" [ref=e299]:
              - img [ref=e300]
            - generic [ref=e302]:
              - generic [ref=e303]:
                - generic [ref=e304]: ORBT
                - generic [ref=e305]: Orbit Logistics
              - generic [ref=e306]: OR
            - generic [ref=e307]:
              - generic [ref=e308]: $72.35
              - generic [ref=e309]: +1.04%
            - generic [ref=e310]:
              - generic [ref=e311]: Valuation
              - generic [ref=e312]:
                - text: Quality
                - generic [ref=e313]: "84"
              - generic [ref=e314]:
                - text: Shariah
                - img [ref=e315]
          - link "Toggle watchlist VEGA Vega Pharma VE $98.65 +1.45% Valuation Quality 82 Shariah" [ref=e318] [cursor=pointer]:
            - /url: /stock/VEGA
            - button "Toggle watchlist" [ref=e319]:
              - img [ref=e320]
            - generic [ref=e322]:
              - generic [ref=e323]:
                - generic [ref=e324]: VEGA
                - generic [ref=e325]: Vega Pharma
              - generic [ref=e326]: VE
            - generic [ref=e327]:
              - generic [ref=e328]: $98.65
              - generic [ref=e329]: +1.45%
            - generic [ref=e330]:
              - generic [ref=e331]: Valuation
              - generic [ref=e332]:
                - text: Quality
                - generic [ref=e333]: "82"
              - generic [ref=e334]:
                - text: Shariah
                - img [ref=e335]
      - generic [ref=e338]:
        - generic [ref=e339]:
          - heading "Quick actions" [level=2] [ref=e340]
          - generic [ref=e341]:
            - button "Search stocks Browse 1,300+ stocks" [ref=e342]:
              - img [ref=e344]
              - generic [ref=e347]:
                - generic [ref=e348]: Search stocks
                - generic [ref=e349]: Browse 1,300+ stocks
              - img [ref=e350]
            - link "Analysis articles Read the latest analysis" [ref=e352] [cursor=pointer]:
              - /url: /#articles
              - img [ref=e354]
              - generic [ref=e357]:
                - generic [ref=e358]: Analysis articles
                - generic [ref=e359]: Read the latest analysis
              - img [ref=e360]
        - generic [ref=e362]:
          - heading "Latest news" [level=2] [ref=e363]
          - generic [ref=e364]:
            - link "Platform update May 5, 2026 200 new stocks added to the Murakkab+ database" [ref=e365] [cursor=pointer]:
              - /url: /article/news-1
              - generic [ref=e366]:
                - generic [ref=e367]: Platform update
                - generic [ref=e368]: May 5, 2026
              - generic [ref=e369]: 200 new stocks added to the Murakkab+ database
            - link "Market analysis May 1, 2026 US market performance summary for April" [ref=e370] [cursor=pointer]:
              - /url: /article/news-2
              - generic [ref=e371]:
                - generic [ref=e372]: Market analysis
                - generic [ref=e373]: May 1, 2026
              - generic [ref=e374]: US market performance summary for April
            - link "Shariah standards Apr 22, 2026 AAOIFI Shariah compliance standards update" [ref=e375] [cursor=pointer]:
              - /url: /article/news-3
              - generic [ref=e376]:
                - generic [ref=e377]: Shariah standards
                - generic [ref=e378]: Apr 22, 2026
              - generic [ref=e379]: AAOIFI Shariah compliance standards update
  - contentinfo [ref=e380]:
    - generic [ref=e381]:
      - generic [ref=e382]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e383]
        - link "Subscribe now" [ref=e385] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e386]
      - generic [ref=e388]:
        - generic [ref=e389]:
          - generic [ref=e390]:
            - img [ref=e392]
            - generic [ref=e394]: Murakkab+
          - paragraph [ref=e395]: Shariah-aligned stock analysis platform
          - paragraph [ref=e396]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e397]:
          - generic [ref=e398]:
            - generic [ref=e399]: Explore
            - list [ref=e400]:
              - listitem [ref=e401]:
                - link "Why Murakkab" [ref=e402] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e403]:
                - link "Filters" [ref=e404] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e405]:
                - link "Features" [ref=e406] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e407]:
                - link "Pricing" [ref=e408] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e409]:
            - generic [ref=e410]: Company
            - list [ref=e411]:
              - listitem [ref=e412]:
                - link "About" [ref=e413] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e414]:
                - link "Contact" [ref=e415] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e416]:
            - generic [ref=e417]: Legal
            - list [ref=e418]:
              - listitem [ref=e419]:
                - link "Privacy" [ref=e420] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e421]:
                - link "Terms" [ref=e422] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e423]:
        - generic [ref=e424]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e425]:
          - link "Twitter" [ref=e426] [cursor=pointer]:
            - /url: "#"
            - img [ref=e427]
          - link "LinkedIn" [ref=e429] [cursor=pointer]:
            - /url: "#"
            - img [ref=e430]
  - button "Open Next.js Dev Tools" [ref=e437] [cursor=pointer]:
    - img [ref=e438]
  - alert [ref=e441]
  - dialog [ref=e442]:
    - generic [ref=e444]:
      - button "Close" [ref=e445]:
        - img [ref=e446]
      - img [ref=e450]
      - generic [ref=e452]:
        - heading "Log in" [level=2] [ref=e453]
        - paragraph [ref=e454]: Sign in to access your account and continue your analysis.
      - generic [ref=e455]:
        - generic [ref=e456]:
          - img [ref=e458]
          - textbox "Email address" [active] [ref=e460]
        - generic [ref=e461]:
          - img [ref=e463]
          - textbox "Password" [ref=e466]
          - button "Toggle password visibility" [ref=e468]:
            - img [ref=e469]
        - generic [ref=e472]:
          - generic [ref=e473] [cursor=pointer]:
            - checkbox "Remember me" [ref=e474]
            - text: Remember me
          - link "Forgot password?" [ref=e475] [cursor=pointer]:
            - /url: "#"
        - button "Log in" [ref=e476]
      - generic [ref=e479]: or
      - generic [ref=e481]:
        - button "Log in with Google" [ref=e482]:
          - img [ref=e483]
          - generic [ref=e488]: Log in with Google
        - button "Log in with Apple coming soon" [disabled] [ref=e489]:
          - img [ref=e490]
          - generic [ref=e492]: Log in with Apple
          - generic [ref=e493]: coming soon
      - generic [ref=e494]:
        - text: Don't have an account?
        - button "Sign up" [ref=e495]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser, seedWatchlist } from "./_helpers";
  3  | 
  4  | test.describe("Dashboard — free user", () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setEnglish(page);
  7  |     await seedLoggedInUser(page, "free", { name: "Free Person", email: "free@example.com" });
  8  |   });
  9  | 
  10 |   test("renders welcome, free banner, empty watchlist, recommendations", async ({ page }) => {
  11 |     await page.goto("/dashboard");
  12 |     await expect(page.getByRole("heading", { name: /Welcome back/ })).toBeVisible();
  13 |     await expect(page.getByText("Free Person")).toBeVisible();
  14 |     // Free user banner — title "You're on the free plan"
  15 |     await expect(page.getByText("You're on the free plan")).toBeVisible();
  16 |     // Empty watchlist state with CTA
  17 |     await expect(page.getByText("You haven't added any stocks yet")).toBeVisible();
  18 |   });
  19 | 
  20 |   test("'Search stocks' quick action opens SearchModal", async ({ page }) => {
  21 |     await page.goto("/dashboard");
  22 |     // Multiple "Search stocks" labels — pick the visible button by role
  23 |     await page.getByRole("button", { name: /^Search stocks$/ }).first().click();
  24 |     await expect(page.getByRole("dialog")).toBeVisible();
  25 |     await expect(page.getByPlaceholder("Search stocks by name or symbol...")).toBeVisible();
  26 |   });
  27 | 
  28 |   test("does NOT show premium-only AI insights / earnings / movers", async ({ page }) => {
  29 |     await page.goto("/dashboard");
  30 |     await expect(page.getByText("Today's AI brief")).toHaveCount(0);
  31 |     await expect(page.getByText("Upcoming earnings")).toHaveCount(0);
  32 |     await expect(page.getByText("Top movers")).toHaveCount(0);
  33 |   });
  34 | });
  35 | 
  36 | test.describe("Dashboard — premium user", () => {
  37 |   test.beforeEach(async ({ page }) => {
  38 |     await setEnglish(page);
  39 |     await seedLoggedInUser(page, "premium", { name: "Pro Person", email: "pro@example.com" });
  40 |     await seedWatchlist(page, ["ARMD", "NEXV"]);
  41 |   });
  42 | 
  43 |   test("shows Pro badge, AI insights, earnings calendar, top movers", async ({ page }) => {
  44 |     await page.goto("/dashboard");
  45 |     await expect(page.getByText(/^Pro$/).first()).toBeVisible();
  46 |     await expect(page.getByText("Today's AI brief")).toBeVisible();
  47 |     await expect(page.getByText("Upcoming earnings")).toBeVisible();
  48 |     await expect(page.getByText("Top movers")).toBeVisible();
  49 |   });
  50 | 
  51 |   test("watchlist preview shows seeded tickers and links to detail", async ({ page }) => {
  52 |     await page.goto("/dashboard");
  53 |     await expect(page.locator("[href='/stock/ARMD']").first()).toBeVisible();
  54 |     await expect(page.locator("[href='/stock/NEXV']").first()).toBeVisible();
  55 |   });
  56 | 
  57 |   test("BUG: AI 'Deeper analysis' button has no handler (no navigation)", async ({ page }) => {
  58 |     await page.goto("/dashboard");
  59 |     const btn = page.getByRole("button", { name: /^Deeper analysis$/ });
  60 |     await expect(btn).toBeVisible();
  61 |     const before = page.url();
  62 |     await btn.click();
  63 |     expect(page.url()).toBe(before);
  64 |   });
  65 | 
  66 |   test("BUG: 'All earnings' link is href='#'", async ({ page }) => {
  67 |     await page.goto("/dashboard");
  68 |     const link = page.getByRole("link", { name: /^All earnings$/ });
  69 |     await expect(link).toBeVisible();
> 70 |     expect.soft(await link.getAttribute("href"), "All earnings link href").not.toBe("#");
     |                                                                                ^ Error: All earnings link href
  71 |   });
  72 | });
  73 | 
```