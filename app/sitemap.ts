import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://rrefmatrixcalc.com';
  const now = new Date();

  const calculators = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/matrix/inverse', priority: 0.9, freq: 'monthly' },
    { path: '/matrix/determinant', priority: 0.9, freq: 'monthly' },
    { path: '/matrix/gauss-jordan', priority: 0.9, freq: 'monthly' },
    { path: '/matrix/multiply', priority: 0.8, freq: 'monthly' },
    { path: '/matrix/transpose', priority: 0.7, freq: 'monthly' },
    { path: '/vectors/cross-product', priority: 0.8, freq: 'monthly' },
    { path: '/vectors/dot-product', priority: 0.8, freq: 'monthly' },
    { path: '/algebra/simplify-radicals', priority: 0.7, freq: 'monthly' },
    { path: '/matrix/augmented', priority: 0.9, freq: 'monthly' },
  ] as const;

  const guides = [
    '/guides/linear-algebra-basics',
    '/guides/solving-linear-systems',
    '/guides/matrix-operations-cheat-sheet',
    '/guides/rref-step-by-step-tutorial',
    '/guides/gauss-jordan-vs-gaussian-elimination',
    '/guides/linear-algebra-for-students',
    '/guides/rref-calculator-ti84',
    '/guides/null-space-matrix',
    '/guides/ref-vs-rref',
  ];

  const eeat = [
    '/about',
    '/editorial-policy',
    '/methodology',
    '/sources',
    '/contact',
    '/changelog',
    '/faq',
    '/sitemap',
  ];

  const legal = [
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/dmca',
    '/accessibility',
  ];

  return [
    ...calculators.map(c => ({
      url: `${base}${c.path}`,
      lastModified: now,
      changeFrequency: c.freq as 'weekly' | 'monthly',
      priority: c.priority,
    })),
    ...guides.map(path => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...eeat.map(path => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
    ...legal.map(path => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
  ];
}
