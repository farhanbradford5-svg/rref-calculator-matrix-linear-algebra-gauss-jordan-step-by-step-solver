import type { Metadata } from 'next';
import Link from 'next/link';
import DeterminantCalculator from '@/components/calculator/DeterminantCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Determinant Calculator — Step-by-Step Cofactor Expansion',
  description: 'Calculate any matrix determinant with full cofactor expansion steps. Exact rational arithmetic. 2×2 to 5×5 matrices. Free, no sign-up required.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/determinant' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Matrix Determinant Calculator',
  description: 'Calculate the determinant of any square matrix via cofactor expansion with exact rational arithmetic. Shows every step.',
  url: 'https://rrefmatrixcalc.com/matrix/determinant',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/matrix/determinant',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Determinant Calculator', item: 'https://rrefmatrixcalc.com/matrix/determinant' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does a determinant of 0 mean?', acceptedAnswer: { '@type': 'Answer', text: 'The matrix is singular. Its rows are linearly dependent, it has no inverse, and the linear system Ax = b may have no solution or infinitely many solutions.' } },
    { '@type': 'Question', name: 'Can a determinant be negative?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A negative determinant means the transformation reverses orientation (like a reflection). The absolute value still represents the volume scaling factor.' } },
    { '@type': 'Question', name: 'Is the determinant of a triangular matrix easy to compute?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — for any triangular matrix (upper or lower), det equals the product of the diagonal entries. This is why Gaussian elimination is efficient for computing determinants.' } },
    { '@type': 'Question', name: 'How does row reduction affect the determinant?', acceptedAnswer: { '@type': 'Answer', text: 'Adding a multiple of one row to another leaves det unchanged. Scaling a row by c multiplies det by c. Swapping two rows multiplies det by −1.' } },
    { '@type': 'Question', name: 'What is the determinant of the identity matrix?', acceptedAnswer: { '@type': 'Answer', text: 'det(I) = 1 for any size. The identity preserves all volumes and orientations.' } },
    { '@type': 'Question', name: 'Can I compute the determinant of a non-square matrix?', acceptedAnswer: { '@type': 'Answer', text: 'No. The determinant is only defined for square matrices.' } },
    { '@type': 'Question', name: 'Is det(A + B) = det(A) + det(B)?', acceptedAnswer: { '@type': 'Answer', text: 'No — this is false in general. The determinant is multiplicative: det(AB) = det(A)·det(B), but it is not additive.' } },
    { '@type': 'Question', name: 'Is this calculator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no account required.' } },
  ],
};

export default function DeterminantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Matrix Calculators' }, { label: 'Determinant' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Determinant Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Compute det(A) for any square matrix with full cofactor expansion shown at every step.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <DeterminantCalculator />
        <AdSlot id="det-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Exact Fractions', 'Cofactor Expansion', 'BigInt Precision'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is a Matrix Determinant?</h2>
            <p>
              The determinant is a single scalar value associated with every square matrix. Written det(A) or |A|, it encodes crucial geometric and algebraic information about the matrix. Geometrically, |det(A)| is the factor by which A scales volumes: a 2×2 matrix with det = 3 expands areas by 3, while det = −2 flips orientation and doubles areas.
            </p>
            <p>
              Algebraically, det(A) ≠ 0 is exactly the condition for A to be invertible. A zero determinant means the matrix is singular — its rows are linearly dependent, the linear system Ax = b may be inconsistent, and no inverse exists.
            </p>
            <p>Key determinant properties:</p>
            <ul>
              <li><strong>det(AB) = det(A) · det(B)</strong> — multiplicativity (use the <Link href="/matrix/multiply" className="text-primary hover:underline">matrix multiplication calculator</Link> to form AB before computing its determinant)</li>
              <li><strong>det(Aᵀ) = det(A)</strong> — transpose preserves the determinant</li>
              <li><strong>det(A⁻¹) = 1/det(A)</strong></li>
              <li><strong>det(kA) = kⁿ det(A)</strong> for an n×n matrix scaled by k</li>
              <li>Swapping two rows multiplies det by −1</li>
              <li>Scaling a row by c multiplies det by c</li>
              <li>Adding a multiple of one row to another does not change det</li>
            </ul>
          </section>

          <section>
            <h2>How This Calculator Computes Determinants</h2>
            <p>
              This calculator uses <strong>cofactor expansion along the first row</strong>, also called Laplace expansion. For an n×n matrix A, the determinant is:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              det(A) = Σⱼ (−1)^(1+j) · a₁ⱼ · det(M₁ⱼ)
            </div>
            <p>
              where M₁ⱼ is the (n−1)×(n−1) minor obtained by deleting row 1 and column j. This recursion bottoms out at 2×2 matrices, which are computed directly as ad − bc. All arithmetic uses BigInt-based exact rational numbers — no floating-point approximation.
            </p>
            <p>
              For sparse matrices (many zeros), cofactor expansion is especially efficient because terms with a₁ⱼ = 0 contribute nothing and can be skipped. For dense matrices, row reduction is more efficient — but since our matrices top out at 5×5 here, cofactor expansion shows every step clearly.
            </p>
          </section>

          <section>
            <h2>Worked Example 1: 2×2 Determinant</h2>
            <p>For A = [[3, −2], [1, 4]]:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              det(A) = (3)(4) − (−2)(1) = 12 + 2 = 14
            </div>
            <p>Since det = 14 ≠ 0, A is invertible. The transformation scales areas by a factor of 14.</p>
          </section>

          <section>
            <h2>Worked Example 2: 3×3 Determinant (Cofactor Expansion)</h2>
            <p>For A = [[2, −1, 0], [3, 1, 2], [−1, 4, 3]]:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>det(A) = 2 · det([[1,2],[4,3]]) − (−1) · det([[3,2],[−1,3]]) + 0 · det([[3,1],[−1,4]])</p>
              <p>= 2(3−8) + 1(9+2) + 0</p>
              <p>= 2(−5) + 11</p>
              <p>= −10 + 11 = 1</p>
            </div>
            <p>det = 1, so the transformation preserves volume exactly and the matrix is invertible.</p>
          </section>

          <section>
            <h2>Worked Example 3: Singular Matrix (det = 0)</h2>
            <p>For A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] (the "rank 2" matrix that appears in many textbooks):</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>det(A) = 1 · det([[5,6],[8,9]]) − 2 · det([[4,6],[7,9]]) + 3 · det([[4,5],[7,8]])</p>
              <p>= 1(45−48) − 2(36−42) + 3(32−35)</p>
              <p>= −3 + 12 − 9 = 0</p>
            </div>
            <p>det = 0 because row 3 = row 1 + row 2. The matrix is singular — it has no inverse and rank 2 (not 3).</p>
          </section>

          <section>
            <h2>Determinant vs. Trace: Two Key Scalar Invariants</h2>
            <p>
              Every square matrix has two fundamental scalar invariants: the <strong>determinant</strong> and the <strong>trace</strong> (sum of diagonal entries). Both are unchanged by similarity transformations (changing basis).
            </p>
            <p>
              For a 2×2 matrix with eigenvalues λ₁ and λ₂: det = λ₁λ₂ and trace = λ₁ + λ₂. This is why the characteristic polynomial p(λ) = λ² − trace·λ + det gives the eigenvalues directly.
            </p>
            <p>
              The determinant is the product of all eigenvalues; the trace is their sum. This relationship extends to n×n matrices through the coefficients of the characteristic polynomial.
            </p>
          </section>

          <section>
            <h2>Applications of Determinants</h2>
            <p>
              The determinant is one of the most important scalar invariants in linear algebra. For the conceptual foundations — what the determinant means geometrically and how it connects to rank and invertibility — see our <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics guide</Link>. For how determinants appear in the context of solving linear systems (Cramer's rule, checking consistency), see the <Link href="/guides/solving-linear-systems" className="text-primary hover:underline">solving linear systems guide</Link>.
            </p>
            <p><strong>Invertibility test.</strong> The quickest check for whether a matrix is invertible: compute det. If det = 0, no inverse exists. If det ≠ 0, the matrix is invertible.</p>
            <p><strong>Cramer's rule.</strong> For the system Ax = b, Cramer's rule gives xᵢ = det(Aᵢ)/det(A), where Aᵢ is A with column i replaced by b. Pedagogically important but computationally inefficient for large systems.</p>
            <p><strong>Area and volume.</strong> The absolute value of det([[u₁,u₂],[v₁,v₂]]) equals the area of the parallelogram spanned by vectors u and v. For 3D, |det([u,v,w])| gives the volume of the parallelepiped.</p>
            <p><strong>Eigenvalues.</strong> The eigenvalues of A are the roots of the characteristic polynomial det(A − λI) = 0. Computing the determinant is the first step in finding eigenvalues analytically.</p>
            <p><strong>Change of variables in integration.</strong> The Jacobian determinant appears in multivariable calculus when substituting variables: ∫∫ f(x,y) dx dy = ∫∫ f(g(u,v)) |det J| du dv.</p>
          </section>

          <section>
            <h2>Computing Determinants via Row Reduction</h2>
            <p>
              Cofactor expansion is O(n!) in cost — completely impractical for large matrices. Row reduction to upper triangular form computes the determinant in O(n³) operations, which is how all numerical linear algebra libraries (NumPy, MATLAB, LAPACK) work internally.
            </p>
            <p>
              Track determinant changes as you row-reduce: adding a multiple of one row to another leaves det unchanged; swapping rows multiplies det by −1; scaling a row by c multiplies det by c. Once you reach upper triangular form U, det(A) equals the product of U's diagonal entries, adjusted for all swaps and scalings applied.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>A = [[0,1,2],[3,4,5],[1,0,6]]</p>
              <p>Swap R₁↔R₂: factor of −1 → [[3,4,5],[0,1,2],[1,0,6]]</p>
              <p>R₃ → R₃ − (1/3)R₁ → [[3,4,5],[0,1,2],[0,−4/3,13/3]]</p>
              <p>R₃ → R₃ + (4/3)R₂ → [[3,4,5],[0,1,2],[0,0,7]]</p>
              <p>det(A) = (−1) × 3 × 1 × 7 = −21</p>
            </div>
            <p>
              This determinant calculator uses cofactor expansion to display every term. For larger systems, the <Link href="/" className="text-primary hover:underline">RREF calculator</Link> uses row reduction internally.
            </p>
          </section>

          <section>
            <h2>Determinants of Special Matrices</h2>
            <p>Recognizing special structure lets you read off the determinant immediately:</p>
            <ul>
              <li><strong>Diagonal matrix diag(d₁,…,dₙ):</strong> det = d₁·d₂·⋯·dₙ. All off-diagonal cofactors vanish.</li>
              <li><strong>Triangular matrix (upper or lower):</strong> det = product of diagonal entries, regardless of off-diagonal values. This is why LU decomposition makes det efficient.</li>
              <li><strong>Orthogonal matrix Q:</strong> det(Q) = ±1. Rotations have det = +1; reflections det = −1.</li>
              <li><strong>Block diagonal matrix [[A,0],[0,B]]:</strong> det = det(A)·det(B).</li>
              <li><strong>Matrix with two equal rows:</strong> det = 0. Swapping them changes sign but leaves the matrix identical, forcing det = −det = 0.</li>
              <li><strong>Rank-deficient matrix:</strong> det = 0 always. If the RREF has a zero row, the matrix is singular.</li>
            </ul>
          </section>

          <section>
            <h2>The Characteristic Polynomial and Eigenvalues</h2>
            <p>
              The eigenvalues of A are values λ where det(A − λI) = 0. The function p(λ) = det(A − λI) is the <strong>characteristic polynomial</strong> — a degree-n polynomial whose roots are the eigenvalues.
            </p>
            <p>For a 2×2 matrix A = [[a,b],[c,d]]:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>p(λ) = (a−λ)(d−λ) − bc = λ² − trace(A)·λ + det(A)</p>
            </div>
            <p>
              So det(A) equals the product of all eigenvalues, and trace(A) equals their sum. For A = [[3,1],[2,4]]: det = 10, trace = 7, eigenvalues satisfy λ² − 7λ + 10 = 0 → λ = 2 or 5. Product = 10 ✓, sum = 7 ✓.
            </p>
            <p>
              A matrix is singular (det = 0) if and only if 0 is an eigenvalue. Use the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link> above to evaluate det(A − λI) for specific λ to find eigenvalues numerically.
            </p>
          </section>

          <section>
            <h2>Cramer's Rule and the Adjugate Formula</h2>
            <p>
              <strong>Cramer's rule</strong> expresses the solution to Ax = b using determinants: xᵢ = det(Aᵢ)/det(A), where Aᵢ is A with column i replaced by b. While elegant for 2×2 and 3×3 systems, it requires computing n+1 determinants and is impractical for n &gt; 3. Gaussian elimination is far more efficient.
            </p>
            <p>
              The <strong>adjugate formula</strong> A⁻¹ = (1/det(A))·adj(A), where adj(A) is the transpose of the cofactor matrix, connects determinants to matrix inversion. For 2×2: A = [[a,b],[c,d]] → A⁻¹ = (1/(ad−bc))·[[d,−b],[−c,a]]. For practical inversion, the <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse calculator</Link> uses Gauss-Jordan elimination — significantly faster than the adjugate for matrices larger than 3×3.
            </p>
          </section>

          <AdSlot id="det-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What does a determinant of 0 mean?', a: 'The matrix is singular. Its rows are linearly dependent, it has no inverse, and the linear system Ax = b may have no solution or infinitely many.' },
                { q: 'Can a determinant be negative?', a: 'Yes. A negative determinant means the transformation reverses orientation (like a reflection). The magnitude still represents the volume scaling factor.' },
                { q: 'Is the determinant of a triangular matrix easy to compute?', a: 'Yes — for any triangular matrix (upper or lower), det = product of diagonal entries. This is why Gaussian elimination (which produces an upper triangular matrix) is efficient for determinants.' },
                { q: 'How does row reduction affect the determinant?', a: 'Adding a multiple of one row to another: det unchanged. Scaling a row by c: det multiplies by c. Swapping two rows: det multiplies by −1.' },
                { q: 'What is the determinant of the identity matrix?', a: 'det(I) = 1 for any size. The identity preserves all volumes.' },
                { q: 'Can I compute det of a non-square matrix?', a: 'No. The determinant is only defined for square matrices.' },
                { q: 'Is det(A + B) = det(A) + det(B)?', a: 'No — this formula is false in general. The determinant is multiplicative (det(AB) = det(A)det(B)) but not additive.' },
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
      <RelatedCalculators exclude="/matrix/determinant" picks={['/', '/matrix/inverse', '/matrix/gauss-jordan', '/matrix/multiply', '/vectors/dot-product']} />
    </>
  );
}
