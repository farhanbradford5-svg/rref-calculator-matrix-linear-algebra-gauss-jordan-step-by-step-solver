import type { Metadata } from 'next';
import Link from 'next/link';
import CrossProductCalculator from '@/components/calculator/CrossProductCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cross Product Calculator — 3D Vector u × v with Steps',
  description: 'Compute the cross product of two 3D vectors. See i, j, k components calculated via the determinant formula. Exact arithmetic. Free, no sign-up.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/vectors/cross-product' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Cross Product Calculator',
  description: 'Computes the cross product of two 3-dimensional vectors with step-by-step calculations.',
  url: 'https://rrefmatrixcalc.com/vectors/cross-product',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/vectors/cross-product',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Cross Product Calculator', item: 'https://rrefmatrixcalc.com/vectors/cross-product' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is the cross product commutative?', acceptedAnswer: { '@type': 'Answer', text: 'No. u × v = −(v × u). Swapping the vectors negates the result. This is called anti-commutativity.' } },
    { '@type': 'Question', name: 'What does a zero cross product mean?', acceptedAnswer: { '@type': 'Answer', text: 'u × v = 0 means the vectors are parallel (or one is the zero vector). Parallel vectors span no area, so the parallelogram they form has zero area.' } },
    { '@type': 'Question', name: 'What is the magnitude of the cross product?', acceptedAnswer: { '@type': 'Answer', text: '|u × v| = |u||v|sin(θ), where θ is the angle between u and v. It equals the area of the parallelogram with sides u and v.' } },
    { '@type': 'Question', name: 'Is the cross product defined in 2D?', acceptedAnswer: { '@type': 'Answer', text: 'Not as a vector. The 2D analog gives a scalar (the z-component): u × v = u₁v₂ − u₂v₁. In 2D, this scalar indicates orientation (positive = counterclockwise).' } },
    { '@type': 'Question', name: 'Is the cross product defined in higher dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'Not in the same way. The standard cross product only works in ℝ³. Higher-dimensional generalizations use the exterior product, which produces a bivector, not a vector.' } },
    { '@type': 'Question', name: 'What is the right-hand rule?', acceptedAnswer: { '@type': 'Answer', text: 'Point your right-hand fingers from u toward v (curling through the smaller angle). Your thumb points in the direction of u × v.' } },
    { '@type': 'Question', name: 'Can the cross product be computed using a determinant?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — it is the formal determinant of the 3×3 matrix with rows [i, j, k], [u₁, u₂, u₃], [v₁, v₂, v₃]. Expanding along row 1 gives the three components.' } },
    { '@type': 'Question', name: 'Is this calculator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no account required.' } },
  ],
};

export default function CrossProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Vector Calculators' }, { label: 'Cross Product' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Cross Product Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Compute <strong>u × v</strong> for two 3D vectors. Full determinant expansion shown, exact arithmetic.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <CrossProductCalculator />
        <AdSlot id="cross-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Exact Fractions', '3D Vectors', 'Determinant Steps'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is the Cross Product?</h2>
            <p>
              The cross product u × v of two 3D vectors produces a third vector that is perpendicular to both u and v. Its magnitude equals |u||v|sin(θ), where θ is the angle between u and v. This makes the cross product sensitive to both the lengths of the vectors and the angle between them — unlike the dot product, which only captures the parallel component.
            </p>
            <p>
              The direction of u × v is given by the right-hand rule: point your right hand fingers from u toward v (through the smaller angle), and your thumb points in the direction of u × v. Equivalently, u, v, u×v form a right-handed system.
            </p>
            <p>
              The cross product is <em>anti-commutative</em>: v × u = −(u × v). Swapping the vectors reverses the direction but not the magnitude.
            </p>
          </section>

          <section>
            <h2>The Determinant Formula</h2>
            <p>
              The cross product is computed via the formal determinant:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>u × v = det([i   j   k  ])</p>
              <p>            ([u₁  u₂  u₃ ])</p>
              <p>            ([v₁  v₂  v₃ ])</p>
              <p className="mt-2">= (u₂v₃ − u₃v₂)i − (u₁v₃ − u₃v₁)j + (u₁v₂ − u₂v₁)k</p>
            </div>
            <p>
              This is a "formal" determinant — i, j, k are unit vectors, not numbers. Expanding along the first row via cofactors gives the three components.
            </p>
          </section>

          <section>
            <h2>Worked Example 1: Basic Cross Product</h2>
            <p>Let u = ⟨1, 0, 0⟩ (the x-axis unit vector) and v = ⟨0, 1, 0⟩ (the y-axis unit vector):</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>i-component: 0·0 − 0·1 = 0</p>
              <p>j-component: −(1·0 − 0·0) = 0</p>
              <p>k-component: 1·1 − 0·0 = 1</p>
              <p className="mt-2">u × v = ⟨0, 0, 1⟩</p>
            </div>
            <p>The cross product of the x and y unit vectors is the z unit vector — exactly the right-hand rule for the standard basis.</p>
          </section>

          <section>
            <h2>Worked Example 2: Parallel Vectors</h2>
            <p>Let u = ⟨2, 4, 6⟩ and v = ⟨1, 2, 3⟩ (note v = u/2, so they are parallel):</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>i: 4·3 − 6·2 = 12 − 12 = 0</p>
              <p>j: −(2·3 − 6·1) = −(6 − 6) = 0</p>
              <p>k: 2·2 − 4·1 = 4 − 4 = 0</p>
              <p className="mt-2">u × v = ⟨0, 0, 0⟩</p>
            </div>
            <p>Parallel vectors have zero cross product — there is no perpendicular direction to both, and the "parallelogram" they span has zero area (they fall on the same line).</p>
          </section>

          <section>
            <h2>Worked Example 3: Area of a Parallelogram</h2>
            <p>Find the area of the parallelogram with sides u = ⟨3, −3, 1⟩ and v = ⟨4, 9, 2⟩:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>u × v = ⟨(−3)(2)−(1)(9), (1)(4)−(3)(2), (3)(9)−(−3)(4)⟩</p>
              <p>      = ⟨−6−9, 4−6, 27+12⟩ = ⟨−15, −2, 39⟩</p>
              <p className="mt-2">|u × v| = √(225 + 4 + 1521) = √1750 = 5√70 ≈ 41.83</p>
            </div>
            <p>The area of the parallelogram is |u × v| = 5√70. The area of the triangle with these two sides is half that.</p>
          </section>

          <section>
            <h2>Cross Product vs. Dot Product</h2>
            <p>
              The dot product u · v is a <em>scalar</em>; the cross product u × v is a <em>vector</em>. The dot product captures how parallel two vectors are; the cross product captures how perpendicular they are.
            </p>
            <p>
              u · v = 0 means u and v are orthogonal. u × v = 0 means u and v are parallel (or one is zero). Together, they fully characterize the geometric relationship between vectors in 3D.
            </p>
            <p>
              The identity |u × v|² + (u · v)² = |u|²|v|² (Lagrange identity) connects them: the sum of squared area and squared projection equals the product of squared magnitudes.
            </p>
          </section>

          <section>
            <h2>Applications of the Cross Product</h2>
            <p><strong>Normal vectors.</strong> Given a plane through the origin spanned by u and v, n = u × v is the normal vector. This is used to compute surface normals in 3D graphics for lighting calculations.</p>
            <p><strong>Torque.</strong> Torque τ = r × F, where r is the position vector and F is the force. The cross product correctly gives the rotational effect perpendicular to both.</p>
            <p><strong>Angular momentum.</strong> L = r × p, where p = mv is linear momentum. Conservation of angular momentum relies on this vector quantity.</p>
            <p><strong>Area computations.</strong> |u × v| gives the area of the parallelogram; (1/2)|u × v| gives the area of the triangle. This is used in mesh calculations in computer graphics and finite element analysis.</p>
            <p><strong>Volume (scalar triple product).</strong> u · (v × w) gives the volume of the parallelepiped spanned by u, v, w. This equals zero if the vectors are coplanar.</p>
          </section>

          <section>
            <h2>The Scalar Triple Product</h2>
            <p>
              The <strong>scalar triple product</strong> u · (v × w) equals the determinant of the 3×3 matrix whose rows are u, v, and w. Its absolute value gives the volume of the parallelepiped spanned by the three vectors.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>u · (v × w) = det([[u₁,u₂,u₃],[v₁,v₂,v₃],[w₁,w₂,w₃]])</p>
            </div>
            <p>
              When the scalar triple product is zero, the three vectors are coplanar — they all lie in the same plane and span no volume. Cyclic permutations leave it unchanged: u·(v×w) = v·(w×u) = w·(u×v). Anti-cyclic permutations negate it.
            </p>
            <p>
              Example: standard basis vectors e₁ = ⟨1,0,0⟩, e₂ = ⟨0,1,0⟩, e₃ = ⟨0,0,1⟩ give det(I₃) = 1 — the unit cube has volume 1. Use the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link> to compute scalar triple products by entering three vectors as rows.
            </p>
          </section>

          <section>
            <h2>Cross Product in Physics and Engineering</h2>
            <p>
              The cross product models every physical quantity that is perpendicular to two other quantities:
            </p>
            <ul>
              <li><strong>Torque:</strong> τ = r × F, where r is the moment arm and F is force. Magnitude |r||F|sin(θ) measures rotational effectiveness; direction indicates the rotation axis (right-hand rule).</li>
              <li><strong>Angular momentum:</strong> L = r × p = r × mv. Conservation of L is a fundamental law of physics. The cross product is what gives spinning tops, gyroscopes, and orbiting planets their stability.</li>
              <li><strong>Magnetic force:</strong> F = q(v × B). A moving charge in a magnetic field feels a force perpendicular to its motion — hence circular orbits and cyclotrons.</li>
              <li><strong>Surface normals:</strong> Given edges u and v of a triangle in 3D space, n = u × v is the normal vector. All lighting calculations in 3D rendering (OpenGL, WebGL, Vulkan) depend on fast normal computation via the cross product.</li>
            </ul>
            <p>
              In each case, the magnitude |u × v| = |u||v|sin(θ) captures the perpendicular component, while the direction follows the right-hand rule to give a physically meaningful orientation.
            </p>
          </section>

          <section>
            <h2>Cross Product Identities and the BAC–CAB Rule</h2>
            <p>
              The most useful identity for simplifying cross product expressions is the <strong>BAC–CAB rule</strong> (vector triple product expansion):
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto">
              <p>a × (b × c) = b(a · c) − c(a · b)</p>
            </div>
            <p>
              This converts a vector triple product — which lies in the plane of b and c — into a linear combination of b and c. The name is a mnemonic for the pattern.
            </p>
            <p>Other important identities:</p>
            <ul>
              <li><strong>Lagrange identity:</strong> |u × v|² + (u · v)² = |u|²|v|². Connects cross product and dot product magnitudes.</li>
              <li><strong>Jacobi identity:</strong> u × (v × w) + v × (w × u) + w × (u × v) = 0. Makes ℝ³ with cross product a Lie algebra.</li>
              <li><strong>Anticommutativity:</strong> u × v = −(v × u). Order matters — reversing swaps the sign.</li>
              <li><strong>Distributivity:</strong> u × (v + w) = u × v + u × w.</li>
            </ul>
            <p>
              Use this <Link href="/vectors/cross-product" className="text-primary hover:underline">cross product calculator</Link> to verify any of these identities with specific numerical vectors.
            </p>
          </section>

          <section>
            <h2>Cross Product, Determinants, and Linear Algebra</h2>
            <p>
              The cross product formula is a formal determinant expansion — which is why a cross product that comes out as zero tells you the vectors are linearly dependent (they span a 1D subspace instead of 2D). More precisely: u × v = 0 if and only if u and v are parallel (proportional), which is exactly when the 2×3 matrix with rows u and v has rank 1.
            </p>
            <p>
              This connection to determinants runs deep. The cross product is the unique (up to sign) bilinear, anti-symmetric, dimension-compatible operation in ℝ³. In higher dimensions, the analogous concept is the <em>exterior product</em> u ∧ v, which produces a bivector rather than a vector. The magnitude of the exterior product still gives the area of the parallelogram. The <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link> computes the scalar triple product and tests for coplanarity directly.
            </p>
          </section>

          <AdSlot id="cross-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Is the cross product commutative?', a: 'No. u × v = −(v × u). Swapping the vectors negates the result. This is called anti-commutativity.' },
                { q: 'What does a zero cross product mean?', a: 'u × v = 0 means the vectors are parallel (or one is the zero vector). Parallel vectors span no area, so the parallelogram collapses.' },
                { q: 'What is the magnitude of the cross product?', a: '|u × v| = |u||v|sin(θ), where θ is the angle between u and v. It equals the area of the parallelogram with sides u and v.' },
                { q: 'Is the cross product defined in 2D?', a: 'Not as a vector. The 2D analog gives a scalar (the z-component): u × v = u₁v₂ − u₂v₁. In 2D, this scalar tells you orientation (positive = counterclockwise).' },
                { q: 'Is the cross product defined in higher dimensions?', a: 'Not in the same way. The standard cross product only works in ℝ³. There are generalizations (exterior product in any dimension), but they produce bivectors, not vectors.' },
                { q: 'What is the right-hand rule?', a: 'Point your right-hand fingers from u toward v, curling through the smaller angle. Your thumb points in the direction of u × v.' },
                { q: 'Can the cross product be computed using a determinant?', a: 'Yes — it is the formal determinant of the matrix with rows [i, j, k], [u₁, u₂, u₃], [v₁, v₂, v₃]. Expanding along row 1 gives the three components.' },
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
      <RelatedCalculators exclude="/vectors/cross-product" picks={['/', '/vectors/dot-product', '/matrix/determinant', '/matrix/inverse', '/algebra/simplify-radicals']} />
    </>
  );
}
