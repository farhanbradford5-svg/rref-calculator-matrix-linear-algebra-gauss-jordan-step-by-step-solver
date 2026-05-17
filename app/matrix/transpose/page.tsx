import type { Metadata } from 'next';
import Link from 'next/link';
import TransposeCalculator from '@/components/calculator/TransposeCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Matrix Transpose Calculator — Compute Aᵀ Instantly',
  description: 'Transpose any matrix by flipping rows and columns. Visual result with explanation. Free, instant, no sign-up. Supports 2×2 to 6×6 matrices.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/transpose' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Matrix Transpose Calculator',
  description: 'Computes the transpose of a matrix by swapping rows and columns.',
  url: 'https://rrefmatrixcalc.com/matrix/transpose',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/matrix/transpose',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Matrix Transpose Calculator', item: 'https://rrefmatrixcalc.com/matrix/transpose' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does it mean to transpose a matrix?', acceptedAnswer: { '@type': 'Answer', text: 'Transposing swaps rows and columns. The (i,j) entry of Aᵀ is the (j,i) entry of A. An m×n matrix becomes n×m.' } },
    { '@type': 'Question', name: 'Is the transpose the same as the inverse?', acceptedAnswer: { '@type': 'Answer', text: 'Not in general. For orthogonal matrices, Aᵀ = A⁻¹, but this is a special property. For a general matrix, Aᵀ and A⁻¹ are unrelated.' } },
    { '@type': 'Question', name: 'What is a symmetric matrix?', acceptedAnswer: { '@type': 'Answer', text: 'A square matrix where A = Aᵀ, meaning A[i][j] = A[j][i] for all i, j. It looks the same when reflected across the main diagonal.' } },
    { '@type': 'Question', name: 'Does transposing change the rank?', acceptedAnswer: { '@type': 'Answer', text: 'No. rank(Aᵀ) = rank(A). The row space of A equals the column space of Aᵀ and vice versa.' } },
    { '@type': 'Question', name: 'Does transposing change the determinant?', acceptedAnswer: { '@type': 'Answer', text: 'No. det(Aᵀ) = det(A). A matrix is singular if and only if its transpose is singular.' } },
    { '@type': 'Question', name: 'What is a Hermitian matrix?', acceptedAnswer: { '@type': 'Answer', text: 'A complex generalization of symmetric: Aᴴ = A, where Aᴴ is the conjugate transpose. Real symmetric matrices are a special case.' } },
    { '@type': 'Question', name: 'Can I transpose a non-square matrix?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The transpose of an m×n matrix is always n×m. This calculator handles any rectangular matrix.' } },
    { '@type': 'Question', name: 'Is this calculator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no account required.' } },
  ],
};

export default function TransposePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Matrix Calculators' }, { label: 'Transpose' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Matrix Transpose Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Compute <strong>Aᵀ</strong> by flipping rows and columns. Instant visual result with dimension labels.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <TransposeCalculator />
        <AdSlot id="trans-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Any Rectangle Size', 'Instant', 'Mobile-Friendly'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is the Transpose of a Matrix?</h2>
            <p>
              The transpose of an m×n matrix A is the n×m matrix Aᵀ obtained by turning rows into columns: the (i, j) entry of Aᵀ equals the (j, i) entry of A. Geometrically, the transpose reflects the matrix across its main diagonal.
            </p>
            <p>For example:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>A  = [[1, 2, 3],   →   Aᵀ = [[1, 4],</p>
              <p>     [4, 5, 6]]              [2, 5],</p>
              <p>                             [3, 6]]</p>
            </div>
            <p>A is 2×3; Aᵀ is 3×2.</p>
            <p>Key transpose properties:</p>
            <ul>
              <li><strong>(Aᵀ)ᵀ = A</strong> — transposing twice returns the original</li>
              <li><strong>(A + B)ᵀ = Aᵀ + Bᵀ</strong></li>
              <li><strong>(kA)ᵀ = k·Aᵀ</strong></li>
              <li><strong>(AB)ᵀ = BᵀAᵀ</strong> — order reverses</li>
              <li><strong>det(Aᵀ) = det(A)</strong></li>
              <li><strong>rank(Aᵀ) = rank(A)</strong></li>
            </ul>
            <p>
              The reversal property (AB)ᵀ = BᵀAᵀ connects transpose to <Link href="/matrix/multiply" className="text-primary hover:underline">matrix multiplication</Link> — the order of factors reverses just as it does for inverses. The equality det(Aᵀ) = det(A) means you can use the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link> on either a matrix or its transpose and always get the same result.
            </p>
          </section>

          <section>
            <h2>Symmetric and Skew-Symmetric Matrices</h2>
            <p>
              A square matrix A is <strong>symmetric</strong> if Aᵀ = A. This means A[i][j] = A[j][i] for all i, j — the matrix is identical to its reflection. Symmetric matrices arise constantly in linear algebra: covariance matrices in statistics, stiffness matrices in finite element analysis, and the matrix XᵀX in least squares.
            </p>
            <p>
              A square matrix is <strong>skew-symmetric</strong> (or antisymmetric) if Aᵀ = −A. The diagonal entries of a skew-symmetric matrix must all be zero (since A[i][i] = −A[i][i] implies A[i][i] = 0). Cross-product matrices in 3D mechanics are skew-symmetric.
            </p>
            <p>
              Every square matrix can be decomposed as the sum of a symmetric and a skew-symmetric part: A = (A + Aᵀ)/2 + (A − Aᵀ)/2.
            </p>
          </section>

          <section>
            <h2>Transpose and Inner Products</h2>
            <p>
              For column vectors u and v in ℝⁿ, the dot product equals uᵀv (treating u and v as n×1 matrices). This notation connects matrix multiplication and inner products cleanly.
            </p>
            <p>
              The matrix product AᵀA is always symmetric and positive semi-definite. It appears in the normal equations for least squares (XᵀXβ = Xᵀy), in the computation of the covariance matrix, and in singular value decomposition.
            </p>
            <p>
              For an orthogonal matrix Q (one whose columns form an orthonormal basis), Qᵀ = Q⁻¹. This makes orthogonal matrices especially easy to invert — just transpose. Rotation matrices and reflection matrices are orthogonal.
            </p>
          </section>

          <section>
            <h2>How to Transpose a Matrix By Hand</h2>
            <p>
              Write the rows of A as the columns of Aᵀ. Equivalently, write the columns of A as the rows of Aᵀ. For a square matrix, this is equivalent to reflecting across the main diagonal (top-left to bottom-right).
            </p>
            <p>
              For small matrices, you can read off entries directly: Aᵀ[row i][col j] = A[row j][col i]. For a 3×4 matrix A, Aᵀ is 4×3 — the entry in row 2, column 3 of Aᵀ is the entry in row 3, column 2 of A.
            </p>
          </section>

          <section>
            <h2>Applications of the Transpose</h2>
            <p><strong>Least squares regression.</strong> The normal equations (XᵀX)β = Xᵀy give the best-fit coefficients. The transpose ensures XᵀX is square and symmetric.</p>
            <p><strong>Orthogonal transformations.</strong> Rotation matrices R satisfy Rᵀ = R⁻¹. So to undo a rotation, just transpose — no matrix inversion needed.</p>
            <p><strong>Covariance matrices.</strong> The sample covariance matrix Σ = (1/n)XᵀX is symmetric, a consequence of the transpose relationship.</p>
            <p><strong>Graph theory.</strong> For a directed graph with adjacency matrix A, Aᵀ is the adjacency matrix of the reversed graph.</p>
            <p><strong>Image processing.</strong> 2D discrete cosine transforms (used in JPEG compression) rely on matrix transpose as part of the separable computation.</p>
          </section>

          <section>
            <h2>The Four Fundamental Subspaces</h2>
            <p>
              Every m×n matrix A defines four fundamental subspaces — Gilbert Strang calls these "the heart of linear algebra." Two involve A and two involve Aᵀ:
            </p>
            <ul>
              <li><strong>Column space of A</strong> (image/range): all vectors Ax. Dimension = rank(A).</li>
              <li><strong>Null space of A</strong> (kernel): all x with Ax = 0. Dimension = n − rank(A) (nullity).</li>
              <li><strong>Row space of A = Column space of Aᵀ</strong>: span of A's rows. Dimension = rank(A).</li>
              <li><strong>Left null space = Null space of Aᵀ</strong>: all y with Aᵀy = 0. Dimension = m − rank(A).</li>
            </ul>
            <p>
              Key orthogonality: the null space of A is orthogonal to the row space of A; the left null space is orthogonal to the column space. These four subspaces pair up and fill ℝⁿ and ℝᵐ completely. To find all four, compute RREF(A) with the <Link href="/" className="text-primary hover:underline">RREF calculator</Link>: pivot rows give the row space, free variable columns indicate null space directions.
            </p>
          </section>

          <section>
            <h2>Orthogonal Matrices: When Aᵀ = A⁻¹</h2>
            <p>
              A square matrix Q is <strong>orthogonal</strong> if its columns form an orthonormal set — each column has unit length, and all pairs of distinct columns are perpendicular. The defining property QᵀQ = I means Qᵀ = Q⁻¹: to invert an orthogonal matrix, just transpose it.
            </p>
            <p>Rotation, reflection, and permutation matrices are all orthogonal. For a 2D rotation by angle θ:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>Q = [[cos θ, −sin θ], [sin θ, cos θ]]</p>
              <p>Qᵀ = [[cos θ, sin θ], [−sin θ, cos θ]]  (rotation by −θ)</p>
              <p>QQᵀ = [[1,0],[0,1]] = I  ✓</p>
            </div>
            <p>
              In 3D graphics (OpenGL, WebGL, DirectX), view and model matrices are products of rotation and reflection matrices — all orthogonal. Inverting them (needed to move between coordinate spaces) requires only transposing, not full Gaussian elimination. The <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse calculator</Link> handles general inversion; for orthogonal matrices, this transpose calculator gives the inverse directly.
            </p>
          </section>

          <section>
            <h2>Positive Semi-Definite Matrices: AᵀA and Applications</h2>
            <p>
              The product AᵀA is always symmetric and positive semi-definite: for any vector x, xᵀ(AᵀA)x = |Ax|² ≥ 0. This product appears throughout applied mathematics:
            </p>
            <ul>
              <li><strong>Least squares regression:</strong> Normal equations AᵀAβ = Aᵀy give the best-fit line or hyperplane.</li>
              <li><strong>Covariance matrix:</strong> Σ = (1/n)XᵀX (after centering) is symmetric by this property.</li>
              <li><strong>Gram matrix:</strong> K[i][j] = xᵢᵀxⱼ; central to kernel methods and support vector machines.</li>
              <li><strong>SVD:</strong> The eigenvalues of AᵀA are the squared singular values of A.</li>
            </ul>
            <p>
              Symmetry of AᵀA follows from (AᵀA)ᵀ = AᵀAᵀᵀ = AᵀA. Use the matrix transpose calculator above to verify the symmetry of AᵀA for any A you enter.
            </p>
          </section>

          <section>
            <h2>The Gram-Schmidt Process and QR Decomposition</h2>
            <p>
              Gram-Schmidt converts any linearly independent set of vectors into an orthonormal basis using the transpose (via dot products as projections):
            </p>
            <ol>
              <li>Normalize the first vector: u₁ = v₁/|v₁|.</li>
              <li>For each subsequent vᵢ, subtract its projections: wᵢ = vᵢ − Σⱼ₌₁ⁱ⁻¹ (vᵢ·uⱼ)uⱼ, then normalize uᵢ = wᵢ/|wᵢ|.</li>
            </ol>
            <p>
              This produces the QR decomposition A = QR, where Q has orthonormal columns (Qᵀ = Q⁻¹ for square Q) and R is upper triangular. In fact R = QᵀA — the transpose appears directly. QR decomposition underlies the QR algorithm for computing eigenvalues and is the standard numerical method for solving least squares problems. Use the <Link href="/vectors/dot-product" className="text-primary hover:underline">dot product calculator</Link> to compute each projection coefficient in the Gram-Schmidt steps.
            </p>
          </section>

          <AdSlot id="trans-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What does it mean to transpose a matrix?', a: 'Transposing swaps rows and columns. The (i,j) entry of Aᵀ is the (j,i) entry of A. An m×n matrix becomes an n×m matrix.' },
                { q: 'Is the transpose the same as the inverse?', a: 'Not in general. For orthogonal matrices, Aᵀ = A⁻¹, but this is a special property. For a general matrix, Aᵀ and A⁻¹ are unrelated.' },
                { q: 'What is a symmetric matrix?', a: 'A square matrix where A = Aᵀ, meaning A[i][j] = A[j][i] for all i, j. It looks the same when reflected across the main diagonal.' },
                { q: 'Does transposing change the rank?', a: 'No. rank(Aᵀ) = rank(A). The row space of A equals the column space of Aᵀ and vice versa.' },
                { q: 'Does transposing change the determinant?', a: 'No. det(Aᵀ) = det(A). This means a matrix is singular if and only if its transpose is singular.' },
                { q: 'What is a Hermitian matrix?', a: 'A complex generalization of a symmetric matrix: Aᴴ = A, where Aᴴ is the conjugate transpose (transpose and complex-conjugate each entry). Real symmetric matrices are a special case.' },
                { q: 'Can I transpose a non-square matrix?', a: 'Yes. The transpose of an m×n matrix is always n×m. This calculator handles any rectangular matrix.' },
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
      <RelatedCalculators exclude="/matrix/transpose" picks={['/', '/matrix/inverse', '/matrix/multiply', '/vectors/dot-product', '/vectors/cross-product']} />
    </>
  );
}
