import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | RREF Calculator',
  description: 'Page not found. Explore our RREF calculator, matrix calculators, and linear algebra guides.',
  robots: { index: false, follow: true },
};

const POPULAR = [
  { label: 'RREF Calculator', href: '/', desc: 'Reduced row echelon form with step-by-step Gauss-Jordan' },
  { label: 'Determinant Calculator', href: '/matrix/determinant', desc: 'Full cofactor expansion, exact fractions' },
  { label: 'Matrix Inverse', href: '/matrix/inverse', desc: 'Compute A⁻¹ via augmented Gauss-Jordan' },
  { label: 'Matrix Multiply', href: '/matrix/multiply', desc: 'Multiply two matrices with entry-by-entry steps' },
  { label: 'Cross Product', href: '/vectors/cross-product', desc: '3D vector cross product with formula' },
  { label: 'Simplify Radicals', href: '/algebra/simplify-radicals', desc: 'Reduce square roots to exact form' },
];

const GUIDES = [
  { label: 'Linear Algebra Basics', href: '/guides/linear-algebra-basics' },
  { label: 'RREF Step-by-Step Tutorial', href: '/guides/rref-step-by-step-tutorial' },
  { label: 'Matrix Operations Cheat Sheet', href: '/guides/matrix-operations-cheat-sheet' },
];

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary-50 mb-6">
        <span className="text-4xl font-extrabold text-primary">404</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h1>
      <p className="text-slate-500 mb-10 max-w-md mx-auto">
        That page doesn&apos;t exist or was moved. Try one of our popular calculators, or go back to the homepage.
      </p>

      <h2 className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Popular Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
        {POPULAR.map(p => (
          <Link
            key={p.href}
            href={p.href}
            className="card p-4 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="font-semibold text-slate-900 group-hover:text-primary text-sm">{p.label}</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-snug">{p.desc}</div>
          </Link>
        ))}
      </div>

      <h2 className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Guides</h2>
      <div className="flex flex-wrap gap-2 mb-10 justify-start">
        {GUIDES.map(g => (
          <Link
            key={g.href}
            href={g.href}
            className="badge hover:bg-primary hover:text-white transition-colors text-xs px-3 py-1"
          >
            {g.label}
          </Link>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <Link href="/" className="btn-primary">Back to RREF Calculator</Link>
        <Link href="/sitemap" className="btn-secondary">Site Map</Link>
      </div>
    </div>
  );
}
