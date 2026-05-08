# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: alerts.spec.ts >> Alerts page (Arabic, since EN translations are missing) >> BUG: '+ New alert' button has no handler
- Location: tests/e2e/alerts.spec.ts:20:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /إنشاء تنبيه جديد/ })
    - locator resolved to <button type="button" class="btn-primary !text-[12.5px]">…</button>
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
    - waiting for element to be visible, enabled and stable
    - element is not stable
  13 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
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
      - link "مركّب+" [ref=e5] [cursor=pointer]:
        - /url: "#top"
        - img [ref=e7]
        - generic [ref=e9]: مركّب+
      - navigation [ref=e10]:
        - link "الميزات" [ref=e11] [cursor=pointer]:
          - /url: "#features"
        - link "آخر الأخبار" [ref=e12] [cursor=pointer]:
          - /url: "#news"
        - link "آراء العملاء" [ref=e13] [cursor=pointer]:
          - /url: "#testimonials"
        - link "التسعير" [ref=e14] [cursor=pointer]:
          - /url: "#pricing"
        - link "مقالات تحليلية" [ref=e15] [cursor=pointer]:
          - /url: "#articles"
          - text: مقالات تحليلية
          - img [ref=e16]
      - generic [ref=e18]:
        - button "Open search" [ref=e19]:
          - img [ref=e20]
          - generic [ref=e23]: ابحث عن سهم أو شركة...
        - button "Switch theme" [ref=e25]:
          - img [ref=e26]
        - generic [ref=e28]:
          - button "EN" [ref=e29]
          - button "ع" [pressed] [ref=e30]
        - button "حسابي" [ref=e32]: T
  - main [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e38]:
          - generic [ref=e39]: التنبيهات
          - generic [ref=e41]: Pro
        - generic [ref=e43]:
          - generic [ref=e44]:
            - heading "التنبيهات" [level=1] [ref=e45]
            - paragraph [ref=e46]: إدارة تنبيهات الأسعار والأرباح والتغييرات في تقييمات أسهمك.
          - button "إنشاء تنبيه جديد" [ref=e47]:
            - img [ref=e48]
            - text: إنشاء تنبيه جديد
      - generic [ref=e50]:
        - generic [ref=e51]:
          - button "الكل (4)" [pressed] [ref=e52]:
            - text: الكل
            - generic [ref=e53]: (4)
          - button "نشطة (3)" [ref=e54]:
            - text: نشطة
            - generic [ref=e55]: (3)
          - button "تم تفعيلها (1)" [ref=e56]:
            - text: تم تفعيلها
            - generic [ref=e57]: (1)
        - generic [ref=e58]:
          - generic [ref=e60]:
            - img [ref=e62]
            - link "ARMD أرمادا تِك" [ref=e64] [cursor=pointer]:
              - /url: /stock/ARMD
              - generic [ref=e65]: ARMD
              - generic [ref=e67]: أرمادا تِك
            - generic [ref=e68]:
              - generic [ref=e69]: تنبيه سعر
              - generic [ref=e70]: السعر يتجاوز $150.00
            - generic [ref=e71]: نشط
            - generic [ref=e72]:
              - button "تعديل" [ref=e73]:
                - img [ref=e74]
              - button "حذف" [ref=e76]:
                - img [ref=e77]
          - generic [ref=e80]:
            - img [ref=e82]
            - link "HELX هيلِكس هِلث" [ref=e85] [cursor=pointer]:
              - /url: /stock/HELX
              - generic [ref=e86]: HELX
              - generic [ref=e88]: هيلِكس هِلث
            - generic [ref=e89]:
              - generic [ref=e90]: إعلان أرباح
              - generic [ref=e91]: 12 يونيو 2026
            - generic [ref=e92]: نشط
            - generic [ref=e93]:
              - button "تعديل" [ref=e94]:
                - img [ref=e95]
              - button "حذف" [ref=e97]:
                - img [ref=e98]
          - generic [ref=e101]:
            - img [ref=e103]
            - link "NEXV نِكسفِجن للطاقة" [ref=e105] [cursor=pointer]:
              - /url: /stock/NEXV
              - generic [ref=e106]: NEXV
              - generic [ref=e108]: نِكسفِجن للطاقة
            - generic [ref=e109]:
              - generic [ref=e110]: تنبيه سعر
              - generic [ref=e111]: السعر ينخفض إلى $80.00
            - generic [ref=e112]: نشط
            - generic [ref=e113]:
              - button "تعديل" [ref=e114]:
                - img [ref=e115]
              - button "حذف" [ref=e117]:
                - img [ref=e118]
          - generic [ref=e121]:
            - img [ref=e123]
            - link "LUMN لومن للصناعات" [ref=e125] [cursor=pointer]:
              - /url: /stock/LUMN
              - generic [ref=e126]: LUMN
              - generic [ref=e128]: لومن للصناعات
            - generic [ref=e129]:
              - generic [ref=e130]: تغيّر في التقييم
              - generic [ref=e131]: الجودة ترتفع فوق 85
            - generic [ref=e132]: تم تفعيله
            - generic [ref=e134]:
              - button "تعديل" [ref=e135]:
                - img [ref=e136]
              - button "حذف" [ref=e138]:
                - img [ref=e139]
  - contentinfo [ref=e141]:
    - generic [ref=e142]:
      - generic [ref=e143]:
        - heading "ابدأ بقرارات استثمارية أكثر وضوحاً" [level=3] [ref=e144]
        - link "اشترك الآن" [ref=e146] [cursor=pointer]:
          - /url: "#pricing"
          - text: اشترك الآن
          - img [ref=e147]
      - generic [ref=e149]:
        - generic [ref=e150]:
          - generic [ref=e151]:
            - img [ref=e153]
            - generic [ref=e155]: مركّب+
          - paragraph [ref=e156]: منصة تحليل أسهم وفق معايير الشريعة
          - paragraph [ref=e157]: المحتوى لأغراض تعليمية وتحليلية ولا يُعد توصية استثمارية.
        - generic [ref=e158]:
          - generic [ref=e159]:
            - generic [ref=e160]: استكشف
            - list [ref=e161]:
              - listitem [ref=e162]:
                - link "لماذا مركّب" [ref=e163] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e164]:
                - link "المعايير" [ref=e165] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e166]:
                - link "الميزات" [ref=e167] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e168]:
                - link "الاشتراك" [ref=e169] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e170]:
            - generic [ref=e171]: الشركة
            - list [ref=e172]:
              - listitem [ref=e173]:
                - link "عن المنصة" [ref=e174] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e175]:
                - link "تواصل معنا" [ref=e176] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e177]:
            - generic [ref=e178]: قانوني
            - list [ref=e179]:
              - listitem [ref=e180]:
                - link "الخصوصية" [ref=e181] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e182]:
                - link "الشروط" [ref=e183] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e184]:
        - generic [ref=e185]: © 2026 مركّب+. جميع الحقوق محفوظة.
        - generic [ref=e186]:
          - link "Twitter" [ref=e187] [cursor=pointer]:
            - /url: "#"
            - img [ref=e188]
          - link "LinkedIn" [ref=e190] [cursor=pointer]:
            - /url: "#"
            - img [ref=e191]
  - button "Open Next.js Dev Tools" [ref=e198] [cursor=pointer]:
    - img [ref=e199]
  - alert [ref=e202]
  - dialog [ref=e203]:
    - generic [ref=e205]:
      - button "إغلاق" [ref=e206]:
        - img [ref=e207]
      - img [ref=e211]
      - generic [ref=e213]:
        - heading "تسجيل الدخول" [level=2] [ref=e214]
        - paragraph [ref=e215]: سجّل الدخول للوصول إلى حسابك ومتابعة تحليلاتك.
      - generic [ref=e216]:
        - generic [ref=e217]:
          - img [ref=e219]
          - textbox "البريد الإلكتروني" [active] [ref=e221]
        - generic [ref=e222]:
          - img [ref=e224]
          - textbox "كلمة المرور" [ref=e227]
          - button "إظهار/إخفاء كلمة المرور" [ref=e229]:
            - img [ref=e230]
        - generic [ref=e233]:
          - generic [ref=e234] [cursor=pointer]:
            - checkbox "تذكّرني" [ref=e235]
            - text: تذكّرني
          - link "نسيت كلمة المرور؟" [ref=e236] [cursor=pointer]:
            - /url: "#"
        - button "تسجيل الدخول" [ref=e237]
      - generic [ref=e240]: أو
      - generic [ref=e242]:
        - button "الدخول باستخدام جوجل" [ref=e243]:
          - img [ref=e244]
          - generic [ref=e249]: الدخول باستخدام جوجل
        - button "الدخول باستخدام Apple قريباً" [disabled] [ref=e250]:
          - img [ref=e251]
          - generic [ref=e253]: الدخول باستخدام Apple
          - generic [ref=e254]: قريباً
      - generic [ref=e255]:
        - text: ليس لديك حساب؟
        - button "إنشاء حساب" [ref=e256]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser } from "./_helpers";
  3  | 
  4  | test.describe("Alerts page (Arabic, since EN translations are missing)", () => {
  5  |   test("free user (Arabic) sees premium upsell card", async ({ page }) => {
  6  |     // Don't set English — EN alerts strings don't exist
  7  |     await seedLoggedInUser(page, "free");
  8  |     await page.goto("/alerts");
  9  |     await expect(page.getByRole("button", { name: /الترقية/ })).toBeVisible();
  10 |   });
  11 | 
  12 |   test("premium user (Arabic) sees alert tabs + 'New alert' button", async ({ page }) => {
  13 |     await seedLoggedInUser(page, "premium");
  14 |     await page.goto("/alerts");
  15 |     // Tab buttons end with "(N)" counts
  16 |     await expect(page.getByRole("button", { name: /\(\d+\)$/ }).first()).toBeVisible();
  17 |     await expect(page.getByRole("button", { name: /إنشاء تنبيه جديد/ })).toBeVisible();
  18 |   });
  19 | 
  20 |   test("BUG: '+ New alert' button has no handler", async ({ page }) => {
  21 |     await seedLoggedInUser(page, "premium");
  22 |     await page.goto("/alerts");
  23 |     const btn = page.getByRole("button", { name: /إنشاء تنبيه جديد/ });
  24 |     const before = page.url();
> 25 |     await btn.click();
     |               ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  26 |     expect(page.url()).toBe(before);
  27 |     await expect(page.getByRole("dialog")).toHaveCount(0);
  28 |   });
  29 | 
  30 |   test("BUG: row Edit and Delete icons have no handlers", async ({ page }) => {
  31 |     await seedLoggedInUser(page, "premium");
  32 |     await page.goto("/alerts");
  33 |     const editBtns = page.getByRole("button", { name: /تعديل/ });
  34 |     const deleteBtns = page.getByRole("button", { name: /حذف/ });
  35 |     if ((await editBtns.count()) > 0) {
  36 |       const before = page.url();
  37 |       await editBtns.first().click();
  38 |       expect(page.url()).toBe(before);
  39 |     }
  40 |     if ((await deleteBtns.count()) > 0) {
  41 |       const before = page.url();
  42 |       await deleteBtns.first().click();
  43 |       expect(page.url()).toBe(before);
  44 |     }
  45 |   });
  46 | 
  47 |   test("HIGH BUG: switching to English on /alerts breaks (translations missing)", async ({ page }) => {
  48 |     await seedLoggedInUser(page, "premium");
  49 |     // Seed English explicitly
  50 |     await page.addInitScript(() => window.localStorage.setItem("lang", "en"));
  51 |     await page.goto("/alerts");
  52 |     // Title should read something like "Alerts" but t.alerts is undefined in EN
  53 |     // Heading should still render but with empty text — or page should crash
  54 |     // Capture: any visible empty <h1>
  55 |     const h1Text = await page.locator("h1").first().textContent();
  56 |     // If translations are missing, h1Text will be empty/whitespace
  57 |     expect.soft(h1Text?.trim(), "Alerts page heading should not be empty in English").not.toBe("");
  58 |   });
  59 | });
  60 | 
```