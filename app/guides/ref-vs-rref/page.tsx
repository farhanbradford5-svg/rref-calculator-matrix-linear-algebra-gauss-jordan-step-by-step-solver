import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';

export const metadata: Metadata = {
  title: 'REF vs RREF — Row Echelon Form vs Reduced Row Echelon Form Explained',
  description: 'Clear explanation of the difference between Row Echelon Form (REF) and Reduced Row Echelon Form (RREF). Conditions, worked examples, and when to use each. Free guide.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/guides/ref-vs-rref' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'REF vs RREF: Row Echelon Form vs Reduced Row Echelon Form',
  description: 'A complete explanation of the difference between Row Echelon Form and Reduced Row Echelon Form, with conditions, side-by-side examples, and guidance on when to use each.',
  url: 'https://rrefmatrixcalc.com/guides/ref-vs-rref',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://rrefmatrixcalc.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'REF vs RREF', item: 'https://rrefmatrixcalc.com/guides/ref-vs-rref' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the difference between REF and RREF?', acceptedAnswer: { '@type': 'Answer', text: 'Both require zero rows at the bottom, a staircase pattern of leading entries, and zeros below each pivot. RREF additionally requires each pivot to equal exactly 1, and all entries above each pivot to also be 0. RREF is unique; REF is not.' } },
    { '@type': 'Question', name: 'Is RREF unique?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every matrix has exactly one RREF, regardless of which sequence of row operations was used to reach it. REF is not unique — many different upper-triangular matrices can be REFs of the same matrix.' } },
    { '@type': 'Question', name: 'When should I use REF instead of RREF?', acceptedAnswer: { '@type': 'Answer', text: 'REF is often faster by hand because you skip back-elimination above pivots. It is typically used with back substitution when you only need the solution to Ax = b, not the solution structure or rank-related information that RREF provides more directly.' } },
    { '@type': 'Question', name: 'Does the RREF calculator compute REF or RREF?', acceptedAnswer: { '@type': 'Answer', text: 'The calculator always computes the full RREF (Reduced Row Echelon Form). It performs Gauss-Jordan elimination — which zeros out entries both below and above each pivot — not just Gaussian elimination (which stops at REF).' } },
  ],
};

export default function RefVsRrefGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides' }, { label: 'REF vs RREF' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          REF vs RREF — Row Echelon Form vs Reduced Row Echelon Form
        </h1>
        <p className="text-xs text-slate-400 mb-6">📖 6 min read · Updated May 2026 · Free guide</p>
        <p className="text-lg text-slate-500 mb-6">
          The difference between REF and RREF is simple but critical. This guide explains the exact conditions for each, why RREF is unique while REF is not, and when to use each form.
          <span className="ml-2 text-xs text-slate-400">Updated May 2026 · Reviewed by our math editorial team</span>
        </p>

        <article className="prose-content mt-8 space-y-10">
          <section>
            <h2>What Is Row Echelon Form (REF)?</h2>
            <p>
              A matrix is in <strong>Row Echelon Form (REF)</strong> if it satisfies three conditions:
            </p>
            <ol className="space-y-2">
              <li><strong>All-zero rows are at the bottom.</strong> Any row consisting entirely of zeros must appear below all non-zero rows.</li>
              <li><strong>Each non-zero row has a leading entry (pivot).</strong> The first non-zero entry in each non-zero row must appear strictly to the right of the leading entry in the row above.</li>
              <li><strong>Entries below each pivot are zero.</strong> All entries directly below a pivot column entry must be zero (the staircase pattern).</li>
            </ol>
            <p>
              Crucially, REF does <em>not</em> require pivots to equal 1, and it does <em>not</em> require entries above pivots to be zero. Multiple matrices can all be REFs of the same original matrix — REF is <strong>not unique</strong>.
            </p>
            <p>
              For example, the following are all valid REFs of the same matrix:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-3">
              <div>
                <p className="text-slate-400 text-xs mb-1">REF option 1 (pivot = 2):</p>
                <p>[ 2  4  −2  8 ]</p>
                <p>[ 0  1   1  5 ]</p>
                <p>[ 0  0   3  6 ]</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">REF option 2 (pivot = 1, scaled):</p>
                <p>[ 1  2  −1  4 ]</p>
                <p>[ 0  1   1  5 ]</p>
                <p>[ 0  0   1  2 ]</p>
              </div>
            </div>
            <p>
              Both are valid REFs. The second has pivots equal to 1 but still has non-zero entries above the pivots — so it is REF but not RREF.
            </p>
          </section>

          <section>
            <h2>What Is Reduced Row Echelon Form (RREF)?</h2>
            <p>
              A matrix is in <strong>Reduced Row Echelon Form (RREF)</strong> if it satisfies all three REF conditions, plus two additional ones:
            </p>
            <ol className="space-y-2">
              <li><strong>Every pivot equals exactly 1.</strong> Each leading entry must be 1, not 2 or any other value.</li>
              <li><strong>All entries above each pivot are also zero.</strong> Not just entries below — every entry in a pivot column must be 0 except the pivot itself.</li>
            </ol>
            <p>
              RREF is the <em>canonical form</em> of a matrix: every matrix has <strong>exactly one</strong> RREF, no matter what sequence of row operations produced it. This uniqueness theorem makes RREF the preferred form for analysis.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p className="text-slate-400 text-xs mb-1">RREF (unique for this matrix):</p>
              <p>[ 1  0  0  2 ]</p>
              <p>[ 0  1  0  3 ]</p>
              <p>[ 0  0  1  2 ]</p>
            </div>
            <p>
              The <Link href="/" className="text-primary hover:underline">RREF calculator</Link> always computes the full RREF using Gauss-Jordan elimination — it zeros out entries above and below each pivot.
            </p>
          </section>

          <section>
            <h2>Side-by-Side Comparison: REF vs RREF</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Property</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">REF</th>
                    <th className="text-left p-3 font-semibold text-primary border-b border-slate-200">RREF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Zero rows at bottom', 'Required ✓', 'Required ✓'],
                    ['Staircase pivot pattern', 'Required ✓', 'Required ✓'],
                    ['Zeros below each pivot', 'Required ✓', 'Required ✓'],
                    ['Each pivot equals 1', 'Not required ✗', 'Required ✓'],
                    ['Zeros above each pivot', 'Not required ✗', 'Required ✓'],
                    ['Uniqueness', 'Not unique — many valid REFs', 'Unique — exactly one RREF'],
                    ['Algorithm to produce', 'Gaussian elimination', 'Gauss-Jordan elimination'],
                  ].map(([prop, ref, rref]) => (
                    <tr key={prop} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-700">{prop}</td>
                      <td className="p-3 text-slate-600">{ref}</td>
                      <td className="p-3 text-slate-600">{rref}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Worked Example: Same Matrix to Both Forms</h2>
            <p>Let A = [[2, 4, 2], [6, 14, 10], [4, 12, 12]]. We will reduce it to REF and then to RREF.</p>

            <h3 className="font-semibold text-slate-800 mt-4 mb-2">Step 1: Reduce to REF (Gaussian Elimination)</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>[ 2   4   2 ]   Start</p>
              <p>[ 6  14  10 ]   R₂ → R₂ − 3R₁</p>
              <p>[ 4  12  12 ]   R₃ → R₃ − 2R₁</p>
              <p>───────────────────────</p>
              <p>[ 2   4   2 ]</p>
              <p>[ 0   2   4 ]   (pivot in col 2)</p>
              <p>[ 0   4   8 ]   R₃ → R₃ − 2R₂</p>
              <p>───────────────────────</p>
              <p>REF: [ 2  4  2 ]</p>
              <p>     [ 0  2  4 ]</p>
              <p>     [ 0  0  0 ]</p>
            </div>
            <p>This is valid REF: staircase, zeros below pivots. The pivots are 2 and 2 (not 1). The matrix is rank 2.</p>

            <h3 className="font-semibold text-slate-800 mt-4 mb-2">Step 2: Continue to RREF (Gauss-Jordan Back-Elimination)</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
              <p>Scale R₁ → (1/2)R₁:  [ 1  2  1 ]</p>
              <p>Scale R₂ → (1/2)R₂:  [ 0  1  2 ]</p>
              <p>R₁ → R₁ − 2R₂:       [ 1  0  −3 ]</p>
              <p>───────────────────────────────────</p>
              <p>RREF: [ 1  0  −3 ]</p>
              <p>      [ 0  1   2 ]</p>
              <p>      [ 0  0   0 ]</p>
            </div>
            <p>
              This is the unique RREF: pivots are 1, zeros above and below each pivot. Rank = 2, nullity = 1. The solution to Ax = 0 is x = 3t·e₃ − 2t·e₂ + 3t·e₁ ... (parameterized by the free variable x₃ = t).
            </p>
          </section>

          <section>
            <h2>When to Use REF vs RREF</h2>
            <p><strong>Use REF when:</strong></p>
            <ul>
              <li>You only need to solve a specific system Ax = b by hand, using back substitution afterward — REF is faster to compute.</li>
              <li>Your textbook or course stops at REF and uses back substitution.</li>
              <li>You are computing the determinant — the determinant of a triangular matrix (any REF) is the product of diagonal entries (adjusted for row swaps and scalings). See the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link> for the full formula.</li>
            </ul>
            <p><strong>Use RREF when:</strong></p>
            <ul>
              <li>You need to read the solution directly, without back substitution.</li>
              <li>You need to identify free variables and the structure of the solution set.</li>
              <li>You need to compute the matrix inverse — apply Gauss-Jordan to [A|I] to get [I|A⁻¹] via RREF. See the <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse calculator</Link>.</li>
              <li>You need a canonical form for theoretical analysis (rank, null space, column space basis).</li>
              <li>You want to use the uniqueness theorem — the RREF is the same regardless of which row operations you chose.</li>
            </ul>
            <p>
              For a detailed algorithmic comparison of how the two forms are computed, see our <Link href="/guides/gauss-jordan-vs-gaussian-elimination" className="text-primary hover:underline">Gauss-Jordan vs Gaussian elimination guide</Link>.
            </p>
          </section>

          <section>
            <h2>Does REF Have a Uniqueness Property?</h2>
            <p>
              No — REF is not unique. For any matrix A, there are generally infinitely many matrices that are valid REFs of A: you can scale any row by any non-zero constant, or swap the order of elimination steps, and get a different REF. The pivot positions (which columns contain pivots) are uniquely determined — but the values can vary.
            </p>
            <p>
              RREF, by contrast, is completely determined by the pivot positions, because scaling each pivot to exactly 1 and eliminating all entries above and below removes all degrees of freedom. This is the <strong>RREF uniqueness theorem</strong>, proved (among other places) in Theorem 1 of Gilbert Strang's <em>Introduction to Linear Algebra</em>.
            </p>
            <p>
              The uniqueness of RREF has a practical consequence: if two people solve the same problem by different sequences of row operations, they get the same RREF at the end. This makes RREF a reliable basis for checking work.
            </p>
          </section>

          <section>
            <h2>Is There an Online REF Calculator?</h2>
            <p>
              Most online matrix calculators — including this one — compute RREF rather than REF, because RREF is more useful and unique. To get a REF, you can stop the Gauss-Jordan algorithm partway through: once you have zeros below each pivot (Gaussian elimination complete), stop before back-eliminating above pivots and before scaling pivots to 1.
            </p>
            <p>
              The <Link href="/" className="text-primary hover:underline">RREF calculator</Link> shows every row operation. If you want a specific REF, you can read off the intermediate matrix state after forward elimination (zeros below all pivots) and before back elimination. Look for the state where the matrix first achieves upper triangular form.
            </p>
          </section>

          <AdSlot id="ref-vs-rref-before-faq" size="banner" />

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What is the difference between REF and RREF?', a: 'REF: zero rows at bottom, staircase pivots, zeros below pivots. RREF: all of REF plus pivots = 1 and zeros above pivots. REF is not unique; RREF is unique.' },
                { q: 'Is RREF unique?', a: 'Yes. Every matrix has exactly one RREF. This is the RREF uniqueness theorem. REF is not unique — different elimination sequences produce different REFs of the same matrix.' },
                { q: 'When should I use REF instead of RREF?', a: 'REF is faster by hand and sufficient for solving Ax = b with back substitution or for computing determinants. RREF is needed for direct solution reading, matrix inversion, null space computation, and canonical analysis.' },
                { q: 'Does the RREF calculator show REF?', a: 'The calculator computes the full RREF. You can see the intermediate REF state by examining the step where forward elimination finishes — look for the first state where all entries below pivots are zero but before back-elimination above them begins.' },
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
      <RelatedCalculators exclude="/guides/ref-vs-rref" picks={['/', '/guides/gauss-jordan-vs-gaussian-elimination', '/guides/rref-step-by-step-tutorial', '/matrix/gauss-jordan', '/matrix/determinant']} />
    </>
  );
}
