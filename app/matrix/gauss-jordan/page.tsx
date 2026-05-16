import type { Metadata } from 'next';
import RREFCalculator from '@/components/calculator/RREFCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gauss-Jordan Elimination Calculator — Step-by-Step with Full Explanation',
  description: 'Gauss-Jordan elimination with every row operation explained. Exact fractions, augmented matrix support, solve linear systems. Free, no sign-up.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/gauss-jordan' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Gauss-Jordan Elimination Calculator',
  description: 'Performs Gauss-Jordan elimination to reduce any matrix to reduced row echelon form, showing every elementary row operation.',
  url: 'https://rrefmatrixcalc.com/matrix/gauss-jordan',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/matrix/gauss-jordan',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Gauss-Jordan Elimination Calculator', item: 'https://rrefmatrixcalc.com/matrix/gauss-jordan' },
  ],
};

export default function GaussJordanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Matrix Calculators' }, { label: 'Gauss-Jordan' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Gauss-Jordan Elimination Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Full Gauss-Jordan elimination to reduced row echelon form. Every row operation named, every matrix state shown.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <RREFCalculator />
        <AdSlot id="gj-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Every Step Shown', 'Exact Fractions', 'Augmented Matrix'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is Gauss-Jordan Elimination?</h2>
            <p>
              Gauss-Jordan elimination is a systematic algorithm for solving linear systems, finding matrix inverses, and computing rank by transforming a matrix to its <em>reduced row echelon form</em> (RREF) using elementary row operations. It extends classical Gaussian elimination (which stops at row echelon form) by also eliminating entries <em>above</em> each pivot, not just below.
            </p>
            <p>
              Named after Carl Friedrich Gauss and Wilhelm Jordan, the method applies three elementary row operations:
            </p>
            <ul>
              <li><strong>Swap</strong> two rows: R_i ↔ R_j</li>
              <li><strong>Scale</strong> a row by a non-zero constant: R_i → c·R_i</li>
              <li><strong>Row replacement</strong>: add a multiple of one row to another: R_i → R_i + c·R_j</li>
            </ul>
            <p>
              These operations preserve the solution set of the linear system (they produce row-equivalent matrices). The goal is a matrix in RREF, where every leading entry (pivot) is 1, all other entries in pivot columns are 0, and pivots step strictly right and down.
            </p>
          </section>

          <section>
            <h2>Gauss-Jordan vs. Gaussian Elimination: The Difference</h2>
            <p>
              <strong>Gaussian elimination</strong> (forward elimination only) transforms the matrix to row echelon form (REF): an upper triangular matrix with leading entries ≥ 1. Solving the system then requires back substitution — working up from the last equation to find each variable.
            </p>
            <p>
              <strong>Gauss-Jordan elimination</strong> continues with back substitution built into the forward pass. After a pivot is made equal to 1, it is used to zero out entries both below and above it. The result (RREF) allows reading off the solution directly, with no separate back-substitution step.
            </p>
            <p>
              For hand calculations, Gaussian elimination + back substitution is often faster. For computer implementation and pedagogical clarity, Gauss-Jordan to RREF is more systematic. For finding matrix inverses, Gauss-Jordan on [A|I] is the standard approach.
            </p>
          </section>

          <section>
            <h2>The 5-Step Gauss-Jordan Algorithm</h2>
            <ol className="space-y-3">
              <li><strong>Find the pivot column.</strong> Start at the leftmost column with a non-zero entry in the current row range.</li>
              <li><strong>Pivot selection (row swap).</strong> If the top entry of the pivot column is zero, swap the current row with a row below that has a non-zero entry in that column.</li>
              <li><strong>Scale to get a leading 1.</strong> Multiply the current row by 1/(pivot value) to make the pivot equal to 1.</li>
              <li><strong>Eliminate the entire column.</strong> For every other row (above and below), subtract the appropriate multiple of the current row to produce zeros throughout the pivot column.</li>
              <li><strong>Move to the next submatrix.</strong> Move one row down and one column right. Repeat from step 1 until all rows are processed.</li>
            </ol>
            <p>
              After this process, the matrix is in RREF. The number of pivots equals the rank of the matrix. Columns without pivots correspond to free variables in the solution.
            </p>
          </section>

          <section>
            <h2>Worked Example: Solving a 3×3 System</h2>
            <p>Solve: 2x + y − z = 8, −3x − y + 2z = −11, −2x + y + 2z = −3.</p>
            <p>Write as augmented matrix and apply Gauss-Jordan:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 2   1  −1 |  8 ]</p>
              <p>[ −3 −1   2 | −11 ]</p>
              <p>[ −2  1   2 | −3 ]</p>
            </div>
            <p>After Gauss-Jordan elimination (use the calculator above for full steps):</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 1  0  0 | 2 ]</p>
              <p>[ 0  1  0 | 3 ]</p>
              <p>[ 0  0  1 | −1 ]</p>
            </div>
            <p>Solution: x = 2, y = 3, z = −1. The pivot in every column means a unique solution.</p>
          </section>

          <section>
            <h2>When Does Gauss-Jordan Reveal Special Structure?</h2>
            <p>
              <strong>Unique solution.</strong> Every variable column has a pivot. The RREF of [A|b] is [I|x]. One solution.
            </p>
            <p>
              <strong>Infinitely many solutions.</strong> Some variable columns have no pivot (free variables). The solution is a parametric family — each free variable becomes a parameter. The null space (kernel) of A is non-trivial.
            </p>
            <p>
              <strong>No solution (inconsistent).</strong> A row with all zeros in the coefficient part but a non-zero right-hand side: [0 0 0 | c] with c ≠ 0. This represents "0 = c", which is false for all x.
            </p>
            <p>
              These three cases correspond exactly to rank(A) = n (unique), rank(A) &lt; n with rank(A) = rank([A|b]) (infinite), and rank(A) &lt; rank([A|b]) (inconsistent), per the Rouché–Capelli theorem.
            </p>
          </section>

          <section>
            <h2>Applications of Gauss-Jordan Elimination</h2>
            <p><strong>Solving linear systems.</strong> The primary application — transform [A|b] to [RREF(A)|c] and read off solutions directly.</p>
            <p><strong>Matrix inverse.</strong> Apply Gauss-Jordan to [A|I]. If A is invertible, [A|I] reduces to [I|A⁻¹].</p>
            <p><strong>Finding rank and null space.</strong> The number of pivots in RREF(A) equals rank(A). The null space basis comes from the free variable columns.</p>
            <p><strong>Determining linear independence.</strong> Place vectors as rows (or columns) of A. RREF immediately reveals whether they are linearly independent (no zero rows = independent) or dependent (zero rows = dependent).</p>
            <p><strong>Balancing chemical equations.</strong> Stoichiometry problems reduce to linear systems solvable by Gauss-Jordan.</p>
          </section>

          <AdSlot id="gj-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Is Gauss-Jordan the same as RREF?', a: 'Gauss-Jordan is the algorithm; RREF is the result. Performing Gauss-Jordan elimination on a matrix produces its reduced row echelon form.' },
                { q: 'Is RREF unique?', a: 'Yes — every matrix has exactly one RREF, regardless of the row operations used to get there. This is the uniqueness theorem for RREF (proved by Theorem 1 in Gilbert Strang\'s "Introduction to Linear Algebra").' },
                { q: 'Does Gauss-Jordan work for non-square matrices?', a: 'Yes. Gauss-Jordan elimination works for any m×n matrix. The resulting RREF has at most min(m,n) pivots.' },
                { q: 'How does this differ from LU decomposition?', a: 'LU decomposition factors A = LU (lower × upper triangular). Gauss-Jordan elimination without storing multipliers is equivalent, but LU decomposition is more efficient for repeatedly solving Ax = b for different b vectors.' },
                { q: 'What are elementary row operations?', a: 'Three types: (1) swap two rows, (2) multiply a row by a non-zero constant, (3) add a multiple of one row to another. Each corresponds to left-multiplying by an elementary matrix.' },
                { q: 'Can I use this calculator for fractions in the input?', a: 'Yes. Enter fractions as "3/4" or "-2/5". The calculator parses these exactly and carries them through all operations without rounding.' },
                { q: 'How accurate is the computation?', a: 'Perfectly accurate for rational inputs. BigInt arithmetic means no rounding ever occurs — results are exact fractions.' },
                { q: 'Is this calculator free?', a: 'Yes, completely free with no account required.' },
              ].map(({ q, a }) => (
                <div key={q} className="card p-4">
                  <h3 className="font-semibold text-slate-800 mb-1">{q}</h3>
                  <p className="text-slate-600 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <RelatedCalculators exclude="/matrix/gauss-jordan" picks={['/', '/matrix/inverse', '/matrix/determinant', '/matrix/multiply', '/vectors/dot-product']} />
    </>
  );
}
