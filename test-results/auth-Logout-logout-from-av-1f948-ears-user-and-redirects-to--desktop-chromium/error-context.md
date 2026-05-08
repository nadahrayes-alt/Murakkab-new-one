# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Logout >> logout from avatar menu clears user and redirects to /
- Location: tests/e2e/auth.spec.ts:128:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^My account$/ })
    - locator resolved to <button type="button" aria-expanded="false" aria-label="My account" class="grid place-items-center w-9 h-9 rounded-full border border-[var(--border)] font-medium text-[13px] uppercase transition-colors">L</button>
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
        - button "My account" [ref=e32]: L
  - main [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e39]: Dashboard
        - heading "Welcome back, Logout Test" [level=1] [ref=e42]
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
          - generic [ref=e64]: "0"
        - generic [ref=e65]:
          - generic [ref=e66]: Avg. quality score
          - generic [ref=e67]: —
        - generic [ref=e68]:
          - generic [ref=e69]: Shariah compliant
          - generic [ref=e70]: "0"
        - generic [ref=e71]:
          - generic [ref=e72]: Sectors
          - generic [ref=e73]: —
      - generic [ref=e75]:
        - heading "Your watchlist" [level=2] [ref=e79]
        - generic [ref=e81]:
          - img [ref=e83]
          - generic [ref=e85]: You haven't added any stocks yet
          - generic [ref=e86]: Start searching to add stocks to your watchlist
          - button "Search stocks" [ref=e87]:
            - text: Search stocks
            - img [ref=e88]
      - generic [ref=e92]:
        - generic [ref=e94]:
          - heading "Recommended for you" [level=2] [ref=e95]
          - paragraph [ref=e96]: Based on your interests and our quality criteria
        - generic [ref=e97]:
          - link "Toggle watchlist ARMD Armada Tech. AR $142.18 +2.34% Valuation Quality 92 Shariah" [ref=e99] [cursor=pointer]:
            - /url: /stock/ARMD
            - button "Toggle watchlist" [ref=e100]:
              - img [ref=e101]
            - generic [ref=e103]:
              - generic [ref=e104]:
                - generic [ref=e105]: ARMD
                - generic [ref=e106]: Armada Tech.
              - generic [ref=e107]: AR
            - generic [ref=e108]:
              - generic [ref=e109]: $142.18
              - generic [ref=e110]: +2.34%
            - generic [ref=e111]:
              - generic [ref=e112]: Valuation
              - generic [ref=e113]:
                - text: Quality
                - generic [ref=e114]: "92"
              - generic [ref=e115]:
                - text: Shariah
                - img [ref=e116]
          - link "Toggle watchlist NEXV NexVision Energy NE $89.42 +0.86% Valuation Quality 88 Shariah" [ref=e119] [cursor=pointer]:
            - /url: /stock/NEXV
            - button "Toggle watchlist" [ref=e120]:
              - img [ref=e121]
            - generic [ref=e123]:
              - generic [ref=e124]:
                - generic [ref=e125]: NEXV
                - generic [ref=e126]: NexVision Energy
              - generic [ref=e127]: NE
            - generic [ref=e128]:
              - generic [ref=e129]: $89.42
              - generic [ref=e130]: +0.86%
            - generic [ref=e131]:
              - generic [ref=e132]: Valuation
              - generic [ref=e133]:
                - text: Quality
                - generic [ref=e134]: "88"
              - generic [ref=e135]:
                - text: Shariah
                - img [ref=e136]
          - link "Toggle watchlist PRSM Prism Labs PR $156.40 +0.92% Valuation Quality 87 Shariah" [ref=e139] [cursor=pointer]:
            - /url: /stock/PRSM
            - button "Toggle watchlist" [ref=e140]:
              - img [ref=e141]
            - generic [ref=e143]:
              - generic [ref=e144]:
                - generic [ref=e145]: PRSM
                - generic [ref=e146]: Prism Labs
              - generic [ref=e147]: PR
            - generic [ref=e148]:
              - generic [ref=e149]: $156.40
              - generic [ref=e150]: +0.92%
            - generic [ref=e151]:
              - generic [ref=e152]: Valuation
              - generic [ref=e153]:
                - text: Quality
                - generic [ref=e154]: "87"
              - generic [ref=e155]:
                - text: Shariah
                - img [ref=e156]
          - link "Toggle watchlist HELX Helix Health HE $215.10 +1.18% Valuation Quality 85 Shariah" [ref=e159] [cursor=pointer]:
            - /url: /stock/HELX
            - button "Toggle watchlist" [ref=e160]:
              - img [ref=e161]
            - generic [ref=e163]:
              - generic [ref=e164]:
                - generic [ref=e165]: HELX
                - generic [ref=e166]: Helix Health
              - generic [ref=e167]: HE
            - generic [ref=e168]:
              - generic [ref=e169]: $215.10
              - generic [ref=e170]: +1.18%
            - generic [ref=e171]:
              - generic [ref=e172]: Valuation
              - generic [ref=e173]:
                - text: Quality
                - generic [ref=e174]: "85"
              - generic [ref=e175]:
                - text: Shariah
                - img [ref=e176]
      - generic [ref=e179]:
        - generic [ref=e180]:
          - heading "Quick actions" [level=2] [ref=e181]
          - generic [ref=e182]:
            - button "Search stocks Browse 1,300+ stocks" [ref=e183]:
              - img [ref=e185]
              - generic [ref=e188]:
                - generic [ref=e189]: Search stocks
                - generic [ref=e190]: Browse 1,300+ stocks
              - img [ref=e191]
            - link "Analysis articles Read the latest analysis" [ref=e193] [cursor=pointer]:
              - /url: /#articles
              - img [ref=e195]
              - generic [ref=e198]:
                - generic [ref=e199]: Analysis articles
                - generic [ref=e200]: Read the latest analysis
              - img [ref=e201]
            - link "★ Upgrade to Premium Unlock all features" [ref=e203] [cursor=pointer]:
              - /url: /#pricing
              - generic [ref=e204]: ★
              - generic [ref=e205]:
                - generic [ref=e206]: Upgrade to Premium
                - generic [ref=e207]: Unlock all features
              - img [ref=e208]
        - generic [ref=e210]:
          - heading "Latest news" [level=2] [ref=e211]
          - generic [ref=e212]:
            - link "Platform update May 5, 2026 200 new stocks added to the Murakkab+ database" [ref=e213] [cursor=pointer]:
              - /url: /article/news-1
              - generic [ref=e214]:
                - generic [ref=e215]: Platform update
                - generic [ref=e216]: May 5, 2026
              - generic [ref=e217]: 200 new stocks added to the Murakkab+ database
            - link "Market analysis May 1, 2026 US market performance summary for April" [ref=e218] [cursor=pointer]:
              - /url: /article/news-2
              - generic [ref=e219]:
                - generic [ref=e220]: Market analysis
                - generic [ref=e221]: May 1, 2026
              - generic [ref=e222]: US market performance summary for April
            - link "Shariah standards Apr 22, 2026 AAOIFI Shariah compliance standards update" [ref=e223] [cursor=pointer]:
              - /url: /article/news-3
              - generic [ref=e224]:
                - generic [ref=e225]: Shariah standards
                - generic [ref=e226]: Apr 22, 2026
              - generic [ref=e227]: AAOIFI Shariah compliance standards update
  - contentinfo [ref=e228]:
    - generic [ref=e229]:
      - generic [ref=e230]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e231]
        - link "Subscribe now" [ref=e233] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e234]
      - generic [ref=e236]:
        - generic [ref=e237]:
          - generic [ref=e238]:
            - img [ref=e240]
            - generic [ref=e242]: Murakkab+
          - paragraph [ref=e243]: Shariah-aligned stock analysis platform
          - paragraph [ref=e244]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e245]:
          - generic [ref=e246]:
            - generic [ref=e247]: Explore
            - list [ref=e248]:
              - listitem [ref=e249]:
                - link "Why Murakkab" [ref=e250] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e251]:
                - link "Filters" [ref=e252] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e253]:
                - link "Features" [ref=e254] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e255]:
                - link "Pricing" [ref=e256] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e257]:
            - generic [ref=e258]: Company
            - list [ref=e259]:
              - listitem [ref=e260]:
                - link "About" [ref=e261] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e262]:
                - link "Contact" [ref=e263] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e264]:
            - generic [ref=e265]: Legal
            - list [ref=e266]:
              - listitem [ref=e267]:
                - link "Privacy" [ref=e268] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e269]:
                - link "Terms" [ref=e270] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e271]:
        - generic [ref=e272]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e273]:
          - link "Twitter" [ref=e274] [cursor=pointer]:
            - /url: "#"
            - img [ref=e275]
          - link "LinkedIn" [ref=e277] [cursor=pointer]:
            - /url: "#"
            - img [ref=e278]
  - button "Open Next.js Dev Tools" [ref=e285] [cursor=pointer]:
    - img [ref=e286]
  - alert [ref=e289]
  - dialog [ref=e290]:
    - generic [ref=e292]:
      - button "Close" [ref=e293]:
        - img [ref=e294]
      - img [ref=e298]
      - generic [ref=e300]:
        - heading "Log in" [level=2] [ref=e301]
        - paragraph [ref=e302]: Sign in to access your account and continue your analysis.
      - generic [ref=e303]:
        - generic [ref=e304]:
          - img [ref=e306]
          - textbox "Email address" [active] [ref=e308]
        - generic [ref=e309]:
          - img [ref=e311]
          - textbox "Password" [ref=e314]
          - button "Toggle password visibility" [ref=e316]:
            - img [ref=e317]
        - generic [ref=e320]:
          - generic [ref=e321] [cursor=pointer]:
            - checkbox "Remember me" [ref=e322]
            - text: Remember me
          - link "Forgot password?" [ref=e323] [cursor=pointer]:
            - /url: "#"
        - button "Log in" [ref=e324]
      - generic [ref=e327]: or
      - generic [ref=e329]:
        - button "Log in with Google" [ref=e330]:
          - img [ref=e331]
          - generic [ref=e336]: Log in with Google
        - button "Log in with Apple coming soon" [disabled] [ref=e337]:
          - img [ref=e338]
          - generic [ref=e340]: Log in with Apple
          - generic [ref=e341]: coming soon
      - generic [ref=e342]:
        - text: Don't have an account?
        - button "Sign up" [ref=e343]
```

# Test source

```ts
  33  |     expect(u).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com", tier: "free" });
  34  |   });
  35  | 
  36  |   test("BUG: invalid email format gets through (only browser-native checks)", async ({ page }) => {
  37  |     await page.goto("/");
  38  |     await openSignupModal(page);
  39  |     await page.getByPlaceholder("Full name").fill("X");
  40  |     await page.getByPlaceholder("Email address").fill("not-an-email");
  41  |     await page.getByPlaceholder("Password").fill("a");
  42  |     await page.getByRole("dialog").getByRole("button", { name: /^Create new account$/ }).click();
  43  |     // Browser's email type validation should block
  44  |     await expect(page.getByRole("dialog")).toBeVisible();
  45  |     // BUT no app-level validation message
  46  |     expect.soft(await page.getByText(/Invalid email|valid email/i).count(), "no app-level email validation").toBe(0);
  47  |   });
  48  | 
  49  |   test("BUG: trivially short password is accepted (no policy)", async ({ page }) => {
  50  |     await page.goto("/");
  51  |     await openSignupModal(page);
  52  |     await submitSignup(page, "Weak", "weak@example.com", "a");
  53  |     await expect(page).toHaveURL(/\/dashboard$/);
  54  |   });
  55  | 
  56  |   test("BUG: Terms and Privacy links are href='#'", async ({ page }) => {
  57  |     await page.goto("/");
  58  |     await openSignupModal(page);
  59  |     const terms = page.getByRole("link", { name: /Terms of Service/i });
  60  |     const privacy = page.getByRole("link", { name: /Privacy Policy/i });
  61  |     expect.soft(await terms.getAttribute("href"), "Terms link href").not.toBe("#");
  62  |     expect.soft(await privacy.getAttribute("href"), "Privacy link href").not.toBe("#");
  63  |   });
  64  | });
  65  | 
  66  | test.describe("Auth modal — Login", () => {
  67  |   test.beforeEach(async ({ page }) => {
  68  |     await setEnglish(page);
  69  |   });
  70  | 
  71  |   test("login form has Remember me + Forgot password (cosmetic)", async ({ page }) => {
  72  |     await page.goto("/");
  73  |     await openLoginModal(page);
  74  |     await expect(page.getByText(/Remember me/)).toBeVisible();
  75  |     const forgot = page.getByRole("link", { name: /Forgot password/ });
  76  |     await expect(forgot).toBeVisible();
  77  |     expect.soft(await forgot.getAttribute("href"), "Forgot password link href").not.toBe("#");
  78  |   });
  79  | 
  80  |   test("BUG: 'Log in with Google' button has no handler", async ({ page }) => {
  81  |     await page.goto("/");
  82  |     await openLoginModal(page);
  83  |     const google = page.getByRole("button", { name: /Log in with Google/ });
  84  |     await expect(google).toBeVisible();
  85  |     await google.click();
  86  |     // Modal still open, URL unchanged
  87  |     await expect(page).toHaveURL(/\/$/);
  88  |     await expect(page.getByRole("dialog")).toBeVisible();
  89  |   });
  90  | 
  91  |   test("'Log in with Apple' is correctly disabled with coming soon badge", async ({ page }) => {
  92  |     await page.goto("/");
  93  |     await openLoginModal(page);
  94  |     const apple = page.getByRole("button", { name: /Log in with Apple/ });
  95  |     await expect(apple).toBeDisabled();
  96  |     await expect(apple).toContainText(/coming soon/i);
  97  |   });
  98  | 
  99  |   test("ESC closes the modal", async ({ page }) => {
  100 |     await page.goto("/");
  101 |     await openLoginModal(page);
  102 |     await page.keyboard.press("Escape");
  103 |     await expect(page.getByRole("dialog")).toBeHidden();
  104 |   });
  105 | 
  106 |   test("Backdrop click closes the modal", async ({ page }) => {
  107 |     await page.goto("/");
  108 |     await openLoginModal(page);
  109 |     await page.locator(".modal-backdrop").first().click({ position: { x: 5, y: 5 } });
  110 |     await expect(page.getByRole("dialog")).toBeHidden();
  111 |   });
  112 | 
  113 |   test("Mode switch link toggles between login and signup", async ({ page }) => {
  114 |     await page.goto("/");
  115 |     await openLoginModal(page);
  116 |     // Login mode: link says "Sign up" (auth.login.switchTo)
  117 |     await page.getByRole("button", { name: /^Sign up$/ }).first().click();
  118 |     await expect(page.getByPlaceholder("Full name")).toBeVisible();
  119 |     // Signup mode: link says "Log in" (auth.signup.switchTo) — BUT navbar button is also "Log in" — uniqueness
  120 |     const dialogLogin = page.getByRole("dialog").getByRole("button", { name: /^Log in$/ });
  121 |     await dialogLogin.click();
  122 |     // Back to login mode — full name field gone
  123 |     await expect(page.getByPlaceholder("Full name")).toHaveCount(0);
  124 |   });
  125 | });
  126 | 
  127 | test.describe("Logout", () => {
  128 |   test("logout from avatar menu clears user and redirects to /", async ({ page }) => {
  129 |     await setEnglish(page);
  130 |     await seedLoggedInUser(page, "free", { name: "Logout Test", email: "logout@example.com" });
  131 |     await page.goto("/dashboard");
  132 |     // Click avatar (button with aria-label "My account")
> 133 |     await page.getByRole("button", { name: /^My account$/ }).click();
      |                                                              ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  134 |     await page.getByRole("button", { name: /^Log out$/ }).click();
  135 |     await expect(page).toHaveURL(/\/$/);
  136 |     await expect(page.getByRole("button", { name: /^Log in$/ }).first()).toBeVisible();
  137 |     const stored = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
  138 |     expect(stored).toBeNull();
  139 |   });
  140 | 
  141 |   test("logout-all-sessions in Settings does the same as logout (no real session list)", async ({ page }) => {
  142 |     await setEnglish(page);
  143 |     await seedLoggedInUser(page, "free");
  144 |     await page.goto("/account");
  145 |     await page.getByRole("button", { name: /Log out of all devices/ }).click();
  146 |     await expect(page).toHaveURL(/\/$/);
  147 |     const stored = await page.evaluate(() => window.localStorage.getItem("murakkab_user"));
  148 |     expect(stored).toBeNull();
  149 |   });
  150 | });
  151 | 
```