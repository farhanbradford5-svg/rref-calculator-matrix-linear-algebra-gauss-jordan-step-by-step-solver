import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Site Map — RREF Calculator Hub',
  description:
    'Complete site map of RREF Calculator: all 11 calculators, 6 guides, FAQ, trust pages, and legal pages — organized by category.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/sitemap' },
};

const CALCULATORS = [
  {
    label: 'RREF Calculator (Gauss-Jordan)',
    href: '/',
    desc: 'Reduced row echelon form with step-by-step Gauss-Jordan elimination. Exact fractions.',
  },
  {
    label: 'Matrix Inverse Calculator',
    href: '/matrix/inverse',
    desc: 'Compute A⁻¹ by augmenting with the identity matrix and applying Gauss-Jordan.',
  },
  {
    label: 'Determinant Calculator',
    href: '/matrix/determinant',
    desc: 'Full cofactor expansion for 2×2 to 5×5 matrices. Exact rational results.',
  },
  {
    label: 'Gauss-Jordan Elimination Calculator',
    href: '/matrix/gauss-jordan',
    desc: 'Classic Gauss-Jordan with augmented matrix support and every row operation named.',
  },
  {
    label: 'Matrix Multiply Calculator',
    href: '/matrix/multiply',
    desc: 'Multiply two matrices with entry-by-entry dot product steps shown.',
  },
  {
    label: 'Matrix Transpose Calculator',
    href: '/matrix/transpose',
    desc: 'Flip rows and columns. Displays original and transposed matrices side by side.',
  },
  {
    label: 'Cross Product Calculator',
    href: '/vectors/cross-product',
    desc: '3D vector cross product with determinant formula and geometric interpretation.',
  },
  {
    label: 'Dot Product Calculator',
    href: '/vectors/dot-product',
    desc: 'Dot product, angle between vectors, projection, and orthogonality check.',
  },
  {
    label: 'Simplify Radicals Calculator',
    href: '/algebra/simplify-radicals',
    desc: 'Reduce square roots to simplest radical form via prime factorization.',
  },
  {
    label: 'Eigenvalues Calculator',
    href: '/matrix/eigenvalues',
    desc: 'Characteristic polynomial and eigenvalues for 2×2 and 3×3 matrices.',
  },
  {
    label: 'Quadratic Formula Calculator',
    href: '/algebra/quadratic',
    desc: 'Solve ax² + bx + c = 0 with exact radical answers.',
  },
];

const GUIDES = [
  {
    label: 'Linear Algebra Basics',
    href: '/guides/linear-algebra-basics',
    desc: 'Vectors, matrices, linear systems, and RREF — the core concepts explained.',
  },
  {
    label: 'Solving Linear Systems',
    href: '/guides/solving-linear-systems',
    desc: 'Methods for solving Ax = b: substitution, elimination, and RREF.',
  },
  {
    label: 'Matrix Operations Cheat Sheet',
    href: '/guides/matrix-operations-cheat-sheet',
    desc: 'Quick reference for addition, multiplication, transpose, inverse, and determinants.',
  },
  {
    label: 'RREF Step-by-Step Tutorial',
    href: '/guides/rref-step-by-step-tutorial',
    desc: 'Three complete worked examples: 2×2, 3×3, and 3×4 augmented matrix.',
  },
  {
    label: 'Gauss-Jordan vs. Gaussian Elimination',
    href: '/guides/gauss-jordan-vs-gaussian-elimination',
    desc: 'Comparing the two methods: when to use each and what makes them different.',
  },
  {
    label: 'Linear Algebra for Students',
    href: '/guides/linear-algebra-for-students',
    desc: 'Study guide for the linear algebra course: what to know and how to prepare.',
  },
];

const TRUST = [
  { label: 'About', href: '/about', desc: 'Our mission, team, and technical architecture.' },
  { label: 'Editorial Policy', href: '/editorial-policy', desc: 'How we write, review, and correct content.' },
  { label: 'Methodology', href: '/methodology', desc: 'How the calculators work: BigInt arithmetic and algorithm details.' },
  { label: 'Sources', href: '/sources', desc: 'Academic references: Strang, Lay, MIT 18.06.' },
  { label: 'Contact', href: '/contact', desc: 'Report bugs, corrections, or partnership inquiries.' },
  { label: 'Changelog', href: '/changelog', desc: 'Dated record of updates, new features, and fixes.' },
  { label: 'FAQ', href: '/faq', desc: 'Top 30 questions about RREF, matrices, and this calculator.' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'DMCA Policy', href: '/dmca' },
  { label: 'Accessibility Statement', href: '/accessibility' },
];

interface SitemapSectionProps {
  title: string;
  color: string;
  items: { label: string; href: string; desc?: string }[];
}

function SitemapSection({ title, color, items }: SitemapSectionProps) {
  return (
    <section>
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 ${color}`}>
        {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="card p-4 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="font-semibold text-sm text-slate-800 group-hover:text-primary leading-snug">
              {item.label}
            </div>
            {item.desc && (
              <div className="text-xs text-slate-500 mt-1 leading-snug">{item.desc}</div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function SitemapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Site Map' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Site Map</h1>
      <p className="text-slate-500 mb-10">
        All {CALCULATORS.length} calculators, {GUIDES.length} guides, and {TRUST.length + LEGAL.length} supporting pages — organized by category.
      </p>

      <div className="space-y-10">
        <SitemapSection
          title={`Calculators (${CALCULATORS.length})`}
          color="bg-blue-50 text-blue-700"
          items={CALCULATORS}
        />
        <SitemapSection
          title={`Guides (${GUIDES.length})`}
          color="bg-emerald-50 text-emerald-700"
          items={GUIDES}
        />
        <SitemapSection
          title={`Trust & About (${TRUST.length})`}
          color="bg-violet-50 text-violet-700"
          items={TRUST}
        />
        <SitemapSection
          title={`Legal (${LEGAL.length})`}
          color="bg-slate-100 text-slate-600"
          items={LEGAL}
        />
      </div>

      <div className="mt-10 text-center text-xs text-slate-400">
        <p>
          XML sitemap for search engines:{' '}
          <a href="/sitemap.xml" className="underline hover:text-slate-600">
            /sitemap.xml
          </a>
        </p>
      </div>
    </div>
  );
}
