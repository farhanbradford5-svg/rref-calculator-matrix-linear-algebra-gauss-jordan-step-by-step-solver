import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Methodology — How the RREF Calculator Works | Exact Fraction Arithmetic',
  description: 'Technical methodology behind RREF Calculator: BigInt rational arithmetic, Gauss-Jordan algorithm steps, accuracy testing, exact fraction guarantees, and current limitations.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/methodology' },
};

export default function MethodologyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Methodology' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Methodology</h1>
      <p className="text-slate-500 mb-8">How our calculators work, and what they guarantee. Last updated: May 2026.</p>

      <article className="prose-content space-y-8">
        <section>
          <h2>Exact Rational Arithmetic</h2>
          <p>
            The foundation of every calculator on this site is a <strong>BigInt-based rational arithmetic library</strong>. Each number is represented as an exact fraction: a pair of JavaScript BigInt values (numerator, denominator) stored in lowest terms (gcd = 1, denominator always positive).
          </p>
          <p>
            All arithmetic operations — addition, subtraction, multiplication, division — are implemented on these rational numbers using the standard algebraic rules for fractions. The result of any operation is another exact rational number, reduced to lowest terms. No floating-point numbers are used anywhere in the computation.
          </p>
          <p>
            This approach eliminates the class of errors that plague float-based calculators. For example: (1/3) × 3 = 1 exactly, not 0.9999999999. A pivot entry that should be 1 is exactly 1 (stored as BigInt 1/1), which means subsequent elimination steps produce exact zeros where expected.
          </p>
          <p>
            JavaScript's built-in <code>number</code> type is a 64-bit IEEE 754 float, which cannot represent most fractions exactly. BigInt, by contrast, handles arbitrarily large integers with no rounding. Rational arithmetic on top of BigInt therefore handles any fraction with arbitrary precision.
          </p>
        </section>

        <section>
          <h2>The Gauss-Jordan Algorithm</h2>
          <p>
            The RREF, inverse, and Gauss-Jordan calculators all use the same core Gauss-Jordan elimination algorithm operating on a matrix of rational numbers. The algorithm proceeds as follows:
          </p>
          <ol>
            <li><strong>Column scan.</strong> Starting from the leftmost unprocessed column, find the first non-zero entry in the current row or below.</li>
            <li><strong>Row swap (if needed).</strong> If the top entry of the current column is zero, swap the current row with the first row below it that has a non-zero entry in this column. Record the swap as a step.</li>
            <li><strong>Scale to get a leading 1.</strong> Multiply the current row by the multiplicative inverse of the pivot entry. This makes the pivot exactly 1 (rational 1/1). Record the scale operation.</li>
            <li><strong>Column elimination.</strong> For every other row (both above and below), subtract the appropriate multiple of the pivot row to zero out that row's entry in the pivot column. Record each elimination.</li>
            <li><strong>Advance.</strong> Move to the next row and next unprocessed column. Repeat from step 1 until all rows are processed or no more non-zero entries exist.</li>
          </ol>
          <p>
            The result is RREF. By the uniqueness theorem, this is the unique RREF of the input matrix regardless of the specific pivot choices made (e.g., which row is selected when multiple candidates have non-zero entries).
          </p>
        </section>

        <section>
          <h2>Matrix Inverse Computation</h2>
          <p>
            The matrix inverse calculator augments the input matrix A with the identity matrix I to form [A | I], then runs the Gauss-Jordan algorithm on this augmented matrix. If A reduces to the identity on the left, the right half is exactly A⁻¹.
          </p>
          <p>
            If at any point during elimination, a pivot position in the left half contains a zero and no row below has a non-zero entry in that column, A is singular (det = 0) and the algorithm terminates with a "no inverse" result.
          </p>
        </section>

        <section>
          <h2>Determinant Computation</h2>
          <p>
            The determinant calculator uses recursive cofactor expansion along the first row. For a 2×2 matrix, the formula det = ad − bc is applied directly. For larger matrices, the determinant is computed as the signed sum of first-row entries multiplied by the determinants of their (n−1)×(n−1) minors.
          </p>
          <p>
            All arithmetic is exact. For matrices with integer entries, the result is always an exact integer. For matrices with rational entries, the result is an exact rational number.
          </p>
        </section>

        <section>
          <h2>Accuracy Guarantees</h2>
          <p>
            For <strong>rational inputs</strong> (integers and fractions entered as p/q), this calculator is <strong>perfectly accurate</strong>. The result is the mathematically exact RREF, inverse, determinant, etc. There is no floating-point error, no rounding, and no approximation.
          </p>
          <p>
            For <strong>decimal inputs</strong> (e.g., entering "0.5"), the calculator converts the decimal to the nearest exact fraction (0.5 → 1/2, 0.3333 → 3333/10000). If your decimal is a repeating decimal with no exact finite representation, entering the fraction form directly (e.g., 1/3 instead of 0.3333) gives a more accurate result.
          </p>
        </section>

        <section>
          <h2>Current Limitations</h2>
          <ul>
            <li><strong>Matrix size.</strong> The UI supports matrices up to 6×6 (and the inverse/determinant calculators up to 4×4 or 5×5). Very large matrices would require a different interface, but the underlying arithmetic library has no inherent size limit.</li>
            <li><strong>Complex numbers.</strong> Entries must be real rationals. Complex number support is not available in this version.</li>
            <li><strong>Irrational numbers.</strong> Entries like √2 are not supported symbolically. If you need √2, you must use a rational approximation (e.g., 14142/10000), which introduces a small approximation error.</li>
            <li><strong>Client-side only.</strong> All computation runs in your browser. Very large matrices or deeply nested computations could be slow on low-powered devices.</li>
          </ul>
        </section>

        <section>
          <h2>How We Test Calculator Accuracy</h2>
          <p>
            Every calculator on this site is verified against known correct results before release. Our testing process:
          </p>
          <ul>
            <li><strong>Cross-validation against established software.</strong> We compare our RREF, inverse, and determinant outputs against results from NumPy (Python), MATLAB, and Wolfram Alpha for a suite of test matrices — including integer matrices, fraction matrices, and near-singular matrices.</li>
            <li><strong>Exact fraction arithmetic verification.</strong> We test that (1/3) × 3 = 1 exactly, that row operations on fraction-entry matrices produce fraction results with no rounding, and that pivots that should be exactly 0 are stored as exactly 0 — not 1e−16.</li>
            <li><strong>Edge case matrices.</strong> We test: all-zero matrix, identity matrix, rank-deficient matrices (including cases with multiple free variables), 1×1 matrices, non-square matrices (wide and tall), and augmented matrices representing the three solution types (unique, infinite, no solution).</li>
            <li><strong>Algebraic identity checks.</strong> For invertible matrices, we verify A · A⁻¹ = I exactly. For determinants, we verify det(AB) = det(A) · det(B). For RREF, we verify the result satisfies all four RREF conditions programmatically.</li>
            <li><strong>No server-side computation.</strong> All arithmetic runs in the browser — there is no server that could cache a wrong result. Each calculation is performed fresh from your input, which makes testing straightforward: the same input always produces the same output with no network variability.</li>
          </ul>
        </section>

        <section>
          <h2>Open Source and Transparency</h2>
          <p>
            The rational arithmetic library, the Gauss-Jordan algorithm, and all calculator components are implemented in TypeScript with no external math libraries. The implementation is deliberately straightforward so the algorithm matches what you would compute by hand (the same sequence of operations, represented in the same fractions you would write down).
          </p>
        </section>
      </article>
    </main>
  );
}
