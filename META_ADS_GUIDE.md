# Naukri Junction — Complete Meta Ads Setup Guide
### From Pixel to Paying Customers

---

## TABLE OF CONTENTS

1. [Part 1 — Pixel & Events Manager Setup](#part-1--pixel--events-manager-setup)
2. [Part 2 — Verify Your Events Are Firing](#part-2--verify-your-events-are-firing)
3. [Part 3 — Conversions API & Advanced Matching](#part-3--conversions-api--advanced-matching)
4. [Part 4 — Custom Conversions Setup](#part-4--custom-conversions-setup)
5. [Part 5 — First Campaign Setup (Get Leads)](#part-5--first-campaign-setup-get-leads)
6. [Part 6 — Audience Targeting for India Job Market](#part-6--audience-targeting-for-india-job-market)
7. [Part 7 — Ad Creative That Actually Works](#part-7--ad-creative-that-actually-works)
8. [Part 8 — Budget & Bidding Strategy](#part-8--budget--bidding-strategy)
9. [Part 9 — After 50 Leads — Scale & Retarget](#part-9--after-50-leads--scale--retarget)
10. [Part 10 — Paying Customer Lookalike (Most Powerful)](#part-10--paying-customer-lookalike-most-powerful)
11. [Part 11 — Bypass Facebook Errors & Ad Rejections](#part-11--bypass-facebook-errors--ad-rejections)
12. [Part 12 — Account Health & Safety](#part-12--account-health--safety)
13. [Part 13 — Troubleshooting Common Issues](#part-13--troubleshooting-common-issues)

---

## PART 1 — PIXEL & EVENTS MANAGER SETUP

### Step 1.1 — Create Your Meta Business Account
1. Go to **business.facebook.com**
2. Click **Create Account**
3. Enter business name: `Naukri Junction`
4. Enter your name and business email
5. Complete verification

> **Important:** Always use a Business Account, never a personal account for running ads. Personal accounts get banned more easily and you lose everything.

### Step 1.2 — Create Your Pixel
1. Go to **Events Manager** → [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
2. Click **Connect Data Sources** → **Web**
3. Select **Meta Pixel** → Click **Connect**
4. Name it: `Naukri Junction Pixel`
5. Enter your website URL
6. Click **Continue**

### Step 1.3 — Get Your Pixel ID
1. After creating the pixel, you'll see a **Pixel ID** (a 15-16 digit number)
2. Copy this number
3. In your website's `.env.local` file, set:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here
   META_PIXEL_ID=your_pixel_id_here
   ```
4. Your website code is already set up — it will immediately start firing events

### Step 1.4 — Get Your Access Token (for Conversions API)
1. In Events Manager → your pixel → **Settings** tab
2. Scroll down to **Conversions API**
3. Click **Generate Access Token**
4. Copy the token
5. In `.env.local`:
   ```
   META_ACCESS_TOKEN=your_token_here
   ```
6. Redeploy your website

> **Why this matters:** The Conversions API sends data directly from your server to Meta, bypassing iOS ad blockers. This recovers 20–30% of conversions that would otherwise be invisible to Meta.

---

## PART 2 — VERIFY YOUR EVENTS ARE FIRING

### Step 2.1 — Use Test Events Tool
1. Events Manager → your pixel → **Test Events** tab
2. Enter your website URL in the box → Click **Open Website**
3. Your website opens in a new tab
4. Watch the Test Events panel — you should see:
   - `PageView` appear within 2 seconds of the page loading
   - Submit the test form → `Lead` should appear within 5 seconds
   - It should appear **once** (not twice — deduplication is now fixed in your code)

### Step 2.2 — Check Event Match Quality (EMQ)
1. Events Manager → **Overview** tab
2. Look for **Event Match Quality** score next to each event
3. Your target scores:
   - `PageView` — any score is fine
   - `Lead` — target **6.0 or above** (your code sends hashed phone + name + city, so expect 7–8)
   - `Purchase` — target **7.0 or above**
4. Higher EMQ = Meta can match your leads to real Facebook profiles = better ad targeting

### Step 2.3 — Check for Duplicate Events
1. Events Manager → **Overview**
2. Look at the **Deduplication** column
3. If it shows events being deduplicated — good, it means both browser and server fired and Meta is correctly counting as one
4. If you see 2x the expected count — the `event_id` is not matching (check your `.env` variables are set)

### Step 2.4 — Install Meta Pixel Helper (Chrome Extension)
1. Search "Meta Pixel Helper" on Chrome Web Store → Install
2. Visit your website
3. Click the blue extension icon in Chrome
4. It shows all pixel events firing on the page in real time
5. Green checkmarks = firing correctly. Red = problem.

---

## PART 3 — CONVERSIONS API & ADVANCED MATCHING

### Step 3.1 — Enable Advanced Matching
1. Events Manager → your pixel → **Settings** tab
2. Scroll to **Advanced Matching**
3. Toggle it **ON** for all fields available
4. Your code already sends hashed: `phone`, `first name`, `last name`, `city`
5. This allows Meta to match your leads to Facebook profiles even without cookies

### Step 3.2 — Verify CAPI is Working
1. Events Manager → **Overview**
2. Under your Lead event, look for **Received via** column
3. You should see both **Browser** and **Server** listed
4. This confirms your dual tracking (browser pixel + server CAPI) is working

### Step 3.3 — Check Signal Quality
1. Events Manager → **Overview** → click on **Lead** event
2. Check **Signal Quality** — aim for **High**
3. If it shows **Low**, the issue is usually:
   - Access token expired → regenerate it in Settings
   - `.env` variable not set correctly
   - Server-side code not running (check API route logs)

---

## PART 4 — CUSTOM CONVERSIONS SETUP

Custom conversions let you track specific actions and optimize your campaigns precisely.

### Step 4.1 — Create "Job Application Lead" Custom Conversion
1. Events Manager → left sidebar → **Custom Conversions** → **Create Custom Conversion**
2. Configure:
   - **Name:** `Job Application Lead`
   - **Data Source:** Your pixel
   - **Conversion Event:** `Lead`
   - **URL Rule:** `URL contains` → your domain (e.g., `naukrijunction.com`)
   - **Category:** Lead
   - **Value:** ₹999 (or your average charge per placement)
3. Click **Create**

### Step 4.2 — Create "Paying Customer" Custom Conversion
1. Create another custom conversion:
   - **Name:** `Paying Customer`
   - **Conversion Event:** `Purchase`
   - **Category:** Purchase
   - **Value:** Use value from event (your code sends the actual amount)
2. Click **Create**

### Step 4.3 — Set Conversion Value Rules (Optional but Powerful)
1. Events Manager → **Conversion Value Rules** → **Create Rule**
2. This lets you tell Meta that leads from certain cities or job types are worth more
3. Example: Lead from Delhi = ₹1500, Lead from small city = ₹500
4. Meta will automatically optimize toward higher-value leads

---

## PART 5 — FIRST CAMPAIGN SETUP (GET LEADS)

### Step 5.1 — Create Your First Campaign
1. Go to **Ads Manager** → [adsmanager.facebook.com](https://adsmanager.facebook.com)
2. Click **Create** → **Campaign**
3. **Objective:** Select **Sales** (not Leads, not Traffic)
   > Why Sales and not Leads? The "Sales" objective uses your pixel's Purchase and Lead events together. It finds people who are most likely to both submit the form AND pay — which is exactly your goal.
4. **Campaign Name:** `NJ - Lead Gen - India - V1`
5. **Special Ad Category:** Select **Employment**
   > This is mandatory. Facebook requires you to declare employment ads. Skipping this = instant rejection + potential account ban.
6. **Budget Type:** Campaign Budget Optimization (CBO) — ON
7. **Daily Budget:** ₹500 to start
8. Click **Next**

### Step 5.2 — Ad Set Configuration
1. **Ad Set Name:** `India - 18-40 - Advantage+`
2. **Conversion Location:** Website
3. **Pixel:** Select your Naukri Junction pixel
4. **Conversion Event:** `Lead`
5. **Performance Goal:** Maximize number of conversions

**Scheduling:**
- Run ads continuously
- No end date
- Best hours for India job ads: 8am–11am and 7pm–11pm (but let Meta decide with Advantage+)

### Step 5.3 — Budget & Bidding at Ad Set Level
- **Bid Strategy:** Lowest cost (default) — use this until you have 50+ conversions/week
- **Attribution Setting:** 7-day click, 1-day view
  > 7-day click means if someone clicks your ad and submits the form within 7 days, Meta counts it as a conversion.

---

## PART 6 — AUDIENCE TARGETING FOR INDIA JOB MARKET

### Step 6.1 — Use Advantage+ Audience (Recommended)
For your first campaign, use **Advantage+ Audience**:
1. In the audience section, click **Advantage+ Audience**
2. Add **Audience Suggestions** (Meta will expand beyond these):
   - **Interests:** Sarkari Naukri, Government Jobs, Employment News India, Rozgar Samachar, Job Search India, Naukri.com, Indeed India, Shine.com
   - **Behaviors:** Job seekers, Recently used mobile payments (signals buying ability)
3. Let Meta find the best audience within India

### Step 6.2 — Manual Targeting (Use After 100+ Conversions)
Once you have data, create manual audiences:

**Demographics:**
- Location: India — **exclude** Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune (too expensive, use only if budget allows)
- Focus on: Uttar Pradesh, Bihar, Rajasthan, Madhya Pradesh, Jharkhand, Odisha, West Bengal — these states have highest job-seeker density and lowest CPL
- Age: 19–38
- Gender: All

**Interests to Target:**
```
Government Jobs / Sarkari Naukri
Employment Exchange
UPSC, SSC, Railway Jobs
Bank Jobs India
10th Pass Jobs / 12th Pass Jobs
Rozgar Mela
Naukri.com / Monster India / Shine.com
```

**Behaviors:**
- People who have used Facebook Marketplace (signals intent to transact)
- Small business owners (may want job for steady income)
- Recently moved (looking for stability)

**Exclude:**
- People who already submitted your form (custom audience: Lead event - 30 days)

### Step 6.3 — Placements
- Select **Advantage+ Placements** — let Meta decide
- Do NOT manually select placements at first
- After 2 weeks, check placement breakdown and turn off underperformers
- Expected best performers: Facebook Feed, Instagram Feed, Facebook Reels

---

## PART 7 — AD CREATIVE THAT ACTUALLY WORKS

### Step 7.1 — What Works Best for Job Ads in India

**Format ranking (best to worst for your audience):**
1. **Short video 15–30 seconds** — highest CTR
2. **Single image with text overlay** — easiest to make
3. **Carousel** — good for showing multiple job types
4. **Reels** — best reach, lowest CPM

### Step 7.2 — Video Script Formula (Hindi)

**Hook (first 3 seconds — most important):**
```
"क्या आप ₹15,000–₹40,000 की नौकरी ढूंढ रहे हैं?"
```
or
```
"8वीं पास से Graduate — सबके लिए नौकरी है!"
```

**Body (seconds 4–20):**
```
Naukri Junction पर रोज़ 500+ लोग Apply करते हैं
Government Job, Bank Job, Data Entry, Office Job — सब Available
Fresher भी Welcome
Registration बिल्कुल FREE
```

**CTA (last 5 seconds):**
```
अभी Apply करो — नीचे Link में
24 घंटे में Call आएगा
```

### Step 7.3 — Image Ad Text Formula

**Primary Text (what shows above the image):**
```
🔴 URGENT HIRING | नौकरी चाहिए?

✅ Government & Private दोनों
✅ 8th Pass से Graduate — सब Welcome
✅ Fresher भी Apply कर सकते हैं
✅ Registration 100% FREE
✅ 24 घंटे में Call

👇 अभी Apply करो — Link में
```

**Headline (bold text below image):**
```
FREE Job Registration | 500+ Vacancies Available
```

**Description:**
```
10,000+ Candidates Placed | 8+ Years Experience | Pan India
```

**CTA Button:** Select **Apply Now** (matches your website button exactly)

### Step 7.4 — What to NEVER Write in Ad Copy
These phrases trigger Facebook's review system and get your ad rejected:

❌ "Guaranteed job placement"
❌ "100% job guarantee"
❌ "Earn ₹50,000 from home" (income claims)
❌ "Government job guaranteed"
❌ Any age discrimination ("only 18-25")
❌ Any gender discrimination
❌ "Limited seats" with fake urgency timers
❌ Before/after income comparisons

**Safe alternatives:**
- Instead of "Guaranteed" → "10,000+ Candidates Successfully Placed"
- Instead of income promises → "Salary Range: ₹15,000 – ₹40,000/month"
- Instead of age targeting in copy → let ad targeting handle age, don't write it in the ad

---

## PART 8 — BUDGET & BIDDING STRATEGY

### Step 8.1 — Starting Budget (Week 1–2)
- **Daily budget:** ₹500/day
- **Goal:** Collect 50 Lead conversions (this exits the learning phase)
- **Expected CPL** in tier-2/3 cities: ₹50–₹150 per lead
- At ₹100 CPL and ₹500/day → 5 leads/day → 35 leads/week → exit learning phase in ~10 days

### Step 8.2 — Learning Phase Rules
**During learning phase (first 50 conversions):**
- Do NOT change budget by more than 20% at a time
- Do NOT change audience
- Do NOT change creative
- Do NOT pause and restart
- Just let it run — Meta is finding its footing

**Signs of healthy learning:**
- Cost per result decreasing day by day
- Delivery is stable (not "Learning Limited")
- At least 1–3 conversions per day

**If you see "Learning Limited":**
- Your audience is too small OR budget is too low
- Solution: Increase budget by 50% OR broaden audience

### Step 8.3 — Scaling Budget (After 50 Conversions/Week)
- Increase budget by maximum **20% every 3 days**
- Example: ₹500 → ₹600 → ₹720 → ₹860
- Never double the budget overnight — it resets the learning phase
- Scale only the winning ad sets (lowest CPL)

### Step 8.4 — Bidding Strategies by Stage

| Stage | Conversions/Week | Bidding Strategy |
|-------|-----------------|-----------------|
| Start | 0–50 | Lowest Cost (default) |
| Growing | 50–200 | Lowest Cost |
| Scaling | 200+ | Cost Cap (set max CPL you can afford) |
| Advanced | 500+ | Value Optimization (maximizes high-value leads) |

---

## PART 9 — AFTER 50 LEADS — SCALE & RETARGET

### Step 9.1 — Create Retargeting Audiences
Go to **Ads Manager → Audiences → Create Audience → Custom Audience → Website**

**Audience 1: "Visited but didn't submit"**
- Include: All website visitors — last 30 days
- Exclude: Lead event — last 30 days
- Name: `NJ - Visited No Submit - 30D`
- These are your warmest prospects

**Audience 2: "Submitted form"**
- Include: Lead event — last 180 days
- Name: `NJ - Form Submitted - 180D`
- Use this to exclude from cold campaigns (don't waste money re-targeting converters)

**Audience 3: "Paying customers"**
- Include: Purchase event — all time
- Name: `NJ - Paying Customers - All Time`
- Use this to build lookalike (Part 10)

### Step 9.2 — Retargeting Campaign Setup
1. Create new campaign → **Sales** objective
2. **Campaign name:** `NJ - Retargeting - Visitors`
3. Budget: ₹200/day
4. **Audience:** `NJ - Visited No Submit - 30D`
5. **Ad copy for retargeting (urgency messaging):**
```
अभी तक Apply नहीं किया?

Seats Fill हो रही हैं — आज ही Submit करो!
10,000+ लोग पहले से Registered हैं।

FREE Registration | 24hr Response
```
6. CTA: **Apply Now**

### Step 9.3 — Create Lookalike from Converters
1. **Audiences → Create Audience → Lookalike Audience**
2. **Source:** `NJ - Form Submitted - 180D`
3. **Location:** India
4. **Audience Size:** Start with 1% (most similar to your converters)
5. Name: `NJ - Lookalike 1% - Form Submitters`
6. Create a new campaign targeting this audience → expect 30–40% lower CPL than cold audiences

---

## PART 10 — PAYING CUSTOMER LOOKALIKE (MOST POWERFUL)

This is the strategy that separates you from 99% of advertisers.

### Step 10.1 — Build Up Your Purchase Pixel Data
1. Every time someone pays you via WhatsApp → open admin panel → click **₹ Mark Paid** → enter amount
2. This fires a `Purchase` event with their hashed phone number to Meta
3. After **20–30 paying customers**, you have enough to build a lookalike

### Step 10.2 — Create Paying Customer Lookalike
1. **Audiences → Create Audience → Lookalike Audience**
2. **Source:** `NJ - Paying Customers - All Time`
3. **Location:** India
4. **Size:** 1% first, then test 2–3%
5. Name: `NJ - Lookalike 1% - Paying Customers`

### Step 10.3 — Run Campaign to Paying Customer Lookalike
1. New campaign → **Sales** objective
2. Target: `NJ - Lookalike 1% - Paying Customers`
3. **Budget:** ₹500/day
4. **Expected result:** This audience looks exactly like people who have already paid you — they will convert to paying customers at a much higher rate than generic job seekers

### Step 10.4 — Value-Based Lookalike (Advanced)
Once you have 50+ purchase events:
1. **Audiences → Create Audience → Lookalike Audience**
2. **Source:** Website → Purchase event → **Use value to find high-value customers**
3. This creates a lookalike of your **highest-paying** customers specifically
4. Target people who are willing to pay more for placement services

---

## PART 11 — BYPASS FACEBOOK ERRORS & AD REJECTIONS

### Step 11.1 — Employment Ads Policy (Most Important)

Facebook has a **Special Ad Category** for employment. You MUST declare this or your ads will be rejected.

**Mandatory steps every time you create an ad:**
1. At campaign level → **Special Ad Categories** → select **Employment**
2. This limits some targeting options (no age/gender/zip code targeting in copy) but prevents rejection

**What this means for targeting:**
- You cannot target by specific age ranges manually when in Employment category
- You cannot target by gender
- BUT you can still use interest targeting, behaviors, and lookalikes
- Advantage+ Audience works fine with Employment category

### Step 11.2 — Common Rejection Reasons & Fixes

**Rejection: "Ad uses prohibited targeting"**
- Cause: Your ad copy mentions age ("18-25 only") or gender
- Fix: Remove all age/gender references from ad copy. Use targeting settings to control demographics, not copy.

**Rejection: "Personal attributes"**
- Cause: Saying "Are you unemployed?" or "Are you looking for work?" — Meta considers this implying the viewer's personal situation
- Fix: Change to "Thousands are finding jobs through Naukri Junction" (third person, not second person)
- ✅ Good: "10,000+ candidates placed across India"
- ❌ Bad: "Are you struggling to find a job?"

**Rejection: "Misleading claims"**
- Cause: Words like "guaranteed", "100% success", "definitely"
- Fix: Replace with statistics and testimonials
- ✅ Good: "4.9★ Rating | 2,000+ Reviews"
- ❌ Bad: "Guaranteed placement in 7 days"

**Rejection: "Sensational content"**
- Cause: Too many emojis, ALL CAPS, excessive exclamation marks
- Fix: Use max 3–4 emojis per post, only capitalize the first letter of sentences
- ✅ Good: "Apply now for government and private jobs across India."
- ❌ Bad: "🚨🚨 APPLY NOW!!! URGENT!!! 💰💰 GET JOB NOW!!!"

**Rejection: "Landing page doesn't match ad"**
- Cause: Ad says "Free government jobs" but landing page shows paid service
- Fix: Your landing page already says "100% Free" — keep your landing page consistent with ad copy

### Step 11.3 — How to Appeal a Rejected Ad
1. Go to **Ads Manager → Account Quality** (in the top menu under the account name)
2. Find the rejected ad → click **Request Review**
3. In the appeal box, write:
```
This is an employment placement service advertisement for Naukri Junction,
a registered business (Reg. No. NJ/2018/UP/04712) operating in India.
The ad promotes free job registration services for Indian job seekers and
complies with all employment advertising policies. The Special Ad Category
for Employment has been selected. We respectfully request a manual review.
```
4. Submit — human reviewers typically respond within 24–48 hours
5. If rejected again → create a new ad with slightly different copy and image

### Step 11.4 — If Your Ad Account Gets Restricted

**Immediate steps:**
1. Go to **Business Support Center** → [business.facebook.com/support](https://business.facebook.com/support)
2. Click **Account Restricted** → **Request Review**
3. Upload your business registration document (NJ/2018/UP/04712) and GST certificate
4. Write a clear explanation of your business

**Prevent restrictions proactively:**
- Never run ads from a freshly created account — age the account for 2–3 weeks with organic posts first
- Keep your Business Page active with regular posts (3–4 posts/week)
- Don't run too many ads simultaneously when account is new (start with 1–2)
- Always pay on time — failed payments trigger restrictions
- Use a reliable payment method (credit card preferred over debit card)

### Step 11.5 — Backup Account Strategy

**Always have a backup ready:**
1. Create a second Business Manager under a trusted family member's Facebook account
2. Add your pixel to both business managers as a shared asset
3. If your primary account gets restricted, you can immediately run ads from the backup
4. Never run the same rejected ad on the backup — rewrite it completely

### Step 11.6 — Warm Up a New Ad Account
If starting fresh or using a backup account:

**Week 1:** Run a **Engagement** campaign at ₹100/day — boost your best Facebook Page post. No conversion tracking yet.

**Week 2:** Run a **Traffic** campaign at ₹200/day sending people to your website.

**Week 3:** Switch to **Conversions (Lead)** campaign at ₹300/day.

**Week 4+:** Scale normally.

This gradual warmup builds account trust with Meta and dramatically reduces the chance of restrictions.

---

## PART 12 — ACCOUNT HEALTH & SAFETY

### Step 12.1 — Facebook Page Best Practices
- Post 3–4 times per week (success stories, job tips, motivational posts in Hindi)
- Reply to ALL comments on your ads — even negative ones professionally
- Never delete negative comments (Meta sees this as suspicious)
- Keep your Page profile complete: photo, cover, about section, website URL, phone number

### Step 12.2 — Payment & Billing
- Use a **credit card** as the primary payment method
- Set a **monthly spending limit** to avoid unexpected charges
- Pay off your balance before it auto-charges (reduces failed payment risk)
- Add a backup payment method

### Step 12.3 — Account Activity Rules
- Never share your Business Manager login with untrusted people
- Don't log in from VPNs or multiple countries in the same day
- Use **two-factor authentication** on your Facebook account
- Assign your pixel to your Business Manager (not just personal account)

### Step 12.4 — Monitor These Metrics Weekly

| Metric | Healthy Range | Action if Outside Range |
|--------|--------------|------------------------|
| CPL (Cost Per Lead) | ₹50–₹200 | If higher: change creative or audience |
| CTR (Click Through Rate) | 1.5%–4% | If lower: change creative |
| Frequency | Below 3.0 | If higher: refresh creative or expand audience |
| Relevance Score | Above 6/10 | If lower: improve ad quality |
| Account Quality | No issues | Check Account Quality page weekly |

---

## PART 13 — TROUBLESHOOTING COMMON ISSUES

### "Pixel Not Receiving Events"
1. Check that `NEXT_PUBLIC_META_PIXEL_ID` is set in your `.env.local`
2. Redeploy your website after adding the variable
3. Use Meta Pixel Helper extension to confirm events are firing
4. Check browser console for any JavaScript errors

### "Learning Limited" Status
- Cause: Not enough conversions to exit learning phase
- Fix option 1: Increase budget by 50%
- Fix option 2: Switch optimization event to a higher-volume event (e.g., ViewContent instead of Lead temporarily)
- Fix option 3: Broaden your audience

### "Audience Too Small" Warning
- Your target audience is below 1,000 people
- Fix: Remove narrow interest filters, use Advantage+ Audience, expand location

### "High CPL / Low Conversions"
Checklist in order:
1. Is your landing page loading fast on mobile? (Most India traffic is mobile)
2. Does your ad creative match your landing page message?
3. Is your audience relevant? (Check demographic breakdown in Ads Manager)
4. Is the pixel firing on form submit? (Check Events Manager)
5. Is your form easy to fill on mobile?

### "Ads Approved But Getting No Delivery"
- Cause: Your bid is too low to win auctions
- Fix: Switch to Highest Volume bidding (default), or increase daily budget
- Also check: is your audience too narrow?

### "Conversion API Events Not Showing"
1. Check `META_ACCESS_TOKEN` is set and hasn't expired
2. Regenerate the token in Events Manager → Settings
3. Check server logs in your hosting platform for errors on the `/api/submit` route
4. Make sure `META_PIXEL_ID` (server-side, without NEXT_PUBLIC_) is also set

---

## QUICK REFERENCE — PRIORITY ORDER

Do these in order for the fastest path to paying customers:

- [ ] 1. Create Meta Business Account & Pixel
- [ ] 2. Add Pixel ID + Access Token to `.env.local` and redeploy
- [ ] 3. Verify events firing in Test Events tool
- [ ] 4. Create "Job Application Lead" Custom Conversion
- [ ] 5. Create first campaign: Sales objective, Employment category, ₹500/day
- [ ] 6. Use Advantage+ Audience with job-seeker interests
- [ ] 7. Write Hindi ad copy (no guaranteed/income claims)
- [ ] 8. Wait for 50 Lead conversions (roughly 10–14 days)
- [ ] 9. Create retargeting audience (visited but didn't submit)
- [ ] 10. Start marking paying customers in admin panel → Mark as Paid button
- [ ] 11. After 20–30 paying customers → create Paying Customer Lookalike
- [ ] 12. Run separate campaign to Lookalike audience
- [ ] 13. Scale winning ad sets by 20% every 3 days

---

## YOUR PIXEL EVENTS SUMMARY

These events are already live in your codebase:

| Event | When It Fires | What Meta Does With It |
|-------|--------------|----------------------|
| `PageView` | Every page load | Tracks all visitors |
| `Lead` | Form submitted | Main conversion — Meta finds more people like this |
| `Purchase` | Admin marks as paid | Meta builds Paying Customer Lookalike |

**Value signal on Lead:** ₹999 — Meta targets higher-income users automatically.

**Deduplication:** Browser + Server events share the same `eventId` — Meta counts it as 1 conversion, not 2.

**Advanced Matching:** Hashed phone + name + city sent with every Lead — improves match quality for iOS users.

---

*Guide prepared for Naukri Junction — naukrijunction.com*
*Last updated: April 2026*
