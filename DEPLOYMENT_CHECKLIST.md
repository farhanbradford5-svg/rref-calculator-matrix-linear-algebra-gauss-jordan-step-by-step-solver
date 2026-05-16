# Deployment Checklist — RREF Calculator

## Pre-Push Checks (run before every deploy)

- [ ] `pnpm --filter @workspace/rref-calculator run build` completes with **zero errors and zero warnings**
- [ ] `out/index.html` exists and contains `<script type="application/ld+json">`
- [ ] `out/sitemap.xml` exists and lists all live calculator and guide URLs
- [ ] `out/robots.txt` exists and points to `https://rrefmatrixcalc.com/sitemap.xml`
- [ ] `out/manifest.json` exists (PWA support)
- [ ] `out/ads.txt` exists (AdSense placeholder or real publisher ID)
- [ ] `out/_redirects` exists with `/privacy /privacy-policy 301`
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] All internal links verified: no `rrrefmatrixcalc.com` (triple-r) anywhere in source

---

## Cloudflare Pages Setup (first deploy only)

1. Push repository to GitHub.
2. Go to Cloudflare Dashboard → Pages → Create a project → Connect to Git.
3. Select your repository.
4. **Build settings:**
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `pnpm --filter @workspace/rref-calculator run build`
   - Build output directory: `artifacts/rref-calculator/out`
   - Root directory: *(leave blank — monorepo root)*
5. **Environment variables** (add in Cloudflare Pages → Settings → Environment Variables):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | Your GA4 Measurement ID (G-XXXXXXXXXX) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | HTML tag content value from Search Console |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | BingBot verification token |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | pub-XXXXXXXXXXXXXXXX (after AdSense approval) |
| `NEXT_PUBLIC_SITE_URL` | `https://rrefmatrixcalc.com` |

6. Click **Save and Deploy**.
7. Under **Custom Domains**, add `rrefmatrixcalc.com` and `www.rrefmatrixcalc.com`.
8. Update DNS at your registrar to point to Cloudflare's nameservers (or add the CNAME Cloudflare provides).
9. SSL is provisioned automatically by Cloudflare.

---

## Post-Deployment Verification (within 1 hour of deploy)

- [ ] `https://rrefmatrixcalc.com` loads and shows the RREF calculator
- [ ] `https://rrefmatrixcalc.com/sitemap.xml` is accessible
- [ ] `https://rrefmatrixcalc.com/robots.txt` is accessible
- [ ] `https://rrefmatrixcalc.com/manifest.json` is accessible
- [ ] `https://rrefmatrixcalc.com/ads.txt` is accessible
- [ ] `https://rrefmatrixcalc.com/privacy` redirects (301) to `/privacy-policy`
- [ ] Calculator works: enter a 3×3 matrix, click Calculate RREF, see steps
- [ ] Mobile: test on real iOS or Android — matrix grid and steps display correctly
- [ ] Structured data: paste homepage URL into [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] No console errors in browser DevTools

---

## Week 1 — Indexing and Analytics

- [ ] **Google Search Console**: Add property (URL prefix: `https://rrefmatrixcalc.com`)
  - Verify via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` meta tag (already in `<head>`)
  - Sitemaps → Add → `https://rrefmatrixcalc.com/sitemap.xml`
  - URL Inspection → submit the top 10 pages individually for indexing
- [ ] **Bing Webmaster Tools**: Add site → import from Google Search Console → submit sitemap
- [ ] **Google Analytics**: Confirm GA4 Realtime report shows traffic when you visit the site
- [ ] **ads.txt**: Replace `pub-XXXXXXXXXXXXXXXX` placeholder with real AdSense publisher ID after approval
  - File: `public/ads.txt`
  - Format: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`

---

## Month 1 — Traffic Building

- [ ] Post in r/learnmath, r/cheatatmathhomework, r/EngineeringStudents (read each subreddit's rules first — lead with value)
- [ ] Submit to GitHub Awesome Math lists and free-tools-for-students roundups
- [ ] Contact 5–10 university linear algebra professors offering an embeddable calculator widget
- [ ] Record a 3–5 minute YouTube walkthrough: solving a 3×4 augmented matrix with the RREF calculator

---

## Ongoing

- [ ] **Core Web Vitals** (check monthly in Search Console): target LCP < 2.5s, CLS < 0.1
- [ ] **Coverage report**: all pages should show "Valid" (no "Excluded" or "Error" pages)
- [ ] **Update "Last Updated" dates** on content pages each quarter
- [ ] **AdSense application** (Month 3–6): apply after 4–6 weeks of organic traffic at [adsense.google.com](https://adsense.google.com)
