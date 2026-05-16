import type { Metadata } from 'next';
import Link from 'next/link';
import MultiplyCalculator from '@/components/calculator/MultiplyCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Matrix Multiplication Calculator — A × B with Step-by-Step Dot Products',
  description: 'Multiply any two compatible matrices. See every dot product calculation, exact fraction answers. Free, no sign-up. Dimensions 2–5 rows/cols.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/multiply' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Matrix Multiplication Calculator',
  description: 'Multiplies two matrices A × B with step-by-step dot product calculations and exact rational arithmetic.',
  url: 'https://rrefmatrixcalc.com/matrix/multiply',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/matrix/multiply',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Matrix Multiplication Calculator', item: 'https://rrefmatrixcalc.com/matrix/multiply' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does matrix multiplication commute?', acceptedAnswer: { '@type': 'Answer', text: 'No, in general AB ≠ BA. Even if both products are defined and the same size, they can differ. Commutativity is a special property of scalar multiplication that does not extend to matrices.' } },
    { '@type': 'Question', name: 'What dimensions does the result have?', acceptedAnswer: { '@type': 'Answer', text: 'If A is m×n and B is n×p, then AB is m×p. The inner dimensions (n) must match; the outer dimensions (m, p) determine the result size.' } },
    { '@type': 'Question', name: 'Can I multiply a non-square matrix by itself?', acceptedAnswer: { '@type': 'Answer', text: 'You can only square a matrix A if A is square (same number of rows and columns). For a non-square m×n matrix with m ≠ n, A·A is not defined.' } },
    { '@type': 'Question', name: 'Is there an entry-wise matrix multiplication?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, it is called the Hadamard product or element-wise product, written A ⊙ B. It requires A and B to have exactly the same dimensions.' } },
    { '@type': 'Question', name: 'What is a zero matrix?', acceptedAnswer: { '@type': 'Answer', text: 'A matrix of all zeros. Multiplying any matrix by the zero matrix gives the zero matrix. Note that AB = 0 does not necessarily mean A = 0 or B = 0.' } },
    { '@type': 'Question', name: 'How is matrix multiplication related to RREF?', acceptedAnswer: { '@type': 'Answer', text: 'Gaussian and Gauss-Jordan elimination can be expressed as left-multiplication by elementary matrices. The product of these elementary matrices equals the overall transformation applied to A.' } },
    { '@type': 'Question', name: 'Can I use fractions in the input?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Enter entries like "3/4" or "-2/5" and the calculator handles them exactly with BigInt rational arithmetic.' } },
    { '@type': 'Question', name: 'Is this calculator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no account required.' } },
  ],
};

export default function MultiplyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Matrix Calculators' }, { label: 'Matrix Multiply' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Matrix Multiplication Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Compute <strong>A × B</strong> for any compatible matrices. Every entry of C = AB shown as a dot product, exact fractions throughout.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <MultiplyCalculator />
        <AdSlot id="mul-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Any Compatible Sizes', 'Dot Product Steps', 'Exact Fractions'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is Matrix Multiplication?</h2>
            <p>
              Matrix multiplication is not entry-wise multiplication (that is the Hadamard product). The product C = AB is defined when the number of columns of A equals the number of rows of B. If A is m×n and B is n×p, then C is m×p, and each entry is:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              C[i][j] = Σₖ A[i][k] · B[k][j]  (the dot product of row i of A with column j of B)
            </div>
            <p>
              This operation models composition of linear transformations: if T₁ has matrix A and T₂ has matrix B, then T₂∘T₁ (apply T₁ first, then T₂) has matrix AB. This composition interpretation explains why the definition looks the way it does.
            </p>
            <p>Critical properties:</p>
            <ul>
              <li><strong>Not commutative</strong>: AB ≠ BA in general (even when both products are defined)</li>
              <li><strong>Associative</strong>: A(BC) = (AB)C</li>
              <li><strong>Distributive</strong>: A(B + C) = AB + AC</li>
              <li><strong>Identity</strong>: AI = IA = A</li>
              <li><strong>Transpose reversal</strong>: (AB)ᵀ = BᵀAᵀ</li>
              <li><strong>Inverse reversal</strong>: (AB)⁻¹ = B⁻¹A⁻¹</li>
            </ul>
          </section>

          <section>
            <h2>How to Use This Calculator</h2>
            <p>
              Set the dimensions of matrix A (rows × cols) using the dropdowns in the A panel. The number of rows in B is locked to match A's column count — this is the compatibility requirement. Set B's column count separately. Enter entries using Tab and arrow keys, then press <em>Multiply A × B</em>.
            </p>
            <p>
              The result panel shows C = AB with all dimensions labeled. Expand "Show dot product calculations" to see each entry of C computed as the explicit sum of products.
            </p>
          </section>

          <section>
            <h2>Worked Example 1: 2×3 times 3×2</h2>
            <p>Let A = [[1, 2, 3], [4, 5, 6]] (2×3) and B = [[7, 8], [9, 10], [11, 12]] (3×2). C = AB is 2×2:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>C[1,1] = 1·7 + 2·9 + 3·11 = 7 + 18 + 33 = 58</p>
              <p>C[1,2] = 1·8 + 2·10 + 3·12 = 8 + 20 + 36 = 64</p>
              <p>C[2,1] = 4·7 + 5·9 + 6·11 = 28 + 45 + 66 = 139</p>
              <p>C[2,2] = 4·8 + 5·10 + 6·12 = 32 + 50 + 72 = 154</p>
              <p className="mt-2">C = [[58, 64], [139, 154]]</p>
            </div>
          </section>

          <section>
            <h2>Worked Example 2: Why AB ≠ BA</h2>
            <p>Let A = [[1, 2], [3, 4]] and B = [[0, 1], [1, 0]].</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>AB = [[1·0+2·1, 1·1+2·0], [3·0+4·1, 3·1+4·0]] = [[2, 1], [4, 3]]</p>
              <p>BA = [[0·1+1·3, 0·2+1·4], [1·1+0·3, 1·2+0·4]] = [[3, 4], [1, 2]]</p>
            </div>
            <p>AB ≠ BA. B here is the permutation matrix that swaps rows; AB swaps the rows of A, while BA swaps the columns of A — two different operations.</p>
          </section>

          <section>
            <h2>Worked Example 3: Fractions in Matrix Multiplication</h2>
            <p>Let A = [[1/2, 1/3], [2/3, 1/4]] and B = [[6, 3], [4, 8]]:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>C[1,1] = (1/2)(6) + (1/3)(4) = 3 + 4/3 = 13/3</p>
              <p>C[1,2] = (1/2)(3) + (1/3)(8) = 3/2 + 8/3 = 9/6 + 16/6 = 25/6</p>
              <p>C[2,1] = (2/3)(6) + (1/4)(4) = 4 + 1 = 5</p>
              <p>C[2,2] = (2/3)(3) + (1/4)(8) = 2 + 2 = 4</p>
              <p className="mt-2">C = [[13/3, 25/6], [5, 4]]</p>
            </div>
            <p>This calculator maintains exact fractions throughout — no rounding at any intermediate step.</p>
          </section>

          <section>
            <h2>When Can You Multiply Two Matrices?</h2>
            <p>
              A (m×n) · B (n×p) → C (m×p). The inner dimensions must match: n = n. If A is 3×4, B must have exactly 4 rows. This is the only constraint — the outer dimensions m and p can be anything.
            </p>
            <p>
              Note that even when both AB and BA are defined (this requires m = p as well as n = n, i.e., A and B are square of the same size), they are generally not equal. Matrices that happen to satisfy AB = BA are called <em>commuting matrices</em> — the identity matrix commutes with everything, and diagonal matrices of the same size commute with each other.
            </p>
          </section>

          <section>
            <h2>Applications of Matrix Multiplication</h2>
            <p><strong>Linear transformations.</strong> Composing transformations corresponds to multiplying their matrices. Rotating by θ then rotating by φ corresponds to multiplying the two rotation matrices.</p>
            <p><strong>Solving systems.</strong> Writing Ax = b as a matrix-vector product is the bridge between the algebraic and geometric views of linear systems.</p>
            <p><strong>Graph theory.</strong> If A is the adjacency matrix of a graph, Aⁿ[i][j] counts the number of paths of length n from vertex i to vertex j.</p>
            <p><strong>Markov chains.</strong> A transition matrix T raised to the power n gives the n-step probabilities. Computing Tⁿ by repeated matrix multiplication is the standard approach.</p>
            <p><strong>Neural networks.</strong> Each layer of a dense neural network computes y = Wx + b, a matrix-vector product. Training a deep network involves thousands of these products per forward pass.</p>
          </section>

          <section>
            <h2>Powers of Matrices and Matrix Exponentiation</h2>
            <p>
              The n-th power Aⁿ is A multiplied by itself n times. Powers appear in Markov chains (Tⁿ gives n-step transition probabilities), graph theory (Aⁿ[i][j] counts paths of length n between vertices i and j), and differential equations (the matrix exponential eᴬᵗ = Σ (At)ⁿ/n! solves linear ODEs).
            </p>
            <p>
              Computing Aⁿ naively takes n−1 multiplications. <strong>Exponentiation by squaring</strong> reduces this to O(log n): compute A², A⁴, A⁸, … and multiply together the powers corresponding to set bits of n in binary. For n = 100, that is 8 multiplications instead of 99.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>A = [[1,1],[1,0]]  (Fibonacci matrix: Aⁿ[0][1] = Fibonacci(n))</p>
              <p>A² = [[2,1],[1,1]],  A⁴ = [[5,3],[3,2]],  A⁸ = [[34,21],[21,13]]</p>
              <p>A^10 = A⁸·A² = [[89,55],[55,34]]  →  Fib(10) = 55 ✓</p>
            </div>
          </section>

          <section>
            <h2>Block Matrix Multiplication</h2>
            <p>
              Large matrices can be partitioned into blocks and multiplied block by block, following the same rule as scalar entries. For conformably partitioned matrices:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[[A₁₁, A₁₂], [A₂₁, A₂₂]] · [[B₁₁, B₁₂], [B₂₁, B₂₂]]</p>
              <p>= [[A₁₁B₁₁+A₁₂B₂₁, A₁₁B₁₂+A₁₂B₂₂],</p>
              <p>   [A₂₁B₁₁+A₂₂B₂₁, A₂₁B₁₂+A₂₂B₂₂]]</p>
            </div>
            <p>
              Block multiplication enables parallel computation (each block product is independent), cache-efficient algorithms (BLAS routines tile matrices into blocks that fit in CPU cache), and elegant proofs (the Schur complement D − CA⁻¹B arises naturally from block multiplication and appears in the conditional covariance of Gaussian distributions and in LDU decompositions).
            </p>
          </section>

          <section>
            <h2>Matrix Multiplication and Linear Transformations</h2>
            <p>
              Every m×n matrix A defines a linear transformation T: ℝⁿ → ℝᵐ by T(x) = Ax. Composing two transformations T₁ (matrix A, applied first) and T₂ (matrix B) gives T₂∘T₁ with matrix BA — the order reversal explains why AB ≠ BA in general.
            </p>
            <p>
              This interpretation makes matrix properties immediate: the identity matrix I is the identity transformation; an invertible A is a bijection; a singular A collapses at least one dimension (its null space is non-trivial). The rank of AB satisfies rank(AB) ≤ min(rank(A), rank(B)) — multiplying can only lose information, never create it. Use the <Link href="/" className="text-primary hover:underline">RREF calculator</Link> to find the rank of any matrix, and our <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics guide</Link> to connect rank to the geometry of linear transformations.
            </p>
          </section>

          <section>
            <h2>Computational Complexity: Strassen's Algorithm</h2>
            <p>
              The naïve n×n matrix multiplication algorithm takes O(n³) operations. <strong>Strassen's algorithm</strong> (1969) reduced this to O(n^2.807) by computing a 2×2 product with 7 multiplications instead of 8, applied recursively. For n = 1000, this is roughly a 4–5× speedup.
            </p>
            <p>
              Modern research has pushed the theoretical exponent lower — the current best is approximately O(n^2.37) (LeGall and Urrutia, 2024). Whether O(n²) is achievable remains one of the great open problems in theoretical computer science. Practically, all high-performance libraries (NumPy, MATLAB, cuBLAS) use Strassen variants for large n, and fall back to naïve multiplication for small blocks where the overhead of Strassen isn't worth it.
            </p>
            <p>
              This matrix multiplication calculator computes exact results for small matrices using the straightforward dot-product formula. For large-scale computation, use optimized numerical libraries.
            </p>
          </section>

          <AdSlot id="mul-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Does matrix multiplication commute?', a: 'No, in general AB ≠ BA. Even if both products are defined and the same size, they can differ.' },
                { q: 'What dimensions does the result have?', a: 'If A is m×n and B is n×p, then AB is m×p. The inner dimensions (n) must match; the outer dimensions (m, p) determine the result size.' },
                { q: 'Can I multiply a non-square matrix by itself?', a: 'You can only square a matrix A if A is square (same number of rows and columns). For a non-square m×n matrix with m ≠ n, A·A is not defined.' },
                { q: 'Is there an entry-wise matrix multiplication?', a: 'Yes, it is called the Hadamard product or element-wise product, written A ⊙ B. It requires A and B to have exactly the same dimensions.' },
                { q: 'What is a zero matrix?', a: 'A matrix of all zeros. Multiplying any matrix by the zero matrix gives the zero matrix — analogous to multiplying by 0, but note that AB = 0 does not necessarily mean A = 0 or B = 0.' },
                { q: 'How is matrix multiplication related to RREF?', a: 'Gaussian and Gauss-Jordan elimination can be expressed as left-multiplication by elementary matrices. The product of these elementary matrices equals the overall transformation applied to A.' },
                { q: 'Can I use fractions in the input?', a: 'Yes. Enter entries like "3/4" or "-2/5" and the calculator handles them exactly.' },
                { q: 'Is this free?', a: 'Yes, completely free with no account required.' },
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
      <RelatedCalculators exclude="/matrix/multiply" picks={['/', '/matrix/inverse', '/matrix/determinant', '/matrix/transpose', '/vectors/dot-product']} />
    </>
  );
}
