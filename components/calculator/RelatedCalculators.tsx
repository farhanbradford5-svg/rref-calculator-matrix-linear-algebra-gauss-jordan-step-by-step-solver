import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface RelatedCalc {
  title: string;
  href: string;
  desc: string;
}

const ALL_CALCULATORS: RelatedCalc[] = [
  { title: 'RREF Calculator', href: '/', desc: 'Reduced row echelon form with steps' },
  { title: 'Matrix Inverse', href: '/matrix/inverse', desc: 'Find A⁻¹ using Gauss-Jordan' },
  { title: 'Determinant', href: '/matrix/determinant', desc: 'Cofactor expansion with steps' },
  { title: 'Gauss-Jordan', href: '/matrix/gauss-jordan', desc: 'Elimination explained step by step' },
  { title: 'Matrix Multiply', href: '/matrix/multiply', desc: 'A × B with dot product steps' },
  { title: 'Transpose', href: '/matrix/transpose', desc: 'Flip rows and columns instantly' },
  { title: 'Cross Product', href: '/vectors/cross-product', desc: '3D vector cross product' },
  { title: 'Dot Product', href: '/vectors/dot-product', desc: 'n-dimensional inner product' },
  { title: 'Simplify Radicals', href: '/algebra/simplify-radicals', desc: '√72 = 6√2 with prime factors' },
];

interface RelatedCalculatorsProps {
  exclude?: string;
  picks?: string[];
}

export default function RelatedCalculators({ exclude, picks }: RelatedCalculatorsProps) {
  const shown = picks
    ? ALL_CALCULATORS.filter(c => picks.includes(c.href))
    : ALL_CALCULATORS.filter(c => c.href !== exclude).slice(0, 6);

  return (
    <section className="bg-surface py-10 border-t border-slate-100 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {shown.map(c => (
            <Link
              key={c.href}
              href={c.href}
              className="card p-4 flex items-start justify-between gap-2 hover:border-primary-100 hover:bg-primary-50 transition-colors group"
            >
              <div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">
                  {c.title}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{c.desc}</div>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
