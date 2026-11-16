import type { Metadata } from 'next';
import Link from 'next/link';
import EigenvalueCalculator from '@/components/calculator/EigenvalueCalculator';
import ToolPage from '@/components/calculator/ToolPage';

export const metadata: Metadata = {
  title: { absolute: 'Eigenvalue Calculator — Eigenvalues and Eigenvectors with Steps' },
  description: 'Free eigenvalue and eigenvector calculator for 2×2, 3×3 and 4×4 matrices. Shows the characteristic polynomial, exact eigenvalues where possible, and eigenvectors.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/eigenvalues/' },
};

const faqs = [
  { q: 'What is an eigenvalue?', a: 'An eigenvalue of a square matrix A is a number λ for which there is a non-zero vector v with Av = λv. The matrix only stretches or flips v; it does not change its direction. The vector v is called an eigenvector for λ.' },
  { q: 'How do you find eigenvalues by hand?', a: 'Form the matrix A − λI, take its determinant to get the characteristic polynomial, and solve det(A − λI) = 0. For a 2×2 matrix this is the quadratic λ² − (trace)λ + (determinant) = 0.' },
  { q: 'How do you find eigenvectors?', a: 'For each eigenvalue λ, row reduce A − λI and solve (A − λI)v = 0. The free variables give the eigenvectors. In other words, the eigenvectors for λ are the non-zero vectors in the null space of A − λI.' },
  { q: 'Are the eigenvalues exact?', a: 'When the eigenvalues are rational, or are roots of a quadratic factor (for example (1 + √5)/2), the calculator gives them exactly. When the characteristic polynomial has an irreducible factor of degree three or higher, exact radicals are impractical and the calculator gives decimals to six places, clearly marked with ≈.' },
  { q: 'Can a real matrix have complex eigenvalues?', a: 'Yes. A rotation matrix such as [[0, −1], [1, 0]] has eigenvalues i and −i. Complex eigenvalues of a real matrix always come in conjugate pairs. The calculator reports them but does not compute their complex eigenvectors.' },
  { q: 'What does it mean if an eigenvalue is 0?', a: 'The matrix is singular: its determinant is 0 and it has no inverse. The eigenvectors for λ = 0 are exactly the non-zero vectors in the null space of A.' },
  { q: 'What are algebraic and geometric multiplicity?', a: 'Algebraic multiplicity is how many times an eigenvalue repeats as a root of the characteristic polynomial. Geometric multiplicity is the number of independent eigenvectors it has. If the geometric multiplicity is smaller for any eigenvalue, the matrix cannot be diagonalized.' },
];

export default function EigenvaluesPage() {
  return (
    <ToolPage
      path="/matrix/eigenvalues/"
      name="Eigenvalue Calculator"
      h1="Eigenvalue and Eigenvector Calculator"
      intro="Find the eigenvalues and eigenvectors of a 2×2, 3×3 or 4×4 matrix. The characteristic polynomial is computed exactly, then solved."
      schemaDescription="Computes the characteristic polynomial, eigenvalues and eigenvectors of 2×2, 3×3 and 4×4 matrices, with exact results for rational and quadratic-surd eigenvalues."
      section="Matrix Calculators"
      badges={['100% Free', 'No Sign-up', 'Characteristic Polynomial', 'Exact Where Possible', 'Eigenvectors Included']}
      faqs={faqs}
      related={['/matrix/determinant', '/matrix/null-space', '/', '/matrix/inverse', '/matrix/multiply', '/matrix/transpose']}
      calculator={<EigenvalueCalculator />}
    >
      <section>
        <h2>How to Use the Eigenvalue Calculator</h2>
        <ol className="space-y-2">
          <li><strong>Choose the size.</strong> Eigenvalues are only defined for square matrices: pick 2×2, 3×3 or 4×4.</li>
          <li><strong>Enter the matrix.</strong> Integers, fractions like 1/2 and decimals are all accepted.</li>
          <li><strong>Click Find Eigenvalues.</strong> You get three results: the characteristic polynomial, the eigenvalues, and a basis of eigenvectors for each real eigenvalue.</li>
        </ol>
      </section>

      <section>
        <h2>How Eigenvalues Are Calculated</h2>
        <p>
          A number λ is an eigenvalue of A when Av = λv has a non-zero solution v. Rearranged, that is (A − λI)v = 0, which has a non-zero solution only when A − λI is singular, so
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">det(A − λI) = 0</div>
        <p>
          The left side is a polynomial in λ of degree n called the <strong>characteristic polynomial</strong>. Its roots are the eigenvalues. This calculator builds the polynomial with exact fractions, removes every rational root, and solves any remaining quadratic with the quadratic formula so that answers like (5 ± √33)/2 stay exact.
        </p>
      </section>

      <section>
        <h2>Worked Example: Eigenvalues of a 2×2 Matrix</h2>
        <p>Find the eigenvalues and eigenvectors of A = [[4, 1], [2, 3]].</p>
        <p><strong>Characteristic polynomial.</strong> For a 2×2 matrix, p(λ) = λ² − (trace)λ + det. Here trace = 4 + 3 = 7 and det = 4·3 − 1·2 = 10, so p(λ) = λ² − 7λ + 10.</p>
        <p><strong>Eigenvalues.</strong> λ² − 7λ + 10 = (λ − 5)(λ − 2), so λ₁ = 5 and λ₂ = 2.</p>
        <p><strong>Eigenvector for λ = 5.</strong> A − 5I = [[−1, 1], [2, −2]]. Both rows say −x + y = 0, so y = x and v = (1, 1).</p>
        <p><strong>Eigenvector for λ = 2.</strong> A − 2I = [[2, 1], [2, 1]]. Both rows say 2x + y = 0, so v = (−1/2, 1), or equivalently (1, −2).</p>
        <p><strong>Check.</strong> A(1, 1) = (5, 5) = 5·(1, 1). ✓ The eigenvalues add to the trace (5 + 2 = 7) and multiply to the determinant (5 · 2 = 10).</p>
      </section>

      <section>
        <h2>Two Quick Checks for Any Answer</h2>
        <p><strong>The sum of the eigenvalues equals the trace</strong> (the sum of the diagonal entries of A).</p>
        <p><strong>The product of the eigenvalues equals the determinant.</strong> You can confirm det(A) with the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link>.</p>
        <p>Both identities count repeated eigenvalues with their multiplicity and include complex ones. The calculator prints the trace and determinant under the characteristic polynomial so you can verify at a glance.</p>
      </section>

      <section>
        <h2>Special Cases Worth Knowing</h2>
        <p><strong>Triangular and diagonal matrices.</strong> The eigenvalues are the diagonal entries. No calculation is needed.</p>
        <p><strong>Symmetric matrices.</strong> All eigenvalues are real, and eigenvectors for different eigenvalues are perpendicular. Check perpendicularity with the <Link href="/vectors/dot-product" className="text-primary hover:underline">dot product calculator</Link>.</p>
        <p><strong>Repeated eigenvalues.</strong> A repeated root may have fewer independent eigenvectors than its multiplicity. [[2, 1], [0, 2]] has λ = 2 twice but only one eigenvector direction, so it is not diagonalizable.</p>
        <p><strong>Singular matrices.</strong> 0 is an eigenvalue exactly when det(A) = 0. Its eigenvectors form the <Link href="/matrix/null-space" className="text-primary hover:underline">null space</Link> of A.</p>
      </section>

      <section>
        <h2>Where Eigenvalues Are Used</h2>
        <p><strong>Diagonalization.</strong> If A has n independent eigenvectors, A = PDP⁻¹ with the eigenvalues on the diagonal of D. Powers of A then reduce to powers of numbers.</p>
        <p><strong>Differential equations.</strong> Solutions of x′ = Ax are built from terms e^(λt)v. The sign of each eigenvalue decides whether the system grows, decays or oscillates.</p>
        <p><strong>Data analysis.</strong> Principal component analysis uses the eigenvectors of a covariance matrix to find the directions of greatest variation.</p>
        <p><strong>Markov chains.</strong> The long-run distribution is the eigenvector for eigenvalue 1 of the transition matrix.</p>
      </section>
    </ToolPage>
  );
}
