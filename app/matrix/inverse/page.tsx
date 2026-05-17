import type { Metadata } from 'next';
import Link from 'next/link';
import InverseCalculator from '@/components/calculator/InverseCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Matrix Inverse Calculator — Step-by-Step A⁻¹ with Exact Fractions',
  description: 'Find the inverse of any square matrix with exact fraction arithmetic. Full Gauss-Jordan steps shown. Free, no sign-up. 2×2 to 6×6 matrices supported.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/inverse' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Matrix Inverse Calculator',
  description: 'Calculate the inverse of any square matrix using Gauss-Jordan elimination with exact rational arithmetic. Shows every step.',
  url: 'https://rrefmatrixcalc.com/matrix/inverse',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/matrix/inverse',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Matrix Inverse Calculator', item: 'https://rrefmatrixcalc.com/matrix/inverse' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does every matrix have an inverse?', acceptedAnswer: { '@type': 'Answer', text: 'No. Only square matrices with det(A) ≠ 0 have inverses. If det(A) = 0, the matrix is singular and has no inverse.' } },
    { '@type': 'Question', name: 'How do you find the inverse of a matrix?', acceptedAnswer: { '@type': 'Answer', text: 'The most systematic method: augment A with the identity matrix to form [A|I], then perform Gauss-Jordan elimination. If the left half reduces to the identity, the right half is A⁻¹.' } },
    { '@type': 'Question', name: 'What is A · A⁻¹?', acceptedAnswer: { '@type': 'Answer', text: 'A · A⁻¹ = I (the identity matrix). This is the definition of the matrix inverse.' } },
    { '@type': 'Question', name: 'Why does this calculator show fractions?', acceptedAnswer: { '@type': 'Answer', text: 'Matrix inverses frequently contain fractions even for integer input. Exact rational arithmetic eliminates the rounding errors that decimal calculators accumulate.' } },
  ],
};

export default function InversePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Matrix Calculators' }, { label: 'Inverse Calculator' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Matrix Inverse Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Find <strong>A⁻¹</strong> for any square matrix. Every Gauss-Jordan step shown, exact fraction arithmetic throughout.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <InverseCalculator />
        <AdSlot id="inverse-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Exact Fractions', 'Step-by-Step', 'BigInt Precision'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is a Matrix Inverse?</h2>
            <p>
              Given a square matrix <strong>A</strong>, its inverse <strong>A⁻¹</strong> is the unique matrix satisfying A · A⁻¹ = A⁻¹ · A = I, where I is the identity matrix. An inverse exists if and only if A is <em>non-singular</em> — det(A) ≠ 0 (check with the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link>), equivalently the rows of A are linearly independent.
            </p>
            <p>
              The inverse reverses the linear transformation A applies. If A rotates vectors by 30°, then A⁻¹ rotates by −30°. If A scales a direction by factor k, then A⁻¹ scales it by 1/k. This makes matrix inversion central to solving linear systems, computing change-of-basis transformations, and reversing geometric operations in computer graphics.
            </p>
            <p>Key properties (A, B invertible of the same size):</p>
            <ul>
              <li><strong>(AB)⁻¹ = B⁻¹A⁻¹</strong> — order reverses (socks-and-shoes rule)</li>
              <li><strong>(Aᵀ)⁻¹ = (A⁻¹)ᵀ</strong> — transpose and inverse commute</li>
              <li><strong>(kA)⁻¹ = (1/k) A⁻¹</strong> for any scalar k ≠ 0</li>
              <li><strong>(A⁻¹)⁻¹ = A</strong> — the inverse of the inverse is the original</li>
              <li><strong>det(A⁻¹) = 1/det(A)</strong></li>
            </ul>
          </section>

          <section>
            <h2>How to Use This Matrix Inverse Calculator</h2>
            <p>
              Select the matrix size (2×2, 3×3, or 4×4), enter each entry using Tab or arrow keys to navigate, then press <em>Find Inverse</em>. The calculator performs <Link href="/matrix/gauss-jordan" className="text-primary hover:underline">Gauss-Jordan elimination</Link> on the augmented matrix [A | I] and returns A⁻¹ with each row operation recorded. Click any step to expand it and see the full matrix state after that operation.
            </p>
            <p>
              Entries can be integers (3, −7) or fractions (3/4, −2/5). The calculator stores all values as exact rational numbers, so there is no rounding at any stage. For singular matrices, the calculator detects the failure condition and tells you exactly why no inverse exists.
            </p>
          </section>

          <section>
            <h2>Worked Example 1: 2×2 Matrix</h2>
            <p>Find A⁻¹ for A = [[4, 7], [2, 6]].</p>
            <p>For a 2×2 matrix [[a, b], [c, d]], the inverse is (1/(ad−bc)) · [[d, −b], [−c, a]]. Here det = 4·6 − 7·2 = 10, so:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>A⁻¹ = (1/10) · [[6, −7], [−2, 4]] = [[3/5, −7/10], [−1/5, 2/5]]</p>
            </div>
            <p>Verify: A · A⁻¹ = (1/10) · [[4,7],[2,6]] · [[6,−7],[−2,4]] = (1/10) · [[10,0],[0,10]] = I. ✓</p>
          </section>

          <section>
            <h2>Worked Example 2: 3×3 Matrix via Gauss-Jordan</h2>
            <p>Find A⁻¹ for A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]. First compute det(A) = 1(0−24) − 2(0−20) + 3(0−5) = −24+40−15 = 1 ≠ 0. So A is invertible.</p>
            <p>Set up the augmented matrix [A | I₃] and apply Gauss-Jordan:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>[ 1  2  3 | 1  0  0 ]</p>
              <p>[ 0  1  4 | 0  1  0 ]</p>
              <p>[ 5  6  0 | 0  0  1 ]</p>
            </div>
            <p>After full Gauss-Jordan elimination:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>A⁻¹ = [[ −24,  18,  5],</p>
              <p>        [  20, −15, −4],</p>
              <p>        [  −5,   4,  1]]</p>
            </div>
            <p>Use the calculator above to see every elimination step in detail.</p>
          </section>

          <section>
            <h2>Worked Example 3: Singular Matrix — No Inverse</h2>
            <p>Consider B = [[1, 2], [2, 4]]. Row 2 = 2 × Row 1, so det(B) = 1·4 − 2·2 = 0. Attempting Gauss-Jordan on [B | I]:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>[ 1  2 | 1   0 ]   →   R₂ − 2R₁   →   [ 1  2 | 1   0 ]</p>
              <p>[ 2  4 | 0   1 ]                        [ 0  0 | −2  1 ]</p>
            </div>
            <p>The left half has a zero row but the right half [−2, 1] ≠ 0. This is a contradiction — B is singular and has no inverse. The calculator reports this automatically.</p>
          </section>

          <section>
            <h2>Matrix Inverse vs. Division: An Important Distinction</h2>
            <p>
              Scalar division a/b is well-defined for any b ≠ 0. Matrix "division" A/B means multiplying by B⁻¹, and the result depends on the order: A · B⁻¹ and B⁻¹ · A are generally different matrices. This is why matrix algebra requires careful attention to multiplication order — the familiar commutativity of scalar arithmetic does not hold.
            </p>
            <p>
              When solving Ax = b for x, the solution is x = A⁻¹b (left-multiply both sides by A⁻¹). Writing this as x = b/A or x = b·A⁻¹ would be incorrect because multiplication order matters.
            </p>
          </section>

          <section>
            <h2>Applications of Matrix Inversion</h2>
            <p>
              Matrix inversion is closely related to Gauss-Jordan elimination — the same algorithm that our <Link href="/" className="text-primary hover:underline">RREF calculator</Link> uses on the coefficient matrix is applied to [A|I] here. For the underlying theory of why this works, see our <Link href="/guides/gauss-jordan-vs-gaussian-elimination" className="text-primary hover:underline">Gauss-Jordan vs. Gaussian elimination guide</Link>. For a conceptual introduction to the linear algebra that makes inversion possible, see <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics</Link>.
            </p>
            <p><strong>Solving linear systems.</strong> For Ax = b with A invertible, x = A⁻¹b gives the unique solution — see our <Link href="/guides/solving-linear-systems" className="text-primary hover:underline">solving linear systems guide</Link> for all three solution types. In practice, Gaussian elimination (LU decomposition) is preferred for large systems, but explicit inversion is convenient for small matrices.</p>
            <p><strong>Cryptography.</strong> The Hill cipher encrypts by multiplying a plaintext vector by an invertible matrix mod 26. Decryption requires the modular matrix inverse.</p>
            <p><strong>Computer graphics.</strong> Camera view matrices, rotation, scaling, and projection transformations all require inversion to move between coordinate spaces. OpenGL, DirectX, and WebGL pipelines use matrix inversion extensively.</p>
            <p><strong>Statistics.</strong> Ordinary least squares regression: β̂ = (XᵀX)⁻¹ Xᵀy. The existence of the OLS solution depends on XᵀX being invertible (full column rank of X).</p>
            <p><strong>Control theory.</strong> State-space models require matrix inversion for computing transfer functions, stability analysis, and controller design.</p>
          </section>

          <AdSlot id="inverse-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Does every matrix have an inverse?', a: 'No. Only square matrices with det(A) ≠ 0 (non-singular matrices) have inverses. Rectangular matrices and singular square matrices have no two-sided inverse.' },
                { q: 'How do I verify my answer?', a: 'Multiply A · A⁻¹. Every diagonal entry should be 1, every off-diagonal entry 0 (the identity matrix).' },
                { q: 'What is the fastest formula for a 2×2 inverse?', a: 'For A = [[a,b],[c,d]], A⁻¹ = (1/(ad−bc)) · [[d,−b],[−c,a]]. Swap the diagonal, negate the off-diagonal, divide by the determinant.' },
                { q: 'Can I invert a 1×1 matrix?', a: 'Yes. The inverse of [a] is [1/a], provided a ≠ 0.' },
                { q: 'Is there a difference between left and right inverses?', a: 'For square matrices they are the same. For rectangular matrices, a left inverse satisfies LA = I and a right inverse satisfies AR = I — these are generally different and not always available.' },
                { q: 'How is the inverse related to the adjugate?', a: 'A⁻¹ = (1/det(A)) · adj(A), where adj(A) is the transpose of the cofactor matrix. Practical for 2×2 and 3×3; inefficient for larger matrices.' },
                { q: 'Is the inverse unique?', a: 'Yes. If B and C both satisfy AB = BA = I and AC = CA = I, then B = BI = B(AC) = (BA)C = IC = C. So the inverse is unique.' },
                { q: 'Is this calculator free?', a: 'Yes, completely free. No sign-up, no usage limits.' },
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
      <RelatedCalculators exclude="/matrix/inverse" picks={['/', '/matrix/determinant', '/matrix/gauss-jordan', '/matrix/multiply', '/vectors/dot-product']} />
    </>
  );
}
