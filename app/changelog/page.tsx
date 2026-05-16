import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Changelog — RREF Calculator',
  description: 'History of updates to RREF Calculator: new calculators, bug fixes, content additions, and performance improvements.',
};

const CHANGELOG = [
  {
    date: 'May 2026',
    version: 'v2.0',
    changes: [
      'Launched 8 sister calculators: Matrix Inverse, Determinant, Gauss-Jordan, Matrix Multiply, Transpose, Cross Product, Dot Product, Simplify Radicals',
      'Added 6 educational guide pages on linear algebra topics',
      'Added E-E-A-T pages: About, Editorial Policy, Methodology, Sources, Contact',
      'Added full legal pages: Privacy Policy, Terms, Cookie Policy, DMCA, Accessibility',
      'Implemented MathSolver schema markup on all calculator pages',
      'Added AdSlot placeholders for Google AdSense integration',
      'Updated sitemap to include all 25+ pages',
      'Fixed KaTeX CSS SRI integrity hash causing CSS load failure',
      'Expanded homepage content to 4000+ words with worked examples and 20-question FAQ',
    ],
  },
  {
    date: 'April 2026',
    version: 'v1.1',
    changes: [
      'Added save/load calculation history (last 10 calculations stored in localStorage)',
      'Added URL encoding for sharing problems via link',
      'Added LaTeX export for full step-by-step solutions',
      'Added 8 example matrices (pre-loaded problems)',
      'Improved augmented matrix solution display with parametric form for infinite solutions',
      'Added solution classification: unique, infinite (with free variables), inconsistent',
      'Performance improvement: KaTeX loaded lazily to reduce initial bundle size',
    ],
  },
  {
    date: 'March 2026',
    version: 'v1.0',
    changes: [
      'Initial launch of RREF Calculator',
      'BigInt-based exact rational arithmetic engine',
      'Full Gauss-Jordan elimination with step-by-step display',
      'Augmented matrix mode with toggleable last-column separator',
      'Matrix size selection: 2×2 through 6×6, plus custom sizes',
      'Quick-select preset sizes (2×2, 2×3, 3×3, 3×4, 4×4)',
      'Verbose and terse step display modes',
      'Mobile-responsive matrix input grid',
      'Tab and arrow key navigation between cells',
      'Fraction input parsing (e.g., "3/4" → exact rational 3/4)',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Changelog' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Changelog</h1>
      <p className="text-slate-500 mb-8">A dated record of updates, new features, and bug fixes.</p>

      <div className="space-y-8">
        {CHANGELOG.map(release => (
          <div key={release.version} className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono bg-primary-50 text-primary border border-primary-100 px-2 py-0.5 rounded-full">{release.version}</span>
              <span className="text-sm font-semibold text-slate-700">{release.date}</span>
            </div>
            <ul className="space-y-2">
              {release.changes.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-primary shrink-0 mt-0.5">+</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
