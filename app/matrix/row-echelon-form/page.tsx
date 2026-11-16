import type { Metadata } from 'next';
import Link from 'next/link';
import RREFCalculator from '@/components/calculator/RREFCalculator';
import ToolPage from '@/components/calculator/ToolPage';

export const metadata: Metadata = {
  title: { absolute: 'Row Echelon Form Calculator (REF) with Steps' },
  description: 'Free row echelon form calculator. Reduce any matrix up to 6×6 to REF with every row operation shown, exact fractions, and one-click switch to RREF.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/row-echelon-form/' },
};

const faqs = [
  { q: 'What is row echelon form?', a: 'A matrix is in row echelon form (REF) when all zero rows are at the bottom, the first non-zero entry of each row (the pivot) is to the right of the pivot in the row above, and every entry below a pivot is zero. The result looks like a staircase.' },
  { q: 'Is row echelon form unique?', a: 'No. A matrix has many row echelon forms, because you can scale rows or choose different pivots and still satisfy the three conditions. Only the reduced row echelon form (RREF) is unique. If your REF differs from this calculator\'s, compare the pivot positions: those always match.' },
  { q: 'Does the leading entry have to be 1 in REF?', a: 'It depends on the textbook. Some authors (Lay, Strang) allow any non-zero pivot in REF; others require a leading 1. This calculator leaves pivots unscaled in REF mode, which is the more common convention. Switch the Form toggle to RREF if you need leading 1s.' },
  { q: 'What is the difference between REF and RREF?', a: 'REF only requires zeros below each pivot. RREF also requires each pivot to equal 1 and zeros above each pivot. REF is reached by forward elimination; RREF needs the extra backward pass of Gauss-Jordan elimination.' },
  { q: 'How do I find the rank from row echelon form?', a: 'Count the non-zero rows. Each non-zero row of an echelon form contains exactly one pivot, and the number of pivots is the rank of the matrix.' },
  { q: 'Can I enter fractions and decimals?', a: 'Yes. Type fractions as 3/4 and decimals as 0.75. All arithmetic is done with exact fractions, so the echelon form never contains rounding errors.' },
];

export default function RowEchelonFormPage() {
  return (
    <ToolPage
      path="/matrix/row-echelon-form/"
      name="Row Echelon Form Calculator"
      h1="Row Echelon Form Calculator (REF)"
      intro="Reduce a matrix to row echelon form by forward elimination. Every row swap and row replacement is listed, with exact fractions throughout."
      schemaDescription="Reduces any matrix to row echelon form (REF) using forward Gaussian elimination, showing each elementary row operation with exact rational arithmetic."
      section="Matrix Calculators"
      badges={['100% Free', 'No Sign-up', 'Every Row Operation', 'Exact Fractions', 'REF or RREF']}
      faqs={faqs}
      related={['/', '/matrix/gaussian-elimination', '/matrix/gauss-jordan', '/matrix/augmented', '/matrix/null-space', '/matrix/determinant']}
      calculator={<RREFCalculator defaultMode="ref" defaultAugmented={false} />}
    >
      <section>
        <h2>How to Use the Row Echelon Form Calculator</h2>
        <ol className="space-y-2">
          <li><strong>Set the size.</strong> Choose rows and columns (2 to 6 each), or click a preset such as 3×3 or 3×4.</li>
          <li><strong>Enter the matrix.</strong> Type the entries, or use <em>Paste Matrix</em> to drop in rows copied from a spreadsheet or a homework PDF.</li>
          <li><strong>Click Calculate REF.</strong> The calculator starts in REF mode. The step list shows each operation and the matrix after it.</li>
          <li><strong>Need RREF instead?</strong> Flip the Form toggle to RREF. The same matrix is reduced the rest of the way without retyping.</li>
        </ol>
      </section>

      <section>
        <h2>The Three Conditions for Row Echelon Form</h2>
        <ol className="space-y-2">
          <li><strong>Zero rows are at the bottom.</strong> Any row made entirely of zeros sits below every non-zero row.</li>
          <li><strong>Pivots move to the right.</strong> The leading (first non-zero) entry of each row is in a column strictly to the right of the leading entry in the row above.</li>
          <li><strong>Zeros below each pivot.</strong> Every entry in a pivot&apos;s column that lies below the pivot is zero.</li>
        </ol>
        <p>
          Reduced row echelon form adds two more conditions: each pivot equals 1, and each pivot is the only non-zero entry in its column. The <Link href="/guides/ref-vs-rref" className="text-primary hover:underline">REF vs RREF guide</Link> compares the two forms side by side.
        </p>
      </section>

      <section>
        <h2>Worked Example: 3×3 Matrix to REF</h2>
        <p>Reduce the matrix below to row echelon form.</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>[ 1  2  1 ]</p>
          <p>[ 2  5  4 ]</p>
          <p>[ 3  7  8 ]</p>
        </div>
        <p><strong>Step 1.</strong> Clear column 1 below the pivot 1: R₂ → R₂ − 2R₁ and R₃ → R₃ − 3R₁.</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>[ 1  2  1 ]</p>
          <p>[ 0  1  2 ]</p>
          <p>[ 0  1  5 ]</p>
        </div>
        <p><strong>Step 2.</strong> Clear column 2 below the pivot 1 in row 2: R₃ → R₃ − R₂.</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>[ 1  2  1 ]</p>
          <p>[ 0  1  2 ]</p>
          <p>[ 0  0  3 ]</p>
        </div>
        <p>
          The matrix is now in row echelon form with pivots 1, 1 and 3. Three pivots means rank 3, so the matrix is invertible. Because only row replacements were used, the determinant is the product of the pivots: 1 · 1 · 3 = 3.
        </p>
      </section>

      <section>
        <h2>What Row Echelon Form Tells You</h2>
        <p><strong>Rank.</strong> The number of non-zero rows (pivots) is the rank of the matrix.</p>
        <p><strong>Consistency of a system.</strong> For an augmented matrix [A|b], a row of the form [0 0 … 0 | c] with c ≠ 0 means the system has no solution. Use the <Link href="/matrix/augmented" className="text-primary hover:underline">augmented matrix calculator</Link> to classify a system directly.</p>
        <p><strong>Solution by back substitution.</strong> Once [A|b] is in REF, solve the last equation first and substitute upward. This is exactly <Link href="/matrix/gaussian-elimination" className="text-primary hover:underline">Gaussian elimination</Link>.</p>
        <p><strong>Determinant.</strong> For a square matrix, det(A) equals the product of the REF pivots, with the sign flipped once for every row swap that was used.</p>
        <p><strong>Free variables.</strong> Columns without a pivot correspond to free variables, which is the starting point for finding the <Link href="/matrix/null-space" className="text-primary hover:underline">null space</Link>.</p>
      </section>

      <section>
        <h2>Why Your REF May Not Match the Answer Key</h2>
        <p>
          Row echelon form is not unique. If you scale a row, or pick a different row to swap into the pivot position, you get a different but equally valid echelon form. Two things never change: which columns contain pivots, and how many pivots there are. If those agree with the calculator, your REF is correct. If your course wants one specific answer, it is almost certainly asking for RREF, which is unique. Use the <Link href="/" className="text-primary hover:underline">RREF calculator</Link> for that.
        </p>
      </section>
    </ToolPage>
  );
}
