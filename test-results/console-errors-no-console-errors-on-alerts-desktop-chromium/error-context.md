# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: console-errors.spec.ts >> no console errors on /alerts
- Location: tests/e2e/console-errors.spec.ts:16:7

# Error details

```
Error: Console errors on /alerts

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 6

- Array []
+ Array [
+   Object {
+     "text": "Cannot read properties of undefined (reading 'mock')",
+     "type": "pageerror",
+   },
+ ]
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
            - generic [ref=e48]: Cannot read properties of undefined (reading 'mock')
          - generic [ref=e49]:
            - generic [ref=e50]:
              - paragraph [ref=e52]:
                - img [ref=e54]
                - generic [ref=e57]: ../../new one/radison-clone/src/components/AlertsView.tsx (93:30) @ AlertsView
                - button "Open in editor" [ref=e58] [cursor=pointer]:
                  - img [ref=e60]
              - generic [ref=e63]:
                - generic [ref=e64]: 91 |
                - generic [ref=e65]: 92 | // Premium experience
                - generic [ref=e66]: "> 93 | const allAlerts = t.alerts.mock as Array<{"
                - generic [ref=e67]: "| ^"
                - generic [ref=e68]: "94 | ticker: string;"
                - generic [ref=e69]: "95 | type: AlertType;"
                - generic [ref=e70]: "96 | condition: string | null;"
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
                - text: ../../new one/radison-clone/src/components/AlertsView.tsx (93:30)
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
  2  | import { collectConsoleErrors, setEnglish, seedLoggedInUser } from "./_helpers";
  3  | 
  4  | const ROUTES = [
  5  |   { path: "/", auth: false },
  6  |   { path: "/dashboard", auth: true },
  7  |   { path: "/account", auth: true },
  8  |   { path: "/watchlist", auth: true },
  9  |   { path: "/alerts", auth: true },
  10 |   { path: "/article/test-slug", auth: false },
  11 |   { path: "/stock/ARMD", auth: false },
  12 |   { path: "/stock/ZZZZZZ", auth: false }, // unknown ticker → fallback
  13 | ];
  14 | 
  15 | for (const r of ROUTES) {
  16 |   test(`no console errors on ${r.path}`, async ({ page }) => {
  17 |     await setEnglish(page);
  18 |     if (r.auth) await seedLoggedInUser(page, "premium");
  19 |     const getErrors = collectConsoleErrors(page);
  20 |     await page.goto(r.path);
  21 |     await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  22 |     const errs = getErrors().filter(
  23 |       (e) =>
  24 |         !/Failed to load resource/i.test(e.text) &&
  25 |         !/Download the React DevTools/i.test(e.text) &&
  26 |         !/HMR/i.test(e.text)
  27 |     );
  28 |     if (errs.length) {
  29 |       console.log(`Console errors on ${r.path}:`, JSON.stringify(errs, null, 2));
  30 |     }
> 31 |     expect(errs, `Console errors on ${r.path}`).toEqual([]);
     |                                                 ^ Error: Console errors on /alerts
  32 |   });
  33 | }
  34 | 
```