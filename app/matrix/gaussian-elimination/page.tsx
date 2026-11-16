import type { Metadata } from 'next';
import Link from 'next/link';
import RREFCalculator from '@/components/calculator/RREFCalculator';
import ToolPage from '@/components/calculator/ToolPage';

export const metadata: Metadata = {
  title: { absolute: 'Gaussian Elimination Calculator with Steps' },
  description: 'Free Gaussian elimination calculator. Enter an augmented matrix, see each forward-elimination step to row echelon form, then the solution. Exact fractions, no sign-up.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/gaussian-elimination/' },
};

const faqs = [
  { q: 'What is Gaussian elimination?', a: 'Gaussian elimination is a method for solving a system of linear equations. It uses elementary row operations to turn the augmented matrix into row echelon form (an upper-triangular staircase), then finds the unknowns by back substitution starting from the last equation.' },
  { q: 'What is the difference between Gaussian elimination and Gauss-Jordan elimination?', a: 'Gaussian elimination stops at row echelon form and finishes with back substitution. Gauss-Jordan elimination keeps going until the matrix is in reduced row echelon form, where the solution can be read directly. Both give the same answer.' },
  { q: 'How does this calculator show the solution?', a: 'The Step-by-Step tab lists every forward-elimination row operation down to row echelon form. The Solution tab gives the values of the unknowns, or reports that the system has no solution or infinitely many.' },
  { q: 'What if a pivot is zero?', a: 'Swap the row with a lower row that has a non-zero entry in that column. If no such row exists, the column has no pivot and its variable is free. The calculator does the swap automatically and labels it in the steps.' },
  { q: 'Does Gaussian elimination work when there are more unknowns than equations?', a: 'Yes. The method works for any number of equations and unknowns. With more unknowns than pivots, the system has free variables and therefore either no solution or infinitely many.' },
  { q: 'Is partial pivoting used?', a: 'No. Partial pivoting is a numerical technique that reduces rounding error in floating-point arithmetic. This calculator works with exact fractions, so there is no rounding error to control and it uses the first non-zero entry as the pivot, as you would by hand.' },
];

export default function GaussianEliminationPage() {
  return (
    <ToolPage
      path="/matrix/gaussian-elimination/"
      name="Gaussian Elimination Calculator"
      h1="Gaussian Elimination Calculator"
      intro="Solve a linear system by forward elimination and back substitution. Enter the augmented matrix [A|b] and follow every row operation."
      schemaDescription="Solves systems of linear equations by Gaussian elimination: forward elimination to row echelon form followed by back substitution, with exact rational arithmetic."
      section="Matrix Calculators"
      badges={['100% Free', 'No Sign-up', 'Forward Elimination Steps', 'Exact Fractions', 'Unique / Infinite / None']}
      faqs={faqs}
      related={['/matrix/gauss-jordan', '/matrix/row-echelon-form', '/algebra/system-of-equations', '/matrix/augmented', '/matrix/cramers-rule', '/']}
      calculator={<RREFCalculator defaultMode="ref" defaultAugmented />}
    >
      <section>
        <h2>How to Use the Gaussian Elimination Calculator</h2>
        <ol className="space-y-2">
          <li><strong>Write the system as an augmented matrix.</strong> Each row is one equation. The coefficients go in the left columns and the constant goes in the last column, to the right of the bar.</li>
          <li><strong>Choose the size.</strong> Three equations in three unknowns is a 3×4 augmented matrix, which is the default.</li>
          <li><strong>Click Calculate REF.</strong> The step list shows the forward elimination that produces row echelon form.</li>
          <li><strong>Open the Solution tab.</strong> It gives the value of each unknown, or tells you the system is inconsistent or has free variables.</li>
        </ol>
        <p>
          Prefer typing equations with x, y and z instead of a matrix? Use the <Link href="/algebra/system-of-equations" className="text-primary hover:underline">system of equations calculator</Link>.
        </p>
      </section>

      <section>
        <h2>The Gaussian Elimination Algorithm</h2>
        <ol className="space-y-2">
          <li><strong>Pick the pivot.</strong> Start in the top-left. If that entry is zero, swap in a lower row whose entry in this column is non-zero.</li>
          <li><strong>Eliminate below the pivot.</strong> For each row underneath, subtract the multiple of the pivot row that makes the entry in the pivot column zero.</li>
          <li><strong>Move down and right.</strong> Repeat on the submatrix below and to the right of the pivot until no rows remain.</li>
          <li><strong>Back-substitute.</strong> The last non-zero row gives one unknown. Substitute it into the row above, and continue upward.</li>
        </ol>
      </section>

      <section>
        <h2>Worked Example</h2>
        <p>Solve x + y + z = 6, 2y + 5z = −4, 2x + 5y − z = 27.</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>[ 1  1   1 |  6 ]</p>
          <p>[ 0  2   5 | −4 ]</p>
          <p>[ 2  5  −1 | 27 ]</p>
        </div>
        <p><strong>Forward elimination.</strong> R₃ → R₃ − 2R₁ gives [0 3 −3 | 15]. Then R₃ → R₃ − (3/2)R₂ gives [0 0 −21/2 | 21].</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>[ 1  1    1   |  6 ]</p>
          <p>[ 0  2    5   | −4 ]</p>
          <p>[ 0  0  −21/2 | 21 ]</p>
        </div>
        <p><strong>Back substitution.</strong> Row 3: −(21/2)z = 21, so z = −2. Row 2: 2y + 5(−2) = −4, so y = 3. Row 1: x + 3 − 2 = 6, so x = 5.</p>
        <p>Check in the third original equation: 2(5) + 5(3) − (−2) = 27. ✓</p>
      </section>

      <section>
        <h2>Reading the Result</h2>
        <p><strong>Unique solution.</strong> Every unknown&apos;s column has a pivot. Back substitution gives one value for each unknown.</p>
        <p><strong>No solution.</strong> A row reduces to [0 0 … 0 | c] with c ≠ 0. That row says 0 = c, which is impossible, so the system is inconsistent.</p>
        <p><strong>Infinitely many solutions.</strong> The system is consistent but at least one column has no pivot. Those unknowns are free, and the others are written in terms of them.</p>
        <p>
          For a longer comparison of this method with the Gauss-Jordan variant, see <Link href="/guides/gauss-jordan-vs-gaussian-elimination" className="text-primary hover:underline">Gauss-Jordan vs Gaussian elimination</Link>. If you want the fully reduced matrix, use the <Link href="/matrix/gauss-jordan" className="text-primary hover:underline">Gauss-Jordan elimination calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Gaussian Elimination vs Other Methods</h2>
        <p><strong>Substitution and elimination by hand</strong> are the same idea without the matrix bookkeeping. They get error-prone beyond three unknowns.</p>
        <p><strong><Link href="/matrix/cramers-rule" className="text-primary hover:underline">Cramer&apos;s rule</Link></strong> gives a formula for each unknown using determinants. It only works for square systems with a non-zero determinant, and it is slower for anything larger than 3×3.</p>
        <p><strong>Matrix inverse</strong> (x = A⁻¹b) also needs a square invertible matrix. Computing the <Link href="/matrix/inverse" className="text-primary hover:underline">inverse</Link> costs more work than one elimination, so it only pays off when you solve with many different right-hand sides.</p>
      </section>
    </ToolPage>
  );
}
