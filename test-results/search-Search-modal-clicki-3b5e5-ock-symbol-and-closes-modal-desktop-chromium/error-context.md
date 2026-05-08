# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> Search modal >> clicking a stock suggestion navigates to /stock/[symbol] and closes modal
- Location: tests/e2e/search.spec.ts:70:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[href=\'/stock/ARMD\']').first()
    - locator resolved to <a href="/stock/ARMD" class="grid grid-cols-[1.6fr_auto] md:grid-cols-[1.6fr_0.8fr_0.7fr_auto] items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-3.5 hover:bg-white/[0.02] transition-colors">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="p-4 sm:p-5 border-b sm:border-b-0 sm:border-e border-[var(--border)] last:border-e-0">…</div> from <div dir="ltr" role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="p-4 sm:p-5 border-b sm:border-b-0 sm:border-e border-[var(--border)] last:border-e-0">…</div> from <div dir="ltr" role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="modal-backdrop fixed inset-0 bg-black/75 backdrop-blur-sm"></div> from <div dir="ltr" role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="p-4 sm:p-5 border-b sm:border-b-0 sm:border-e border-[var(--border)] last:border-e-0">…</div> from <div dir="ltr" role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="p-4 sm:p-5 border-b sm:border-b-0 sm:border-e border-[var(--border)] last:border-e-0">…</div> from <div dir="ltr" role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-5 sm:pb-7">…</div> from <div dir="ltr" role="dialog" aria-modal="true" class="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto">…</div> subtree intercepts pointer events
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
        - button "Log in" [ref=e31]
        - button "Create account" [ref=e32]
  - main [ref=e33]:
    - generic [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e38]: Shariah-aligned stock analysis
        - heading "Invest smarter, with Shariah confidence" [level=1] [ref=e41]:
          - generic [ref=e42]: Invest smarter,
          - generic [ref=e43]: with Shariah confidence
        - paragraph [ref=e45]: Murakkab+ delivers deep AI-powered analysis, precise Shariah filtering, and instant market insights across more than 1,300 stocks.
        - generic [ref=e47]:
          - button "Start free now" [ref=e48]:
            - text: Start free now
            - img [ref=e49]
          - link "Explore features" [ref=e51] [cursor=pointer]:
            - /url: "#features"
            - text: Explore features
            - img [ref=e52]
      - generic [ref=e57]:
        - generic [ref=e58]:
          - generic [ref=e63]: murakkab.app/dashboard
          - img [ref=e65]
        - generic [ref=e67]:
          - generic [ref=e68]:
            - img [ref=e69]
            - generic [ref=e72]: Search 1,500+ stocks...
          - generic [ref=e73]:
            - generic [ref=e74]:
              - img [ref=e75]
              - text: Quality 80+
            - generic [ref=e77]:
              - img [ref=e78]
              - text: Fair value
            - generic [ref=e80]:
              - img [ref=e81]
              - text: Shariah ✓
        - generic [ref=e83]:
          - generic [ref=e84]: Stock
          - generic [ref=e85]: Price
          - generic [ref=e86]: Trend
          - generic [ref=e87]: Score
        - generic [ref=e88]:
          - link "ARMD Armada Tech. Technology $142.18 +2.34% Q 92 V 78 Shariah compliant" [ref=e89] [cursor=pointer]:
            - /url: /stock/ARMD
            - generic [ref=e90]:
              - generic [ref=e91]: ARMD
              - generic [ref=e92]:
                - generic [ref=e93]: Armada Tech.
                - generic [ref=e94]: Technology
            - generic [ref=e95]:
              - generic [ref=e96]: $142.18
              - generic [ref=e97]: +2.34%
            - img [ref=e99]
            - generic [ref=e101]:
              - generic [ref=e102]:
                - generic [ref=e103]: Q
                - generic [ref=e104]: "92"
              - generic [ref=e105]:
                - generic [ref=e106]: V
                - generic [ref=e107]: "78"
              - generic "Shariah compliant" [ref=e108]:
                - img [ref=e109]
          - link "NEXV NexVision Energy Energy $89.42 +0.86% Q 88 V 65 Shariah compliant" [ref=e111] [cursor=pointer]:
            - /url: /stock/NEXV
            - generic [ref=e112]:
              - generic [ref=e113]: NEXV
              - generic [ref=e114]:
                - generic [ref=e115]: NexVision Energy
                - generic [ref=e116]: Energy
            - generic [ref=e117]:
              - generic [ref=e118]: $89.42
              - generic [ref=e119]: +0.86%
            - img [ref=e121]
            - generic [ref=e123]:
              - generic [ref=e124]:
                - generic [ref=e125]: Q
                - generic [ref=e126]: "88"
              - generic [ref=e127]:
                - generic [ref=e128]: V
                - generic [ref=e129]: "65"
              - generic "Shariah compliant" [ref=e130]:
                - img [ref=e131]
          - link "LUMN Lumen Industries Industrials $58.20 -0.41% Q 81 V 84 Shariah compliant" [ref=e133] [cursor=pointer]:
            - /url: /stock/LUMN
            - generic [ref=e134]:
              - generic [ref=e135]: LUMN
              - generic [ref=e136]:
                - generic [ref=e137]: Lumen Industries
                - generic [ref=e138]: Industrials
            - generic [ref=e139]:
              - generic [ref=e140]: $58.20
              - generic [ref=e141]: "-0.41%"
            - img [ref=e143]
            - generic [ref=e145]:
              - generic [ref=e146]:
                - generic [ref=e147]: Q
                - generic [ref=e148]: "81"
              - generic [ref=e149]:
                - generic [ref=e150]: V
                - generic [ref=e151]: "84"
              - generic "Shariah compliant" [ref=e152]:
                - img [ref=e153]
          - link "HELX Helix Health Healthcare $215.10 +1.18% Q 85 V 72 Shariah compliant" [ref=e155] [cursor=pointer]:
            - /url: /stock/HELX
            - generic [ref=e156]:
              - generic [ref=e157]: HELX
              - generic [ref=e158]:
                - generic [ref=e159]: Helix Health
                - generic [ref=e160]: Healthcare
            - generic [ref=e161]:
              - generic [ref=e162]: $215.10
              - generic [ref=e163]: +1.18%
            - img [ref=e165]
            - generic [ref=e167]:
              - generic [ref=e168]:
                - generic [ref=e169]: Q
                - generic [ref=e170]: "85"
              - generic [ref=e171]:
                - generic [ref=e172]: V
                - generic [ref=e173]: "72"
              - generic "Shariah compliant" [ref=e174]:
                - img [ref=e175]
          - link "ATLS Atlas Foods Consumer $36.95 +0.62% Q 79 V 69 Shariah compliant" [ref=e177] [cursor=pointer]:
            - /url: /stock/ATLS
            - generic [ref=e178]:
              - generic [ref=e179]: ATLS
              - generic [ref=e180]:
                - generic [ref=e181]: Atlas Foods
                - generic [ref=e182]: Consumer
            - generic [ref=e183]:
              - generic [ref=e184]: $36.95
              - generic [ref=e185]: +0.62%
            - img [ref=e187]
            - generic [ref=e189]:
              - generic [ref=e190]:
                - generic [ref=e191]: Q
                - generic [ref=e192]: "79"
              - generic [ref=e193]:
                - generic [ref=e194]: V
                - generic [ref=e195]: "69"
              - generic "Shariah compliant" [ref=e196]:
                - img [ref=e197]
        - generic [ref=e199]:
          - generic [ref=e200]: Showing 5 of 1,547 results
          - generic [ref=e203]: Live
      - generic [ref=e204]:
        - generic [ref=e206]:
          - generic [ref=e207]: 1,300+
          - generic [ref=e208]: US-listed stocks
        - generic [ref=e210]:
          - generic [ref=e211]: 3 filters
          - generic [ref=e212]: for clear evaluation
        - generic [ref=e214]:
          - generic [ref=e215]: AI
          - generic [ref=e216]: powered analysis
      - paragraph [ref=e219]: Trusted by thousands of investors
    - generic [ref=e222]:
      - generic [ref=e223]:
        - generic [ref=e225]: Problem & solution
        - heading "Plenty of opportunities — but reaching the right one isn't easy" [level=2] [ref=e228]
      - generic [ref=e229]:
        - paragraph [ref=e231]: The market is full of stocks, opinions and noise. The real challenge isn't only finding a winning opportunity — it's avoiding the costly mistakes that can drain your capital.
        - paragraph [ref=e233]: Murakkab is built to give you the clarity you need to narrow the market, helping you spot promising opportunities and avoid uncalculated risks against clear, measurable criteria.
    - generic [ref=e236]:
      - generic [ref=e237]:
        - generic [ref=e239]: Triple filter
        - heading "3 core factors to evaluate any stock with clarity" [level=2] [ref=e242]
        - paragraph [ref=e244]: An analytical framework built to give you the full picture before you decide.
      - generic [ref=e245]:
        - generic [ref=e246]:
          - article [ref=e248]:
            - generic [ref=e249]:
              - img [ref=e251]
              - generic [ref=e253]: "01"
            - heading "Quality" [level=3] [ref=e254]
            - paragraph [ref=e255]: Understand the company's strength and financial fundamentals.
          - article [ref=e257]:
            - generic [ref=e258]:
              - img [ref=e260]
              - generic [ref=e263]: "02"
            - heading "Fair value" [level=3] [ref=e264]
            - paragraph [ref=e265]: Know whether the current price is genuinely attractive.
          - article [ref=e267]:
            - generic [ref=e268]:
              - img [ref=e270]
              - generic [ref=e273]: "03"
            - heading "Shariah compliance" [level=3] [ref=e274]
            - paragraph [ref=e275]: Filter stocks against rigorous Shariah criteria.
        - generic [ref=e279]:
          - generic [ref=e280]:
            - generic [ref=e281]:
              - generic [ref=e282]: ARMD
              - generic [ref=e283]:
                - generic [ref=e284]: Armada Tech.
                - generic [ref=e285]: NYSE · Technology
            - generic [ref=e286]:
              - generic [ref=e287]: $142.18
              - generic [ref=e288]: +2.34%
          - generic [ref=e289]:
            - generic [ref=e290]:
              - generic [ref=e291]:
                - img [ref=e292]
                - generic [ref=e296]: "92"
              - generic [ref=e297]: Quality
            - generic [ref=e298]:
              - generic [ref=e299]:
                - img [ref=e300]
                - generic [ref=e304]: "78"
              - generic [ref=e305]: Value
            - generic [ref=e306]:
              - img [ref=e308]
              - generic [ref=e310]: Shariah
          - generic [ref=e311]:
            - generic [ref=e312]:
              - generic [ref=e313]: P/E
              - generic [ref=e314]: "18.4"
            - generic [ref=e315]:
              - generic [ref=e316]: Revenue growth
              - generic [ref=e317]: +14.2%
            - generic [ref=e318]:
              - generic [ref=e319]: Profit margin
              - generic [ref=e320]: 23.1%
    - generic [ref=e323]:
      - generic [ref=e324]:
        - generic [ref=e326]: Platform tools
        - heading "Practical tools to understand a stock before deciding" [level=2] [ref=e329]
        - paragraph [ref=e331]: Murakkab gives you everything you need to analyze stocks fast and clearly — in one place.
      - list [ref=e332]:
        - listitem [ref=e333]:
          - generic [ref=e334]:
            - img [ref=e336]
            - generic [ref=e339]: Search across 1,500+ US-listed stocks
        - listitem [ref=e340]:
          - generic [ref=e341]:
            - img [ref=e343]
            - generic [ref=e345]: Filter results by your investment criteria
        - listitem [ref=e346]:
          - generic [ref=e347]:
            - img [ref=e349]
            - generic [ref=e352]: Compare companies side by side
        - listitem [ref=e353]:
          - generic [ref=e354]:
            - img [ref=e356]
            - generic [ref=e359]: See the reasoning behind every rating
        - listitem [ref=e360]:
          - generic [ref=e361]:
            - img [ref=e363]
            - generic [ref=e365]: Stay current with market analysis and insights
      - link "See pricing" [ref=e368] [cursor=pointer]:
        - /url: "#pricing"
        - text: See pricing
        - img [ref=e369]
      - generic [ref=e373]:
        - generic [ref=e374]:
          - generic [ref=e375]: AI
          - heading "Powered by AI that accelerates analysis" [level=3] [ref=e376]
          - paragraph [ref=e377]: Murakkab uses AI to process data and surface what matters fast — so you reach the most important insights in less time.
        - generic [ref=e380]:
          - generic [ref=e381]:
            - generic [ref=e382]: AI
            - generic [ref=e383]:
              - generic [ref=e384]: AI summary
              - generic [ref=e385]: Generated in 0.4s
          - list [ref=e387]:
            - listitem [ref=e388]:
              - img [ref=e390]
              - generic [ref=e392]: Strong fundamentals with 14% YoY revenue growth
            - listitem [ref=e393]:
              - img [ref=e395]
              - generic [ref=e397]: Current price near fair-value range
            - listitem [ref=e398]:
              - img [ref=e400]
              - generic [ref=e402]: Compliant with all reference Shariah criteria
    - generic [ref=e405]:
      - generic [ref=e407]: Methodology
      - heading "Analysis grounded in method, not impressions" [level=2] [ref=e410]
      - generic [ref=e411]:
        - paragraph [ref=e413]: Every rating inside Murakkab is built on a clear analytical framework
        - paragraph [ref=e415]: designed to help investors understand a stock at a deeper level
        - paragraph [ref=e417]: instead of relying on noise or fleeting recommendations.
      - link "Read our methodology" [ref=e420] [cursor=pointer]:
        - /url: "#articles"
        - text: Read our methodology
        - img [ref=e421]
    - generic [ref=e425]:
      - generic [ref=e426]:
        - generic [ref=e427]:
          - generic [ref=e429]: Analysis articles
          - heading "Content that builds your investment understanding" [level=2] [ref=e432]
          - paragraph [ref=e434]: Practical guides and analytical articles from our research team.
        - link "Browse all articles" [ref=e436] [cursor=pointer]:
          - /url: "#"
          - text: Browse all articles
          - img [ref=e437]
      - generic [ref=e439]:
        - link "Practical guide How to evaluate a tech stock before investing Research team 8 min read" [ref=e441] [cursor=pointer]:
          - /url: /article/how-to-evaluate-a-tech-stock-before-investing
          - generic [ref=e442]:
            - img [ref=e443]
            - generic [ref=e445]: Practical guide
          - generic [ref=e446]:
            - heading "How to evaluate a tech stock before investing" [level=3] [ref=e447]
            - generic [ref=e448]:
              - generic [ref=e449]: Research team
              - generic [ref=e450]:
                - img [ref=e451]
                - text: 8 min read
        - link "Fundamentals Book value vs. market value explained Research team 5 min read" [ref=e455] [cursor=pointer]:
          - /url: /article/book-value-vs-market-value-explained
          - generic [ref=e456]:
            - img [ref=e457]
            - generic [ref=e459]: Fundamentals
          - generic [ref=e460]:
            - heading "Book value vs. market value explained" [level=3] [ref=e461]
            - generic [ref=e462]:
              - generic [ref=e463]: Research team
              - generic [ref=e464]:
                - img [ref=e465]
                - text: 5 min read
        - link "Indicators 5 financial indicators every investor should know Research team 10 min read" [ref=e469] [cursor=pointer]:
          - /url: /article/5-financial-indicators-every-investor-should-know
          - generic [ref=e470]:
            - img [ref=e471]
            - generic [ref=e473]: Indicators
          - generic [ref=e474]:
            - heading "5 financial indicators every investor should know" [level=3] [ref=e475]
            - generic [ref=e476]:
              - generic [ref=e477]: Research team
              - generic [ref=e478]:
                - img [ref=e479]
                - text: 10 min read
        - link "Technology The role of AI in stock analysis Research team 7 min read" [ref=e483] [cursor=pointer]:
          - /url: /article/the-role-of-ai-in-stock-analysis
          - generic [ref=e484]:
            - img [ref=e485]
            - generic [ref=e487]: Technology
          - generic [ref=e488]:
            - heading "The role of AI in stock analysis" [level=3] [ref=e489]
            - generic [ref=e490]:
              - generic [ref=e491]: Research team
              - generic [ref=e492]:
                - img [ref=e493]
                - text: 7 min read
    - generic [ref=e498]:
      - generic [ref=e499]:
        - generic [ref=e500]:
          - generic [ref=e502]: Latest news
          - heading "Market updates & platform news" [level=2] [ref=e505]
          - paragraph [ref=e507]: Stay current with real-time updates and analysis.
        - link "Read all news" [ref=e509] [cursor=pointer]:
          - /url: "#"
          - text: Read all news
          - img [ref=e510]
      - generic [ref=e512]:
        - link "Platform update May 5, 2026 200 new stocks added to the Murakkab+ database Coverage now extends to renewable energy and smart infrastructure sectors. Read more" [ref=e514] [cursor=pointer]:
          - /url: /article/200-new-stocks-added-to-the-murakkab-database
          - generic [ref=e515]:
            - generic [ref=e516]: Platform update
            - generic [ref=e517]: May 5, 2026
          - heading "200 new stocks added to the Murakkab+ database" [level=3] [ref=e518]
          - paragraph [ref=e519]: Coverage now extends to renewable energy and smart infrastructure sectors.
          - generic [ref=e520]:
            - generic [ref=e521]: Read more
            - img [ref=e522]
        - link "Market analysis May 1, 2026 US market performance summary for April A quick look at winning and losing sectors and the most promising opportunities. Read more" [ref=e525] [cursor=pointer]:
          - /url: /article/us-market-performance-summary-for-april
          - generic [ref=e526]:
            - generic [ref=e527]: Market analysis
            - generic [ref=e528]: May 1, 2026
          - heading "US market performance summary for April" [level=3] [ref=e529]
          - paragraph [ref=e530]: A quick look at winning and losing sectors and the most promising opportunities.
          - generic [ref=e531]:
            - generic [ref=e532]: Read more
            - img [ref=e533]
        - link "Shariah standards Apr 22, 2026 AAOIFI Shariah compliance standards update We've adopted the latest AAOIFI 2026 standards into our automated filter. Read more" [ref=e536] [cursor=pointer]:
          - /url: /article/aaoifi-shariah-compliance-standards-update
          - generic [ref=e537]:
            - generic [ref=e538]: Shariah standards
            - generic [ref=e539]: Apr 22, 2026
          - heading "AAOIFI Shariah compliance standards update" [level=3] [ref=e540]
          - paragraph [ref=e541]: We've adopted the latest AAOIFI 2026 standards into our automated filter.
          - generic [ref=e542]:
            - generic [ref=e543]: Read more
            - img [ref=e544]
        - link "New feature Apr 10, 2026 Advanced comparison tool launched Compare up to 4 stocks at once across 12 financial and Shariah indicators. Read more" [ref=e547] [cursor=pointer]:
          - /url: /article/advanced-comparison-tool-launched
          - generic [ref=e548]:
            - generic [ref=e549]: New feature
            - generic [ref=e550]: Apr 10, 2026
          - heading "Advanced comparison tool launched" [level=3] [ref=e551]
          - paragraph [ref=e552]: Compare up to 4 stocks at once across 12 financial and Shariah indicators.
          - generic [ref=e553]:
            - generic [ref=e554]: Read more
            - img [ref=e555]
    - generic [ref=e559]:
      - generic [ref=e560]:
        - generic [ref=e562]: Testimonials
        - heading "What Murakkab users say" [level=2] [ref=e565]
      - link "Join thousands of investors" [ref=e568] [cursor=pointer]:
        - /url: "#pricing"
        - text: Join thousands of investors
        - img [ref=e569]
      - generic [ref=e571]:
        - figure [ref=e572]:
          - generic [ref=e573]:
            - img [ref=e574]
            - blockquote [ref=e576]: I now grasp a stock's position in minutes instead of hours of reading. The criteria are clear and easy to follow.
            - generic [ref=e577]:
              - generic [ref=e578]: A
              - generic [ref=e579]:
                - generic [ref=e580]: Abdulaziz Al-Rashid
                - generic [ref=e581]: Individual investor
        - figure [ref=e582]:
          - generic [ref=e583]:
            - img [ref=e584]
            - blockquote [ref=e586]: The Shariah compliance filter alone is worth the subscription. I no longer need to dig through it myself.
            - generic [ref=e587]:
              - generic [ref=e588]: H
              - generic [ref=e589]:
                - generic [ref=e590]: Hind Al-Otaibi
                - generic [ref=e591]: Financial analyst
        - figure [ref=e592]:
          - generic [ref=e593]:
            - img [ref=e594]
            - blockquote [ref=e596]: Comparing companies became a one-click job. This is what I've been searching for for years.
            - generic [ref=e597]:
              - generic [ref=e598]: M
              - generic [ref=e599]:
                - generic [ref=e600]: Majed Al-Qahtani
                - generic [ref=e601]: Long-term investor
        - figure [ref=e602]:
          - generic [ref=e603]:
            - img [ref=e604]
            - blockquote [ref=e606]: Murakkab's analysis helped me avoid several rushed decisions. The benefit far exceeded the subscription cost.
            - generic [ref=e607]:
              - generic [ref=e608]: "N"
              - generic [ref=e609]:
                - generic [ref=e610]: Noura Al-Zahrani
                - generic [ref=e611]: Portfolio owner
    - generic [ref=e614]:
      - generic [ref=e615]:
        - generic [ref=e617]: Plans
        - heading "Choose the plan that fits you" [level=2] [ref=e620]
        - paragraph [ref=e622]: Start free or get the full power of the Murakkab+ platform.
        - generic [ref=e624]:
          - button "Monthly" [ref=e625]
          - button "Annual" [pressed] [ref=e626]
      - generic [ref=e627]:
        - article [ref=e629]:
          - heading "Basic" [level=3] [ref=e630]
          - paragraph [ref=e631]: Start your investment journey for free.
          - generic [ref=e633]:
            - generic [ref=e634]: Free
            - generic [ref=e635]: forever
          - list [ref=e636]:
            - listitem [ref=e637]:
              - img [ref=e639]
              - generic [ref=e641]: 5+ free analytical articles per month on financial markets and stocks
            - listitem [ref=e642]:
              - img [ref=e644]
              - generic [ref=e646]: Advanced stock filtering tools
            - listitem [ref=e647]:
              - img [ref=e649]
              - generic [ref=e651]: Access to fair value of stocks
            - listitem [ref=e652]:
              - img [ref=e654]
              - generic [ref=e656]: Deep financial analysis with interactive charts
            - listitem [ref=e657]:
              - img [ref=e659]
              - generic [ref=e661]: AI-powered article summaries
          - button "Start now" [ref=e663]
        - article [ref=e665]:
          - generic [ref=e666]:
            - img [ref=e667]
            - text: Most popular
          - heading "Premium" [level=3] [ref=e669]
          - paragraph [ref=e670]: For the serious investor who wants the best.
          - generic [ref=e671]:
            - generic [ref=e672]:
              - generic [ref=e673]: $420
              - generic [ref=e674]: $199.00
            - generic [ref=e675]:
              - generic [ref=e676]: /year
              - generic [ref=e677]: Save 52%
          - list [ref=e678]:
            - listitem [ref=e679]:
              - img [ref=e681]
              - generic [ref=e683]: All free features
            - listitem [ref=e684]:
              - img [ref=e686]
              - generic [ref=e688]: Full access to all analyses
            - listitem [ref=e689]:
              - img [ref=e691]
              - generic [ref=e693]: Advanced AI tools
            - listitem [ref=e694]:
              - img [ref=e696]
              - generic [ref=e698]: Professional Shariah and quality filtering
            - listitem [ref=e699]:
              - img [ref=e701]
              - generic [ref=e703]: Exclusive expert insights
            - listitem [ref=e704]:
              - img [ref=e706]
              - generic [ref=e708]: Real-time price alerts
          - button "Subscribe now" [ref=e710]
  - contentinfo [ref=e711]:
    - generic [ref=e712]:
      - generic [ref=e713]:
        - heading "Start making clearer investment decisions" [level=3] [ref=e714]
        - link "Subscribe now" [ref=e716] [cursor=pointer]:
          - /url: "#pricing"
          - text: Subscribe now
          - img [ref=e717]
      - generic [ref=e719]:
        - generic [ref=e720]:
          - generic [ref=e721]:
            - img [ref=e723]
            - generic [ref=e725]: Murakkab+
          - paragraph [ref=e726]: Shariah-aligned stock analysis platform
          - paragraph [ref=e727]: Content is for educational and analytical purposes and is not investment advice.
        - generic [ref=e728]:
          - generic [ref=e729]:
            - generic [ref=e730]: Explore
            - list [ref=e731]:
              - listitem [ref=e732]:
                - link "Why Murakkab" [ref=e733] [cursor=pointer]:
                  - /url: "#problem"
              - listitem [ref=e734]:
                - link "Filters" [ref=e735] [cursor=pointer]:
                  - /url: "#filters"
              - listitem [ref=e736]:
                - link "Features" [ref=e737] [cursor=pointer]:
                  - /url: "#features"
              - listitem [ref=e738]:
                - link "Pricing" [ref=e739] [cursor=pointer]:
                  - /url: "#pricing"
          - generic [ref=e740]:
            - generic [ref=e741]: Company
            - list [ref=e742]:
              - listitem [ref=e743]:
                - link "About" [ref=e744] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e745]:
                - link "Contact" [ref=e746] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e747]:
            - generic [ref=e748]: Legal
            - list [ref=e749]:
              - listitem [ref=e750]:
                - link "Privacy" [ref=e751] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e752]:
                - link "Terms" [ref=e753] [cursor=pointer]:
                  - /url: "#"
      - generic [ref=e754]:
        - generic [ref=e755]: © 2026 Murakkab+. All rights reserved.
        - generic [ref=e756]:
          - link "Twitter" [ref=e757] [cursor=pointer]:
            - /url: "#"
            - img [ref=e758]
          - link "LinkedIn" [ref=e760] [cursor=pointer]:
            - /url: "#"
            - img [ref=e761]
  - button "Open Next.js Dev Tools" [ref=e768] [cursor=pointer]:
    - img [ref=e769]
  - alert [ref=e772]
  - dialog [ref=e773]:
    - generic [ref=e775]:
      - generic [ref=e776]:
        - button "Close" [ref=e777]:
          - img [ref=e778]
        - generic [ref=e780]:
          - heading "Browse 71,300+ stocks" [level=2] [ref=e781]
          - paragraph [ref=e782]: 1,514 stocks fully covered by our research team.
        - generic [ref=e783]:
          - img [ref=e784]
          - searchbox "Search stocks by name or symbol..." [active] [ref=e787]
          - generic [ref=e788]: Esc
        - generic [ref=e789]:
          - generic [ref=e791]: Suggested stocks
          - generic [ref=e793]:
            - link "ARMD Armada Tech. Technology 92" [ref=e794] [cursor=pointer]:
              - /url: /stock/ARMD
              - generic [ref=e795]: ARMD
              - generic [ref=e796]:
                - generic [ref=e797]: Armada Tech.
                - generic [ref=e798]: Technology
              - generic [ref=e799]: "92"
            - link "NEXV NexVision Energy Energy 88" [ref=e800] [cursor=pointer]:
              - /url: /stock/NEXV
              - generic [ref=e801]: NEXV
              - generic [ref=e802]:
                - generic [ref=e803]: NexVision Energy
                - generic [ref=e804]: Energy
              - generic [ref=e805]: "88"
            - link "LUMN Lumen Industries Industrials 81" [ref=e806] [cursor=pointer]:
              - /url: /stock/LUMN
              - generic [ref=e807]: LUMN
              - generic [ref=e808]:
                - generic [ref=e809]: Lumen Industries
                - generic [ref=e810]: Industrials
              - generic [ref=e811]: "81"
            - link "HELX Helix Health Healthcare 85" [ref=e812] [cursor=pointer]:
              - /url: /stock/HELX
              - generic [ref=e813]: HELX
              - generic [ref=e814]:
                - generic [ref=e815]: Helix Health
                - generic [ref=e816]: Healthcare
              - generic [ref=e817]: "85"
      - generic [ref=e819]:
        - button "Stock filters" [expanded] [ref=e820]:
          - generic [ref=e821]:
            - img [ref=e823]
            - generic [ref=e825]: Stock filters
          - img [ref=e828]
        - generic [ref=e832]:
          - generic [ref=e833]:
            - generic [ref=e834]:
              - generic [ref=e835]: Sector
              - generic "Pick the market sector you care about." [ref=e836]:
                - img [ref=e837]
            - generic [ref=e840]:
              - button "Energy" [ref=e841]:
                - generic [ref=e842]: Energy
              - button "Business services" [ref=e844]:
                - generic [ref=e845]: Business services
              - button "Insurance" [ref=e847]:
                - generic [ref=e848]: Insurance
              - button "Industrial" [ref=e850]:
                - generic [ref=e851]: Industrial
              - button "Technology" [ref=e853]:
                - generic [ref=e854]: Technology
              - button "Healthcare" [ref=e856]:
                - generic [ref=e857]: Healthcare
          - generic [ref=e859]:
            - generic [ref=e860]:
              - generic [ref=e861]: Shariah compliance
              - generic "Filter stocks against the Shariah standards." [ref=e862]:
                - img [ref=e863]
            - generic [ref=e866]:
              - button "Doubtful Needs additional review against Shariah rules." [ref=e867]:
                - generic [ref=e868]:
                  - img [ref=e870]
                  - generic [ref=e873]:
                    - generic [ref=e874]: Doubtful
                    - generic [ref=e875]: Needs additional review against Shariah rules.
              - button "Non-compliant Does not meet the certified Shariah standards. → Log in to access" [ref=e876]:
                - generic [ref=e877]:
                  - img [ref=e879]
                  - generic [ref=e882]:
                    - generic [ref=e883]: Non-compliant
                    - generic [ref=e884]: Does not meet the certified Shariah standards.
                    - generic [ref=e885]:
                      - generic [ref=e886]: →
                      - generic [ref=e887]: Log in to access
                - img [ref=e889]
              - button "Compliant Meets the certified Shariah standards." [ref=e892]:
                - generic [ref=e893]:
                  - img [ref=e895]
                  - generic [ref=e898]:
                    - generic [ref=e899]: Compliant
                    - generic [ref=e900]: Meets the certified Shariah standards.
          - generic [ref=e901]:
            - generic [ref=e902]:
              - generic [ref=e903]: Stock quality
              - generic "Assess the company's operational and financial strength." [ref=e904]:
                - img [ref=e905]
            - generic [ref=e908]:
              - button "Low quality Operational and financial quality below standard." [ref=e909]:
                - generic [ref=e910]:
                  - img [ref=e912]
                  - generic [ref=e915]:
                    - generic [ref=e916]: Low quality
                    - generic [ref=e917]: Operational and financial quality below standard.
              - button "Worth attention Healthy balance between growth and stability. → Log in to access" [ref=e918]:
                - generic [ref=e919]:
                  - img [ref=e921]
                  - generic [ref=e923]:
                    - generic [ref=e924]: Worth attention
                    - generic [ref=e925]: Healthy balance between growth and stability.
                    - generic [ref=e926]:
                      - generic [ref=e927]: →
                      - generic [ref=e928]: Log in to access
                - img [ref=e930]
              - button "High quality Strong fundamentals and solid financial performance." [ref=e933]:
                - generic [ref=e934]:
                  - img [ref=e936]
                  - generic [ref=e939]:
                    - generic [ref=e940]: High quality
                    - generic [ref=e941]: Strong fundamentals and solid financial performance.
          - generic [ref=e942]:
            - generic [ref=e943]:
              - generic [ref=e944]: Valuation
              - generic "Is the current price aligned with the stock's value?" [ref=e945]:
                - img [ref=e946]
            - generic [ref=e949]:
              - button "Above fair value Stock may be overvalued at current price." [ref=e950]:
                - generic [ref=e951]:
                  - img [ref=e953]
                  - generic [ref=e956]:
                    - generic [ref=e957]: Above fair value
                    - generic [ref=e958]: Stock may be overvalued at current price.
              - button "Fairly valued Trading near fair value. → Log in to access" [ref=e959]:
                - generic [ref=e960]:
                  - img [ref=e962]
                  - generic [ref=e965]:
                    - generic [ref=e966]: Fairly valued
                    - generic [ref=e967]: Trading near fair value.
                    - generic [ref=e968]:
                      - generic [ref=e969]: →
                      - generic [ref=e970]: Log in to access
                - img [ref=e972]
              - button "Below fair value Stock may be undervalued." [ref=e975]:
                - generic [ref=e976]:
                  - img [ref=e978]
                  - generic [ref=e981]:
                    - generic [ref=e982]: Below fair value
                    - generic [ref=e983]: Stock may be undervalued.
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { setEnglish, seedLoggedInUser, clearAuth } from "./_helpers";
  3  | 
  4  | const SEARCH_PLACEHOLDER = "Search stocks by name or symbol...";
  5  | 
  6  | test.describe("Search modal", () => {
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await setEnglish(page);
  9  |     await clearAuth(page);
  10 |   });
  11 | 
  12 |   test("Cmd+K opens search modal and Esc closes it", async ({ page, browserName }) => {
  13 |     await page.goto("/");
  14 |     // Modifier differs per OS, but Playwright's chromium on macOS supports both
  15 |     await page.keyboard.press("Meta+k");
  16 |     await expect(page.getByRole("dialog")).toBeVisible();
  17 |     await expect(page.getByPlaceholder(SEARCH_PLACEHOLDER)).toBeVisible();
  18 |     await page.keyboard.press("Escape");
  19 |     await expect(page.getByRole("dialog")).toBeHidden();
  20 |   });
  21 | 
  22 |   test("Open search via navbar trigger", async ({ page }) => {
  23 |     await page.goto("/");
  24 |     await page.getByRole("button", { name: /Open search/i }).first().click();
  25 |     await expect(page.getByRole("dialog")).toBeVisible();
  26 |   });
  27 | 
  28 |   test("typing a query filters suggestions; non-matching shows 'No results'", async ({ page }) => {
  29 |     await page.goto("/");
  30 |     await page.keyboard.press("Meta+k");
  31 |     const input = page.getByPlaceholder(SEARCH_PLACEHOLDER);
  32 |     await input.fill("ARMD");
  33 |     await expect(page.locator("[href='/stock/ARMD']").first()).toBeVisible();
  34 | 
  35 |     await input.fill("ZZZZZZZZ");
  36 |     await expect(page.getByText(/No results found for/i)).toBeVisible();
  37 |   });
  38 | 
  39 |   test("anonymous user clicks a 'Log in to access' premium-locked filter → opens auth modal", async ({ page }) => {
  40 |     await page.goto("/");
  41 |     await page.keyboard.press("Meta+k");
  42 |     // The Non-compliant filter is premium=login. Click its card.
  43 |     const lockedCard = page.getByRole("button", { name: /Non-compliant/ }).first();
  44 |     await expect(lockedCard).toBeVisible();
  45 |     await lockedCard.click();
  46 |     // Search closes, AuthModal opens
  47 |     await expect(page.getByPlaceholder("Email address")).toBeVisible();
  48 |   });
  49 | 
  50 |   test("free user clicks 'Upgrade to access' filter → search closes, scrolls to #pricing", async ({ page }) => {
  51 |     await seedLoggedInUser(page, "free");
  52 |     await page.goto("/");
  53 |     await page.keyboard.press("Meta+k");
  54 |     const upgradeCard = page.getByRole("button", { name: /Worth attention|Fairly valued/ }).first();
  55 |     await upgradeCard.click();
  56 |     // Search modal closes
  57 |     await expect(page.locator(".modal-content").first()).toBeHidden({ timeout: 5_000 });
  58 |     await expect(page.locator("#pricing")).toBeInViewport();
  59 |   });
  60 | 
  61 |   test("activate a sector filter → Apply → results view shows results + chips", async ({ page }) => {
  62 |     await page.goto("/");
  63 |     await page.keyboard.press("Meta+k");
  64 |     await page.getByRole("button", { name: /^Technology$/ }).click();
  65 |     await page.getByRole("button", { name: /Apply filters \(\d/ }).click();
  66 |     await expect(page.getByRole("heading", { name: /^Search results/ })).toBeVisible();
  67 |     await expect(page.getByText(/^Technology$/).first()).toBeVisible();
  68 |   });
  69 | 
  70 |   test("clicking a stock suggestion navigates to /stock/[symbol] and closes modal", async ({ page }) => {
  71 |     await page.goto("/");
  72 |     await page.keyboard.press("Meta+k");
  73 |     const card = page.locator("[href='/stock/ARMD']").first();
  74 |     await expect(card).toBeVisible();
> 75 |     await card.click();
     |                ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  76 |     await expect(page).toHaveURL(/\/stock\/ARMD$/);
  77 |   });
  78 | });
  79 | 
```