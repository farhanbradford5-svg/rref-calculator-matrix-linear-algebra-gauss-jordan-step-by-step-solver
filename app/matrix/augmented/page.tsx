import type { Metadata } from 'next';
import Link from 'next/link';
import RREFCalculator from '@/components/calculator/RREFCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Augmented Matrix Calculator — Solve Linear Systems with RREF',
  description: 'Free augmented matrix calculator. Enter your system of equations as [A|b], apply RREF to solve. Handles unique solutions, infinite solutions, and no-solution cases. Step-by-step.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/augmented' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Augmented Matrix Calculator',
  description: 'Solves systems of linear equations by reducing the augmented matrix [A|b] to RREF. Shows every Gauss-Jordan step with exact rational arithmetic.',
  url: 'https://rrefmatrixcalc.com/matrix/augmented',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/matrix/augmented',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Augmented Matrix Calculator', item: 'https://rrefmatrixcalc.com/matrix/augmented' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is an augmented matrix?', acceptedAnswer: { '@type': 'Answer', text: 'An augmented matrix [A|b] combines the coefficient matrix A with the constant column b of a linear system Ax = b. The vertical bar separates coefficients from constants. Row reducing [A|b] to RREF gives the solution directly.' } },
    { '@type': 'Question', name: 'How do I read the solution from RREF of [A|b]?', acceptedAnswer: { '@type': 'Answer', text: 'Each pivot row gives one variable. If column i is a pivot column, that variable equals the entry in the last column of that row. Free variables (non-pivot columns) are parameters — set them to t₁, t₂, … and express pivot variables in terms of them.' } },
    { '@type': 'Question', name: 'What does a zero row in [A|b] mean?', acceptedAnswer: { '@type': 'Answer', text: 'A zero row in the coefficient part with a zero in the constant column means the equation is redundant — it adds no information. A zero row in the coefficient part with a non-zero constant (like [0 0 0 | 5]) means the system is inconsistent — no solution exists.' } },
    { '@type': 'Question', name: 'Can this calculator handle more than 3 equations?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select a matrix size up to 6×6. For an augmented matrix of an n-variable system, choose an n×(n+1) matrix, enter coefficients in columns 1 through n, and constants in column n+1.' } },
    { '@type': 'Question', name: 'What is the difference between augmented and coefficient matrices?', acceptedAnswer: { '@type': 'Answer', text: 'The coefficient matrix A contains only the variable coefficients. The augmented matrix [A|b] appends the constants column b. RREF of A tells you the rank and null space; RREF of [A|b] tells you the solution set of the specific system Ax = b.' } },
  ],
};

export default function AugmentedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Matrix Calculators' }, { label: 'Augmented Matrix' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Augmented Matrix Calculator
        </h1>
        <p className="text-xs text-slate-400 mb-6">📖 5 min read · Updated May 2026</p>
        <p className="text-lg text-slate-500 mb-6">
          Enter a system of equations as [A|b] and apply RREF to solve. Every Gauss-Jordan step shown, exact fractions throughout.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <RREFCalculator />
        <AdSlot id="aug-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Exact Fractions', 'Step-by-Step', 'All Solution Types'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is an Augmented Matrix?</h2>
            <p>
              An <strong>augmented matrix</strong> [A|b] combines the coefficient matrix A of a linear system with the constant vector b into a single matrix. The vertical bar (or a column separator) marks the boundary between coefficients and constants. For the system:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>2x + y − z = 8</p>
              <p>−3x − y + 2z = −11</p>
              <p>−2x + y + 2z = −3</p>
            </div>
            <p>the augmented matrix is:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 2   1  −1 |  8 ]</p>
              <p>[ −3 −1   2 | −11 ]</p>
              <p>[ −2  1   2 | −3 ]</p>
            </div>
            <p>
              Row reducing this augmented matrix to RREF gives the solution directly — no back substitution required. Each pivot row corresponds to one solved variable. The <Link href="/" className="text-primary hover:underline">RREF calculator</Link> above performs this automatically when you enter your augmented matrix. Enable "Augmented" mode to tell the calculator which column is the constant column.
            </p>
          </section>

          <section>
            <h2>How to Use This Augmented Matrix Calculator</h2>
            <ol className="space-y-2">
              <li><strong>Choose your matrix dimensions.</strong> For n equations with n unknowns, select an n×(n+1) matrix. The last column will hold the constants.</li>
              <li><strong>Enter the coefficients.</strong> For each equation, enter the coefficients in the first n columns. Enter the constant (right-hand side) in column n+1.</li>
              <li><strong>Enable Augmented mode.</strong> Toggle the "Augmented" switch so the calculator treats the last column as the constants column b, displaying a separator bar.</li>
              <li><strong>Click Calculate RREF.</strong> The calculator applies <Link href="/matrix/gauss-jordan" className="text-primary hover:underline">Gauss-Jordan elimination</Link> and shows every row operation.</li>
              <li><strong>Read the solution.</strong> Each pivot row gives one variable. Free-variable columns correspond to parameters in infinite-solution cases. A row like [0 0 ... 0 | c] with c ≠ 0 means no solution.</li>
            </ol>
          </section>

          <section>
            <h2>The Three Solution Types</h2>
            <p>
              Every system of linear equations falls into exactly one of three cases, revealed immediately by the RREF of [A|b]:
            </p>

            <h3 className="font-semibold text-slate-800 mt-4 mb-2">Case 1: Unique Solution</h3>
            <p>
              The RREF of [A|b] has the form [I|x*] where I is the identity matrix and x* is the unique solution vector. Every variable column has a pivot. rank(A) = rank([A|b]) = n.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 1  0  0 | 2 ]   →   x = 2</p>
              <p>[ 0  1  0 | 3 ]   →   y = 3</p>
              <p>[ 0  0  1 | −1 ]  →   z = −1</p>
            </div>

            <h3 className="font-semibold text-slate-800 mt-4 mb-2">Case 2: Infinitely Many Solutions (Free Variables)</h3>
            <p>
              Some variable columns have no pivot — these are free variables. Set each free variable to a parameter (t₁, t₂, …) and express the pivot variables in terms of them. rank(A) = rank([A|b]) &lt; n. For a deeper treatment of free variables and the null space, see our <Link href="/guides/null-space-matrix" className="text-primary hover:underline">null space guide</Link>.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 1  0  2 | 3 ]   →   x = 3 − 2t (z = t is free)</p>
              <p>[ 0  1  1 | 1 ]   →   y = 1 − t</p>
              <p>[ 0  0  0 | 0 ]   →   redundant equation (ignored)</p>
              <p>Solution: (3−2t, 1−t, t) for any t ∈ ℝ</p>
            </div>

            <h3 className="font-semibold text-slate-800 mt-4 mb-2">Case 3: No Solution (Inconsistent)</h3>
            <p>
              A row of the form [0 0 … 0 | c] with c ≠ 0 appears. This represents "0 = c", which is impossible. rank(A) &lt; rank([A|b]).
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 1  2 | 5 ]</p>
              <p>[ 0  0 | 3 ]   ←  "0 = 3" — impossible. No solution.</p>
            </div>
            <p>
              These three cases correspond to the Rouché–Capelli theorem: unique solution when rank(A) = rank([A|b]) = n; infinite solutions when rank(A) = rank([A|b]) &lt; n; no solution when rank(A) &lt; rank([A|b]). See our <Link href="/guides/solving-linear-systems" className="text-primary hover:underline">solving linear systems guide</Link> for detailed coverage of all three cases.
            </p>
          </section>

          <section>
            <h2>Worked Example: 3×3 System with Unique Solution</h2>
            <p>Solve: 2x + y − z = 8, −3x − y + 2z = −11, −2x + y + 2z = −3.</p>
            <p>Write as augmented matrix and apply Gauss-Jordan:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 2   1  −1 |  8 ]</p>
              <p>[ −3 −1   2 | −11 ]   →   Gauss-Jordan elimination</p>
              <p>[ −2  1   2 | −3 ]</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>RREF: [ 1  0  0 | 2 ]   →   x = 2</p>
              <p>      [ 0  1  0 | 3 ]   →   y = 3</p>
              <p>      [ 0  0  1 | −1 ]  →   z = −1</p>
            </div>
            <p>Verify: 2(2) + 3 − (−1) = 4 + 3 + 1 = 8 ✓. Enter this matrix above to see all 7 row operations in detail.</p>
          </section>

          <section>
            <h2>Worked Example: 2×3 Augmented Matrix (Infinite Solutions)</h2>
            <p>Solve: x + 2y + z = 4, 2x + 4y + 2z = 8.</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 1  2  1 | 4 ]</p>
              <p>[ 2  4  2 | 8 ]   R₂ → R₂ − 2R₁ →   [ 0  0  0 | 0 ]</p>
            </div>
            <p>
              RREF: pivot in column 1 only. Columns 2 (y) and 3 (z) are free. The solution is x = 4 − 2s − t, y = s, z = t for any s, t ∈ ℝ. This is a 2-dimensional solution set (a plane in ℝ³ passing through the origin after shifting).
            </p>
          </section>

          <section>
            <h2>Converting Word Problems to Augmented Matrices</h2>
            <p>
              Any linear relationship can be expressed as a row in an augmented matrix. The coefficients of the unknowns fill the left side; the constant goes on the right.
            </p>
            <p>
              <strong>Example:</strong> A shop sells pens for $2 and notebooks for $5. A customer buys 3 pens and 2 notebooks for $16. Another buys 1 pen and 4 notebooks for $22. How many of each were sold to a third customer who spent $14?
            </p>
            <p>Variables: p = pens, n = notebooks. The known transactions give:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>3p + 2n = 16</p>
              <p>1p + 4n = 22</p>
            </div>
            <p>
              Augmented matrix: [[3, 2, | 16], [1, 4, | 22]]. RREF gives p = 2, n = 5. The unit prices are $2 and $5 — verifiable as consistent.
            </p>
          </section>

          <section>
            <h2>Augmented vs. Coefficient Matrix: Key Differences</h2>
            <p>
              The <strong>coefficient matrix A</strong> contains only variable coefficients — it encodes the structure of the transformation Ax. Its RREF tells you: the rank (number of pivots), whether A is invertible (rank = n), and the null space (free variables in Ax = 0).
            </p>
            <p>
              The <strong>augmented matrix [A|b]</strong> encodes the specific system Ax = b. Its RREF tells you the solution set for that particular b. Changing b changes the solution but not A — this is why Gaussian elimination on [A|b] is more efficient than computing A⁻¹ when you only need one solution.
            </p>
            <p>
              When you need the <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse</Link> A⁻¹ (which handles all right-hand sides simultaneously), apply Gauss-Jordan to [A|I] instead of [A|b]. When you only need one particular solution to Ax = b, the augmented matrix approach is more efficient.
            </p>
          </section>

          <section>
            <h2>Augmented Matrices and the Rank-Nullity Theorem</h2>
            <p>
              The Rouché–Capelli theorem states: the system Ax = b is consistent if and only if rank(A) = rank([A|b]). If consistent, the solution set has dimension n − rank(A) (where n is the number of variables). This dimension is the number of free parameters.
            </p>
            <p>
              For a 4×4 system where rank(A) = 3: one free variable, so infinite solutions form a line in ℝ⁴. For rank(A) = 2: two free variables, solutions form a plane. For rank(A) = 0: A is the zero matrix, and if b ≠ 0 there is no solution; if b = 0, all of ℝⁿ is the solution.
            </p>
          </section>

          <AdSlot id="aug-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What is an augmented matrix?', a: 'An augmented matrix [A|b] combines the coefficient matrix A with the constant vector b. Each row encodes one equation of the linear system Ax = b.' },
                { q: 'How do I read the solution from RREF of [A|b]?', a: 'Each pivot row: the variable in the pivot column equals the value in the last column. Non-pivot columns are free variables — assign them parameters t₁, t₂, … and express everything else in terms of them.' },
                { q: 'What does a zero row mean in the augmented RREF?', a: 'A zero row in the coefficient part with zero in the constant column: redundant equation (no information). With non-zero constant: the system is inconsistent (no solution).' },
                { q: 'Can I enter more equations than unknowns?', a: 'Yes. An m×n augmented matrix for m equations and n unknowns is handled the same way. Extra equations either add no information (redundant) or make the system inconsistent.' },
                { q: 'What is the difference between augmented and coefficient matrices?', a: 'The coefficient matrix A is used for structural properties (rank, invertibility, null space). The augmented matrix [A|b] is used to solve a specific system Ax = b. RREF of A ignores b; RREF of [A|b] solves for x given b.' },
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
      <RelatedCalculators exclude="/matrix/augmented" picks={['/', '/matrix/inverse', '/guides/solving-linear-systems', '/matrix/gauss-jordan', '/matrix/determinant']} />
    </>
  );
}
