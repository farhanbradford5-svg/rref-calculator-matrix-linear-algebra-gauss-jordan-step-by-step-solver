import type { Metadata } from 'next';
import Link from 'next/link';
import RadicalCalculator from '@/components/calculator/RadicalCalculator';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Simplify Radicals Calculator — Simplified Radical Form & Radical Form Calculator',
  description: 'Simplify any square root to simplified radical form. √72 = 6√2. This radical form calculator uses prime factorization with full steps. Free, instant, no sign-up.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/algebra/simplify-radicals' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'Simplify Radicals Calculator',
  description: 'Simplifies square roots to simplified radical form using prime factorization with step-by-step explanation.',
  url: 'https://rrefmatrixcalc.com/algebra/simplify-radicals',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com/algebra/simplify-radicals',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Simplify Radicals Calculator', item: 'https://rrefmatrixcalc.com/algebra/simplify-radicals' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is simplified radical form?', acceptedAnswer: { '@type': 'Answer', text: 'A square root √n is in simplified radical form when the radicand has no perfect square factors other than 1. It takes the form a√b where b is square-free (no prime factor repeated).' } },
    { '@type': 'Question', name: 'How do you simplify √72?', acceptedAnswer: { '@type': 'Answer', text: '72 = 2³·3² = 4·9·2 = 36·2. Since 36 = 6², √72 = 6√2. Check: (6√2)² = 36·2 = 72 ✓.' } },
    { '@type': 'Question', name: 'How do you simplify √200?', acceptedAnswer: { '@type': 'Answer', text: '200 = 2³·5² = 4·50 = 4·25·2 = 100·2. Since 100 = 10², √200 = 10√2.' } },
    { '@type': 'Question', name: 'What is a perfect square?', acceptedAnswer: { '@type': 'Answer', text: 'A perfect square is a non-negative integer whose square root is an integer: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, ...' } },
    { '@type': 'Question', name: 'Can you simplify a radical with a fraction under the root?', acceptedAnswer: { '@type': 'Answer', text: '√(a/b) = √a/√b. Simplify each part separately. For example, √(1/4) = 1/√4 = 1/2.' } },
    { '@type': 'Question', name: 'What does it mean if the radical cannot be simplified?', acceptedAnswer: { '@type': 'Answer', text: 'The radicand has no perfect square factors — all its prime factors appear exactly once. Example: √30 = √(2·3·5) cannot be simplified further.' } },
    { '@type': 'Question', name: 'How do you add radicals?', acceptedAnswer: { '@type': 'Answer', text: 'Add like radicals (same radicand): 3√5 + 2√5 = 5√5. Unlike radicals cannot be combined directly — first simplify each, then check if radicands match.' } },
    { '@type': 'Question', name: 'Is this simplified radical form calculator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no account required.' } },
  ],
};

export default function SimplifyRadicalsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Algebra Calculators' }, { label: 'Simplify Radicals' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          Simplify Radicals Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          Simplify <strong>√n</strong> to a·√b form using prime factorization. Every step explained.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>
        <RadicalCalculator />
        <AdSlot id="rad-after-calc" size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {['100% Free', 'No Sign-up', 'Prime Factorization Steps', 'Exact Form', 'Instant'].map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is Simplified Radical Form?</h2>
            <p>
              A square root √n is in simplified radical form when the radicand (the number under the radical) has no perfect square factors other than 1. In other words, √n = a√b where b is square-free — none of its prime factors appears more than once.
            </p>
            <p>
              For example: √72 is not simplified because 72 = 36 · 2 = 6² · 2, and 36 is a perfect square. The simplified form is 6√2. On the other hand, √30 = √(2·3·5) is already simplified — no prime factor is repeated.
            </p>
            <p>
              Simplified radical form is the standard mathematical convention for expressing irrational numbers. It is exact (unlike decimal approximations), concise, and makes algebraic manipulation much easier. When two students get "3√5" and "√45" for the same problem, simplified form reveals they are the same: √45 = √(9·5) = 3√5.
            </p>
          </section>

          <section>
            <h2>How to Simplify a Square Root: The Prime Factorization Method</h2>
            <ol className="space-y-3">
              <li><strong>Factor the radicand completely</strong> into prime factors. Example: 180 = 2² · 3² · 5.</li>
              <li><strong>Group prime factors in pairs</strong>. Each pair of identical primes contributes one factor outside the radical: √(p²) = p.</li>
              <li><strong>Bring paired factors outside the radical</strong>. Any remaining unpaired factors stay inside.</li>
              <li><strong>Multiply the outside factors</strong> to get the coefficient a, and the inside factors to get the new radicand b.</li>
            </ol>
            <p>
              For 180: 180 = 2²·3²·5. Pairs: one pair of 2s and one pair of 3s. Outside: 2·3 = 6. Inside: 5. Result: 6√5.
            </p>
          </section>

          <section>
            <h2>Worked Example 1: √72</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm space-y-1">
              <p>72 = 2 · 36 = 2 · 6² = 2 · 2² · 3² = 2³ · 3²</p>
              <p>√72 = √(2³ · 3²) = √(2² · 3² · 2) = 2·3·√2 = 6√2</p>
            </div>
            <p>
              Check: (6√2)² = 36 · 2 = 72 ✓. The radicand 2 has no perfect square factor, so 6√2 is fully simplified.
            </p>
          </section>

          <section>
            <h2>Worked Example 2: √200</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm space-y-1">
              <p>200 = 2³ · 5² = 2 · 2² · 5²</p>
              <p>√200 = √(2² · 5² · 2) = 2·5·√2 = 10√2</p>
            </div>
            <p>Check: (10√2)² = 100 · 2 = 200 ✓.</p>
          </section>

          <section>
            <h2>Worked Example 3: Perfect Square (√144)</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm space-y-1">
              <p>144 = 2⁴ · 3² = (2²·3)² = 12²</p>
              <p>√144 = 12</p>
            </div>
            <p>When the radicand is a perfect square, the result is a whole number. The calculator detects this and reports "√144 = 12" without a residual radical.</p>
          </section>

          <section>
            <h2>Worked Example 4: Already Simplified (√30)</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm space-y-1">
              <p>30 = 2 · 3 · 5 (no prime factor repeated)</p>
              <p>√30 is already in simplified form</p>
            </div>
            <p>When no prime factor appears twice, the radical is already in simplified form. The coefficient is 1 and the radicand is unchanged.</p>
          </section>

          <section>
            <h2>Simplified Radical Form vs. Decimal Approximation</h2>
            <p>
              Decimal approximations like √2 ≈ 1.41421356 are rounded — they are never exact. Simplified radical form 1·√2 is <em>exact</em>, regardless of how many decimal places you write.
            </p>
            <p>
              In algebra courses, "exact form" is required. Writing √72 ≈ 8.485 loses precision; writing 6√2 is exact. This matters in geometry (exact area of a square with diagonal 12 is 72, and √72 = 6√2) and in proofs where exact values are essential.
            </p>
            <p>
              Simplified radical form also makes arithmetic easier: 3√5 + 2√5 = 5√5 (add coefficients, like like terms). This would be opaque in decimal form (6.708... + 4.472... = 11.180..., and recognizing this as 5√5 requires working backwards).
            </p>
          </section>

          <section>
            <h2>Radicals in Linear Algebra: Where This Comes Up</h2>
            <p>
              Simplified radical form appears constantly in linear algebra because vector lengths (norms) involve square roots. The magnitude of a vector (a, b) is √(a² + b²). Normalizing a vector requires dividing by this length — and keeping the exact form avoids rounding errors.
            </p>
            <p>
              Eigenvalues of matrices often involve radicals. For a 2×2 matrix with characteristic polynomial λ² − 4λ + 1 = 0, the eigenvalues are λ = 2 ± √3. Keeping these in radical form is essential for symbolic computation.
            </p>
            <p>
              The Gram-Schmidt process generates orthonormal bases by normalizing vectors. Each normalization step involves a square root — keeping them in simplified form prevents error accumulation.
            </p>
          </section>

          <section>
            <h2>Rationalizing the Denominator</h2>
            <p>
              When a radical appears in a denominator, the standard form requires removing it. The technique depends on what's in the denominator:
            </p>
            <p><strong>Simple radical denominator:</strong> multiply numerator and denominator by the same radical.</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>3/√5 = (3·√5)/(√5·√5) = 3√5/5</p>
            </div>
            <p><strong>Binomial with radical:</strong> multiply by the conjugate (change the sign between terms).</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>2/(1 + √3) × (1 − √3)/(1 − √3) = 2(1−√3)/(1−3) = 2(1−√3)/(−2) = √3 − 1</p>
            </div>
            <p>
              The key: (a + √b)(a − √b) = a² − b eliminates the radical. Rationalizing is required in standard simplified form and essential in calculus when evaluating limits involving radicals.
            </p>
          </section>

          <section>
            <h2>Adding, Subtracting, and Multiplying Radicals</h2>
            <p>
              <strong>Adding and subtracting:</strong> only radicals with the same radicand can be combined directly. Always simplify each radical first, then check if radicands match.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>3√5 + 7√5 = 10√5  ✓ (same radicand — add coefficients)</p>
              <p>√50 + √8 = 5√2 + 2√2 = 7√2  (simplify first)</p>
              <p>√50 + √12 = 5√2 + 2√3  (different radicands — cannot combine)</p>
            </div>
            <p>
              <strong>Multiplying radicals:</strong> √a · √b = √(ab), then simplify the product.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>√6 · √15 = √90 = √(9·10) = 3√10</p>
              <p>(2√3)(5√12) = 10√36 = 10 · 6 = 60</p>
              <p>(3 + √2)(3 − √2) = 9 − 2 = 7  (conjugate product)</p>
            </div>
          </section>

          <section>
            <h2>This Simplified Radical Form Calculator in Linear Algebra</h2>
            <p>
              This radical form calculator and simplified radical form calculator appears constantly in linear algebra because vector norms involve square roots. The Euclidean norm of v = ⟨1, 2, 3⟩ is |v| = √(1+4+9) = √14. Since 14 = 2·7 has no repeated prime factor, √14 is already in simplified radical form.
            </p>
            <p>
              Eigenvalues frequently involve radicals. For a matrix with characteristic polynomial λ² − 6λ + 7 = 0, the eigenvalues are λ = (6 ± √(36−28))/2 = (6 ± √8)/2 = (6 ± 2√2)/2 = 3 ± √2. Keeping eigenvalues in simplified radical form is essential for exact symbolic computation.
            </p>
            <p>
              The Gram-Schmidt process normalizes each vector by dividing by its norm. If the norm is 3√5, normalizing requires dividing by 3√5 — and rationalizing gives clean form. Use this simplified radical form calculator to simplify norms encountered during Gram-Schmidt, eigenvalue computation, or any other linear algebra procedure requiring exact square roots.
            </p>
            <p>
              For related calculations, see our <Link href="/vectors/dot-product" className="text-primary hover:underline">dot product calculator</Link> (for computing the norms v·v = |v|² before taking the square root), the <Link href="/" className="text-primary hover:underline">RREF calculator</Link> for the matrix operations that generate these radical expressions, and the <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse calculator</Link> when eigenvalue computations involve radicals in the characteristic polynomial.
            </p>
          </section>

          <section>
            <h2>Radicals in Matrix Norm Calculations</h2>
            <p>
              When you compute the Frobenius norm of a matrix (the square root of the sum of squared entries), you get a radical expression. For example, the Frobenius norm of [[1,2],[3,4]] is √(1+4+9+16) = √30. Since 30 = 2·3·5 has no repeated prime, √30 is already simplified. Use this calculator to simplify any such norm before continuing with further matrix operations.
            </p>
            <p>
              Radicals also appear in eigenvalue calculations. If you compute eigenvalues using the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link> to evaluate det(A − λI) = 0 and solve a quadratic, the discriminant involves a square root. For a full introduction to why eigenvalues matter in linear algebra, see our <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics guide</Link>.
            </p>
          </section>

          <section>
            <h2>Cube Roots and nth Roots</h2>
            <p>
              The same prime factorization approach extends to cube roots (∛n) and nth roots: group prime factors in triples (or n-tuples) instead of pairs.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>∛54 = ∛(2 · 3³) = 3∛2  (one complete triple of 3s comes out)</p>
              <p>∛500 = ∛(2²·5³) = 5∛4  (triple of 5s comes out, 2² stays inside)</p>
              <p>⁴√48 = ⁴√(2⁴·3) = 2⁴√3  (complete quad of 2s comes out)</p>
            </div>
            <p>
              For the nth root ⁿ√k: factor k into primes, group prime factors in sets of n. Each complete group of n identical primes contributes one factor outside the radical; remaining primes stay inside.
            </p>
            <p>
              This calculator simplifies square roots, the most common case in pre-calculus and linear algebra. For cube roots and higher, apply the same prime factorization method manually using the same grouping principle.
            </p>
          </section>

          <AdSlot id="rad-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What is simplified radical form?', a: 'A square root √n is simplified when the radicand has no perfect square factors. It takes the form a√b where b is square-free (no prime repeated).' },
                { q: 'How do you simplify √72?', a: '72 = 2³·3² = 4·9·2 = 36·2. Since 36 = 6², √72 = 6√2.' },
                { q: 'What is a perfect square?', a: 'A perfect square is a non-negative integer whose square root is an integer: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, ...' },
                { q: 'Can you simplify a radical with a fraction under the root?', a: '√(a/b) = √a/√b. You can simplify each separately. For example, √(1/4) = √1/√4 = 1/2.' },
                { q: 'What does it mean if the radical cannot be simplified?', a: 'The radicand has no perfect square factors — all its prime factors appear exactly once. Example: √30 = √(2·3·5) cannot be simplified further.' },
                { q: 'How do you add radicals?', a: 'Add like radicals (same radicand): 3√5 + 2√5 = 5√5. Unlike radicals (different radicands) cannot be combined directly — first simplify, then check if radicands match.' },
                { q: 'What is √0?', a: '√0 = 0. Zero is a perfect square (0 = 0²).' },
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
      <RelatedCalculators exclude="/algebra/simplify-radicals" picks={['/', '/matrix/determinant', '/vectors/cross-product', '/vectors/dot-product', '/matrix/inverse']} />
    </>
  );
}
