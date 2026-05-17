import type { Metadata } from 'next';
import Link from 'next/link';
import DotProductCalculator from '@/components/calculator/DotProductCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dot Product Calculator — n-Dimensional u · v with Steps',
  description: 'Calculate the dot product of two vectors in any dimension. See each term, exact fractions, orthogonality check. Free, no sign-up required.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/vectors/dot-product' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Dot Product Calculator',
  description: 'Computes the dot product of two n-dimensional vectors with step-by-step multiplication and summation.',
  url: 'https://rrefmatrixcalc.com/vectors/dot-product',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/vectors/dot-product',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Dot Product Calculator', item: 'https://rrefmatrixcalc.com/vectors/dot-product' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is the dot product commutative?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. u · v = v · u always. This follows because multiplication of real numbers is commutative and the sum does not depend on order.' } },
    { '@type': 'Question', name: 'What does a negative dot product mean?', acceptedAnswer: { '@type': 'Answer', text: 'The angle between u and v is greater than 90° (obtuse). The vectors point more away from each other than toward each other.' } },
    { '@type': 'Question', name: 'What does dot product = 0 mean?', acceptedAnswer: { '@type': 'Answer', text: 'The vectors are orthogonal (perpendicular). The angle between them is exactly 90°.' } },
    { '@type': 'Question', name: 'What is the dot product of a vector with itself?', acceptedAnswer: { '@type': 'Answer', text: 'u · u = |u|² = the squared magnitude of u. This gives the formula for vector length: |u| = √(u · u).' } },
    { '@type': 'Question', name: 'How is the dot product related to matrix multiplication?', acceptedAnswer: { '@type': 'Answer', text: 'For column vectors u and v, u · v = uᵀv. Matrix multiplication is built from dot products: (AB)[i][j] = row i of A dotted with column j of B.' } },
    { '@type': 'Question', name: 'Can I compute dot products in complex vector spaces?', acceptedAnswer: { '@type': 'Answer', text: 'The generalization is the Hermitian inner product: ⟨u,v⟩ = Σᵢ ūᵢvᵢ (conjugate of u times v). This calculator handles real numbers only.' } },
    { '@type': 'Question', name: 'What is cosine similarity?', acceptedAnswer: { '@type': 'Answer', text: 'Cosine similarity = (u · v)/(|u||v|) — the dot product of unit vectors. It measures directional alignment independent of magnitude, widely used in NLP and recommendation systems.' } },
    { '@type': 'Question', name: 'Is this calculator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no account required.' } },
  ],
};

export default function DotProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Vector Calculators' }, { label: 'Dot Product' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Dot Product Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Compute <strong>u · v</strong> for vectors in any dimension. Every term shown, orthogonality detected automatically.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <DotProductCalculator />
        <AdSlot id="dot-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Any Dimension', 'Exact Fractions', 'Orthogonality Check'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is the Dot Product?</h2>
            <p>
              The dot product (also called the scalar product or inner product) of two n-dimensional vectors u and v is the scalar:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              u · v = u₁v₁ + u₂v₂ + ... + uₙvₙ = Σᵢ uᵢvᵢ
            </div>
            <p>
              Geometrically, u · v = |u||v|cos(θ), where θ is the angle between u and v. This gives the dot product a clear geometric meaning: it measures how much of u points in the direction of v (or equivalently, how much of v points in the direction of u).
            </p>
            <p>Key properties:</p>
            <ul>
              <li><strong>Commutative</strong>: u · v = v · u</li>
              <li><strong>Distributive</strong>: u · (v + w) = u · v + u · w</li>
              <li><strong>Scalar multiplication</strong>: (ku) · v = k(u · v)</li>
              <li><strong>Self dot product</strong>: u · u = |u|² (squared magnitude)</li>
              <li><strong>Orthogonality</strong>: u · v = 0 if and only if u ⊥ v</li>
              <li><strong>Cauchy-Schwarz inequality</strong>: |u · v| ≤ |u||v|</li>
            </ul>
          </section>

          <section>
            <h2>Worked Example 1: 3D Dot Product</h2>
            <p>Let u = ⟨2, −1, 3⟩ and v = ⟨4, 5, −2⟩:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>u · v = (2)(4) + (−1)(5) + (3)(−2)</p>
              <p>      = 8 + (−5) + (−6)</p>
              <p>      = −3</p>
            </div>
            <p>The angle between these vectors: cos(θ) = (−3)/(|u||v|). |u| = √14, |v| = √45 = 3√5. cos(θ) = −3/(√14·3√5) = −3/(3√70) = −1/√70 ≈ −0.1195. So θ ≈ 96.9° — slightly obtuse.</p>
          </section>

          <section>
            <h2>Worked Example 2: Orthogonal Vectors</h2>
            <p>Let u = ⟨3, 4⟩ and v = ⟨−4, 3⟩:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm space-y-1">
              <p>u · v = (3)(−4) + (4)(3) = −12 + 12 = 0</p>
            </div>
            <p>Dot product = 0, so u ⊥ v. These two vectors are perpendicular. You can verify: v is obtained by rotating u by 90° counterclockwise (swap components and negate the first: [a,b] → [−b,a]).</p>
          </section>

          <section>
            <h2>Worked Example 3: 4D Dot Product with Fractions</h2>
            <p>Let u = ⟨1/2, 2/3, 3/4, 1⟩ and v = ⟨4, 3, 2, 1⟩:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>u · v = (1/2)(4) + (2/3)(3) + (3/4)(2) + (1)(1)</p>
              <p>      = 2 + 2 + 3/2 + 1</p>
              <p>      = 5 + 3/2 = 13/2</p>
            </div>
            <p>Exact rational arithmetic gives 13/2 — no decimal approximation involved.</p>
          </section>

          <section>
            <h2>Projection and the Dot Product</h2>
            <p>
              The scalar projection of u onto v is (u · v)/|v| — how far u extends in the direction of v. The vector projection of u onto v is:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm">
              proj_v(u) = (u · v / v · v) · v
            </div>
            <p>
              This is the component of u parallel to v. The remainder u − proj_v(u) is perpendicular to v. The Gram-Schmidt process uses this iteratively to produce an orthonormal basis from any linearly independent set of vectors. The <Link href="/" className="text-primary hover:underline">RREF calculator</Link> can first verify that your starting vectors are linearly independent before applying Gram-Schmidt.
            </p>
          </section>

          <section>
            <h2>Dot Product vs. Cross Product</h2>
            <p>
              The dot product produces a <em>scalar</em>; the <Link href="/vectors/cross-product" className="text-primary hover:underline">cross product</Link> produces a <em>vector</em> (and is only defined in 3D). The dot product measures alignment; the cross product measures perpendicularity and area.
            </p>
            <p>
              When u · v = 0, the vectors are orthogonal. When u × v = 0, the vectors are parallel. These are complementary tests: dot product for parallelism-like information, cross product for orientation information.
            </p>
          </section>

          <section>
            <h2>Applications of the Dot Product</h2>
            <p><strong>Angle between vectors.</strong> cos(θ) = (u·v)/(|u||v|). This is the standard formula for angle between vectors in any dimension.</p>
            <p><strong>Orthogonality testing.</strong> u · v = 0 is the definition of perpendicular vectors. This is used in Gram-Schmidt, QR decomposition, and checking bases.</p>
            <p><strong>Work in physics.</strong> Work = F · d, where F is force and d is displacement. Only the component of force parallel to motion does work.</p>
            <p><strong>Machine learning.</strong> Similarity between documents (or embeddings) is measured by dot product (cosine similarity = dot product of unit vectors). Neural network forward passes are sequences of dot products.</p>
            <p><strong>Signal processing.</strong> The correlation between two signals is their dot product (or integral of their product for continuous signals). Filtering uses dot products between the signal and filter kernel.</p>
          </section>

          <section>
            <h2>The Gram-Schmidt Process: Dot Products in Action</h2>
            <p>
              Gram-Schmidt converts any set of linearly independent vectors into an orthonormal basis using dot products at every step. Given vectors v₁, v₂, …, vₙ:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>u₁ = v₁/|v₁|</p>
              <p>w₂ = v₂ − (v₂·u₁)u₁        ← each projection uses a dot product</p>
              <p>u₂ = w₂/|w₂|</p>
              <p>w₃ = v₃ − (v₃·u₁)u₁ − (v₃·u₂)u₂</p>
              <p>u₃ = w₃/|w₃|</p>
            </div>
            <p>
              Each projection coefficient (vᵢ·uⱼ) is a dot product. The resulting u₁, u₂, … are orthonormal: uᵢ·uⱼ = 0 for i ≠ j, and |uᵢ| = 1. Gram-Schmidt is the basis of QR decomposition, the QR eigenvalue algorithm, and orthonormal basis construction in any inner product space.
            </p>
            <p>
              Use this <Link href="/vectors/dot-product" className="text-primary hover:underline">dot product calculator</Link> to compute projection coefficients at each Gram-Schmidt step, and the <Link href="/algebra/simplify-radicals" className="text-primary hover:underline">simplify radicals calculator</Link> to simplify the norms |wᵢ| = √(wᵢ·wᵢ).
            </p>
          </section>

          <section>
            <h2>Inner Product Spaces</h2>
            <p>
              The dot product is the standard inner product on ℝⁿ, but the concept generalizes. An <strong>inner product space</strong> is any vector space V with an operation ⟨u, v⟩ satisfying linearity, symmetry, and positive definiteness. The same orthogonality theory applies to all of them.
            </p>
            <p>Examples beyond coordinate vectors:</p>
            <ul>
              <li><strong>Function space:</strong> ⟨f, g⟩ = ∫ f(x)g(x) dx. The Fourier series decomposes a function into orthogonal frequency components using this inner product.</li>
              <li><strong>Polynomial space:</strong> ⟨p, q⟩ = ∫₀¹ p(x)q(x) dx. Legendre polynomials are the orthonormal basis under this inner product.</li>
              <li><strong>Matrix space:</strong> ⟨A, B⟩ = trace(AᵀB) (the Frobenius inner product). Two matrices are "orthogonal" if their trace product is zero.</li>
            </ul>
            <p>
              Orthogonality, projections, and Gram-Schmidt all generalize perfectly to any inner product space. This is why linear algebra methods apply to signal processing, numerical PDEs, quantum mechanics, and statistics — they all live in inner product spaces. For foundations, see our <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics guide</Link>.
            </p>
          </section>

          <section>
            <h2>Dot Products in Machine Learning</h2>
            <p>
              Modern machine learning is built on dot products. A single neuron computes a weighted sum of inputs — the dot product w · x + bias, where w is the weight vector. Training a deep network performs millions of such dot products per forward pass — in matrix form, each layer computes a <Link href="/matrix/multiply" className="text-primary hover:underline">matrix multiplication</Link> W·x. GPUs, optimized for parallel dot product computation (GEMM operations), are essential for this scale.
            </p>
            <p>
              <strong>Cosine similarity</strong> = (u · v)/(|u||v|) normalizes the dot product to measure directional alignment independent of magnitude. In natural language processing, word and sentence embeddings are compared by cosine similarity — documents discussing the same topic have embeddings pointing in roughly the same direction, regardless of document length.
            </p>
            <p>
              <strong>Kernel methods</strong> (support vector machines, kernel PCA) extend the dot product idea via the kernel trick: replace ⟨φ(x), φ(y)⟩ with a kernel function K(x,y) that implicitly computes dot products in a high-dimensional feature space. The radial basis function (Gaussian) kernel K(x,y) = exp(−|x−y|²/2σ²) corresponds to an infinite-dimensional feature space without ever computing φ explicitly.
            </p>
            <p>
              Use this dot product calculator to understand the geometry of these machine learning concepts with concrete numerical examples.
            </p>
          </section>

          <AdSlot id="dot-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Is the dot product commutative?', a: 'Yes. u · v = v · u always. This follows because multiplication of real numbers is commutative and the sum does not depend on order.' },
                { q: 'What does a negative dot product mean?', a: 'The angle between u and v is greater than 90° (obtuse). The vectors point more "away" from each other than toward each other.' },
                { q: 'What does dot product = 0 mean?', a: 'The vectors are orthogonal (perpendicular). The angle between them is exactly 90°.' },
                { q: 'What is the dot product of a vector with itself?', a: 'u · u = |u|² = the squared magnitude of u. This gives an easy formula for vector length: |u| = √(u · u).' },
                { q: 'How is the dot product related to matrix multiplication?', a: 'For column vectors u and v, u · v = uᵀv (treating them as 1×n and n×1 matrices). Matrix multiplication is built from dot products: (AB)[i][j] = row i of A dotted with column j of B.' },
                { q: 'Can I compute dot products in complex vector spaces?', a: 'The generalization is the Hermitian inner product: ⟨u,v⟩ = Σᵢ ūᵢvᵢ (conjugate of u times v). This calculator handles real numbers only.' },
                { q: 'What is cosine similarity?', a: 'Cosine similarity = (u · v)/(|u||v|) — the dot product of unit vectors. It measures directional alignment independent of magnitude, widely used in text similarity and recommendation systems.' },
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
      <RelatedCalculators exclude="/vectors/dot-product" picks={['/', '/vectors/cross-product', '/matrix/multiply', '/matrix/transpose', '/matrix/inverse']} />
    </>
  );
}
