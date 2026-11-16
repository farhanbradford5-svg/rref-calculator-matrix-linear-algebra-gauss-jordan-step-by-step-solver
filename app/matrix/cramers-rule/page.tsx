import type { Metadata } from 'next';
import Link from 'next/link';
import CramersRuleCalculator from '@/components/calculator/CramersRuleCalculator';
import ToolPage from '@/components/calculator/ToolPage';

export const metadata: Metadata = {
  title: { absolute: "Cramer's Rule Calculator with Steps (2×2, 3×3, 4×4)" },
  description: "Free Cramer's rule calculator. Solve 2×2, 3×3 and 4×4 linear systems with determinants: see D, each replaced-column determinant, and the exact fraction solution.",
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/cramers-rule/' },
};

const faqs = [
  { q: "What is Cramer's rule?", a: "Cramer's rule is a formula for solving a square system of linear equations Ax = b using determinants. Each unknown equals a ratio: the determinant of A with one column replaced by b, divided by the determinant of A." },
  { q: "When can you not use Cramer's rule?", a: "Cramer's rule fails when det(A) = 0, because the formula would divide by zero. In that case the system has either no solution or infinitely many. It also cannot be used when the number of equations differs from the number of unknowns." },
  { q: "How do you do Cramer's rule for a 3×3 system?", a: "Compute D = det(A). Then build three matrices by replacing the first, second and third column of A with the constants, and compute their determinants Dx, Dy and Dz. The solution is x = Dx/D, y = Dy/D, z = Dz/D." },
  { q: "What does it mean if D = 0 but the other determinants are not 0?", a: "If D = 0 and at least one of the replaced-column determinants is non-zero, the system has no solution. If D and all the replaced-column determinants are 0, the system may have infinitely many solutions or none; row reduction is needed to tell which." },
  { q: "Is Cramer's rule faster than Gaussian elimination?", a: "Only for 2×2 systems. For 3×3 it requires four determinants, and the work grows very quickly with size. Gaussian elimination is far more efficient for large systems, which is why Cramer's rule is mainly used for small systems and in proofs." },
  { q: "Does the calculator give exact answers?", a: "Yes. Every determinant and every quotient is computed with exact fractions, so a solution like x = 7/4 is shown as 7/4 rather than 1.75 or a rounded decimal." },
];

export default function CramersRulePage() {
  return (
    <ToolPage
      path="/matrix/cramers-rule/"
      name="Cramer's Rule Calculator"
      h1="Cramer's Rule Calculator"
      intro="Solve a 2×2, 3×3 or 4×4 system of linear equations with determinants. Each determinant is shown, then each unknown as a ratio."
      schemaDescription="Solves square systems of linear equations with Cramer's rule, showing the coefficient determinant, each replaced-column determinant and the exact rational solution."
      section="Matrix Calculators"
      badges={['100% Free', 'No Sign-up', 'Every Determinant Shown', 'Exact Fractions', '2×2 to 4×4']}
      faqs={faqs}
      related={['/matrix/determinant', '/algebra/system-of-equations', '/matrix/gaussian-elimination', '/matrix/inverse', '/matrix/augmented', '/']}
      calculator={<CramersRuleCalculator />}
    >
      <section>
        <h2>How to Use the Cramer&apos;s Rule Calculator</h2>
        <ol className="space-y-2">
          <li><strong>Choose 2, 3 or 4 equations.</strong> Cramer&apos;s rule needs the same number of equations as unknowns.</li>
          <li><strong>Enter the augmented matrix.</strong> Coefficients go to the left of the bar, constants to the right. For 2x + y = 5, the row is 2, 1 | 5.</li>
          <li><strong>Click Solve.</strong> The calculator shows D = det(A), then the determinant with each column replaced, then each unknown as a quotient.</li>
        </ol>
      </section>

      <section>
        <h2>The Formula</h2>
        <p>For a system Ax = b with n equations and n unknowns and det(A) ≠ 0:</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">xᵢ = det(Aᵢ) / det(A)</div>
        <p>
          Here Aᵢ is the matrix A with its i-th column replaced by the column of constants b. For two equations ax + by = e and cx + dy = f this becomes
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>x = (ed − bf) / (ad − bc)</p>
          <p>y = (af − ec) / (ad − bc)</p>
        </div>
      </section>

      <section>
        <h2>Worked Example: 2×2 System</h2>
        <p>Solve 2x + y = 5 and 4x − 6y = −2.</p>
        <p><strong>D</strong> = det [[2, 1], [4, −6]] = (2)(−6) − (1)(4) = −16.</p>
        <p><strong>Dₓ</strong>: replace column 1 with the constants. det [[5, 1], [−2, −6]] = (5)(−6) − (1)(−2) = −28.</p>
        <p><strong>D_y</strong>: replace column 2 with the constants. det [[2, 5], [4, −2]] = (2)(−2) − (5)(4) = −24.</p>
        <p><strong>Solution.</strong> x = −28 / −16 = 7/4 and y = −24 / −16 = 3/2.</p>
        <p><strong>Check.</strong> 2(7/4) + 3/2 = 7/2 + 3/2 = 5. ✓</p>
      </section>

      <section>
        <h2>Worked Example: 3×3 System</h2>
        <p>Solve 2x + y − z = 8, −3x − y + 2z = −11, −2x + y + 2z = −3.</p>
        <p><strong>D</strong> = det(A) = −1.</p>
        <p><strong>Dₓ</strong> = −2, <strong>D_y</strong> = −3, <strong>D_z</strong> = 1 (each found by replacing one column of A with 8, −11, −3).</p>
        <p><strong>Solution.</strong> x = −2 / −1 = 2, y = −3 / −1 = 3, z = 1 / −1 = −1.</p>
        <p>Load the <em>3×3 Example</em> above to see each of the four matrices and its determinant. To see how a 3×3 determinant is expanded, use the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link>.</p>
      </section>

      <section>
        <h2>When Cramer&apos;s Rule Does Not Apply</h2>
        <p><strong>det(A) = 0.</strong> The coefficient matrix is singular and the formula divides by zero. The system is either inconsistent or has infinitely many solutions. Row reduce the augmented matrix with the <Link href="/matrix/augmented" className="text-primary hover:underline">augmented matrix calculator</Link> to see which.</p>
        <p><strong>Non-square systems.</strong> With more or fewer equations than unknowns there is no determinant of A. Use the <Link href="/algebra/system-of-equations" className="text-primary hover:underline">system of equations calculator</Link> instead.</p>
        <p><strong>Large systems.</strong> An n×n system needs n + 1 determinants. Beyond 3×3, <Link href="/matrix/gaussian-elimination" className="text-primary hover:underline">Gaussian elimination</Link> is much less work.</p>
      </section>

      <section>
        <h2>Why Cramer&apos;s Rule Works</h2>
        <p>
          Replace column i of the identity matrix with the solution vector x and call the result Iᵢ(x). Multiplying, A · Iᵢ(x) = Aᵢ, because A times each identity column gives back the matching column of A, and A times x gives b. Taking determinants, det(A) · det(Iᵢ(x)) = det(Aᵢ). The determinant of Iᵢ(x) is just xᵢ, so xᵢ = det(Aᵢ) / det(A).
        </p>
      </section>
    </ToolPage>
  );
}
