import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quadratic Formula Calculator — Coming Soon | RREF Calculator',
  robots: { index: false, follow: false },
};

export default function QuadraticPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Quadratic Formula Calculator</h1>
      <p className="text-slate-500 mb-8">Solve ax² + bx + c = 0 with discriminant analysis and exact roots. Coming soon.</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 mb-8">🚧 Coming soon.</div>
      <Link href="/" className="btn-primary inline-flex">← Try the RREF Calculator</Link>
    </div>
  );
}
