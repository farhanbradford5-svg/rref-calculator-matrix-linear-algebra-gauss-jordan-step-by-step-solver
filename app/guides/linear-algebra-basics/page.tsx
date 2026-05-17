import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';

export const metadata: Metadata = {
  title: 'Linear Algebra Basics — Complete Beginner\'s Guide',
  description: 'Learn linear algebra from scratch. Vectors, matrices, linear systems, RREF, rank, null space, and more. With worked examples and clear explanations.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/guides/linear-algebra-basics' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Linear Algebra Basics — Complete Beginner\'s Guide',
  description: 'An introduction to linear algebra covering vectors, matrices, linear systems, RREF, rank, null space, span, and eigenvalues with worked examples.',
  url: 'https://rrefmatrixcalc.com/guides/linear-algebra-basics',
  author: { '@type': 'Organization', name: 'RREF Calculator Editorial Team' },
  dateModified: '2026-05-01',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://rrefmatrixcalc.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Linear Algebra Basics', item: 'https://rrefmatrixcalc.com/guides/linear-algebra-basics' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is linear algebra?', acceptedAnswer: { '@type': 'Answer', text: 'Linear algebra is the branch of mathematics concerned with vectors, vector spaces, and linear transformations — functions that preserve addition and scalar multiplication. Its core objects are matrices and vectors, and the central operation is solving systems of linear equations.' } },
    { '@type': 'Question', name: 'What is Reduced Row Echelon Form (RREF)?', acceptedAnswer: { '@type': 'Answer', text: 'RREF is a canonical form for matrices reached by Gauss-Jordan elimination. Conditions: all-zero rows at the bottom, each leading entry (pivot) equals 1, pivots form a staircase pattern, and all entries above and below each pivot are zero. Every matrix has exactly one RREF.' } },
    { '@type': 'Question', name: 'What is the rank-nullity theorem?', acceptedAnswer: { '@type': 'Answer', text: 'For any m×n matrix A: rank(A) + nullity(A) = n, where n is the number of columns. Rank is the number of pivot columns; nullity is the dimension of the null space (number of free variables). Together they always equal the total number of columns.' } },
    { '@type': 'Question', name: 'How do I test if vectors are linearly independent?', acceptedAnswer: { '@type': 'Answer', text: 'Form a matrix with the vectors as columns and compute its RREF. If every column is a pivot column (rank equals the number of vectors), they are linearly independent. If any column has no pivot, the corresponding vector is a linear combination of the others — the set is linearly dependent.' } },
  ],
};

export default function LinearAlgebraBasicsGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides/linear-algebra-basics' }, { label: 'Linear Algebra Basics' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Linear Algebra Basics
        </h1>
        <p className="text-slate-500 mb-2">A complete primer for students starting linear algebra for the first time.</p>
        <p className="text-xs text-slate-400 mb-8">📖 8 min read · Updated May 2026 · Reviewed by our math editorial team</p>

        <AdSlot id="guide-la-top" size="leaderboard" />

        <article className="prose-content space-y-10 mt-6">

          <section>
            <h2>What Is Linear Algebra?</h2>
            <p>
              Linear algebra is the branch of mathematics concerned with vectors, vector spaces, and linear transformations — functions that preserve addition and scalar multiplication. It is the mathematical backbone of an enormous range of applications: computer graphics, machine learning, signal processing, quantum mechanics, economics, and engineering all rely on linear algebra in fundamental ways.
            </p>
            <p>
              Despite its broad applicability, linear algebra has a compact core. The central objects are <strong>matrices</strong> and <strong>vectors</strong>, and the central operation is solving systems of linear equations. Everything else — determinants, eigenvalues, decompositions — builds on this foundation.
            </p>
            <p>
              The standard reference is Gilbert Strang's <em>Introduction to Linear Algebra</em>, which accompanies MIT's 18.06 course (freely available on MIT OpenCourseWare). David Lay's <em>Linear Algebra and Its Applications</em> is another widely used text with a more applied focus.
            </p>
          </section>

          <section>
            <h2>Scalars, Vectors, and Matrices</h2>
            <p>
              A <strong>scalar</strong> is a single real number: 3, −7, 1/2, √2. In linear algebra, scalars are used to scale vectors.
            </p>
            <p>
              A <strong>vector</strong> in ℝⁿ is an ordered list of n real numbers, written as a column:
            </p>
            <div className="worked-example"><pre>{`v = [3 ]
    [-1]
    [2 ]`}</pre></div>
            <p>
              This is a vector in ℝ³. Vectors represent points in space, directions, or abstract quantities with n components. The zero vector <strong>0</strong> has all components equal to 0.
            </p>
            <p>
              A <strong>matrix</strong> is a rectangular array of numbers arranged in rows and columns. An m×n matrix has m rows and n columns:
            </p>
            <div className="worked-example"><pre>{`A = [ 1  2  3 ]   (2×3 matrix: 2 rows, 3 columns)
    [ 4  5  6 ]`}</pre></div>
            <p>
              Matrices represent linear transformations, store data, encode systems of equations, and much more. The entry in row i and column j is written A[i][j] or aᵢⱼ.
            </p>
          </section>

          <section>
            <h2>Vector Operations</h2>
            <p><strong>Addition:</strong> Add component-by-component. Vectors must have the same dimension.</p>
            <div className="worked-example"><pre>{`[1]   [4]   [5]
[2] + [5] = [7]
[3]   [6]   [9]`}</pre></div>
            <p><strong>Scalar multiplication:</strong> Multiply every component by the scalar.</p>
            <div className="worked-example"><pre>{`3 · [1]   [3]
    [2] = [6]
    [3]   [9]`}</pre></div>
            <p><strong>Dot product:</strong> Sum of component-wise products. The result is a scalar.</p>
            <div className="worked-example"><pre>{`[1, 2, 3] · [4, 5, 6] = 1·4 + 2·5 + 3·6 = 4 + 10 + 18 = 32`}</pre></div>
            <p>
              The dot product u · v = |u||v|cos(θ), where θ is the angle between u and v. When u · v = 0, the vectors are <em>orthogonal</em> (perpendicular).
            </p>
          </section>

          <section>
            <h2>Linear Systems of Equations</h2>
            <p>
              A linear system is a collection of linear equations in the same set of variables:
            </p>
            <div className="worked-example"><pre>{`2x + y - z  = 8
-3x - y + 2z = -11
-2x + y + 2z = -3`}</pre></div>
            <p>
              "Linear" means each variable appears only to the first power — no x², no xy, no sin(x). This restriction is what makes the subject tractable and the solutions well-structured.
            </p>
            <p>
              Linear systems have exactly one of three outcomes: (1) exactly one solution, (2) infinitely many solutions, or (3) no solution. The system above has the unique solution x = 2, y = 3, z = −1.
            </p>
          </section>

          <section>
            <h2>The Matrix Equation Ax = b</h2>
            <p>
              Every linear system can be written as a matrix equation Ax = b, where A is the <em>coefficient matrix</em>, x is the column vector of unknowns, and b is the column vector of constants.
            </p>
            <div className="worked-example"><pre>{`[ 2   1  -1 ] [x]   [ 8 ]
[-3  -1   2 ] [y] = [-11]
[-2   1   2 ] [z]   [-3 ]`}</pre></div>
            <p>
              This compact notation makes it clear that solving a linear system is equivalent to finding a vector x that maps to b under the linear transformation A.
            </p>
          </section>

          <section>
            <h2>Row Reduction and RREF</h2>
            <p>
              The standard method for solving linear systems is <strong>Gaussian elimination</strong> (or its extension, <strong>Gauss-Jordan elimination</strong>), which systematically simplifies the system using three elementary row operations:
            </p>
            <ul>
              <li>Swap two rows</li>
              <li>Multiply a row by a non-zero constant</li>
              <li>Add a multiple of one row to another</li>
            </ul>
            <p>
              The goal is to reach <strong>Reduced Row Echelon Form (RREF)</strong>, where the solution can be read off directly. The RREF of a matrix is unique — every matrix has exactly one RREF. <Link href="/">Try the RREF calculator</Link> to see this process step by step.
            </p>
            <div className="worked-example"><pre>{`Augmented matrix:                    RREF:
[ 2   1  -1 |  8 ]    →    [ 1  0  0 |  2 ]
[-3  -1   2 | -11]    →    [ 0  1  0 |  3 ]
[-2   1   2 |  -3]    →    [ 0  0  1 | -1 ]`}</pre></div>
            <p>Reading off: x = 2, y = 3, z = −1.</p>
          </section>

          <AdSlot id="guide-la-mid" size="banner" />

          <section>
            <h2>Rank, Null Space, and Linear Independence</h2>
            <p>
              The <strong>rank</strong> of a matrix A is the number of pivots in its RREF. It equals the number of linearly independent rows and the number of linearly independent columns — these are always equal (row rank = column rank). Rank measures "how much information" the matrix contains.
            </p>
            <p>
              The <strong>null space</strong> (kernel) of A is the set of all vectors x such that Ax = 0. Its dimension is called the <em>nullity</em> of A. The rank-nullity theorem states: rank(A) + nullity(A) = n (number of columns). Free variables in RREF correspond to null space dimensions.
            </p>
            <p>
              Vectors v₁, v₂, ..., vₖ are <strong>linearly independent</strong> if no one of them can be written as a linear combination of the others. Equivalently, the only solution to c₁v₁ + c₂v₂ + ... + cₖvₖ = 0 is c₁ = c₂ = ... = cₖ = 0. A set of vectors that is linearly dependent contains redundancy.
            </p>
          </section>

          <section>
            <h2>Span and Basis</h2>
            <p>
              The <strong>span</strong> of a set of vectors &#123;v₁, ..., vₖ&#125; is the set of all linear combinations: &#123;c₁v₁ + ... + cₖvₖ : cᵢ ∈ ℝ&#125;. Geometrically, the span is the subspace "reachable" from those vectors.
            </p>
            <p>
              A <strong>basis</strong> of a vector space V is a set of vectors that (1) spans V and (2) is linearly independent. Every basis of V has the same number of elements — this number is the <em>dimension</em> of V.
            </p>
            <p>
              The standard basis of ℝ³ is &#123;e₁ = [1,0,0], e₂ = [0,1,0], e₃ = [0,0,1]&#125;. Every vector in ℝ³ is a unique linear combination of these three vectors.
            </p>
          </section>

          <section>
            <h2>Geometric Meaning of Span and Linear Independence</h2>
            <p>
              These abstract definitions become concrete once you picture them geometrically.
            </p>
            <p>
              <strong>In ℝ²:</strong> A single non-zero vector v spans a line through the origin — all scalar multiples cv. Two vectors u and v span ℝ² (the entire plane) if and only if they are not parallel (not scalar multiples of each other). If they are parallel, their span is still just a line — adding a parallel vector adds no new directions.
            </p>
            <p>
              <strong>In ℝ³:</strong> A single non-zero vector spans a line. Two non-parallel vectors span a plane (a 2D subspace through the origin). Three vectors span all of ℝ³ if and only if they are not all in the same plane — i.e., no one of them is a linear combination of the other two. Three vectors that all lie in one plane are linearly dependent; their span is a plane, not all of ℝ³.
            </p>
            <p>
              <strong>Linear independence, geometrically:</strong> Vectors v₁, ..., vₖ are linearly independent if no one of them lies in the span of the others. In ℝ², two vectors are independent if they point in genuinely different directions (not parallel). In ℝ³, three vectors are independent if none lies in the plane spanned by the other two.
            </p>
            <p>
              <strong>How to test:</strong> Form a matrix with the vectors as columns and compute its RREF using the <Link href="/">RREF calculator</Link>. If every column is a pivot column (rank = k), the vectors are linearly independent. If any column is a non-pivot column (rank &lt; k), the corresponding vector can be written as a linear combination of the pivot-column vectors — the set is linearly dependent.
            </p>
          </section>

          <section>
            <h2>Finding a Basis Using RREF</h2>
            <p>
              Given a set of vectors (or a matrix), RREF identifies a basis for the column space (also called the range) directly.
            </p>
            <p>
              <strong>Procedure:</strong> Form a matrix A whose columns are the given vectors. Compute RREF(A). The pivot columns of A — the original columns (before row reduction) corresponding to pivot positions in RREF — form a basis for the column space of A.
            </p>
            <p><strong>Example:</strong> Find a basis for the column space of A = [[1,2,3],[2,4,5],[3,6,8]].</p>
            <div className="worked-example"><pre>{`RREF(A) = [ 1  2  0 ]
           [ 0  0  1 ]
           [ 0  0  0 ]`}</pre></div>
            <p>Pivot columns are columns 1 and 3 (columns with leading 1s in RREF). So a basis for the column space of A consists of the original columns 1 and 3: [[1,2,3]] and [[3,5,8]]. Column 2 [2,4,6] is not in the basis because it is 2 times column 1 — a dependent vector. Rank = 2.</p>
            <p>
              <strong>Key rule:</strong> Use the pivot columns of the original matrix A, not the columns of RREF(A). The RREF columns have the right positions, but the original columns are the actual basis vectors for the original column space.
            </p>
          </section>

          <section>
            <h2>Rank-Nullity Theorem: Worked Example</h2>
            <p>
              The <strong>rank-nullity theorem</strong> states: for any m×n matrix A, rank(A) + nullity(A) = n. Here n is the number of columns. This single equation connects the "output" dimension (rank) with the "lost" dimension (nullity).
            </p>
            <p><strong>Example:</strong> Let A be the 3×5 matrix:</p>
            <div className="worked-example"><pre>{`A = [ 1  2  0  1  0 ]
    [ 0  0  1  2  0 ]
    [ 0  0  0  0  1 ]`}</pre></div>
            <p>This matrix is already in RREF. Pivot positions are in columns 1, 3, and 5. Therefore:</p>
            <ul>
              <li>rank(A) = 3 (three pivot columns)</li>
              <li>nullity(A) = 5 − 3 = 2 (two non-pivot columns, 2 and 4)</li>
              <li>Free variables: x₂ and x₄ (non-pivot columns)</li>
            </ul>
            <p>A basis for the null space (all solutions to Ax = 0): set x₂ = 1, x₄ = 0 → [−2, 1, 0, 0, 0]. Set x₂ = 0, x₄ = 1 → [−1, 0, −2, 1, 0]. The null space is a 2-dimensional subspace of ℝ⁵. rank + nullity = 3 + 2 = 5 = n ✓.</p>
          </section>

          <section>
            <h2>Matrix Operations</h2>
            <p><strong>Addition and subtraction:</strong> Add/subtract entry-by-entry. Matrices must have the same dimensions.</p>
            <p><strong>Scalar multiplication:</strong> Multiply every entry by the scalar.</p>
            <p><strong>Matrix multiplication (AB):</strong> Entry C[i][j] = dot product of row i of A with column j of B. A must be m×n and B must be n×p; C is m×p. Not commutative in general. <Link href="/matrix/multiply">Try the matrix multiplication calculator.</Link></p>
            <p><strong>Transpose (Aᵀ):</strong> Flip rows and columns. Entry Aᵀ[i][j] = A[j][i]. <Link href="/matrix/transpose">Try the transpose calculator.</Link></p>
            <p><strong>Inverse (A⁻¹):</strong> Exists only for square non-singular matrices. A · A⁻¹ = I. <Link href="/matrix/inverse">Try the matrix inverse calculator.</Link></p>
            <p><strong>Determinant (det A):</strong> A scalar encoding volume scaling and invertibility. det(A) ≠ 0 iff A is invertible. <Link href="/matrix/determinant">Try the determinant calculator.</Link></p>
          </section>

          <section>
            <h2>Eigenvalues and Eigenvectors</h2>
            <p>
              An <strong>eigenvector</strong> of a square matrix A is a non-zero vector v such that Av = λv for some scalar λ. The scalar λ is the corresponding <strong>eigenvalue</strong>. Geometrically, eigenvectors are directions that A stretches or compresses without rotating — the transformation merely scales them by λ.
            </p>
            <p>
              Finding eigenvalues requires solving the <em>characteristic equation</em> det(A − λI) = 0. For an n×n matrix, this gives a degree-n polynomial in λ, whose roots are the eigenvalues. Each eigenvalue λ has an associated <em>eigenspace</em> — the null space of (A − λI) — containing all corresponding eigenvectors.
            </p>
            <p>
              Eigenvalues and eigenvectors are used in principal component analysis (PCA), differential equations, Google's PageRank algorithm, quantum mechanics, and stability analysis of dynamical systems.
            </p>
          </section>

          <section>
            <h2>Key Theorems to Know</h2>
            <ul>
              <li><strong>Rank-Nullity Theorem:</strong> rank(A) + nullity(A) = n (# columns of A)</li>
              <li><strong>RREF Uniqueness:</strong> Every matrix has exactly one RREF</li>
              <li><strong>Invertible Matrix Theorem:</strong> For an n×n matrix A, the following are equivalent: A is invertible, det(A) ≠ 0, rank(A) = n, Ax = 0 has only the trivial solution, and more</li>
              <li><strong>Cauchy-Schwarz Inequality:</strong> |u · v| ≤ |u||v|</li>
              <li><strong>Spectral Theorem:</strong> Every real symmetric matrix is diagonalizable with real eigenvalues and orthogonal eigenvectors</li>
            </ul>
          </section>

          <section>
            <h2>Next Steps</h2>
            <p>
              After mastering these basics, the natural progression in a first course includes: solving systems with RREF, matrix transformations in ℝ², eigenvalue problems, and orthogonality (dot products, projections, Gram-Schmidt). A second course typically covers inner product spaces, SVD, Jordan normal form, and abstract vector spaces.
            </p>
            <p>
              Use the calculators on this site to check your work as you practice. The <Link href="/">RREF calculator</Link> is particularly useful for verifying row reduction, and the <Link href="/matrix/determinant">determinant calculator</Link> confirms eigenvalue computations.
            </p>
          </section>

          <AdSlot id="guide-la-bottom" size="banner" />
        </article>
      </main>
      <RelatedCalculators picks={['/', '/matrix/inverse', '/matrix/determinant', '/matrix/multiply', '/vectors/dot-product', '/algebra/simplify-radicals']} />
    </>
  );
}
