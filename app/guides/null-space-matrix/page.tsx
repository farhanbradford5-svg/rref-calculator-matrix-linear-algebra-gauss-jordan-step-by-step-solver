import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';

export const metadata: Metadata = {
  title: 'Null Space of a Matrix — How to Find It Using RREF',
  description: 'How to find the null space (kernel) of any matrix using reduced row echelon form. Step-by-step examples with free variables, basis vectors, and the rank-nullity theorem.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/guides/null-space-matrix' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Null Space of a Matrix: How to Find It Using RREF',
  description: 'A complete guide to computing the null space (kernel) of any matrix using reduced row echelon form, with worked examples and the rank-nullity theorem.',
  url: 'https://rrefmatrixcalc.com/guides/null-space-matrix',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://rrefmatrixcalc.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Null Space of a Matrix', item: 'https://rrefmatrixcalc.com/guides/null-space-matrix' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the null space of a matrix?', acceptedAnswer: { '@type': 'Answer', text: 'The null space (or kernel) of a matrix A is the set of all vectors x such that Ax = 0. It is a subspace of ℝⁿ where n is the number of columns of A. The null space always contains the zero vector.' } },
    { '@type': 'Question', name: 'How do you find the null space using RREF?', acceptedAnswer: { '@type': 'Answer', text: 'Compute RREF(A). Identify free variable columns (columns without pivots). For each free variable, set it to 1 and all other free variables to 0, then solve for the pivot variables. The resulting vectors form a basis for the null space.' } },
    { '@type': 'Question', name: 'What is the rank-nullity theorem?', acceptedAnswer: { '@type': 'Answer', text: 'For an m×n matrix A: rank(A) + nullity(A) = n, where nullity is the dimension of the null space (number of free variables in RREF). The number of pivots plus the number of free variable columns always equals the total number of columns.' } },
    { '@type': 'Question', name: 'What does it mean if the null space is just {0}?', acceptedAnswer: { '@type': 'Answer', text: 'A trivial null space means the only solution to Ax = 0 is x = 0. This occurs when A has full column rank — every column is a pivot column. The columns of A are linearly independent, and the matrix has no free variables.' } },
  ],
};

export default function NullSpaceGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides' }, { label: 'Null Space of a Matrix' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Null Space of a Matrix — How to Find It Using RREF
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          The null space (kernel) is the set of all vectors x satisfying Ax = 0. This guide shows exactly how to find it using reduced row echelon form, with worked examples and a proof of the rank-nullity theorem.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is the Null Space?</h2>
            <p>
              The <strong>null space</strong> (also called the <strong>kernel</strong>) of an m×n matrix A is the set of all n-dimensional vectors x satisfying Ax = 0:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              Null(A) = ker(A) = {'{'}x ∈ ℝⁿ : Ax = 0{'}'}
            </div>
            <p>
              The null space is always a subspace of ℝⁿ: it contains the zero vector, is closed under addition, and is closed under scalar multiplication. Its dimension — the number of linearly independent vectors needed to span it — is called the <strong>nullity</strong> of A.
            </p>
            <p>
              Geometrically, the null space is the set of vectors that A maps to zero. If A represents a linear transformation T: ℝⁿ → ℝᵐ, the null space is the set of inputs that T collapses to the origin. A linear transformation is injective (one-to-one) if and only if its null space contains only the zero vector.
            </p>
          </section>

          <section>
            <h2>The Rank-Nullity Theorem</h2>
            <p>
              For any m×n matrix A, the fundamental identity is:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              rank(A) + nullity(A) = n
            </div>
            <p>
              Here rank(A) is the number of pivots in RREF(A) (equal to the dimension of the column space), and nullity(A) is the number of free variable columns in RREF(A) (equal to the dimension of the null space). The theorem says: pivots + free variables = total columns.
            </p>
            <p>
              This identity constrains what is possible: a 4×6 matrix has at most rank 4 (since rank ≤ min(m,n)), so nullity ≥ 2. A 4×6 matrix with rank 3 has nullity 3. A 4×6 matrix with rank 4 has nullity 2.
            </p>
            <p>
              The theorem also implies: a square n×n matrix is invertible (full rank n) if and only if its null space is trivial (nullity 0). Use the <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse calculator</Link> for invertibility checks, or the <Link href="/" className="text-primary hover:underline">RREF calculator</Link> to count pivots and free variables directly.
            </p>
          </section>

          <section>
            <h2>How to Find the Null Space Using RREF: Step-by-Step</h2>
            <ol className="space-y-3">
              <li><strong>Set up Ax = 0.</strong> Form the augmented matrix [A | 0]. Since the right-hand side is all zeros, the last column never changes — you can omit it and just compute RREF(A).</li>
              <li><strong>Compute RREF(A).</strong> Use <Link href="/" className="text-primary hover:underline">RREF calculator</Link> or apply Gauss-Jordan elimination by hand.</li>
              <li><strong>Identify pivot and free columns.</strong> Pivot columns correspond to pivot variables; non-pivot columns correspond to free variables. If RREF has pivots in columns 1 and 3, then columns 2, 4, … are free.</li>
              <li><strong>Express pivot variables in terms of free variables.</strong> Each pivot row gives one equation of the form: pivot variable = (linear combination of free variables).</li>
              <li><strong>Create a basis vector for each free variable.</strong> Set that free variable to 1, all others to 0, and solve for the pivot variables. The resulting vector is one basis vector for the null space.</li>
              <li><strong>Collect all basis vectors.</strong> The complete set is a basis for Null(A). Their span is the null space.</li>
            </ol>
          </section>

          <section>
            <h2>Worked Example: 3×4 Matrix with One Free Variable</h2>
            <p>Find the null space of:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>A = [ 1   2   3   4 ]</p>
              <p>    [ 2   5   8  11 ]</p>
              <p>    [ 3   7  11  15 ]</p>
            </div>
            <p>Step 1: Compute RREF(A).</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>R₂ → R₂ − 2R₁:   [ 0  1  2  3 ]</p>
              <p>R₃ → R₃ − 3R₁:   [ 0  1  2  3 ]</p>
              <p>R₃ → R₃ − R₂:    [ 0  0  0  0 ]</p>
              <p>RREF(A) = [ 1  0  −1  −2 ]</p>
              <p>          [ 0  1   2   3 ]</p>
              <p>          [ 0  0   0   0 ]</p>
            </div>
            <p>Step 2: Pivot columns are 1 and 2. Free columns are 3 (x₃) and 4 (x₄).</p>
            <p>Step 3: From RREF, the equations are: x₁ − x₃ − 2x₄ = 0 → x₁ = x₃ + 2x₄; and x₂ + 2x₃ + 3x₄ = 0 → x₂ = −2x₃ − 3x₄.</p>
            <p>Step 4: Set x₃ = 1, x₄ = 0: x₁ = 1, x₂ = −2. Basis vector v₁ = (1, −2, 1, 0).</p>
            <p>Set x₃ = 0, x₄ = 1: x₁ = 2, x₂ = −3. Basis vector v₂ = (2, −3, 0, 1).</p>
            <p>Null(A) = span{'{'}v₁, v₂{'}'} = {'{'}s(1,−2,1,0) + t(2,−3,0,1) : s,t ∈ ℝ{'}'}.</p>
            <p>Verify: A·v₁ = (1+2·(−2)+3·1+4·0, ...) Let us check row 1: 1(1) + 2(−2) + 3(1) + 4(0) = 1 − 4 + 3 + 0 = 0 ✓. Enter A into the <Link href="/" className="text-primary hover:underline">RREF calculator</Link> to see every elimination step.</p>
          </section>

          <section>
            <h2>When the Null Space Is Trivial</h2>
            <p>
              A matrix has a trivial null space (only the zero vector) when RREF(A) has a pivot in every column. This means rank(A) = n (full column rank). In this case, the only solution to Ax = 0 is x = 0.
            </p>
            <p>
              For square matrices: full column rank ⟺ full row rank ⟺ invertible ⟺ det(A) ≠ 0 ⟺ trivial null space. All of these conditions are equivalent for square matrices.
            </p>
            <p>
              For rectangular m×n matrices with m &lt; n: full column rank is impossible (we cannot have more pivots than rows), so the null space is always non-trivial. Any matrix with more columns than rows must have a non-trivial null space.
            </p>
          </section>

          <section>
            <h2>The Null Space vs. the Solution Set of Ax = b</h2>
            <p>
              The null space Null(A) is the solution set of the <em>homogeneous</em> system Ax = 0. The solution set of the <em>non-homogeneous</em> system Ax = b (for a specific b) is:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              Solution set of Ax = b  =  x_particular + Null(A)
            </div>
            <p>
              That is, take any one particular solution x_p (satisfying Ax_p = b), then add all vectors in the null space. This is why the null space matters: it characterizes how many solutions Ax = b has. If Null(A) is trivial, the solution is unique (if it exists). If Null(A) is non-trivial, there are infinitely many solutions.
            </p>
            <p>
              For detailed coverage of all three solution types, see our <Link href="/guides/solving-linear-systems" className="text-primary hover:underline">solving linear systems guide</Link>.
            </p>
          </section>

          <section>
            <h2>Applications of the Null Space</h2>
            <p><strong>Testing linear independence.</strong> The columns of A are linearly independent if and only if Null(A) = {'{'}0{'}'}. Apply RREF: if every column is a pivot column, the vectors are independent.</p>
            <p><strong>Finding a basis for a solution family.</strong> When Ax = b has infinitely many solutions, the null space basis vectors parametrize the entire solution family. Each free variable gives one degree of freedom in the solution.</p>
            <p><strong>Kernel of a linear transformation.</strong> If T: ℝⁿ → ℝᵐ is linear with matrix A, then ker(T) = Null(A). The first isomorphism theorem says ℝⁿ/ker(T) ≅ image(T), connecting dimension with rank.</p>
            <p><strong>Computer graphics.</strong> Texture coordinates, barycentric coordinates, and lighting computations involve null space reasoning — determining which combinations of basis vectors produce a given output.</p>
            <p><strong>Error-correcting codes.</strong> Linear codes over finite fields use null space (parity check matrix) to detect and correct transmission errors. The null space of the parity matrix is the code.</p>
            <p>
              For foundational concepts connecting null space to the four fundamental subspaces, see our <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics guide</Link>.
            </p>
          </section>

          <AdSlot id="null-space-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What is the null space of a matrix?', a: 'The null space (or kernel) of A is the set of all x satisfying Ax = 0. It is always a subspace of ℝⁿ. Every matrix has a null space containing at least the zero vector.' },
                { q: 'How do you find the null space using RREF?', a: 'Compute RREF(A). Identify free columns (no pivot). For each free variable, set it to 1 and others to 0, then solve for the pivot variables from the RREF rows. Each free variable yields one null space basis vector.' },
                { q: 'What is the rank-nullity theorem?', a: 'rank(A) + nullity(A) = n (number of columns). Pivots + free variables = total columns. This identity always holds for any m×n matrix.' },
                { q: 'What does a trivial null space mean?', a: 'Null(A) = {0} means the only solution to Ax = 0 is x = 0. Equivalently, rank(A) = n (full column rank) and the columns of A are linearly independent. For square matrices, this is equivalent to invertibility.' },
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
      <RelatedCalculators exclude="/guides/null-space-matrix" picks={['/', '/matrix/inverse', '/guides/linear-algebra-basics', '/guides/solving-linear-systems', '/matrix/gauss-jordan']} />
    </>
  );
}
