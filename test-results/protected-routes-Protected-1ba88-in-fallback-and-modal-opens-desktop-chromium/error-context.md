# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: protected-routes.spec.ts >> Protected route gating (client-side only) >> anonymous on /alerts sees the in-page Log-in fallback and modal opens
- Location: tests/e2e/protected-routes.spec.ts:13:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/^Log in to access/i).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText(/^Log in to access/i).first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - navigation [ref=e7]:
            - button "previous" [disabled] [ref=e8]:
              - img "previous" [ref=e9]
            - generic [ref=e11]:
              - generic [ref=e12]: 1/
              - text: "1"
            - button "next" [disabled] [ref=e13]:
              - img "next" [ref=e14]
          - img
        - generic [ref=e16]:
          - link "Next.js 16.2.5 (stale) Turbopack" [ref=e17] [cursor=pointer]:
            - /url: https://nextjs.org/docs/messages/version-staleness
            - img [ref=e18]
            - generic "There is a newer version (16.2.6) available, upgrade recommended!" [ref=e20]: Next.js 16.2.5 (stale)
            - generic [ref=e21]: Turbopack
          - img
      - dialog "Runtime TypeError" [ref=e23]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e30]: Runtime TypeError
              - generic [ref=e31]:
                - button "Copy Error Info" [ref=e32] [cursor=pointer]:
                  - img [ref=e33]
                - button "No related documentation found" [disabled] [ref=e35]:
                  - img [ref=e36]
                - button "Attach Node.js inspector" [ref=e38] [cursor=pointer]:
                  - img [ref=e39]
            - generic [ref=e48]: Cannot read properties of undefined (reading 'title')
          - generic [ref=e49]:
            - generic [ref=e50]:
              - paragraph [ref=e52]:
                - img [ref=e54]
                - generic [ref=e57]: ../../new one/radison-clone/src/components/AlertsView.tsx (50:84) @ AlertsView
                - button "Open in editor" [ref=e58] [cursor=pointer]:
                  - img [ref=e60]
              - generic [ref=e63]:
                - generic [ref=e64]: 48 | ...
                - generic [ref=e65]: 49 | ...px-4 sm:px-6 py-32 sm:py-40 text-center">
                - generic [ref=e66]: "> 50 | ...-3xl sm:text-4xl tracking-tight\">{t.alerts.title}</h1>"
                - generic [ref=e67]: "| ^"
                - generic [ref=e68]: 51 | ...[var(--muted)]">
                - generic [ref=e69]: "52 | ...دخول للوصول إلى التنبيهات.\" : \"Log in to access alerts.\"}"
                - generic [ref=e70]: 53 | ...
            - generic [ref=e71]:
              - generic [ref=e72]:
                - paragraph [ref=e73]:
                  - text: Call Stack
                  - generic [ref=e74]: "13"
                - button "Show 11 ignore-listed frame(s)" [ref=e75] [cursor=pointer]:
                  - text: Show 11 ignore-listed frame(s)
                  - img [ref=e76]
              - generic [ref=e78]:
                - generic [ref=e79]:
                  - text: AlertsView
                  - button "Open AlertsView in editor" [ref=e80] [cursor=pointer]:
                    - img [ref=e81]
                - text: ../../new one/radison-clone/src/components/AlertsView.tsx (50:84)
              - generic [ref=e83]:
                - generic [ref=e84]:
                  - text: AlertsPage
                  - button "Open AlertsPage in editor" [ref=e85] [cursor=pointer]:
                    - img [ref=e86]
                - text: ../../new one/radison-clone/src/app/alerts/page.tsx (4:10)
        - generic [ref=e88]: "1"
        - generic [ref=e89]: "2"
    - generic [ref=e94] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e95]:
        - img [ref=e96]
      - generic [ref=e99]:
        - button "Open issues overlay" [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]: "0"
            - generic [ref=e103]: "1"
          - generic [ref=e104]: Issue
        - button "Collapse issues badge" [ref=e105]:
          - img [ref=e106]
  - generic [ref=e109]:
    - img [ref=e110]
    - heading "This page couldn’t load" [level=1] [ref=e112]
    - paragraph [ref=e113]: Reload to try again, or go back.
    - generic [ref=e114]:
      - button "Reload" [ref=e116] [cursor=pointer]
      - button "Back" [ref=e117] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";
  3  | 
  4  | const PROTECTED = ["/dashboard", "/account", "/watchlist", "/alerts"];
  5  | 
  6  | test.describe("Protected route gating (client-side only)", () => {
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await setEnglish(page);
  9  |     await clearAuth(page);
  10 |   });
  11 | 
  12 |   for (const route of PROTECTED) {
  13 |     test(`anonymous on ${route} sees the in-page Log-in fallback and modal opens`, async ({ page }) => {
  14 |       await page.goto(route);
  15 |       // common.loginToAccess = "Log in to access" — but each view writes its own EN/AR copy:
  16 |       //  Dashboard: "Log in to access your dashboard."
  17 |       //  Account:   "Log in to access settings."
  18 |       //  Watchlist: "Log in to access your watchlist."
  19 |       //  Alerts:    "Log in to access alerts."
> 20 |       await expect(page.getByText(/^Log in to access/i).first()).toBeVisible();
     |                                                                  ^ Error: expect(locator).toBeVisible() failed
  21 |       await expect(page.getByRole("dialog")).toBeVisible();
  22 |     });
  23 |   }
  24 | 
  25 |   test("authed user reaches /dashboard with no modal and welcome heading", async ({ page }) => {
  26 |     await seedLoggedInUser(page, "free", { name: "Dash User" });
  27 |     await page.goto("/dashboard");
  28 |     await expect(page.getByRole("heading", { name: /Welcome back/ })).toBeVisible();
  29 |     await expect(page.getByRole("dialog")).toBeHidden();
  30 |   });
  31 | 
  32 |   test("server returns full HTML for protected routes regardless of auth (no SSR redirect)", async ({ request }) => {
  33 |     for (const r of PROTECTED) {
  34 |       const resp = await request.get(r);
  35 |       expect(resp.status(), `${r} should serve 200 even unauthed`).toBe(200);
  36 |     }
  37 |   });
  38 | });
  39 | 
```