import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

export const dynamic = 'force-static';

/**
 * lastModified must be the date a page's content actually changed — not the build date.
 * Every page was revised in the November 2026 update, so that is the default.
 * When you edit a page later, add its path to PAGE_UPDATED with the new date.
 */
const DEFAULT_UPDATED = '2026-11-16';
const PAGE_UPDATED: Record<string, string> = {
  // '/matrix/inverse/': '2027-01-10',
};

type Freq = 'weekly' | 'monthly' | 'yearly';

const calculators: { path: string; priority: number; freq: Freq }[] = [
  { path: '/', priority: 1.0, freq: 'weekly' },
  { path: '/matrix/augmented/', priority: 0.9, freq: 'monthly' },
  { path: '/matrix/inverse/', priority: 0.9, freq: 'monthly' },
  { path: '/matrix/determinant/', priority: 0.9, freq: 'monthly' },
  { path: '/matrix/gauss-jordan/', priority: 0.9, freq: 'monthly' },
  { path: '/matrix/row-echelon-form/', priority: 0.9, freq: 'monthly' },
  { path: '/matrix/gaussian-elimination/', priority: 0.9, freq: 'monthly' },
  { path: '/algebra/system-of-equations/', priority: 0.9, freq: 'monthly' },
  { path: '/matrix/eigenvalues/', priority: 0.9, freq: 'monthly' },
  { path: '/matrix/cramers-rule/', priority: 0.8, freq: 'monthly' },
  { path: '/matrix/null-space/', priority: 0.8, freq: 'monthly' },
  { path: '/matrix/multiply/', priority: 0.8, freq: 'monthly' },
  { path: '/matrix/transpose/', priority: 0.7, freq: 'monthly' },
  { path: '/vectors/cross-product/', priority: 0.8, freq: 'monthly' },
  { path: '/vectors/dot-product/', priority: 0.8, freq: 'monthly' },
  { path: '/algebra/simplify-radicals/', priority: 0.7, freq: 'monthly' },
];

const guides = [
  '/guides/linear-algebra-basics/',
  '/guides/solving-linear-systems/',
  '/guides/matrix-operations-cheat-sheet/',
  '/guides/rref-step-by-step-tutorial/',
  '/guides/gauss-jordan-vs-gaussian-elimination/',
  '/guides/linear-algebra-for-students/',
  '/guides/rref-calculator-ti84/',
  '/guides/null-space-matrix/',
  '/guides/ref-vs-rref/',
];

const trust = [
  '/about/',
  '/editorial-policy/',
  '/methodology/',
  '/sources/',
  '/contact/',
  '/changelog/',
  '/faq/',
  '/sitemap/',
];

const legal = [
  '/privacy-policy/',
  '/terms-of-service/',
  '/cookie-policy/',
  '/dmca/',
  '/accessibility/',
];

function entry(path: string, changeFrequency: Freq, priority: number): MetadataRoute.Sitemap[number] {
  return {
    // Trailing slashes match the canonical URLs (next.config: trailingSlash: true).
    url: `${SITE_URL}${path}`,
    lastModified: PAGE_UPDATED[path] ?? DEFAULT_UPDATED,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...calculators.map(c => entry(c.path, c.freq, c.priority)),
    ...guides.map(p => entry(p, 'monthly', 0.7)),
    ...trust.map(p => entry(p, 'monthly', 0.4)),
    ...legal.map(p => entry(p, 'yearly', 0.2)),
  ];
}
