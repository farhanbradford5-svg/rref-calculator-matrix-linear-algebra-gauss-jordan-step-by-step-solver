# RREF Calculator — Linear Algebra Hub

A production-grade, SEO-dominant RREF calculator hub built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS v3**, and **KaTeX**. All arithmetic uses **BigInt-based exact rational numbers** — no floating-point rounding, ever.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
- [Build](#build)
- [Deploy to Vercel](#deploy-to-vercel)
- [Post-Deploy Checklist](#post-deploy-checklist)
- [Organic Growth Strategy](#organic-growth-strategy)
- [Monetization Roadmap](#monetization-roadmap)
- [Calculator Expansion Roadmap](#calculator-expansion-roadmap)
- [Content & SEO Notes](#content--seo-notes)

---

## Features

### Calculators (11 live)

| Calculator | Route | Key Feature |
|---|---|---|
| RREF / Gauss-Jordan | `/` | 4000+ word page, step-by-step, exact fractions |
| Matrix Inverse | `/matrix/inverse` | Augmented [A\|I] method |
| Determinant | `/matrix/determinant` | Cofactor expansion up to 5×5 |
| Gauss-Jordan | `/matrix/gauss-jordan` | Dedicated elimination calculator |
| Matrix Multiply | `/matrix/multiply` | Entry-by-entry dot product steps |
| Transpose | `/matrix/transpose` | Side-by-side original/transposed |
| Cross Product | `/vectors/cross-product` | 3D with determinant formula |
| Dot Product | `/vectors/dot-product` | Angle, projection, orthogonality |
| Simplify Radicals | `/algebra/simplify-radicals` | Prime factorization method |
| Eigenvalues | `/matrix/eigenvalues` | Characteristic polynomial 2×2, 3×3 |
| Quadratic Formula | `/algebra/quadratic` | Exact radical answers |

### Guides (6)

- Linear Algebra Basics
- Solving Linear Systems
- Matrix Operations Cheat Sheet
- RREF Step-by-Step Tutorial
- Gauss-Jordan vs Gaussian Elimination
- Linear Algebra for Students

### Technical

- **Exact BigInt rational arithmetic** — zero floating-point error
- **MathSolver + FAQPage + WebApplication JSON-LD** on all pages
- **sitemap.xml** auto-generated at build time (30+ URLs)
- **robots.txt** pointing to sitemap
- **ads.txt** placeholder for AdSense
- **PWA manifest.json** — add-to-home-screen on mobile
- **Security headers** via `vercel.json`
- **Custom 404** with helpful calculator links
- **Accessibility**: skip-to-content link, aria-live regions, keyboard shortcuts (Ctrl+Enter to calculate)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5 (App Router, `output: 'export'`) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Math rendering | KaTeX (lazy-loaded) |
| Arithmetic | Custom BigInt rational library |
| Deployment | Vercel (static export) |

---

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install

```bash
pnpm install
```

### Environment Variables

```bash
cp artifacts/rref-calculator/.env.example artifacts/rref-calculator/.env.local
# Edit .env.local and fill in your GA4 ID, Search Console verification, etc.
```

### Run Dev Server

```bash
pnpm --filter @workspace/rref-calculator run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Build

```bash
pnpm --filter @workspace/rref-calculator run build
```

Output is written to `artifacts/rref-calculator/out/`. This is a fully static export — no server required.

To verify the build locally:

```bash
npx serve artifacts/rref-calculator/out
```

**Zero errors and zero warnings expected.** If you see warnings from `next build`, address them before deploying.

---

## Deploy to Vercel

### First Deploy

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub.
3. Set **Root Directory** to `artifacts/rref-calculator`.
4. Set **Framework Preset** to `Next.js`.
5. Under **Build & Output Settings**:
   - Build Command: `pnpm run build`
   - Output Directory: `out`
6. Add environment variables from `.env.example` (see table below).
7. Click **Deploy**.

### Environment Variables (Vercel Dashboard)

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | Google Analytics → Admin → Data Streams → Measurement ID |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console → Settings → Ownership Verification → HTML Tag |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense → Sites → Get Code → `data-ad-client` value |
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://rrefmatrixcalc.com` |

### Custom Domain

1. In Vercel → Project → Settings → Domains, add your custom domain.
2. Update your DNS at your registrar: add the A/CNAME records Vercel provides.
3. SSL is provisioned automatically by Vercel within 60 seconds.

---

## Post-Deploy Checklist

After your first successful deploy, complete these steps in order:

### Week 1 — Indexing & Analytics

- [ ] **Connect custom domain** to Vercel (see above)
- [ ] **Verify SSL** is active (padlock in browser, `https://` confirmed)
- [ ] **Submit sitemap** to Google Search Console:
  - Add property → URL prefix → your domain
  - Sitemaps → Add → `https://yourdomain.com/sitemap.xml`
- [ ] **Submit sitemap** to Bing Webmaster Tools:
  - [bing.com/webmasters](https://bing.com/webmasters) → Add site → Submit sitemap
- [ ] **Verify GA4** is receiving data (Realtime report in Google Analytics)
- [ ] **Update ads.txt**: replace placeholder with your real AdSense pub ID (format: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`)
- [ ] **Submit top 15 pages for indexing** via URL Inspection in Search Console
- [ ] **Test mobile** on a real iPhone and Android device

### Week 2 — Search Console Monitoring

- [ ] Check Coverage report — all pages should be "Valid"
- [ ] Check Core Web Vitals — target LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] Set up email alerts for crawl errors

### Month 1–3 — Traffic Building (Organic First)

- [ ] **Academic outreach**: Contact 10 university linear algebra professors offering a free embeddable calculator widget for their course pages. Academic backlinks are highest-authority in this niche.
- [ ] **Reddit**: Post in r/learnmath, r/cheatatmathhomework, r/EngineeringStudents. Read each subreddit's self-promotion rules first. Lead with value, not promotion.
- [ ] **Math tool aggregators**: Submit to Awesome Math lists on GitHub, free-tools-for-students roundups, MathOverflow tool threads.
- [ ] **YouTube demo**: Record a 3–5 minute video walking through the RREF calculator solving a 3×4 augmented matrix system. Post to YouTube with a link in the description — both a backlink and an organic search signal.

### Month 3–6 — AdSense Application

Wait until you have at least 4–6 weeks of organic traffic before applying. The math/education niche approves quickly if:
- Site has 25+ pages of original content ✓
- Privacy policy mentions AdSense ✓
- Contact method works ✓
- No copied content ✓

Apply at [google.com/adsense](https://adsense.google.com).

---

## Organic Growth Strategy

This niche is **search-dominated, not social**. Focus on:

1. **Long-tail keyword capture**: Every calculator page targets a specific keyword cluster. The hub structure means adding one calculator adds traffic to all through internal links.
2. **University SEO**: Professors link to useful tools. Reach out with a personal email explaining the tool. Even 2–3 .edu backlinks accelerate ranking significantly.
3. **Content freshness**: Update "Updated [Month Year]" dates and add new examples quarterly. Search engines reward fresh educational content.
4. **Site speed**: Static export + Vercel CDN → sub-200ms TTFB globally. Speed is a ranking factor.

### Weekly Keyword Tracking (top 30)

Use Google Search Console's Performance report or a free tool like [Google Search Console Insights](https://search.google.com/search-console). Track:

- `rref calculator`
- `reduced row echelon form calculator`
- `rref calculator with steps`
- `gauss jordan elimination calculator`
- `matrix determinant calculator`
- `matrix inverse calculator`
- `simplify radicals calculator`
- `cross product calculator`
- `dot product calculator`

---

## Monetization Roadmap

| Phase | Timeline | Action |
|---|---|---|
| 1 — Build | Months 1–3 | Organic traffic, zero ads. Establish authority. |
| 2 — AdSense | Month 3–6 | Apply for AdSense once traffic builds. Expected $4–8 RPM in edu niche. |
| 3 — Affiliates | Months 6–12 | Add affiliate links: Chegg tutoring, Texas Instruments (Amazon Associates), Strang/Lay textbooks on Amazon. |
| 4 — Mediavine | Month 12+ | Apply for Mediavine at 50k sessions/month. Expected $10–15 RPM vs AdSense $4–8. |
| 5 — Premium Tier | Month 18+ | $4.99/month: unlimited saves, expanded PDF export, ad-free, priority support. |
| 6 — API | Month 24+ | Enterprise API for textbook publishers and edtech platforms: $99–499/month. |

---

## Calculator Expansion Roadmap

The hub model: each new calculator = more organic traffic + more internal links + higher authority.

### Month 2
- Matrix eigenvalues + eigenvectors (2×2, 3×3)
- Characteristic polynomial calculator
- LU decomposition calculator
- Matrix power calculator (Aⁿ)
- Vector magnitude calculator
- Vector projection calculator

### Month 3
- Derivative calculator (single variable)
- Partial derivative calculator
- Gradient calculator
- Definite integral calculator
- Limit calculator

### Month 4
- Polynomial factoring calculator
- Polynomial roots (Durand-Kerner method)
- Synthetic division calculator
- Complete the square calculator

### Month 5
- System of equations solver (3+ variables)
- Linear inequality solver
- Absolute value equation solver

### Month 6
- Probability calculators (combinations, permutations)
- Statistics: mean, median, mode, variance, standard deviation, z-score

### 12-Month Target
**50+ calculators.** At that point, this becomes a genuine Symbolab / emathhelp competitor targeting 100k+ monthly visitors.

---

## Content & SEO Notes

### Forbidden Words (Editorial Policy)
Do not use in content: "delve," "robust," "seamless," "comprehensive guide," "leverage," "harness," "unlock," "dive into." These are AI writing clichés that harm E-E-A-T signals.

### Math Accuracy Disclaimer
"Calculator output is mathematically accurate for rational inputs; verify critical homework answers with your instructor."

### Schema Markup
Every calculator page carries:
- `MathSolver` (primary schema for math tools)
- `FAQPage` (8 Q&A pairs per page)
- `WebApplication` (global, in layout)

### Content Standards
- No content is copied from textbooks. All examples are original.
- Every guide cites sources (Strang, Lay, MIT OCW) on the /sources page.
- "Updated [Month Year] · Reviewed by our math editorial team" appears on every calculator and guide page.

---

## Project Structure

```
artifacts/rref-calculator/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (RREF calculator, 4000+ words)
│   ├── layout.tsx          # Root layout: Nav, Footer, JSON-LD, meta
│   ├── not-found.tsx       # Custom 404
│   ├── global-error.tsx    # Global error boundary
│   ├── sitemap.ts          # Auto-generated sitemap.xml (30+ URLs)
│   ├── robots.ts           # robots.txt
│   ├── faq/                # Consolidated 30-question FAQ
│   ├── sitemap/            # HTML sitemap page (/sitemap)
│   ├── matrix/             # Matrix calculator pages
│   ├── vectors/            # Vector calculator pages
│   ├── algebra/            # Algebra calculator pages
│   ├── guides/             # 6 long-form educational guides
│   ├── about/              # E-E-A-T pages
│   ├── editorial-policy/
│   ├── methodology/
│   ├── sources/
│   ├── contact/
│   ├── changelog/
│   ├── privacy-policy/
│   ├── terms-of-service/
│   ├── cookie-policy/
│   ├── dmca/
│   └── accessibility/
├── components/
│   ├── Nav.tsx             # Sticky nav with dropdowns, skip-to-content
│   ├── Footer.tsx          # Footer with full link tree
│   ├── TableOfContents.tsx # "In This Article" TOC component
│   └── calculator/         # All calculator + shared components
├── lib/
│   └── calculators/        # BigInt rational library + all math engines
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── ads.txt             # AdSense authorized sellers
│   ├── favicon.svg         # SVG favicon
│   └── opengraph.jpg       # OG image
├── vercel.json             # Security headers + Vercel config
├── .env.example            # Environment variable template
├── next.config.mjs         # Next.js config (static export)
├── tailwind.config.ts      # Tailwind config with custom colors
└── tsconfig.json
```
